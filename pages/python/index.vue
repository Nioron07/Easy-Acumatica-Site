<template>
  <div>
    <v-container>
      <v-row class="mt-4 mb-8">
        <v-col>
          <h1 class="text-h3 text-primary font-weight-bold">
            Easy-Acumatica for Python
          </h1>
          <div class="text-h6 text-grey-darken-1 font-weight-medium mt-2">
            Version v0.3.7
          </div>
          <p class="mt-4 text-body-1" style="max-width: 800px;">
            Easy-Acumatica is a typed Python wrapper for Acumatica ERP's contract-based REST API. It removes the boilerplate of manual HTTP calls while keeping everything transparent and test-friendly.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="feature in features" :key="feature.title" cols="12" md="6" class="d-flex">
          <v-card class="d-flex flex-column" variant="outlined" elevation="4" style="border-left: 5px solid #1976D2;">
            <v-card-item>
              <div class="d-flex align-center">
                <v-icon :icon="feature.icon" color="primary" size="40" class="mr-4"></v-icon>
                <h2 class="text-h5 font-weight-medium">{{ feature.title }}</h2>
              </div>
            </v-card-item>
            <v-card-text class="flex-grow-1">{{ feature.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      <v-row class="mt-16">
        <v-col cols="12">
            <h2 class="text-h4 font-weight-bold text-center text-primary">Explore the Docs</h2>
        </v-col>
        <v-col
          v-for="card in docCards"
          :key="card.title"
          cols="12"
          sm="6"
          md="4"
          class="d-flex"
        >
          <v-card
            class="flex-grow-1 mx-auto"
            hover
            :to="card.link"
            variant="outlined"
            elevation="8"
            style="border-top: 4px solid #1976D2;"
          >
            <v-card-item class="pa-6">
              <v-card-title class="d-flex align-center text-h6">
                <v-icon :icon="card.icon" class="mr-4" color="primary" size="x-large"></v-icon>
                <span class="font-weight-bold">{{ card.title }}</span>
              </v-card-title>
            </v-card-item>
            <v-card-text class="px-6 pb-6">{{ card.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
    
    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';

// --- SEO & OG Image Configuration ---

// 1. Define the page's primary metadata. This is required.
useSeoMeta({
  title: 'Easy-Acumatica for Python | A REST API Wrapper',
  description: "Official documentation for the Easy-Acumatica Python package. A typed wrapper for Acumatica's contract-based REST API that removes boilerplate and simplifies integration.",
});

// 2. Tell Nuxt OG Image to generate an image for this page.
// It will automatically use the title and description from useSeoMeta
// and pass them as props to your default template (`OgImageTemplate.vue`).
defineOgImage({
  // You can override the props sent to your template here if you want
  // a different title or description just for the image.
  title: 'Easy-Acumatica for Python',
  description: "The official docs for the Python wrapper for Acumatica's REST API.",
});

// --- Page Content Data ---

const features = ref([
  {
    icon: 'mdi-power-plug-outline',
    title: 'Robust API Client',
    description: 'Handles the complete session lifecycle with automatic login/logout. A single, persistent session is used for all API calls, improving efficiency.'
  },
  {
    icon: 'mdi-sitemap',
    title: 'Modular Services',
    description: 'Interact with specific entities through dedicated services like ContactsService, or use the generic RecordsService for any top-level entity.'
  },
  {
    icon: 'mdi-hammer-wrench',
    title: 'Fluent Builders & OData DSL',
    description: 'Construct complex JSON payloads with RecordBuilder and other entity-specific helpers. Create powerful OData queries with a typed, chainable Filter.'
  },
  {
    icon: 'mdi-alert-circle-check-outline',
    title: 'Uniform Error Handling',
    description: 'Meaningful exceptions are raised from Acumatica API errors, converting complex validation messages into readable RuntimeErrors.'
  }
]);

const docCards = ref([
  {
    title: 'Client',
    icon: 'mdi-cog-outline',
    description: 'Learn how to initialize and configure the main client.',
    link: '/python/client'
  },
  {
    title: 'Sub-Services',
    icon: 'mdi-view-grid-outline',
    description: 'Explore the different services for entities like Invoices & Customers.',
    link: '/python/sub-services'
  },
  {
    title: 'Model Builders',
    icon: 'mdi-cube-outline',
    description: 'See how to construct API payloads with our fluent builder classes.',
    link: '/python/models'
  },
]);
</script>