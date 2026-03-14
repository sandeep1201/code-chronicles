import { NextRequest, NextResponse } from 'next/server';
import { runIBSScan, pickOneForDayTrading, DEFAULT_WATCHLIST } from '@/lib/ibs-scanner';

export const dynamic = 'force-dynamic';
export const maxDuration = 120; // Allow up to 2 min for scan (Vercel Pro)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const pickOne = searchParams.get('pickOne') === 'true';
    const symbolsParam = searchParams.get('symbols');

    let tickers = DEFAULT_WATCHLIST;
    if (symbolsParam) {
      tickers = symbolsParam.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);
    } else if (limit) {
      const n = Math.min(parseInt(limit, 10) || 50, 150);
      tickers = DEFAULT_WATCHLIST.slice(0, n);
    }

    const results = await runIBSScan(tickers);

    if (pickOne) {
      const picked = pickOneForDayTrading(results);
      return NextResponse.json({
        success: true,
        pick: picked,
        totalBuySignals: results.filter((r) => r.signal === '🚀 BUY').length,
      });
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      buyCount: results.filter((r) => r.signal === '🚀 BUY').length,
      exitCount: results.filter((r) => r.signal === '🛑 EXIT').length,
      results,
    });
  } catch (error) {
    console.error('IBS scan error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Scan failed' },
      { status: 500 }
    );
  }
}
