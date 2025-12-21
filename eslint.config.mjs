import neostandard from 'neostandard'

export default [
  // ==========================
  // Base (Node + TypeScript)
  // ==========================
  ...neostandard({
    files: ['**/*.{js,ts,tsx}'],
  }),

  // ==========================
  // Next.js (somente WEB)
  // ==========================
  ...neostandard({
    files: ['apps/web/**/*.{js,jsx,ts,tsx}'],
    extends: [
      '@rocketseat/eslint-config/next',
      'next/core-web-vitals',
    ],
  }),

  // ==========================
  // Ignorar lixo
  // ==========================
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
