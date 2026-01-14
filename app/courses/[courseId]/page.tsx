import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getCoursePostsByModule } from '@/lib/courses';

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
              <div className="space-y-4">
                {modulePosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-5 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-gray-900/50 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <time className="text-xs text-gray-500 dark:text-gray-500">
                            {format(
                              new Date(post.frontmatter.publishedAt),
                              'MMM dd, yyyy',
                            )}
                          </time>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            •
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {post.readingTime} min read
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {post.frontmatter.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.frontmatter.excerpt}
                        </p>
                      </div>
                      <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
