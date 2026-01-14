/**
 * Type definitions for quiz data structures
 */

export interface QuestionOption {
  id: string;
  text: string;
  correct: boolean;
}

export type QuestionType = 'multiple-choice' | 'multiple-select' | 'true-false';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options: QuestionOption[];
  explanation?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
}

export interface MultipleSelectQuestion extends BaseQuestion {
  type: 'multiple-select';
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
}

export type Question =
  | MultipleChoiceQuestion
  | MultipleSelectQuestion
  | TrueFalseQuestion;

export interface QuizData {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionIds: string[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Map<string, string[]>; // questionId -> selected optionIds
  showResults: boolean;
  isComplete: boolean;
}
