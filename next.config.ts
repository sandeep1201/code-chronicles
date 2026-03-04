import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Prevent trailing-slash redirects so Google sees stable, indexable URLs.
  // With false, /blog and /blog/post are the canonical URLs (no redirect from /blog/).
  trailingSlash: false,
  images: {
    localPatterns: [
      {
        pathname: '/blog/**',
        // search omitted = allow any query string (e.g. ?v=timestamp for cache busting)
      },
    ],
  },
};

export default nextConfig;
