# Earnings Drift Trading Playbook

A portable strategy spec for trading **post-earnings drift** in my Robinhood
Agentic account. Paste this (or point a Cursor cloud agent / Claude / ChatGPT
mobile session at it) to get full context for placing trades.

> Educational experiment with real money. Not investment advice. Robinhood does
> not supervise agent trades — every order requires my explicit confirmation.

## Account

- **Broker:** Robinhood, via the Trading MCP (`https://agent.robinhood.com/mcp/trading`)
- **Account:** the **Agentic** account ending **0801** (`agentic_allowed = true`)
- **Type:** cash account, **equities only** (no options approval, no shorting, no crypto/futures)
- **Starting capital:** ~$5,000

## Strategy: Post-Earnings Announcement Drift (PEAD), long-only

We do **not** bet on results before a company reports. We wait for the report,
then trade the **reaction**. Stocks that deliver a real positive surprise and
gap up tend to keep drifting upward for days — that's the edge we ride.

### Entry rules (all must be true)

1. The company has **already reported** — never hold a naked position into earnings.
2. **Beat on EPS *and* revenue**, with **non-negative forward guidance**.
3. The stock **gapped up and is holding** the gain into the next regular session (not fading).
4. Enter with a **marketable limit** near the ask, not a blind market order.

### Risk & exit rules

- **Position size:** max **$1,250** per name (~25% of settled cash).
- **Max concurrent positions:** **2** (respect T+1 cash settlement — don't churn).
- **Stop loss:** attach a **`stop_market` at −6%** from entry immediately.
- **Target:** **+10–12%**, or trail the drift over several days.
- **Long-only:** a negative reaction is a **PASS**, never a short.
- **Daily circuit breaker:** if down ~$150 on the day, stop for the day.

### Always

- Run **`review_equity_order`** first; show me the live quote, the consensus vs.
  actual, and any alerts.
- **Never place an order without my explicit confirmation.**

## How to run a session

When a watchlist name reports, tell the agent: **"check <TICKER>"**. The agent should:

1. Pull the live quote (`get_equity_quotes`) and the reported numbers vs. consensus.
2. Judge it against the entry rules above.
3. If it qualifies, propose an exact order: shares, marketable-limit price, and the
   −6% `stop_market`, sized to ≤ $1,250.
4. Wait for my confirmation, then place (`place_equity_order`) and report the order state.

## Current watchlist — week of Jun 15–19, 2026

(Robinhood watchlist: **"Earnings Drift"**. Markets closed Fri 6/19, Juneteenth.)

| Ticker | Company | Reports | Consensus | Notes |
|--------|---------|---------|-----------|-------|
| LZB | La-Z-Boy | Tue 6/16 (after close) | $0.82 EPS / $569M | Lowered bar (down YoY); watch order trends |
| KMX | CarMax | Wed 6/17 (before open) | $0.94 EPS / $7.39B | Options imply ~13% move; best drift candidate |
| KR  | Kroger | Thu 6/18 (before open) | $1.58 EPS / $45.4B | Defensive; cleaner but smaller drift |
| ACN | Accenture | Thu 6/18 (before open) | $3.72 EPS / $18.8B | AI/consulting bellwether; guidance drives it |
| JBL | Jabil | Wed 6/17 (after close) | — | Tracking only — too pricey (~$386) to size on $5k |

**Already reported:** PLAY (Dave & Buster's) — fell ~12% after hours Mon 6/15 → PASS (long-only).
**Not this week:** PGR (Progressive) reports Aug 3, 2026 — removed from the board.

## Quick-start prompt (for a fresh mobile session)

```
You help me trade post-earnings drift in my Robinhood Agentic cash account
(ending 0801, agentic_allowed). LONG-ONLY, equities only. Enter ONLY after a
company reports, and only on an EPS+revenue beat with non-negative guidance where
the stock gapped up and is holding. Size <= $1,250/name, max 2 positions, attach a
stop_market at -6%, target +10-12%. Always run review_equity_order and show me the
quote + consensus before placing, and never place without my explicit confirmation.
Watchlist: LZB, KMX, KR, ACN.
```
