import fs from 'fs';
import path from 'path';

/**
 * Returns the image src with cache-busting query param for generated blog thumbnails.
 * Uses file mtime so regenerated images are fetched fresh.
 */
export function getBlogImageSrc(slug: string, customImage?: string): string {
  const src = customImage ?? `/blog/${slug}.png`;
  if (!src.startsWith('/blog/') || !src.endsWith('.png')) return src;

  try {
    const filePath = path.join(process.cwd(), 'public', src);
    const stat = fs.statSync(filePath);
    return `${src}?v=${stat.mtimeMs}`;
  } catch {
    return src;
  }
}
