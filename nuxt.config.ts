// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  
  // Add the @nuxtjs/seo module to the modules array
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/seo'
  ],

  // Add the site configuration object
  site: {
    url: 'https://www.easyacumatica.com', // Replace with your production domain
    name: 'Easy-Acumatica Docs',
    description: 'A lightweight wrapper for Acumatica’s contract-based REST API, available for Python and Node.js.',
    defaultLocale: 'en',
  },
ogImage: {
    // You can define global defaults here
    defaults: {
      component: 'OgImageTemplate', // We will create this component next
      width: 1200,
      height: 630,
    }
  },
  devtools: { enabled: true },
  nitro: {
    preset: 'node-server' // Ensure this is set for Node.js server deployment
  },
})