#!/usr/bin/env node

/**
 * Patch commentary on an existing LinkedIn post (Posts API PARTIAL_UPDATE).
 *
 * Usage:
 *   npx tsx scripts/update-linkedin-post.ts <slug> --urn urn:li:share:... [--dry-run]
 *
 * Text comes from content/blog/drafts/.social/{slug}-linkedin.json
 * Optional field "postUrn" in that JSON if --urn is omitted.
 */

import 'dotenv/config';
import { loadLinkedInDraft } from '../lib/linkedin-draft';

const LINKEDIN_API_VERSION =
  process.env.LINKEDIN_API_VERSION ?? '202511';

function getAccessToken(): string {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('LINKEDIN_ACCESS_TOKEN environment variable is required');
  }
  return accessToken;
}

async function updateLinkedInCommentary(
  postUrn: string,
  commentary: string,
  dryRun: boolean,
): Promise<void> {
  const encodedUrn = encodeURIComponent(postUrn);
  const url = `https://api.linkedin.com/rest/posts/${encodedUrn}`;

  if (dryRun) {
    console.log('🔍 Dry run — would PATCH commentary via Posts API');
    console.log(`   URN: ${postUrn}`);
    return;
  }

  const accessToken = getAccessToken();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      'X-RestLi-Method': 'PARTIAL_UPDATE',
      'Linkedin-Version': LINKEDIN_API_VERSION,
    },
    body: JSON.stringify({
      patch: {
        $set: {
          commentary,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LinkedIn API error: ${response.status} ${response.statusText}\n${errorText}`,
    );
  }

  console.log('✅ LinkedIn post commentary updated.');
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const urnIndex = args.indexOf('--urn');
  const urnFromFlag =
    urnIndex >= 0 ? args[urnIndex + 1] : undefined;
  const slug = args.find(
    (arg) => arg !== '--dry-run' && arg !== '--urn' && arg !== urnFromFlag,
  );

  if (!slug) {
    console.error(
      'Usage: tsx scripts/update-linkedin-post.ts <slug> --urn urn:li:share:... [--dry-run]',
    );
    process.exit(1);
  }

  const draft = loadLinkedInDraft(slug);
  if (!draft) {
    throw new Error(
      `No LinkedIn draft at content/blog/drafts/.social/${slug}-linkedin.json`,
    );
  }

  const postUrn = urnFromFlag ?? draft.postUrn;
  if (!postUrn) {
    throw new Error(
      'Post URN required: pass --urn urn:li:share:... or add "postUrn" to the LinkedIn JSON',
    );
  }

  console.log(`\n📝 Updating LinkedIn post for: ${slug}\n`);
  console.log('─'.repeat(50));
  console.log(draft.text);
  console.log('─'.repeat(50));
  console.log('');

  await updateLinkedInCommentary(postUrn, draft.text, dryRun);
}

main().catch((error) => {
  console.error('\n❌ Error updating LinkedIn post:');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
