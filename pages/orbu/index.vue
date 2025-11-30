<template>
  <div class="orbu-page">
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <section class="hero-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" class="text-center">
              <v-img
                src="../../assets/Orbu_Large_Logo.png"
                alt="Orbu Logo"
                max-width="400"
                class="mx-auto mb-6"
              />
              <p class="hero-subtitle mb-8">
                Self-Hosted Multi-Instance Management Platform
              </p>
              <p class="hero-description mb-8">
                Built on Easy-Acumatica Python, Orbu is a self-hosted web application that provides a visual
                interface for building integrations and utilizing the package. Manage multiple Acumatica instances,
                browse services and models interactively, and deploy custom REST API endpoints with automatic
                schema generation—all from a single interface.
              </p>
              <div class="d-flex flex-wrap gap-3 justify-center">
                <v-btn
                  href="https://github.com/Nioron07/Orbu"
                  target="_blank"
                  rel="noopener"
                  size="large"
                  color="deep-purple"
                  variant="flat"
                  rounded="pill"
                >
                  <v-icon start>mdi-github</v-icon>
                  View on GitHub
                  <v-icon end>mdi-open-in-new</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Documentation Section -->
      <section class="documentation-section">
        <v-container>
          <h2 class="section-title text-center mb-12">Explore Orbu Features</h2>
          <v-row>
            <v-col cols="12" md="4" v-for="doc in docPages" :key="doc.link">
              <v-card class="doc-card h-100" elevation="2" :to="doc.link">
                <v-card-text class="text-center pa-6">
                  <v-icon :icon="doc.icon" size="48" color="deep-purple" class="mb-4"></v-icon>
                  <h3 class="doc-title mb-3">{{ doc.title }}</h3>
                  <p class="doc-description">{{ doc.description }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-container>

    <OrbuPageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import OrbuPageFooter from '~/components/OrbuPageFooter.vue';

const docPages = ref([
  {
    icon: 'mdi-download',
    title: 'Setup & Installation',
    description: 'Get started with Orbu by following our setup guide',
    link: '/orbu/setup'
  },
  {
    icon: 'mdi-server-network',
    title: 'Client Management',
    description: 'Connect and manage multiple Acumatica instances',
    link: '/orbu/clients'
  },
  {
    icon: 'mdi-cube-outline',
    title: 'Model Viewing',
    description: 'Browse and explore data models and schemas',
    link: '/orbu/models'
  },
  {
    icon: 'mdi-magnify',
    title: 'Service Viewing',
    description: 'Explore available REST API services and methods',
    link: '/orbu/services'
  },
  {
    icon: 'mdi-api',
    title: 'Deploying & Using Endpoints',
    description: 'Deploy service methods as REST API endpoints',
    link: '/orbu/endpoints'
  }
]);

definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'Orbu | Multi-Instance Acumatica Management',
  description: 'Self-hosted platform for managing multiple Acumatica instances. Browse services and models, deploy REST API endpoints with automatic schema generation.',
  ogTitle: 'Orbu - Multi-Instance Acumatica Management Platform',
  ogDescription: 'Self-hosted platform for managing multiple Acumatica ERP instances with visual interface for building integrations and deploying REST API endpoints.',
  ogType: 'article',
  ogUrl: 'https://easyacumatica.com/orbu',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Orbu: Self-Hosted Acumatica Management Platform',
  twitterDescription: 'Manage multiple Acumatica instances, browse services and models, and deploy REST API endpoints - all from a visual interface.',
  robots: 'index, follow',
  keywords: 'Orbu, Acumatica management, multi-instance management, REST API endpoints, self-hosted, Easy-Acumatica, Acumatica integration, visual interface, schema generation, Docker deployment'
});

useSchemaOrg([
  {
    '@type': 'SoftwareApplication',
    'name': 'Orbu',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Cross-platform (Docker)',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': 'Self-hosted web application for managing multiple Acumatica instances and deploying REST API endpoints',
    'url': 'https://easyacumatica.com/orbu',
    'programmingLanguage': ['Python', 'JavaScript'],
    'featureList': [
      'Multi-client management',
      'Interactive service browser',
      'Interactive model viewer',
      'REST API endpoint deployment',
      'Automatic schema generation',
      'Encrypted credential storage',
      'Docker deployment',
      'OpenAPI documentation'
    ],
    'screenshot': 'https://easyacumatica.com/assets/Orbu_Logo_Small.png'
  },
  {
    '@type': 'TechArticle',
    'headline': 'Orbu Documentation',
    'description': 'Complete guide to using Orbu for Acumatica multi-instance management',
    'url': 'https://easyacumatica.com/orbu',
    'author': {
      '@type': 'Organization',
      'name': 'Easy-Acumatica Team'
    },
    'about': {
      '@type': 'SoftwareSourceCode',
      'name': 'Orbu',
      'programmingLanguage': 'Python',
      'codeRepository': 'https://github.com/Nioron07/Orbu'
    }
  }
]);
</script>

<style scoped>
.orbu-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%);
  color: white;
  padding: 6rem 0;
}

.hero-section :deep(.v-img) {
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.hero-icon {
  color: rgba(255, 255, 255, 0.9);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: white;
}

.hero-subtitle {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a237e;
}

/* Documentation Section */
.documentation-section {
  padding: 4rem 0;
  background: white;
}

.doc-card {
  transition: all 0.3s ease;
  border-radius: 16px;
  cursor: pointer;
}

.doc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.2) !important;
}

.doc-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a237e;
}

.doc-description {
  color: #666;
  line-height: 1.6;
}
</style>
