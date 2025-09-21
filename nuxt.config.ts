// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt
  compatibilityDate: '2025-07-15',
  css: ['~/app.css'],
  devtools: { enabled: true },
  ssr: false,

  // Modules
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@vueuse/nuxt', 'nuxt-auth-utils', '@pinia/nuxt'],

  // @nuxt/ui
  ui: {
    fonts: false,
  },

  // @nuxtjs/i18n
  i18n: {
    defaultLocale: 'zh-Hans',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'zh-Hans',
        name: '简体中文',
        file: 'zh-Hans.json',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
    ],
  },
})
