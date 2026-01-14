import 'server-only';

import fs from 'fs';
import path from 'path';
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  eachMonthOfInterval,
  getWeek,
} from 'date-fns';
import type {
  GarminActivity,
  RunningStats,
  ActivityFilters,
  WeeklySummary,
  MonthlySummary,
} from './types/running';

const DATA_DIR = path.join(process.cwd(), 'data', 'running');
const ACTIVITIES_DIR = path.join(DATA_DIR, 'activities');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');

/**
 * Read all activity JSON files from the activities directory
 */
export function getAllActivities(): GarminActivity[] {
  if (!fs.existsSync(ACTIVITIES_DIR)) {
    return [];
  }

  const activities: GarminActivity[] = [];
  const files = fs.readdirSync(ACTIVITIES_DIR);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    try {
      const filePath = path.join(ACTIVITIES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const activity = JSON.parse(content) as GarminActivity;
      activities.push(activity);
    } catch (error) {
      console.error(`Error reading activity file ${file}:`, error);
    }
  }

  // Sort by date (newest first)
  return activities.sort((a, b) => {
    const dateA = new Date(a.startTimeLocal || a.startTimeGMT || 0).getTime();
    const dateB = new Date(b.startTimeLocal || b.startTimeGMT || 0).getTime();
    return dateB - dateA;
  });
}

/**
 * Get a single activity by ID
 */
export function getActivityById(
  activityId: string | number,
): GarminActivity | null {
  const activities = getAllActivities();
  return (
    activities.find((act) => String(act.activityId) === String(activityId)) ||
    null
  );
}

/**
 * Filter activities by date range and other criteria
 */
export function getActivitiesByFilters(
  filters: ActivityFilters,
): GarminActivity[] {
  let activities = getAllActivities();

  if (filters.startDate) {
    const startDate = new Date(filters.startDate);
    activities = activities.filter((activity) => {
      const activityDate = new Date(
        activity.startTimeLocal || activity.startTimeGMT || 0,
      );
      return activityDate >= startDate;
    });
  }

  if (filters.endDate) {
    const endDate = new Date(filters.endDate);
    activities = activities.filter((activity) => {
      const activityDate = new Date(
        activity.startTimeLocal || activity.startTimeGMT || 0,
      );
      return activityDate <= endDate;
    });
  }

  if (filters.minDistance !== undefined) {
    activities = activities.filter((activity) => {
      const distanceKm = (activity.distance || 0) / 1000;
      return distanceKm >= filters.minDistance!;
    });
  }

  if (filters.maxDistance !== undefined) {
    activities = activities.filter((activity) => {
      const distanceKm = (activity.distance || 0) / 1000;
      return distanceKm <= filters.maxDistance!;
    });
  }

  if (filters.minPace !== undefined || filters.maxPace !== undefined) {
    activities = activities.filter((activity) => {
      const distanceKm = (activity.distance || 0) / 1000;
      const durationMin =
        (activity.elapsedDuration || activity.duration || 0) / 60;
      const pace = distanceKm > 0 ? durationMin / distanceKm : 0;

      if (filters.minPace !== undefined && pace < filters.minPace) return false;
      if (filters.maxPace !== undefined && pace > filters.maxPace) return false;
      return true;
    });
  }

  return activities;
}

/**
 * Get activities by date range
 */
export function getActivitiesByDateRange(
  startDate: Date,
  endDate: Date,
): GarminActivity[] {
  return getActivitiesByFilters({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });
}

/**
 * Calculate statistics from activities
 */
export function calculateStats(activities: GarminActivity[]): RunningStats {
  if (activities.length === 0) {
    return {
      total_activities: 0,
      total_distance_km: 0,
      total_time_seconds: 0,
      total_time_hours: 0,
      average_pace_min_per_km: 0,
      total_elevation_gain_m: 0,
      total_calories: 0,
      personal_records: {
        longest_distance_km: 0,
        fastest_pace_min_per_km: 0,
      },
      last_updated: new Date().toISOString(),
    };
  }

  const totalDistance = activities.reduce(
    (sum, act) => sum + (act.distance || 0),
    0,
  );
  const totalTime = activities.reduce(
    (sum, act) => sum + (act.elapsedDuration || act.duration || 0),
    0,
  );
  const totalElevation = activities.reduce(
    (sum, act) => sum + (act.elevationGain || 0),
    0,
  );
  const totalCalories = activities.reduce(
    (sum, act) => sum + (act.calories || 0),
    0,
  );

  const totalDistanceKm = totalDistance / 1000;
  const totalTimeHours = totalTime / 3600;
  const averagePace =
    totalDistanceKm > 0 && totalTime > 0 ? totalTime / 60 / totalDistanceKm : 0;

  // Calculate personal records
  const distances = activities
    .map((act) => (act.distance || 0) / 1000)
    .filter((d) => d > 0);
  const longestDistance = distances.length > 0 ? Math.max(...distances) : 0;

  const paces = activities
    .map((act) => {
      const distanceKm = (act.distance || 0) / 1000;
      const durationMin = (act.elapsedDuration || act.duration || 0) / 60;
      return distanceKm > 0 ? durationMin / distanceKm : null;
    })
    .filter((p): p is number => p !== null && p > 0);
  const fastestPace = paces.length > 0 ? Math.min(...paces) : 0;

  return {
    total_activities: activities.length,
    total_distance_km: Math.round(totalDistanceKm * 100) / 100,
    total_time_seconds: totalTime,
    total_time_hours: Math.round(totalTimeHours * 100) / 100,
    average_pace_min_per_km: Math.round(averagePace * 100) / 100,
    total_elevation_gain_m: Math.round(totalElevation * 100) / 100,
    total_calories: totalCalories,
    personal_records: {
      longest_distance_km: Math.round(longestDistance * 100) / 100,
      fastest_pace_min_per_km: Math.round(fastestPace * 100) / 100,
    },
    last_updated: new Date().toISOString(),
  };
}

/**
 * Get cached statistics from stats.json
 */
export function getCachedStats(): RunningStats | null {
  if (!fs.existsSync(STATS_FILE)) {
    return null;
  }

  try {
    const content = fs.readFileSync(STATS_FILE, 'utf-8');
    return JSON.parse(content) as RunningStats;
  } catch (error) {
    console.error('Error reading stats file:', error);
    return null;
  }
}

/**
 * Get activity statistics (use cached if available, otherwise calculate)
 */
export function getActivityStats(): RunningStats {
  const cached = getCachedStats();
  if (cached) {
    return cached;
  }

  const activities = getAllActivities();
  return calculateStats(activities);
}

/**
 * Get weekly summaries
 */
export function getWeeklySummaries(weeks: number = 12): WeeklySummary[] {
  const activities = getAllActivities();
  if (activities.length === 0) return [];

  const now = new Date();
  const startDate = new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
  const weekStarts = eachWeekOfInterval(
    { start: startDate, end: now },
    { weekStartsOn: 1 },
  );

  return weekStarts
    .map((weekStart) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const weekActivities = activities.filter((activity) => {
        const activityDate = new Date(
          activity.startTimeLocal || activity.startTimeGMT || 0,
        );
        return activityDate >= weekStart && activityDate <= weekEnd;
      });

      const stats = calculateStats(weekActivities);
      // Get ISO week number (1-53)
      const weekNumber = getWeek(weekStart, { weekStartsOn: 1 });
      const year = format(weekStart, 'yyyy');

      return {
        week: `${year}-W${String(weekNumber).padStart(2, '0')}`,
        startDate: weekStart.toISOString(),
        endDate: weekEnd.toISOString(),
        activities: stats.total_activities,
        distance_km: stats.total_distance_km,
        time_hours: stats.total_time_hours,
        average_pace_min_per_km: stats.average_pace_min_per_km,
      };
    })
    .filter((summary) => summary.activities > 0);
}

/**
 * Get monthly summaries
 */
export function getMonthlySummaries(months: number = 12): MonthlySummary[] {
  const activities = getAllActivities();
  if (activities.length === 0) return [];

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - months, 1);
  const monthStarts = eachMonthOfInterval({ start: startDate, end: now });

  return monthStarts
    .map((monthStart) => {
      const monthEnd = endOfMonth(monthStart);
      const monthActivities = activities.filter((activity) => {
        const activityDate = new Date(
          activity.startTimeLocal || activity.startTimeGMT || 0,
        );
        return activityDate >= monthStart && activityDate <= monthEnd;
      });

      const stats = calculateStats(monthActivities);

      return {
        month: format(monthStart, 'yyyy-MM'),
        activities: stats.total_activities,
        distance_km: stats.total_distance_km,
        time_hours: stats.total_time_hours,
        average_pace_min_per_km: stats.average_pace_min_per_km,
      };
    })
    .filter((summary) => summary.activities > 0);
}

/**
 * Get recent activities
 */
export function getRecentActivities(limit: number = 10): GarminActivity[] {
  const activities = getAllActivities();
  return activities.slice(0, limit);
}

/**
 * Format pace from seconds per km to min:sec per km
 */
export function formatPace(secondsPerKm: number): string {
  if (!secondsPerKm || secondsPerKm === 0) return 'N/A';
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.floor(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format pace from min per km to min:sec per km
 */
export function formatPaceFromMinPerKm(minPerKm: number): string {
  if (!minPerKm || minPerKm === 0) return 'N/A';
  const minutes = Math.floor(minPerKm);
  const seconds = Math.floor((minPerKm - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format distance in km
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(2)}km`;
}

/**
 * Format duration in seconds to hours:minutes:seconds
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
