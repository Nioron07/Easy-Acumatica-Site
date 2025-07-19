<template>
  <div>
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-gradient"></div>
        <v-container class="hero-content">
          <v-row justify="center" align="center">
            <v-col cols="12" md="10" lg="8">
              <div class="version-badge mb-4">
                <v-chip color="white" size="large" class="font-weight-bold">
                  <v-icon start>mdi-rocket-launch</v-icon>
                  Version 0.4.0
                </v-chip>
              </div>
              
              <h1 class="hero-title">
                Easy-Acumatica for <span class="gradient-text">Python</span>
              </h1>
              
              <p class="hero-subtitle">
                Dynamic API generation that adapts to your Acumatica instance
              </p>
              
              <div class="hero-features">
                <div class="feature-pill">
                  <v-icon start size="small">mdi-lightning-bolt</v-icon>
                  Zero Static Code
                </div>
                <div class="feature-pill">
                  <v-icon start size="small">mdi-sync</v-icon>
                  Runtime Generation
                </div>
                <div class="feature-pill">
                  <v-icon start size="small">mdi-puzzle</v-icon>
                  Perfect Type Hints
                </div>
              </div>

              <v-row justify="center" class="mt-8">
                <v-col cols="auto">
                  <v-btn
                    color="white"
                    size="large"
                    rounded="pill"
                    class="hero-cta"
                    to="/python/quickstart"
                  >
                    Get Started
                    <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    variant="outlined"
                    color="white"
                    size="large"
                    rounded="pill"
                    class="hero-cta-secondary"
                    to="/python/installation"
                  >
                    Installation
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Core Concepts Grid -->
      <section class="concepts-section">
        <v-container>
          <v-row>
            <v-col cols="12" class="text-center mb-8">
              <h2 class="section-title">Core Concepts</h2>
              <p class="section-subtitle">Everything is dynamically generated at runtime</p>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col 
              v-for="concept in coreConcepts" 
              :key="concept.title"
              cols="12" 
              md="4"
            >
              <v-card 
                class="concept-card h-100"
                :to="concept.link"
                variant="flat"
                hover
              >
                <div class="card-gradient" :class="`gradient-${concept.gradient}`"></div>
                <v-card-item>
                  <div class="concept-icon mb-4">
                    <v-icon :icon="concept.icon" size="32"></v-icon>
                  </div>
                  <v-card-title class="text-h5 font-weight-bold mb-2">
                    {{ concept.title }}
                  </v-card-title>
                  <v-card-subtitle class="text-body-1">
                    {{ concept.description }}
                  </v-card-subtitle>
                </v-card-item>
                <v-card-actions>
                  <v-spacer />
                  <v-btn variant="text" color="primary">
                    Learn More
                    <v-icon end size="small">mdi-arrow-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Documentation Map -->
      <section class="docs-section">
        <v-container>
          <v-row>
            <v-col cols="12" class="text-center mb-8">
              <h2 class="section-title">Documentation</h2>
              <p class="section-subtitle">Navigate to any topic</p>
            </v-col>
          </v-row>

          <!-- Getting Started -->
          <div class="doc-category mb-8">
            <h3 class="category-title mb-4">
              <v-icon start color="primary">mdi-rocket</v-icon>
              Getting Started
            </h3>
            <v-row>
              <v-col 
                v-for="doc in gettingStartedDocs" 
                :key="doc.title"
                cols="12" 
                sm="6" 
                md="3"
              >
                <v-card
                  class="doc-card"
                  :to="doc.link"
                  variant="outlined"
                  hover
                >
                  <v-card-item>
                    <v-icon :icon="doc.icon" color="primary" class="mb-2"></v-icon>
                    <v-card-title class="text-h6">{{ doc.title }}</v-card-title>
                    <v-card-subtitle>{{ doc.subtitle }}</v-card-subtitle>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- Core Components -->
          <div class="doc-category mb-8">
            <h3 class="category-title mb-4">
              <v-icon start color="primary">mdi-cube-outline</v-icon>
              Core Components
            </h3>
            <v-row>
              <v-col 
                v-for="doc in coreComponentDocs" 
                :key="doc.title"
                cols="12" 
                sm="6" 
                md="3"
              >
                <v-card
                  class="doc-card"
                  :to="doc.link"
                  variant="outlined"
                  hover
                >
                  <v-card-item>
                    <v-icon :icon="doc.icon" color="primary" class="mb-2"></v-icon>
                    <v-card-title class="text-h6">{{ doc.title }}</v-card-title>
                    <v-card-subtitle>{{ doc.subtitle }}</v-card-subtitle>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- Advanced Topics -->
          <div class="doc-category">
            <h3 class="category-title mb-4">
              <v-icon start color="primary">mdi-school-outline</v-icon>
              Advanced Topics
            </h3>
            <v-row>
              <v-col 
                v-for="doc in advancedDocs" 
                :key="doc.title"
                cols="12" 
                sm="6" 
                md="3"
              >
                <v-card
                  class="doc-card"
                  :to="doc.link"
                  variant="outlined"
                  hover
                >
                  <v-card-item>
                    <v-icon :icon="doc.icon" color="primary" class="mb-2"></v-icon>
                    <v-card-title class="text-h6">{{ doc.title }}</v-card-title>
                    <v-card-subtitle>{{ doc.subtitle }}</v-card-subtitle>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </section>

      <!-- What's New Section -->
      <section class="whats-new-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <v-card class="new-card" elevation="8">
                <div class="new-gradient"></div>
                <v-card-item>
                  <v-card-title class="text-h4 font-weight-bold mb-4">
                    <v-icon start>mdi-new-box</v-icon>
                    What's New in 0.4.0
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="new-feature">
                          <v-icon color="primary" class="mb-2">mdi-auto-fix</v-icon>
                          <h4>Fully Dynamic Architecture</h4>
                          <p>No more static service or model definitions. Everything is generated at runtime based on your instance.</p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="new-feature">
                          <v-icon color="primary" class="mb-2">mdi-code-tags</v-icon>
                          <h4>Enhanced Type Safety</h4>
                          <p>Dynamic type generation provides perfect IDE support with autocomplete for all your custom fields.</p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="new-feature">
                          <v-icon color="primary" class="mb-2">mdi-factory</v-icon>
                          <h4>Service & Model Factories</h4>
                          <p>New factory pattern for creating services and models that adapt to your endpoint structure.</p>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <div class="new-feature">
                          <v-icon color="primary" class="mb-2">mdi-flash</v-icon>
                          <h4>Improved Performance</h4>
                          <p>Smarter caching and lazy loading for faster initialization and reduced memory usage.</p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      </v-container>
      
    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';

// SEO Configuration
useSeoMeta({
  title: 'Easy-Acumatica Python Documentation | v0.4.0',
  description: 'Official documentation for Easy-Acumatica Python v0.4.0. Learn about the new dynamic architecture, service factories, and model generation.',
  ogTitle: 'Easy-Acumatica Python v0.4.0 Documentation',
  ogDescription: 'Explore the new dynamic API generation in Easy-Acumatica v0.4.0 for Python.',
  ogImage: 'https://www.easyacumatica.com/social-images/python-docs.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica Python v0.4.0',
  twitterDescription: 'Dynamic API generation for Acumatica ERP - Python Documentation',
  twitterImage: 'https://www.easyacumatica.com/social-images/python-docs.png',
});

// Page Content Data
const coreConcepts = ref([
  {
    icon: 'mdi-connection',
    title: 'AcumaticaClient',
    description: 'The intelligent client that discovers your instance structure and manages all connections.',
    link: '/python/client',
    gradient: 1
  },
  {
    icon: 'mdi-factory',
    title: 'Service Factory',
    description: 'Dynamically generates service classes based on your available endpoints at runtime.',
    link: '/python/service-factory',
    gradient: 2
  },
  {
    icon: 'mdi-cube-outline',
    title: 'Model Factory',
    description: 'Creates type-safe model builders that perfectly match your entity structure.',
    link: '/python/model-factory',
    gradient: 3
  }
]);

const gettingStartedDocs = ref([
  {
    icon: 'mdi-download',
    title: 'Installation',
    subtitle: 'Get up and running',
    link: '/python/installation'
  },
  {
    icon: 'mdi-rocket-launch',
    title: 'Quickstart',
    subtitle: 'Your first integration',
    link: '/python/quickstart'
  },
  {
    icon: 'mdi-swap-horizontal',
    title: 'Migration Guide',
    subtitle: 'From v0.3.x to v0.4.0',
    link: '/python/migration'
  },
  {
    icon: 'mdi-book-open-variant',
    title: 'Concepts',
    subtitle: 'Core principles',
    link: '/python/concepts'
  }
]);

const coreComponentDocs = ref([
  {
    icon: 'mdi-api',
    title: 'Dynamic Services',
    subtitle: 'Runtime generation',
    link: '/python/dynamic-services'
  },
  {
    icon: 'mdi-database-search',
    title: 'Query Builder',
    subtitle: 'OData made simple',
    link: '/python/query-builder'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Type Safety',
    subtitle: 'Full IDE support',
    link: '/python/type-safety'
  },
  {
    icon: 'mdi-file-tree',
    title: 'Entity Discovery',
    subtitle: 'Automatic detection',
    link: '/python/entity-discovery'
  }
]);

const advancedDocs = ref([
  {
    icon: 'mdi-cog-outline',
    title: 'Configuration',
    subtitle: 'Advanced options',
    link: '/python/configuration'
  },
  {
    icon: 'mdi-cached',
    title: 'Caching',
    subtitle: 'Performance tuning',
    link: '/python/caching'
  },
  {
    icon: 'mdi-puzzle-plus',
    title: 'Custom Extensions',
    subtitle: 'Extend functionality',
    link: '/python/extensions'
  },
  {
    icon: 'mdi-test-tube',
    title: 'Testing',
    subtitle: 'Best practices',
    link: '/python/testing'
  }
]);
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 25%, #5e35b1 50%, #7e57c2 75%, #9575cd 100%);
  opacity: 0.95;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 4rem 0;
}

.version-badge {
  display: inline-block;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #b39ddb 0%, #e1bee7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 300;
}

.hero-features {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.feature-pill {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 500;
}

.hero-cta {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #5e35b1 !important;
  font-weight: 600;
  padding: 0 2rem !important;
  height: 48px !important;
}

.hero-cta:hover {
  background: white !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.hero-cta-secondary {
  border-color: white !important;
  color: white !important;
  font-weight: 600;
  padding: 0 2rem !important;
  height: 48px !important;
}

.hero-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Concepts Section */
.concepts-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #666;
}

.concept-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 16px !important;
}

.concept-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.card-gradient {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gradient-1 { background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%); }
.gradient-2 { background: linear-gradient(135deg, #3949ab 0%, #5e35b1 100%); }
.gradient-3 { background: linear-gradient(135deg, #1e88e5 0%, #3949ab 100%); }

.concept-card:hover .card-gradient {
  opacity: 0.05;
}

.concept-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Documentation Section */
.docs-section {
  padding: 5rem 0;
}

.doc-category {
  position: relative;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.doc-card {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 12px !important;
  border-color: #e0e0e0 !important;
}

.doc-card:hover {
  border-color: #5e35b1 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(94, 53, 177, 0.15) !important;
}

/* What's New Section */
.whats-new-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.new-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px !important;
}

.new-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.05;
}

.new-feature {
  text-align: center;
  padding: 1rem;
}

.new-feature h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a237e;
}

.new-feature p {
  color: #666;
  line-height: 1.6;
}

/* Quick Links */
.quick-links {
  padding: 3rem 0;
  border-top: 1px solid #e0e0e0;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-features {
    justify-content: center;
  }
  
  .feature-pill {
    font-size: 0.875rem;
  }
  
  .doc-card {
    margin-bottom: 1rem;
  }
}
</style>