import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getCoursePostsByModule } from '@/lib/courses';
import { getBlogImageSrc } from '@/lib/blog-images';

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export async function generateStaticParams() {
  // This would need to be implemented to get all course IDs
  return [];
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { courseId } = await params;
  const courseData = await getCoursePostsByModule(courseId);

  if (!courseData) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${courseData.course.title} | Code Chronicles`,
    description: courseData.course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const courseData = await getCoursePostsByModule(courseId);

  if (!courseData) {
    notFound();
  }

  const { course, postsByModule } = courseData;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Course Header */}
      <header className="mb-12">
        <Link
          href="/courses"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4 inline-block transition-colors"
        >
          ← Back to Courses
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {course.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {course.description}
        </p>
      </header>

      {/* Modules */}
      {course.modules.map((module) => {
        const modulePosts = postsByModule[module.id] || [];

        return (
          <section key={module.id} className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {module.name}
              </h2>
              {module.description && (
                <p className="text-gray-600 dark:text-gray-400">
                  {module.description}
                </p>
              )}
            </div>

            {modulePosts.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                No posts in this module yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {modulePosts.map((post) => (
                  <article
                    key={post.slug}
                    className="h-full flex flex-col border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-gray-900/50 overflow-hidden"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col h-full"
                    >
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
                        <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                          {post.frontmatter.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
                          {post.frontmatter.excerpt}
                        </p>
                        <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors mt-2 self-end">
                          →
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
