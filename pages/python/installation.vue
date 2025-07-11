<template>
  <div>
    <v-container>
      <v-row class="mt-4 mb-8">
        <v-col>
          <h1 class="text-h3 text-primary font-weight-bold">
            Installation
          </h1>
          <p class="mt-4 text-body-1" style="max-width: 800px;">
            Getting started with the `easy-acumatica` Python package is simple. You can install it directly from the Python Package Index (PyPI) using pip.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 font-weight-medium mb-4">Prerequisites</h2>
          <v-card variant="outlined" elevation="4" style="border-left: 5px solid #1976D2;">
            <v-card-text class="pa-5">
              <ul class="pl-5 text-body-1">
                <li class="mb-2">
                  <strong>Python Version:</strong> You will need Python 3.7 or newer.
                </li>
                <li class="mb-2">
                  <strong>Acumatica ERP:</strong> Access to an Acumatica ERP instance with the contract-based REST API enabled.
                </li>
                <li>
                  <strong>Acumatica User Credentials:</strong> You will need a valid username, password, tenant, and branch to connect to your instance.
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-12">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-medium mb-4">Standard Installation</h2>
          <p class="text-body-1 mb-4">
            To install the package, run the following command in your terminal. This will download `easy-acumatica` and its required dependency, `requests`.
          </p>
          <CodeSnippet 
            language="bash"
            :code="installCommand" 
          />
          <p class="text-body-1 mt-4">
            Once the installation is complete, you are ready to start using the client in your projects.
          </p>
        </v-col>
      </v-row>

    </v-container>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';

// --- SEO & OG Image Configuration ---

// 1. Define the primary SEO metadata for this page.
useSeoMeta({
  title: 'How to Install Easy-Acumatica | Python Package (PyPI)',
  description: "Learn how to install the easy-acumatica Python package from PyPI using pip. This guide covers all prerequisites for connecting to the Acumatica REST API.",
});

// 2. Tell Nuxt OG Image to generate an image for this page using your default template.
defineOgImage({
  title: 'Easy-Acumatica Installation',
  description: 'Learn how to install the Python package using pip.',
});

// --- Page Content Data ---

const installCommand = ref('pip install easy-acumatica');
</script>