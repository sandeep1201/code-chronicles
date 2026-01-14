import fs from 'fs';
import path from 'path';
import { QuizData } from './types/quiz';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const QUIZZES_DIR = path.join(CONTENT_DIR, 'blog', 'quizzes');

/**
 * Get quiz data by post slug
 * Looks for a file named {slug}-quiz.json in the quizzes directory
 */
export async function getQuizByPostSlug(
  slug: string,
): Promise<QuizData | null> {
  try {
    const quizFilePath = path.join(QUIZZES_DIR, `${slug}-quiz.json`);

    if (!fs.existsSync(quizFilePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(quizFilePath, 'utf-8');
    const quizData = JSON.parse(fileContents) as QuizData;

    // Basic validation
    if (!quizData.id || !quizData.title || !Array.isArray(quizData.questions)) {
      console.error(`Invalid quiz data structure in ${quizFilePath}`);
      return null;
    }

    // Validate questions
    for (const question of quizData.questions) {
      if (
        !question.id ||
        !question.type ||
        !question.question ||
        !Array.isArray(question.options)
      ) {
        console.error(`Invalid question structure in quiz ${quizData.id}`);
        return null;
      }

      // Validate options
      for (const option of question.options) {
        if (!option.id || !option.text || typeof option.correct !== 'boolean') {
          console.error(`Invalid option structure in question ${question.id}`);
          return null;
        }
      }

      // Validate question type
      if (
        !['multiple-choice', 'multiple-select', 'true-false'].includes(
          question.type,
        )
      ) {
        console.error(
          `Invalid question type: ${question.type} in question ${question.id}`,
        );
        return null;
      }

      // Validate multiple-choice has exactly one correct answer
      if (question.type === 'multiple-choice') {
        const correctCount = question.options.filter(
          (opt) => opt.correct,
        ).length;
        if (correctCount !== 1) {
          console.error(
            `Multiple choice question ${question.id} must have exactly one correct answer`,
          );
          return null;
        }
      }

      // Validate true-false has exactly two options
      if (question.type === 'true-false') {
        if (question.options.length !== 2) {
          console.error(
            `True/false question ${question.id} must have exactly two options`,
          );
          return null;
        }
      }
    }

    return quizData;
  } catch (error) {
    console.error(`Error loading quiz for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Check if a quiz exists for a given post slug
 */
export function quizExists(slug: string): boolean {
  const quizFilePath = path.join(QUIZZES_DIR, `${slug}-quiz.json`);
  return fs.existsSync(quizFilePath);
}
