import importPlugin from 'eslint-plugin-import'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import neostandard from 'neostandard'
import ts from 'typescript-eslint'

export default [
  ...neostandard({
    ignores: [
      '.svelte-kit',
      'src/lib/components/ui',
      '**/*.min.js',
      'src/lib/intl/*',
      ...neostandard.resolveIgnoresFromGitignore(),
    ],
    ts: true,
  }),
  {
    plugins: {
      import: importPlugin,
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
      'no-void': ['error', { allowAsStatement: true }],
      curly: ['error', 'multi'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/space-before-function-paren': ['error', {
        asyncArrow: 'always',
        named: 'never',
        anonymous: 'never',
      }],
      'arrow-parens': ['error', 'always'],
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
          order: 'asc',
        },
      }],
      'no-warning-comments': ['error', {
        terms: ['todo', 'fixme'],
        location: 'anywhere',
      }],
      'import/newline-after-import': ['error', { count: 1 }],
      'svelte/no-navigation-without-resolve': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]
