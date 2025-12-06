export const metadata = {
  title: 'About | Code Chronicles',
  description: 'Learn more about Code Chronicles and the journey behind it.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
        About Code Chronicles
      </h1>

      <div className="prose prose-lg dark:prose-dark max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A platform for learning in public, sharing knowledge, and building 
          a community of curious developers.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">
          The Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Code Chronicles exists to make learning software development more accessible, 
          practical, and enjoyable. By documenting the learning journey and sharing insights, 
          we create a resource that helps others avoid common pitfalls and accelerate their growth.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">
          What Makes This Different?
        </h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span><strong>Learn in Public</strong> - Real learning journey, not polished perfection</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span><strong>Interactive Content</strong> - Code you can run, concepts you can explore</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span><strong>Practical Focus</strong> - Real-world examples and applications</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
            <span><strong>Continuously Updated</strong> - Content evolves as understanding deepens</span>
          </li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">
          Topics Covered
        </h2>
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Frontend</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">React, Next.js, TypeScript</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Backend</h3>
            <p className="text-sm text-purple-800 dark:text-purple-200">Node.js, APIs, Databases</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">DevOps</h3>
            <p className="text-sm text-green-800 dark:text-green-200">CI/CD, Docker, Cloud</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2">Fundamentals</h3>
            <p className="text-sm text-orange-800 dark:text-orange-200">Algorithms, Patterns, Design</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">
          Get in Touch
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Have questions, suggestions, or just want to connect? Reach out through:
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mt-4">
          <li>
            <a href="https://github.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              GitHub - Follow and contribute
            </a>
          </li>
          <li>
            <a href="https://twitter.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              Twitter - Daily insights and updates
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              LinkedIn - Professional connections
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}


