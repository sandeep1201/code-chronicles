---
name: blog-writer
description: Writes blog posts for Code Chronicles following the established structure, style, and quality standards. Use when the user asks to write a blog post, create a new article, draft a tutorial, write about a topic, publish a post, or create content for the blog. Always finishes with the blog-human-voice / humanizer anti-AI pass — never hand the user a first draft that skipped it.
---

# Code Chronicles Blog Writer

Follow this workflow end-to-end when writing a new blog post. **Do not skip steps.** Step 4 (humanizer) is mandatory for every post and for quiz explanation copy — not optional polish.

**Human voice:** Read and apply [blog-human-voice](../blog-human-voice/SKILL.md) (Code Chronicles voice + anti-AI pass inspired by [Humanizer](https://github.com/blader/humanizer)). If prose still reads like a syllabus or press release, run the pass again before step 5.

## Workflow

### 1. Gather Context

Before writing, determine:
- **Topic**: What the post is about (from user or inferred)
- **Course**: Which course it belongs to (check `content/courses/` for existing courses)
- **Audience level**: beginner, intermediate, or advanced
- **Draft or publish**: Default to `draft: true` unless the user says to publish

If unclear, ask the user before proceeding.

### 2. Generate the Slug

Derive a URL-friendly slug from the topic:
- Lowercase, hyphen-separated
- Concise but descriptive
- Example: `understanding-javascript-closures`, `component-api-design-building-reusable-components`

### 3. Create the Blog Post File

**Draft**: `content/blog/drafts/{slug}.mdx`
**Published**: `content/blog/{slug}.mdx`

Use this exact structure:

```mdx
---
title: "Post Title: Subtitle"
slug: {slug}
excerpt: >-
  A compelling 1-2 sentence description that hooks the reader. 150-160 chars for SEO.
publishedAt: '{YYYY-MM-DD}'
tags:
  - tag1
  - tag2
  - fundamentals
author: Sandeep Reddy Alalla
featured: true
course:
  id: '{course-id}'
  module: '{module-name}'
  order: {N}
draft: true
---

# Post Title: Subtitle

[Personal narrative hook — a real problem or confusion you faced.
1-2 paragraphs, first person, specific and relatable.]

[What the post will cover — 1 paragraph overview.]

**Intended audience**: [Who should read this] — from [level] developers who [situation] to [level] developers who want to [goal].

**Prerequisites**:
- [Prerequisite 1](/link-if-exists)
- Basic understanding of [concept]

<!-- No Table of Contents needed — the site auto-generates the "On this page" sidebar from your headings. -->

## Section 1

[Content using progressive disclosure: simple → complex]
[Include code examples with comments]
[Show "wrong" and "right" approaches when relevant]

---

## Section 2

[Continue with next concept...]

---

## Key Takeaways

1. **Point one** — explanation
2. **Point two** — explanation
...

---

## Test Your Understanding

<Quiz quizId="{slug}" />

---

Happy coding!
```

### 4. Humanizer pass (mandatory — do not skip)

**Read** [blog-human-voice/SKILL.md](../blog-human-voice/SKILL.md) and apply it to the full MDX draft **before** creating social copy or calling the draft done.

Minimum actions every time:

1. **Voice** — hook is specific (time, mistake, surprise); first person; why before how; no generic "In today's landscape" openers.
2. **Anti-AI pass** — run sections 1–9 in blog-human-voice (cut inflated significance, AI vocabulary clusters, `-ing` trailing chains, em-dash spam, identical list shapes, chatbot sign-offs).
3. **Final self-audit** — blog-human-voice §10: list 2–5 remaining tells, revise, read opening + closing aloud.
4. **Site rules** — no hand-authored `## Table of Contents` (auto "On this page" sidebar); no module numbers in reader-facing prose; series links by post title.

If the user only asked for a "quick draft," still humanize — label it `draft: true`, but prose must not read like raw model output.

**Do not** present the post to the user until this step is complete.

### 5. Create the Companion Quiz

**File**: `content/blog/quizzes/{slug}-quiz.json`

```json
{
  "id": "{slug}-quiz",
  "title": "Test Your Understanding: [Topic]",
  "description": "See how well you understood the concepts in this post!",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Question text?",
      "options": [
        { "id": "a", "text": "Option A", "correct": false },
        { "id": "b", "text": "Option B", "correct": true },
        { "id": "c", "text": "Option C", "correct": false },
        { "id": "d", "text": "Option D", "correct": false }
      ],
      "explanation": "Detailed explanation that teaches, not just confirms."
    }
  ]
}
```

Quiz rules:
- **5–10 questions** per post (concept posts often 5–6; case studies up to 10)
- Mix types: `multiple-choice`, `multiple-select`, `true-false`
- Test trade-offs and judgment, not definition recall
- Explanations should teach — explain *why* the answer is correct and *why* the others aren't
- Run a **light humanizer pass** on question stems and explanations (no "Additionally," hollow "crucial," chatbot tone)

### 6. Verify Quality

Run through this checklist before presenting to the user:

- [ ] **Humanizer pass completed** (step 4) — opening sounds like you telling a story, not a brochure
- [ ] Personal narrative hook at the beginning (specific problem, specific confusion)
- [ ] Intended audience statement
- [ ] Prerequisites listed (link to related posts if they exist)
- [ ] **No** hand-authored `## Table of Contents` (site auto-generates "On this page")
- [ ] Progressive disclosure in content (simple → complex)
- [ ] Not every section uses the same shape (table → bullet list → "What breaks when" — vary prose vs tables)
- [ ] Diagrams where helpful — **2–4 for system design / agentic architecture posts** using `<Mermaid chart={\`...\`} />` (see `BLOG_WRITING_PROMPT.md` § Diagrams); prefer `flowchart LR`, short labels
- [ ] Code examples with both "wrong" and "right" approaches when relevant
- [ ] Key Takeaways — numbered, each point distinct (not three parallel "-ing" clauses)
- [ ] Quiz JSON created; `<Quiz quizId="{slug}" />` at end of post
- [ ] Frontmatter complete (title, slug, excerpt, tags, author, course, draft)
- [ ] Title uses double quotes in frontmatter (single quotes break on apostrophes)
- [ ] Slug matches between frontmatter, filename, and quiz `quizId`
- [ ] Anti-AI spot-check: no dense clusters of *delve, landscape, pivotal, crucial, underscore, testament, vibrant, showcases*; straight `"` quotes in prose

### 7. Generate Social Content (Content Leverage Engine)

**Only after** step 4 (humanizer) and step 6 (quality checklist) pass, run the [Content Leverage Engine](../content-leverage-engine/SKILL.md) on the new post. Do not wait for the user to ask — this step is automatic unless they said "draft only, no social."

Use the blog post file you just created as the source. Generate all outputs:
- **A. LinkedIn Post** — hook + story beats + link; save to `.social/{slug}-linkedin.json`; **run [blog-human-voice](../blog-human-voice/SKILL.md) LinkedIn section** on the JSON text before saving (step 7 is not done until LinkedIn passes the anti-AI pass)
- **B. Twitter/X Thread** — 6-tweet thread
- **C. Instagram Carousel** — 8–10 slides + caption with hashtags
- **D. Instagram Reel Script** — 30–60 second script
- **E. Newsletter Snippet** — subject line + summary + takeaways
- **F. Quiz Questions** — skip (already created in step 4)
- **G. Challenge Idea** — suggest if the topic is buildable

Present all social content to the user after the quality checklist passes.

---

## Writing Style Rules

### Tone
- First person narrative: "I learned...", "I discovered...", "When I first saw..."
- Conversational but technically accurate
- Learning-first: explain the "why" before the "how"
- Honest about mistakes: "Here's what I got wrong..."
- **After the first draft:** always run [blog-human-voice](../blog-human-voice/SKILL.md) — raw structure is not shippable prose

### Anti-AI tells to avoid in first drafts (fix in step 4)
- Mirror sections across posts ("Design priorities:", "Trade-offs:", "What breaks when" in the same order every time)
- Overview paragraph that repeats the title ("This post defines...")
- Bullet lists where every item is `**Bold label:** explanation`
- Hollow significance ("fundamental," "cornerstone," "inherent") without a concrete example
- Perfect parallel sentence rhythm — mix short and long sentences
- **Nonsense hooks** — quoted marketing phrases used as nouns (*"works in Slack" design*), or anecdotes where the reader cannot tell what actually happened (see blog-human-voice **Hooks must parse**)

### Code Examples
- Practical, runnable code
- Comments on key parts only (no narration comments)
- Show bad approach first, then good approach, with explanation of the difference
- Use syntax highlighting with language tags (`tsx`, `typescript`, `javascript`, `css`, `html`)

### Formatting
- **Bold** for key terms on first introduction only
- `Backticks` for inline code, file names, and technical terms
- `---` horizontal rules between major sections
- Emoji only in closing: "Happy coding!"
- Never use emojis in headings or body text

### Frontmatter Gotcha
- Always use **double quotes** for the `title` field (single quotes break on apostrophes like "Don't")
- Use `>-` for multi-line `excerpt` values

---

## File Locations

| What | Where |
|---|---|
| Draft post | `content/blog/drafts/{slug}.mdx` |
| Published post | `content/blog/{slug}.mdx` |
| Quiz file | `content/blog/quizzes/{slug}-quiz.json` |
| Course metadata | `content/courses/{course-id}/meta.json` |
| Blog loader | `lib/mdx.ts` |
| Challenge metadata | `content/challenges/{slug}.json` |

---

## Publishing Checklist

When the user says "publish" or "move to published":

Run: `npm run publish-post -- {slug}`

This script:
1. Moves the draft from `content/blog/drafts/` to `content/blog/`
2. Sets `draft: false` and `publishedAt` to today
3. **If an X thread draft exists** at `content/blog/drafts/.social/{slug}-x.json`, posts it to X and removes the file
4. Posts to LinkedIn if credentials are set

The X draft is created automatically by the content-leverage-engine (step 6) when the post is written. User can edit `content/blog/drafts/.social/{slug}-x.json` before publishing.
