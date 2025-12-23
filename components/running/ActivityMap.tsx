'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { GarminActivity } from '@/lib/types/running';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then(mod => mod.Polyline),
  { ssr: false }
);

interface ActivityMapProps {
  activities: GarminActivity[];
  selectedActivityId?: string | number;
}

interface RoutePoint {
  lat: number;
  lng: number;
}

export function ActivityMap({ activities, selectedActivityId }: ActivityMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract routes with GPS data
  const routesWithGPS = activities.filter(activity => {
    const samples = activity.samples || [];
    return samples.some((sample: any) => sample.latitude && sample.longitude);
  });

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Route Map
        </h3>
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  if (routesWithGPS.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Route Map
        </h3>
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No GPS data available for activities
          </p>
        </div>
      </div>
    );
  }

  // Calculate center point from all activities
  const allPoints: RoutePoint[] = [];
  routesWithGPS.forEach(activity => {
    const samples = activity.samples || [];
    samples.forEach((sample: any) => {
      if (sample.latitude && sample.longitude) {
        allPoints.push({ lat: sample.latitude, lng: sample.longitude });
      }
    });
  });

  const centerLat = allPoints.length > 0
    ? allPoints.reduce((sum, p) => sum + p.lat, 0) / allPoints.length
    : 0;
  const centerLng = allPoints.length > 0
    ? allPoints.reduce((sum, p) => sum + p.lng, 0) / allPoints.length
    : 0;

  // Get routes for display
  const getRoutePoints = (activity: GarminActivity): RoutePoint[] => {
    const samples = activity.samples || [];
    return samples
      .filter((sample: any) => sample.latitude && sample.longitude)
      .map((sample: any) => ({
        lat: sample.latitude,
        lng: sample.longitude,
      }));
  };

  // Colors for different routes
  const colors = [
    '#3b82f6', // blue
    '#22c55e', // green
    '#ef4444', // red
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#ec4899', // pink
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Route Map
      </h3>
      <div className="h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <MapContainer
          center={[centerLat || 0, centerLng || 0]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {routesWithGPS.map((activity, index) => {
            const routePoints = getRoutePoints(activity);
            const isSelected = String(activity.activityId) === String(selectedActivityId);
            const color = isSelected ? '#ef4444' : colors[index % colors.length];
            const weight = isSelected ? 4 : 2;

            if (routePoints.length === 0) return null;

            const startPoint = routePoints[0];
            const activityDate = new Date(activity.startTimeLocal || activity.startTimeGMT || 0);
            const distanceKm = ((activity.distance || 0) / 1000).toFixed(2);

            return (
              <>
                <Polyline
                  key={`polyline-${activity.activityId}`}
                  positions={routePoints}
                  pathOptions={{
                    color,
                    weight,
                    opacity: isSelected ? 1 : 0.7,
                  }}
                />
                {startPoint && (
                  <Marker key={`marker-${activity.activityId}`} position={[startPoint.lat, startPoint.lng]}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">
                          {activity.activityName || 'Running Activity'}
                        </p>
                        <p className="text-gray-600">
                          {activityDate.toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">{distanceKm} km</p>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </>
            );
          })}
        </MapContainer>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Showing {routesWithGPS.length} {routesWithGPS.length === 1 ? 'route' : 'routes'} with GPS data
      </p>
    </div>
  );
}

