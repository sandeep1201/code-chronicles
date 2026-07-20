# Trading for Beginners — Content & Learning Plan

**Course**: `trading-basics` (Code Chronicles — not created yet)  
**Goal**: Teach stocks and trading from zero to a repeatable first workflow — without hype, stock picks, or options complexity on day one.  
**Status**: **Deferred** — finish **System Design Part 2** first (see `content/courses/system-design/APPLIED-SYSTEM-DESIGN-PLAN.md`).  
**Cadence (when active)**: 1 post every 1–2 weeks (same sustainable rhythm as system design)

---

## Priority note

| Active now | Resume trading series when |
|------------|----------------------------|
| System Design Part 2 — Module 7 (`advanced-fundamentals`) through Module 11 | Part 2 backlog is done **or** Module 7–8 are published and you want a palate cleanser |

**Current system design snapshot (2026-06-28):**

- Part 1: 10 posts published
- Part 2 Module 7: CDN published; consistent hashing, idempotency, leader election, multi-region, event sourcing in drafts
- Next up per applied plan: finish Module 7, then design framework (Module 8), then case studies

Do **not** start the trading course until you explicitly switch back. This document is the backlog.

---

## Why this series

Code Chronicles already has practitioner context:

| Asset | Location | Role in the series |
|-------|----------|-------------------|
| IBS Strategy Scanner | `/trading` (`app/trading/page.tsx`) | **Capstone optional** — only after readers know orders, risk, and watchlists |
| Earnings Drift Playbook | `Repos/earnings-drift-playbook.md` | **Advanced optional module** — post-earnings drift, not beginner day one |
| Robinhood Trading MCP | Agentic cash account workflow | **Responsible automation post** — review → confirm → place; never advice |

The series fills a gap: **technical readers who want markets explained like system design** — vocabulary, trade-offs, failure modes — not “10 stocks to buy now.”

---

## Reader outcome

| Part | Focus | Reader outcome |
|------|-------|----------------|
| **Part 1** — Foundations | What stocks are, how markets work, indexes/ETFs | Can explain ownership, price, and why diversification matters |
| **Part 2** — Mechanics | Accounts, orders, quotes, costs | Can place a limit order and understand settlement |
| **Part 3** — Decisions & risk | Analysis basics, sizing, psychology | Knows investing vs trading, can size a trade and define max loss |
| **Part 4** — First workflow | Checklists, paper trading, watchlists, earnings intro | Has a repeatable process; optional bridge to `/trading` tools |

**Disclaimer on every post** (footer or callout):

> Educational content only. Not investment advice. Past patterns do not guarantee future results. Trade only with money you can afford to lose.

---

## Course structure

Create `content/courses/trading-basics/meta.json` when the first post ships (not before).

### Modules

| Order | Module ID | Name | Posts | Description |
|-------|-----------|------|-------|-------------|
| 1 | `foundations` | Market Foundations | 4 | Stocks, exchanges, vocabulary, indexes & ETFs |
| 2 | `mechanics` | Accounts & Mechanics | 4 | Brokerage, order types, quotes/charts, fees & taxes |
| 3 | `decisions-and-risk` | Decisions & Risk | 5 | Mindset, fundamentals, technicals, risk, psychology |
| 4 | `first-workflow` | Your First Workflow | 4–5 | Checklist, paper → live, watchlist, earnings, optional scanner |
| 5 | `advanced-optional` | Going Deeper (optional) | 3 | Short/options awareness, earnings reports, systematic scans |

**Total core posts:** 17  
**Total with optional module:** 20

### Series arc (writing order)

```
Part 1: Foundations          ← vocabulary & “buy an ETF first”
    ↓
Part 2: Mechanics            ← orders & settlement (prevents costly mistakes)
    ↓
Part 3: Decisions & Risk     ← edge, sizing, emotions
    ↓
Part 4: First Workflow       ← repeatable process
    ↓
Part 5: Advanced (optional)  ← PEAD, IBS scanner, agent-assisted trading
```

---

## Part 1 — Market Foundations

Concept-first posts. No broker screenshots required yet. Use simple diagrams (exchange flow, ownership) where helpful.

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 1 | `trading-what-is-a-stock` | What Is a Stock (and Why Companies Sell Them)? | Equity vs debt; IPO vs secondary market; dividends; why price moves |
| 2 | `trading-how-stock-markets-work` | How Stock Markets Work: Exchanges, Hours, and the Tape | NYSE/NASDAQ; regular/extended hours; bid/ask; market vs limit at a high level |
| 3 | `trading-vocabulary-every-beginner-needs` | Stock Market Vocabulary Every Beginner Needs | Ticker, share, split, market cap, sector, index, float, liquidity |
| 4 | `trading-indexes-and-etfs-start-here` | Indexes and ETFs: Where Most Beginners Should Start | S&P 500, QQQ; VOO/SPY/IVV; diversification; expense ratios |

**Hook angle for post #1:** *"I thought buying one share meant I owned the whole company — and I didn't understand why the price on Google wasn't what I'd pay."*

**Prerequisites:** None.

**Diagram ideas:** Simple `flowchart LR` — Company → IPO → Exchange → Buyer; or ownership pie chart (conceptual, not stock pick).

---

## Part 2 — Accounts & Mechanics

Practical posts. Screenshots from a paper account or redacted broker UI are fine. Emphasize **cash accounts** first; margin comes with warnings.

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 5 | `trading-brokerage-accounts-101` | Brokerage Accounts 101: Cash, Settlement, and Rules | Cash vs margin; T+1 settlement; PDT rule (plain English); long-only first |
| 6 | `trading-order-types-explained` | Order Types Explained: Market, Limit, Stop, and Stop-Limit | When each helps; slippage; gap risk; bracket orders at intro level |
| 7 | `trading-reading-a-quote-and-chart` | Reading a Quote and a Basic Chart | Last, bid, ask, spread, volume; OHLC; timeframes; what charts can't tell you |
| 8 | `trading-fees-taxes-and-hidden-costs` | Fees, Taxes, and the Hidden Costs of Trading | $0 commissions vs spread; wash sales; short-term vs long-term gains |

**Hook angle for post #6:** *"My first market order filled above the price I saw on the screen — here's what I missed about bid/ask and order types."*

**Prerequisites:** Part 1 complete (especially #2 and #4).

**Hands-on while drafting:** Place a **paper** limit order on a liquid ETF (VOO/SPY); screenshot for the post.

---

## Part 3 — Decisions & Risk

Bridge from “I know how to click buy” to “I know why I'm clicking buy.” Keep analysis **shallow but honest** — enough to read headlines, not to pretend alpha.

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 9 | `trading-investing-vs-trading-vs-gambling` | Investing vs Trading vs Gambling: Set the Right Expectations | Time horizon; edge; variance; why most day traders underperform |
| 10 | `trading-fundamental-analysis-for-beginners` | Fundamental Analysis for Beginners | Earnings, revenue, P/E, guidance; reading one earnings headline |
| 11 | `trading-technical-analysis-for-beginners` | Technical Analysis for Beginners | Support/resistance, trend, volume; avoid indicator soup |
| 12 | `trading-risk-management-the-one-skill-that-matters` | Risk Management: The One Skill That Matters Most | Position sizing; stop losses; max loss per trade/day; ruin math |
| 13 | `trading-psychology-fomo-and-revenge-trades` | Trading Psychology: FOMO, Revenge Trades, and Journaling | Biases; pre/post trade journal; circuit breakers |

**Hook angle for post #12:** *"I had a great thesis and still lost money — because I sized the trade like a bet, not a plan."*

**Prerequisites:** Part 2 (#6 order types, #7 quotes). Link forward to post #14 checklist.

**Diagram ideas:** Position size table; risk/reward sketch; “what breaks when you skip the stop” flowchart.

---

## Part 4 — Your First Workflow

Process posts. Tie back to Code Chronicles voice: **learning in public**, mistakes included.

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 14 | `trading-pre-trade-checklist` | A Pre-Trade Checklist That Actually Helps | Thesis, entry, exit, size, invalidation; one-page template |
| 15 | `trading-paper-trading-to-first-live-trade` | From Paper Trading to Your First Small Live Trade | Sim vs real emotions; one share / tiny ETF size; what to log |
| 16 | `trading-building-a-watchlist-and-routine` | Building a Watchlist and a Simple Routine | Daily vs weekly habits; news vs noise; screener basics |
| 17 | `trading-when-earnings-matter` | When Earnings Matter (and When to Stay Away) | Report timing; gaps; implied move; why beginners shouldn't hold through reports |

**Hook angle for post #14:** *"I skipped my checklist once. That single trade taught me why professionals write things down before they click."*

**Prerequisites:** Part 3 (#12 risk, #13 psychology).

**Optional capstone (same module, order 5):**

| # | Proposed slug | Title | Notes |
|---|---------------|-------|-------|
| 18 | `trading-intro-to-systematic-scans` | Intro to Systematic Scans (Without Overfitting) | Bridge to `/trading` IBS scanner; rules vs discretion; on-demand scans |

---

## Part 5 — Going Deeper (optional, write last)

Only after Part 4. Links to existing playbooks; still **not** stock picks.

| # | Proposed slug | Title | What you learn while writing |
|---|---------------|-------|------------------------------|
| 19 | `trading-short-selling-and-options-awareness` | Short Selling and Options: What They Are and Why to Wait | Mechanics; unlimited loss; why cash beginners stay long-only |
| 20 | `trading-reading-an-earnings-report` | Reading an Earnings Report in 10 Minutes | EPS, revenue, guidance, call; natural lead-in to PEAD concepts |
| 21 | `trading-agent-assisted-orders-responsibly` | Agent-Assisted Trading: Review, Confirm, Place | MCP workflow; human in the loop; educational experiment framing |

**PEAD deep dive:** Keep as a **separate** post or series later (`trading-post-earnings-drift-playbook`) — reference `earnings-drift-playbook.md`, don't paste the whole spec into a beginner post.

---

## Post types — two checklists

### Concept posts (Part 1; parts of 3)

- [ ] Personal narrative hook
- [ ] Intended audience + prerequisites
- [ ] Table of contents
- [ ] **Problem statement** — what confusion or mistake this fixes
- [ ] Core explanation (plain language; define terms once)
- [ ] **Trade-offs table** — e.g. ETF vs single stock, market vs limit
- [ ] **What breaks when…** — 2–3 misuse scenarios
- [ ] Disclaimer callout
- [ ] Key Takeaways + quiz (scenarios, not trivia)
- [ ] No ticker recommendations

### Practical posts (Part 2, 4)

- [ ] Personal narrative hook
- [ ] Intended audience + prerequisites
- [ ] Table of contents
- [ ] Step-by-step workflow (numbered)
- [ ] Example with **liquid ETF or generic ticker** (AAPL/SPY as illustration only — not “buy this”)
- [ ] Checklist or template readers can copy
- [ ] **What breaks when…** — settlement, wrong order type, no stop
- [ ] Disclaimer callout
- [ ] Key Takeaways + quiz

---

## Learn-by-writing workflow

### Concept posts

```
Pick topic → What did I get wrong first? → Plain-language model → Trade-offs → Failure modes → Draft → Quiz
```

| Step | Time | Output |
|------|------|--------|
| 1. Mistake doc | 15 min | Personal story + reader misconception |
| 2. Model | 20 min | One diagram or analogy (ownership, exchange, risk) |
| 3. Compare | 20 min | Investopedia / SEC investor.gov — verify definitions |
| 4. Failure modes | 15 min | “What breaks when…” bullets |
| 5. Quiz | 30 min | Scenario questions (order filled where? max loss?) |

### Practical posts

```
Pick workflow → Paper-trade it → Screenshot/redact → Checklist → Draft → Quiz
```

| Step | Time | Output |
|------|------|--------|
| 1. Run the flow | 30 min | Paper account or dry-run |
| 2. Checklist | 20 min | Copy-paste template for readers |
| 3. Draft | 2–3 hr | Steps + one worked example |
| 4. Quiz | 30 min | “Which order type?” “What happens T+1?” |

---

## Frontmatter templates

### Concept post

```yaml
---
title: 'What Is a Stock (and Why Companies Sell Them)?'
slug: trading-what-is-a-stock
excerpt: >-
  I thought one share meant owning the whole company. Here's how equity, price, and the market actually work.
publishedAt: 'YYYY-MM-DD'
tags:
  - trading
  - stocks
  - fundamentals
  - beginner
author: Sandeep Reddy Alalla
featured: true
course:
  id: trading-basics
  module: foundations
  order: 1
draft: true
---
```

### Practical post

```yaml
---
title: 'Order Types Explained: Market, Limit, Stop, and Stop-Limit'
slug: trading-order-types-explained
excerpt: >-
  My first market order filled above the quote I saw. Order types, bid/ask, and when each one helps or hurts.
publishedAt: 'YYYY-MM-DD'
tags:
  - trading
  - order-types
  - mechanics
  - beginner
author: Sandeep Reddy Alalla
featured: true
course:
  id: trading-basics
  module: mechanics
  order: 2
draft: true
---
```

---

## Content flywheel

| After each publish | Action |
|--------------------|--------|
| **LinkedIn** | One post per article; link to `https://blog.sandeepallala.com/blog/{slug}` |
| **Cross-links** | Chain modules 1 → 4; “Next in series” at bottom |
| **Course page** | Add `trading-basics` to `meta.json` when post #1 ships |
| **Quizzes** | Scenario-based; align `quizId` with slug |
| **Thumbnails** | `scripts/generate-blog-images.ts` after `draft: false` |
| **Site nav** | Optional: link course from `/trading` page once Part 2 (#6) is live |

### Publishing checklist

1. Write in `content/blog/drafts/` with `draft: true`
2. Humanizer pass per `AGENTS.md` / blog skills
3. Flip `draft: false`, set `publishedAt`, move to `content/blog/`
4. Generate blog card image
5. Social: `content/blog/drafts/.social/` JSON; LinkedIn preferred over X
6. `--dry-run` before any public auto-post script

---

## What to avoid (for now)

| Don't | Why |
|-------|-----|
| Start with day trading or stock picks | Wrong expectations; regulatory/reputation risk |
| Teach options/strategies before Part 4 | Blow-ups before vocabulary |
| Present `/trading` IBS scanner in post #1–5 | Tool before mechanics |
| Copy PEAD playbook into beginner posts | Too advanced; long-only drift is a specialty topic |
| Imply MCP/agent trades without confirmation | Violates your Robinhood workflow rules |
| Create `course.id` before first publish | Same pattern as system design — ship one post first |
| Batch-write all 17 posts | Personal hooks need real reflection between posts |

---

## Publishing cadence (when active)

| Pace | Posts/month | Core series (17 posts) complete in |
|------|-------------|-------------------------------------|
| 1 post / 2 weeks | ~2 | ~8 months |
| 1 post / week | ~4 | ~4 months |

**Recommended:** 1 post every 1–2 weeks — interleave only if system design is paused.

---

## Suggested first five (when you return)

Fast path to “responsible beginner” without skipping foundations:

1. `trading-what-is-a-stock`
2. `trading-indexes-and-etfs-start-here`
3. `trading-order-types-explained`
4. `trading-investing-vs-trading-vs-gambling`
5. `trading-risk-management-the-one-skill-that-matters`

Then backfill Part 1 #2–3 and Part 2 #5, #7–8.

---

## Research sources (while writing)

- [SEC Investor.gov](https://www.investor.gov) — definitions, order types, risk disclosures
- Broker help centers (Robinhood, Fidelity) — verify order type behavior
- *A Random Walk Down Wall Street* (Malkiel) — indexing mindset
- *Trading in the Zone* (Douglas) — psychology post only; don't oversell
- Your own `earnings-drift-playbook.md` — advanced module only

---

## Progress tracker

### Module 1 — foundations

- [ ] Post 1: What Is a Stock?
- [ ] Post 2: How Stock Markets Work
- [ ] Post 3: Vocabulary Every Beginner Needs
- [ ] Post 4: Indexes and ETFs — Start Here

### Module 2 — mechanics

- [ ] Post 5: Brokerage Accounts 101
- [ ] Post 6: Order Types Explained
- [ ] Post 7: Reading a Quote and Chart
- [ ] Post 8: Fees, Taxes, and Hidden Costs

### Module 3 — decisions-and-risk

- [ ] Post 9: Investing vs Trading vs Gambling
- [ ] Post 10: Fundamental Analysis for Beginners
- [ ] Post 11: Technical Analysis for Beginners
- [ ] Post 12: Risk Management
- [ ] Post 13: Trading Psychology

### Module 4 — first-workflow

- [ ] Post 14: Pre-Trade Checklist
- [ ] Post 15: Paper Trading to First Live Trade
- [ ] Post 16: Watchlist and Routine
- [ ] Post 17: When Earnings Matter
- [ ] Post 18 (optional): Intro to Systematic Scans

### Module 5 — advanced-optional

- [ ] Post 19: Short Selling and Options Awareness
- [ ] Post 20: Reading an Earnings Report
- [ ] Post 21: Agent-Assisted Trading Responsibly

---

## Immediate next steps (when switching back from system design)

1. **Draft post #1:** `trading-what-is-a-stock`
2. **Create** `content/courses/trading-basics/meta.json` with module 1 only
3. **Add** disclaimer component pattern if not already standardized across posts
4. **Defer** `/trading` page copy update until post #6 or #18
5. **Do not** publish PEAD or IBS content until Module 4 is done

---

## Cross-project reference

| Project | Path | Relationship |
|---------|------|--------------|
| System Design Part 2 | `content/courses/system-design/APPLIED-SYSTEM-DESIGN-PLAN.md` | **Active priority** |
| IBS Scanner | `app/trading/page.tsx` | Capstone tool |
| Earnings Drift | `Repos/earnings-drift-playbook.md` | Advanced strategy spec |
| Blog standards | `BLOG_WRITING_PROMPT.md` | Hooks, quizzes, diagrams |

---

*Last updated: 2026-06-28 — deferred until System Design Part 2 backlog is addressed.*
