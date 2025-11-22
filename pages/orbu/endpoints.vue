<template>
  <div class="orbu-endpoints-page">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="page-title mb-4">Deploying & Using Endpoints</h1>
          <p class="text-body-1 mb-8">
            Deploy service methods as REST API endpoints and test them directly.
          </p>

          <v-alert type="info" variant="tonal" class="mb-6">
            This documentation is currently under development. Check back soon for detailed endpoint deployment instructions.
          </v-alert>

          <section class="content-section">
            <h2 class="section-title mb-4">Deploying Endpoints</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Endpoint Configuration</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Testing Endpoints</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Using Endpoints</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">API Authentication</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'Deploying & Using Endpoints | Orbu Documentation',
  description: 'Learn how to deploy service methods as custom REST API endpoints in Orbu. Automatic OpenAPI schema generation, testing interface, and secure deployment.',
  ogTitle: 'Orbu Endpoint Deployment - Custom REST APIs',
  ogDescription: 'Deploy Acumatica service methods as custom REST API endpoints with automatic documentation and testing.',
  ogType: 'article',
  ogUrl: 'https://easyacumatica.com/orbu/endpoints',
  robots: 'index, follow',
  keywords: 'Orbu endpoints, REST API deployment, custom endpoints, OpenAPI schema, API documentation, endpoint testing'
});
</script>

<style scoped>
.orbu-endpoints-page {
  padding: 2rem 0;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a237e;
}

.content-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #3949ab;
}
</style>
