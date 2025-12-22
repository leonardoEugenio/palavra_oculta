import neostandard from 'neostandard'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  // Configuração base para arquivos TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: 'apps/api/tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
  },

  // Aplicar neostandard DEPOIS da configuração do parser
  ...neostandard({
    files: ['**/*.{js,ts,tsx}'],
  }),

  // Configuração específica para o app web
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './apps/web/tsconfig.json',
      },
    },
  },

  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.json',
      'packages/eslint-config/**',
      'packages/typescript-config/**',
    ],
  },
]
