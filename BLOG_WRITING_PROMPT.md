# Blog Writing Prompt

This document outlines the structure, style, and requirements for writing blog posts for Code Chronicles.

---

## Post Structure

Every blog post should follow this structure:

### 1. Frontmatter (Required)

```yaml
---
title: 'Your Post Title'
slug: 'your-post-slug'
excerpt: "A compelling 1-2 sentence description that hooks the reader (150-160 chars for SEO)"
publishedAt: '2024-12-22'
tags: ['tag1', 'tag2', 'tag3', 'fundamentals', 'beginner']
author: 'Sandeep Reddy Alalla'
featured: true
draft: true  # Set to false when publishing
scheduledPublishAt: '2024-12-22'  # For drafts only
course:
  id: 'course-id'
  module: 'module-name'
  order: 1
---
```

### 2. Title and Hook (Required)

Start with a **personal narrative hook** - a real problem or confusion you faced:

```markdown
# Your Post Title

I was working on [specific task] and [unexpected thing happened]. I spent hours
[debugging/researching/trying], only to realize [the fundamental misunderstanding].

That's when I learned about [concept]—[why it matters in 1-2 sentences].
```

### 3. Post Introduction

After the hook, provide:
- What the post will cover
- **Intended audience** statement
- **Prerequisites** (if any, link to related posts)

### 4. Table of Contents (auto-generated — do not write one)

Do **not** add a `## Table of Contents` section. The site generates a sticky
"On this page" sidebar automatically from each post's `##`/`###` headings, with
scroll-spy highlighting on desktop and a collapsible version on mobile. Any
hand-authored `## Table of Contents` section is stripped at render time, so
writing one is redundant. Just write clear, well-structured headings and the
sidebar takes care of itself.

### 5. Main Content Sections

- Use progressive disclosure (simple → complex)
- Include code examples with comments
- Add "Why" explanations (design decisions, historical context)
- Include practical warnings and gotchas
- Use real-world examples

### 5a. Diagrams and Figures (Recommended — required for system design posts)

Long text-only architecture posts are hard to scan. Use **2–4 visuals** per post.

#### `<Mermaid>` — diagrams in MDX source

Best for flows, architecture boxes, sequence diagrams, and comparisons. **Available in every blog post** — registered globally in `components/mdx/index.tsx` (client-only render via `MermaidDiagram.tsx`, theme-aware SVG, 12px Inter labels).

```mdx
<Mermaid chart={`flowchart LR
  Client --> LB[Load Balancer]
  LB --> Cache[(Redis)]
  Cache --> DB[(Database)]
`} />
```

Or with children (template literal in MDX):

```mdx
<Mermaid>{`
sequenceDiagram
  Client->>API: GET /item
  API->>Cache: lookup
  Cache-->>API: miss
  API->>DB: query
`}</Mermaid>
```

**Use Mermaid for:** request paths, node add/remove, retry sequences, decision flows.

**Mermaid tips (follow for all posts):**
- One idea per diagram — prefer several small diagrams over one giant chart
- **Prefer `flowchart LR`** (horizontal) for multi-step flows; avoid tall `flowchart TD` stacks
- **Keep labels short and single-line** — e.g. `[Hash server]` not `["1. Hash server<br/>onto ring"]`; use a numbered list below for detail
- Avoid special characters like `→` in labels when possible (they widen nodes)
- Put each `<Mermaid />` on its own line (block component, not inside a paragraph)
- Test locally with `npm run dev` before publishing

#### `<HashRing>` — circular hash ring (servers on a circle)

Use when the **ring metaphor** matters — Mermaid flowcharts can't lay nodes on a true circle. Renders an SVG with servers and keys on the ring, plus a clockwise ownership arrow.

```mdx
<HashRing />
```

Defaults match the consistent-hashing post (Server C, B, A + key-X → Server A). For custom layouts, pass `servers`, `keyPoint`, and `ownerIndex` props (each point has `label` and `t`, where `t` is 0–1 clockwise from 12 o'clock).

#### `<VnodeRing>` — hash ring with virtual nodes

Use when explaining **vnodes** — multiple ring positions per physical server, color-coded by host.

```mdx
<VnodeRing />
```

Optional props: `vnodes`, `keyPoint`, `ownerLabel`.

#### `<Figure>` — static images (PNG/SVG)

Best for polished hero diagrams, Excalidraw exports, or side-by-side comparisons.

**Asset path:** `public/blog/diagrams/{post-slug}/filename.png`

```mdx
<Figure
  src="/blog/diagrams/system-design-consistent-hashing/modulo-vs-consistent.png"
  alt="Modulo hashing remaps nearly all keys; consistent hashing moves one arc"
  caption="Adding one node: modulo reshuffles ~100% of keys; consistent hashing moves ~1/(N+1)."
  width={1200}
  height={675}
/>
```

#### Markdown images

Standard `![alt](/blog/diagrams/slug/image.png)` also works and picks up styled borders.

#### What to avoid

- Stock photos and decorative AI art (no teaching value for technical posts)
- One unreadable mega-diagram covering the whole system
- Images without alt text or captions on `<Figure>`

### 5b. System design case study posts (Modules 9–11)

Use this template for **full system designs** (URL shortener, payment system, chat, etc.) — after readers have fundamentals and the design-framework posts. Merge **interview completeness** (requirements, math, APIs, component map) with **Code Chronicles voice** (story hook, mistakes, cross-links — never re-teach Part 1 inline).

**Arc (in order):**

1. **Personal hook** — a domain-specific failure or confusion (double charge, auth succeeded but settlement failed, etc.)
2. **Intended audience + prerequisites** — link to Part 1 and advanced concept posts; do not summarize them
3. **Table of contents**
4. **Domain primer** — actors/entities table; the **domain invariant** that drives the design (e.g. authorization ≠ settlement for payments)
5. **System boundary** — what's in scope vs external (banks, PSP, card networks)
6. **Requirements** — functional + non-functional tables; explicit **out of scope**
7. **Assumptions + back-of-envelope** — state numbers upfront (DAU, txns/day, bytes/record); storage, QPS/TPS, bandwidth; when math changes architecture
8. **High-level design** — numbered flow + `<Mermaid>` `flowchart LR` (one idea per diagram)
9. **API surface (brief)** — wrap signatures in narrative (*why* two-step authorize/capture); not a naked reference dump
10. **Deep dive: 2–3 hard components only** — link out for Kafka, idempotency, LB, etc.
11. **Reliability** — failure scenarios + patterns; link to dedicated posts ([Idempotency](/blog/system-design-idempotency-and-delivery-guarantees), [Async](/blog/system-design-asynchronous-processing-and-messaging), …)
12. **Requirements → technique mapping** — closing table: each FR/NFR → how the design addresses it
13. **What breaks when…** — 3 concrete failure scenarios
14. **Common mistakes I made**
15. **Key Takeaways + Quiz**

**Do:**

- Lead with the **domain phase** or invariant before generic boxes
- Use 2–4 diagrams; prefer several small Mermaid charts over one mega-diagram
- End with a requirements → technique table (interview closure)
- Quiz on trade-offs and failure modes, not definitions

**Don't:**

- Re-explain concepts covered in earlier posts — link by title (see Series cross-links)
- List every microservice — deep-dive only what makes *this* system hard
- Drop API tables without explaining why the shape exists
- Use internal module numbers in prose (`Module 8`, `Part 2`, etc.)

**Case study checklist:**

- [ ] Personal narrative hook (domain-specific)
- [ ] Intended audience + prerequisites (linked)
- [ ] Table of contents
- [ ] Domain actors / entities table
- [ ] Domain invariant stated early (the "aha" that drives the design)
- [ ] System boundary (in scope vs external)
- [ ] Requirements table (functional + non-functional) + out of scope
- [ ] Assumptions block + back-of-envelope math
- [ ] High-level diagram (`flowchart LR`)
- [ ] API surface with narrative (not naked signatures)
- [ ] Deep dive on 2–3 hard components (link to concept posts)
- [ ] Reliability section (link to idempotency/async/reliability posts)
- [ ] Requirements → technique mapping table
- [ ] What breaks when… (3 scenarios)
- [ ] Common mistakes I made
- [ ] Key Takeaways + quiz JSON + `<Quiz />`

**Reference draft:** `content/blog/drafts/system-design-payment-system.mdx`

### 6. Key Takeaways Section (Required)

Numbered list of main points the reader should remember:

```markdown
## Key Takeaways

1. **First key point** - brief explanation
2. **Second key point** - brief explanation
...
```

### 7. Quiz Section (Required)

Every blog post MUST include an interactive quiz at the end:

```markdown
---

## Test Your Understanding

<Quiz quizId="your-post-slug" />

---

Happy coding!
```

---

## Quiz Requirements

Every blog post requires a companion quiz file.

### Quiz File Location

```
content/blog/quizzes/{post-slug}-quiz.json
```

### Quiz File Structure

```json
{
  "id": "your-post-slug-quiz",
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
        { "id": "c", "text": "Option C", "correct": false }
      ],
      "explanation": "Explanation of why the answer is correct."
    }
  ]
}
```

### Question Types

1. **multiple-choice** - Single correct answer
2. **multiple-select** - Multiple correct answers (user selects all that apply)
3. **true-false** - True or False question

### Quiz Guidelines

- Include **6-10 questions** per post
- Mix question types for variety
- Test key concepts from each major section
- Write clear, detailed explanations for each answer
- Explanations should teach, not just confirm

---

## Series cross-links

When referencing other posts in the series:

- **Do not** use internal planning labels (`Module 7`, `Module 8`, `Part 2 Module 7`, etc.) — readers do not see the course module structure.
- **Do** link by post title: "An earlier post on [Caching Strategies](/blog/...)" or "If you haven't read [Consistent Hashing](/blog/...) yet..."
- **Do** use plain series language sparingly: "fundamentals in this series", "next post in this series", "upcoming post on..."
- **Avoid** bare "Part 1" / "Part 2" unless you explain what that means in the same sentence.

The `course.module` field in frontmatter is for the site course page only — never mention module IDs in prose.

---

## Writing Style

### Tone
- First-person narrative ("I learned...", "I discovered...")
- Conversational but technically accurate
- Learning-first approach - explain the "why" before the "how"

### Code Examples
- Include practical, runnable code
- Add comments explaining key parts
- Show both "wrong" and "right" approaches when relevant
- Use syntax highlighting with language tags

### Formatting
- Use `**bold**` for key terms on first introduction
- Use `backticks` for inline code, file names, and technical terms
- Use horizontal rules (`---`) to separate major sections
- Use emoji sparingly (only in closing: "Happy coding!")

---

## File Naming

- **Blog post**: `{slug}.mdx`
- **Draft**: `content/blog/drafts/{slug}.mdx`
- **Published**: `content/blog/{slug}.mdx`
- **Quiz**: `content/blog/quizzes/{slug}-quiz.json`

---

## Checklist Before Publishing

- [ ] Personal narrative hook at the beginning
- [ ] Intended audience statement
- [ ] Prerequisites listed (if any)
- [ ] Table of contents with anchor links
- [ ] **Case study posts:** domain invariant, system boundary, requirements → technique table (see §5b)
- [ ] Diagrams where helpful (2–4 for system design posts: `<Mermaid>` and/or `<Figure>`)
- [ ] Key Takeaways section
- [ ] Quiz JSON file created in `content/blog/quizzes/`
- [ ] Quiz component added at end of post
- [ ] All code examples tested
- [ ] Frontmatter complete (title, slug, excerpt, tags, etc.)
- [ ] `draft: false` when ready to publish
- [ ] Links to related posts added where relevant

---

## Example Post Template

```mdx
---
title: 'Understanding [Topic]: [Subtitle]'
slug: 'understanding-topic-subtitle'
excerpt: "I [problem faced]. Here's what I learned about [topic] and how to [benefit]."
publishedAt: '2024-12-22'
tags: ['tag1', 'tag2', 'fundamentals', 'beginner']
author: 'Sandeep Reddy Alalla'
featured: true
draft: true
scheduledPublishAt: '2024-12-22'
course:
  id: 'course-id'
  module: 'module-name'
  order: 1
---

# Understanding [Topic]: [Subtitle]

I was [doing something] and [unexpected result]. I spent [time] [struggling],
only to realize [fundamental insight].

That's when I learned about [topic]—[why it matters].

In this post, we're going to explore [topic] from the ground up. We'll understand
[concept 1], [concept 2], and most importantly, [practical application].

**Intended audience**: [Who should read this]—from beginners who [situation] to
intermediate developers who want to [goal].

**Prerequisites**:
- [Prerequisite 1](/link)
- Basic understanding of [concept]

<!-- No Table of Contents needed — the site auto-generates the "On this page" sidebar from your headings. -->

## Section 1

Content...

---

## Section 2

Content...

---

## Key Takeaways

1. **Point one** - explanation
2. **Point two** - explanation

---

## Test Your Understanding

<Quiz quizId="understanding-topic-subtitle" />

---

Happy coding!
```

---

## Related Resources

- [Frontend Fundamentals Roadmap](docs/frontend_fundamentals_blog_post_roadmap_fdfcc8ca.plan.md)
- [Draft Template](content/blog/drafts/.template.mdx)
