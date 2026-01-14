'use client';

import { useState, useEffect } from 'react';
import { QuizData } from '@/lib/types/quiz';
import { MultipleChoiceQuestion } from './quiz/MultipleChoiceQuestion';
import { MultipleSelectQuestion } from './quiz/MultipleSelectQuestion';
import { TrueFalseQuestion } from './quiz/TrueFalseQuestion';
import { QuizProgress } from './quiz/QuizProgress';
import { QuizResults } from './quiz/QuizResults';

interface QuizProps {
  quizId: string;
  title?: string;
  showProgress?: boolean;
}

export function Quiz({ quizId, title, showProgress = true }: QuizProps) {
  console.log('Quiz component rendering, quizId:', quizId); // Immediate render log

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string[]>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Track when component is mounted on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      console.log('Quiz component mounted, quizId:', quizId);
    }
  }, [quizId]);

  // Load quiz data after component is mounted
  useEffect(() => {
    if (!mounted) return;

    let isMounted = true;

    async function loadQuiz() {
      try {
        console.log('Loading quiz for:', quizId);
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/quiz/${quizId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!isMounted) return;

        console.log('Quiz API response status:', response.status);

        if (!response.ok) {
          if (response.status === 404) {
            setError(`Quiz not found for post: ${quizId}`);
          } else {
            try {
              const errorText = await response.text();
              console.error('Quiz API error:', response.status, errorText);
            } catch (e) {
              console.error('Quiz API error:', response.status);
            }
            setError('Failed to load quiz');
          }
          if (isMounted) setLoading(false);
          return;
        }

        const data = await response.json();

        if (!isMounted) return;

        console.log('Quiz data loaded:', data?.id);

        if (!data || !data.questions) {
          console.error('Invalid quiz data:', data);
          if (isMounted) {
            setError('Invalid quiz data format');
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setQuizData(data);
          setLoading(false);
          console.log('Quiz loaded successfully');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error loading quiz:', err);
        setError('Failed to load quiz. Please refresh the page.');
        setLoading(false);
      }
    }

    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      loadQuiz();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [quizId, mounted]);

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    const question = quizData?.questions.find((q) => q.id === questionId);
    if (!question) return;

    // Create a new Map to ensure React detects the state change
    const newAnswers = new Map(answers);

    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      // Single selection
      newAnswers.set(questionId, [optionId]);
    } else if (question.type === 'multiple-select') {
      // Toggle selection
      const currentSelections = answers.get(questionId) || [];
      const newSelections = currentSelections.includes(optionId)
        ? currentSelections.filter((id) => id !== optionId)
        : [...currentSelections, optionId];
      newAnswers.set(questionId, newSelections);
    }

    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (!quizData) return;

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setShowResults(false);
  };

  const canProceed = () => {
    if (!quizData) return false;
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedIds = answers.get(currentQuestion.id) || [];

    if (currentQuestion.type === 'multiple-select') {
      // For multiple select, user needs to submit (handled in component)
      return selectedIds.length > 0;
    }
    return selectedIds.length > 0;
  };

  // Show initializing state until mounted (prevents hydration mismatch)
  // Always render something visible to debug
  if (!mounted) {
    return (
      <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg border-2 border-blue-500 dark:border-blue-400">
        <div className="text-center text-blue-900 dark:text-blue-100 font-semibold">
          🧩 Initializing quiz...
        </div>
        <div className="text-center text-xs text-blue-700 dark:text-blue-300 mt-2">
          Quiz ID: {quizId}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="my-8 p-6 bg-yellow-50 dark:bg-yellow-900 rounded-lg border-2 border-yellow-500 dark:border-yellow-400">
        <div className="text-center text-yellow-900 dark:text-yellow-100 font-semibold">
          ⏳ Loading quiz...
        </div>
        <div className="text-center text-xs text-yellow-700 dark:text-yellow-300 mt-2">
          Quiz ID: {quizId}
        </div>
      </div>
    );
  }

  if (error || !quizData) {
    return (
      <div className="my-8 p-6 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-500">
        <div className="text-yellow-900 dark:text-yellow-100">
          {error || 'Quiz not available for this post.'}
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {title || quizData.title}
        </h2>
        {quizData.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {quizData.description}
          </p>
        )}
        <QuizResults
          questions={quizData.questions}
          answers={answers}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const selectedIds = answers.get(currentQuestion.id) || [];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {title || quizData.title}
      </h2>
      {quizData.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {quizData.description}
        </p>
      )}

      {showProgress && (
        <QuizProgress
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizData.questions.length}
        />
      )}

      <div className="my-6">
        {currentQuestion.type === 'multiple-choice' && (
          <MultipleChoiceQuestion
            question={currentQuestion}
            selectedOptionId={selectedIds[0] || null}
            onAnswerSelect={(optionId) =>
              handleAnswerSelect(currentQuestion.id, optionId)
            }
            showFeedback={true}
          />
        )}

        {currentQuestion.type === 'multiple-select' && (
          <MultipleSelectQuestion
            question={currentQuestion}
            selectedOptionIds={selectedIds}
            onAnswerSelect={(optionId) =>
              handleAnswerSelect(currentQuestion.id, optionId)
            }
            showFeedback={true}
          />
        )}

        {currentQuestion.type === 'true-false' && (
          <TrueFalseQuestion
            question={currentQuestion}
            selectedOptionId={selectedIds[0] || null}
            onAnswerSelect={(optionId) =>
              handleAnswerSelect(currentQuestion.id, optionId)
            }
            showFeedback={true}
          />
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <button
          onClick={handleNextQuestion}
          disabled={!canProceed()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLastQuestion ? 'View Results' : 'Next'}
        </button>
      </div>
    </div>
  );
}
