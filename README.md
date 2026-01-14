# 📚 Code Chronicles

<div align="center">

A modern, feature-rich blogging platform built with Next.js 15, TypeScript, and
MDX. Perfect for technical writing, course notes, and sharing knowledge.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## ✨ Features

- **📝 MDX Support** - Write content in Markdown with React components
- **🎨 Dark Mode** - Beautiful dark/light theme with smooth transitions
- **⚡ Fast Performance** - Built with Next.js 15 App Router and Server
  Components
- **💅 Modern UI** - Tailwind CSS with responsive design
- **🎯 SEO Optimized** - Meta tags, Open Graph, and structured data
- **🔍 Syntax Highlighting** - Beautiful code blocks with Shiki
- **📱 Mobile Friendly** - Responsive design that works everywhere
- **♿ Accessible** - WCAG compliant with proper semantic HTML
- **📚 Course Organization** - Organize blog posts into structured courses
- **🔗 Auto-linking Headings** - Automatic anchor links for easy navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/sandeep1201/code-chronicles.git
cd code-chronicles
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**

```
http://localhost:3000
```

## 📁 Project Structure

```
code-chronicles/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing and individual posts
│   │   ├── [slug]/        # Dynamic blog post pages
│   │   └── page.tsx       # Blog listing page
│   ├── courses/           # Course pages
│   │   ├── [courseId]/    # Individual course pages
│   │   └── page.tsx       # Courses listing page
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components
│   │   ├── header.tsx     # Navigation header
│   │   ├── footer.tsx     # Site footer
│   │   └── root-layout-wrapper.tsx
│   ├── mdx/               # Custom MDX components
│   │   └── index.tsx      # MDX component exports
│   ├── theme-provider.tsx # Dark mode context provider
│   └── ui/                # Reusable UI components
├── content/
│   ├── blog/              # Blog posts (.mdx files)
│   │   ├── welcome.mdx
│   │   └── ...
│   └── courses/           # Course metadata
│       └── javascript/
│           └── meta.json  # Course configuration
├── lib/
│   ├── mdx.ts             # MDX processing utilities
│   └── courses.ts         # Course management utilities
├── public/                # Static assets
└── package.json           # Dependencies
```

## ✍️ Writing Content

### Creating a Blog Post

1. **Create a new `.mdx` file in `content/blog/`:**

```bash
touch content/blog/my-awesome-post.mdx
```

2. **Add frontmatter and content:**

```mdx
---
title: 'My Awesome Post'
slug: 'my-awesome-post'
excerpt: 'A brief description of your post'
publishedAt: '2024-12-05'
tags: ['javascript', 'tutorial']
author: 'Sandeep Reddy Alalla'
featured: false
draft: false
course:
  id: 'javascript'
  module: '01-fundamentals'
  order: 1
---

# My Awesome Post

Your content here...
```

3. **Your post will automatically appear on the blog page!**

### Frontmatter Fields

| Field         | Type    | Required | Description                         |
| ------------- | ------- | -------- | ----------------------------------- |
| `title`       | string  | ✅       | Post title                          |
| `slug`        | string  | ✅       | URL slug (used in URL)              |
| `excerpt`     | string  | ✅       | Short description for listings      |
| `publishedAt` | string  | ✅       | Publication date (YYYY-MM-DD)       |
| `tags`        | array   | ✅       | Topic tags for categorization       |
| `author`      | string  | ❌       | Author name                         |
| `featured`    | boolean | ❌       | Show as featured on homepage        |
| `draft`       | boolean | ❌       | Hide from listings (default: false) |
| `updatedAt`   | string  | ❌       | Last update date                    |
| `course`      | object  | ❌       | Course organization (see below)     |

### Course Organization

Organize your blog posts into courses by adding course metadata:

```mdx
---
course:
  id: 'javascript' # Course identifier
  module: '01-fundamentals' # Module within course
  order: 1 # Order within module
---
```

**Course Structure:**

- Create course metadata in `content/courses/{courseId}/meta.json`
- Posts with matching `course.id` will appear on the course page
- Posts are automatically sorted by module and order

**Example Course Meta:**

```json
{
  "id": "javascript",
  "title": "JavaScript Fundamentals",
  "description": "Deep dives into JavaScript concepts",
  "modules": [
    {
      "id": "01-fundamentals",
      "name": "Fundamentals",
      "description": "Core JavaScript concepts",
      "order": 1
    }
  ]
}
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      // Your custom colors
    },
  },
},
```

### Site Metadata

Update `app/layout.tsx` for site-wide metadata:

```typescript
export const metadata: Metadata = {
  title: 'Code Chronicles - Learn, Build, Share',
  description: 'A blog about software development',
  // ...
};
```

### Header & Footer

- **Header**: Modify `components/layout/header.tsx` to add/remove navigation
  links
- **Footer**: Edit `components/layout/footer.tsx` to update footer content and
  social links

## 🎯 Available Scripts

```bash
# Development
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint

# Type checking
npx tsc --noEmit  # Check TypeScript types without building
```

## 🛠️ Technology Stack

| Technology                                                  | Purpose                         | Version             |
| ----------------------------------------------------------- | ------------------------------- | ------------------- |
| [Next.js](https://nextjs.org/)                              | React framework with App Router | 16.0.7              |
| [TypeScript](https://www.typescriptlang.org/)               | Type safety                     | 5.x                 |
| [React](https://react.dev/)                                 | UI library                      | 19.2.0              |
| [MDX](https://mdxjs.com/)                                   | Markdown + JSX                  | via next-mdx-remote |
| [Tailwind CSS](https://tailwindcss.com/)                    | Utility-first CSS               | 3.4.1               |
| [Shiki](https://shiki.matsu.io/)                            | Syntax highlighting             | 3.19.0              |
| [date-fns](https://date-fns.org/)                           | Date formatting                 | 4.1.0               |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Frontmatter parsing             | 4.0.3               |

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js
4. Deploy! ✨

The platform will automatically:

- Build your Next.js application
- Optimize for production
- Provide a custom domain
- Enable automatic deployments on push

### Deploy to Other Platforms

```bash
# Build for production
npm run build

# The output is in .next/ folder
# Upload to your hosting provider
```

**Supported Platforms:**

- Vercel (recommended)
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting provider

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Acknowledgments

- Inspired by [Josh Comeau's Blog](https://www.joshwcomeau.com/) - Educational
  structure and writing style
- Built with [Next.js](https://nextjs.org/) - Amazing React framework
- Syntax highlighting powered by [Shiki](https://shiki.matsu.io/) - Beautiful
  code blocks

## 📧 Contact & Links

- **GitHub**: [@sandeep1201](https://github.com/sandeep1201)
- **LinkedIn**:
  [Sandeep Reddy Alalla](https://www.linkedin.com/in/sandeep-reddy-alalla/)
- **Website**: [sandeepallala.com](https://sandeepallala.com)
- **Email**: Sandeepallala@gmail.com

---

<div align="center">

**Made with ❤️ by Sandeep Reddy Alalla**

⭐ Star this repo if you find it helpful!

</div>
