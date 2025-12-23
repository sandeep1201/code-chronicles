import { ReactNode } from 'react';
import { Quiz } from './Quiz';

// Custom MDX components that will be available in all MDX files

interface CalloutProps {
  children: ReactNode
  type?: 'info' | 'warning' | 'success' | 'error'
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-900 dark:text-blue-100',
    warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-500 text-yellow-900 dark:text-yellow-100',
    success: 'bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-100',
    error: 'bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-100',
  };

  return (
    <div className={`my-6 p-4 border-l-4 rounded-r-lg ${styles[type]}`}>
      {children}
    </div>
  );
}

interface CodeBlockProps {
  children: ReactNode
  className?: string
  filename?: string
}

export function CodeBlock({ children, className, filename }: CodeBlockProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      {filename && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
          {filename}
        </div>
      )}
      <pre className={className}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

// Export all custom components that will be available in MDX
export const MDXComponents = {
  // Override default HTML elements
  h1: (props: any) => (
    <h1 
      className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" 
      {...props} 
    />
  ),
  h2: (props: any) => (
    <h2 
      className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" 
      {...props} 
    />
  ),
  h3: (props: any) => (
    <h3 
      className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" 
      {...props} 
    />
  ),
  h4: (props: any) => (
    <h4 
      className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" 
      {...props} 
    />
  ),
  p: (props: any) => (
    <p 
      className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed" 
      {...props} 
    />
  ),
  ul: (props: any) => (
    <ul 
      className="my-4 list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300" 
      {...props} 
    />
  ),
  ol: (props: any) => (
    <ol 
      className="my-4 list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300" 
      {...props} 
    />
  ),
  li: (props: any) => (
    <li 
      className="ml-4" 
      {...props} 
    />
  ),
  blockquote: (props: any) => (
    <blockquote 
      className="my-6 pl-4 border-l-4 border-gray-300 dark:border-gray-700 italic text-gray-700 dark:text-gray-400" 
      {...props} 
    />
  ),
  code: (props: any) => (
    <code 
      className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm text-blue-600 dark:text-blue-400 font-mono" 
      {...props} 
    />
  ),
  pre: (props: any) => (
    <pre 
      className="my-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800" 
      {...props} 
    />
  ),
  a: (props: any) => (
    <a 
      className="text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-gray-100 transition-colors" 
      {...props} 
    />
  ),
  table: (props: any) => (
    <div className="my-6 overflow-x-auto">
      <table 
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-800" 
        {...props} 
      />
    </div>
  ),
  th: (props: any) => (
    <th 
      className="px-4 py-2 bg-gray-50 dark:bg-gray-900 text-left text-sm font-semibold text-gray-900 dark:text-white" 
      {...props} 
    />
  ),
  td: (props: any) => (
    <td 
      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300" 
      {...props} 
    />
  ),
  hr: (props: any) => (
    <hr 
      className="my-8 border-gray-200 dark:border-gray-800" 
      {...props} 
    />
  ),

  // Custom components
  Callout,
  CodeBlock,
  Quiz,
};

