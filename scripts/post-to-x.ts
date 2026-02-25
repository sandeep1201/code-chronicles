#!/usr/bin/env node

/**
 * Script to post tweets or threads to X (Twitter) via API v2
 *
 * Modes:
 *   --file <path>   Read a JSON file with tweet/thread content
 *   --slug <slug>   Auto-generate an announcement tweet from a blog post
 *   --dry-run       Print what would be posted without actually posting
 *
 * JSON file format (single tweet):
 *   { "mode": "single", "tweet": "Your tweet text here" }
 *
 * JSON file format (thread):
 *   { "mode": "thread", "tweets": ["Tweet 1", "Tweet 2", "Tweet 3"] }
 *
 * Required environment variables:
 *   X_API_KEY            - Consumer / API key
 *   X_API_SECRET         - Consumer / API secret
 *   X_ACCESS_TOKEN       - User access token
 *   X_ACCESS_TOKEN_SECRET - User access token secret
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { TwitterApi } from 'twitter-api-v2';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.sandeepallala.com';

interface SingleTweetPayload {
  mode: 'single';
  tweet: string;
}

interface ThreadPayload {
  mode: 'thread';
  tweets: string[];
}

type PostPayload = SingleTweetPayload | ThreadPayload;

function getClient(): TwitterApi {
  const apiKey = process.env.X_API_KEY;
  const apiSecret = process.env.X_API_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
    throw new Error(
      'Missing X API credentials. Set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, and X_ACCESS_TOKEN_SECRET in .env',
    );
  }

  return new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken,
    accessSecret: accessTokenSecret,
  });
}

async function postSingleTweet(
  client: TwitterApi,
  text: string,
  dryRun: boolean,
): Promise<string | null> {
  const charCount = xCharCount(text);
  if (charCount > 280) {
    console.warn(
      `⚠️  Tweet is ${charCount} X-visible chars (max 280). It will be truncated by X.`,
    );
  }

  if (dryRun) {
    console.log('[DRY RUN] Would post tweet:');
    console.log(`  "${text}"`);
    console.log(`  (${charCount} X-visible chars)`);
    return null;
  }

  const { data } = await client.v2.tweet(text);
  return data.id;
}

async function postThread(
  client: TwitterApi,
  tweets: string[],
  dryRun: boolean,
): Promise<string[]> {
  if (tweets.length < 2) {
    throw new Error('A thread needs at least 2 tweets');
  }

  const tweetIds: string[] = [];

  for (let i = 0; i < tweets.length; i++) {
    const text = tweets[i];
    const label = `${i + 1}/${tweets.length}`;

    const charCount = xCharCount(text);
    if (charCount > 280) {
      console.warn(
        `⚠️  Tweet ${label} is ${charCount} X-visible chars (max 280). It will be truncated by X.`,
      );
    }

    if (dryRun) {
      console.log(`[DRY RUN] Tweet ${label}:`);
      console.log(`  "${text}"`);
      console.log(`  (${charCount} X-visible chars)\n`);
      continue;
    }

    if (i === 0) {
      const { data } = await client.v2.tweet(text);
      tweetIds.push(data.id);
      console.log(`✅ Tweet ${label} posted (id: ${data.id})`);
    } else {
      const { data } = await client.v2.reply(text, tweetIds[i - 1]);
      tweetIds.push(data.id);
      console.log(`✅ Tweet ${label} posted (id: ${data.id})`);
    }

    // Small delay between tweets to avoid rate limits
    if (i < tweets.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return tweetIds;
}

function loadPayloadFromFile(filePath: string): PostPayload {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const raw = fs.readFileSync(absolutePath, 'utf-8');
  const payload = JSON.parse(raw) as PostPayload;

  if (payload.mode === 'single' && typeof payload.tweet !== 'string') {
    throw new Error('Single mode requires a "tweet" string field');
  }

  if (payload.mode === 'thread' && !Array.isArray(payload.tweets)) {
    throw new Error('Thread mode requires a "tweets" array field');
  }

  return payload;
}

/**
 * X/Twitter counts every URL as 23 characters (t.co shortening).
 * Calculate the "X-visible" length: replace each URL with a 23-char placeholder.
 */
function xCharCount(text: string): number {
  return text.replace(/https?:\/\/\S+/g, 'x'.repeat(23)).length;
}

/**
 * Build a tweet that fits within 280 X-visible characters.
 * Strategy: title + URL is the skeleton, then fill remaining space with excerpt.
 */
async function generateAnnouncementTweet(slug: string): Promise<string> {
  const postDir = path.join(process.cwd(), 'content', 'blog');
  const filePath = path.join(postDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Published post not found: ${filePath}\nMake sure the post is published (not in drafts/).`,
    );
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const matter = await import('gray-matter');
  const { data } = matter.default(raw);

  const title = data.title || slug;
  const blogUrl = `${SITE_URL}/blog/${slug}`;
  const excerpt = (data.excerpt || '').trim();

  // Build from skeleton: title + \n\n + URL = fixed cost
  const skeleton = `${title}\n\n${blogUrl}`;
  const skeletonLen = xCharCount(skeleton);

  if (skeletonLen >= 280) {
    // Title + URL already at limit — return just that
    return skeleton;
  }

  // Try adding excerpt between title and URL
  const remaining = 280 - skeletonLen - 2; // 2 for the extra \n\n before URL
  if (remaining <= 0) {
    return skeleton;
  }

  const trimmedExcerpt =
    excerpt.length <= remaining
      ? excerpt
      : excerpt.slice(0, remaining - 1).trimEnd() + '…';

  return `${title}\n\n${trimmedExcerpt}\n\n${blogUrl}`;
}

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  const parsed: {
    file?: string;
    slug?: string;
    dryRun: boolean;
  } = { dryRun: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--file':
        parsed.file = args[++i];
        break;
      case '--slug':
        parsed.slug = args[++i];
        break;
      case '--dry-run':
        parsed.dryRun = true;
        break;
    }
  }

  return parsed;
}

async function main() {
  const args = parseArgs(process.argv);

  if (!args.file && !args.slug) {
    console.error('Usage:');
    console.error(
      '  tsx scripts/post-to-x.ts --file <path.json> [--dry-run]',
    );
    console.error('  tsx scripts/post-to-x.ts --slug <post-slug> [--dry-run]');
    console.error('');
    console.error('JSON file format (single):');
    console.error('  { "mode": "single", "tweet": "Your tweet text" }');
    console.error('');
    console.error('JSON file format (thread):');
    console.error(
      '  { "mode": "thread", "tweets": ["Tweet 1", "Tweet 2", ...] }',
    );
    process.exit(1);
  }

  const dryRun = args.dryRun;

  if (dryRun) {
    console.log('🏃 DRY RUN MODE — nothing will be posted\n');
  }

  try {
    let payload: PostPayload;

    if (args.slug) {
      console.log(`\n📝 Generating announcement tweet for: ${args.slug}\n`);
      const tweet = await generateAnnouncementTweet(args.slug);
      payload = { mode: 'single', tweet };
    } else {
      payload = loadPayloadFromFile(args.file!);
    }

    const client = dryRun ? (null as unknown as TwitterApi) : getClient();

    if (payload.mode === 'single') {
      console.log('📤 Posting single tweet...\n');
      const id = await postSingleTweet(client, payload.tweet, dryRun);
      if (id) {
        console.log(`\n✅ Tweet posted! https://x.com/i/status/${id}`);
      }
    } else {
      console.log(`📤 Posting thread (${payload.tweets.length} tweets)...\n`);
      const ids = await postThread(client, payload.tweets, dryRun);
      if (ids.length > 0) {
        console.log(
          `\n✅ Thread posted! https://x.com/i/status/${ids[0]}`,
        );
      }
    }
  } catch (error: any) {
    console.error('\n❌ Error posting to X:');
    if (error?.data) {
      console.error('API response:', JSON.stringify(error.data, null, 2));
    }
    if (error?.code) {
      console.error('HTTP status:', error.code);
    }
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
