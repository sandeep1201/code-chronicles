# Social Drafts

Platform-specific copy lives here before publish. Edit these files to customize tone and hooks.

## X (Twitter) thread

**File:** `{slug}-x.json`

Posted automatically when you publish via `npm run publish-post -- {slug}`. Removed after a successful post.

```json
{
  "mode": "thread",
  "tweets": ["Tweet 1...", "Tweet 2...", "..."]
}
```

Each tweet must be under 280 characters.

## LinkedIn post (humanized)

**File:** `{slug}-linkedin.json`

Used by `post-to-linkedin.ts` and `publish-post` when credentials are set. If missing, the script falls back to auto-generated copy (generic — avoid for production).

```json
{
  "text": "Hook paragraph...\n\nShort bullets or story beats...\n\nhttps://blog.sandeepallala.com/blog/{slug}\n\n#systemdesign #tag2"
}
```

### LinkedIn voice rules

Apply the [blog-human-voice](../../.cursor/skills/blog-human-voice/SKILL.md) anti-AI pass:

- **No** `🚀 New Blog Post:` openers or brochure CTAs ("If this was helpful, follow me...")
- Start with a **specific story** from the article (failure, surprise, ticket, metric)
- Short paragraphs and line breaks; bullets only when they scan fast
- Plain language — cut *additionally, crucial, delve, landscape, pivotal, underscore*
- Link at the end with the full canonical URL
- 3–6 relevant hashtags (not generic `#JavaScript #WebDevelopment` on system design posts)
- First ~210 characters should hook; LinkedIn truncates with "...see more"

Preview before posting:

```bash
npm run post-linkedin -- {slug} --dry-run
```

Removed after a successful LinkedIn post via `publish-post`.
