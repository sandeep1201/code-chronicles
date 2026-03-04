import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import { getBlogImageSrc } from '@/lib/blog-images';
import { format } from 'date-fns';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.sandeepallala.com';

export const metadata = {
  title: 'Blog | Code Chronicles',
  description: 'Articles, tutorials, and insights about software development.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog | Code Chronicles',
    description: 'Articles, tutorials, and insights about software development.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    siteName: 'Code Chronicles',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Code Chronicles',
    description: 'Articles, tutorials, and insights about software development.',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts('blog');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Tutorials, insights, and deep dives into software development. New
          articles published regularly.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="h-full flex flex-col border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-gray-900/50 overflow-hidden"
            >
              <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
                  <Image
                    src={getBlogImageSrc(post.slug, post.frontmatter.image)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mb-2">
                    <time dateTime={post.frontmatter.publishedAt}>
                      {format(
                        new Date(post.frontmatter.publishedAt),
                        'MMM dd, yyyy',
                      )}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h2 className="text-base font-bold mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
                    {post.frontmatter.excerpt}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap items-center">
                    {post.frontmatter.draft && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                        Draft
                      </span>
                    )}
                    {post.frontmatter.featured && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                        Featured
                      </span>
                    )}
                    {post.frontmatter.course && (
                      <Link
                        href={`/courses/${post.frontmatter.course.id}`}
                        className="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                      >
                        {post.frontmatter.course.id}
                      </Link>
                    )}
                    {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
