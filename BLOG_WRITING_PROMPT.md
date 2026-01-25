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

### 4. Table of Contents

Include a markdown table of contents with anchor links:

```markdown
## Table of Contents

- [Section 1](#section-1)
- [Section 2](#section-2)
- [Key Takeaways](#key-takeaways)
- [Test Your Understanding](#test-your-understanding)
```

### 5. Main Content Sections

- Use progressive disclosure (simple → complex)
- Include code examples with comments
- Add "Why" explanations (design decisions, historical context)
- Include practical warnings and gotchas
- Use real-world examples

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

## Table of Contents

- [Section 1](#section-1)
- [Section 2](#section-2)
- [Key Takeaways](#key-takeaways)
- [Test Your Understanding](#test-your-understanding)

---

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
