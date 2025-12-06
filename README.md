# 📚 Code Chronicles

A modern, feature-rich blogging platform built with Next.js 15, TypeScript, and MDX. Perfect for technical writing, course notes, and sharing knowledge.

## ✨ Features

- **📝 MDX Support** - Write content in Markdown with React components
- **🎨 Dark Mode** - Beautiful dark/light theme with smooth transitions
- **⚡ Fast Performance** - Built with Next.js 15 App Router and Server Components
- **💅 Modern UI** - Tailwind CSS with responsive design
- **🎯 SEO Optimized** - Meta tags, Open Graph, and structured data
- **🔍 Syntax Highlighting** - Beautiful code blocks with Shiki
- **📱 Mobile Friendly** - Responsive design that works everywhere
- **♿ Accessible** - WCAG compliant with proper semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. **Clone and navigate to the project:**
```bash
cd code-chronicles
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
```
http://localhost:3000
```

## 📁 Project Structure

```
code-chronicles/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing and posts
│   ├── courses/           # Course pages
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── layout/            # Header, Footer
│   ├── mdx/               # Custom MDX components
│   ├── ui/                # Reusable UI components
│   └── theme-provider.tsx # Dark mode context
├── content/
│   ├── blog/              # Blog posts (.mdx files)
│   └── courses/           # Course content (.mdx files)
├── lib/
│   ├── mdx.ts             # MDX processing utilities
│   └── courses.ts         # Course management utilities
├── public/                # Static assets
├── docs/                  # Documentation
│   ├── QUICKSTART.md      # Quick start guide
│   ├── MIGRATION_GUIDE.md # Content migration guide
│   └── PROJECT_SUMMARY.md # Project overview
├── prompts/               # AI prompt templates
│   ├── BLOG_WRITING_PROMPT.md
│   └── STRING_INTERPOLATION_PROMPT.md
└── styles/                # Global styles
```

## ✍️ Writing Content

### Creating a Blog Post

1. Create a new `.mdx` file in `content/blog/`:

```bash
touch content/blog/my-awesome-post.mdx
```

2. Add frontmatter and content:

```mdx
---
title: "My Awesome Post"
slug: "my-awesome-post"
excerpt: "A brief description of your post"
publishedAt: "2024-12-05"
tags: ["javascript", "tutorial"]
author: "Your Name"
featured: false
draft: false
---

# My Awesome Post

Your content here...
```

3. Your post will automatically appear on the blog page!

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `slug` | string | ✅ | URL slug |
| `excerpt` | string | ✅ | Short description |
| `publishedAt` | string | ✅ | Publication date (YYYY-MM-DD) |
| `tags` | array | ✅ | Topic tags |
| `author` | string | ❌ | Author name |
| `featured` | boolean | ❌ | Show as featured |
| `draft` | boolean | ❌ | Hide from listings |
| `updatedAt` | string | ❌ | Last update date |

## 🎨 Custom Components

Use custom React components in your MDX:

### Callout

```mdx
<Callout type="info">
This is an info callout!
</Callout>
```

Types: `info`, `warning`, `success`, `error`

### Code Block with Filename

```mdx
<CodeBlock filename="app.ts">
const greeting = "Hello World"
</CodeBlock>
```

## 🎯 Available Scripts

```bash
# Development
npm run dev        # Start dev server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint

# Type checking
npx tsc --noEmit  # Check TypeScript types
```

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [MDX](https://mdxjs.com/) | Markdown + JSX |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Shiki](https://shiki.matsu.io/) | Syntax highlighting |
| [date-fns](https://date-fns.org/) | Date formatting |

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
  title: 'Your Blog Name',
  description: 'Your description',
  // ...
}
```

### Header Links

Modify `components/layout/header.tsx` to add/remove navigation links.

### Footer

Edit `components/layout/footer.tsx` to update footer content and social links.

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy! ✨

### Deploy to Other Platforms

```bash
# Build for production
npm run build

# The output is in .next/ folder
# Upload to your hosting provider
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new features
- Fix bugs
- Improve documentation
- Suggest enhancements

## 📝 License

MIT License - feel free to use this for your own blog!

## 🙏 Acknowledgments

- Inspired by [Josh Comeau's Blog](https://www.joshwcomeau.com/)
- Built with love using Next.js
- Syntax highlighting powered by Shiki

## 📧 Contact

Questions or feedback? Reach out:

- GitHub: [Your GitHub](https://github.com)
- Twitter: [Your Twitter](https://twitter.com)
- Email: your.email@example.com

---

**Happy blogging!** 🚀
