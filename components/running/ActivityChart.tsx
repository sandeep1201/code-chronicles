'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { WeeklySummary, MonthlySummary } from '@/lib/types/running';
import { formatDistance, formatPaceFromMinPerKm } from '@/lib/running-utils';

interface ActivityChartProps {
  weeklySummaries: WeeklySummary[];
  monthlySummaries: MonthlySummary[];
}

type ChartType = 'distance' | 'pace' | 'time';
type PeriodType = 'weekly' | 'monthly';

export function ActivityChart({
  weeklySummaries,
  monthlySummaries,
}: ActivityChartProps) {
  const [chartType, setChartType] = useState<ChartType>('distance');
  const [periodType, setPeriodType] = useState<PeriodType>('weekly');

  const data = periodType === 'weekly' ? weeklySummaries : monthlySummaries;

  const formatXAxis = (value: string) => {
    if (periodType === 'weekly') {
      // Format as "Week X" or just the week number
      const weekNum = value.split('-W')[1];
      return `W${weekNum}`;
    }
    // Format as "MMM YYYY"
    const [year, month] = value.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  const getChartData = () => {
    return data.map(item => ({
      period: periodType === 'weekly' ? item.week : item.month,
      distance: item.distance_km,
      pace: item.average_pace_min_per_km,
      time: item.time_hours,
      activities: item.activities,
    }));
  };

  const chartData = getChartData();

  const getYAxisLabel = () => {
    switch (chartType) {
      case 'distance':
        return 'Distance (km)';
      case 'pace':
        return 'Pace (min/km)';
      case 'time':
        return 'Time (hours)';
      default:
        return '';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {formatXAxis(label)}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)}
              {chartType === 'distance' && ' km'}
              {chartType === 'pace' && ' min/km'}
              {chartType === 'time' && ' hours'}
            </p>
          ))}
          {payload[0] && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {payload[0].payload.activities} {payload[0].payload.activities === 1 ? 'activity' : 'activities'}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Activity Trends
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No data available for the selected period
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Activity Trends
        </h3>
        <div className="flex gap-2">
          {/* Period selector */}
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setPeriodType('weekly')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                periodType === 'weekly'
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setPeriodType('monthly')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                periodType === 'monthly'
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Monthly
            </button>
          </div>
          {/* Chart type selector */}
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setChartType('distance')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                chartType === 'distance'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Distance
            </button>
            <button
              onClick={() => setChartType('pace')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                chartType === 'pace'
                  ? 'bg-green-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Pace
            </button>
            <button
              onClick={() => setChartType('time')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                chartType === 'time'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Time
            </button>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'pace' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="period"
              tickFormatter={formatXAxis}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="pace"
              stroke="#22c55e"
              strokeWidth={2}
              name="Average Pace (min/km)"
              dot={{ r: 4 }}
            />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="period"
              tickFormatter={formatXAxis}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey={chartType}
              fill={chartType === 'distance' ? '#3b82f6' : '#8b5cf6'}
              name={chartType === 'distance' ? 'Distance (km)' : 'Time (hours)'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

