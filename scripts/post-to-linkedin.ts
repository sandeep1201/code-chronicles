#!/usr/bin/env node

/**
 * Script to post newly published blog posts to LinkedIn
 * 
 * This script:
 * 1. Takes a blog post slug as input
 * 2. Reads the published post's frontmatter and content
 * 3. Creates a formatted LinkedIn post with link
 * 4. Posts to LinkedIn using the LinkedIn API
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type FrontMatter } from '../lib/mdx';
import { loadLinkedInDraft } from '../lib/linkedin-draft';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.sandeepallala.com';

/**
 * Read a blog post's frontmatter without compiling MDX.
 *
 * A dry run (and the actual post payload) only needs frontmatter fields, so we
 * avoid importing getPostBySlug — that pulls in the next-mdx-remote compile
 * chain (estree-walker@3, ESM-only), which breaks under tsx's CJS resolver.
 */
function loadPostFrontmatter(slug: string): FrontMatter | null {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const candidates = [
    path.join(blogDir, `${slug}.mdx`),
    path.join(blogDir, `${slug}.md`),
    path.join(blogDir, 'drafts', `${slug}.mdx`),
    path.join(blogDir, 'drafts', `${slug}.md`),
  ];

  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!filePath) {
    return null;
  }

  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
  const frontmatter = data as FrontMatter;
  const inDraftsFolder = filePath.includes(`${path.sep}drafts${path.sep}`);

  return {
    ...frontmatter,
    slug: frontmatter.slug ?? slug,
    draft: frontmatter.draft ?? inDraftsFolder,
  };
}

interface LinkedInPostData {
  author: string;
  lifecycleState: 'PUBLISHED';
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: {
        text: string;
      };
      shareMediaCategory: 'NONE' | 'ARTICLE';
      media?: Array<{
        status: 'READY';
        description: {
          text: string;
        };
        originalUrl: string;
        title: {
          text: string;
        };
      }>;
    };
  };
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC';
  };
}

/**
 * Get LinkedIn access token using client credentials
 * Note: For personal posts, you'll need OAuth 2.0 user token
 */
async function getLinkedInAccessToken(): Promise<string> {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN; // For user posts, use OAuth token

  if (!accessToken) {
    throw new Error('LINKEDIN_ACCESS_TOKEN environment variable is required');
  }

  // If you have a refresh token, you can refresh it here
  // For now, we'll use the access token directly
  return accessToken;
}

/**
 * Format blog post content for LinkedIn
 */
function formatLinkedInPost(frontmatter: FrontMatter): string {
  const { title, excerpt, tags } = frontmatter;
  const blogUrl = `${SITE_URL}/blog/${frontmatter.slug}`;
  
  // Create an engaging LinkedIn post
  const postText = `🚀 New Blog Post: ${title}

${excerpt}

Read the full article: ${blogUrl}

${tags.map((tag: string) => `#${tag.replace(/-/g, '')}`).join(' ')}

#JavaScript #WebDevelopment #Programming`;

  return postText;
}

/**
 * Post to LinkedIn
 */
async function postToLinkedIn(
  postText: string,
  postTitle: string,
  postUrl: string,
  postExcerpt: string,
): Promise<void> {
  const accessToken = await getLinkedInAccessToken();
  const authorUrn = process.env.LINKEDIN_AUTHOR_URN; // e.g., "urn:li:person:YOUR_PERSON_ID"

  if (!authorUrn) {
    throw new Error('LINKEDIN_AUTHOR_URN environment variable is required');
  }

  const postData: LinkedInPostData = {
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: postText,
        },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            description: {
              text: postExcerpt,
            },
            originalUrl: postUrl,
            title: {
              text: postTitle,
            },
          },
        ],
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LinkedIn API error: ${response.status} ${response.statusText}\n${errorText}`,
    );
  }

  const result = await response.json();
  console.log('✅ Successfully posted to LinkedIn!');
  console.log(`Post ID: ${result.id}`);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const slug = args.find((arg) => arg !== '--dry-run');

  if (!slug) {
    console.error('Usage: tsx scripts/post-to-linkedin.ts <post-slug> [--dry-run]');
    console.error('Example: tsx scripts/post-to-linkedin.ts understanding-javascript-data-types');
    process.exit(1);
  }

  console.log(`\n📝 Preparing LinkedIn post for: ${slug}\n`);

  try {
    // Get the published post's frontmatter (no MDX compile needed)
    const frontmatter = loadPostFrontmatter(slug);

    if (!frontmatter) {
      throw new Error(`Post not found: ${slug}`);
    }

    // Check if post is actually published (not a draft)
    if (frontmatter.draft) {
      console.log('⚠️  Post is still a draft. Skipping LinkedIn post.');
      process.exit(0);
    }

    const blogUrl = `${SITE_URL}/blog/${slug}`;
    const linkedInDraft = loadLinkedInDraft(slug);
    const postText = linkedInDraft?.text ?? formatLinkedInPost(frontmatter);

    if (linkedInDraft) {
      console.log('📄 Using humanized draft from content/blog/drafts/.social/');
    } else {
      console.log(
        'ℹ️  No LinkedIn draft found — using auto-generated copy. Add content/blog/drafts/.social/{slug}-linkedin.json for humanized posts.',
      );
    }

    console.log('📋 Post content:');
    console.log('─'.repeat(50));
    console.log(postText);
    console.log('─'.repeat(50));
    console.log('');

    if (dryRun) {
      console.log('🔍 Dry run — not posting to LinkedIn.');
      process.exit(0);
    }

    // Post to LinkedIn
    await postToLinkedIn(
      postText,
      frontmatter.title,
      blogUrl,
      frontmatter.excerpt,
    );

    console.log(`\n✅ Successfully shared "${frontmatter.title}" on LinkedIn!`);
  } catch (error) {
    console.error('\n❌ Error posting to LinkedIn:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});


