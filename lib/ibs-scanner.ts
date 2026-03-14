/**
 * IBS (Internal Bar Strength) Strategy Scanner
 * Scans stocks for mean-reversion pullback signals
 */

export type IBSSignal = '🚀 BUY' | '🛑 EXIT' | '⌛ WAIT';

export interface IBSResult {
  ticker: string;
  price: string;
  ibs: number;
  distToThreshold: string;
  signal: IBSSignal;
}

// Top ~100 S&P 500 stocks by market cap / liquidity (for quick scans)
const DEFAULT_WATCHLIST = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'BRK-B', 'JPM', 'V', 'JNJ',
  'WMT', 'PG', 'MA', 'UNH', 'HD', 'DIS', 'BAC', 'XOM', 'CVX', 'ADBE',
  'PEP', 'KO', 'COST', 'AVGO', 'NFLX', 'CRM', 'MCD', 'ABBV', 'CSCO', 'ACN',
  'TMO', 'DHR', 'ABT', 'NEE', 'TXN', 'VZ', 'NKE', 'PM', 'CMCSA', 'INTC',
  'AMD', 'WFC', 'ORCL', 'QCOM', 'UPS', 'RTX', 'HON', 'IBM', 'GE', 'CAT',
  'AMGN', 'SPGI', 'LOW', 'INTU', 'SBUX', 'AXP', 'DE', 'GS', 'BLK', 'LMT',
  'BKNG', 'ADI', 'GILD', 'MDT', 'AMAT', 'ISRG', 'SYK', 'VRTX', 'REGN',
  'MMC', 'CI', 'ZTS', 'BDX', 'SO', 'DUK', 'EOG', 'MO', 'BSX', 'APD',
  'SLB', 'EQIX', 'CME', 'SCHW', 'CB', 'PGR', 'ITW', 'APTV', 'KLAC',
  'SNPS', 'CDNS', 'PANW', 'MU', 'HCA', 'ETN', 'WM', 'CL', 'MDLZ', 'AON',
];

interface YahooChartQuote {
  open: (number | null)[];
  high: (number | null)[];
  low: (number | null)[];
  close: (number | null)[];
  volume: (number | null)[];
}

interface YahooChartResult {
  meta: { symbol: string };
  timestamp: number[];
  indicators: { quote: YahooChartQuote[] };
}

async function fetchHistoricalData(symbol: string): Promise<{
  high: number[];
  low: number[];
  close: number[];
} | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=60d`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const result: YahooChartResult | undefined = data?.chart?.result?.[0];
    if (!result?.indicators?.quote?.[0]) return null;

    const quote = result.indicators.quote[0];
    const h = quote.high;
    const l = quote.low;
    const c = quote.close;
    const len = Math.min(h.length, l.length, c.length);
    if (len < 26) return null;

    // Build aligned arrays, skip rows with nulls
    const high: number[] = [];
    const low: number[] = [];
    const close: number[] = [];
    for (let i = 0; i < len; i++) {
      if (h[i] != null && l[i] != null && c[i] != null) {
        high.push(h[i]!);
        low.push(l[i]!);
        close.push(c[i]!);
      }
    }
    if (high.length < 26) return null;

    return { high, low, close };
  } catch {
    return null;
  }
}

function scanSymbol(symbol: string, high: number[], low: number[], close: number[]): IBSResult | null {
  const n = close.length;
  const lastClose = close[n - 1];
  const lastHigh = high[n - 1];
  const lastLow = low[n - 1];
  const prevHigh = high[n - 2];

  // IBS = (Close - Low) / (High - Low)
  const range = lastHigh - lastLow;
  const ibs = range > 0 ? (lastClose - lastLow) / range : 0.5;

  // 25-day average range
  const dailyRanges: number[] = [];
  for (let i = n - 25; i < n; i++) {
    dailyRanges.push(high[i] - low[i]);
  }
  const avgRange25 = dailyRanges.reduce((a, b) => a + b, 0) / 25;

  // 10-day high
  const high10 = Math.max(...high.slice(-10));

  // Threshold = 10-day high - 2.5 * avg range
  const threshold = high10 - 2.5 * avgRange25;
  const distToThreshold = threshold > 0 ? ((lastClose / threshold) - 1) * 100 : 0;

  const buySignal = lastClose < threshold && ibs < 0.3;
  const exitSignal = lastClose > prevHigh;

  const signal: IBSSignal = buySignal ? '🚀 BUY' : exitSignal ? '🛑 EXIT' : '⌛ WAIT';

  return {
    ticker: symbol,
    price: `$${lastClose.toFixed(2)}`,
    ibs: Math.round(ibs * 1000) / 1000,
    distToThreshold: `${distToThreshold >= 0 ? '+' : ''}${distToThreshold.toFixed(2)}%`,
    signal,
  };
}

export async function runIBSScan(
  tickers: string[] = DEFAULT_WATCHLIST,
  onProgress?: (scanned: number, total: number) => void
): Promise<IBSResult[]> {
  const results: IBSResult[] = [];
  const total = tickers.length;

  for (let i = 0; i < tickers.length; i++) {
    const symbol = tickers[i];
    onProgress?.(i + 1, total);

    const data = await fetchHistoricalData(symbol);
    if (!data) continue;

    const result = scanSymbol(symbol, data.high, data.low, data.close);
    if (result) results.push(result);

    // Rate limit
    await new Promise((r) => setTimeout(r, 100));
  }

  // Sort: BUY first, then EXIT, then WAIT
  const order: Record<IBSSignal, number> = { '🚀 BUY': 0, '🛑 EXIT': 1, '⌛ WAIT': 2 };
  results.sort((a, b) => order[a.signal] - order[b.signal]);

  return results;
}

export function pickOneForDayTrading(results: IBSResult[]): IBSResult | null {
  const buySignals = results.filter((r) => r.signal === '🚀 BUY');
  if (buySignals.length === 0) return null;
  return buySignals[Math.floor(Math.random() * buySignals.length)];
}

export { DEFAULT_WATCHLIST };
