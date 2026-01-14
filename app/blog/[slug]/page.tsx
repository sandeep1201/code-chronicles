import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs('blog');
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'blog');

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.sandeepallala.com';
  const url = `${siteUrl}/blog/${slug}`;

  return {
    title: `${post.frontmatter.title} | Code Chronicles`,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.tags,
    authors: [{ name: post.frontmatter.author || 'Sandeep Reddy Alalla' }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      url: url,
      publishedTime: post.frontmatter.publishedAt,
      modifiedTime: post.frontmatter.updatedAt || post.frontmatter.publishedAt,
      tags: post.frontmatter.tags,
      authors: [post.frontmatter.author || 'Sandeep Reddy Alalla'],
      siteName: 'Code Chronicles',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'blog');

  if (!post) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.sandeepallala.com';
  const url = `${siteUrl}/blog/${slug}`;

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image: `${siteUrl}/og-image.png`, // You can add OG images later
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt || post.frontmatter.publishedAt,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || 'Sandeep Reddy Alalla',
      url: 'https://sandeepallala.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Code Chronicles',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.frontmatter.tags.join(', '),
    articleSection: post.frontmatter.course?.id || 'JavaScript',
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        {/* Article Header */}
        <header className="mb-16">
          <div className="flex flex-wrap gap-2 mb-6 items-center">
            {post.frontmatter.draft && (
              <span className="px-3 py-1 text-sm font-medium bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                Draft
              </span>
            )}
            {post.frontmatter.course && (
              <Link
                href={`/courses/${post.frontmatter.course.id}`}
                className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {post.frontmatter.course.id} Course
              </Link>
            )}
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-gray-900 dark:text-white leading-tight">
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-500">
            <time dateTime={post.frontmatter.publishedAt}>
              {format(new Date(post.frontmatter.publishedAt), 'MMMM dd, yyyy')}
            </time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
            {post.frontmatter.updatedAt && (
              <>
                <span>•</span>
                <span>
                  Updated{' '}
                  {format(new Date(post.frontmatter.updatedAt), 'MMM dd, yyyy')}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-dark max-w-none">
          {post.content}
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Written by {post.frontmatter.author || 'Code Chronicles'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your thoughts and feedback!
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.frontmatter.title)}&url=${encodeURIComponent(`https://code-chronicles.dev/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://code-chronicles.dev/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
