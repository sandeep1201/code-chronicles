# Famous Systems — Case Study Breakdown Plan

**Course**: `system-design` (Code Chronicles — same `course.id`, Part 3)  
**Goal**: Deconstruct how real, famous systems solve one hard problem at a time — with requirements, napkin math, diagrams, production trade-offs, and links back to Part 1 + Part 2 concepts.  
**Status**: Planned — start **after** Module 8 (Design Framework) ships; ideally after Modules 9–11 interview classics for composition practice.  
**Parent plan**: `APPLIED-SYSTEM-DESIGN-PLAN.md` (Modules 7–11)  
**Cadence**: 1 post every 1–2 weeks

---

## How this fits Part 2

Part 2 already has **generic interview case studies** (Modules 9–11). Part 3 adds **famous-system deconstructions** — same design skills, different framing.

| Track | Modules | Framing | Example |
|-------|---------|---------|---------|
| **Interview classics** (Part 2) | 9–11 | "Design a URL shortener" — you own the requirements | Scope control, composition from scratch |
| **Famous systems** (Part 3) | 12–17 | "How Twitter's home timeline works" — real constraints & blogs | Reverse-engineering, production reality |

**Write interview classics first.** They teach the framework without debating what Netflix "really" does. Famous-system posts then answer: *"OK, but what did production actually look like?"*

---

## The golden rule: one hard problem per post

| ❌ Don't | ✅ Do |
|---------|--------|
| "Design Netflix" (everything) | "How Netflix Delivers Video: Encoding, ABR, and Open Connect" |
| "Design Uber" (whole platform) | "How Uber Matches Riders and Drivers at Scale" |
| "Design Google" | "How Google Search Indexes the Web: Crawl, Index, Rank" |

Every post names a **real system** but scopes to **one primary challenge**, one user journey, and **2–3 deep components**. Everything else goes in "Out of scope."

---

## Prerequisites (for readers and for you)

### Before writing any Part 3 post

- Part 1 complete (10 published fundamentals posts)
- Module 7 advanced fundamentals (at least hashing, CDN, idempotency)
- Module 8 design framework (all 3 posts)

### Before writing specific modules

| Module | Also read / write first |
|--------|-------------------------|
| 12 — Social & feeds | Module 10 post 12 (fan-out); async + caching Part 1 |
| 13 — Media & streaming | Module 7 CDN; performance metrics Part 1 |
| 14 — Real-time & location | Module 10 chat/notifications; CAP + communication Part 1 |
| 15 — Commerce & payments | Module 7 idempotency; reliability Part 1 |
| 16 — Storage & sync | Module 7 consistent hashing; databases Part 1 |
| 17 — Search & discovery | Module 9 web crawler; Module 11 search + streams |

---

## Part 3 course structure

Append to `content/courses/system-design/meta.json` when Module 12 first post ships.

| Order | Module ID | Name | Posts | Primary lens |
|-------|-----------|------|-------|--------------|
| 12 | `famous-social-feeds` | Famous Systems: Social & Feeds | 5 | Fan-out, ranking, hot feeds |
| 13 | `famous-media-streaming` | Famous Systems: Media & Streaming | 4 | Upload pipelines, transcoding, playback |
| 14 | `famous-realtime-location` | Famous Systems: Real-Time & Location | 4 | Matching, geo indexes, low-latency messaging |
| 15 | `famous-commerce-payments` | Famous Systems: Commerce & Payments | 3 | Inventory, flash sales, payment idempotency |
| 16 | `famous-storage-sync` | Famous Systems: Storage & Sync | 3 | Block storage, sync, conflict resolution |
| 17 | `famous-search-discovery` | Famous Systems: Search & Discovery | 3 | Crawl/index/rank, visual search |

**Total Part 3 posts:** 22  
**Combined Part 2 case studies + Part 3:** 8 + 22 = **30 applied posts** (plus 17 concept/framework posts in Part 2)

---

## Standard post template (every famous-system post)

Use this outline in every Part 3 article. Matches Code Chronicles voice + `BLOG_WRITING_PROMPT.md`.

### Frontmatter

```yaml
course:
  id: system-design
  module: famous-social-feeds   # or relevant module
  order: 1
tags:
  - system-design
  - case-study
  - twitter                    # real system name
  - feeds
  - applied
  - advanced
```

### Section outline

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Personal hook** | A confusion from interviews vs reading a real engineering blog |
| 2 | **What we're breaking down** | Real system + **one scoped problem** + user journey |
| 3 | **Out of scope** | Explicit list (payments, ads, ML ranking details, etc.) |
| 4 | **Requirements** | Functional + non-functional table (latency, scale, consistency) |
| 5 | **Back-of-the-envelope** | DAU, QPS, storage, bandwidth — real order-of-magnitude numbers |
| 6 | **High-level architecture** | Mermaid `flowchart LR` — clients → edge → services → data |
| 7 | **Deep dive #1** | Hardest component — mechanism + trade-offs |
| 8 | **Deep dive #2** | Second hard component |
| 9 | **Deep dive #3** (optional) | Failure handling, hot keys, or multi-region angle |
| 10 | **What production did** | 2–4 bullets from public engineering posts — link sources |
| 11 | **Interview design vs production** | What you'd draw in 45 min vs what they actually run |
| 12 | **What breaks when…** | 3 failure scenarios |
| 13 | **Links to our fundamentals** | Part 1 + Module 7–11 — no re-teaching |
| 14 | **Key Takeaways** | Numbered list |
| 15 | **Quiz** | Trade-off scenarios, not trivia |

### Diagrams (2–4 per post)

- 1× high-level architecture (Mermaid LR)
- 1× data flow for the scoped problem (sequence or flowchart)
- 1× trade-off or fan-out diagram (`<HashRing />` only when hashing is central)
- Optional: before/after or naive vs production comparison

---

## Module 12 — Famous Systems: Social & Feeds

**Core question:** How do you show millions of users a personalized feed without melting the database?

| # | Slug | Title | Scoped problem | Deep dives | Key CC links |
|---|------|-------|----------------|------------|--------------|
| 1 | `system-design-twitter-home-timeline` | How Twitter's Home Timeline Works at Scale | Read path for home feed; fan-out | Fan-out on write vs read; celebrity/hot user problem; caching layers | Fan-out post, caching, async, load balancing |
| 2 | `system-design-instagram-photo-pipeline` | How Instagram Serves Photos: Upload, Storage, and the Feed | Photo upload → CDN → feed read | Object storage; thumbnail generation; feed cache | CDN post, caching, databases |
| 3 | `system-design-reddit-hot-ranking` | How Reddit Ranks Posts: Votes, Sharding, and the Hot Algorithm | Hot/rising ranking at scale | Vote counters; time decay; sharding posts/comments | Databases sharding, performance metrics |
| 4 | `system-design-linkedin-feed-ranking` | How LinkedIn's Feed Pipeline Handles Professional Graph Scale | Feed generation + ranking pipeline (not ML internals) | Graph fan-out; feature store at high level; batch vs real-time | Async, communication patterns |
| 5 | `system-design-facebook-news-feed-fanout` | Facebook's News Feed: The Fan-Out Problem Before Twitter | Historical fan-out design; hybrid models | Write path vs read path; TAO cache layer (conceptual) | Consistent hashing, caching |

**Hook for post #1:** *"In interviews I drew one big 'Feed Service' box. Then I read Twitter's engineering posts and realized the home timeline is three different systems depending on who you follow."*

**Research sources:** Twitter/X engineering blog (timeline, Manhattan, GraphJet era); Meta engineering; Reddit architecture posts; LinkedIn engineering blog.

**Napkin math prompts:** 300M DAU, 200 follows avg, 1 tweet/day/user → write QPS vs read QPS; storage per tweet; cache size for hot users.

**Out of scope for #1:** Ads injection, recommendation ML, Spaces, DMs, search.

---

## Module 13 — Famous Systems: Media & Streaming

**Core question:** How do you move gigabytes of video to billions of playbacks with acceptable startup time?

| # | Slug | Title | Scoped problem | Deep dives | Key CC links |
|---|------|-------|----------------|------------|--------------|
| 6 | `system-design-youtube-video-pipeline` | How YouTube Processes Uploads: Ingest, Transcoding, and Storage | Upload → encode → store → serve | Job queue for transcoding; multiple renditions; blob storage | Async messaging, CDN |
| 7 | `system-design-netflix-streaming-delivery` | How Netflix Delivers Video: ABR, Open Connect, and Microservices | Playback path + CDN strategy | Adaptive bitrate; edge caches; microservice boundaries (Conductor) | CDN, load balancing, reliability |
| 8 | `system-design-spotify-streaming-and-playlists` | How Spotify Streams Audio and Syncs Playlists | Streaming + cross-device playlist state | Chunked audio delivery; sync/conflict at high level; catalog metadata | Caching, communication patterns |
| 9 | `system-design-twitch-live-streaming-latency` | How Twitch Handles Live Streaming: Latency vs Scale | Live ingest → fan-out to viewers | RTMP/HLS trade-offs; low-latency vs buffer; chat sidecar | Async, WebSockets (chat post) |

**Hook for post #7:** *"I said 'use a CDN' in every interview. Netflix made me understand why they built their *own* CDN — and when that stops making sense."*

**Research sources:** Netflix Tech Blog (Open Connect, Zuul, Conductor); YouTube/Google infrastructure talks; Spotify engineering; Twitch architecture posts.

**Napkin math:** 1 hour 1080p ≈ 3 GB; 1M concurrent viewers × 5 Mbps; transcoding farm size; edge cache hit ratio targets.

**Out of scope:** DRM deep dive, content moderation, recommendation models.

### Detailed outline — Post 6 (YouTube pipeline)

> **Status:** Part 3, **not started**. Drafted 2026-08-02 from Educative "Design YouTube" notes (vault: `MySecondBrain/wiki/learning/youtube-system-design.md`). Do not write the MDX until Part 2 (Modules 7–11) ships; `blog-writer` owns the eventual draft.
>
> **Scope discipline:** this post owns **upload → encode → store → serve-ready**. ABR + CDN/delivery belong to **Post #7 (Netflix)** — forward-link, don't re-teach.

| # | Section | Content |
|---|---------|---------|
| 1 | Personal hook | "In interviews I drew one 'Transcoding Service' box. Then I learned a single upload fans out into hundreds of parallel encode jobs before anyone can press play." |
| 2 | What we're breaking down | YouTube; scoped to upload → encode → store → serve-ready. Journey: creator uploads → video watchable in multiple qualities. |
| 3 | Out of scope | ABR/playback (→ #7 Netflix), recommendations, ads, DRM, comments/likes, search ranking, live streaming. |
| 4 | Requirements | FR: upload, transcode to N renditions, thumbnails, availability. NFR: reliability (never lose an upload), throughput (500 hrs/min), eventual consistency for availability. |
| 5 | Back-of-envelope | 500 hrs/min; 6 MB/min compressed ≈ 180 GB/min before raw + N renditions; ~480 Gbps upload; dedup saves ~9.5 PB/yr. |
| 6 | High-level architecture | Mermaid LR: client → resumable upload → temp store → job queue → transcode workers → blob store + Bigtable thumbnails → CDN push. |
| 7 | Deep dive #1 — transcoding job queue | Chunk/segment raw file, fan out parallel encode jobs per rendition/codec, per-shot encoding for storage savings, reassemble. → async messaging. |
| 8 | Deep dive #2 — storage tiering | Blob store for video; Bigtable for thumbnail metadata/refs; flash vs storage servers; sharding for write scale. → CDN, databases. |
| 9 | Deep dive #3 (optional) | Resumable/chunked uploads + ingest-time dedup (LSH, block matching). |
| 10 | What production did | Google infra talks: parallel transcoding, per-shot encoding, own network/CDN (date the claims). |
| 11 | Interview vs production | One "encoder" box vs a transcoding farm + job queue + dedup + tiered storage. |
| 12 | What breaks when… | Transcode worker dies mid-job; hot upload spike; dedup false positive. |
| 13 | Links to fundamentals | Async messaging, CDN (Module 7), databases/sharding, back-of-envelope; forward-link Netflix #7 for ABR. |
| 14 | Key Takeaways | Numbered. |
| 15 | Quiz | Scenarios: "A 4-hour 4K upload arrives; why segment before encoding?" / "Transcode farm backs up 30 min; what degrades first?" |

**Diagrams:** (1) ingest pipeline flowchart LR, (2) transcoding fan-out sequence, (3) storage tiering. No `<HashRing />` (hashing not central here).

---

## Module 14 — Famous Systems: Real-Time & Location

**Core question:** How do you match, route, or deliver messages in seconds (or milliseconds) at global scale?

| # | Slug | Title | Scoped problem | Deep dives | Key CC links |
|---|------|-------|----------------|------------|--------------|
| 10 | `system-design-uber-driver-matching` | How Uber Matches Riders and Drivers | Real-time matching + ETA | Geospatial indexing (grid/quadtree); dispatch service; surge as load signal | CAP, performance, load balancing |
| 11 | `system-design-whatsapp-message-delivery` | How WhatsApp Delivers Messages to Billions | Message routing + delivery guarantees | Connection fan-in; store-and-forward; idempotency on delivery | Idempotency, async, reliability |
| 12 | `system-design-slack-realtime-messaging` | How Slack Keeps Channels Real-Time at Work Scale | Channel messaging + presence | WebSockets gateway; channel sharding; search index side path | Chat system post, communication patterns |
| 13 | `system-design-discord-voice-and-text` | How Discord Scales Voice and Text Together | Voice rooms + text channels | SFU vs MCU; regional voice servers; text message fan-out | Multi-region, async |

**Hook for post #10:** *"I drew 'GPS + database' for Uber. The interesting part is what happens when ten thousand riders in downtown SF all request a car at once."*

**Research sources:** Uber Engineering; WhatsApp architecture (public talks); Slack engineering; Discord blog (Elixir, voice scaling).

**Napkin math:** Peak city QPS for match requests; driver pool size; message delivery QPS per region; WebSocket connection counts.

**Out of scope:** Pricing algorithms, fraud, full maps routing graph.

---

## Module 15 — Famous Systems: Commerce & Payments

**Core question:** How do you sell the last ticket or charge a card exactly once under extreme load?

| # | Slug | Title | Scoped problem | Deep dives | Key CC links |
|---|------|-------|----------------|------------|--------------|
| 14 | `system-design-amazon-order-placement` | How Amazon Places Orders: Inventory and Consistency | Checkout path + inventory reservation | Optimistic locking; reservation TTL; idempotent checkout | Idempotency, databases, reliability |
| 15 | `system-design-stripe-payment-intents` | How Stripe Processes Payments Without Double Charges | Payment intent lifecycle | Idempotency keys; webhook retries; exactly-once-ish semantics | Idempotency post (Module 7) |
| 16 | `system-design-ticketmaster-flash-sales` | How Ticketmaster Survives On-Sale Day: Queues and Inventory | Flash sale traffic + seat holds | Virtual waiting room; inventory locks; CDN for static | Rate limiter post, load balancing, queues |

**Hook for post #16:** *"Ticketmaster is the case study nobody wants to be. It's still the best lesson in what happens when demand is 100× your steady-state QPS."*

**Research sources:** Stripe docs + engineering blog; Amazon Dynamo paper (context); public Ticketmaster/post-mortem discussions; queue-it patterns.

**Napkin math:** 100k tickets, 2M users in 10 minutes → peak QPS; hold duration; payment success rate under retry.

---

## Module 16 — Famous Systems: Storage & Sync

**Core question:** How do you sync files across devices when users edit offline and conflicts happen?

| # | Slug | Title | Scoped problem | Deep dives | Key CC links |
|---|------|-------|----------------|------------|--------------|
| 17 | `system-design-dropbox-block-sync` | How Dropbox Syncs Files: Blocks, Hashes, and Conflicts | Block-level sync + dedup | Content-defined chunking; metadata service; conflict copies | Consistent hashing, databases |
| 18 | `system-design-s3-object-storage` | How S3-Style Object Storage Works (The System Behind the API) | PUT/GET at exabyte scale | Consistency model; erasure coding; request routing | CAP, databases, CDN |
| 19 | `system-design-google-drive-collaboration` | How Google Drive Handles Concurrent Edits (High Level) | Multi-user edit conflicts | Operational transform / CRDT at concept level; revision history | Event sourcing (Module 7) |

**Hook for post #17:** *"I thought Dropbox uploaded whole files every time. Block hashing is why sync feels instant — and why conflicted copies exist."*

**Research sources:** Dropbox tech blog (Magic Pocket, block sync); AWS S3 consistency docs; Google Drive architecture talks.

---

## Module 17 — Famous Systems: Search & Discovery

**Core question:** How do you find one result in billions of documents in under a second?

| # | Slug | Title | Scoped problem | Deep dives | Key CC links |
|---|------|-------|----------------|------------|--------------|
| 20 | `system-design-google-search-pipeline` | How Google Search Works: Crawl, Index, and Rank | End-to-end search pipeline (ranking ML light) | Crawler fleet; inverted index; query serving path | Web crawler post, search at scale post |
| 21 | `system-design-pinterest-visual-discovery` | How Pinterest Approaches Visual Search and Discovery | Image index + retrieval | Image embeddings pipeline; sharded index; cache hot queries | CDN, databases sharding |
| 22 | `system-design-elasticsearch-at-scale` | Elasticsearch at Scale: Lessons from Production Deployments | Operating search clusters | Shard sizing; reindex; hot/warm tiers | Search post (Module 11), leader election |

**Hook for post #20:** *"Design a search engine in an interview fits on one whiteboard. Google's production pipeline is a factory with stages — and each stage has different scaling rules."*

**Research sources:** Google crawl/index papers; Pinterest engineering; Elastic official architecture guides.

---

## Cross-reference map: Part 2 classics → Part 3 famous systems

Pair generic designs with famous-system deep dives so readers see both sides.

| Part 2 classic (write first) | Part 3 famous follow-up |
|------------------------------|-------------------------|
| Fan-out on write vs read (#12) | Twitter timeline (#1), Facebook feed (#5) |
| Notification system (#13) | WhatsApp delivery (#11) |
| Chat system (#14) | Slack (#12), Discord (#13) |
| Web crawler (#11) | Google Search pipeline (#20) |
| Search at scale (#16) | Elasticsearch at scale (#22), Pinterest (#21) |
| Rate limiter (#15) | Ticketmaster flash sales (#16) |
| URL shortener (#10) | (Optional) Bitly-style addendum — low priority |
| Idempotency (Module 7) | Stripe payments (#15), Amazon orders (#14) |
| CDN (Module 7) | Netflix Open Connect (#7), YouTube (#6) |
| Consistent hashing (Module 7) | Dropbox blocks (#17), S3 (#18) |

---

## Writing order (recommended)

### Phase A — Finish Part 2 foundation (do not skip)

1. Module 7 (advanced fundamentals) — in progress  
2. Module 8 (design framework)  
3. Modules 9–11 (8 interview classics)

### Phase B — Famous systems (Part 3)

Start with posts that have the strongest Part 2 prerequisites already written:

| Wave | Posts | Why first |
|------|-------|-----------|
| **Wave 1** | Twitter timeline, YouTube pipeline, Uber matching | Highest interview recognition; maps to fan-out, CDN, geo |
| **Wave 2** | Netflix delivery, WhatsApp delivery, Stripe payments | Teaches production vs interview gap; idempotency payoff |
| **Wave 3** | Google Search, Dropbox sync, Ticketmaster flash sales | Pairs with crawler, hashing, rate limiting classics |
| **Wave 4** | Remaining social + Slack/Discord + Pinterest + S3 + rest | Broader coverage once pattern is established |

---

## Per-post research checklist

Before drafting each famous-system post:

- [ ] Find **1 primary** engineering blog or paper (authoritative)
- [ ] Find **1 secondary** source that disagrees or adds nuance
- [ ] Note **year** of source — call out if architecture may have changed
- [ ] Extract **3 quotable facts** (numbers, design decisions, failures)
- [ ] Identify **1 myth** the interview answer gets wrong
- [ ] Map **3 links** to existing Code Chronicles posts
- [ ] Define **out of scope** in writing (prevents scope creep)

### Source tiers

| Tier | Use |
|------|-----|
| **A** | Company engineering blog, official paper (Dynamo, Kafka, etc.) |
| **B** | Conference talk (QCon, Strange Loop) with slides |
| **C** | ByteByteGo / Hello Interview — scope reference only, verify claims |
| **D** | Random Medium posts — avoid unless corroborated |

---

## Napkin math reference (reuse across posts)

| Constant | Rough value |
|----------|-------------|
| 1 day | 86,400 seconds ≈ **100k seconds** |
| 1 month | ≈ **2.5M seconds** |
| 1 year | ≈ **30M seconds** |
| Text tweet + metadata | ~500 bytes – 2 KB |
| Photo (Instagram) | 100 KB – 2 MB served |
| 1 min 1080p video | ~50–150 MB stored (multi-bitrate) |
| 1 hour 1080p stream | ~1–4 GB |
| SSD / object storage | $0.02–0.03/GB/mo (order of magnitude) |

Always state assumptions: *"Assume 200M DAU, 20% post daily, average 500 bytes per post…"*

---

## Quiz design for case studies

Favor **scenario questions**:

- "A celebrity with 50M followers posts. Which fan-out strategy breaks first?"
- "Payment webhook retries 3 times. What must the handler guarantee?"
- "CDN hit ratio drops from 95% to 60%. Name two likely causes."

Avoid: "What year did Twitter launch Manhattan?" trivia.

---

## Content flywheel

| After each publish | Action |
|--------------------|--------|
| **Cross-link** | Part 2 classic ↔ Part 3 famous post (see map above) |
| **LinkedIn** | Lead with the *myth* the post corrects; link to canonical URL |
| **"Interview vs production" box** | Reusable sidebar/callout pattern across Part 3 |
| **Thumbnails** | `scripts/generate-blog-images.ts` after publish |
| **Course meta** | Extend `meta.json` modules 12–17 as each module starts |

---

## What to avoid

| Don't | Why |
|-------|-----|
| Write Part 3 before Module 8 | Readers lack requirements/math/diagram framework |
| One post per entire company | Stays shallow; violates golden rule |
| Present blog posts as current truth without dates | Architectures evolve; say "as described in 2017…" |
| Copy diagrams from ByteByteGo verbatim | Synthesize; link for scope |
| Re-teach consistent hashing in every post | Link to Module 7 |
| Skip "Out of scope" | Famous systems expand forever without it |
| 30 famous systems in 30 weeks back-to-back | Research-heavy; burnout |

---

## Optional Part 3 extensions (later)

If the core 22 posts land well:

| Slug idea | System | Scoped problem |
|-----------|--------|----------------|
| `system-design-airbnb-search-and-booking` | Airbnb | Search ranking + booking consistency |
| `system-design-apple-app-store-delivery` | Apple | App binary CDN + signing pipeline |
| `system-design-cloudflare-edge` | Cloudflare | Edge compute + DDoS mitigation |
| `system-design-kafka-at-linkedin` | LinkedIn/Kafka | Log-based streaming origin story |
| `system-design-wikipedia-read-heavy` | Wikipedia | Read-heavy CDN + edit write path |

Keep these **out of the core 22** until Module 17 is halfway done.

---

## Progress tracker

### Part 2 prerequisite (case study classics)

See `APPLIED-SYSTEM-DESIGN-PLAN.md` — Modules 9–11 (8 posts).

### Module 12 — famous-social-feeds

- [ ] Post 1: Twitter Home Timeline
- [ ] Post 2: Instagram Photo Pipeline
- [ ] Post 3: Reddit Hot Ranking
- [ ] Post 4: LinkedIn Feed Pipeline
- [ ] Post 5: Facebook News Feed Fan-Out

### Module 13 — famous-media-streaming

- [ ] Post 6: YouTube Video Pipeline — *detailed outline drafted (see Module 13 above); MDX not started*
- [ ] Post 7: Netflix Streaming Delivery
- [ ] Post 8: Spotify Streaming & Playlists
- [ ] Post 9: Twitch Live Streaming

### Module 14 — famous-realtime-location

- [ ] Post 10: Uber Driver Matching
- [ ] Post 11: WhatsApp Message Delivery
- [ ] Post 12: Slack Real-Time Messaging
- [ ] Post 13: Discord Voice and Text

### Module 15 — famous-commerce-payments

- [ ] Post 14: Amazon Order Placement
- [ ] Post 15: Stripe Payment Intents
- [ ] Post 16: Ticketmaster Flash Sales

### Module 16 — famous-storage-sync

- [ ] Post 17: Dropbox Block Sync
- [ ] Post 18: S3 Object Storage
- [ ] Post 19: Google Drive Collaboration

### Module 17 — famous-search-discovery

- [ ] Post 20: Google Search Pipeline
- [ ] Post 21: Pinterest Visual Discovery
- [ ] Post 22: Elasticsearch at Scale

---

## Immediate next steps (current priority)

**Not Part 3 yet.** Stay on Part 2:

1. Finish Module 7 drafts (consistent hashing → event sourcing)
2. Publish Module 8 (design framework × 3)
3. Write Module 9–11 interview classics
4. **Then** start Part 3 Wave 1: `system-design-twitter-home-timeline`

---

## Related files

| File | Role |
|------|------|
| `APPLIED-SYSTEM-DESIGN-PLAN.md` | Part 2 Modules 7–11 |
| `BLOG_WRITING_PROMPT.md` | Post structure, Mermaid, quizzes |
| `content/courses/system-design/meta.json` | Add modules 12–17 when ready |
| `STAFF_ENGINEER_3_MONTH_PREP_PLAN.md` | Interview systems list (cross-check coverage) |

---

*Last updated: 2026-06-28*
