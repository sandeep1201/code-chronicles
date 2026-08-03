# System Design — LinkedIn Publish Backlog

**Strategy:** Promote **already-published Part 1 posts** on LinkedIn first (one per week). Only after that backlog is cleared, publish new posts (Module 7 → 8 → …) and post to LinkedIn **the same week** each goes live.

**Canonical URL pattern:** `https://blog.sandeepallala.com/blog/{slug}`

**Post script:** `npm run post-linkedin -- {slug}` (or `--dry-run` first)

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
| 8 | `system-design-communication-patterns-rest-grpc-events` | Communication Patterns | ✅ | ☐ |
| 9 | `system-design-performance-metrics-latency-throughput` | Performance Metrics | ✅ `.social/...-linkedin.json` | ☑ |
| 10 | `system-design-cross-cutting-concerns-rate-limiting-observability-security` | Cross-Cutting Concerns | ✅ | ☐ |

**Cadence:** 1 LinkedIn post per week until row 10 is checked.

**After each LinkedIn post:**
- [ ] Mark "LinkedIn posted" above
- [ ] Optional: delete or archive `.social/{slug}-linkedin.json` after successful post
- [ ] Engage with comments same day

---

## Phase 2 — New publishes + LinkedIn (same week)

When Phase 1 is complete, publish drafts in **Module order** and post to LinkedIn within 48 hours of each publish.

### Module 7 — advanced-fundamentals (all drafts today)

| Order | Slug | LinkedIn draft | Published | LinkedIn posted |
|-------|------|----------------|-----------|-----------------|
| 1 | `system-design-consistent-hashing` | ✅ | ☐ | ☐ |
| 2 | `system-design-cdn-and-edge-caching` | ✅ | ☐ | ☐ |
| 3 | `system-design-idempotency-and-delivery-guarantees` | ✅ | ☐ | ☐ |
| 4 | `system-design-leader-election-and-distributed-locks` | ✅ | ☐ | ☐ |
| 5 | `system-design-multi-region-and-active-active` | ✅ | ☐ | ☐ |
| 6 | `system-design-event-sourcing-and-cqrs` | ✅ | ☐ | ☐ |

### Module 8 — design-framework (drafts ready)

| Order | Slug | LinkedIn draft | Published | LinkedIn posted |
|-------|------|----------------|-----------|-----------------|
| 1 | `system-design-how-to-approach-any-problem` | ☐ create at publish | ☐ | ☐ |
| 2 | `system-design-back-of-envelope-math` | ☐ | ☐ | ☐ |
| 3 | `system-design-diagrams-and-trade-offs` | ☐ | ☐ | ☐ |

**Publish checklist (each new post):**
1. `draft: false`, move `drafts/` → `content/blog/` if needed
2. `scripts/generate-blog-images.ts` for card thumbnail
3. Write `.social/{slug}-linkedin.json`
4. `--dry-run` then `post-linkedin`
5. Update tables above

---

## Phase 3 — Modules 9–11 + Part 3

Follow `APPLIED-SYSTEM-DESIGN-PLAN.md` and `FAMOUS-SYSTEMS-CASE-STUDIES-PLAN.md`. Same rule: **publish + LinkedIn same week**.

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

**Current focus:** Phase 1 LinkedIn backlog → then Module 7 publish cadence.

---

*Last updated: 2026-08-03 — LinkedIn posted: scalability (#1), load balancing (#2), caching (#3), databases (#4), CAP theorem (#5), performance metrics (#9), reliability (#6), async/messaging (#7)*
