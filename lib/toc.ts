import GithubSlugger from 'github-slugger';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

const FENCE_RE = /^\s*(```|~~~)/;
const TOC_HEADING_RE = /^##\s+table of contents\s*$/i;
const LIST_ITEM_RE = /^\s*[-*+]\s+/;
const THEMATIC_BREAK_RE = /^\s*-{3,}\s*$/;
const HEADING_RE = /^(#{1,6})\s+(.*?)\s*#*\s*$/;

/**
 * Remove the hand-authored "## Table of Contents" section from raw markdown.
 * Strips the heading, the following list, surrounding blank lines, and a single
 * trailing thematic break (`---`). Leaves everything else untouched. Skips
 * matches inside fenced code blocks.
 */
export function stripTocSection(markdown: string): string {
  const lines = markdown.split('\n');
  const out: string[] = [];
  let inFence = false;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      out.push(line);
      i++;
      continue;
    }

    if (!inFence && TOC_HEADING_RE.test(line)) {
      i++; // drop the heading
      while (i < lines.length && lines[i].trim() === '') i++; // blank lines
      while (i < lines.length && LIST_ITEM_RE.test(lines[i])) i++; // list items
      while (i < lines.length && lines[i].trim() === '') i++; // blank lines
      if (i < lines.length && THEMATIC_BREAK_RE.test(lines[i])) i++; // separator
      continue;
    }

    out.push(line);
    i++;
  }

  return out.join('\n');
}

/**
 * Convert inline markdown in a heading to plain text (links, code, emphasis).
 */
function toPlainText(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/[*_~]/g, '') // emphasis markers
    .trim();
}

/**
 * Extract an h2/h3 table of contents from markdown. Slugs are generated with
 * the same algorithm rehype-slug uses (github-slugger), processed over every
 * heading level in document order so IDs match the rendered headings exactly.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const lines = markdown.split('\n');
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of lines) {
    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = HEADING_RE.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = toPlainText(match[2]);
    if (!text) continue;

    // Advance the slugger for every heading so duplicate handling matches
    // rehype-slug, but only surface h2/h3 in the panel.
    const id = slugger.slug(text);
    if (level === 2 || level === 3) {
      items.push({ id, text, level });
    }
  }

  return items;
}
