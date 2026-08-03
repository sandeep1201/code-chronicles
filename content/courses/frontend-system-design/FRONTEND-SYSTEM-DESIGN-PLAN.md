# Frontend System Design — Content Plan

**Course**: `frontend-system-design` (Code Chronicles)  
**Source**: [21 Frontend System Design Concepts](https://newsletter.systemdesign.one/p/frontend-system-design) (System Design One #99) — clipped in `MySecondBrain/Clippings/21 Frontend System Design Concepts for Software Engineers.md`  
**Goal**: One **detailed** blog post per concept (21 posts), Code Chronicles voice — personal hook, trade-offs, diagrams, quizzes — not glossary summaries.  
**Audience**: Frontend engineers and backend engineers moving into full-stack / FE system design interviews.  
**Prerequisites course**: JavaScript fundamentals + helpful overlap from `system-design` (caching, CDN, performance, real-time).

**Related roadmaps** (do not duplicate):
- `FRONTEND_FUNDAMENTALS_BLOG_ROADMAP.md` — Yangshun / HTML-CSS-JS basics (separate track)
- `content/courses/system-design/` — backend & distributed systems (link out, don't re-teach)

---

## Why a separate course

The newsletter lists **frontend architecture** topics (rendering, client perf, micro-frontends, browser security). That is not the same as JS syntax fundamentals or backend CAP/sharding. A dedicated `course.id` keeps the learning path clear and avoids mixing Module 7 CDN with “what is SSG.”

---

## Course arc

```
Rendering & delivery (6)  →  Performance (3)  →  Data & state (5)
        →  Architecture (3)  →  UX & reliability (4)
```

**Cadence**: 1 post every 1–2 weeks (same sustainable rhythm as system-design Part 2).  
**Post type**: Concept posts — problem statement, trade-offs table, 2–4 Mermaid diagrams, “what breaks when,” Key Takeaways, quiz.

---

## Overlap with existing posts

| # | Topic | Existing coverage | Plan |
|---|--------|-------------------|------|
| 6 | CDNs & edge | Backend [CDN post](/blog/system-design-cdn-and-edge-caching) (draft) | **New FE angle**: asset delivery, `Cache-Control`, Next.js static, link to backend |
| 7 | Web perf metrics | Backend [Performance Metrics](/blog/system-design-performance-metrics-latency-throughput) | **New FE angle**: LCP, INP, CLS, RUM vs lab |
| 10 | State management | `lifting-state-vs-context-vs-global-state`, LLD drafts | **New**: local/global/server cache (React Query mental model) |
| 14 | Real-time | Backend chat/notifications drafts | **New FE angle**: WebSocket client, SSE, polling in the browser |
| 16 | Components & design systems | `compound-components-pattern`, `component-api-design-*` | **New**: design tokens, Storybook, org scale |
| 18 | a11y & mobile-first | `semantic-html-*` | **Extend**: mobile-first + a11y as system requirements |
| 20 | Security | Backend cross-cutting (brief) | **New FE depth**: XSS, CSRF, CSP in apps |
| 21 | Observability | Backend cross-cutting (brief) | **New FE depth**: Sentry, RUM, error boundaries |

All other topics are **net-new** dedicated posts.

---

## Module structure (`meta.json`)

| Order | Module ID | Name | Posts |
|-------|-----------|------|-------|
| 1 | `rendering-delivery` | Rendering & Delivery | #1–6 |
| 2 | `performance` | Performance & Loading | #7–9 |
| 3 | `data-state` | Data & State | #10–14 |
| 4 | `architecture` | Architecture & Scale | #15–17 |
| 5 | `ux-reliability` | UX & Reliability | #18–21 |

---

## Post backlog (writing order)

### Module 1 — rendering-delivery

| # | Slug | Title | What the post must cover |
|---|------|-------|---------------------------|
| 1 | `frontend-ssg-when-and-why` | Static Site Generation: When Pre-Building Pays Off | Build-time data fetch, CDN deploy, freshness trade-off, vs SSR/CSR |
| 2 | `frontend-isr-stale-content-without-full-rebuilds` | ISR: Fresh Enough Without Redeploying Everything | Revalidation, stale-while-revalidate at page level, Next.js mental model |
| 3 | `frontend-ssr-server-side-rendering-in-practice` | SSR: Rendering on the Server | TTFB vs TTI, hydration, SEO, when server cost is worth it |
| 4 | `frontend-csr-and-spas` | CSR and SPAs: Building in the Browser | Bundle size, SEO limits, when CSR still wins (dashboards) |
| 5 | `frontend-hybrid-rendering` | Hybrid Rendering: Mixing SSG, SSR, and CSR | Route-level choices, Next.js App Router patterns, per-page trade-offs |
| 6 | `frontend-cdn-and-edge-delivery` | CDNs and Edge Delivery for Frontend Apps | Static assets, edge middleware, link to backend CDN post |

### Module 2 — performance

| # | Slug | Title | What the post must cover |
|---|------|-------|---------------------------|
| 7 | `frontend-core-web-vitals-and-rum` | Core Web Vitals and Real User Monitoring | LCP, INP, CLS; lab vs field; budgets |
| 8 | `frontend-lazy-loading-and-code-splitting` | Lazy Loading and Code Splitting | Dynamic import, route split, images, intersection observer |
| 9 | `frontend-service-workers-and-browser-caching` | Service Workers and Browser Caching | Cache API, offline shells, vs HTTP cache |

### Module 3 — data-state

| # | Slug | Title | What the post must cover |
|---|------|-------|---------------------------|
| 10 | `frontend-state-local-global-and-server-cache` | State: Local, Global, and Server Cache | useState vs context vs Zustand vs TanStack Query; ownership |
| 11 | `frontend-api-caching-and-stale-while-revalidate` | API Caching with Expiration | SWR/React Query, HTTP cache headers, invalidation |
| 12 | `frontend-graphql-vs-rest-for-ui-data` | GraphQL vs REST for UI Data | Over/under-fetching, BFF, when each fits |
| 13 | `frontend-pagination-cursor-vs-offset` | Pagination: Cursor vs Offset | Infinite scroll, stable cursors, API design |
| 14 | `frontend-realtime-websockets-sse-and-polling` | Real-Time on the Client: WebSockets, SSE, and Polling | Connection lifecycle, reconnect, link to backend chat post |

### Module 4 — architecture

| # | Slug | Title | What the post must cover |
|---|------|-------|---------------------------|
| 15 | `frontend-micro-frontends` | Micro Frontends | Module federation, team boundaries, integration trade-offs |
| 16 | `frontend-design-systems-and-component-architecture` | Design Systems and Component Architecture | Tokens, primitives, composition; link compound-components post |
| 17 | `frontend-ci-cd-and-deployment-pipelines` | CI/CD and Deployment for Frontend | Preview deploys, Netlify/Vercel, cache busting, env promotion |

### Module 5 — ux-reliability

| # | Slug | Title | What the post must cover |
|---|------|-------|---------------------------|
| 18 | `frontend-accessibility-and-mobile-first` | Accessibility and Mobile-First as Architecture | a11y requirements upfront, responsive constraints, link semantic HTML post |
| 19 | `frontend-pwas-and-offline-first` | PWAs and Offline-First | Manifest, service worker recap, installability |
| 20 | `frontend-security-xss-csrf-csp` | Frontend Security: XSS, CSRF, and CSP | Sanitization, cookies, tokens, headers |
| 21 | `frontend-observability-and-error-monitoring` | Client-Side Observability and Error Monitoring | Error boundaries, Sentry, session replay, FE dashboards |

---

## Frontmatter template

```yaml
---
title: 'Static Site Generation: When Pre-Building Pays Off'
slug: frontend-ssg-when-and-why
excerpt: >-
  One sentence hook (150–160 chars).
publishedAt: 'YYYY-MM-DD'
tags:
  - frontend
  - system-design
  - ssg
  - rendering
  - intermediate
author: Sandeep Reddy Alalla
featured: true
course:
  id: frontend-system-design
  module: rendering-delivery
  order: 1
draft: true
---
```

Quiz: `content/blog/quizzes/{slug}-quiz.json` — 8 questions, trade-offs not definitions.

---

## Publishing & social

- Drafts in `content/blog/drafts/` until publish week
- Humanized LinkedIn: `content/blog/drafts/.social/{slug}-linkedin.json`
- Cross-link **backend** system-design posts where topics overlap (CDN, metrics, real-time)
- Cross-link **JS/component** posts where overlap (state, components, semantic HTML)
- Do not hand-write TOC in MDX (site auto-generates sidebar)

---

## Progress tracker

### Module 1 — rendering-delivery

- [ ] Post 1: SSG
- [ ] Post 2: ISR
- [ ] Post 3: SSR
- [ ] Post 4: CSR
- [ ] Post 5: Hybrid rendering
- [ ] Post 6: CDN & edge (frontend)

### Module 2 — performance

- [ ] Post 7: Core Web Vitals & RUM
- [ ] Post 8: Lazy loading & code splitting
- [ ] Post 9: Service workers & browser caching

### Module 3 — data-state

- [ ] Post 10: State (local, global, server cache)
- [ ] Post 11: API caching
- [ ] Post 12: GraphQL vs REST
- [ ] Post 13: Pagination strategies
- [ ] Post 14: Real-time on the client

### Module 4 — architecture

- [ ] Post 15: Micro frontends
- [ ] Post 16: Design systems & components
- [ ] Post 17: Frontend CI/CD

### Module 5 — ux-reliability

- [ ] Post 18: a11y & mobile-first
- [ ] Post 19: PWAs & offline-first
- [ ] Post 20: Frontend security
- [ ] Post 21: Client observability

---

## Immediate next steps

**Status: deferred** — finish backend `system-design` (Modules 7–11 publish + LinkedIn, then Part 3) before starting this course. See `content/courses/system-design/APPLIED-SYSTEM-DESIGN-PLAN.md`.

1. Add `content/courses/frontend-system-design/meta.json` when post #1 draft starts *(meta.json scaffold exists)*
2. **Write post #1** (`frontend-ssg-when-and-why`) via `blog-writer` skill — **after backend Part 2 backlog**
3. Optional: ingest plan summary to `MySecondBrain/wiki/learning/frontend-system-design.md`

---

## Interview framing (optional callout in posts)

Many FE system design interviews use **RADIO** (Requirements, Architecture, Data, Interface, Optimizations). Reference lightly in Module 1 post #5 or a future “how to approach FE system design” capstone — not required for all 21 posts.

---

*Last updated: 2026-07-23*
