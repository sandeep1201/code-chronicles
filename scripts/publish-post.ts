#!/usr/bin/env node

/**
 * Publish a single blog post from drafts and post associated social content.
 *
 * Usage: npm run publish-post -- <slug>
 *
 * This script:
 * 1. Moves the draft post from content/blog/drafts/ to content/blog/
 * 2. Updates frontmatter (draft: false, publishedAt: today)
 * 3. If a social draft exists (content/blog/drafts/.social/{slug}-x.json), posts to X
 * 4. If LinkedIn credentials exist, posts to LinkedIn
 * 5. Removes the social draft file after posting
 */

import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { publishPost } from '../lib/publishing';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');
const DRAFTS_DIR = path.join(BLOG_DIR, 'drafts');
const SOCIAL_DRAFTS_DIR = path.join(DRAFTS_DIR, '.social');

function getSocialDraftPath(slug: string): string {
  return path.join(SOCIAL_DRAFTS_DIR, `${slug}-x.json`);
}

function postSocialDraft(slug: string): boolean {
  const draftPath = getSocialDraftPath(slug);

  if (!fs.existsSync(draftPath)) {
    return false;
  }

  console.log('\n📱 Posting X thread from draft...\n');

  try {
    execSync(`npx tsx scripts/post-to-x.ts --file "${draftPath}"`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    fs.unlinkSync(draftPath);
    console.log('\n✅ X draft posted and removed.');
    return true;
  } catch (error) {
    console.error('\n⚠️  Failed to post to X (non-fatal). Draft file preserved.');
    return false;
  }
}

function postToLinkedIn(slug: string): void {
  if (!process.env.LINKEDIN_ACCESS_TOKEN || !process.env.LINKEDIN_AUTHOR_URN) {
    console.log('\nℹ️  Skipping LinkedIn (credentials not set)');
    return;
  }

  console.log('\n📱 Posting to LinkedIn...\n');

  try {
    execSync(`npm run post-linkedin -- ${slug}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
    console.log('✅ LinkedIn post published.');
  } catch (error) {
    console.error('⚠️  Failed to post to LinkedIn (non-fatal):', error);
  }
}

async function main() {
  const slug = process.argv[2];

  if (!slug) {
    console.error('Usage: npm run publish-post -- <slug>');
    console.error('Example: npm run publish-post -- compound-components-pattern');
    process.exit(1);
  }

  const draftPath = path.join(DRAFTS_DIR, `${slug}.mdx`);
  const draftPathMd = path.join(DRAFTS_DIR, `${slug}.md`);

  if (!fs.existsSync(draftPath) && !fs.existsSync(draftPathMd)) {
    console.error(`\n❌ Draft not found: ${slug}`);
    console.error(`   Looked in: ${DRAFTS_DIR}`);
    process.exit(1);
  }

  console.log(`\n📝 Publishing: ${slug}\n`);

  const success = publishPost(slug);

  if (!success) {
    console.error('\n❌ Failed to publish post.');
    process.exit(1);
  }

  console.log('\n✅ Post published successfully.');

  postSocialDraft(slug);
  postToLinkedIn(slug);

  console.log('\n🎉 Done.\n');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
