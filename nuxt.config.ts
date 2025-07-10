// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  nitro: {
    preset: 'node-server' // Ensure this is set for Node.js server deployment
  },
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module'
  ],
})
