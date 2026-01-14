/**
 * TypeScript interfaces for Garmin running data
 */

export interface GarminActivity {
  activityId: string | number;
  activityName?: string;
  activityType: {
    typeKey: string;
    typeId: number;
    parentTypeId: number;
    sortOrder: number;
  };
  startTimeLocal: string;
  startTimeGMT: string;
  distance?: number; // in meters
  duration?: number; // in seconds
  elapsedDuration?: number; // in seconds
  movingDuration?: number; // in seconds
  calories?: number;
  averageHR?: number;
  maxHR?: number;
  averageRunningCadenceInStepsPerMinute?: number;
  averageSpeed?: number; // in m/s
  maxSpeed?: number; // in m/s
  averagePace?: number; // in seconds per km
  minPace?: number; // in seconds per km
  elevationGain?: number; // in meters
  elevationLoss?: number; // in meters
  maxElevation?: number; // in meters
  minElevation?: number; // in meters
  startLatitude?: number;
  startLongitude?: number;
  endLatitude?: number;
  endLongitude?: number;
  weather?: {
    temperature?: number;
    condition?: string;
  };
  activitySummary?: {
    distance?: number;
    duration?: number;
    calories?: number;
  };
  heartRateZones?: HeartRateZone[];
  splits?: ActivitySplit[];
  laps?: ActivityLap[];
  samples?: ActivitySample[];
}

export interface HeartRateZone {
  name: string;
  min: number;
  max: number;
  timeInZone?: number; // in seconds
}

export interface ActivitySplit {
  distance?: number; // in meters
  duration?: number; // in seconds
  pace?: number; // in seconds per km
  averageHR?: number;
  elevationGain?: number;
}

export interface ActivityLap {
  startTime?: string;
  distance?: number;
  duration?: number;
  averageHR?: number;
  maxHR?: number;
}

export interface ActivitySample {
  startTime?: string;
  latitude?: number;
  longitude?: number;
  elevation?: number;
  heartRate?: number;
  cadence?: number;
  speed?: number;
  pace?: number;
}

export interface RunningStats {
  total_activities: number;
  total_distance_km: number;
  total_time_seconds: number;
  total_time_hours: number;
  average_pace_min_per_km: number;
  total_elevation_gain_m: number;
  total_calories: number;
  personal_records: {
    longest_distance_km: number;
    fastest_pace_min_per_km: number;
  };
  last_updated: string;
}

export interface LastSync {
  last_sync: string;
  timestamp: number;
}

export interface ActivityFilters {
  startDate?: string;
  endDate?: string;
  minDistance?: number;
  maxDistance?: number;
  minPace?: number;
  maxPace?: number;
}

export interface WeeklySummary {
  week: string; // YYYY-WW format
  startDate: string;
  endDate: string;
  activities: number;
  distance_km: number;
  time_hours: number;
  average_pace_min_per_km: number;
}

export interface MonthlySummary {
  month: string; // YYYY-MM format
  activities: number;
  distance_km: number;
  time_hours: number;
  average_pace_min_per_km: number;
}
