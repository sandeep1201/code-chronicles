'use client';

import { useState } from 'react';
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '@/lib/types/quiz';
import { QuestionExplanation } from './QuestionExplanation';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  selectedOptionId: string | null;
  onAnswerSelect: (optionId: string) => void;
  showFeedback: boolean;
}

export function MultipleChoiceQuestion({
  question,
  selectedOptionId,
  onAnswerSelect,
  showFeedback,
}: MultipleChoiceQuestionProps) {
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

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {question.question}
      </h3>
      
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let optionStyles = 'p-4 border-2 rounded-lg cursor-pointer transition-all ';
          
          if (hasAnswered && showFeedback) {
            if (option.correct) {
              optionStyles += 'bg-green-100 dark:bg-green-900 border-green-500 text-green-900 dark:text-green-100';
            } else if (isSelected && !option.correct) {
              optionStyles += 'bg-red-100 dark:bg-red-900 border-red-500 text-red-900 dark:text-red-100';
            } else {
              optionStyles += 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 opacity-60';
            }
          } else {
            optionStyles += isSelected
              ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-900 dark:text-blue-100'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-blue-400 dark:hover:border-blue-600';
          }

          return (
            <label
              key={option.id}
              className={`block ${optionStyles} ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.id}
                checked={isSelected}
                onChange={() => handleOptionClick(option.id)}
                disabled={hasAnswered}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  isSelected
                    ? hasAnswered && showFeedback
                      ? option.correct
                        ? 'bg-green-500 border-green-500'
                        : 'bg-red-500 border-red-500'
                      : 'bg-blue-500 border-blue-500'
                    : 'border-gray-400 dark:border-gray-600'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span>{option.text}</span>
                {hasAnswered && showFeedback && option.correct && (
                  <span className="ml-auto text-green-600 dark:text-green-400 font-semibold">✓</span>
                )}
              </div>
            </label>
          );
        })}
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

