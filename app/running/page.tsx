import {
  getAllActivities,
  getActivityStats,
  getWeeklySummaries,
  getMonthlySummaries,
} from '@/lib/running-data';
import { StatsCards } from '@/components/running/StatsCards';
import { ActivityChart } from '@/components/running/ActivityChart';
import { ActivityMap } from '@/components/running/ActivityMap';
import { ActivityList } from '@/components/running/ActivityList';
import { PaceDistribution } from '@/components/running/PaceDistribution';

export const metadata = {
  title: 'Running Dashboard | Code Chronicles',
  description: 'Track and visualize my running journey with data from Garmin Connect.',
};

export default async function RunningPage() {
  // Fetch all data server-side
  let activities: any[] = [];
  let stats: any = null;
  let weeklySummaries: any[] = [];
  let monthlySummaries: any[] = [];
  let error: string | null = null;

  try {
    activities = getAllActivities();
    stats = getActivityStats();
    weeklySummaries = getWeeklySummaries(12);
    monthlySummaries = getMonthlySummaries(12);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
    console.error('Error loading running data:', e);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Running Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Tracking my running journey with data from Garmin Connect. 
          Explore statistics, trends, routes, and all my running activities.
        </p>
      </header>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md p-6 border border-red-200 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200 font-semibold mb-2">Error loading running data</p>
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <pre className="mt-4 p-3 bg-red-100 dark:bg-red-900/40 rounded text-xs overflow-auto">
            {error}
          </pre>
        </div>
      ) : activities.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-12 border border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            No running data available yet.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Run the sync script to fetch your Garmin activities:
          </p>
          <code className="block mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
            npm run sync-running
          </code>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Charts Section */}
          <div className="mb-8">
            <ActivityChart
              weeklySummaries={weeklySummaries}
              monthlySummaries={monthlySummaries}
            />
          </div>

          {/* Charts and Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Pace Distribution */}
            <PaceDistribution activities={activities} />

            {/* Route Map */}
            <ActivityMap activities={activities.slice(0, 10)} />
          </div>

          {/* Activity List */}
          <div className="mb-8">
            <ActivityList activities={activities} />
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Last updated: {stats?.last_updated ? new Date(stats.last_updated).toLocaleString() : 'N/A'}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
              Data synced from Garmin Connect using the unofficial garminconnect library.
              Use at your own risk.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

