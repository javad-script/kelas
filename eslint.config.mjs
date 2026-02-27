import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import tsEslint from 'typescript-eslint';

// ← این خط رو اضافه کن

export default tsEslint.config(
  ...tsEslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
      import: importPlugin,
      'react-hooks': reactHooks, // ← اینجا استفاده کن
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'no-console': 'warn',
      eqeqeq: ['error', 'always'],

      'import/order': 'off',
    },
  },
  {
    ignores: ['.next/**', 'dist/**', 'build/**', 'out/**', 'node_modules/**'],
  },
);
