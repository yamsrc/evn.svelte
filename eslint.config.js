import ts from 'typescript-eslint'
import neostandard from 'neostandard'
import globals from 'globals'
import unusedImports from 'eslint-plugin-unused-imports'
import svelte from 'eslint-plugin-svelte'
import importPlugin from 'eslint-plugin-import'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  ...neostandard({
    ignores: [
      '.svelte-kit',
      'src/lib/components/ui',
      '**/*.min.js',
      'src/**/intl/**/*',
      ...neostandard.resolveIgnoresFromGitignore(),
    ],
    ts: true,
  }),
  {
    plugins: {
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
      'unused-imports': unusedImports,
    },
  },
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parserOptions: {
        parser: ts.parser,
        svelteFeatures: {
          experimentalGenerics: true,
        },
      },
    },
  },
  {
    rules: {
      'no-void': ['off'],
      curly: ['error', 'multi'],
      'no-console': ['error', { allow: ['info', 'debug', 'warn', 'error'] }],
      'no-implicit-coercion': 'error',
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/space-before-function-paren': ['error', {
        asyncArrow: 'always',
        named: 'never',
        anonymous: 'never',
      }],
      'arrow-parens': ['error', 'always'],
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        }],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['block-like', 'if', 'multiline-expression'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['block-like', 'if', 'multiline-expression'],
        },
        {
          blankLine: 'always',
          prev: ['const', 'let'],
          next: ['expression', 'for'],
        },
        {
          blankLine: 'always',
          prev: 'expression',
          next: ['const', 'let'],
        },
        {
          blankLine: 'always',
          prev: ['multiline-const', 'multiline-let'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['multiline-const', 'multiline-let'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'break',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'continue',
        },
      ],
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index', 'type'],
        alphabetize: {
          order: 'desc',
        },
      }],
      'import-x/no-duplicates': 'off', // stupid shit doesn't work
      'no-warning-comments': ['error', {
        terms: ['todo', 'fixme'],
        location: 'anywhere',
      }],
      'import/newline-after-import': ['error', { count: 1 }],
      'svelte/no-navigation-without-resolve': 'off',
    },
  },
  {
    files: ['src/**/*.ts', 'features/**/*.ts'],
    ignores: ['src/service-worker.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/strict-boolean-expressions': ['error', {
        allowNullableObject: false,
        allowNumber: false,
        allowString: false,
      }],
    },
  },
]
