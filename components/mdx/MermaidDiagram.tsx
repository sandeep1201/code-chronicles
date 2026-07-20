'use client';

import dynamic from 'next/dynamic';

export const Mermaid = dynamic(
  () => import('./Mermaid').then((mod) => mod.Mermaid),
  {
    ssr: false,
    loading: () => (
      <div className="mermaid-diagram not-prose my-8 w-full min-w-0">
        <div className="w-full min-w-0 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
            Loading diagram…
          </p>
        </div>
      </div>
    ),
  },
);
