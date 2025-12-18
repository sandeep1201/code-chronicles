import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import reactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  // Airbnb-style rules configuration
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // Airbnb: Use single quotes for strings
      quotes: ['error', 'single', { avoidEscape: true }],
      
      // Airbnb: Semicolons (enforce but allow flexibility)
      semi: ['error', 'always', { omitLastInOneLineBlock: true }],
      
      // Airbnb: Indentation (2 spaces) - disabled for JSX/TSX (let Prettier/editor handle it)
      indent: 'off',
      
      // Airbnb: No trailing commas in objects/arrays (unless multiline)
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      }],
      
      // Airbnb: Max line length (more lenient for readability)
      'max-len': ['warn', {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
      }],
      
      // Airbnb: Prefer const over let
      'prefer-const': 'error',
      
      // Airbnb: No var
      'no-var': 'error',
      
      // Airbnb: Object curly spacing
      'object-curly-spacing': ['error', 'always'],
      
      // Airbnb: Array bracket spacing
      'array-bracket-spacing': ['error', 'never'],
      
      // Airbnb: Arrow function spacing
      'arrow-spacing': ['error', { before: true, after: true }],
      
      // Airbnb: Prefer arrow functions for callbacks
      'prefer-arrow-callback': 'error',
      
      // Airbnb: No unused variables
      'no-unused-vars': 'off', // Turned off because @typescript-eslint handles this
      
      // React: JSX filename extension - allow .tsx and .jsx
      'react/jsx-filename-extension': ['error', {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }],
      
      // React: No need for React in scope (Next.js handles this)
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      
      // React: Prop types (not needed with TypeScript)
      'react/prop-types': 'off',
      
      // React: Prefer function declarations for components
      'react/function-component-definition': ['error', {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      }],
      
      // React: Self-closing tags
      'react/self-closing-comp': ['error', {
        component: true,
        html: true,
      }],
      
      // React: One expression per line (Airbnb style, but warn only)
      'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
      
      // React: Curly brace presence (Airbnb style)
      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never',
      }],
      
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // JSX Accessibility (already configured by nextVitals, just override specific rules)
      'jsx-a11y/anchor-is-valid': 'warn', // Next.js Link component uses <a>
      
      // TypeScript: Already handled by nextTs
    },
  },
]);

export default eslintConfig;
