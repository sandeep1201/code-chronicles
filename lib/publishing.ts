import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FrontMatter } from './mdx';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');
const DRAFTS_DIR = path.join(BLOG_DIR, 'drafts');

export interface ScheduledPost {
  slug: string
  scheduledPublishAt: string
  filePath: string
  frontmatter: FrontMatter
}

/**
 * Get all draft posts with scheduledPublishAt date that has passed
 */
export function getScheduledPosts(): ScheduledPost[] {
  if (!fs.existsSync(DRAFTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(DRAFTS_DIR);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const scheduledPosts: ScheduledPost[] = [];

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
    const frontmatter = data as FrontMatter;

    // Only process drafts with scheduledPublishAt
    if (frontmatter.draft && frontmatter.scheduledPublishAt) {
      const scheduledDate = new Date(frontmatter.scheduledPublishAt);
      scheduledDate.setHours(0, 0, 0, 0);

      // If scheduled date has passed or is today
      if (scheduledDate <= today) {
        const slug = file.replace(/\.(mdx|md)$/, '');
        scheduledPosts.push({
          slug,
          scheduledPublishAt: frontmatter.scheduledPublishAt,
          filePath,
          frontmatter,
        });
      }
    }
  }

  // Sort by scheduled date (earliest first), then alphabetically by slug
  return scheduledPosts.sort((a, b) => {
    const dateCompare =
      new Date(a.scheduledPublishAt).getTime() -
      new Date(b.scheduledPublishAt).getTime();
    if (dateCompare !== 0) {
      return dateCompare;
    }
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Publish a post by moving it from drafts to main blog folder and updating frontmatter
 */
export function publishPost(slug: string): boolean {
  const draftFilePath = path.join(DRAFTS_DIR, `${slug}.mdx`);
  let source: string;
  let targetFilePath: string;

  // Try .mdx first, then .md
  if (fs.existsSync(draftFilePath)) {
    source = fs.readFileSync(draftFilePath, 'utf-8');
    targetFilePath = path.join(BLOG_DIR, `${slug}.mdx`);
  } else {
    const draftMdPath = path.join(DRAFTS_DIR, `${slug}.md`);
    if (fs.existsSync(draftMdPath)) {
      source = fs.readFileSync(draftMdPath, 'utf-8');
      targetFilePath = path.join(BLOG_DIR, `${slug}.md`);
    } else {
      console.error(`Draft post not found: ${slug}`);
      return false;
    }
  }

  // Check if post already exists in main folder - if so, update it instead of failing
  if (fs.existsSync(targetFilePath)) {
    console.log(`Post already exists in main folder: ${slug}. Updating frontmatter...`);
    // Read existing post and update frontmatter
    const existingSource = fs.readFileSync(targetFilePath, 'utf-8');
    const { data: existingData, content: existingContent } = matter(existingSource);
    const existingFrontmatter = existingData as FrontMatter;
    
    // Update frontmatter to ensure draft is false and scheduledPublishAt is removed
    const { scheduledPublishAt: existingScheduled, draft: existingDraft, ...restExisting } = existingFrontmatter;
    const fixedFrontmatter: any = {
      ...restExisting,
      draft: false,
      publishedAt: existingFrontmatter.publishedAt || existingScheduled || new Date().toISOString().split('T')[0],
    };
    
    if ('scheduledPublishAt' in fixedFrontmatter) {
      delete fixedFrontmatter.scheduledPublishAt;
    }
    
    const fixedSource = matter.stringify(existingContent, fixedFrontmatter);
    fs.writeFileSync(targetFilePath, fixedSource, 'utf-8');
    
    // Delete from drafts folder
    const sourceFilePath = draftFilePath.endsWith('.mdx')
      ? draftFilePath
      : path.join(DRAFTS_DIR, `${slug}.md`);
    if (fs.existsSync(sourceFilePath)) {
      fs.unlinkSync(sourceFilePath);
    }
    
    console.log(`Updated post frontmatter: ${slug}`);
    return true;
  }

  // Parse frontmatter
  const { data, content } = matter(source);
  const frontmatter = data as FrontMatter;

  // Update frontmatter - explicitly set draft to false and remove scheduledPublishAt
  const { scheduledPublishAt, ...restFrontmatter } = frontmatter;
  const updatedFrontmatter: FrontMatter = {
    ...restFrontmatter,
    draft: false,
    publishedAt: scheduledPublishAt || frontmatter.publishedAt || new Date().toISOString().split('T')[0],
  };

  // Create new file content with updated frontmatter
  const updatedSource = matter.stringify(content, updatedFrontmatter);

  // Write to main blog folder
  fs.writeFileSync(targetFilePath, updatedSource, 'utf-8');

  // Delete from drafts folder
  const sourceFilePath = draftFilePath.endsWith('.mdx')
    ? draftFilePath
    : path.join(DRAFTS_DIR, `${slug}.md`);
  fs.unlinkSync(sourceFilePath);

  console.log(`Published post: ${slug}`);
  return true;
}

/**
 * Get the next post in queue (earliest scheduled post)
 */
export function getNextScheduledPost(): ScheduledPost | null {
  const scheduledPosts = getScheduledPosts();
  return scheduledPosts.length > 0 ? scheduledPosts[0] : null;
}






