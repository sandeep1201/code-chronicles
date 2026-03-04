#!/usr/bin/env tsx
/**
 * Generates blog post thumbnails (Addy Osmani style: black bg, white serif text).
 * Output: public/blog/{slug}.png
 * Run: npm run generate-blog-images
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sharp from 'sharp';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');
const OUTPUT_DIR = path.join(process.cwd(), 'public/blog');
const WIDTH = 1200;
const HEIGHT = 630;
const MAX_CHARS_PER_LINE = 35;
const FONT_SIZE = 56;
const LINE_HEIGHT = 72;
const MAX_SUMMARY_WORDS = 5;

/**
 * Summarizes the title for the thumbnail to avoid duplicating the full title
 * shown in the card. Uses the part after ":" if present, else first N words.
 */
function summarizeForImage(title: string): string {
  const afterColon = title.includes(':')
    ? title.split(':').slice(1).join(':').trim()
    : title;
  const words = afterColon.split(/\s+/).filter(Boolean);
  if (words.length <= MAX_SUMMARY_WORDS) return afterColon;
  return words.slice(0, MAX_SUMMARY_WORDS).join(' ') + '…';
}

function wrapText(title: string): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= MAX_CHARS_PER_LINE) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word.length > MAX_CHARS_PER_LINE ? word.slice(0, MAX_CHARS_PER_LINE) : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createSvg(title: string): string {
  const lines = wrapText(title);
  const escapedLines = lines.map(escapeXml);

  const totalHeight = lines.length * LINE_HEIGHT;
  const startY = (HEIGHT - totalHeight) / 2 + LINE_HEIGHT * 0.8;

  const tspans = escapedLines
    .map(
      (line, i) =>
        `<tspan x="50%" dy="${i === 0 ? 0 : LINE_HEIGHT}" text-anchor="middle">${line}</tspan>`,
    )
    .join('\n    ');

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#000"/>
  <text
    x="50%"
    y="${startY}"
    fill="#fff"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${FONT_SIZE}"
    font-weight="bold"
    text-anchor="middle"
  >
    ${tspans}
  </text>
</svg>`;
}

async function generateImage(slug: string, title: string): Promise<void> {
  const summary = summarizeForImage(title);
  const svg = createSvg(summary);
  const outPath = path.join(OUTPUT_DIR, `${slug}.png`);

  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .png()
    .toFile(outPath);

  console.log(`  ✓ ${slug}.png`);
}

async function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('Content directory not found:', CONTENT_DIR);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = fs.readdirSync(CONTENT_DIR);
  const mdxFiles = files.filter(
    (f) => (f.endsWith('.mdx') || f.endsWith('.md')) && !f.startsWith('.'),
  );

  let count = 0;
  for (const file of mdxFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(source);
    const { title, slug, draft } = data as {
      title?: string;
      slug?: string;
      draft?: boolean;
    };

    if (draft === true) continue;
    const s = slug ?? file.replace(/\.(mdx|md)$/, '');
    const t = title ?? s;

    await generateImage(s, t);
    count++;
  }

  console.log(`\nGenerated ${count} thumbnails in ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
