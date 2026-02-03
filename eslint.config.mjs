import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Best practices
      'no-console': 'warn',
      'no-debugger': 'warn',
      eqeqeq: ['error', 'always'],

      // Formatting / Style
      semi: ['error', 'always'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2],

      // React hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
