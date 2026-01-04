#!/usr/bin/env node

/**
 * Script to list all scheduled blog posts
 * 
 * Shows:
 * - All draft posts with scheduledPublishAt dates
 * - Their scheduled publication dates
 * - Which posts are ready to publish
 * - The order in which they'll be published
 */

import { getScheduledPosts, getNextScheduledPost } from '../lib/publishing';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const DRAFTS_DIR = path.join(CONTENT_DIR, 'blog', 'drafts');

function getAllDraftPosts() {
  if (!fs.existsSync(DRAFTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(DRAFTS_DIR);
  const drafts: Array<{
    slug: string
    scheduledPublishAt?: string
    draft: boolean
    title?: string
  }> = [];

  for (const file of files) {
    if (!file.endsWith('.mdx') && !file.endsWith('.md')) {
      continue;
    }

    if (file === '.template.mdx' || file === '.template.md') {
      continue;
    }

    const filePath = path.join(DRAFTS_DIR, file);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(source);

    const slug = file.replace(/\.(mdx|md)$/, '');
    drafts.push({
      slug,
      scheduledPublishAt: data.scheduledPublishAt,
      draft: data.draft !== false,
      title: data.title,
    });
  }

  return drafts;
}

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
}

async function main() {
  console.log('📝 Scheduled Blog Posts\n');
  console.log('=' .repeat(60));

  const allDrafts = getAllDraftPosts();
  const scheduledPosts = getScheduledPosts();
  const nextPost = getNextScheduledPost();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Group drafts by status
  const withSchedule = allDrafts.filter((d) => d.scheduledPublishAt);
  const withoutSchedule = allDrafts.filter((d) => !d.scheduledPublishAt);

  // Ready to publish
  console.log('\n✅ Ready to Publish (scheduled date has passed or is today):');
  if (scheduledPosts.length > 0) {
    scheduledPosts.forEach((post, index) => {
      const status = index === 0 && nextPost?.slug === post.slug ? '👉 NEXT' : '  ';
      console.log(
        `  ${status} ${post.frontmatter.title || post.slug}`,
      );
      console.log(`     Scheduled: ${post.scheduledPublishAt}`);
      console.log(`     Slug: ${post.slug}`);
    });
  } else {
    console.log('  (none)');
  }

  // Future scheduled
  console.log('\n📅 Scheduled for Future:');
  const futureScheduled = withSchedule.filter((draft) => {
    if (!draft.scheduledPublishAt) return false;
    const scheduledDate = new Date(draft.scheduledPublishAt);
    scheduledDate.setHours(0, 0, 0, 0);
    return scheduledDate > today;
  });

  if (futureScheduled.length > 0) {
    // Group by week
    const byWeek = new Map<string, typeof futureScheduled>();
    futureScheduled.forEach((draft) => {
      if (draft.scheduledPublishAt) {
        const weekStart = getWeekStart(new Date(draft.scheduledPublishAt));
        if (!byWeek.has(weekStart)) {
          byWeek.set(weekStart, []);
        }
        byWeek.get(weekStart)!.push(draft);
      }
    });

    // Sort weeks
    const sortedWeeks = Array.from(byWeek.keys()).sort();
    sortedWeeks.forEach((week) => {
      const posts = byWeek.get(week)!.sort((a, b) => {
        if (!a.scheduledPublishAt || !b.scheduledPublishAt) return 0;
        return a.scheduledPublishAt.localeCompare(b.scheduledPublishAt);
      });
      console.log(`\n  Week of ${week}:`);
      posts.forEach((post) => {
        console.log(`    - ${post.title || post.slug}`);
        console.log(`      Scheduled: ${post.scheduledPublishAt}`);
      });
    });
  } else {
    console.log('  (none)');
  }

  // Without schedule
  if (withoutSchedule.length > 0) {
    console.log('\n📝 Drafts Without Schedule:');
    withoutSchedule.forEach((draft) => {
      console.log(`  - ${draft.title || draft.slug}`);
    });
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\nSummary:');
  console.log(`  Total drafts: ${allDrafts.length}`);
  console.log(`  Ready to publish: ${scheduledPosts.length}`);
  console.log(`  Scheduled for future: ${futureScheduled.length}`);
  console.log(`  Without schedule: ${withoutSchedule.length}`);

  if (nextPost) {
    console.log(`\n  Next post to publish: ${nextPost.frontmatter.title || nextPost.slug}`);
    console.log(`  Scheduled for: ${nextPost.scheduledPublishAt}`);
  }

  console.log('\n');
}

main().catch((error) => {
  console.error('Error listing scheduled posts:', error);
  process.exit(1);
});






