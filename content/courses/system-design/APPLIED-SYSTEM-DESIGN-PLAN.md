# Applied System Design — Content & Learning Plan

**Course**: `system-design` (Code Chronicles)  
**Goal**: Learn system design by researching and writing Part 2 content — advanced concepts first, then a design framework, then full system case studies.  
**Status**: Part 1 published (10 posts). Part 2 planned (17 posts).  
**Cadence**: **2 posts per week** from Phase 2 onward (publish on site + LinkedIn within 48h each). Phase 1 LinkedIn promotion was 1/week (complete).

---

## Why Part 2

Part 1 (**System Design Fundamentals**) answers: *What are the building blocks?*

| Part | Focus | Reader outcome |
|------|-------|----------------|
| **Part 1** (done) | Core concepts — LB, cache, CAP, queues, etc. | Knows the vocabulary and trade-offs |
| **Part 2** (next) | Advanced concepts → design framework → applied case studies | Can explain deeper ideas and compose them into full designs |

Part 1 **teased** several topics (CDN, consistent hashing, idempotency) in passing. Part 2 opens with **concept-first posts** that give those ideas proper depth, *then* introduces the design framework, *then* walks through end-to-end systems that link back to both Part 1 and the advanced concepts.

---

## Concept gaps — Part 1 vs Part 2

| Core concept | Part 1 coverage | Part 2 home |
|---|---|---|
| Consistent hashing | Section in cross-cutting post | Module 7, post 1 |
| CDN / edge caching | Sections in caching + cross-cutting | Module 7, post 2 |
| Idempotency / delivery guarantees | Section in reliability; mentions in async | Module 7, post 3 |
| Leader election / distributed locks | Not covered | Module 7, post 4 |
| Multi-region / active-active | Not covered | Module 7, post 5 |
| Event sourcing / CQRS | Not covered | Module 7, post 6 |
| Fan-out (write vs read) | Not covered | Module 10, post 13 (case study) |
| Search / inverted indexes | Not covered | Module 11, post 16 (concept-heavy) |
| Stream processing / event logs | Kafka mentioned in async post | Module 11, post 17 (concept-heavy) |

---

## Part 1 — Completed (reference)

All published under `course.id: system-design`. Use these as prerequisite links in Part 2 posts.

| Order | Module | Slug | Title |
|-------|--------|------|-------|
| 1 | fundamentals | `system-design-scalability-scaling-up-vs-out` | Scalability: Scaling Up vs Scaling Out |
| 2 | traffic-and-caching | `system-design-load-balancing-explained` | Load Balancing Explained |
| 3 | traffic-and-caching | `system-design-caching-strategies-and-pitfalls` | Caching Strategies and Pitfalls |
| 4 | data | `system-design-databases-sql-vs-nosql-replication-sharding` | Databases: SQL vs NoSQL, Replication, Sharding |
| 5 | data | `system-design-cap-theorem-consistency-availability` | CAP Theorem: Consistency vs Availability |
| 6 | resilience | `system-design-reliability-and-fault-tolerance` | Reliability and Fault Tolerance |
| 7 | resilience | `system-design-asynchronous-processing-and-messaging` | Asynchronous Processing and Messaging |
| 8 | communication | `system-design-communication-patterns-rest-grpc-events` | Communication Patterns: REST, gRPC, Events |
| 9 | fundamentals | `system-design-performance-metrics-latency-throughput` | Performance Metrics: Latency and Throughput |
| 10 | operations | `system-design-cross-cutting-concerns-rate-limiting-observability-security` | Cross-Cutting Concerns: Rate Limiting, Observability, Security |

Each post has a matching quiz at `content/blog/quizzes/{slug}-quiz.json`.

---

## Part 2 — Course structure

Extend the existing `system-design` course (same `course.id`) with **5 new modules**. Update `meta.json` title/description when Part 2 launches (e.g. "System Design: Fundamentals to Applied").

### New modules (append to `content/courses/system-design/meta.json`)

| Order | Module ID | Name | Description |
|-------|-----------|------|-------------|
| 7 | `advanced-fundamentals` | Advanced Fundamentals | Deeper concepts teased or missing from Part 1 — hashing, CDN, idempotency, coordination, multi-region, event patterns |
| 8 | `design-framework` | The Design Framework | How to approach any system design problem — requirements, math, diagrams, trade-offs |
| 9 | `read-heavy-systems` | Read-Heavy Systems | Case studies: high read ratio, caching layers, distributed workers |
| 10 | `write-realtime` | Write-Heavy & Real-Time | Case studies: feeds, notifications, chat |
| 11 | `data-at-scale` | Data at Scale | Case studies and concept-heavy posts: rate limiting, search, stream processing |

### Part 2 arc (writing order)

```
Part 1 (done)
    ↓
Module 7: Advanced Fundamentals   ← concept depth first (6 posts)
    ↓
Module 8: Design Framework        ← how to compose concepts (3 posts)
    ↓
First case study: Payment System  ← composes the most Part 1 + Module 7 links
    ↓
Modules 9–11: Remaining case studies
```

---

## Part 2 — Post backlog (writing order)

### Module 7 — Advanced Fundamentals (write first)

Concept-first posts. Expand on Part 1 teasers and cover topics Part 1 skipped entirely. No full system design yet — focus on the idea, trade-offs, and where it shows up in real systems.

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 1 | `system-design-consistent-hashing` | Consistent Hashing and Why Resharding Hurts | Ring topology, virtual nodes, minimal key movement, use in caches and shards |
| 2 | `system-design-cdn-and-edge-caching` | CDN and Edge Caching in Practice | Static vs dynamic, TTL, invalidation, origin shield, cache poisoning |
| 3 | `system-design-idempotency-and-delivery-guarantees` | Idempotency and Delivery Guarantees | Idempotency keys, at-least-once vs exactly-once-ish, outbox pattern |
| 4 | `system-design-leader-election-and-distributed-locks` | Leader Election and Distributed Locks | Coordination, split-brain, TTL locks, when *not* to build your own |
| 5 | `system-design-multi-region-and-active-active` | Multi-Region and Active-Active | Latency vs consistency, conflict resolution, failover, data residency |
| 6 | `system-design-event-sourcing-and-cqrs` | Event Sourcing and CQRS | Append-only logs, read models, when the complexity is worth it |

**Hook angle for post #1:** *"Part 1 mentioned consistent hashing in one section. When I actually had to add a cache node, I realized I didn't understand why only ~1/N keys should move — and why that matters."*

**Prerequisites:** Relevant Part 1 posts (databases/sharding, caching, reliability) — link, don't repeat.

**Post type:** Concept — see checklist below (no full system requirements table).

---

### Module 8 — The Design Framework

Bridge from concepts to composition. Write after Module 7 so the framework references advanced ideas readers already know.

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 7 | `system-design-how-to-approach-any-problem` | How to Approach Any System Design Problem | Requirements gathering, scope control, interview vs real-world design |
| 8 | `system-design-back-of-envelope-math` | Back-of-the-Envelope Math That Actually Matters | Storage, QPS, bandwidth; when estimates change architecture |
| 9 | `system-design-diagrams-and-trade-offs` | Drawing System Diagrams That Expose Trade-offs | Data flow, failure boundaries, sync vs async in diagrams |

**Hook angle for post #7:** *"I had Part 1 and the advanced concepts down but still froze when someone said 'design Twitter.' Here's the framework I wish I'd had."*

**Prerequisites:** Module 7 complete (or at least posts 1–3); any Part 1 post.

#### Running example: Payment System

Use the **payment system** as the recurring example across all three framework posts (alongside URL shortener where useful). Same system, three lenses — readers see composition before the full case study.

| Framework post | Payment example snippet |
|----------------|-------------------------|
| **How to Approach** | Clarify: card payments only; scope out crypto/POS. Ask: authorize vs capture? Peak TPS? Out of scope: building a bank. |
| **Back-of-Envelope** | 50M txns/day → ~5 GB/day storage, ~1,400 TPS peak, bandwidth ~1–1.5 Mbps; when math implies async capture + partitioned ledger |
| **Diagrams & Trade-offs** | `flowchart LR`: merchant → payment svc → fraud → PSP → issuer; mark sync (authorize) vs async (capture); failure boundary at PSP timeout |

Full composed case study: `system-design-payment-system` (draft in `content/blog/drafts/`). Publish **after** Module 8; **before** URL shortener.

---

### Module 9 — Read-Heavy Systems (case studies)

Assume Module 7 concepts (hashing, CDN) — link out instead of re-explaining. **Publish after** the payment system case study (first full compose exercise).

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 10 | `system-design-url-shortener` | Design a URL Shortener | base62, read/write ratio, cache-aside, DB schema |
| 11 | `system-design-web-crawler` | Design a Web Crawler | Politeness, dedup, frontier queue, distributed workers |

**Key links:** Module 7 posts 1–2; Part 1 caching, load balancing, databases.

**Optional build while drafting:** URL shortener API or cache-aside wrapper around a slow query.

---

### Module 10 — Write-Heavy & Real-Time (case studies)

**First case study in this module** — write and publish immediately after Module 8. Exercises the widest cross-link surface (idempotency, async, reliability, event-sourcing mental model).

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 10a | `system-design-payment-system` | Design a Payment System | Auth vs settlement, wallet/ledger, reconciliation, PSP boundary, idempotency |
| 12 | `system-design-feed-fan-out-write-vs-read` | Fan-Out on Write vs Fan-Out on Read | Timeline trade-offs, hot users, celebrity problem |
| 13 | `system-design-notification-system` | Design a Notification System | Push vs pull, delivery guarantees, retry storms |
| 14 | `system-design-chat-system` | Design a Chat System | WebSockets, presence, message ordering, partition tolerance |

**Key links for payment:** [Idempotency](/blog/system-design-idempotency-and-delivery-guarantees), [Async](/blog/system-design-asynchronous-processing-and-messaging), [Reliability](/blog/system-design-reliability-and-fault-tolerance), [Event Sourcing](/blog/system-design-event-sourcing-and-cqrs), [Cross-Cutting](/blog/system-design-cross-cutting-concerns-rate-limiting-observability-security).

**Draft:** `content/blog/drafts/system-design-payment-system.mdx` + quiz `content/blog/quizzes/system-design-payment-system-quiz.json`

**Key links (other Module 10 posts):** Module 7 post 3 (idempotency); Part 1 async, CAP, communication patterns.

---

### Module 11 — Data at Scale

Mix of pure case study and concept-heavy posts. Search and stream processing lean concept-first but use a motivating system (search engine, analytics pipeline) as the frame.

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 15 | `system-design-rate-limiter` | Design a Rate Limiter | Token bucket, sliding window, Redis, distributed counters |
| 16 | `system-design-search-at-scale` | Search at Scale: Indexes and Inverted Indexes | Elasticsearch mental model, ranking, sharding search |
| 17 | `system-design-event-logs-and-stream-processing` | Event Logs, CDC, and Stream Processing | Kafka basics, consumer groups, eventual consistency in pipelines |

**Key links:** Module 7 posts 3 and 6; Part 1 cross-cutting concerns, databases, async.

**Recommended hands-on post:** #15 (rate limiter) — build a Redis token bucket and load-test.

---

## Post types — two checklists

### Concept posts (Module 7; also #16–17)

Use for advanced fundamentals and concept-heavy data posts.

- [ ] Personal narrative hook
- [ ] Intended audience + prerequisites (Part 1 + prior Module 7 posts)
- [ ] Table of contents
- [ ] **Problem statement** — what breaks without this concept
- [ ] Core explanation with diagram (ASCII or mermaid)
- [ ] **Trade-offs table** — when to use / when to avoid
- [ ] **Where you see this** — 2–3 real systems (Redis Cluster, CloudFront, etc.)
- [ ] **What breaks when…** — 3 failure or misuse scenarios
- [ ] Links to Part 1 posts (and Module 7 predecessors where relevant)
- [ ] Key Takeaways + quiz (trade-offs, not definitions)

### Case study posts (Modules 9–11; also #15; payment #10a)

Use for full system designs after the framework is established. **Template:** `BLOG_WRITING_PROMPT.md` §5b.

- [ ] Personal narrative hook (domain-specific failure or confusion)
- [ ] Intended audience + prerequisites (linked — do not re-teach)
- [ ] Table of contents
- [ ] **Domain invariant** stated early (e.g. authorization ≠ settlement)
- [ ] Actors / entities table + **system boundary** (in scope vs external)
- [ ] Requirements table (functional + non-functional) + **out of scope**
- [ ] **Assumptions block** + back-of-envelope calculation
- [ ] High-level diagram (`flowchart LR`)
- [ ] API surface with narrative (not naked signature dump)
- [ ] Deep dive on 2–3 hard components (link to Module 7 / Part 1)
- [ ] Reliability section (link to idempotency, async, reliability posts)
- [ ] **Requirements → technique mapping table** (closing)
- [ ] **What breaks when…** — 3 failure scenarios
- [ ] Common mistakes I made
- [ ] Key Takeaways + quiz (trade-offs, not definitions)

---

## Learn-by-writing workflow

### Concept posts (Module 7)

```
Pick concept → What problem does it solve? → Compare alternatives → Diagram → Real-world examples → Draft → Quiz
```

| Step | Time | Output |
|------|------|--------|
| 1. Problem doc | 20 min | When does this come up? What goes wrong without it? |
| 2. Alternatives | 20 min | Naive approach vs this concept — trade-offs |
| 3. Diagram | 20 min | Visual model (ring, edge map, lock timeline, etc.) |
| 4. External compare | 20 min | DDIA chapter, engineering blog, docs |
| 5. Optional prototype | 2–4 hr | Small demo if it helps (e.g. consistent hash ring script) |

### Case study posts (Modules 9–11)

```
Pick system → Requirements doc → Napkin math → Diagram → Research 2 hard parts → Draft → Quiz
```

| Step | Time | Output |
|------|------|--------|
| 1. Design doc (scratch) | 30 min | Functional + non-functional requirements, out-of-scope |
| 2. Napkin math | 20 min | Storage, QPS, bandwidth, server count |
| 3. Diagram | 20 min | clients → LB → services → cache → DB → queue |
| 4. External compare | 20 min | 1–2 public write-ups; note disagreements |
| 5. Optional prototype | 2–4 hr | Smallest slice (#15 rate limiter especially) |

---

## Frontmatter templates

### Concept post (Module 7)

```yaml
---
title: 'Consistent Hashing and Why Resharding Hurts'
slug: system-design-consistent-hashing
excerpt: >-
  One sentence hook — personal problem or surprise (150–160 chars for SEO).
publishedAt: 'YYYY-MM-DD'
tags:
  - system-design
  - consistent-hashing
  - sharding
  - advanced
  - intermediate
author: Sandeep Reddy Alalla
featured: true
course:
  id: system-design
  module: advanced-fundamentals
  order: 1
draft: true
---
```

### Case study post (Modules 9–11)

```yaml
---
title: 'Design a URL Shortener'
slug: system-design-url-shortener
excerpt: >-
  One sentence hook — personal problem or surprise (150–160 chars for SEO).
publishedAt: 'YYYY-MM-DD'
tags:
  - system-design
  - url-shortener
  - case-study
  - applied
  - intermediate
author: Sandeep Reddy Alalla
featured: true
course:
  id: system-design
  module: read-heavy-systems
  order: 1
draft: true
---
```

---

## Content flywheel

| After each publish | Action |
|--------------------|--------|
| **LinkedIn** | One post per article; link to `https://blog.sandeepallala.com/blog/{slug}` |
| **Cross-links** | Chain Module 7 → 8 → case studies; update "Next in series" |
| **Course page** | Module fills in as posts go live |
| **Quizzes** | Trade-off questions; align `quizId` with slug |
| **Thumbnails** | Run `scripts/generate-blog-images.ts` after `draft: false` |
| **Spaced repetition** | Re-read Part 1 posts you linked |

### Publishing checklist

1. Write in `content/blog/drafts/` with `draft: true` (or `content/blog/` pre-publish)
2. Flip `draft: false`, set `publishedAt`, move if needed
3. Generate blog card image
4. `npm run post-linkedin -- {slug}` (or standalone Node script if tsx issue persists)
5. Optional: social drafts under `content/blog/drafts/.social/`

---

## What to avoid (for now)

| Don't | Why |
|-------|-----|
| Start case studies before Module 7 | Readers hit "I need consistent hashing" without understanding it |
| Start the design framework before Module 7 | Framework references advanced concepts readers haven't learned yet |
| Start with "Design YouTube / Netflix / Uber" | Too broad; rehashes without depth |
| Create a separate `course.id` | Keeps the learning path linear |
| Batch-write all 17 posts | Learning happens between posts |
| Re-explain Part 1 or Module 7 inline in case studies | Link out |

---

## Publishing cadence

| Pace | Posts/month | Part 2 complete in (~17 posts) |
|------|-------------|-------------------------------|
| 1 post / 2 weeks | ~2 | ~8 months |
| 1 post / week | ~4 | ~4 months |
| **2 posts / week** | **~8** | **~2 months** |

**Current plan (2026-08-17):** **2 posts per week** — site publish + LinkedIn for each within 48 hours.

---

## Immediate next steps

1. **LinkedIn Phase 1:** ✅ Complete — all 10 Part 1 posts promoted
2. **Publishing Phase 2:** **2 posts/week** — start Module 7 Week 1 (Consistent Hashing + CDN); LinkedIn within 48h each — see `LINKEDIN-PUBLISH-BACKLOG.md`
3. **Content writing:** Finish Module 11 (#16 search, #17 stream processing); Module 10 drafts ready
4. **Keep drafts:** Unpublished posts stay in `content/blog/drafts/` until their publish week

---

## Publishing strategy (2026-08-17)

| Phase | What | Cadence |
|-------|------|---------|
| **1** | LinkedIn for already-published Part 1 posts | 1 post/week ✅ complete |
| **2** | Publish Module 7 → 8 drafts + LinkedIn each | **2 posts/week** |
| **3** | Write/publish Modules 9–11, then Part 3 famous systems | **2 posts/week** |

**Tracker:** `LINKEDIN-PUBLISH-BACKLOG.md`

---

## Research sources (while writing)

- *Designing Data-Intensive Applications* (Kleppmann) — match chapter to concept
- ByteByteGo / Hello Interview — scope and diagram reference
- Engineering blogs (Dropbox, Discord, LinkedIn, etc.)
- Part 1 Code Chronicles posts — canonical prerequisite links

---

## Progress tracker

### Module 7 — advanced-fundamentals (drafts — not published)

- [ ] Post 1: Consistent Hashing and Why Resharding Hurts *(draft)*
- [ ] Post 2: CDN and Edge Caching in Practice *(draft)*
- [ ] Post 3: Idempotency and Delivery Guarantees *(draft)*
- [ ] Post 4: Leader Election and Distributed Locks *(draft)*
- [ ] Post 5: Multi-Region and Active-Active *(draft)*
- [ ] Post 6: Event Sourcing and CQRS *(draft)*

### Module 8 — design-framework (drafts — not published)

- [x] Post 7: How to Approach Any System Design Problem *(draft)*
- [x] Post 8: Back-of-the-Envelope Math That Actually Matters *(draft)*
- [x] Post 9: Drawing System Diagrams That Expose Trade-offs *(draft)*

### Module 9 — read-heavy-systems

- [x] Post 10: Design a URL Shortener *(draft)*
- [x] Post 11: Design a Web Crawler *(draft)*

### Module 10 — write-realtime

- [x] Post 10a: Design a Payment System *(draft + quiz)*
- [x] Post 12: Fan-Out on Write vs Fan-Out on Read *(draft)*
- [x] Post 13: Design a Notification System *(draft)*
- [x] Post 14: Design a Chat System *(draft)*

### Module 11 — data-at-scale

- [x] Post 15: Design a Rate Limiter *(draft)*
- [ ] Post 16: Search at Scale: Indexes and Inverted Indexes
- [ ] Post 17: Event Logs, CDC, and Stream Processing

---

## Part 3 — Famous systems (planned)

After Modules 9–11 interview classics, Part 3 deconstructs **real famous systems** (Twitter timeline, Netflix delivery, Uber matching, etc.) — one hard problem per post, with production engineering sources.

**Full backlog:** `FAMOUS-SYSTEMS-CASE-STUDIES-PLAN.md` (22 posts, Modules 12–17).

---

*Last updated: 2026-07-11*
