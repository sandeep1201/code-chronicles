# Market Analysis Cursor Skills

This directory contains Cursor skills for comprehensive market analysis. These
skills can be used individually or together through the master orchestrator
skill.

## Available Skills

### 1. **daily-market-overview.md**

Scans today's global markets and summarizes the top 5 forces moving stocks. Use
at the start of your daily analysis.

### 2. **market-regime-analysis.md**

Determines current market regime (trending, ranging, risk-on, risk-off) and
provides strategy adaptation guidance.

### 3. **stock-opportunity-identification.md**

Generates a shortlist of high-probability stocks for the next 30 days based on
current market conditions.

### 4. **individual-stock-analysis.md**

Provides comprehensive analysis of a specific stock combining technical,
fundamental, and news analysis.

### 5. **trade-plan-development.md**

Creates a complete, actionable trade plan with entry zones, stops, targets, and
position sizing.

### 6. **earnings-analysis.md**

Analyzes upcoming earnings using historical patterns and estimates post-earnings
moves.

### 7. **portfolio-construction.md**

Designs a diversified portfolio based on risk profile with sector allocation and
rebalancing strategy.

### 8. **trade-review-analysis.md**

Conducts post-mortem analysis of completed trades to identify mistakes and
improvements.

### 9. **complete-daily-analysis.md** ⭐

Master orchestrator skill that runs all skills in optimal sequence for
comprehensive daily analysis.

## How to Use

### Option 1: Use Individual Skills

1. Open Cursor
2. Reference a specific skill: `@daily-market-overview` or
   `@individual-stock-analysis`
3. Replace any placeholders (like `[STOCK_NAME/TICKER]`) with actual values
4. Execute the skill

### Option 2: Use Master Orchestrator (Recommended for Daily Analysis)

1. Open Cursor
2. Reference: `@complete-daily-analysis`
3. The skill will orchestrate all analysis steps in the optimal sequence
4. Review the comprehensive output

### Option 3: Custom Workflow

Combine skills in your preferred order:

```
@market-regime-analysis → @daily-market-overview → @stock-opportunity-identification
```

## Skill Variables

Some skills require you to replace placeholders:

- `[STOCK_NAME/TICKER]` - Replace with actual stock symbol (e.g., AAPL, TSLA)
- `[COMPANY_NAME]` - Replace with company name (e.g., Apple Inc., Tesla)
- `[LOW/MEDIUM/HIGH]` - Replace with risk profile
- `[TRADE_DETAILS]` - Replace with complete trade information

## Daily Workflow Recommendation

**Morning Routine:**

1. `@complete-daily-analysis` - Get full market picture
2. Review and prioritize opportunities
3. Use `@individual-stock-analysis` for deep dives on selected stocks
4. Use `@trade-plan-development` for actionable trades

**Weekly Routine:**

- Use `@trade-review-analysis` to review completed trades
- Use `@portfolio-construction` to review/update portfolio allocation

**Before Earnings:**

- Use `@earnings-analysis` for companies reporting soon

## Tips

1. **Start Broad, Then Narrow**: Use the master skill first, then drill down
   with individual skills
2. **Provide Context**: When using skills, include current market data, charts,
   or news for better analysis
3. **Iterate**: Use skills iteratively - initial analysis may reveal areas
   needing deeper investigation
4. **Combine Skills**: Chain skills together for comprehensive analysis (e.g.,
   regime → opportunities → analysis → plan)

## Integration with Cursor

These skills are stored in `.cursor/skills/` and can be referenced directly in
Cursor using the `@` symbol followed by the skill name (without `.md`
extension).

Example:

- `@daily-market-overview` references `daily-market-overview.md`
- `@complete-daily-analysis` references `complete-daily-analysis.md`

## Customization

Feel free to modify these skills to match your:

- Trading style (day trading, swing trading, position trading)
- Risk tolerance
- Preferred metrics and indicators
- Analysis timeframes
