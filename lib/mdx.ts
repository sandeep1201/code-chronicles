import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { codeToHtml } from 'shiki';

// Custom components for MDX
import { MDXComponents } from '@/components/mdx';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface FrontMatter {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  author?: string
  featured?: boolean
  draft?: boolean
  scheduledPublishAt?: string
  course?: {
    id: string
    module: string
    order: number
  }
}

export interface Post {
  frontmatter: FrontMatter
  content: React.ReactElement
  slug: string
  readingTime: number
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(type: 'blog' | 'courses' = 'blog'): string[] {
  const contentPath = path.join(CONTENT_DIR, type);
  
  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const slugs: string[] = [];
  
  // Get slugs from main directory
  const files = fs.readdirSync(contentPath);
  files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .forEach((file) => {
      const slug = file.replace(/\.(mdx|md)$/, '');
      if (slug !== '.template') {
        slugs.push(slug);
      }
    });
  
  // For blog posts, also check drafts folder
  if (type === 'blog') {
    const draftsPath = path.join(contentPath, 'drafts');
    if (fs.existsSync(draftsPath)) {
      const draftFiles = fs.readdirSync(draftsPath);
      draftFiles
        .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
        .forEach((file) => {
          const slug = file.replace(/\.(mdx|md)$/, '');
          if (slug !== '.template' && !slugs.includes(slug)) {
            slugs.push(slug);
          }
        });
    }
  }
  
  return slugs;
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(
  slug: string,
  type: 'blog' | 'courses' = 'blog',
): Promise<Post | null> {
  try {
    const contentPath = path.join(CONTENT_DIR, type);
    const filePath = path.join(contentPath, `${slug}.mdx`);
    
    // Try .mdx first, then .md, check main directory first
    let source: string;
    if (fs.existsSync(filePath)) {
      source = fs.readFileSync(filePath, 'utf-8');
    } else {
      const mdPath = path.join(contentPath, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        source = fs.readFileSync(mdPath, 'utf-8');
      } else {
        // Check drafts folder for blog posts
        if (type === 'blog') {
          const draftsPath = path.join(contentPath, 'drafts');
          const draftFilePath = path.join(draftsPath, `${slug}.mdx`);
          if (fs.existsSync(draftFilePath)) {
            source = fs.readFileSync(draftFilePath, 'utf-8');
          } else {
            const draftMdPath = path.join(draftsPath, `${slug}.md`);
            if (fs.existsSync(draftMdPath)) {
              source = fs.readFileSync(draftMdPath, 'utf-8');
            } else {
              return null;
            }
          }
        } else {
          return null;
        }
      }
    }

    // Parse frontmatter
    const { data, content: rawContent } = matter(source);
    const frontmatter = data as FrontMatter;
    
    // Check if this is a draft and if we should allow access
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isDraft = frontmatter.draft === true;
    
    if (isDraft && !isDevelopment) {
      // In production, only allow drafts if they're scheduled and the date has passed
      if (frontmatter.scheduledPublishAt) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const scheduledDate = new Date(frontmatter.scheduledPublishAt);
        scheduledDate.setHours(0, 0, 0, 0);
        
        // If scheduled date hasn't passed, don't allow access
        if (scheduledDate > today) {
          return null;
        }
      } else {
        // Draft without scheduled date - don't allow access in production
        return null;
      }
    }
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = rawContent.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Compile MDX
    const { content } = await compileMDX({
      source: rawContent,
      components: MDXComponents,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
                properties: {
                  className: ['anchor'],
                },
              },
            ],
          ],
        },
      },
    });

    return {
      frontmatter: frontmatter,
      content,
      slug,
      readingTime,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts with frontmatter
 */
export async function getAllPosts(
  type: 'blog' | 'courses' = 'blog',
): Promise<Omit<Post, 'content'>[]> {
  const slugs = getAllPostSlugs(type);
  const contentPath = path.join(CONTENT_DIR, type);
  
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      // Try main directory first
      const filePath = path.join(contentPath, `${slug}.mdx`);
      let source: string;
      let isDraft = false;
      
      if (fs.existsSync(filePath)) {
        source = fs.readFileSync(filePath, 'utf-8');
      } else {
        const mdPath = path.join(contentPath, `${slug}.md`);
        if (fs.existsSync(mdPath)) {
          source = fs.readFileSync(mdPath, 'utf-8');
        } else {
          // Check drafts folder for blog posts
          if (type === 'blog') {
            const draftsPath = path.join(contentPath, 'drafts');
            const draftFilePath = path.join(draftsPath, `${slug}.mdx`);
            if (fs.existsSync(draftFilePath)) {
              source = fs.readFileSync(draftFilePath, 'utf-8');
              isDraft = true;
            } else {
              const draftMdPath = path.join(draftsPath, `${slug}.md`);
              source = fs.readFileSync(draftMdPath, 'utf-8');
              isDraft = true;
            }
          } else {
            throw new Error(`Post not found: ${slug}`);
          }
        }
      }

      const { data, content } = matter(source);
      const wordCount = content.split(/\s+/g).length;
      const readingTime = Math.ceil(wordCount / 200);
      
      const frontmatter = data as FrontMatter;

      return {
        frontmatter: {
          ...frontmatter,
          draft: isDraft || frontmatter.draft,
        },
        slug,
        readingTime,
      };
    }),
  );

  // Filter logic:
  // In development/localhost: Show all posts including drafts
  // In production:
  //   - If draft: true AND scheduledPublishAt exists AND date has passed → treat as published
  //   - If draft: true AND no scheduledPublishAt OR future date → exclude
  //   - If draft: false → include (already published)
  const isDevelopment = process.env.NODE_ENV === 'development';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const publishedPosts = posts.filter((post) => {
    const { draft, scheduledPublishAt } = post.frontmatter;
    
    // In development, show all posts including drafts
    if (isDevelopment) {
      return true;
    }
    
    // Already published posts
    if (!draft) {
      return true;
    }
    
    // Draft posts: only include if scheduled date has passed
    if (draft && scheduledPublishAt) {
      const scheduledDate = new Date(scheduledPublishAt);
      scheduledDate.setHours(0, 0, 0, 0);
      return scheduledDate <= today;
    }
    
    // Draft posts without scheduled date or future date → exclude
    return false;
  });

  // Sort by date
  return publishedPosts.sort((a, b) => {
    return (
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
    );
  });
}

/**
 * Syntax highlighting for code blocks
 */
export async function highlightCode(
  code: string,
  lang: string = 'typescript',
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    });
    return html;
  } catch (error) {
    console.error('Error highlighting code:', error);
    return `<pre><code>${code}</code></pre>`;
  }
}









