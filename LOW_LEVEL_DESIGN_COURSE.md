# Low-Level Design Course for Front-End Development

## Course Overview

This course teaches component-level and code-level design patterns in front-end development. It focuses on practical, real-world design decisions that every front-end developer faces.

**Course ID**: `low-level-design`

**Target Audience**: Intermediate to senior front-end developers who want to design better components, manage state effectively, and build scalable architectures.

---

## Course Structure

### Module 1: Component Design
**Focus**: Design reusable, maintainable components with clean APIs and clear responsibilities

**Topics**:
1. ✅ **Component API Design: Building Reusable Components That Don't Suck** (Published)
   - Single Responsibility Principle for components
   - Props vs Composition
   - Preventing prop explosion
   - Intuitive prop naming
   - TypeScript as API documentation
   - Real-world examples and refactoring

2. 📝 Controlled vs Uncontrolled Components (Planned)
3. 📝 Component Contracts and TypeScript (Planned)
4. 📝 Designing for Testability (Planned)

### Module 2: State Management
**Focus**: Patterns for managing state effectively in modern front-end applications

**Topics**:
1. 📝 State Placement: Where Should This State Live? (Planned)
2. 📝 Lifting State vs Context vs Global State (Planned)
3. 📝 Derived State and When to Avoid It (Planned)
4. 📝 State Machines for Complex UI Logic (Planned)

### Module 3: Composition Patterns
**Focus**: Advanced patterns for building flexible, composable UI components

**Topics**:
1. 📝 Compound Components Pattern (Planned)
2. 📝 Render Props vs Custom Hooks (Planned)
3. 📝 Higher-Order Components (HOCs) (Planned)
4. 📝 Slots and Content Projection (Planned)

### Module 4: Front-End Architecture
**Focus**: Module organization, dependency management, and scalable code structure

**Topics**:
1. 📝 Module and Folder Architecture (Planned)
2. 📝 Dependency Injection in UI (Planned)
3. 📝 Design Patterns in Front-End (Factory, Strategy, Observer, Adapter) (Planned)
4. 📝 Form Architecture and Validation (Planned)

---

## Published Content

### 1. Component API Design: Building Reusable Components That Don't Suck

**File**: `content/blog/component-api-design-building-reusable-components.mdx`

**Quiz**: `content/blog/quizzes/component-api-design-building-reusable-components-quiz.json`

**Frontmatter**:
```yaml
title: 'Component API Design: Building Reusable Components That Don't Suck'
slug: component-api-design-building-reusable-components
excerpt: >-
  I built a "reusable" button component with 47 props and nobody wanted to use it. Here's what I learned about designing component APIs that developers actually love using.
publishedAt: '2026-01-31'
tags:
  - low-level-design
  - frontend
  - components
  - react
  - api-design
  - architecture
  - best-practices
  - intermediate
author: Sandeep Reddy Alalla
featured: true
course:
  id: low-level-design
  module: component-design
  order: 1
draft: false
```

**Key Topics Covered**:
- What makes a good component API
- Single Responsibility Principle for components
- Props vs Composition: When to use each
- The prop explosion problem and solutions
- Designing intuitive prop names
- Required vs optional props with smart defaults
- Composition patterns (slots, children, render props)
- TypeScript for API documentation
- Real-world button component refactoring
- Common API design mistakes
- Testing your API design

**Word Count**: ~8,500 words

**Quiz Questions**: 10 questions (mix of multiple-choice, multiple-select, true-false)

---

## Course Meta Configuration

**Location**: `content/courses/low-level-design/meta.json`

```json
{
  "id": "low-level-design",
  "title": "Low-Level Design for Front-End",
  "description": "Master component-level and code-level design patterns in front-end development. Learn how to design reusable components, manage state effectively, and build scalable front-end architectures that developers love to use.",
  "modules": [
    {
      "id": "component-design",
      "name": "Component Design",
      "description": "Design reusable, maintainable components with clean APIs and clear responsibilities",
      "order": 1
    },
    {
      "id": "state-management",
      "name": "State Management",
      "description": "Patterns for managing state effectively in modern front-end applications",
      "order": 2
    },
    {
      "id": "composition-patterns",
      "name": "Composition Patterns",
      "description": "Advanced patterns for building flexible, composable UI components",
      "order": 3
    },
    {
      "id": "architecture",
      "name": "Front-End Architecture",
      "description": "Module organization, dependency management, and scalable code structure",
      "order": 4
    }
  ],
  "author": "Sandeep Reddy Alalla",
  "createdAt": "2026-01-31",
  "updatedAt": "2026-01-31"
}
```

---

## Next Steps

### Immediate Next Posts (High Priority)

1. **State Placement: Where Should This State Live?**
   - Hook: "I had the same user data in 5 different components and they kept getting out of sync"
   - Topics: Local vs lifted vs context vs global, when to lift state, state co-location
   - Module: `state-management`, Order: 1

2. **Compound Components: The Pattern That Changed How I Build UIs**
   - Hook: "I was building a tabs component with 20 props when I discovered compound components"
   - Topics: What are compound components, implementation, when to use, examples (Tabs, Accordion, Select)
   - Module: `composition-patterns`, Order: 1

3. **Controlled vs Uncontrolled: Understanding Component Control**
   - Hook: "My form inputs were sometimes controlled, sometimes uncontrolled, and React kept warning me"
   - Topics: What's the difference, when to use each, converting between them, common pitfalls
   - Module: `component-design`, Order: 2

### Medium Priority

4. **Custom Hooks Design: When to Abstract and When to Inline**
5. **Form Architecture: Designing Scalable Form Components**
6. **Module Architecture: Organizing Your Front-End Codebase**

### Writing Tips for This Course

- **Start with a concrete pain point**: Every post should start with a real front-end situation (broken component, confusing API, hard-to-test code)
- **Show before/after code**: LLD posts benefit from showing the "wrong" way and the "right" way
- **Focus on trade-offs**: Don't just say "do this"—explain when and why, and what you give up
- **Use realistic examples**: Use actual UI components (Button, Modal, Form, Dropdown) not abstract examples
- **Test design decisions**: Include sections on how the design choice affects testing, maintenance, and team collaboration

---

## Blog Writing Prompt for LLD

When writing new posts for this course, use the prompt from `BLOG_WRITING_PROMPT_LLD.md` (if created) or follow these guidelines:

1. **Hook**: Start with a specific front-end situation that led to a design insight
2. **Structure**: Follow BLOG_WRITING_PROMPT.md exactly (frontmatter, TOC, key takeaways, quiz)
3. **Code examples**: Use TypeScript/React with realistic component code
4. **Trade-offs**: Always explain when to use a pattern and when not to
5. **Quiz focus**: Test design decisions and trade-offs, not just syntax

---

## Course Tags

Use these tags consistently across LLD posts:
- `low-level-design` (required for all posts)
- `frontend` (required for all posts)
- `components` (for component design posts)
- `state-management` (for state posts)
- `architecture` (for architecture posts)
- `patterns` (for design pattern posts)
- `react` (when React-specific)
- `typescript` (when TS-specific)
- `api-design` (for API design posts)
- `best-practices` (general best practices)
- `intermediate` or `advanced` (skill level)

---

## Success Metrics

A good LLD post should:
- ✅ Start with a concrete, relatable pain point
- ✅ Show before/after code examples
- ✅ Explain trade-offs and when to use the pattern
- ✅ Include realistic UI component examples
- ✅ Have 6-10 quiz questions focused on design decisions
- ✅ Be 6,000-10,000 words (comprehensive but focused)
- ✅ Link to related LLD posts for prerequisites
- ✅ Include TypeScript types for clarity

---

## Resources

- **Blog Writing Guide**: `BLOG_WRITING_PROMPT.md`
- **Course Library**: `lib/courses.ts`
- **Existing Courses**: `content/courses/javascript/`, `content/courses/html-css/`
- **Published Post**: `content/blog/component-api-design-building-reusable-components.mdx`
