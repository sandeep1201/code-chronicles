'use client';

import type { RunningStats } from '@/lib/types/running';
import {
  formatDistance,
  formatDuration,
  formatPaceFromMinPerKm,
} from '@/lib/running-utils';

interface StatsCardsProps {
  stats: RunningStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Distance',
      value: formatDistance(stats.total_distance_km),
      subtitle: `${stats.total_activities} activities`,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Time',
      value: formatDuration(stats.total_time_seconds),
      subtitle: `${stats.total_time_hours.toFixed(1)} hours`,
      color: 'bg-green-500',
    },
    {
      title: 'Average Pace',
      value: formatPaceFromMinPerKm(stats.average_pace_min_per_km),
      subtitle: 'per kilometer',
      color: 'bg-purple-500',
    },
    {
      title: 'Elevation Gain',
      value: `${stats.total_elevation_gain_m.toFixed(0)}m`,
      subtitle: 'total climb',
      color: 'bg-orange-500',
    },
    {
      title: 'Personal Record',
      value: formatDistance(stats.personal_records.longest_distance_km),
      subtitle: 'longest run',
      color: 'bg-red-500',
    },
    {
      title: 'Fastest Pace',
      value: formatPaceFromMinPerKm(
        stats.personal_records.fastest_pace_min_per_km,
      ),
      subtitle: 'per kilometer',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {card.title}
            </h3>
            <div className={`w-3 h-3 rounded-full ${card.color}`} />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {card.value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
