#!/usr/bin/env node
/**
 * LinkedIn OAuth setup helper for personal profile posting.
 *
 * Recommended — local callback server (no manual code copy):
 *   npx tsx scripts/linkedin-setup.ts auth
 *
 * Manual flow:
 *   npx tsx scripts/linkedin-setup.ts url
 *   npx tsx scripts/linkedin-setup.ts token --code YOUR_CODE
 */

import 'dotenv/config';
import http from 'http';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REDIRECT_URI = 'http://localhost:8080/callback';

const SCOPES_POST_ONLY = ['w_member_social'];
const SCOPES_WITH_PROFILE = ['openid', 'profile', 'w_member_social'];

interface TokenResult {
  accessToken: string;
  authorUrn?: string;
  accountName?: string;
  expiresInDays: number;
}

function getScopes(): string[] {
  return process.argv.includes('--with-openid')
    ? SCOPES_WITH_PROFILE
    : SCOPES_POST_ONLY;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name} in .env`);
    process.exit(1);
  }
  return value;
}

function authUrl(): string {
  const clientId = requireEnv('LINKEDIN_CLIENT_ID');
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: REDIRECT_URI,
    scope: getScopes().join(' '),
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${params}`;
}

async function exchangeCode(code: string): Promise<TokenResult> {
  const clientId = requireEnv('LINKEDIN_CLIENT_ID');
  const clientSecret = requireEnv('LINKEDIN_CLIENT_SECRET');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!tokenRes.ok) {
    throw new Error(
      `Token exchange failed: ${tokenRes.status} ${await tokenRes.text()}`,
    );
  }

  const tokenJson = (await tokenRes.json()) as {
    access_token: string;
    expires_in: number;
    id_token?: string;
  };

  let authorUrn: string | undefined;
  let accountName: string | undefined;

  if (tokenJson.id_token) {
    try {
      const payload = JSON.parse(
        Buffer.from(tokenJson.id_token.split('.')[1], 'base64url').toString('utf8'),
      ) as { sub?: string; name?: string };
      if (payload.sub) {
        authorUrn = `urn:li:person:${payload.sub}`;
        accountName = payload.name;
      }
    } catch {
      // fall through to userinfo
    }
  }

  if (!authorUrn) {
    const userRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
    });

    if (userRes.ok) {
      const user = (await userRes.json()) as { sub: string; name?: string };
      authorUrn = `urn:li:person:${user.sub}`;
      accountName = user.name;
    }
  }

  return {
    accessToken: tokenJson.access_token,
    authorUrn,
    accountName,
    expiresInDays: Math.round(tokenJson.expires_in / 86400),
  };
}

function printTokenResult(result: TokenResult): void {
  console.log('\n✅ LinkedIn OAuth succeeded\n');
  if (result.accountName) console.log(`Account: ${result.accountName}`);
  console.log(`Token expires in: ${result.expiresInDays} days\n`);
  console.log('Add these to .env:\n');
  console.log(`LINKEDIN_ACCESS_TOKEN=${result.accessToken}`);
  if (result.authorUrn) {
    console.log(`LINKEDIN_AUTHOR_URN=${result.authorUrn}`);
  }
  console.log('\nThen post with:');
  console.log('  npm run post-linkedin -- system-design-consistent-hashing\n');
}

function updateEnvFile(result: TokenResult): void {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log('ℹ️  .env not found — copy values above manually.');
    return;
  }

  let env = fs.readFileSync(envPath, 'utf-8');
  const setLine = (key: string, value: string) => {
    const re = new RegExp(`^${key}=.*$`, 'm');
    env = re.test(env)
      ? env.replace(re, `${key}=${value}`)
      : `${env.trimEnd()}\n${key}=${value}\n`;
  };

  setLine('LINKEDIN_ACCESS_TOKEN', result.accessToken);
  if (result.authorUrn) setLine('LINKEDIN_AUTHOR_URN', result.authorUrn);
  fs.writeFileSync(envPath, env, 'utf-8');
  console.log('✅ Updated .env with new LinkedIn credentials.\n');
}

function openBrowser(url: string): void {
  try {
    const cmd =
      process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
          ? 'start'
          : 'xdg-open';
    execSync(`${cmd} ${JSON.stringify(url)}`, { stdio: 'ignore' });
  } catch {
    console.log('Could not open browser automatically — paste the URL manually.\n');
  }
}

async function runAuthFlow(): Promise<void> {
  const url = authUrl();

  console.log('\n🔐 LinkedIn OAuth — local callback server\n');
  console.log('1. Redirect URL in LinkedIn app Auth tab:');
  console.log(`   ${REDIRECT_URI}\n`);
  console.log('2. Product "Share on LinkedIn" must be approved.\n');
  if (process.argv.includes('--with-openid')) {
    console.log('   Also: "Sign In with LinkedIn using OpenID Connect".\n');
  } else {
    console.log('   Using post-only scope (keeps existing LINKEDIN_AUTHOR_URN).\n');
  }

  await new Promise<void>((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      if (!req.url?.startsWith('/callback')) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const parsed = new URL(req.url, REDIRECT_URI);
      const code = parsed.searchParams.get('code');
      const error = parsed.searchParams.get('error');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>LinkedIn denied access</h1><p>${error}</p>`);
        server.close();
        reject(new Error(`LinkedIn OAuth error: ${error}`));
        return;
      }

      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h1>Missing code</h1>');
        return;
      }

      try {
        const result = await exchangeCode(code);
        updateEnvFile(result);
        printTokenResult(result);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(
          '<h1>LinkedIn connected</h1><p>Token saved to .env. Close this tab.</p>',
        );
        server.close();
        resolve();
      } catch (err) {
        console.error(err instanceof Error ? err.message : err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Token exchange failed</h1><p>See terminal.</p>');
        server.close();
        reject(err);
      }
    });

    server.listen(8080, () => {
      console.log('3. Opening browser — click Allow on LinkedIn...\n');
      console.log(`   ${url}\n`);
      openBrowser(url);
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        reject(new Error('Port 8080 in use — free it or use the manual url/token flow.'));
      } else {
        reject(err);
      }
    });

    setTimeout(() => {
      server.close();
      reject(new Error('Timed out after 5 minutes.'));
    }, 5 * 60 * 1000);
  });
}

async function main() {
  const sub = process.argv[2];

  if (sub === 'auth') {
    await runAuthFlow();
    return;
  }

  if (sub === 'url') {
    console.log('\n1. Redirect URL in LinkedIn app Auth tab:');
    console.log(`   ${REDIRECT_URI}\n`);
    console.log('2. Product "Share on LinkedIn" approved.\n');
    console.log('3. Open this URL (logged in as yourself):\n');
    console.log(authUrl());
    console.log('\n4. Easier: npx tsx scripts/linkedin-setup.ts auth\n');
    console.log('   Or copy code and run:');
    console.log('   npx tsx scripts/linkedin-setup.ts token --code PASTE_CODE\n');
    return;
  }

  if (sub === 'token') {
    const codeIdx = process.argv.indexOf('--code');
    const code = codeIdx >= 0 ? process.argv[codeIdx + 1] : undefined;
    if (!code) {
      console.error('Usage: npx tsx scripts/linkedin-setup.ts token --code YOUR_CODE');
      process.exit(1);
    }
    const result = await exchangeCode(code);
    updateEnvFile(result);
    printTokenResult(result);
    return;
  }

  console.error('Usage:');
  console.error('  npx tsx scripts/linkedin-setup.ts auth [--with-openid]');
  console.error('  npx tsx scripts/linkedin-setup.ts url [--with-openid]');
  console.error('  npx tsx scripts/linkedin-setup.ts token --code YOUR_CODE');
  process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
