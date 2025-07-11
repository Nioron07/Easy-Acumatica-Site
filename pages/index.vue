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
          ></v-img>
        </v-card>
        <h1 class="text-h3 font-weight-bold mt-8" style="color: white;">
          Easy-Acumatica: Simplify Your Acumatica API Integrations
        </h1>
        <p class="text-h6 font-weight-regular mt-4 mx-auto" style="max-width: 700px;">
          A lightweight wrapper for Acumatica’s contract-based REST API, available for Python and Node.js.
        </p>

        <v-row justify="center" class="mt-16">
          <v-col cols="12" md="5">
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
          <v-col cols="12" md="5">
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
        <h2 class="text-h4 font-weight-bold mb-4 text-primary">What is Easy-Acumatica?</h2>
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

    <v-row justify="center" class="py-16">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h4 font-weight-bold text-primary">Get Started Quickly</h2>
        <p class="text-body-1 text-grey-darken-3 mt-4 mx-auto" style="max-width: 700px;">
          Jump right into integrating with Acumatica using our step-by-step guides.
        </p>
      </v-col>
      <v-col cols="20" sm="10" md="5" class="d-flex">
        <v-card hover elevation="8" class="pa-6 flex-grow-1" to="/python/installation" style="border-top: 4px solid #1e89e3;">
          <v-card-item class="text-center">
            <v-icon size="60" color="blue-darken-1" class="mb-4">mdi-language-python</v-icon>
            <v-card-title class="text-h5 font-weight-medium">
              Python Installation
            </v-card-title>
            <v-card-subtitle>Set up the Python package (PyPI).</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="20" sm="10" md="5" class="d-flex">
        <v-card hover elevation="8" class="pa-6 flex-grow-1" to="/python/quickstart" style="border-top: 4px solid #41a243;">
          <v-card-item class="text-center">
            <v-icon size="60" color="green-darken-1" class="mb-4">mdi-rocket-launch</v-icon>
            <v-card-title class="text-h5 font-weight-medium">
              Python Quickstart
            </v-card-title>
            <v-card-subtitle>Learn the fundamental Python workflow in minutes.</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="20" sm="10" md="5" class="d-flex">
        <v-card hover elevation="8" class="pa-6 flex-grow-1" to="/npm" style="border-top: 4px solid #e2584d;">
          <v-card-item class="text-center">
            <v-icon size="60" color="red-darken-1" class="mb-4">mdi-npm</v-icon>
            <v-card-title class="text-h5 font-weight-medium">
              NPM Installation
            </v-card-title>
            <v-card-subtitle>Set up the Node.js package (NPM).</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="20" sm="10" md="5" class="d-flex">
        <v-card hover elevation="8" class="pa-6 flex-grow-1" to="/npm" style="border-top: 4px solid #FFC107;">
          <v-card-item class="text-center">
            <v-icon size="60" color="amber-darken-1" class="mb-4">mdi-rocket-launch</v-icon>
            <v-card-title class="text-h5 font-weight-medium">
              NPM Quickstart
            </v-card-title>
            <v-card-subtitle>Learn the fundamental Node.js workflow in minutes.</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="py-16 bg-grey-lighten-5">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h4 font-weight-bold text-primary">Dive Deeper: Explore Specifics</h2>
        <p class="text-body-1 text-grey-darken-3 mt-4 mx-auto" style="max-width: 700px;">
          Access comprehensive documentation for all Acumatica services and data models, broken down by language.
        </p>
      </v-col>

      <v-col cols="12" md="5" class="d-flex">
        <v-card elevation="8" class="pa-6 flex-grow-1" style="border-top: 4px solid #3776AB;">
          <v-card-item class="text-center">
            <v-icon size="60" color="#3776AB" class="mb-4">mdi-language-python</v-icon>
            <v-card-title class="text-h5 font-weight-medium text-blue-darken-4">
              Explore Python Docs
            </v-card-title>
            <v-card-subtitle class="mb-4">Access detailed guides for Python services and model builders.</v-card-subtitle>
          </v-card-item>
          <v-card-actions class="justify-center">
            <v-btn color="blue-darken-1" variant="flat" to="/python/sub-services">
              View Services
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn color="green-darken-1" variant="flat" to="/python/models">
              View Builders
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="5" class="d-flex">
        <v-card elevation="8" class="pa-6 flex-grow-1" style="border-top: 4px solid #CB3837;">
          <v-card-item class="text-center">
            <v-icon size="60" color="#CB3837" class="mb-4">mdi-npm</v-icon>
            <v-card-title class="text-h5 font-weight-medium text-red-darken-4">
              Explore NPM Docs
            </v-card-title>
            <v-card-subtitle class="mb-4">Access detailed guides for Node.js services and model builders.</v-card-subtitle>
          </v-card-item>
          <v-card-actions class="justify-center">
            <v-btn color="red-darken-1" variant="flat" to="/npm/sub-services">
              View Services
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn color="orange-darken-1" variant="flat" to="/npm/models">
              View Builders
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="py-16">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h4 font-weight-bold text-primary">Community & Support</h2>
        <p class="text-body-1 text-grey-darken-3 mt-4 mx-auto" style="max-width: 700px;">
          Got questions? Need help? Connect with us and the community.
        </p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex">
        <v-card hover elevation="8" class="pa-6 flex-grow-1" href="https://github.com/Nioron07/Easy-Acumatica" target="_blank" style="border-top: 4px solid #1976D2;">
          <v-card-item class="text-center">
            <v-icon size="60" color="black" class="mb-4">mdi-github</v-icon>
            <v-card-title class="text-h5 font-weight-medium">
              GitHub Repository
            </v-card-title>
            <v-card-subtitle>Star the project, report issues, or contribute!</v-card-subtitle>
          </v-card-item>
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
useSeoMeta({
  title: 'Easy-Acumatica: Wrappers for Acumatica REST API',
  description: 'Simplify Acumatica ERP integrations with Easy-Acumatica. Python and Node.js wrappers for session management, OData querying, and fluent API calls. Automate business logic with ease.',
  ogTitle: 'Easy-Acumatica | Seamless Acumatica API Integration for Python & Node.js',
  ogDescription: 'Leverage Easy-Acumatica to quickly build robust integrations with Acumatica ERP. Handle complex REST API interactions with simple, intuitive code.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png', // Ensure this absolute URL is correct
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica: Acumatica REST API Made Easy',
  twitterDescription: 'Python and Node.js wrappers for Acumatica ERP REST API. Simplify development, automate tasks, and streamline your integrations.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png', // Ensure this absolute URL is correct
});


// --- Page Content Data ---

const benefits = ref([
  {
    icon: 'mdi-cogs',
    title: 'Automated Session',
    description: 'Handles login, logout, and cookie management automatically for persistent connections.'
  },
  {
    icon: 'mdi-lan',
    title: 'Typed Sub-Services',
    description: 'Access API endpoints like `client.customers` or `client.invoices` with dedicated methods and clear type hints.'
  },
  {
    icon: 'mdi-shield-check-outline',
    title: 'Fluent Builders',
    description: 'Construct complex JSON payloads with chainable, readable methods, simplifying data creation and updates.'
  },
  {
    icon: 'mdi-filter-variant',
    title: 'Powerful Querying',
    description: 'Easily build advanced OData filters, selections, and expansions using a Pythonic Domain Specific Language.'
  },
  {
    icon: 'mdi-lightbulb-on-outline',
    title: 'Clear Error Handling',
    description: 'Converts opaque API errors into meaningful exceptions, making troubleshooting faster and more intuitive.'
  }
]);
</script>

<style scoped>
.flex-grow-1 {
  flex-grow: 1;
}
</style>