// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  
  // Add the @nuxtjs/seo module to the modules array
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap', // Keep this
    '@nuxtjs/robots',  // Keep this
  ],

  // Add the site configuration object
  site: {
    url: 'https://easyacumatica.com', // Replace with your production domain
    name: 'Easy-Acumatica Docs',
    description: 'A lightweight wrapper for Acumatica’s contract-based REST API, available for Python and Node.js.',
    defaultLocale: 'en',
  },
ogImage: {
    defaults: {
      component: 'OgImageTemplate', 
      width: 1280,
      height: 640,
    }
  },
  devtools: { enabled: true },
  nitro: {
    preset: 'node-server' // Ensure this is set for Node.js server deployment
  },
})