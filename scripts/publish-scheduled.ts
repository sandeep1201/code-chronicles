#!/usr/bin/env node

/**
 * Script to publish scheduled blog posts
 * 
 * This script:
 * 1. Finds all draft posts with scheduledPublishAt date that has passed
 * 2. Publishes the earliest one (one per week rule)
 * 3. Updates frontmatter and moves file from drafts to main blog folder
 */

import { getScheduledPosts, publishPost } from '../lib/publishing';
import { execSync } from 'child_process';

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
}

async function main() {
  console.log('Checking for scheduled posts to publish...\n');

  const scheduledPosts = getScheduledPosts();

  if (scheduledPosts.length === 0) {
    console.log('No posts scheduled for publication.');
    process.exit(0);
  }

  console.log(`Found ${scheduledPosts.length} post(s) ready to publish:`);
  scheduledPosts.forEach((post) => {
    console.log(`  - ${post.slug} (scheduled for ${post.scheduledPublishAt})`);
  });

  // Weekly publishing rule: Only publish one post per week
  // Group posts by week and publish the earliest one from the earliest week
  const postsByWeek = new Map<string, typeof scheduledPosts>();

  for (const post of scheduledPosts) {
    const weekStart = getWeekStart(new Date(post.scheduledPublishAt));
    if (!postsByWeek.has(weekStart)) {
      postsByWeek.set(weekStart, []);
    }
    postsByWeek.get(weekStart)!.push(post);
  }

  // Sort weeks chronologically
  const sortedWeeks = Array.from(postsByWeek.keys()).sort();

  if (sortedWeeks.length === 0) {
    console.log('No posts to publish this week.');
    process.exit(0);
  }

  // Get the earliest week
  const earliestWeek = sortedWeeks[0];
  const postsThisWeek = postsByWeek.get(earliestWeek)!;

  // If multiple posts in the same week, publish the earliest one (already sorted)
  const postToPublish = postsThisWeek[0];

  console.log(`\nPublishing: ${postToPublish.slug}`);
  console.log(`Scheduled date: ${postToPublish.scheduledPublishAt}`);
  
  if (postsThisWeek.length > 1) {
    console.log(
      `\nNote: ${postsThisWeek.length - 1} other post(s) scheduled for this week will be published next week.`,
    );
  }

  try {
    const success = publishPost(postToPublish.slug);

    if (!success) {
      console.error(`\n❌ Failed to publish: ${postToPublish.slug}`);
      console.error('Please check the error messages above for details.');
      process.exit(1);
    }

    console.log(`\n✅ Successfully published: ${postToPublish.slug}`);

    // Post to X if social draft exists
    const path = await import('path');
    const fs = await import('fs');
    const socialDraftPath = path.join(
      process.cwd(),
      'content',
      'blog',
      'drafts',
      '.social',
      `${postToPublish.slug}-x.json`,
    );
    if (fs.existsSync(socialDraftPath)) {
      console.log(`\n📱 Posting X thread from draft...`);
      try {
        execSync(
          `npx tsx scripts/post-to-x.ts --file "${socialDraftPath}"`,
          { stdio: 'inherit' },
        );
        fs.unlinkSync(socialDraftPath);
        console.log('✅ Successfully posted to X');
      } catch (error) {
        console.error('⚠️  Failed to post to X (non-fatal):', error);
      }
    } else {
      console.log(`\nℹ️  No X draft found for ${postToPublish.slug}`);
    }

    // Post to LinkedIn if credentials are available
    if (
      process.env.LINKEDIN_ACCESS_TOKEN &&
      process.env.LINKEDIN_AUTHOR_URN
    ) {
      console.log(`\n📱 Posting to LinkedIn...`);
      try {
        execSync(
          `npm run post-linkedin -- ${postToPublish.slug}`,
          { stdio: 'inherit' },
        );
        console.log('✅ Successfully posted to LinkedIn');
      } catch (error) {
        console.error('⚠️  Failed to post to LinkedIn (non-fatal):', error);
      }
    } else {
      console.log(
        `\nℹ️  Skipping LinkedIn post (LINKEDIN_ACCESS_TOKEN or LINKEDIN_AUTHOR_URN not set)`,
      );
    }
    
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Unexpected error while publishing: ${postToPublish.slug}`);
    console.error('Error details:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error running publish script:', error);
  process.exit(1);
});






