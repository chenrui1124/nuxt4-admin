// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt
  compatibilityDate: '2025-07-15',
  css: ['~/app.css'],
  devtools: { enabled: true },

  // Modules
  modules: ['@nuxt/ui'],

  // @nuxt/ui
  ui: {
    fonts: false,
  },
})
