import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const CHALLENGES_DIR = path.join(CONTENT_DIR, 'challenges');

export interface Challenge {
  slug: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concepts: string[];
  featured?: boolean;
  blogPostSlug?: string; // Link to blog post if exists
  addedAt?: string;
  tags?: string[];
}

/**
 * Get all challenges from the challenges directory
 */
export async function getAllChallenges(): Promise<Challenge[]> {
  const challengesPath = path.join(CHALLENGES_DIR);

  // Create directory if it doesn't exist
  if (!fs.existsSync(challengesPath)) {
    fs.mkdirSync(challengesPath, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(challengesPath);
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  const challenges: Challenge[] = [];

  for (const file of jsonFiles) {
    try {
      const filePath = path.join(challengesPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const challenge = JSON.parse(fileContents) as Challenge;

      // Validate challenge structure
      if (!challenge.slug || !challenge.title || !challenge.description) {
        console.error(`Invalid challenge structure in ${filePath}`);
        continue;
      }

      challenges.push(challenge);
    } catch (error) {
      console.error(`Error reading challenge file ${file}:`, error);
    }
  }

  // Sort by featured first, then by addedAt (newest first)
  challenges.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    if (a.addedAt && b.addedAt) {
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }

    return 0;
  });

  return challenges;
}

/**
 * Get a challenge by slug
 */
export async function getChallengeBySlug(
  slug: string,
): Promise<Challenge | null> {
  const challenges = await getAllChallenges();
  return challenges.find((c) => c.slug === slug) || null;
}
