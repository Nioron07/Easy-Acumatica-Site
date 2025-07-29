<template>
  <div class="python-home">
    <!-- Hero Section with Animated Background -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="code-animation">
          <pre class="floating-code code-1"><code>client = AcumaticaClient(...)</code></pre>
          <pre class="floating-code code-2"><code>bill = client.models.Bill()</code></pre>
          <pre class="floating-code code-3"><code>services = client.bills.get_list()</code></pre>
          <pre class="floating-code code-4"><code>client.invoices.put_entity(data)</code></pre>
        </div>
        <div class="grid-overlay"></div>
        <div class="gradient-orbs">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
      </div>
      
      <v-container class="hero-content">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" xl="8" class="text-center">
            <div class="version-badge">
              <v-icon size="small">mdi-rocket-launch</v-icon>
              v0.4.7 - The Dynamic Revolution
            </div>
            
            <h1 class="hero-title">
              <span class="title-line-1">Easy-Acumatica</span>
              <span class="title-line-2">
                <span class="dynamic-text">Python</span> Edition
              </span>
            </h1>
            
            <p class="hero-subtitle">
              The intelligent API wrapper that <span class="highlight">morphs to your instance</span>. 
              Zero maintenance. Full type safety. Unlimited possibilities.
            </p>
            
            <div class="hero-actions">
              <v-btn
                size="x-large"
                color="white"
                rounded="pill"
                class="hero-cta-primary"
                to="/python/quickstart"
                elevation="8"
              >
                <v-icon start>mdi-lightning-bolt</v-icon>
                Start Building
              </v-btn>
              
              <v-btn
                size="x-large"
                variant="outlined"
                color="white"
                rounded="pill"
                class="hero-cta-secondary"
                href="https://github.com/Nioron07/Easy-Acumatica"
                target="_blank"
              >
                <v-icon start>mdi-github</v-icon>
                View on GitHub
              </v-btn>
            </div>
            
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">0</div>
                <div class="stat-label">Manual Updates</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Field Coverage</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">∞</div>
                <div class="stat-label">Custom Fields</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Interactive Feature Demo -->
    <section class="demo-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title-large">
              <span class="gradient-text">See the Magic</span>
            </h2>
            <p class="section-subtitle-large">
              Watch how Easy-Acumatica adapts to your instance in real-time
            </p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" lg="6">
            <div class="code-showcase">
              <div class="code-header">
                <div class="code-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <span class="code-title">main.py</span>
              </div>
              <pre class="code-content"><code class="language-python">{{ currentCodeExample }}</code></pre>
            </div>
          </v-col>
          
          <v-col cols="12" lg="6">
            <div class="feature-showcase">
              <v-tabs v-model="showcaseTab" class="showcase-tabs">
                <v-tab value="discovery">
                  <v-icon start>mdi-magnify-scan</v-icon>
                  Discovery
                </v-tab>
                <v-tab value="models">
                  <v-icon start>mdi-shape</v-icon>
                  Models
                </v-tab>
                <v-tab value="services">
                  <v-icon start>mdi-api</v-icon>
                  Services
                </v-tab>
              </v-tabs>
              
              <v-tabs-window v-model="showcaseTab" class="showcase-content">
                <v-tabs-window-item value="discovery">
                  <div class="showcase-item">
                    <h3>Automatic Instance Discovery</h3>
                    <p>Connect once, and Easy-Acumatica maps your entire instance structure. Every endpoint, every field, every custom modification - all discovered automatically.</p>
                    <div class="feature-highlights">
                      <v-chip color="primary" variant="tonal">
                        <v-icon start size="small">mdi-check</v-icon>
                        Custom Endpoints
                      </v-chip>
                      <v-chip color="primary" variant="tonal">
                        <v-icon start size="small">mdi-check</v-icon>
                        Generic Inquiries
                      </v-chip>
                      <v-chip color="primary" variant="tonal">
                        <v-icon start size="small">mdi-check</v-icon>
                        Custom Actions
                      </v-chip>
                    </div>
                  </div>
                </v-tabs-window-item>
                
                <v-tabs-window-item value="models">
                  <div class="showcase-item">
                    <h3>Dynamic Model Generation</h3>
                    <p>Every entity becomes a fully-typed Python dataclass. Custom fields? They're there. New fields added? They appear instantly.</p>
                    <div class="feature-highlights">
                      <v-chip color="secondary" variant="tonal">
                        <v-icon start size="small">mdi-code-tags</v-icon>
                        Full Type Hints
                      </v-chip>
                      <v-chip color="secondary" variant="tonal">
                        <v-icon start size="small">mdi-auto-fix</v-icon>
                        IDE Autocomplete
                      </v-chip>
                      <v-chip color="secondary" variant="tonal">
                        <v-icon start size="small">mdi-puzzle</v-icon>
                        Custom Fields
                      </v-chip>
                    </div>
                  </div>
                </v-tabs-window-item>
                
                <v-tabs-window-item value="services">
                  <div class="showcase-item">
                    <h3>Intelligent Service Layer</h3>
                    <p>Services are created for every endpoint with methods that match your exact API capabilities. No guessing, no manual mapping.</p>
                    <div class="feature-highlights">
                      <v-chip color="accent" variant="tonal">
                        <v-icon start size="small">mdi-function</v-icon>
                        CRUD Operations
                      </v-chip>
                      <v-chip color="accent" variant="tonal">
                        <v-icon start size="small">mdi-filter</v-icon>
                        OData Support
                      </v-chip>
                      <v-chip color="accent" variant="tonal">
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
            <h2 class="section-title-large">
              <span class="gradient-text">Built for Developers</span>
            </h2>
            <p class="section-subtitle-large">
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

    <!-- Quick Start Path -->
    <section class="quickstart-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title-large">
              <span class="gradient-text">Get Started in Minutes</span>
            </h2>
            <p class="section-subtitle-large">
              From installation to your first API call
            </p>
          </v-col>
        </v-row>
        
        <div class="quickstart-timeline">
          <div class="timeline-line"></div>
          
          <v-row>
            <v-col 
              v-for="(step, index) in quickstartSteps" 
              :key="step.title"
              cols="12" 
              md="3"
            >
              <div class="timeline-step" :class="`step-${index + 1}`">
                <div class="step-connector"></div>
                <div class="step-number">{{ index + 1 }}</div>
                <h4 class="step-title">{{ step.title }}</h4>
                <p class="step-description">{{ step.description }}</p>
                <v-btn 
                  :to="step.link" 
                  variant="outlined" 
                  size="small"
                  color="primary"
                  rounded="pill"
                >
                  {{ step.action }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <!-- Migration CTA -->
    <section class="migration-section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="migration-card">
              <div class="migration-content">
                <v-row align="center">
                  <v-col cols="12" md="8">
                    <h3 class="migration-title">
                      <v-icon start color="warning">mdi-update</v-icon>
                      Upgrading from v0.3.x?
                    </h3>
                    <p class="migration-text">
                      Our comprehensive migration guide walks you through every breaking change 
                      and shows you how to leverage the new dynamic architecture.
                    </p>
                  </v-col>
                  <v-col cols="12" md="4" class="text-md-end">
                    <v-btn
                      size="large"
                      color="white"
                      rounded="pill"
                      to="/python/migration"
                      class="migration-btn"
                    >
                      View Migration Guide
                      <v-icon end>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Resources Grid -->
    <section class="resources-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="section-title-large">
              <span class="gradient-text">Dive Deeper</span>
            </h2>
            <p class="section-subtitle-large">
              Everything you need to master Easy-Acumatica
            </p>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';

// SEO Configuration
useSeoMeta({
  title: 'Easy-Acumatica Python | Dynamic API Integration for Acumatica ERP',
  description: 'The revolutionary Python library that automatically adapts to your Acumatica instance. Zero maintenance, full type safety, and complete API coverage including custom fields.',
  ogTitle: 'Easy-Acumatica Python - The Living API Integration',
  ogDescription: 'Transform your Acumatica integration with dynamic model generation, intelligent service discovery, and zero maintenance overhead.',
  ogImage: 'https://www.easyacumatica.com/social-images/python-home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica Python v0.4.7',
  twitterDescription: 'The Python library that morphs to your Acumatica instance. Dynamic, intelligent, and maintenance-free.',
  twitterImage: 'https://www.easyacumatica.com/social-images/python-home.png',
});

// State
const showcaseTab = ref('discovery');
const codeExampleIndex = ref(0);

// Code Examples
const codeExamples = [
  `# Initialize and watch the magic happen
from easy_acumatica import AcumaticaClient

client = AcumaticaClient(
    base_url="https://your.acumatica.com",
    username="api_user",
    password="secure_pass",
    tenant="Company"
)

# Everything is discovered automatically!
print(f"Found {len(dir(client.models))} models")
print(f"Found {len([s for s in dir(client) if s.endswith('s')])} services")`,
  
  `# Models are generated from YOUR instance
customer = client.models.Customer(
    CustomerID="PYTHON001",
    CustomerName="Dynamic Customer",
    # Your custom fields are here too!
    UsrCustomField="It just works!"
)

# Full IDE support with type hints
created = client.customers.put_entity(customer)`,
  
  `# Powerful querying with the F factory
from easy_acumatica import F, QueryOptions

# Build complex queries easily
recent_orders = client.sales_orders.get_list(
    options=QueryOptions(
        filter=(F.OrderDate >= "2024-01-01") & 
               (F.Status == "Open"),
        orderby="OrderTotal desc",
        top=10
    )
)`
];

const currentCodeExample = computed(() => codeExamples[codeExampleIndex.value]);

// Rotate code examples
let codeInterval;
onMounted(() => {
  codeInterval = setInterval(() => {
    codeExampleIndex.value = (codeExampleIndex.value + 1) % codeExamples.length;
  }, 5000);
});

onUnmounted(() => {
  if (codeInterval) clearInterval(codeInterval);
});

// Core Features
const coreFeatures = ref([
  {
    icon: 'mdi-magic-staff',
    title: 'Zero Configuration',
    description: 'Connect once and everything is discovered. No schema files, no manual updates, no maintenance.',
    link: '/python/quickstart'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Type Safety',
    description: 'Full IDE support with generated type stubs. Catch errors before runtime.',
    link: '/python/client'
  },
  {
    icon: 'mdi-puzzle',
    title: 'Custom Field Support',
    description: 'Every custom field in your instance is automatically available and typed.',
    link: '/python/model-factory'
  },
  {
    icon: 'mdi-api',
    title: 'Complete API Coverage',
    description: 'Access every endpoint, action, and inquiry. If it\'s in Acumatica, it\'s in Easy-Acumatica.',
    link: '/python/service-factory'
  },
  {
    icon: 'mdi-filter',
    title: 'Advanced Querying',
    description: 'Powerful OData support with an intuitive query builder. Filter, sort, and select with ease.',
    link: '/python/odata/filters'
  },
  {
    icon: 'mdi-lightning-bolt',
    title: 'Blazing Fast',
    description: 'Optimized for performance with smart caching, connection pooling, and lazy loading.',
    link: '/python/client'
  }
]);

// Quickstart Steps
const quickstartSteps = ref([
  {
    title: 'Install',
    description: 'One command to get started',
    action: 'View Guide',
    link: '/python/installation'
  },
  {
    title: 'Connect',
    description: 'Initialize with your credentials',
    action: 'Learn How',
    link: '/python/quickstart'
  },
  {
    title: 'Discover',
    description: 'Models & services auto-generate',
    action: 'See Magic',
    link: '/python/client'
  },
  {
    title: 'Build',
    description: 'Start integrating immediately',
    action: 'Get Started',
    link: '/python/quickstart'
  }
]);

// Resource Links
const documentationLinks = ref([
  { title: 'Client Configuration', link: '/python/client' },
  { title: 'Service Factory', link: '/python/service-factory' },
  { title: 'Model Factory', link: '/python/model-factory' },
  { title: 'Query Options', link: '/python/odata/queryoptions' },
  { title: 'Filters & F Factory', link: '/python/odata/filters' }
]);

const exampleLinks = ref([
  { title: 'Installation Guide', link: '/python/installation' },
  { title: 'Quickstart Tutorial', link: '/python/quickstart' },
  { title: 'Migration from v0.3', link: '/python/migration' },
  { title: 'Service Architecture', link: '/python/services/architecture' },
  { title: 'Available Methods', link: '/python/services/methods' }
]);

const communityLinks = ref([
  { title: 'GitHub Repository', link: 'https://github.com/Nioron07/Easy-Acumatica' },
  { title: 'Report an Issue', link: 'https://github.com/Nioron07/Easy-Acumatica/issues' },
  { title: 'Discussions', link: 'https://github.com/Nioron07/Easy-Acumatica/discussions' },
  { title: 'Release Notes', link: 'https://github.com/Nioron07/Easy-Acumatica/releases' }
]);
</script>

<style scoped>
.python-home {
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  background: #0a0a0a;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Floating Code Animation */
.code-animation {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}

.floating-code {
  position: absolute;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #5e35b1;
  white-space: nowrap;
  animation: float-diagonal 20s infinite linear;
}

.code-1 {
  top: 10%;
  left: -300px;
  animation-delay: 0s;
}

.code-2 {
  top: 30%;
  left: -300px;
  animation-delay: 5s;
}

.code-3 {
  top: 50%;
  left: -300px;
  animation-delay: 10s;
}

.code-4 {
  top: 70%;
  left: -300px;
  animation-delay: 15s;
}

@keyframes float-diagonal {
  to {
    transform: translate(calc(100vw + 600px), -100px);
  }
}

/* Grid Overlay */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(94, 53, 177, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(94, 53, 177, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 10s linear infinite;
}

@keyframes grid-move {
  to {
    transform: translate(50px, 50px);
  }
}

/* Gradient Orbs */
.gradient-orbs {
  position: absolute;
  inset: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  top: -300px;
  left: -300px;
  animation: orb-float 20s ease-in-out infinite;
}

.orb-2 {
  width: 800px;
  height: 800px;
  background: linear-gradient(135deg, #3949ab 0%, #5e35b1 100%);
  bottom: -400px;
  right: -400px;
  animation: orb-float 25s ease-in-out infinite reverse;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #7e57c2 0%, #9c27b0 100%);
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
    opacity: 0.4;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.6;
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
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.2) 0%, rgba(126, 87, 194, 0.2) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(94, 53, 177, 0.3);
  color: #e0e0e0;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(94, 53, 177, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(94, 53, 177, 0.5);
  }
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 0.9;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
}

.title-line-1 {
  display: block;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-line-2 {
  display: block;
  margin-top: 0.5rem;
}

.dynamic-text {
  background: linear-gradient(90deg, #5e35b1 0%, #7e57c2 25%, #9c27b0 50%, #7e57c2 75%, #5e35b1 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  to {
    background-position: 200% center;
  }
}

.hero-subtitle {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: #b0b0b0;
  font-weight: 300;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.highlight {
  color: #7e57c2;
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.hero-cta-primary {
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  color: white !important;
  font-weight: 600;
  padding: 0 3rem;
  transition: all 0.3s ease;
}

.hero-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(94, 53, 177, 0.4);
}

.hero-cta-secondary {
  border-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  font-weight: 600;
  padding: 0 3rem;
  transition: all 0.3s ease;
}

.hero-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.875rem;
  color: #808080;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(94, 53, 177, 0.3), transparent);
}

/* Demo Section */
.demo-section {
  padding: 6rem 0;
  background: #fafafa;
}

.section-title-large {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle-large {
  font-size: 1.5rem;
  color: #666;
  font-weight: 300;
}

.code-showcase {
  background: #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  height: 100%;
}

.code-header {
  background: #2d2d2d;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
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

.dot.red {
  background: #ff5f57;
}

.dot.yellow {
  background: #ffbd2e;
}

.dot.green {
  background: #28ca42;
}

.code-title {
  color: #808080;
  font-size: 0.875rem;
}

.code-content {
  padding: 2rem;
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #d4d4d4;
  height: 400px;
  overflow: auto;
}

.feature-showcase {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.showcase-tabs {
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.showcase-content {
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  flex: 1;
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
  border: 1px solid #e0e0e0;
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
  background: linear-gradient(90deg, #5e35b1 0%, #7e57c2 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: rgba(94, 53, 177, 0.2);
}

.feature-card:hover::before {
  transform: scaleX(1);
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
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
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
  background: #f5f7fa;
}

.quickstart-timeline {
  position: relative;
  margin-top: 3rem;
}

.timeline-line {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #5e35b1 0%, #7e57c2 100%);
  z-index: 0;
}

.timeline-step {
  position: relative;
  text-align: center;
  padding: 0 1rem;
}

.step-connector {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: white;
  border: 3px solid #5e35b1;
  border-radius: 50%;
  z-index: 2;
}

.step-number {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.3);
  position: relative;
  z-index: 1;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.step-description {
  color: #666;
  margin-bottom: 1rem;
}

/* Migration Section */
.migration-section {
  padding: 4rem 0;
  background: white;
}

.migration-card {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.migration-btn {
  background: white !important;
  color: #5e35b1 !important;
  font-weight: 600;
}

/* Resources Section */
.resources-section {
  padding: 6rem 0 4rem;
  background: #fafafa;
}

.resource-card {
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(94, 53, 177, 0.2);
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
  background: rgba(94, 53, 177, 0.05);
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
  }
  
  .code-showcase {
    margin-bottom: 2rem;
  }
  
  .timeline-line {
    display: none;
  }
  
  .step-connector {
    display: none;
  }
}
</style>