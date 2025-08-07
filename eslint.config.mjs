// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: [
    '.next/**',
    '.next/*',
    'out/**',
    'build/**',
    'node_modules/**',
    '*.tsbuildinfo',
    'next-env.d.ts',
    '.vercel/**',
    'coverage/**',
    'drizzle/**',
    'src/generated/**',
  ],
})
