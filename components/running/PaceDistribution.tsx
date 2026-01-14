'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import type { GarminActivity } from '@/lib/types/running';
import { formatPaceFromMinPerKm } from '@/lib/running-utils';

interface PaceDistributionProps {
  activities: GarminActivity[];
}

interface PaceBucket {
  name: string;
  min: number;
  max: number;
  value: number;
  color: string;
}

export function PaceDistribution({ activities }: PaceDistributionProps) {
  // Calculate pace distribution
  const paceBuckets: PaceBucket[] = [
    { name: '< 4:00', min: 0, max: 4, value: 0, color: '#ef4444' }, // red
    { name: '4:00-5:00', min: 4, max: 5, value: 0, color: '#f97316' }, // orange
    { name: '5:00-6:00', min: 5, max: 6, value: 0, color: '#eab308' }, // yellow
    { name: '6:00-7:00', min: 6, max: 7, value: 0, color: '#22c55e' }, // green
    { name: '7:00-8:00', min: 7, max: 8, value: 0, color: '#3b82f6' }, // blue
    { name: '> 8:00', min: 8, max: Infinity, value: 0, color: '#8b5cf6' }, // purple
  ];

  // Count activities in each pace bucket
  activities.forEach((activity) => {
    const distanceKm = (activity.distance || 0) / 1000;
    const durationMin =
      (activity.elapsedDuration || activity.duration || 0) / 60;
    const pace = distanceKm > 0 ? durationMin / distanceKm : 0;

    if (pace > 0) {
      const bucket = paceBuckets.find((b) => pace >= b.min && pace < b.max);
      if (bucket) {
        bucket.value += 1;
      }
    }
  });

  // Filter out buckets with no activities and map to chart data format
  const data = paceBuckets
    .filter((bucket) => bucket.value > 0)
    .map(({ name, value, color }) => ({ name, value, color }));

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Pace Distribution
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No pace data available
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {payload[0].value} {payload[0].value === 1 ? 'run' : 'runs'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Pace Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
