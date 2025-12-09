import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { codeToHtml } from 'shiki'

// Custom components for MDX
import { MDXComponents } from '@/components/mdx'

const CONTENT_DIR = path.join(process.cwd(), 'content')

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
  const contentPath = path.join(CONTENT_DIR, type)
  
  if (!fs.existsSync(contentPath)) {
    return []
  }

  const files = fs.readdirSync(contentPath)
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.(mdx|md)$/, ''))
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(
  slug: string,
  type: 'blog' | 'courses' = 'blog'
): Promise<Post | null> {
  try {
    const contentPath = path.join(CONTENT_DIR, type)
    const filePath = path.join(contentPath, `${slug}.mdx`)
    
    // Try .mdx first, then .md
    let source: string
    if (fs.existsSync(filePath)) {
      source = fs.readFileSync(filePath, 'utf-8')
    } else {
      const mdPath = path.join(contentPath, `${slug}.md`)
      if (fs.existsSync(mdPath)) {
        source = fs.readFileSync(mdPath, 'utf-8')
      } else {
        return null
      }
    }

    // Parse frontmatter
    const { data, content: rawContent } = matter(source)
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = rawContent.split(/\s+/g).length
    const readingTime = Math.ceil(wordCount / 200)

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
    })

    return {
      frontmatter: data as FrontMatter,
      content,
      slug,
      readingTime,
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

/**
 * Get all posts with frontmatter
 */
export async function getAllPosts(
  type: 'blog' | 'courses' = 'blog'
): Promise<Omit<Post, 'content'>[]> {
  const slugs = getAllPostSlugs(type)
  
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const contentPath = path.join(CONTENT_DIR, type)
      const filePath = path.join(contentPath, `${slug}.mdx`)
      
      let source: string
      if (fs.existsSync(filePath)) {
        source = fs.readFileSync(filePath, 'utf-8')
      } else {
        const mdPath = path.join(contentPath, `${slug}.md`)
        source = fs.readFileSync(mdPath, 'utf-8')
      }

      const { data, content } = matter(source)
      const wordCount = content.split(/\s+/g).length
      const readingTime = Math.ceil(wordCount / 200)

      return {
        frontmatter: data as FrontMatter,
        slug,
        readingTime,
      }
    })
  )

  // Filter out drafts and sort by date
  return posts
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
      )
    })
}

/**
 * Syntax highlighting for code blocks
 */
export async function highlightCode(
  code: string,
  lang: string = 'typescript'
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    })
    return html
  } catch (error) {
    console.error('Error highlighting code:', error)
    return `<pre><code>${code}</code></pre>`
  }
}



