import { NextRequest, NextResponse } from 'next/server';
import {
  getAllActivities,
  getActivitiesByFilters,
  getRecentActivities,
  getActivitiesByDateRange,
} from '@/lib/running-data';
import type { ActivityFilters } from '@/lib/types/running';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Check for query parameters
    const limit = searchParams.get('limit');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const minDistance = searchParams.get('minDistance');
    const maxDistance = searchParams.get('maxDistance');
    const minPace = searchParams.get('minPace');
    const maxPace = searchParams.get('maxPace');

    let activities;

    // If limit is specified, get recent activities
    if (limit) {
      activities = getRecentActivities(parseInt(limit, 10));
    }
    // If date range is specified, use filters
    else if (startDate || endDate || minDistance || maxDistance || minPace || maxPace) {
      const filters: ActivityFilters = {};
      
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;
      if (minDistance) filters.minDistance = parseFloat(minDistance);
      if (maxDistance) filters.maxDistance = parseFloat(maxDistance);
      if (minPace) filters.minPace = parseFloat(minPace);
      if (maxPace) filters.maxPace = parseFloat(maxPace);
      
      activities = getActivitiesByFilters(filters);
    }
    // Otherwise, get all activities
    else {
      activities = getAllActivities();
    }

    return NextResponse.json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch activities',
      },
      { status: 500 }
    );
  }
}

