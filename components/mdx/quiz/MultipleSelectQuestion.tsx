'use client';

import { useState, useEffect } from 'react';
import { MultipleSelectQuestion as MultipleSelectQuestionType } from '@/lib/types/quiz';
import { QuestionExplanation } from './QuestionExplanation';

interface MultipleSelectQuestionProps {
  question: MultipleSelectQuestionType;
  selectedOptionIds: string[];
  onAnswerSelect: (optionId: string) => void;
  showFeedback: boolean;
}

export function MultipleSelectQuestion({
  question,
  selectedOptionIds,
  onAnswerSelect,
  showFeedback,
}: MultipleSelectQuestionProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  // Reset submission state when question changes
  useEffect(() => {
    setHasSubmitted(false);
  }, [question.id]);

  const handleOptionToggle = (optionId: string) => {
    if (hasSubmitted) return;
    onAnswerSelect(optionId);
  };

  const handleSubmit = () => {
    if (selectedOptionIds.length === 0) return;
    setHasSubmitted(true);
  };

  // Check if answer is correct (all correct options selected, no incorrect ones)
  const correctOptionIds = question.options.filter(opt => opt.correct).map(opt => opt.id);
  const isCorrect =
    hasSubmitted &&
    correctOptionIds.length === selectedOptionIds.length &&
    correctOptionIds.every(id => selectedOptionIds.includes(id)) &&
    selectedOptionIds.every(id => correctOptionIds.includes(id));

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {question.question}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Select all that apply
      </p>
      
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionIds.includes(option.id);
          let optionStyles = 'p-4 border-2 rounded-lg cursor-pointer transition-all ';
          
          if (hasSubmitted && showFeedback) {
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
              className={`block ${optionStyles} ${hasSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <input
                type="checkbox"
                name={`question-${question.id}`}
                value={option.id}
                checked={isSelected}
                onChange={() => handleOptionToggle(option.id)}
                disabled={hasSubmitted}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                  isSelected
                    ? hasSubmitted && showFeedback
                      ? option.correct
                        ? 'bg-green-500 border-green-500'
                        : 'bg-red-500 border-red-500'
                      : 'bg-blue-500 border-blue-500'
                    : 'border-gray-400 dark:border-gray-600'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span>{option.text}</span>
                {hasSubmitted && showFeedback && option.correct && (
                  <span className="ml-auto text-green-600 dark:text-green-400 font-semibold">✓</span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {!hasSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={selectedOptionIds.length === 0}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answer
        </button>
      )}

      {hasSubmitted && showFeedback && (
        <QuestionExplanation
          explanation={question.explanation}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
}

