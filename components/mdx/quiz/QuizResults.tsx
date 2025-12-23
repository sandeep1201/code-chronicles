'use client';

import { Question } from '@/lib/types/quiz';

interface QuizResultsProps {
  questions: Question[];
  answers: Map<string, string[]>;
  onRetry: () => void;
}

export function QuizResults({ questions, answers, onRetry }: QuizResultsProps) {
  const calculateScore = () => {
    let correct = 0;
    
    questions.forEach((question) => {
      const selectedIds = answers.get(question.id) || [];
      const correctIds = question.options.filter(opt => opt.correct).map(opt => opt.id);
      
      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        // Single answer - must match exactly
        if (selectedIds.length === 1 && correctIds.includes(selectedIds[0])) {
          correct++;
        }
      } else if (question.type === 'multiple-select') {
        // Multiple select - must have all correct and no incorrect
        if (
          correctIds.length === selectedIds.length &&
          correctIds.every(id => selectedIds.includes(id)) &&
          selectedIds.every(id => correctIds.includes(id))
        ) {
          correct++;
        }
      }
    });
    
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const { correct, total, percentage } = calculateScore();

  const getQuestionResult = (question: Question) => {
    const selectedIds = answers.get(question.id) || [];
    const correctIds = question.options.filter(opt => opt.correct).map(opt => opt.id);
    
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      return selectedIds.length === 1 && correctIds.includes(selectedIds[0]);
    } else {
      return (
        correctIds.length === selectedIds.length &&
        correctIds.every(id => selectedIds.includes(id)) &&
        selectedIds.every(id => correctIds.includes(id))
      );
    }
  };

  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Quiz Results
      </h2>
      
      <div className="mb-6">
        <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          {correct} / {total}
        </div>
        <div className="text-lg text-gray-600 dark:text-gray-400">
          {percentage}% Correct
        </div>
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              percentage >= 80
                ? 'bg-green-500'
                : percentage >= 60
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {questions.map((question, index) => {
          const isCorrect = getQuestionResult(question);
          const selectedIds = answers.get(question.id) || [];
          const correctIds = question.options.filter(opt => opt.correct).map(opt => opt.id);
          
          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg border-2 ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-950 border-green-500'
                  : 'bg-red-50 dark:bg-red-950 border-red-500'
              }`}
            >
              <div className="flex items-start mb-2">
                <span className="font-semibold mr-2 text-gray-900 dark:text-white">
                  Q{index + 1}:
                </span>
                <span className="text-gray-900 dark:text-white">{question.question}</span>
                <span className={`ml-auto font-semibold ${
                  isCorrect
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
              </div>
              
              <div className="ml-6 mt-2 text-sm">
                <div className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Your answer:</span>{' '}
                  {selectedIds.length > 0
                    ? question.options
                        .filter(opt => selectedIds.includes(opt.id))
                        .map(opt => opt.text)
                        .join(', ')
                    : 'No answer selected'}
                </div>
                {!isCorrect && (
                  <div className="text-green-700 dark:text-green-300 mt-1">
                    <span className="font-medium">Correct answer:</span>{' '}
                    {question.options
                      .filter(opt => correctIds.includes(opt.id))
                      .map(opt => opt.text)
                      .join(', ')}
                  </div>
                )}
                {question.explanation && (
                  <div className="mt-2 text-gray-600 dark:text-gray-400 italic">
                    {question.explanation}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRetry}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Retry Quiz
      </button>
    </div>
  );
}

