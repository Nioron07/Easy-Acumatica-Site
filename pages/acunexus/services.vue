<template>
  <div class="acunexus-services-page">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="page-title mb-4">Service Viewing</h1>
          <p class="text-body-1 mb-8">
            Explore available REST API services and their methods.
          </p>

          <v-alert type="info" variant="tonal" class="mb-6">
            This documentation is currently under development. Check back soon for detailed service viewing instructions.
          </v-alert>

          <section class="content-section">
            <h2 class="section-title mb-4">Browsing Services</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Service Methods</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Method Signatures</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Custom Actions</h2>
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
  title: 'Service Viewing | AcuNexus Documentation',
  description: 'Explore available REST API services and methods in AcuNexus. Interactive service browser with method signatures, parameters, and testing capabilities.',
  ogTitle: 'AcuNexus Service Browser - REST API Explorer',
  ogDescription: 'Browse Acumatica REST API services, view method signatures, and test endpoints directly from the interface.',
  ogType: 'article',
  ogUrl: 'https://easyacumatica.com/acunexus/services',
  robots: 'index, follow',
  keywords: 'AcuNexus services, REST API browser, service methods, API explorer, method signatures, endpoint testing'
});
</script>

<style scoped>
.acunexus-services-page {
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
