'use client';

import { useState } from 'react';
import type { IBSResult } from '@/lib/ibs-scanner';

export function IBSScannerClient() {
  const [results, setResults] = useState<IBSResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<IBSResult | null>(null);

  const runScan = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    setPicked(null);
    setProgress('Starting scan...');

    try {
      const res = await fetch('/api/ibs-scan?limit=100');
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Scan failed');
      }

      setResults(data.results);
      setProgress(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
      setProgress(null);
    } finally {
      setLoading(false);
    }
  };

  const pickOne = async () => {
    if (!results || results.filter((r) => r.signal === '🚀 BUY').length === 0) {
      setError('Run a scan first and ensure there are BUY signals.');
      return;
    }

    const buySignals = results.filter((r) => r.signal === '🚀 BUY');
    const random = buySignals[Math.floor(Math.random() * buySignals.length)];
    setPicked(random);
  };

  const buyCount = results?.filter((r) => r.signal === '🚀 BUY').length ?? 0;

  return (
    <div className="space-y-8">
      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={runScan}
          disabled={loading}
          className="px-6 py-3 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white transition-colors"
        >
          {loading ? 'Scanning...' : 'Run Scan'}
        </button>
        <button
          onClick={pickOne}
          disabled={loading || !results || buyCount === 0}
          className="px-6 py-3 rounded-lg font-semibold bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white transition-colors"
        >
          Pick One for Day Trading
        </button>
      </div>

      {/* Progress */}
      {progress && (
        <div className="text-sm text-gray-600 dark:text-gray-400">{progress}</div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      {/* Picked stock */}
      {picked && (
        <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600">
          <h2 className="text-xl font-bold mb-2 text-amber-800 dark:text-amber-200">
            Today&apos;s Pick for Day Trading
          </h2>
          <div className="flex flex-wrap gap-4 text-lg">
            <span className="font-mono font-bold">{picked.ticker}</span>
            <span>{picked.price}</span>
            <span>IBS: {picked.ibs}</span>
            <span>Dist: {picked.distToThreshold}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This stock met the BUY criteria (pullback + weak close). Do your own research before
            trading.
          </p>
        </div>
      )}

      {/* Results table */}
      {results && results.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Ticker
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  IBS
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Dist to Threshold
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  Signal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              {results.map((row) => (
                <tr
                  key={row.ticker}
                  className={
                    row.signal === '🚀 BUY'
                      ? 'bg-emerald-50/50 dark:bg-emerald-900/10'
                      : row.signal === '🛑 EXIT'
                        ? 'bg-red-50/50 dark:bg-red-900/10'
                        : ''
                  }
                >
                  <td className="px-4 py-2 font-mono font-medium">{row.ticker}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.ibs}</td>
                  <td className="px-4 py-2">{row.distToThreshold}</td>
                  <td className="px-4 py-2 font-semibold">{row.signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results && results.length === 0 && !loading && (
        <p className="text-gray-600 dark:text-gray-400">No results. Try running the scan again.</p>
      )}
    </div>
  );
}
