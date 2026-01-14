/**
 * Client-safe utility functions for formatting running data
 * These functions don't use Node.js APIs and can be imported by client components
 */

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
