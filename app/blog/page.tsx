import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { format } from 'date-fns';

export const metadata = {
  title: 'Blog | Code Chronicles',
  description: 'Articles, tutorials, and insights about software development.',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="h-full p-6 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-gray-900/50"
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {post.frontmatter.draft && (
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                      Draft
                    </span>
                  )}
                  {post.frontmatter.featured && (
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mb-3">
                  <time dateTime={post.frontmatter.publishedAt}>
                    {format(
                      new Date(post.frontmatter.publishedAt),
                      'MMM dd, yyyy',
                    )}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>

                <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {post.frontmatter.title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.frontmatter.excerpt}
                </p>
              </Link>

              <div className="flex flex-wrap gap-2 items-center">
                {post.frontmatter.course && (
                  <Link
                    href={`/courses/${post.frontmatter.course.id}`}
                    className="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    {post.frontmatter.course.id}
                  </Link>
                )}
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <>
                    {post.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
