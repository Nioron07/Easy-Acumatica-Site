<template>
  <div class="acunexus-page">
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <section class="hero-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" class="text-center">
              <v-img
                src="../../assets/AcuNexus_Logo_Big.png"
                alt="AcuNexus Logo"
                max-width="400"
                class="mx-auto mb-6"
              />
              <p class="hero-subtitle mb-8">
                Self-Hosted Multi-Instance Management Platform
              </p>
              <p class="hero-description mb-8">
                Built on Easy-Acumatica Python, AcuNexus is a self-hosted web application that provides a visual
                interface for building integrations and utilizing the package. Manage multiple Acumatica instances,
                browse services and models interactively, and deploy custom REST API endpoints with automatic
                schema generation—all from a single interface.
              </p>
              <div class="d-flex flex-wrap gap-3 justify-center">
                <v-btn
                  href="https://github.com/Nioron07/AcuNexus"
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

      <!-- Features Section -->
      <section class="features-section">
        <v-container>
          <h2 class="section-title text-center mb-12">Key Features</h2>
          <v-row>
            <v-col cols="12" md="6" lg="3" v-for="feature in features" :key="feature.title">
              <v-card class="feature-card h-100" elevation="2">
                <v-card-text class="text-center pa-6">
                  <v-icon :icon="feature.icon" size="48" color="deep-purple" class="mb-4"></v-icon>
                  <h3 class="feature-title mb-3">{{ feature.title }}</h3>
                  <p class="feature-description">{{ feature.description }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Architecture Section -->
      <section class="architecture-section">
        <v-container>
          <h2 class="section-title text-center mb-8">Architecture</h2>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <v-card class="pa-6">
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-vuejs" color="green"></v-icon>
                    </template>
                    <v-list-item-title>Frontend</v-list-item-title>
                    <v-list-item-subtitle>Vue 3 + Vuetify 3 + TypeScript</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-flask" color="blue"></v-icon>
                    </template>
                    <v-list-item-title>Backend</v-list-item-title>
                    <v-list-item-subtitle>Flask + SQLAlchemy + Easy-Acumatica</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-database" color="indigo"></v-icon>
                    </template>
                    <v-list-item-title>Database</v-list-item-title>
                    <v-list-item-subtitle>PostgreSQL</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-docker" color="cyan"></v-icon>
                    </template>
                    <v-list-item-title>Deployment</v-list-item-title>
                    <v-list-item-subtitle>Docker Compose</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Quick Start Section -->
      <section class="quickstart-section">
        <v-container>
          <h2 class="section-title text-center mb-8">Quick Start</h2>
          <v-row justify="center">
            <v-col cols="12" md="10">
              <v-stepper :items="quickstartSteps" flat>
                <template v-slot:item.1>
                  <v-card flat>
                    <v-card-text>
                      <h3 class="mb-3">Clone Repository</h3>
                      <v-code class="code-block">
git clone https://github.com/Nioron07/AcuNexus.git
cd AcuNexus
                      </v-code>
                    </v-card-text>
                  </v-card>
                </template>

                <template v-slot:item.2>
                  <v-card flat>
                    <v-card-text>
                      <h3 class="mb-3">Configure Environment</h3>
                      <v-code class="code-block">
# Copy environment template
cp .env.example .env

# Generate encryption key
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"

# Update .env with generated keys
                      </v-code>
                    </v-card-text>
                  </v-card>
                </template>

                <template v-slot:item.3>
                  <v-card flat>
                    <v-card-text>
                      <h3 class="mb-3">Start Services</h3>
                      <v-code class="code-block">
# Build and start all services
docker compose up -d

# Check status
docker compose ps
                      </v-code>
                    </v-card-text>
                  </v-card>
                </template>

                <template v-slot:item.4>
                  <v-card flat>
                    <v-card-text>
                      <h3 class="mb-3">Access Application</h3>
                      <p class="text-body-1">
                        Open <a href="http://localhost:8080" target="_blank">http://localhost:8080</a> in your browser.
                      </p>
                    </v-card-text>
                  </v-card>
                </template>
              </v-stepper>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Usage Section -->
      <section class="usage-section">
        <v-container>
          <h2 class="section-title text-center mb-8">How to Use</h2>
          <v-row>
            <v-col cols="12" md="6" v-for="(usage, index) in usageSteps" :key="index">
              <v-card class="usage-card h-100" elevation="2">
                <v-card-title class="d-flex align-center">
                  <v-icon :icon="usage.icon" color="deep-purple" class="mr-3"></v-icon>
                  {{ usage.title }}
                </v-card-title>
                <v-card-text>
                  <ol class="usage-steps">
                    <li v-for="step in usage.steps" :key="step">{{ step }}</li>
                  </ol>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Documentation Section -->
      <section class="documentation-section">
        <v-container>
          <h2 class="section-title text-center mb-8">Documentation</h2>
          <p class="text-center text-body-1 mb-8">
            Explore detailed guides for each feature of AcuNexus
          </p>
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
  </div>
</template>

<script setup>
import { ref } from 'vue';

const features = ref([
  {
    icon: 'mdi-server-network',
    title: 'Multi-Client Management',
    description: 'Connect and manage multiple Acumatica instances with encrypted credential storage'
  },
  {
    icon: 'mdi-magnify',
    title: 'Service Browser',
    description: 'Explore available REST API services and their methods'
  },
  {
    icon: 'mdi-cube-outline',
    title: 'Model Browser',
    description: 'Browse data models and schemas'
  },
  {
    icon: 'mdi-api',
    title: 'Endpoint Deployment',
    description: 'Deploy service methods as REST API endpoints with automatic schema generation'
  },
  {
    icon: 'mdi-test-tube',
    title: 'Endpoint Testing',
    description: 'Test endpoints directly from the UI with parameter validation'
  },
  {
    icon: 'mdi-shield-lock',
    title: 'Encrypted Credentials',
    description: 'Secure credential storage with encryption'
  },
  {
    icon: 'mdi-theme-light-dark',
    title: 'Dark Mode',
    description: 'Built-in light/dark theme switching'
  },
  {
    icon: 'mdi-docker',
    title: 'Docker Deployment',
    description: 'Easy deployment with Docker Compose'
  }
]);

const quickstartSteps = ref([
  'Clone',
  'Configure',
  'Start',
  'Access'
]);

const usageSteps = ref([
  {
    icon: 'mdi-account-group',
    title: 'Client Management',
    steps: [
      'Navigate to Clients page',
      'Click "Add Client"',
      'Enter Acumatica connection details (URL, tenant, credentials)',
      'Connect to the client'
    ]
  },
  {
    icon: 'mdi-magnify',
    title: 'Browse Services & Models',
    steps: [
      'Connect to a client',
      'Navigate to Services or Models pages',
      'Search and explore available APIs and data structures'
    ]
  },
  {
    icon: 'mdi-api',
    title: 'Deploy Endpoints',
    steps: [
      'Navigate to Services page',
      'Select a service and view its methods',
      'Click "Deploy as Endpoint" for any method',
      'The endpoint is now available as a REST API'
    ]
  },
  {
    icon: 'mdi-test-tube',
    title: 'Test Endpoints',
    steps: [
      'Navigate to Endpoints page',
      'Click the menu icon on any endpoint',
      'Select "Test Endpoint"',
      'Fill in required parameters and view the response'
    ]
  }
]);

const docPages = ref([
  {
    icon: 'mdi-download',
    title: 'Setup & Installation',
    description: 'Get started with AcuNexus by following our setup guide',
    link: '/acunexus/setup'
  },
  {
    icon: 'mdi-server-network',
    title: 'Client Management',
    description: 'Connect and manage multiple Acumatica instances',
    link: '/acunexus/clients'
  },
  {
    icon: 'mdi-cube-outline',
    title: 'Model Viewing',
    description: 'Browse and explore data models and schemas',
    link: '/acunexus/models'
  },
  {
    icon: 'mdi-magnify',
    title: 'Service Viewing',
    description: 'Explore available REST API services and methods',
    link: '/acunexus/services'
  },
  {
    icon: 'mdi-api',
    title: 'Deploying & Using Endpoints',
    description: 'Deploy service methods as REST API endpoints',
    link: '/acunexus/endpoints'
  }
]);

definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'AcuNexus | Easy-Acumatica',
  description: 'Self-hosted web application for managing multiple Acumatica instances and deploying REST API endpoints. Built on Easy-Acumatica Python.',
});
</script>

<style scoped>
.acunexus-page {
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

/* Sections */
.features-section,
.architecture-section,
.quickstart-section,
.usage-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a237e;
}

/* Feature Cards */
.feature-card {
  transition: all 0.3s ease;
  border-radius: 16px;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.2) !important;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a237e;
}

.feature-description {
  color: #666;
  line-height: 1.6;
}

/* Code Block */
.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  white-space: pre;
  overflow-x: auto;
}

/* Usage Cards */
.usage-card {
  border-radius: 16px;
}

.usage-steps {
  padding-left: 1.5rem;
  line-height: 2;
}

.usage-steps li {
  color: #666;
  margin-bottom: 0.5rem;
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
