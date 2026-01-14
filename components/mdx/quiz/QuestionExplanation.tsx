'use client';

import { ReactNode } from 'react';

interface QuestionExplanationProps {
  explanation?: string;
  isCorrect: boolean;
  children?: ReactNode;
}

export function QuestionExplanation({
  explanation,
  isCorrect,
  children,
}: QuestionExplanationProps) {
  if (!explanation && !children) {
    return null;
  }

  const styles = isCorrect
    ? 'bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-100'
    : 'bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-100';

  return (
    <div className={`my-4 p-4 border-l-4 rounded-r-lg ${styles}`}>
      <div className="font-semibold mb-2">
        {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
      </div>
      {explanation && (
        <div className="text-sm leading-relaxed">{explanation}</div>
      )}
      {children}
    </div>
  );
}
