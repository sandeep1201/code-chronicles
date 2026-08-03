---
name: content-leverage-engine
description: Repurposes a single piece of content (blog post, code, idea) into multiple platform-specific outputs for maximum leverage. Generates LinkedIn posts, Twitter/X threads, Instagram carousels, newsletter snippets, quiz questions, challenges, and video scripts. Use when the user says repurpose, create leverage content, turn this into more, generate social posts, content leverage, or share this on social media.
---

# Content Leverage Engine

One input, many outputs. Turn a single blog post, tutorial, or idea into content for every platform.

## Workflow

### 1. Identify the Source

Ask the user or infer from context:
- A blog post (read the MDX file)
- A code snippet or challenge
- An idea or concept described in chat

Read the full source content before generating anything.

### 2. Extract Core Elements

From the source, identify:
- **Hook**: The personal story or problem (first paragraph)
- **Key insight**: The main takeaway (1 sentence)
- **3–5 bullet points**: The core lessons or steps
- **Code snippet**: The most impactful code example (if applicable)
- **Quote-worthy line**: A single sentence someone would screenshot

### 3. Generate All Outputs

Present each output in order. Use the exact templates below.

---

## Output Templates

### A. LinkedIn Post

Format: personal hook + story beats + link. **1300 chars recommended** (LinkedIn truncates after ~210 chars with "...see more"; front-load the hook).

```markdown
## LinkedIn Post

[1–2 sentences: concrete problem from the post — timeout, wrong metric, outage. No emoji launchers.]

[2–4 short paragraphs or bullet lines with the real lessons.]

[Optional one-line wrap in your voice — not "follow for more deep dives."]

https://blog.sandeepallala.com/blog/{slug}

#systemdesign #relevant #tags
```

Rules:
- **Run the [blog-human-voice](../blog-human-voice/SKILL.md) anti-AI pass** before saving — LinkedIn deprioritizes generic AI promo copy
- First line must hook (specific failure, number, or surprise — not "New blog post!")
- Use line breaks generously (LinkedIn rewards readability)
- **No** stock CTAs ("If this was helpful, follow me...", "🚀 New Blog Post:")
- **No** vague hashtag soup (`#JavaScript #WebDevelopment #Programming` unless the post is JS-specific)
- 3–6 hashtags matched to the topic
- Full article URL on its own line near the end

**LinkedIn anti-AI checklist** (apply to every post before saving — condensed from [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)):

- [ ] No inflated significance: cut "marks a pivotal moment," "stands as a testament," "in today's evolving landscape," "underscores the importance of."
- [ ] No AI vocabulary clusters: delve, crucial, pivotal, robust, foster, garner, showcase, tapestry, seamless, "unlock," "leverage" (as filler), "supercharge."
- [ ] Plain verbs: is/has over "serves as/boasts/features"; wrote not authored, used not utilized, built not engineered.
- [ ] Negative parallelisms used at most once: "not just X, it's Y," "not X but Y," "X rather than Y."
- [ ] No forced rule-of-three triples ("faster, cleaner, and smarter") unless each word earns its place.
- [ ] Em dashes: at most one; prefer periods/commas. No emoji as bullet/section markers.
- [ ] No assistant sign-offs ("Hope this helps," "Let me know your thoughts below!") and no engagement-bait ("Agree? 👇", "follow for more").
- [ ] Straight quotes/apostrophes, not curly.
- [ ] Sounds like Sandeep telling a real story (specific numbers, a mistake, an "aha"), not a press release. Don't overcorrect into bland — keep the human voice.

---

### B. Twitter/X Thread

Format: Hook tweet + 4–6 tweets + closer. Each tweet under 280 chars.

```markdown
## Twitter/X Thread

**Tweet 1 (Hook)**:
[Bold claim or question. Must stand alone.]

**Tweet 2**:
[Key insight #1 with a short code snippet or example]

**Tweet 3**:
[Key insight #2]

**Tweet 4**:
[Key insight #3]

**Tweet 5**:
[The "aha" moment or surprising takeaway]

**Tweet 6 (Closer)**:
[Summary + CTA: "Follow for more" or "Bookmark this thread"]
```

Rules:
- Tweet 1 must work as a standalone post
- Use code screenshots or short inline code where possible
- Number the tweets (1/6, 2/6, etc.)

---

### C. Instagram Carousel (Slides)

Format: 8–10 slides. Each slide has a heading and 1–3 short lines. Designed for a carousel post.

```markdown
## Instagram Carousel

**Slide 1 (Cover)**:
Title: [Short, bold title]
Subtitle: [One-line hook or question]

**Slide 2**:
Heading: The Problem
Body: [1–2 sentences about the pain point]

**Slide 3**:
Heading: [Concept 1]
Body: [2–3 short bullet points or sentences]

**Slide 4**:
Heading: [Concept 2]
Body: [2–3 short bullet points or sentences]

**Slide 5**:
Heading: [Concept 3]
Body: [2–3 short bullet points or sentences]

**Slide 6**:
Heading: Code Example
Body: [Short code snippet, max 8–10 lines]

**Slide 7**:
Heading: Key Takeaway
Body: [The one thing to remember]

**Slide 8**:
Heading: [Quote-worthy line from the post]

**Slide 9 (CTA)**:
Heading: Want to learn more?
Body: Link in bio / Follow @[handle] for daily frontend tips
```

Rules:
- Each slide should be readable in 3–5 seconds
- Use short lines (this will be rendered as an image, not a wall of text)
- Slide 1 is the hook (determines if people swipe)
- Last slide is always a CTA
- Suggest a color theme: dark background + light text for code, or clean white + accent color for concepts
- Include caption text below the carousel slides

**Instagram Caption** (below the carousel):

```markdown
**Caption**:
[Hook sentence from the post]

[2–3 sentences summarizing the value]

Save this for later and share with a dev friend who needs this.

#javascript #frontend #webdev #coding #programming #developer #react #softwareengineering #100daysofcode #learntocode
```

Rules:
- 10–15 hashtags (mix of broad and niche)
- Include a "save this" CTA (saves boost reach)
- Keep caption under 300 words

---

### D. Instagram Reel Script (Optional)

If the user wants a short video:

```markdown
## Instagram Reel Script (30–60 seconds)

**Hook (0–3s)**: "[Bold statement or question from the post]"

**Problem (3–10s)**: "I was [doing X] and [Y happened]..."

**Solution (10–30s)**: "Here's what I learned: [key insight]. [Show code or diagram]"

**Takeaway (30–45s)**: "The key thing to remember: [one sentence]"

**CTA (45–60s)**: "Follow for more frontend tips. Link in bio for the full post."
```

---

### E. Newsletter Snippet

```markdown
## Newsletter Snippet

**Subject line**: [Question or bold claim from the hook]

**Body**:
[2–3 paragraph summary of the post. First person, conversational.]

**Key takeaways**:
1. [Takeaway 1]
2. [Takeaway 2]
3. [Takeaway 3]

[Read the full post →](link)
```

---

### F. Quiz Questions (for the blog)

```markdown
## Quiz Questions

Generate 2–3 quiz questions from the content (multiple-choice or true/false).
Follow the quiz format from BLOG_WRITING_PROMPT.md.
```

---

### G. Challenge Idea (for the blog)

```markdown
## Challenge Idea

If the content involves a buildable concept, suggest a coding challenge:
- Title
- Description (2–3 sentences)
- Difficulty (easy/medium/hard)
- Key concepts
```

---

## 4. Present Everything

Output all sections (A through G) in one response. The user can copy what they need.

If the source doesn't lend itself to a challenge or quiz (e.g. it's a conceptual piece), skip those sections and note why.

## 5. Save X Thread as Draft (Auto-Posts When Blog Publishes)

After generating the Twitter/X thread (section B), save it as a draft that will post automatically when the blog is published.

### Workflow

1. **Extract the tweet texts** from section B. Strip the markdown formatting (`**Tweet 1 (Hook)**:`, etc.) and collect just the tweet content into an array of strings.

2. **Check character counts** — Each tweet must be under 280 X-visible characters. Shorten any that exceed the limit.

3. **Write the draft file** — Create `content/blog/drafts/.social/{slug}-x.json`:

```json
{
  "mode": "thread",
  "tweets": [
    "Tweet 1 text here (under 280 chars)...",
    "Tweet 2 text here...",
    "Tweet 3 text here...",
    "Tweet 4 text here...",
    "Tweet 5 text here...",
    "Tweet 6 text here..."
  ]
}
```

Use the blog post's `slug` from frontmatter (e.g., `compound-components-pattern-x.json`).

4. **Tell the user** — "X thread draft saved to `content/blog/drafts/.social/{slug}-x.json`. It will post automatically when you publish the blog with `npm run publish-post -- {slug}`."

### Important Rules

- **Always check character counts** — Each tweet under 280 X-visible chars (URLs count as 23).
- **User can edit** — The draft file is stored so the user can edit tweets before publishing.
- If the user says "don't save draft" or "skip X", skip this step.
- When chained from blog-writer, the slug is the post you just created.

### X API Setup (One-Time)

If the user hasn't set up X API credentials yet, provide these instructions:

1. Go to https://developer.x.com/en/portal/dashboard
2. Create a project and app (Free tier is fine — allows 1,500 tweets/month)
3. In the app settings, generate:
   - **API Key** (Consumer Key) → set as `X_API_KEY` in `.env`
   - **API Secret** (Consumer Secret) → set as `X_API_SECRET` in `.env`
   - **Access Token** → set as `X_ACCESS_TOKEN` in `.env`
   - **Access Token Secret** → set as `X_ACCESS_TOKEN_SECRET` in `.env`
4. Make sure the app has **Read and Write** permissions

---

## 6. Save LinkedIn Post as Draft (Humanized — Used on Publish)

After generating the LinkedIn post (section A):

1. **Run the LinkedIn anti-AI checklist** from section A (and the [blog-human-voice](../blog-human-voice/SKILL.md) pass) — remove "🚀 New Blog Post", "If this was helpful follow me", *additionally/crucial/delve/landscape/pivotal*, inflated-significance lines, forced triples, curly quotes, and generic hashtag stacks.
2. **Front-load the hook** — first ~210 characters must stand alone (LinkedIn "...see more" cutoff).
3. **Write** `content/blog/drafts/.social/{slug}-linkedin.json`:

```json
{
  "text": "Concrete hook from the story...\n\nShort beats or bullets...\n\nhttps://blog.sandeepallala.com/blog/{slug}\n\n#systemdesign #tag2"
}
```

4. **Tell the user** — "LinkedIn draft saved. Preview: `npm run post-linkedin -- {slug} --dry-run`. Posts on `publish-post`."

If the user says "skip LinkedIn draft", skip this step.

---

## Chained Execution

This skill runs **automatically** as Step 6 of the [Blog Writer](../blog-writer/SKILL.md) skill. When chained:
- The source is the blog post file just created — no need to ask the user
- Skip section F (Quiz Questions) since the blog-writer already created the quiz
- Present all other outputs (A–E, G) in the same response as the blog-writer quality checklist
- **Save the X thread as draft** (step 5) — write to `content/blog/drafts/.social/{slug}-x.json`; it will post when the blog is published
- **Save the humanized LinkedIn post** (step 6) — write to `content/blog/drafts/.social/{slug}-linkedin.json`; used by `post-to-linkedin` on publish

This skill can also run independently when the user asks to repurpose existing content.

## Example Trigger Phrases

- "Repurpose my debounce post for social media"
- "Turn this blog post into LinkedIn + Twitter + Instagram content"
- "Create leverage content from this"
- "Generate social posts for my latest article"
- "Share this on all platforms"
- "Post this to X" / "Tweet this thread"
