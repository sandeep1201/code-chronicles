import Link from 'next/link';
import { getAllCourses } from '@/lib/courses';

export const metadata = {
  title: 'Courses | Code Chronicles',
  description: 'Structured learning paths and course notes.',
};

export default async function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Courses
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Structured learning paths with detailed notes, code examples, and exercises.
        </p>
      </header>

      {courses.length === 0 ? (
        <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-md text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Courses coming soon!
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Stay tuned for structured learning paths
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group"
            >
              <article className="h-full p-6 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-gray-900/50">
                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>
{course.modules.length}
{' '}
module
{course.modules.length !== 1 ? 's' : ''}
</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


