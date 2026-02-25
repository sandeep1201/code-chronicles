# Social Drafts

X (Twitter) thread drafts are stored here as `{slug}-x.json`.

When the content-leverage-engine runs, it writes the generated thread to this folder.
When you publish the blog post (via `npm run publish-post` or scheduled publish),
the tweet is posted automatically and this file is removed.

Format:
```json
{
  "mode": "thread",
  "tweets": ["Tweet 1...", "Tweet 2...", ...]
}
```

You can edit these files before publishing to customize the thread.
