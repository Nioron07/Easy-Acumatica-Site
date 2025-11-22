// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  // Add the @nuxtjs/seo module to the modules array
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap', // Keep this
    '@nuxtjs/robots',
    'nuxt-gtag'  // Keep this
  ],

  // Add the site configuration object
  site: {
    url: 'https://easyacumatica.com', // Production domain (non-www, redirects from www)
    name: 'Easy-Acumatica Docs',
    description: 'A lightweight wrapper for Acumatica contract-based REST API, available for Python and Node.js.',
    defaultLocale: 'en',
  },
  gtag: {
    id: 'G-CYQE1J3RH4'
  },
  ogImage: {
    defaults: {
      component: 'OgImageTemplate',
      width: 1280,
      height: 640,
    }
  },
  devtools: { enabled: true },
  sitemap: {
    xsl: false, // Disable XSL stylesheet to prevent cross-origin errors
  },
  nitro: {
    preset: 'node-server', // Ensure this is set for Node.js server deployment
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/python',
        '/python/quickstart',
        '/python/installation',
        '/python/client',
        '/python/model-factory',
        '/python/service-factory',
        '/python/batching',
        '/python/task-scheduler',
        '/python/generic-inquiries',
        '/python/odata/filters',
        '/python/odata/queryoptions',
        '/npm',
        '/orbu',
        '/orbu/setup',
        '/orbu/clients',
        '/orbu/models',
        '/orbu/services',
        '/orbu/endpoints',
        '/about'
      ]
    }
  },
})