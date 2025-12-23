import { NextResponse } from 'next/server';
import {
  getActivityStats,
  getWeeklySummaries,
  getMonthlySummaries,
} from '@/lib/running-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = getActivityStats();
    const weeklySummaries = getWeeklySummaries(12);
    const monthlySummaries = getMonthlySummaries(12);

    return NextResponse.json({
      success: true,
      stats,
      weeklySummaries,
      monthlySummaries,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch statistics',
      },
      { status: 500 }
    );
  }
}

