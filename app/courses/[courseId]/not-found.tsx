import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        The course you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/courses"
        className="inline-block px-6 py-3 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium rounded-md transition-colors"
      >
        Back to Courses
      </Link>
    </div>
  );
}








