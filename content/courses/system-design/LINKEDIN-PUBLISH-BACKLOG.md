# System Design — LinkedIn Publish Backlog

**Strategy:** Phase 1 complete — promoted all 10 published Part 1 posts on LinkedIn (1/week). **From Phase 2 onward:** publish **2 posts per week** on the site (Module order) and post each to LinkedIn within 48 hours of publish.

**Canonical URL pattern:** `https://blog.sandeepallala.com/blog/{slug}`

**Post script:** `npm run post-linkedin -- {slug}` (or `--dry-run` first)

**Phase 2 cadence:** **2 publishes + 2 LinkedIn posts per week** (typically Tue + Thu, or Mon + Thu — pick a fixed pair and stick to it).

**Deploy rule:** `publish-post` only updates **local** files. Netlify serves from **GitHub** — commit + push before LinkedIn, or the article URL will 404 when followers click.

---

## Phase 1 — Part 1 backlog (published on site, LinkedIn pending)

Post in **course order** — builds the series narrative for followers.

| # | Slug | Title | Social draft | LinkedIn posted |
|---|------|-------|--------------|-----------------|
| 1 | `system-design-scalability-scaling-up-vs-out` | Scalability: Scaling Up vs Scaling Out | ✅ `.social/...-linkedin.json` | ☑ |
| 2 | `system-design-load-balancing-explained` | Load Balancing Explained | ✅ | ☑ |
| 3 | `system-design-caching-strategies-and-pitfalls` | Caching Strategies and Pitfalls | ✅ | ☑ |
| 4 | `system-design-databases-sql-vs-nosql-replication-sharding` | Databases at Scale | ✅ | ☑ |
| 5 | `system-design-cap-theorem-consistency-availability` | CAP Theorem | ✅ | ☑ |
| 6 | `system-design-reliability-and-fault-tolerance` | Reliability and Fault Tolerance | ✅ | ☑ |
| 7 | `system-design-asynchronous-processing-and-messaging` | Async Processing and Messaging | ✅ | ☑ |
| 8 | `system-design-communication-patterns-rest-grpc-events` | Communication Patterns | ✅ | ☑ |
| 9 | `system-design-performance-metrics-latency-throughput` | Performance Metrics | ✅ `.social/...-linkedin.json` | ☑ |
| 10 | `system-design-cross-cutting-concerns-rate-limiting-observability-security` | Cross-Cutting Concerns | ✅ | ☑ |

**Cadence (Phase 1 — complete):** 1 LinkedIn post per week.

**After each LinkedIn post:**
- [ ] Mark "LinkedIn posted" above
- [ ] Optional: delete or archive `.social/{slug}-linkedin.json` after successful post
- [ ] Engage with comments same day

---

## Phase 2 — New publishes + LinkedIn (2 per week)

Publish drafts in **Module order** — **2 posts per week** on the site; LinkedIn for each within 48 hours of publish.

### Suggested schedule — Module 7 (6 posts = 3 weeks)

| Week | Publish (site) | LinkedIn same week |
|------|----------------|-------------------|
| 1 | Consistent Hashing, CDN and Edge Caching | Both |
| 2 | Idempotency, Leader Election and Distributed Locks | Both |
| 3 | Multi-Region, Event Sourcing and CQRS | Both |

### Module 7 — advanced-fundamentals (all drafts today)

| Order | Slug | LinkedIn draft | Published | LinkedIn posted |
|-------|------|----------------|-----------|-----------------|
| 1 | `system-design-consistent-hashing` | ✅ | ☑ | ☑ |
| 2 | `system-design-cdn-and-edge-caching` | ✅ | ☑ | ☐ |
| 3 | `system-design-idempotency-and-delivery-guarantees` | ✅ | ☐ | ☐ |
| 4 | `system-design-leader-election-and-distributed-locks` | ✅ | ☐ | ☐ |
| 5 | `system-design-multi-region-and-active-active` | ✅ | ☐ | ☐ |
| 6 | `system-design-event-sourcing-and-cqrs` | ✅ | ☐ | ☐ |

### Module 8 — design-framework (drafts ready; 2 weeks at 2/week)

| Week | Publish (site) | LinkedIn same week |
|------|----------------|-------------------|
| 4 | How to Approach Any Problem, Back-of-Envelope Math | Both (+ write LinkedIn drafts at publish) |
| 5 | Diagrams and Trade-offs | One (+ LinkedIn draft at publish) |

### Module 8 — design-framework (drafts ready)

| Order | Slug | LinkedIn draft | Published | LinkedIn posted |
|-------|------|----------------|-----------|-----------------|
| 1 | `system-design-how-to-approach-any-problem` | ☐ create at publish | ☐ | ☐ |
| 2 | `system-design-back-of-envelope-math` | ☐ | ☐ | ☐ |
| 3 | `system-design-diagrams-and-trade-offs` | ☐ | ☐ | ☐ |

**Publish checklist (each new post):**

1. `npm run publish-post -- {slug}` (or flip `draft: false` + move `drafts/` → `content/blog/`)
2. `npm run generate-blog-images` for card thumbnail
3. Write `.social/{slug}-linkedin.json` if missing
4. **Git commit + push to `main`** (triggers Netlify deploy)
5. **Verify live URL** loads: `https://blog.sandeepallala.com/blog/{slug}` (wait ~2–5 min after push)
6. `--dry-run` then `post-linkedin` (do **not** rely on `publish-post` auto-LinkedIn until the URL is live)
7. Update tables above

> **Lesson (Consistent Hashing):** LinkedIn went out before push → 404 for readers. Always steps 4–5 before step 6.

---

## Phase 3 — Modules 9–11 + Part 3

Follow `APPLIED-SYSTEM-DESIGN-PLAN.md` and `FAMOUS-SYSTEMS-CASE-STUDIES-PLAN.md`. Same rule: **2 publishes + LinkedIn per week** (each post within 48h of publish).

---

## Writing status (content vs promotion)

| Content | Status |
|---------|--------|
| Part 1 (10 posts) | Published on site |
| Module 7 (6 posts) | Drafts in `content/blog/drafts/` |
| Module 8 (3 posts) | Drafts in `content/blog/drafts/` |
| Module 10 (4 posts) | Drafts in `content/blog/drafts/` (incl. payment system) |
| Modules 9–11 | Module 9–10 drafted; Module 11 not written |
| Part 3 famous systems | Planned only |

**Current focus:** Phase 2 — **2 posts/week** starting Module 7 (Week 1: Consistent Hashing + CDN).

---

*Last updated: 2026-08-17 — Phase 1 complete. Phase 2 cadence: 2 posts/week (publish + LinkedIn each).*
