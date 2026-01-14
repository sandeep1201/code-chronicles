# Using Market Data with Cursor Skills

This guide explains how to fetch real-time market data and use it with your
Cursor market analysis skills.

## Quick Start

### Option 1: Use the Fetch Script (Recommended)

1. **Run the market data fetcher:**

   ```bash
   # TypeScript version
   npm run fetch-market-data
   # or
   tsx scripts/fetch-market-data.ts

   # Python version
   python scripts/fetch-market-data.py
   ```

2. **The script will:**
   - Fetch current market data (indices, sectors, movers)
   - Save it to `data/market/market-data-formatted.md`
   - Display a summary in the terminal

3. **Use in Cursor:**
   - Open the formatted file: `data/market/market-data-formatted.md`
   - Copy the content
   - In Cursor, use: `@complete-daily-analysis`
   - Paste the market data when prompted, or reference the file

### Option 2: Direct Integration

You can also reference the file directly in Cursor:

```
@complete-daily-analysis

Here's today's market data:
[Paste content from data/market/market-data-formatted.md]
```

Or:

```
@complete-daily-analysis

Please analyze the market data from data/market/market-data-formatted.md
```

## Available Scripts

### TypeScript Script

- **File:** `scripts/fetch-market-data.ts`
- **Run:** `tsx scripts/fetch-market-data.ts` or `npm run fetch-market-data`
- **Output:** Saves to `data/market/market-data.json` and
  `data/market/market-data-formatted.md`

### Python Script

- **File:** `scripts/fetch-market-data.py`
- **Run:** `python scripts/fetch-market-data.py`
- **Output:** Same as TypeScript version

## Data Sources

The scripts use **free APIs** that don't require API keys:

1. **Yahoo Finance** (Primary)
   - Free, no API key required
   - Rate-limited (be respectful)
   - Provides: Stock prices, indices, basic market data

2. **Alpha Vantage** (Optional - requires free API key)
   - Free tier: 5 API calls/minute, 500 calls/day
   - Sign up at: https://www.alphavantage.co/support/#api-key
   - Provides: More detailed data, technical indicators

3. **Polygon.io** (Optional - requires API key)
   - Free tier available
   - Sign up at: https://polygon.io/
   - Provides: Real-time data, historical data

## Setting Up API Keys (Optional)

If you want to use Alpha Vantage or Polygon:

1. **Create a `.env` file** in the project root:

   ```bash
   ALPHA_VANTAGE_API_KEY=your_key_here
   POLYGON_API_KEY=your_key_here
   ```

2. **Install python-dotenv** (for Python):

   ```bash
   pip install python-dotenv
   ```

3. **The scripts will automatically use these keys** if available

## Workflow Example

### Daily Morning Routine

1. **Fetch Market Data:**

   ```bash
   npm run fetch-market-data
   ```

2. **Open Cursor and Run Analysis:**

   ```
   @complete-daily-analysis

   Please analyze today's market using the data from data/market/market-data-formatted.md
   ```

3. **Review the Analysis:**
   - The skill will provide comprehensive analysis
   - Use individual skills for deeper dives:
     - `@individual-stock-analysis` for specific stocks
     - `@trade-plan-development` for actionable trades
     - `@earnings-analysis` for upcoming earnings

### Automated Workflow

You can set up a cron job or scheduled task to fetch data automatically:

```bash
# Add to crontab (runs every morning at 9:00 AM)
0 9 * * 1-5 cd /path/to/code-chronicles && npm run fetch-market-data
```

## Data Format

The scripts generate data in two formats:

1. **JSON** (`market-data.json`): Raw data for programmatic use
2. **Markdown** (`market-data-formatted.md`): Human-readable format for Cursor

### Example Output Structure

```markdown
# Market Data for Analysis

**Generated:** 2024-12-XX 09:30:00

## Major Indices

**S&P 500 (SPX):** $4,500.00 (+25.50, +0.57%) **NASDAQ 100 (QQQ):** $380.00
(+2.50, +0.66%) **Dow Jones (DIA):** $35,000.00 (+150.00, +0.43%)

## Sector Performance

| Sector     | Change | Change % |
| ---------- | ------ | -------- |
| Technology | +1.25  | +0.85%   |
| Healthcare | +0.50  | +0.35%   |

...
```

## Troubleshooting

### Rate Limiting

If you see rate limit errors:

- Add delays between API calls
- Use API keys for higher limits
- Cache data and update less frequently

### API Errors

If APIs are down:

- The scripts will continue with available data
- Check API status pages
- Consider using alternative data sources

### Missing Data

Some data may be unavailable:

- Markets may be closed
- API endpoints may change
- Check script logs for specific errors

## Enhancing the Scripts

You can extend the scripts to fetch:

- **Earnings Calendar:** Upcoming earnings dates
- **Options Flow:** Unusual options activity
- **Insider Trading:** Recent insider transactions
- **Analyst Ratings:** Recent upgrades/downgrades
- **Economic Calendar:** Upcoming economic releases

## Integration with Other Tools

The market data can be used with:

- **Trading Platforms:** Import JSON data
- **Notebooks:** Use in Jupyter for analysis
- **Dashboards:** Display in custom dashboards
- **Alerts:** Set up alerts based on data

## Best Practices

1. **Respect Rate Limits:** Don't hammer free APIs
2. **Cache Data:** Store data to avoid redundant calls
3. **Error Handling:** Scripts handle errors gracefully
4. **Data Validation:** Verify data before using in trades
5. **Regular Updates:** Keep scripts updated as APIs change

## Next Steps

1. Run the fetch script to get current data
2. Use `@complete-daily-analysis` with the data
3. Customize scripts for your specific needs
4. Set up automated data fetching
5. Integrate with your trading workflow

For questions or issues, check the script comments or modify them to fit your
needs.
