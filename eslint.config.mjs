// ESLint 9 flat config for Next.js 16
// Note: Next.js 16 eslint-config-next uses CommonJS exports
// We need to import them as default exports

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  // Ignore patterns
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      'next-env.d.ts',
      '.env*.local',
    ],
  },
  // Spread Next.js configs (they export arrays)
  ...nextCoreWebVitals,
  ...nextTypeScript,
  // Disable ESLint rules that conflict with Prettier
  prettierConfig,
  // Additional rules override
  {
    rules: {
      // Code style - Let Prettier handle formatting
      // Removed quotes, semi, comma-dangle, max-len, object-curly-spacing, 
      // array-bracket-spacing, arrow-spacing - Prettier handles these
      
      // Code quality rules (not formatting)
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      
      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/function-component-definition': ['error', {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      }],
      'react/self-closing-comp': ['error', {
        component: true,
        html: true,
      }],
      'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never',
      }],
      'react/no-unescaped-entities': ['error', {
        forbid: ['>', '}'],
      }],
      
      // Next.js
      '@next/next/no-html-link-for-pages': 'error',
      
      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Accessibility
      'jsx-a11y/anchor-is-valid': 'warn',
    },
  },
];

export default eslintConfig;
