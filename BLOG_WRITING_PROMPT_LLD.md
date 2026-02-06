# Low-Level Design Front-End Blog Writing Prompt

Use this prompt when writing blog posts about **low-level design (LLD) in front-end development** for Code Chronicles. This enforces the structure and style from `BLOG_WRITING_PROMPT.md` with LLD-specific guidance.

---

## What "Low-Level Design" Means Here

Focus on **code-level and component-level design** in the front-end, not system architecture. Include topics such as:

- **Component design**: APIs (props, slots, composition), single responsibility, compound components, render props, controlled vs uncontrolled
- **State design**: Where state lives, lifting state, state machines, derived state, local vs global
- **Abstractions**: Custom hooks, utilities, factories, when to abstract and when not to
- **Naming and contracts**: Clear prop/event names, TypeScript interfaces, component contracts
- **File and module structure**: Co-location, barrel files, feature vs type-based folders
- **Design patterns in UI**: Provider, factory, strategy, adapter as applied to React/Vue/etc.
- **Testing implications**: How LLD choices affect testability and mocking

---

## Narrative Hook (LLD-specific)

Start with a **concrete front-end situation** that led to a design insight, for example:

- "I was building a reusable [dropdown/form/modal] and ended up with [too many props / unclear API / duplicated logic]. I spent hours [refactoring/breaking things] until I learned about [pattern/concept]."
- "I had state in [component A] and [component B] both needing [same data]. After [messy prop drilling / wrong abstraction], I understood [state placement / lifting state / context]."
- "Our [component/library] was hard to test and change. That's when I applied [single responsibility / dependency injection / clear contracts]."

Keep the hook **first-person**, **specific** (name the UI piece and the pain), and **resolution-oriented** (what concept fixed it).

---

## Structure Checklist

Follow `BLOG_WRITING_PROMPT.md` exactly, with these LLD-specific additions:

### Frontmatter
```yaml
title: 'Your Title: Subtitle'
slug: your-slug
excerpt: >-
  Personal hook in 150-160 chars that mentions the pain point and solution
publishedAt: '2026-01-31'
tags:
  - low-level-design  # Required
  - frontend          # Required
  - components        # If about components
  - state-management  # If about state
  - architecture      # If about architecture
  - patterns          # If about design patterns
  - react             # If React-specific
  - typescript        # If TS-specific
  - api-design        # If about API design
  - best-practices    # General best practices
  - intermediate      # Or 'advanced'
author: Sandeep Reddy Alalla
featured: true
course:
  id: low-level-design
  module: component-design  # Or state-management, composition-patterns, architecture
  order: 1  # Order within the module
draft: false
```

### Introduction
After the hook, state:
- What the post will cover
- **Intended audience** (e.g., "front-end developers who have built a few components and want to design them better")
- **Prerequisites** (link to related LLD posts if any)

### Main Content
- **Progressive disclosure**: Simple → complex
- **Code examples**: Realistic TypeScript/React/JSX code with comments
- **Before/After**: Show "wrong vs right" or "before vs after" comparisons
- **Trade-offs**: Explain when to use, when not to, what you give up
- **Real UI examples**: Use actual components (Button, Modal, Form, Dropdown) not abstract examples

### Key Takeaways
Numbered list of main design lessons (not just facts, but actionable insights)

### Quiz
- Add `<Quiz quizId="your-slug" />`
- Create `content/blog/quizzes/{slug}-quiz.json`
- 6-10 questions (mix of multiple-choice, multiple-select, true-false)
- **Focus on design decisions and trade-offs**, not just syntax

---

## Tone and Formatting

- First-person, conversational, technically accurate
- **Bold** key terms on first use; `backticks` for code, files, technical terms
- Horizontal rules (`---`) between major sections
- Emoji only in closing "Happy coding!"

---

## LLD Topic Ideas

Pick one per post:

### Component Design
1. ✅ Component API Design: Building Reusable Components (Published)
2. Controlled vs Uncontrolled Components
3. Component Contracts and TypeScript
4. Designing for Testability
5. Single Responsibility in Components

### State Management
1. State Placement: Where Should This State Live?
2. Lifting State vs Context vs Global State
3. Derived State and When to Avoid It
4. State Machines for Complex UI Logic
5. State Co-location Principles

### Composition Patterns
1. Compound Components (Tabs, Accordion, Select)
2. Render Props vs Custom Hooks
3. Higher-Order Components (HOCs)
4. Slots and Content Projection
5. Composition vs Configuration

### Architecture
1. Module and Folder Structure
2. Dependency Injection in UI
3. Design Patterns in Front-End (Factory, Strategy, Observer, Adapter)
4. Form Architecture and Validation
5. Error Boundaries and Error Handling

---

## Code Example Guidelines

### Use Realistic TypeScript/React

```tsx
// Good: Realistic, typed, commented
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button className={`button button-${variant}`} {...props}>
      {children}
    </button>
  );
}
```

### Show Before/After

```tsx
// Before: God component with 47 props
interface BadButtonProps {
  variant?: string;
  size?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  // ... 42 more props
}

// After: Single responsibility + composition
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

// Usage: Compose instead of configure
<Button variant="primary">
  <Icon name="save" />
  Save
</Button>
```

### Explain Trade-offs

```tsx
// Pattern 1: Render Props
// ✅ Pros: Full rendering control, flexible
// ❌ Cons: Verbose, callback hell with multiple
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
  )}
</Toggle>

// Pattern 2: Custom Hook
// ✅ Pros: Cleaner, composable
// ❌ Cons: Can't wrap UI (no positioning control)
function MyComponent() {
  const { on, toggle } = useToggle();
  return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
}
```

---

## Quiz Guidelines

Focus on **design decisions and trade-offs**, not syntax:

### Good Questions

```json
{
  "question": "When should you use composition instead of props?",
  "options": [
    { "text": "When the content is complex (JSX, components) or users need layout flexibility", "correct": true },
    { "text": "When you want to configure behavior", "correct": false }
  ],
  "explanation": "Use composition when content is complex, when users need flexibility in layout, or when users might want to customize deeply. Use props for simple configuration."
}
```

```json
{
  "question": "What's wrong with this API? `<Button primary secondary large small />`",
  "options": [
    { "text": "Boolean props for mutually exclusive options are confusing", "correct": true },
    { "text": "It has too few props", "correct": false }
  ],
  "explanation": "Using boolean props for mutually exclusive options is confusing. What if both primary and secondary are true? Use enums: `<Button variant='primary' size='large' />`"
}
```

### Bad Questions (Avoid These)

```json
{
  "question": "What does the spread operator do?",
  // ❌ Too basic, not about design decisions
}
```

```json
{
  "question": "Which is correct: onClick or onclick?",
  // ❌ Syntax question, not design question
}
```

---

## Writing Process

1. **Pick a pain point**: Start with a real front-end problem you've faced
2. **Write the hook**: Make it personal, specific, and relatable
3. **Outline sections**: What concepts lead to the solution?
4. **Code examples**: Write realistic before/after code
5. **Explain trade-offs**: When to use, when not to, what you give up
6. **Key takeaways**: Distill the main lessons
7. **Quiz**: 6-10 questions on design decisions
8. **Review checklist**: Does it follow BLOG_WRITING_PROMPT.md?

---

## Example Template

```mdx
---
title: 'State Placement: Where Should This State Live?'
slug: state-placement-where-should-state-live
excerpt: >-
  I had user data in 5 components that kept getting out of sync. Here's what I learned about state placement and when to lift state up.
publishedAt: '2026-02-01'
tags:
  - low-level-design
  - frontend
  - state-management
  - react
  - architecture
  - intermediate
author: Sandeep Reddy Alalla
featured: true
course:
  id: low-level-design
  module: state-management
  order: 1
draft: false
---

# State Placement: Where Should This State Live?

I was building a user profile page with a sidebar, header, and main content area. All three needed the user's name and avatar. I started by fetching the user data in each component separately. Then I noticed they were getting out of sync—the header showed the old name while the sidebar showed the new one after an update.

I tried lifting the state up, then I tried context, then I tried a global store. Each solution felt wrong until I learned the principles of state placement.

In this post, we're going to explore where state should live in your component tree...

**Intended audience**: React developers who struggle with where to put state...

**Prerequisites**:
- Basic React state management
- [Component API Design](/blog/component-api-design-building-reusable-components)

## Table of Contents

- [The State Placement Problem](#the-state-placement-problem)
- [Principle 1: Co-locate State](#principle-1-co-locate-state)
- [Principle 2: Lift State Only When Needed](#principle-2-lift-state-only-when-needed)
...

---

## The State Placement Problem

[Content with code examples, before/after, trade-offs]

---

## Key Takeaways

1. **Co-locate state** - Keep state as close to where it's used as possible
2. **Lift state only when needed** - Don't lift state until multiple components need it
...

---

## Test Your Understanding

<Quiz quizId="state-placement-where-should-state-live" />

---

Happy coding!
```

---

## Success Checklist

Before publishing, verify:

- [ ] Personal narrative hook at the beginning (specific front-end pain point)
- [ ] Intended audience statement
- [ ] Prerequisites listed (link to related LLD posts)
- [ ] Table of contents with anchor links
- [ ] Before/after or wrong/right code examples
- [ ] Trade-offs explained (when to use, when not to)
- [ ] Real UI component examples (not abstract)
- [ ] Key Takeaways section (design lessons, not just facts)
- [ ] Quiz JSON file created with 6-10 questions
- [ ] Quiz questions focus on design decisions and trade-offs
- [ ] Quiz component added at end of post
- [ ] All code examples are TypeScript/React with types
- [ ] Frontmatter complete with `low-level-design` course info
- [ ] Tags include `low-level-design` and `frontend`
- [ ] `draft: false` when ready to publish

---

## Quick Reference

**Course ID**: `low-level-design`

**Modules**:
- `component-design` - Component APIs, SRP, testability
- `state-management` - State placement, lifting, context
- `composition-patterns` - Compound components, render props, HOCs
- `architecture` - Module structure, DI, design patterns

**Required Tags**: `low-level-design`, `frontend`

**File Locations**:
- Post: `content/blog/{slug}.mdx`
- Quiz: `content/blog/quizzes/{slug}-quiz.json`
- Course meta: `content/courses/low-level-design/meta.json`
