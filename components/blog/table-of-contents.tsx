'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/toc';

interface TableOfContentsProps {
  items: TocItem[];
  /** Render inside a collapsible <details> (used on small screens). */
  collapsible?: boolean;
}

function useActiveHeading(items: TocItem[]): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Activate a heading once it reaches ~90px from the top (below the
        // sticky header) until the next one takes over.
        rootMargin: '-90px 0px -70% 0px',
        threshold: [0, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return activeId;
}

function TocLinks({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <ul className="text-sm">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`block border-l-2 py-1.5 transition-colors ${
                item.level === 3 ? 'pl-8' : 'pl-4'
              } ${
                isActive
                  ? 'border-blue-500 font-medium text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200'
              }`}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function TableOfContents({ items, collapsible }: TableOfContentsProps) {
  const [activeId, setActiveId] = useActiveHeadingState(items);

  if (items.length === 0) return null;

  if (collapsible) {
    return (
      <details className="group rounded-lg border border-gray-200 dark:border-gray-800">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-gray-900 dark:text-white flex items-center justify-between">
          On this page
          <svg
            className="h-4 w-4 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>
        <div className="px-4 pb-4">
          <TocLinks
            items={items}
            activeId={activeId}
            onNavigate={setActiveId}
          />
        </div>
      </details>
    );
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
        On this page
      </p>
      <TocLinks items={items} activeId={activeId} onNavigate={setActiveId} />
    </nav>
  );
}

// Small wrapper so a click can optimistically set the active item while the
// IntersectionObserver catches up during the smooth scroll.
function useActiveHeadingState(
  items: TocItem[],
): [string, (id: string) => void] {
  const observed = useActiveHeading(items);
  const [clicked, setClicked] = useState<string | null>(null);

  useEffect(() => {
    if (clicked && observed === clicked) {
      setClicked(null);
    }
  }, [observed, clicked]);

  return [clicked ?? observed, setClicked];
}
