import Image from 'next/image';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Inline figure for blog diagrams stored under public/blog/diagrams/{slug}/.
 * Use for Excalidraw exports, comparison PNGs, or other static assets.
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  priority = false,
}: FigureProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
