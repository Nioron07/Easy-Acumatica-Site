<template>
  <div class="acunexus-models-page">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="page-title mb-4">Model Viewing</h1>
          <p class="text-body-1 mb-8">
            Browse and explore Acumatica data models and their schemas.
          </p>

          <v-alert type="info" variant="tonal" class="mb-6">
            This documentation is currently under development. Check back soon for detailed model viewing instructions.
          </v-alert>

          <section class="content-section">
            <h2 class="section-title mb-4">Browsing Models</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Model Details</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Field Definitions</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Custom Fields</h2>
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
  title: 'Model Viewing | AcuNexus Documentation',
  description: 'Browse and explore Acumatica data models and schemas in AcuNexus.',
});
</script>

<style scoped>
.acunexus-models-page {
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
