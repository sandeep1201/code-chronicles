import Link from 'next/link';
import { getAllChallenges } from '@/lib/challenges';
import { format } from 'date-fns';

export const metadata = {
  title: 'JavaScript Challenges | Code Chronicles',
  description:
    'Practice coding challenges with detailed solutions and educational blog posts covering JavaScript concepts.',
};

export default async function ChallengesPage() {
  const challenges = await getAllChallenges();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          JavaScript Challenges
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Learn JavaScript by solving coding challenges. Each challenge includes
          a detailed implementation guide and covers all the concepts you need
          to master.
        </p>
      </header>

      {challenges.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No challenges yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <article
              key={challenge.slug}
              className="h-full p-6 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-gray-900/50 flex flex-col"
            >
              <div className="flex gap-2 mb-3 flex-wrap">
                {challenge.difficulty && (
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                      challenge.difficulty === 'easy'
                        ? 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : challenge.difficulty === 'medium'
                          ? 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {challenge.difficulty}
                  </span>
                )}
                {challenge.featured && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                    Featured
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                {challenge.title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                {challenge.description}
              </p>

              <div className="space-y-3 mt-auto">
                {challenge.concepts && challenge.concepts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.concepts.slice(0, 5).map((concept) => (
                      <span
                        key={concept}
                        className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
                      >
                        {concept}
                      </span>
                    ))}
                    {challenge.concepts.length > 5 && (
                      <span className="px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                        +{challenge.concepts.length - 5}
                      </span>
                    )}
                  </div>
                )}

                {challenge.blogPostSlug && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                    <Link
                      href={`/blog/${challenge.blogPostSlug}`}
                      className="block w-full px-4 py-2 text-sm font-medium text-center bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-md transition-colors"
                    >
                      Read Implementation Guide
                    </Link>
                  </div>
                )}

                {challenge.addedAt && (
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    Added {format(new Date(challenge.addedAt), 'MMM dd, yyyy')}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <section className="mt-12 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-md text-center">
        <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
          Want to Contribute?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 max-w-xl mx-auto">
          Have a great coding challenge idea or want to see more challenges?
          Feel free to suggest new challenges!
        </p>
        <a
          href="mailto:Sandeepallala@gmail.com"
          className="inline-block px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium rounded-md transition-colors text-sm"
        >
          Suggest a Challenge
        </a>
      </section>
    </div>
  );
}
