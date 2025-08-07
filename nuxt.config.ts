import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  alias: {
    '#server': fileURLToPath(new URL('./server', import.meta.url)),
  },

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/test-utils'],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['@/assets/css/main.css'],
})
