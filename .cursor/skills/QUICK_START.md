# Quick Start: Market Data + Cursor Skills

## 🚀 3-Step Process

### Step 1: Fetch Market Data

```bash
npm run fetch-market-data
```

This will:

- Fetch current market indices (SPX, QQQ, DIA)
- Get sector performance
- Save data to `data/market/market-data-formatted.md`

### Step 2: Open Cursor

Open Cursor and use the complete analysis skill:

```
@complete-daily-analysis

Please analyze today's market using the data from data/market/market-data-formatted.md
```

### Step 3: Get Your Analysis

The skill will provide:

- ✅ Market regime analysis
- ✅ Top 5 forces moving markets
- ✅ Stock opportunities
- ✅ Trade plans
- ✅ Earnings calendar review
- ✅ Portfolio health check

## 📋 Alternative: Manual Data Entry

If you prefer to enter data manually:

1. Use `@complete-daily-analysis`
2. Paste current market data when prompted
3. The skill will analyze it

## 🔧 Customization

### Use Individual Skills

- `@daily-market-overview` - Just get today's top forces
- `@market-regime-analysis` - Understand market environment
- `@stock-opportunity-identification` - Find trading opportunities
- `@individual-stock-analysis` - Deep dive on specific stocks
- `@trade-plan-development` - Create actionable trade plans

### Add Your Own Data Sources

Edit `scripts/fetch-market-data.ts` or `scripts/fetch-market-data.py` to:

- Add more data sources
- Include earnings calendar
- Fetch options flow data
- Add economic calendar

## 💡 Pro Tips

1. **Schedule it:** Set up a cron job to fetch data automatically each morning
2. **Combine skills:** Use multiple skills in sequence for comprehensive
   analysis
3. **Save results:** Copy analysis results to track your market views over time
4. **Customize prompts:** Modify skills to match your trading style

## 📚 Full Documentation

See `USAGE_WITH_MARKET_DATA.md` for complete documentation.
