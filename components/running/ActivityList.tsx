'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import type { GarminActivity } from '@/lib/types/running';
import { formatDistance, formatDuration, formatPaceFromMinPerKm } from '@/lib/running-utils';

interface ActivityListProps {
  activities: GarminActivity[];
  onActivitySelect?: (activity: GarminActivity) => void;
}

type SortField = 'date' | 'distance' | 'pace' | 'duration';
type SortDirection = 'asc' | 'desc';

export function ActivityList({ activities, onActivitySelect }: ActivityListProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const sortedAndFilteredActivities = useMemo(() => {
    let filtered = activities;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(activity => {
        const name = (activity.activityName || '').toLowerCase();
        const date = new Date(activity.startTimeLocal || activity.startTimeGMT || 0)
          .toLocaleDateString()
          .toLowerCase();
        return name.includes(query) || date.includes(query);
      });
    }

    // Sort activities
    filtered = [...filtered].sort((a, b) => {
      let aValue: number | string = 0;
      let bValue: number | string = 0;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.startTimeLocal || a.startTimeGMT || 0).getTime();
          bValue = new Date(b.startTimeLocal || b.startTimeGMT || 0).getTime();
          break;
        case 'distance':
          aValue = a.distance || 0;
          bValue = b.distance || 0;
          break;
        case 'pace':
          const aDistanceKm = (a.distance || 0) / 1000;
          const aDurationMin = (a.elapsedDuration || a.duration || 0) / 60;
          aValue = aDistanceKm > 0 ? aDurationMin / aDistanceKm : Infinity;
          const bDistanceKm = (b.distance || 0) / 1000;
          const bDurationMin = (b.elapsedDuration || b.duration || 0) / 60;
          bValue = bDistanceKm > 0 ? bDurationMin / bDistanceKm : Infinity;
          break;
        case 'duration':
          aValue = a.elapsedDuration || a.duration || 0;
          bValue = b.elapsedDuration || b.duration || 0;
          break;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [activities, sortField, sortDirection, searchQuery]);

  const totalPages = Math.ceil(sortedAndFilteredActivities.length / itemsPerPage);
  const paginatedActivities = sortedAndFilteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getActivityPace = (activity: GarminActivity): string => {
    const distanceKm = (activity.distance || 0) / 1000;
    const durationMin = (activity.elapsedDuration || activity.duration || 0) / 60;
    const pace = distanceKm > 0 ? durationMin / distanceKm : 0;
    return formatPaceFromMinPerKm(pace);
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Activities
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No activities found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Activities ({sortedAndFilteredActivities.length})
        </h3>
        <input
          type="text"
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort('date')}
              >
                Date {getSortIcon('date')}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort('distance')}
              >
                Distance {getSortIcon('distance')}
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort('duration')}
              >
                Time {getSortIcon('duration')}
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort('pace')}
              >
                Pace {getSortIcon('pace')}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Elevation
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedActivities.map((activity) => {
              const activityDate = new Date(activity.startTimeLocal || activity.startTimeGMT || 0);
              const distanceKm = (activity.distance || 0) / 1000;
              const duration = activity.elapsedDuration || activity.duration || 0;
              const elevation = activity.elevationGain || 0;

              return (
                <tr
                  key={activity.activityId}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => onActivitySelect?.(activity)}
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {format(activityDate, 'MMM dd, yyyy')}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {activity.activityName || 'Running Activity'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {formatDistance(distanceKm)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {formatDuration(duration)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {getActivityPace(activity)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {elevation > 0 ? `${Math.round(elevation)}m` : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

