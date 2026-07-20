import fs from 'fs';
import path from 'path';

const SOCIAL_DRAFTS_DIR = path.join(
  process.cwd(),
  'content',
  'blog',
  'drafts',
  '.social',
);

export interface LinkedInDraft {
  text: string;
}

export function getLinkedInDraftPath(slug: string): string {
  return path.join(SOCIAL_DRAFTS_DIR, `${slug}-linkedin.json`);
}

export function loadLinkedInDraft(slug: string): LinkedInDraft | null {
  const draftPath = getLinkedInDraftPath(slug);
  if (!fs.existsSync(draftPath)) {
    return null;
  }

  const raw = fs.readFileSync(draftPath, 'utf-8');
  const parsed = JSON.parse(raw) as LinkedInDraft;

  if (!parsed.text || typeof parsed.text !== 'string') {
    throw new Error(
      `Invalid LinkedIn draft at ${draftPath}: expected { "text": "..." }`,
    );
  }

  return parsed;
}

export function removeLinkedInDraft(slug: string): boolean {
  const draftPath = getLinkedInDraftPath(slug);
  if (!fs.existsSync(draftPath)) {
    return false;
  }
  fs.unlinkSync(draftPath);
  return true;
}
