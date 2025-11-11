<template>
  <div class="acunexus-clients-page">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="page-title mb-4">Client Management</h1>
          <p class="text-body-1 mb-8">
            Connect and manage multiple Acumatica instances with AcuNexus.
          </p>

          <v-alert type="info" variant="tonal" class="mb-6">
            This documentation is currently under development. Check back soon for detailed client management instructions.
          </v-alert>

          <section class="content-section">
            <h2 class="section-title mb-4">Adding Clients</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Connecting to Instances</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Managing Credentials</h2>
            <p class="text-body-1">Content coming soon...</p>
          </section>

          <section class="content-section">
            <h2 class="section-title mb-4">Editing & Deleting Clients</h2>
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
  title: 'Client Management | AcuNexus Documentation',
  description: 'Learn how to connect and manage multiple Acumatica instances with AcuNexus. Add, configure, and switch between different Acumatica ERP environments with encrypted credential storage.',
  ogTitle: 'AcuNexus Client Management - Multi-Instance Connections',
  ogDescription: 'Connect and manage multiple Acumatica instances from a single interface with secure credential storage.',
  ogType: 'article',
  ogUrl: 'https://easyacumatica.com/acunexus/clients',
  robots: 'index, follow',
  keywords: 'AcuNexus clients, Acumatica instances, multi-instance management, credential management, connection configuration'
});
</script>

<style scoped>
.acunexus-clients-page {
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
