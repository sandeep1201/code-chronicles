'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from '@/components/theme-provider';

interface MermaidProps {
  /** Diagram source (preferred in MDX). */
  chart?: string;
  /** Diagram source as children — useful with template literals in MDX. */
  children?: string;
}

const DIAGRAM_FONT_SIZE = '12px';

function getDiagramFontFamily(container: HTMLElement): string {
  const prose = container.closest('.prose');
  const sample = prose?.querySelector('p') ?? document.body;
  return window.getComputedStyle(sample).fontFamily;
}

export function Mermaid({ chart, children }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/:/g, '');
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const source = (chart ?? children ?? '').trim();

  useEffect(() => {
    if (!source || !ref.current) return;

    let cancelled = false;
    const container = ref.current;

    async function renderChart() {
      setLoading(true);
      setError(null);
      try {
        const fontFamily = getDiagramFontFamily(container);
        const fontPx = parseFloat(DIAGRAM_FONT_SIZE);
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'neutral',
          securityLevel: 'strict',
          fontFamily,
          themeVariables: {
            fontFamily,
            fontSize: DIAGRAM_FONT_SIZE,
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: false,
            padding: 8,
            nodeSpacing: 28,
            rankSpacing: 28,
            wrappingWidth: 130,
          },
          sequence: {
            useMaxWidth: false,
            actorFontSize: fontPx,
            noteFontSize: fontPx * 0.9,
            messageFontSize: fontPx,
          },
        });

        const { svg } = await mermaid.render(
          `mermaid-${reactId}-${Date.now()}`,
          source,
        );

        if (!cancelled && container) {
          container.innerHTML = svg;
          const svgEl = container.querySelector('svg');
          if (svgEl) {
            // Keep Mermaid's width/height — only constrain downscaling for narrow viewports.
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
            svgEl.style.display = 'block';
            svgEl.style.margin = '0 auto';
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Mermaid render error:', err);
          setError(
            err instanceof Error ? err.message : 'Failed to render diagram',
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    container.innerHTML = '';
    renderChart();

    return () => {
      cancelled = true;
    };
  }, [source, theme, reactId]);

  if (!source) return null;

  return (
    <div className="mermaid-diagram not-prose my-8 w-full min-w-0">
      <div className="w-full min-w-0 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
        {loading && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
            Loading diagram…
          </p>
        )}
        <div
          ref={ref}
          role="img"
          aria-label="Diagram"
          aria-busy={loading}
          className={`mermaid-diagram__canvas min-w-0 ${loading ? 'sr-only' : ''}`}
        />
      </div>
      {error && (
        <pre className="mt-2 overflow-x-auto rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50 p-3 text-xs text-red-800 dark:text-red-200">
          Mermaid render error: {error}
        </pre>
      )}
    </div>
  );
}
