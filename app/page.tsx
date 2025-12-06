import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { format } from 'date-fns'

export default async function HomePage() {
  const posts = await getAllPosts('blog')
  const featuredPosts = posts.filter((post) => post.frontmatter.featured).slice(0, 3)
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16 mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to Code Chronicles
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Learn, build, and master software development. 
          Deep dives into programming concepts, tutorials, and best practices.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium rounded-md transition-colors no-underline"
            style={{ textDecoration: 'none' }}
          >
            Explore Blog
          </Link>
          <Link
            href="/courses"
            className="inline-block px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 font-medium rounded-md transition-colors no-underline"
            style={{ textDecoration: 'none' }}
          >
            View Courses
          </Link>
        </div>
      </section>

      {/* About Me Section */}
      <section className="mb-16 max-w-4xl mx-auto">
        <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-gray-900/50">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Hi, I'm Sandeep Reddy Alalla
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            I'm a <strong className="text-gray-900 dark:text-white">Senior Software Engineer</strong> with extensive experience 
            building scalable web applications across retail, insurance, government, and financial sectors. Currently based in 
            Bentonville, Arkansas, I've worked with diverse technology stacks and contributed to all facets of application development.
          </p>

          {/* Work Experience */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Professional Experience</h3>
            <div className="space-y-5">
              {/* Current Role */}
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Walmart Global Tech
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Senior Software Engineer</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">Aug 2024 - Present</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Currently working as a Senior Software Engineer, contributing to large-scale retail technology solutions 
                  and enterprise applications at one of the world's largest retailers.
                </p>
              </div>

              {/* RiskCanvas Role */}
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      RiskCanvas
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Software Application Developer</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">Mar 2021 - Aug 2024</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Developed cloud-based applications with a focus on code quality and best practices. 
                  Specialized in <strong className="text-gray-900 dark:text-white">Cloud Application Development</strong> and 
                  <strong className="text-gray-900 dark:text-white"> Code Review</strong>, contributing to robust and scalable solutions.
                </p>
              </div>

              {/* State of Wisconsin Role */}
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      State of Wisconsin
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Software Application Developer</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">Mar 2018 - Mar 2021</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Worked on cloud application development for state government services, contributing to public-facing 
                  applications and internal systems. Gained experience working with government technology requirements 
                  and compliance standards.
                </p>
              </div>

              {/* American Family Insurance Role */}
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      American Family Insurance
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Software Application Developer</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">Jun 2016 - Feb 2018</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Developed and maintained multiple high-impact applications including Styleguide (design system), 
                  amfam.com (corporate website), rewards applications, and premium calculation tools. 
                  Contributed to both front-end and back-end development initiatives.
                </p>
              </div>

              {/* Legg Mason Role */}
              <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Legg Mason
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Web Developer</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">Dec 2014 - May 2016</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Worked on web applications for asset management, contributing to financial technology solutions 
                  and gaining valuable experience in the financial services industry.
                </p>
              </div>
            </div>
          </div>
          
          {/* Technical Skills */}
          <div className="mb-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Frontend</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Angular, React, AngularJS, Ember, JavaScript, jQuery
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Backend</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  .NET Core, Node.js, Express, Flask, Django
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Databases</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  SQL, MongoDB
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <a
              href="https://sandeepallala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 font-medium rounded-md transition-colors text-sm text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              My Website
            </a>
            <a
              href="https://www.linkedin.com/in/sandeep-reddy-alalla/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 font-medium rounded-md transition-colors text-sm text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:Sandeepallala@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 font-medium rounded-md transition-colors text-sm text-gray-700 dark:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="h-full p-5 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-gray-900/50"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mb-3">
                    <time dateTime={post.frontmatter.publishedAt}>
                      {format(new Date(post.frontmatter.publishedAt), 'MMM dd, yyyy')}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                    {post.frontmatter.excerpt}
                  </p>
                </Link>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {post.frontmatter.course && (
                    <Link
                      href={`/courses/${post.frontmatter.course.id}`}
                      className="px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                      {post.frontmatter.course.id}
                    </Link>
                  )}
                  {post.frontmatter.tags && (
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
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Articles</h2>
          <Link
            href="/blog"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium flex items-center gap-1 group transition-colors"
          >
            View all 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full p-5 border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-all bg-white dark:bg-gray-900/50">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mb-3">
                  <time dateTime={post.frontmatter.publishedAt}>
                    {format(new Date(post.frontmatter.publishedAt), 'MMM dd, yyyy')}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {post.frontmatter.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {post.frontmatter.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-12 p-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-md text-center">
        <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Stay Updated</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 max-w-xl mx-auto">
          New articles and tutorials published regularly. 
          Follow along on the journey of continuous learning.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="https://www.linkedin.com/in/sandeep-reddy-alalla/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium rounded-md transition-colors text-sm"
          >
            Connect on LinkedIn
          </a>
          <a
            href="mailto:Sandeepallala@gmail.com"
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 font-medium rounded-md transition-colors text-sm"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
