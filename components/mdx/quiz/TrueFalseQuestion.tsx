'use client';

import { useState } from 'react';
import { TrueFalseQuestion as TrueFalseQuestionType } from '@/lib/types/quiz';
import { QuestionExplanation } from './QuestionExplanation';

interface TrueFalseQuestionProps {
  question: TrueFalseQuestionType;
  selectedOptionId: string | null;
  onAnswerSelect: (optionId: string) => void;
  showFeedback: boolean;
}

export function TrueFalseQuestion({
  question,
  selectedOptionId,
  onAnswerSelect,
  showFeedback,
}: TrueFalseQuestionProps) {
  // Derive hasAnswered from selectedOptionId to ensure it resets when question changes
  const hasAnswered = selectedOptionId !== null;

  const handleOptionClick = (optionId: string) => {
    if (hasAnswered) return;
    
    onAnswerSelect(optionId);
  };

  const selectedOption = selectedOptionId
    ? question.options.find(opt => opt.id === selectedOptionId)
    : null;
  const isCorrect = selectedOption?.correct ?? false;

  const trueOption = question.options.find(opt => opt.id === 'true' || opt.text.toLowerCase() === 'true');
  const falseOption = question.options.find(opt => opt.id === 'false' || opt.text.toLowerCase() === 'false');

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {question.question}
      </h3>
      
      <div className="flex gap-4">
        {trueOption && (
          <button
            onClick={() => handleOptionClick(trueOption.id)}
            disabled={hasAnswered}
            className={`flex-1 p-6 border-2 rounded-lg font-semibold text-lg transition-all ${
              hasAnswered && showFeedback
                ? trueOption.correct
                  ? 'bg-green-100 dark:bg-green-900 border-green-500 text-green-900 dark:text-green-100'
                  : selectedOptionId === trueOption.id
                    ? 'bg-red-100 dark:bg-red-900 border-red-500 text-red-900 dark:text-red-100'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 opacity-60'
                : selectedOptionId === trueOption.id
                  ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-900 dark:text-blue-100'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-blue-400 dark:hover:border-blue-600'
            } ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {trueOption.text}
          </button>
        )}
        
        {falseOption && (
          <button
            onClick={() => handleOptionClick(falseOption.id)}
            disabled={hasAnswered}
            className={`flex-1 p-6 border-2 rounded-lg font-semibold text-lg transition-all ${
              hasAnswered && showFeedback
                ? falseOption.correct
                  ? 'bg-green-100 dark:bg-green-900 border-green-500 text-green-900 dark:text-green-100'
                  : selectedOptionId === falseOption.id
                    ? 'bg-red-100 dark:bg-red-900 border-red-500 text-red-900 dark:text-red-100'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 opacity-60'
                : selectedOptionId === falseOption.id
                  ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-900 dark:text-blue-100'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-blue-400 dark:hover:border-blue-600'
            } ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {falseOption.text}
          </button>
        )}
      </div>

      {hasAnswered && showFeedback && (
        <QuestionExplanation
          explanation={question.explanation}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
}

