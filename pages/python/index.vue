<template>
  <div class="python-home">
    <!-- Hero Section with Modern Blue-Purple Gradient -->
    <section class="hero-section">
      <div class="hero-background">
        <!-- Animated Gradient Orbs -->
        <div class="gradient-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
        
        <!-- Grid Pattern -->
        <div class="grid-overlay"></div>
        
        <!-- Floating Code Snippets -->
        <div class="floating-code">
          <div class="code-float code-1">client.login()</div>
          <div class="code-float code-2">customers.get_list()</div>
          <div class="code-float code-3">F.Cost >= 20.5</div>
          <div class="code-float code-4">QueryOptions(Select=["FirstName"])</div>
        </div>
      </div>

      <v-container class="hero-content">
        <v-row justify="center">
          <v-col cols="12" md="10" class="text-center">
            <!-- Version Badge -->
            <div class="version-badge">
              <v-icon size="small">mdi-rocket-launch</v-icon>
              <span>Version 0.4.8 - Now with Dynamic Service Generation!</span>
            </div>

            <!-- Main Title -->
            <h1 class="hero-title">
              Easy-Acumatica for
              <span class="gradient-text-hero">Python</span>
            </h1>

            <!-- Subtitle -->
            <p class="hero-subtitle">
              The revolutionary Python library that automatically adapts to your Acumatica instance.
              Zero maintenance, full type safety, and complete API coverage.
            </p>

            <!-- CTA Buttons -->
            <div class="hero-buttons">
              <v-btn
                size="x-large"
                rounded="pill"
                class="hero-btn-primary"
                to="/python/quickstart"
                elevation="8"
              >
                <v-icon start>mdi-flash</v-icon>
                Quick Start
              </v-btn>
              
              <v-btn
                size="x-large"
                rounded="pill"
                variant="outlined"
                class="hero-btn-secondary"
                href="https://github.com/Nioron07/Easy-Acumatica"
                target="_blank"
              >
                <v-icon start>mdi-github</v-icon>
                View on GitHub
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- Demo Section -->
    <section class="demo-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title">
              <span class="gradient-text">See It In Action</span>
            </h2>
            <p class="section-subtitle">
              From zero to production-ready in minutes
            </p>
          </v-col>
        </v-row>
        
        <v-row align="center">
          <!-- Code Example -->
          <v-col cols="12" lg="6">
            <div class="code-showcase-wrapper">
              <div class="code-showcase">
                <div class="code-header">
                  <div class="code-dots">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                  </div>
                  <span class="code-title">main.py</span>
                </div>
                <CodeSnippet 
                  :code="demoCode" 
                  language="python"
                  :show-header="false"
                  class="code-content-wrapper"
                />
              </div>
            </div>
          </v-col>
          
          <!-- Feature Tabs -->
          <v-col cols="12" lg="6">
            <div class="feature-showcase">
              <v-tabs 
                v-model="activeTab"
                class="showcase-tabs"
                color="primary"
                grow
              >
                <v-tab value="dynamic">
                  <v-icon start>mdi-auto-fix</v-icon>
                  Dynamic
                </v-tab>
                <v-tab value="typesafe">
                  <v-icon start>mdi-shield-check</v-icon>
                  Type-Safe
                </v-tab>
                <v-tab value="complete">
                  <v-icon start>mdi-all-inclusive</v-icon>
                  Complete
                </v-tab>
              </v-tabs>
              
              <v-tabs-window v-model="activeTab" class="showcase-content">
                <v-tabs-window-item value="dynamic">
                  <div class="showcase-item">
                    <h3>Adapts to Your Instance</h3>
                    <p>
                      Automatically discovers all endpoints, custom fields, and 
                      extensions in your Acumatica instance. No manual schema 
                      updates ever needed.
                    </p>
                    <div class="feature-highlights">
                      <v-chip color="primary" variant="tonal">
                        <v-icon start size="small">mdi-refresh-auto</v-icon>
                        Auto-Discovery
                      </v-chip>
                      <v-chip color="primary" variant="tonal">
                        <v-icon start size="small">mdi-puzzle</v-icon>
                        Custom Fields
                      </v-chip>
                      <v-chip color="primary" variant="tonal">
                        <v-icon start size="small">mdi-cog-sync</v-icon>
                        Zero Config
                      </v-chip>
                    </div>
                  </div>
                </v-tabs-window-item>
                
                <v-tabs-window-item value="typesafe">
                  <div class="showcase-item">
                    <h3>Full Type Safety</h3>
                    <p>
                      Get complete IntelliSense, autocomplete, and type checking 
                      for all your API calls. Your IDE knows exactly what's available.
                    </p>
                    <div class="feature-highlights">
                      <v-chip color="success" variant="tonal">
                        <v-icon start size="small">mdi-code-tags-check</v-icon>
                        Type Hints
                      </v-chip>
                      <v-chip color="success" variant="tonal">
                        <v-icon start size="small">mdi-lightbulb-on</v-icon>
                        IntelliSense
                      </v-chip>
                      <v-chip color="success" variant="tonal">
                        <v-icon start size="small">mdi-bug-check</v-icon>
                        Error Prevention
                      </v-chip>
                    </div>
                  </div>
                </v-tabs-window-item>
                
                <v-tabs-window-item value="complete">
                  <div class="showcase-item">
                    <h3>Everything You Need</h3>
                    <p>
                      Complete API coverage with CRUD operations, OData filtering, 
                      file attachments, actions, and more. No limitations.
                    </p>
                    <div class="feature-highlights">
                      <v-chip color="info" variant="tonal">
                        <v-icon start size="small">mdi-database</v-icon>
                        CRUD Ops
                      </v-chip>
                      <v-chip color="info" variant="tonal">
                        <v-icon start size="small">mdi-filter</v-icon>
                        OData Support
                      </v-chip>
                      <v-chip color="info" variant="tonal">
                        <v-icon start size="small">mdi-file-upload</v-icon>
                        File Handling
                      </v-chip>
                    </div>
                  </div>
                </v-tabs-window-item>
              </v-tabs-window>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Core Features Grid -->
    <section class="features-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title">
              <span class="gradient-text">Built for Developers</span>
            </h2>
            <p class="section-subtitle">
              Everything you need to build robust Acumatica integrations
            </p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col 
            v-for="(feature, index) in coreFeatures" 
            :key="feature.title"
            cols="12" 
            md="6" 
            lg="4"
          >
            <div class="feature-card" :class="`delay-${index}`">
              <div class="feature-icon-wrapper">
                <div class="feature-icon-bg"></div>
                <v-icon :icon="feature.icon" size="32" color="white"></v-icon>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
              <v-btn 
                :to="feature.link" 
                variant="text" 
                color="primary"
                class="feature-link"
              >
                Learn more
                <v-icon end size="small">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Quick Start Section -->
    <section class="quickstart-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title">
              <span class="gradient-text">Get Started in Minutes</span>
            </h2>
            <p class="section-subtitle">
              Simple steps to integrate with your Acumatica instance
            </p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col 
            v-for="(step, index) in quickstartSteps" 
            :key="step.title"
            cols="12" 
            md="6"
            lg="3"
          >
            <v-card class="quickstart-card h-100" elevation="0">
              <v-card-text class="text-center">
                <div class="step-number-circle">{{ index + 1 }}</div>
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
                <CodeSnippet 
                  v-if="step.code"
                  :code="step.code" 
                  :language="step.language || 'python'"
                  :show-header="false"
                  :compact="true"
                  class="step-code"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Migration Section -->
    <section class="migration-section">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10">
            <div class="migration-card">
              <div class="migration-content text-center">
                <h2 class="migration-title">Migrating from 0.3.x?</h2>
                <p class="migration-text">
                  Version 0.4.8 introduces revolutionary dynamic service generation. 
                  Your code gets cleaner, your types get stronger, and your development gets faster.
                </p>
                <v-btn
                  to="/python/migration"
                  size="large"
                  rounded="pill"
                  class="migration-btn mt-6"
                >
                  View Migration Guide
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Resources Section -->
    <section class="resources-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title">
              <span class="gradient-text">Resources</span>
            </h2>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="resource-card h-100" elevation="0">
              <v-card-text class="text-center">
                <v-icon size="48" color="primary" class="mb-4">mdi-book-open-variant</v-icon>
                <h3 class="resource-title">Documentation</h3>
                <p class="resource-description">
                  Comprehensive guides covering every aspect of the library
                </p>
                <v-list class="resource-links">
                  <v-list-item 
                    v-for="doc in documentationLinks" 
                    :key="doc.title"
                    :to="doc.link"
                    density="compact"
                  >
                    <v-list-item-title>{{ doc.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card class="resource-card h-100" elevation="0">
              <v-card-text class="text-center">
                <v-icon size="48" color="secondary" class="mb-4">mdi-code-braces</v-icon>
                <h3 class="resource-title">Examples</h3>
                <p class="resource-description">
                  Real-world code examples and common patterns
                </p>
                <v-list class="resource-links">
                  <v-list-item 
                    v-for="example in exampleLinks" 
                    :key="example.title"
                    :to="example.link"
                    density="compact"
                  >
                    <v-list-item-title>{{ example.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card class="resource-card h-100" elevation="0">
              <v-card-text class="text-center">
                <v-icon size="48" color="accent" class="mb-4">mdi-account-group</v-icon>
                <h3 class="resource-title">Community</h3>
                <p class="resource-description">
                  Get help and connect with other developers
                </p>
                <v-list class="resource-links">
                  <v-list-item 
                    v-for="link in communityLinks" 
                    :key="link.title"
                    :href="link.link"
                    target="_blank"
                    density="compact"
                  >
                    <v-list-item-title>{{ link.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';

// SEO Configuration
useSeoMeta({
  title: 'Easy-Acumatica Python | Dynamic API Integration for Acumatica ERP',
  description: 'The revolutionary Python library that automatically adapts to your Acumatica instance. Zero maintenance, full type safety, and complete API coverage including custom fields.',
  ogTitle: 'Easy-Acumatica Python - Self-Adapting Acumatica Integration',
  ogDescription: 'Discover the Python library that eliminates API maintenance forever. Dynamic service generation, full type hints, and automatic discovery of custom fields.',
  ogImage: 'https://www.easyacumatica.com/social-images/python-home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica Python',
  twitterDescription: 'The self-adapting Python library for Acumatica integration'
});

// Data
const activeTab = ref('dynamic');

const demoCode = `from easy_acumatica import AcumaticaClient

# Initialize and connect
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password",
    tenant="YourTenant"
)

# Dynamic service discovery - no manual schema needed!
customer_service = client.customers_service

# Full type hints and autocomplete
new_customer = client.models.Customer(
  CustomerID = "CUST001",
  CustomerName = "Acme Corp",
  CustomerClass = "DEFAULT"
)

# OData filtering made simple
opts = QueryOptions(filter=(F.Status == 'Active'), select=["CustomerID", "CustomerName", "Balance"])

# API calls made as simple as a function call
active_customers = customer_service.get_list(options=opts)`;

const coreFeatures = ref([
  {
    icon: 'mdi-auto-fix',
    title: 'Dynamic Discovery',
    description: 'Automatically discovers and adapts to your Acumatica schema, including custom fields and endpoints.',
    link: '/python/service-factory'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Type Safety',
    description: 'Full type hints and IDE support with dynamically generated stubs for your exact instance.',
    link: '/python/model-factory'
  },
  {
    icon: 'mdi-database-sync',
    title: 'Smart Client',
    description: 'Intelligent session management, automatic retries, and connection pooling.',
    link: '/python/client'
  },
  {
    icon: 'mdi-filter-variant',
    title: 'OData Filters',
    description: 'Powerful filtering with simple, intuitive syntax for complex queries.',
    link: '/python/odata/filters'
  },
  {
    icon: 'mdi-cog-outline',
    title: 'Query Options',
    description: 'Advanced query options for sorting, selection, and pagination.',
    link: '/python/odata/queryoptions'
  },
  {
    icon: 'mdi-rocket-launch',
    title: 'Quick Start',
    description: 'Get up and running with Easy-Acumatica in minutes.',
    link: '/python/quickstart'
  }
]);

const quickstartSteps = ref([
  {
    title: 'Install',
    description: 'Get the package from PyPI',
    code: 'pip install easy-acumatica',
    language: 'bash'
  },
  {
    title: 'Connect',
    description: 'Initialize your client',
    code: `client = EasyAcumatica(
    url="...", 
    username="..."
)`,
    language: 'python'
  },
  {
    title: 'Discover',
    description: 'Access any service',
    code: `service = client.service(
    'YourEndpoint'
)`,
    language: 'python'
  },
  {
    title: 'Execute',
    description: 'Start making API calls',
    code: `data = service.get_all()`,
    language: 'python'
  }
]);

const documentationLinks = ref([
  { title: 'Quick Start Guide', link: '/python/quickstart' },
  { title: 'Installation', link: '/python/installation' },
  { title: 'Client Configuration', link: '/python/client' },
  { title: 'Service Factory', link: '/python/service-factory' },
  { title: 'Model Factory', link: '/python/model-factory' }
]);

const exampleLinks = ref([
  { title: 'OData Filters', link: '/python/odata/filters' },
  { title: 'Query Options', link: '/python/odata/queryoptions' },
  { title: 'Migration Guide', link: '/python/migration' },
  { title: 'Basic Examples', link: '/python/examples' },
]);

const communityLinks = ref([
  { title: 'GitHub Repository', link: 'https://github.com/Nioron07/Easy-Acumatica' },
  { title: 'Issue Tracker', link: 'https://github.com/Nioron07/Easy-Acumatica/issues' },
  { title: 'PyPI Package', link: 'https://pypi.org/project/easy-acumatica/' },
  { title: 'Discord Community', link: 'https://discord.gg/easy-acumatica' }
]);
</script>

<style scoped>
/* Hero Section with Blue-Purple Gradient */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Background Effects */
.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* Gradient Orbs */
.gradient-orbs {
  position: absolute;
  inset: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(102,126,234,0.8) 0%, transparent 70%);
  top: -300px;
  left: -300px;
  animation: orb-float 20s ease-in-out infinite;
}

.orb-2 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(118,75,162,0.8) 0%, transparent 70%);
  bottom: -400px;
  right: -400px;
  animation: orb-float 25s ease-in-out infinite reverse;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: orb-pulse 15s ease-in-out infinite;
}

@keyframes orb-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(100px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 100px) scale(0.9);
  }
}

@keyframes orb-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.5;
  }
}

/* Grid Overlay */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  to {
    transform: translate(50px, 50px);
  }
}

/* Floating Code Snippets */
.floating-code {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.code-float {
  position: absolute;
  background: rgba(30, 30, 46, 0.8);
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(102, 126, 234, 0.3);
  animation: float-diagonal 20s infinite linear;
}

.code-1 { top: 10%; left: -300px; animation-delay: 0s; }
.code-2 { top: 30%; left: -300px; animation-delay: 5s; }
.code-3 { top: 50%; left: -300px; animation-delay: 10s; }
.code-4 { top: 70%; left: -300px; animation-delay: 15s; }

@keyframes float-diagonal {
  to {
    transform: translate(calc(100vw + 600px), -100px);
  }
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 2;
  padding: 4rem 0;
}

.version-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  animation: fadeInUp 0.8s ease;
}

.gradient-text-hero {
  background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 300;
  margin-bottom: 3rem;
  line-height: 1.6;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.hero-btn-primary {
  background: white !important;
  color: #667eea !important;
  font-weight: 600;
  padding: 0 2.5rem !important;
  height: 56px !important;
}

.hero-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2) !important;
}

.hero-btn-secondary {
  color: white !important;
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(10px);
  font-weight: 600;
  padding: 0 2.5rem !important;
  height: 56px !important;
}

.hero-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: white !important;
  transform: translateY(-3px);
}

.quick-install {
  animation: fadeInUp 0.8s ease 0.6s both;
}

/* Demo Section */
.demo-section {
  padding: 6rem 0;
  background: #f8f9fa;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #666;
  font-weight: 300;
}

/* Code Showcase */
.code-showcase-wrapper {
  height: 100%;
}

.code-showcase {
  background: #1e1e2e;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.code-header {
  background: #2d2d3f;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.code-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-red { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #28ca42; }

.code-title {
  color: #888;
  font-size: 0.875rem;
}

.code-content-wrapper {
  flex: 1;
  overflow: auto;
}

/* Fix CodeSnippet component integration */
.code-content-wrapper :deep(.code-card) {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}

.code-content-wrapper :deep(.code-toolbar) {
  display: none !important;
}

.code-content-wrapper :deep(pre) {
  background: #1e1e2e !important;
  margin: 0 !important;
  border-radius: 0 !important;
  max-height: 400px;
  overflow-y: auto !important;
}

/* Custom scrollbar for code */
.code-content-wrapper :deep(pre)::-webkit-scrollbar {
  width: 8px;
}

.code-content-wrapper :deep(pre)::-webkit-scrollbar-track {
  background: #2d2d3f;
}

.code-content-wrapper :deep(pre)::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 4px;
}

.code-content-wrapper :deep(pre)::-webkit-scrollbar-thumb:hover {
  background: #764ba2;
}

/* Feature Showcase */
.feature-showcase {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.showcase-tabs {
  background: linear-gradient(135deg, rgba(102,126,234,0.05) 0%, rgba(118,75,162,0.05) 100%);
  border-bottom: 2px solid rgba(102,126,234,0.1);
}

.showcase-tabs :deep(.v-tab) {
  color: #666;
  font-weight: 600;
}

.showcase-tabs :deep(.v-tab--selected) {
  color: #667eea;
}

.showcase-content {
  flex: 1;
  background: white;
}

.showcase-item {
  padding: 2rem;
}

.showcase-item h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 1rem;
}

.showcase-item p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-highlights {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  background: white;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  height: 100%;
  border: 1px solid rgba(102,126,234,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(102,126,234,0.15);
  border-color: rgba(102,126,234,0.2);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.delay-0 { animation-delay: 0s; }
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }

.feature-icon-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
}

.feature-icon-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
}

.feature-icon-wrapper .v-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 1rem;
}

.feature-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-link {
  font-weight: 600;
}

/* Quickstart Section */
.quickstart-section {
  padding: 6rem 0;
  background: #f8f9fa;
}

.quickstart-card {
  background: white;
  border: 1px solid rgba(102,126,234,0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  height: 100%;
}

.quickstart-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(102,126,234,0.15);
  border-color: rgba(102,126,234,0.2);
}

.step-number-circle {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
  box-shadow: 0 6px 20px rgba(102,126,234,0.25);
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 0.75rem;
}

.step-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.step-code {
  margin-top: 1rem;
}

/* Compact CodeSnippet adjustments */
.step-code :deep(.code-card),
.quick-install :deep(.code-card) {
  background: rgba(30, 30, 46, 0.95) !important;
}

/* Migration Section */
.migration-section {
  padding: 4rem 0;
  background: white;
}

.migration-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(102,126,234,0.2);
  position: relative;
  overflow: hidden;
}

.migration-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.migration-content {
  position: relative;
  z-index: 1;
}

.migration-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.migration-text {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
}

.migration-btn {
  background: white !important;
  color: #667eea !important;
  font-weight: 600;
}

.migration-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

/* Resources Section */
.resources-section {
  padding: 6rem 0 4rem;
  background: #f8f9fa;
}

.resource-card {
  border: 1px solid rgba(102,126,234,0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
  background: white !important;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(102,126,234,0.1);
  border-color: rgba(102,126,234,0.2);
}

.resource-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 1rem;
}

.resource-description {
  color: #666;
  margin-bottom: 2rem;
}

.resource-links {
  background: transparent;
}

.resource-links .v-list-item {
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.resource-links .v-list-item:hover {
  background: linear-gradient(135deg, rgba(102,126,234,0.05) 0%, rgba(118,75,162,0.05) 100%);
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .code-showcase {
    margin-bottom: 2rem;
  }
  
  .demo-container {
    grid-template-columns: 1fr;
  }
  
  .quickstart-card {
    margin-bottom: 1rem;
  }
}
</style>