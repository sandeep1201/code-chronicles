---
name: blog-human-voice
description: >-
  Drafts and revises blog prose for Code Chronicles using Sandeep's teaching voice
  (personal hooks, learning-first tone, required post structure) plus an anti-AI
  editing pass inspired by Wikipedia's Signs of AI writing. Use when writing or
  editing blog posts, MDX drafts, tutorials, humanizing drafts, polishing prose,
  reviewing posts, or making technical writing sound natural.
---

# Blog human voice (Code Chronicles + anti-AI prose)

Use this skill when **creating** or **revising** blog content—not only to strip AI tells, but to match **your** voice and site conventions.

## Canonical references (read when drafting or unsure)

- Full structure, frontmatter, quiz rules: [BLOG_WRITING_PROMPT.md](../../../BLOG_WRITING_PROMPT.md)
- Cursor rule for MDX tone/format: [.cursor/rules/blog-writing-style.mdc](../../rules/blog-writing-style.mdc)
- End-to-end new-post workflow (files, quiz, publish): [blog-writer skill](../blog-writer/SKILL.md)

---

## Your voice (Sandeep / Code Chronicles)

**Tone**

- First person: "I learned...", "I discovered...", "When I first saw...", honest mistakes ("Here's what I got wrong...").
- Conversational but technically accurate; **why before how** (learning-first).
- Specific hooks: real task, surprise, time spent stuck, then the insight—not a generic "In today's world..." opener.

**Opening pattern**

- Personal narrative hook (1–2 short paragraphs): concrete problem → confusion → what you realized.
- Then: what the post covers, **Intended audience**, **Prerequisites** (with links when they exist).

**Body**

- Progressive disclosure (simple → complex); real examples; warnings and gotchas.
- Code: runnable snippets, language tags; when useful, **wrong then right** with a clear explanation (comments on key lines only—no play-by-play narration in comments).

**Formatting (non-negotiable for this site)**

- `**Bold**` only for a **key term on first introduction** (not every important phrase).
- `` `backticks` `` for code, filenames, APIs.
- `---` between major sections.
- Emoji **only** in the closing line: `Happy coding!` — not in headings or body.
- Frontmatter: **double quotes** for `title`; `>-` for multi-line `excerpt`; slug aligned across file, frontmatter, and quiz id.

**Required sections** (for full posts)

- Table of contents with anchors; **Key Takeaways** (numbered); **Test Your Understanding** with `<Quiz quizId="{slug}" />` and matching quiz JSON. See blog-writer skill for paths and JSON shape.

**Voice vs generic "humanizer"**

- Numbered Key Takeaways and a TOC are **intentional** here—keep them.
- Do **not** replace technical clarity with vague hype or fake profundity.
- Prefer straight double quotes `"` in prose (not curly “ ”) unless the style guide elsewhere says otherwise.

---

## Anti-AI pass (blog-focused)

After the draft matches structure and voice, run this pass. Inspired by [Humanizer](https://github.com/blader/humanizer) and [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

### 1. Cut inflated significance

Remove or rewrite lines that claim something "marks a pivotal moment," "underscores the importance," "reflects broader trends," "stands as a testament," "in today's rapidly evolving landscape," etc. Say what happened and why **you** care in plain language.

### 2. Replace promotional / travel-brochure wording

Watch for: vibrant, rich heritage, breathtaking, nestled, groundbreaking (figurative), stunning, must-read, profound (empty), showcases, commitment to. Swap for concrete facts, numbers, or your own reaction.

### 3. Kill superficial `-ing` trailing clauses

Replace strings like "..., highlighting X, ensuring Y, reflecting Z" with one clear claim or a second short sentence with a real subject.

### 4. Fix vague attributions

Replace "Experts say," "Industry reports suggest," "Many believe" with a named source, study, doc, or first-person ("I used to think...").

### 5. Prefer simple copulas

Use **is / are / has** instead of "serves as," "acts as," "stands as," "boasts" when describing what something is.

### 6. Ease off AI vocabulary clusters

Cut or replace overused fillers: Additionally, crucial, delve, foster, garner, interplay, intricate, key (as adjective), landscape, pivotal, tapestry, testament, underscore (verb), valuable, align with, at the end of the day. Use ordinary connectors ("Also," "But," "So").

### 7. Break repetitive rhetorical devices

- Not only... but... / It's not just X, it's Y — use sparingly; often one clause is enough.
- Forced rule of three in prose — OK in Key Takeaways if each point is distinct; avoid "innovation, inspiration, and insights" style triples in running text.
- Elegant variation (protagonist / main character / hero in three sentences) — pick one term.

### 8. Punctuation and typography

- Em dashes — use fewer; prefer periods, commas, or parentheses unless a dash really fits.
- No chatbot sign-offs in the article: strip "I hope this helps," "Let me know if," "Great question!"
- No training-cutoff disclaimers ("As of my knowledge...") unless you truly lack a source—then say what you **did** check.

### 9. Soul check (not just "clean")

If every sentence is the same length, add one short punchy line or a longer explanatory one. It's fine to admit uncertainty or a mixed reaction—that matches a human teacher voice.

### 10. Final self-audit (do this explicitly)

1. Ask: **What still reads obviously AI-generated?** List 2–5 concrete tells (words, rhythms, hollow abstractions).
2. Revise once more with that list in mind.
3. Read the opening and closing aloud; the hook should sound like you telling a story, not a press release.

---

## Workflow summary

1. Align with [BLOG_WRITING_PROMPT.md](../../../BLOG_WRITING_PROMPT.md) and blog-writer if creating from scratch.
2. Apply **Your voice** above (hook, audience, code, formatting).
3. Run **Anti-AI pass** (sections 1–9).
4. Run **Final self-audit** (section 10).
5. For a longer pattern cheat sheet, see [reference.md](reference.md).

---

## Credit

Anti-AI patterns derive from WikiProject AI Cleanup's observations and the [Humanizer](https://github.com/blader/humanizer) skill by blader; this file adapts them to Code Chronicles' structure and Sandeep's documented style.
