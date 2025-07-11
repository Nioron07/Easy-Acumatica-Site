<template>
  <v-container fluid class="pa-0">
    <v-row 
      justify="center" 
      align="center" 
      class="text-center py-16"
      style="background: linear-gradient(45deg, #1976D2 30%, #64B5F6 90%); color: white;"
    >
      <v-col cols="12" md="10">
        <v-card color="white" class="rounded-lg pa-4" width="fit-content" style="justify-self: center;" elevation="20">
        <v-img
          src="../assets/LargeEasyAcumaticaLogo.png"
          alt="Easy Acumatica Logo"
          height="250"
          width="600"
        ></v-img></v-card>
        <p class="text-h6 font-weight-regular mt-4 mx-auto" style="max-width: 700px;">
          A lightweight wrapper for Acumatica’s contract-based REST API, available for Python and Node.js.
        </p>

        <v-row justify="center" class="mt-16">
          <v-col cols="12" md="4">
            <v-card hover elevation="12" class="pa-4" to="/python">
              <v-card-item class="text-center">
                <v-icon size="80" color="#3776AB" class="mb-4">mdi-language-python</v-icon>
                <v-card-title class="text-h4 font-weight-medium text-blue-darken-4">
                  Python Docs
                </v-card-title>
                <v-card-subtitle>View the documentation for the PyPI package.</v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card hover elevation="12" class="pa-4" to="/npm/home">
              <v-card-item class="text-center">
                <v-icon size="80" color="#CB3837" class="mb-4">mdi-npm</v-icon>
                <v-card-title class="text-h4 font-weight-medium text-red-darken-4">
                  NPM Docs
                </v-card-title>
                <v-card-subtitle>View the documentation for the NPM package.</v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center" class="py-16">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="text-h4 font-weight-bold mb-4 text-primary">What is easy-acumatica?</h2>
        <p class="body-1 text-grey-darken-3" style="font-size: 1.1rem; line-height: 1.8;">
          This package handles the complexities of Acumatica's REST API—like session management, URL building, and OData querying—so you can focus on your business logic. It provides a clean, object-oriented interface with fluent "builder" classes to make your integration code simple, readable, and maintainable.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" class="py-16 bg-blue-lighten-5">
       <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold text-primary">Why Use This Package?</h2>
        </v-col>
      <v-col
        v-for="benefit in benefits"
        :key="benefit.title"
        cols="12"
        sm="6"
        md="4"
        class="d-flex me-1"
      >
        <v-card class="text-center pa-6 flex-grow-1" variant="outlined" elevation="8" style="border-top: 4px solid #1976D2;">
          <v-icon :icon="benefit.icon" size="60" color="primary" class="mb-5"></v-icon>
          <h3 class="text-h6 font-weight-bold mb-2">{{ benefit.title }}</h3>
          <p class="body-2 text-grey-darken-3">{{ benefit.description }}</p>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { ref } from 'vue';

// Tell Nuxt to use the 'landing' layout for this page (no sidebar)
definePageMeta({
  layout: 'landing',
});

// --- SEO & OG Image Configuration ---

// 1. Define the primary SEO metadata for the homepage.
useSeoMeta({
  title: 'Easy-Acumatica | Python & JS Wrappers for the Acumatica REST API',
  description: 'The official documentation for Easy-Acumatica, a lightweight wrapper for Acumatica’s contract-based REST API, available for both Python and Node.js.',
  ogTitle: 'Easy-Acumatica | Python & JS REST API Wrappers',
  ogDescription: 'Simplify your Acumatica integration with a lightweight wrapper that handles sessions, OData queries, and payload creation for you.',
  // It's best to have a dedicated, high-quality static image for your main homepage.
  ogImage: '/social-images/home.png',
  twitterCard: 'summary_large_image',
});

// 2. Since this is the main landing page, we won't use the dynamic generator.
// Instead, you should create a high-quality static image named `home.png`
// and place it in your `public/social-images/` directory.

// --- Page Content Data ---

const benefits = ref([
  {
    icon: 'mdi-cogs',
    title: 'Automated Session',
    description: 'Handles login, logout, and cookie management automatically.'
  },
  {
    icon: 'mdi-lan',
    title: 'Typed Sub-Services',
    description: 'Access API endpoints like `client.contacts` or `client.payments` with dedicated methods.'
  },
  {
    icon: 'mdi-shield-check-outline',
    title: 'Fluent Builders',
    description: 'Construct complex JSON payloads with chainable, readable methods.'
  },
  {
    icon: 'mdi-filter-variant',
    title: 'Powerful Querying',
    description: 'Easily build OData filters, selections, and expansions.'
  }
]);
</script>
<style scoped>
.flex-grow-1 {
  flex-grow: 1;
}
</style>