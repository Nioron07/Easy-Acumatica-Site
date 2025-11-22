<template>
  <v-container fluid class="pa-0">
    <!-- Hero Section with Animated Gradient -->
    <section class="hero-section">
      <div class="animated-gradient"></div>
      <v-row justify="center" align="center" class="hero-content">
        <v-col cols="12" md="10" class="text-center">
          <div class="logo-container mb-8">
            <v-card class="logo-card mx-auto" elevation="24">
              <v-img 
                src="../assets/LargeEasyAcumaticaLogo.webp" 
                alt="Easy-Acumatica Logo" 
                height="180" 
                width="420"
                class="logo-image"
              ></v-img>
            </v-card>
          </div>
          
          <h1 class="hero-title">
            Easy-Acumatica
          </h1>

          <p class="hero-subtitle">
            API client libraries for Acumatica ERP + Multi-Instance Management
          </p>

          <div class="hero-description">
            <p>Python and Node.js libraries that provide type-safe wrappers around the Acumatica REST API with automatic schema discovery and OData query support.</p>
            <p class="mt-4"><strong>Plus Orbu:</strong> A self-hosted web application for visually managing multiple Acumatica instances, browsing services and models, and deploying custom REST API endpoints.</p>
          </div>

          <v-row justify="center" class="mt-12 hero-buttons">
            <v-col cols="12" sm="auto" class="mb-3 mb-sm-0">
              <v-btn
                size="x-large"
                color="primary"
                variant="flat"
                rounded="pill"
                class="hero-btn"
                to="/python"
                elevation="8"
                block
              >
                <v-icon start size="large">mdi-language-python</v-icon>
                Python Docs
              </v-btn>
            </v-col>
            <v-col cols="12" sm="auto" class="mb-3 mb-sm-0">
              <v-btn
                size="x-large"
                color="white"
                variant="flat"
                rounded="pill"
                class="hero-btn hero-btn-secondary"
                to="/npm"
                elevation="8"
                block
              >
                <v-icon start size="large">mdi-npm</v-icon>
                NPM Docs
              </v-btn>
            </v-col>
            <v-col cols="12" sm="auto">
              <v-btn
                size="x-large"
                color="deep-purple-lighten-1"
                variant="flat"
                rounded="pill"
                class="hero-btn hero-btn-orbu"
                to="/orbu"
                elevation="8"
                block
              >
                Orbu Docs
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
      <!-- Floating Elements -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </section>

    <!-- Dynamic Adaptation Section -->
    <section class="adaptation-section py-16">
      <v-row justify="center">
        <v-col cols="12" md="10" class="text-center">
          <h2 class="section-title mb-4">
            <span class="gradient-text">Key Features</span>
          </h2>
          <p class="section-subtitle mb-12">
            Built to handle the complexities of Acumatica API integration
          </p>
        </v-col>
      </v-row>

      <v-row justify="center" class="px-4">
        <v-col cols="12" md="10">
          <div class="adaptation-grid">
            <div 
              v-for="(feature, i) in adaptationFeatures" 
              :key="i"
              class="adaptation-card"
              :class="`delay-${i}`"
            >
              <div class="card-gradient" :class="`gradient-${i % 4 + 1}`"></div>
              <v-icon :icon="feature.icon" size="60" class="mb-4"></v-icon>
              <h3 class="text-h5 font-weight-bold mb-3">{{ feature.title }}</h3>
              <p class="text-body-1">{{ feature.description }}</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- Benefits Showcase -->
    <section class="benefits-section py-16">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <h2 class="section-title text-center mb-12">
            <span class="gradient-text-3">Benefits</span>
          </h2>
          
          <div class="benefits-container">
            <div 
              v-for="(benefit, i) in benefits" 
              :key="i"
              class="benefit-item"
              :style="`--index: ${i}`"
            >
              <div class="benefit-number">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="benefit-content">
                <h3 class="text-h5 font-weight-bold mb-2">{{ benefit.title }}</h3>
                <p class="text-body-1">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- Technology Stack -->
    <section class="tech-section">
      <div class="tech-background"></div>
      <v-row justify="center" class="position-relative">
        <v-col cols="12" md="10" class="text-center">
          <h2 class="section-title mb-4">
            <span class="gradient-text">Choose Your Platform</span>
          </h2>
          <p class="section-subtitle mb-12">
            Python and Node.js client libraries
          </p>
          
          <v-row justify="center">
            <v-col cols="12" md="5" class="mb-8">
              <div class="tech-card python-card">
                <v-icon icon="mdi-language-python" size="80" class="mb-4"></v-icon>
                <h3 class="text-h4 font-weight-bold mb-4">Python</h3>
                <ul class="tech-features">
                  <li>Dataclass-based models</li>
                  <li>Automatic .env file loading</li>
                  <li>Differential caching</li>
                  <li>Built-in task scheduler</li>
                </ul>
                <v-btn
                  color="white"
                  rounded="pill"
                  size="large"
                  class="mt-6 tech-btn"
                  to="/python"
                  variant="flat"
                  block
                >
                  Explore Python Docs
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-col>
            
            <v-col cols="12" md="5" class="mb-8">
              <div class="tech-card npm-card">
                <v-icon icon="mdi-npm" size="80" class="mb-4"></v-icon>
                <h3 class="text-h4 font-weight-bold mb-4">Node.js</h3>
                <ul class="tech-features">
                  <li>TypeScript support</li>
                  <li>Promise-based API</li>
                  <li>Modern ES6+ syntax</li>
                  <li>Tree-shakeable modules</li>
                </ul>
                <v-btn
                  color="white"
                  rounded="pill"
                  size="large"
                  class="mt-6 tech-btn"
                  to="/npm"
                  variant="flat"
                  block
                >
                  Explore NPM Docs
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>

    <!-- Orbu Section -->
    <section class="orbu-section">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <div class="orbu-container">
            <div class="orbu-glow"></div>
            <div class="orbu-content">
              <div class="orbu-header">
                <v-img
                  src="../assets/Orbu_Large_Logo.png"
                  alt="Orbu Logo"
                  max-width="400"
                  class="mx-auto mb-4"
                />
                <p class="orbu-subtitle mb-6">
                  Self-Hosted Multi-Instance Management Platform
                </p>
              </div>

              <p class="orbu-description mb-8">
                Built on Easy-Acumatica Python, Orbu is a powerful self-hosted web application that provides a visual
                interface for building integrations and working with multiple Acumatica instances. Perfect for teams managing
                multiple Acumatica environments, Orbu lets you browse services and models interactively, test endpoints
                in real-time, and deploy custom REST API endpoints with automatic schema generation—all from a single,
                secure interface.
              </p>

              <div class="orbu-features mb-8">
                <div class="orbu-feature">
                  <v-icon size="24">mdi-server-network</v-icon>
                  <span>Multi-Client Management</span>
                </div>
                <div class="orbu-feature">
                  <v-icon size="24">mdi-api</v-icon>
                  <span>Endpoint Deployment</span>
                </div>
                <div class="orbu-feature">
                  <v-icon size="24">mdi-shield-lock</v-icon>
                  <span>Encrypted Credentials</span>
                </div>
                <div class="orbu-feature">
                  <v-icon size="24">mdi-docker</v-icon>
                  <span>Docker Deployment</span>
                </div>
              </div>

              <div class="d-flex gap-4 justify-center flex-wrap">
                <v-btn
                  to="/orbu"
                  size="x-large"
                  rounded="pill"
                  class="orbu-btn"
                  elevation="8"
                >
                  <v-icon start>mdi-book-open-variant</v-icon>
                  View Documentation
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
                <v-btn
                  href="https://github.com/Nioron07/Orbu"
                  target="_blank"
                  rel="noopener"
                  size="x-large"
                  rounded="pill"
                  class="orbu-btn-secondary"
                  elevation="8"
                >
                  <v-icon start>mdi-github</v-icon>
                  View on GitHub
                  <v-icon end>mdi-open-in-new</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- About the Team Section -->
    <section class="about-section">
      <v-row justify="center">
        <v-col cols="12" md="10" class="text-center">
          <h2 class="section-title mb-4">
            <span class="gradient-text">About the Team</span>
          </h2>
          <p class="section-subtitle mb-8">
            Meet the people behind Easy-Acumatica
          </p>
          <v-btn
            to="/about"
            size="large"
            color="deep-purple"
            variant="flat"
            rounded="pill"
            class="mt-4"
          >
            <v-icon start>mdi-account-group</v-icon>
            Meet the Team
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-gradient"></div>
      <v-row justify="center" class="position-relative">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="cta-title mb-6">
            Contribute
          </h2>
          <p class="cta-subtitle mb-8">
            View the source code, report issues, or contribute on GitHub
          </p>

          <v-row justify="center" class="github-buttons">
            <v-col cols="12" sm="6" md="auto" class="mb-3">
              <v-btn
                size="x-large"
                color="white"
                rounded="pill"
                class="cta-btn"
                href="https://github.com/Nioron07/Easy-Acumatica"
                target="_blank"
                elevation="12"
                block
              >
                <v-icon start>mdi-language-python</v-icon>
                Python on GitHub
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="auto" class="mb-3">
              <v-btn
                size="x-large"
                color="white"
                rounded="pill"
                class="cta-btn"
                href="https://github.com/joebewon/Easy-Acumatica"
                target="_blank"
                elevation="12"
                block
              >
                <v-icon start>mdi-npm</v-icon>
                NPM on GitHub
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Tell Nuxt to use the 'landing' layout for this page
definePageMeta({
  layout: 'landing',
});

// SEO Configuration
useSeoMeta({
  title: 'Easy-Acumatica | Acumatica API Libraries + Orbu',
  description: 'Python & Node.js libraries for Acumatica ERP with schema discovery and OData support. Includes Orbu for managing multiple instances.',
  ogTitle: 'Easy-Acumatica - API Wrapper for Acumatica ERP',
  ogDescription: 'Type-safe Python and Node.js libraries for Acumatica REST API. Features automatic schema discovery, OData support, intelligent caching, and Orbu multi-instance management platform.',
  ogType: 'website',
  ogUrl: 'https://easyacumatica.com',
  ogImage: 'https://easyacumatica.com/social-images/home.png',
  ogImageAlt: 'Easy-Acumatica Logo',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica: Python & Node.js API Wrapper + Orbu Platform',
  twitterDescription: 'Type-safe API clients for Acumatica ERP with automatic schema discovery, OData support, and Orbu multi-instance management.',
  twitterImage: 'https://easyacumatica.com/social-images/home.png',
  twitterSite: '@easyacumatica',
  robots: 'index, follow',
  author: 'Easy-Acumatica Team',
  keywords: 'Acumatica, API, Python, Node.js, ERP, REST API, OData, Schema Discovery, Type Safety, API Wrapper, Orbu, Multi-Instance Management, Acumatica Integration, Self-Hosted'
});

// Structured Data for SEO
useSchemaOrg([
  {
    '@type': 'SoftwareApplication',
    'name': 'Easy-Acumatica',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Cross-platform',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': 'Type-safe API client libraries for Acumatica ERP with automatic schema discovery, OData queries, and intelligent caching',
    'url': 'https://easyacumatica.com',
    'softwareVersion': '0.5.10',
    'programmingLanguage': ['Python', 'JavaScript'],
    'screenshot': 'https://easyacumatica.com/social-images/home.png',
    'featureList': [
      'Automatic schema discovery',
      'Type-safe models and services',
      'OData query support',
      'Intelligent caching',
      'Session management',
      'File attachments',
      'Custom field support',
      'Orbu multi-instance management',
      'REST API endpoint deployment',
      'Self-hosted web application'
    ]
  },
  {
    '@type': 'WebSite',
    'name': 'Easy-Acumatica Documentation',
    'url': 'https://easyacumatica.com',
    'description': 'Official documentation for Easy-Acumatica API wrapper libraries',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://easyacumatica.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  },
  {
    '@type': 'Organization',
    'name': 'Easy-Acumatica',
    'url': 'https://easyacumatica.com',
    'logo': 'https://easyacumatica.com/assets/LargeEasyAcumaticaLogo.webp',
    'sameAs': [
      'https://github.com/Nioron07/Easy-Acumatica',
      'https://github.com/joebewon/Easy-Acumatica',
      'https://github.com/Nioron07/Orbu',
      'https://pypi.org/project/easy-acumatica/'
    ]
  }
]);

// Page Content Data
const adaptationFeatures = ref([
  {
    icon: 'mdi-api',
    title: 'Schema Discovery',
    description: 'Fetches OpenAPI schema from your Acumatica instance and generates models and services dynamically, including custom fields.'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Type Safety',
    description: 'Generates type hints and TypeScript definitions based on your actual schema for IDE autocomplete and type checking.'
  },
  {
    icon: 'mdi-cached',
    title: 'Intelligent Caching',
    description: 'Differential caching system that only rebuilds changed components, reducing initialization time by 10-20x.'
  },
  {
    icon: 'mdi-sync',
    title: 'Session Management',
    description: 'Handles authentication, automatic re-login on timeout, connection pooling, and retry logic for reliable API access.'
  }
]);

const morphingCapabilities = ref([
  {
    icon: 'mdi-filter',
    title: 'OData Queries',
    description: 'Python-style filter expressions using operator overloading that compile to OData query strings. Supports filtering, sorting, pagination, and field selection.'
  },
  {
    icon: 'mdi-file-upload',
    title: 'File Operations',
    description: 'Methods for uploading, downloading, and managing file attachments on any entity that supports them.'
  },
  {
    icon: 'mdi-clock-outline',
    title: 'Task Scheduling',
    description: 'Built-in scheduler for running periodic background tasks with interval or cron-based scheduling (Python only).'
  }
]);

const benefits = ref([
  {
    title: 'No Manual Schema Maintenance',
    description: 'Schema is fetched from your instance at runtime. When you add custom fields or endpoints, they are automatically available without code changes.'
  },
  {
    title: 'Reduced Boilerplate',
    description: 'Generated models and services eliminate the need to manually define data structures and API calls for each endpoint.'
  },
  {
    title: 'IDE Support',
    description: 'Type hints and auto-generated documentation provide autocomplete, inline documentation, and type checking in your editor.'
  },
  {
    title: 'Production Ready',
    description: 'Includes session management, connection pooling, automatic retries, rate limiting, and detailed exception classes for error handling.'
  }
]);
// Add scroll animations
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.adaptation-card, .capability-card, .benefit-item, .tech-card, .stat-item').forEach(el => {
    observer.observe(el);
  });
});
</script>

<style scoped>
/* Hero Section - Landing page header with animated gradient background */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.animated-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    -45deg,
    #1a237e,
    #3949ab,
    #5e35b1,
    #7e57c2,
    #9575cd,
    #b39ddb
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  opacity: 0.95;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.logo-container {
  animation: float 6s ease-in-out infinite;
}

.logo-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  width: fit-content;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-2 {
  background: linear-gradient(135deg, #3949ab 0%, #5e35b1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-3 {
  background: linear-gradient(135deg, #1e88e5 0%, #3949ab 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.25rem, 3vw, 2rem);
  color: white;
  font-weight: 300;
  margin-bottom: 2rem;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.hero-description {
  max-width: 600px;
  margin: 0 auto 3rem;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

/* Hero Decorative Elements - Blurred circular shapes in background */
.floating-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -150px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  right: -100px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
}

/* Dynamic Schema Adaptation Section - Cards showing schema generation features */
.adaptation-section {
  background: #f8f9fa;
  position: relative;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.5rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.adaptation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.adaptation-card {
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
}

.adaptation-card.animate-in {
  opacity: 1;
  transform: translateY(0);
  transition-duration: 0.6s;
}

.adaptation-card.delay-0 { transition-delay: 0s; }
.adaptation-card.delay-1 { transition-delay: 0.1s; }
.adaptation-card.delay-2 { transition-delay: 0.2s; }
.adaptation-card.delay-3 { transition-delay: 0.3s; }

.card-gradient {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gradient-1 { background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%); }
.gradient-2 { background: linear-gradient(135deg, #3949ab 0%, #5e35b1 100%); }
.gradient-3 { background: linear-gradient(135deg, #1e88e5 0%, #3949ab 100%); }
.gradient-4 { background: linear-gradient(135deg, #7e57c2 0%, #9575cd 100%); }

.adaptation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.adaptation-card:hover .card-gradient {
  opacity: 0.1;
}

/* Additional Capabilities Section - OData, files, and scheduling features */
.morphing-section {
  position: relative;
  padding: 8rem 0;
  overflow: hidden;
}

.morph-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
}

.morph-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
}

.morph-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  top: -300px;
  left: -300px;
}

.morph-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #1e88e5 0%, #3949ab 100%);
  bottom: -200px;
  right: -200px;
}

.capability-card {
  text-align: center;
  padding: 2rem;
  opacity: 0;
  transform: translateY(30px);
}

.capability-card.animate-in {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease;
}

.capability-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.capability-icon v-icon {
  transform: rotate(-45deg);
}

.capability-card:hover .capability-icon {
  transform: rotate(0deg);
}

/* Key Benefits Section - Why use Easy-Acumatica value propositions */
.benefits-container {
  display: grid;
  gap: 3rem;
}

.benefit-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  opacity: 0;
  transform: translateX(-30px);
}

.benefit-item.animate-in {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.6s ease;
  transition-delay: calc(var(--index) * 0.1s);
}

.benefit-number {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

/* Technology Stack Section - Python and Node.js implementation cards */
.tech-section {
  position: relative;
  padding: 8rem 0;
  background: #0a0a0a;
  color: white;
}

.tech-background {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(94, 53, 177, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(126, 87, 194, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(57, 73, 171, 0.3) 0%, transparent 50%);
}

.tech-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  color: white;
  opacity: 0;
  transform: translateY(30px);
}

.tech-card.animate-in {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease;
}

.python-card { 
  background: linear-gradient(135deg, rgba(57, 73, 171, 0.2) 0%, rgba(57, 73, 171, 0.1) 100%);
  border: 1px solid rgba(57, 73, 171, 0.3);
}

.npm-card { 
  background: linear-gradient(135deg, rgba(126, 87, 194, 0.2) 0%, rgba(126, 87, 194, 0.1) 100%);
  border: 1px solid rgba(126, 87, 194, 0.3);
}

.tech-card:hover {
  transform: translateY(-10px);
  border-color: rgba(255, 255, 255, 0.3);
}

.tech-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  text-align: left;
  display: inline-block;
}

.tech-features li {
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
}

.tech-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
}

/* About the Team Section */
.about-section {
  padding: 6rem 0;
  background: white;
}

/* CTA Section */
.cta-section {
  position: relative;
  padding: 8rem 0;
  overflow: hidden;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.95;
}

.cta-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.cta-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.cta-btn {
  min-width: 220px;
  height: 64px !important;
  font-size: 1.25rem !important;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.95) !important;
  color: #5e35b1 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  background: white !important;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2) !important;
}

.github-buttons {
  gap: 1rem;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-section {
    min-height: 80vh;
  }
  
  .adaptation-grid {
    gap: 1.5rem;
  }
  
  .benefit-item {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .benefit-number {
    margin: 0 auto;
  }
  
  .tech-features {
    text-align: center;
  }
  
  .tech-features li {
    padding-left: 0;
  }
  
  .tech-features li::before {
    display: none;
  }
}

.hero-buttons {
  margin-top: 3rem !important;
}

.hero-btn {
  min-width: 220px;
  height: 64px !important;
  font-size: 1.25rem !important;
  font-weight: 500;
  letter-spacing: 0.025em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.hero-btn-secondary {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #5e35b1 !important;
  border: 2px solid #5e35b1 !important;
}

.hero-btn-secondary:hover {
  background: #5e35b1 !important;
  color: white !important;
}

.hero-btn-orbu {
  background: linear-gradient(135deg, #7e57c2 0%, #9575cd 100%) !important;
  color: white !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
}

.hero-btn-orbu:hover {
  background: linear-gradient(135deg, #9575cd 0%, #b39ddb 100%) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  transform: translateY(-2px);
}

/* Button Styles */
.border-thick {
  border-width: 2px !important;
}

.tech-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  font-weight: 500;
  padding: 0 2rem !important;
  height: 48px !important;
  transition: all 0.3s ease !important;
}

.tech-btn:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
  transform: translateY(-2px);
}

/* Orbu Section */
.orbu-section {
  padding: 6rem 0;
  background: #f8f9fa;
  position: relative;
}

.orbu-section :deep(.v-img) {
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.orbu-container {
  position: relative;
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%);
  border-radius: 32px;
  padding: 4rem;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(94, 53, 177, 0.3);
}

.orbu-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #5e35b1, #7e57c2, #3949ab);
  border-radius: 32px;
  opacity: 0.5;
  filter: blur(20px);
  z-index: 0;
}

.orbu-content {
  position: relative;
  z-index: 1;
  color: white;
}

.orbu-header {
  margin-bottom: 2rem;
}

.orbu-icon {
  color: rgba(255, 255, 255, 0.9);
}

.orbu-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.orbu-subtitle {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
}

.orbu-description {
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  max-width: 800px;
  margin: 0 auto 2rem;
}

.orbu-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.orbu-feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
}

.orbu-feature:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.orbu-btn {
  background: white !important;
  color: #5e35b1 !important;
  font-weight: 600;
  min-width: 240px;
  height: 64px !important;
  margin-right: 1vh;
  font-size: 1.125rem !important;
  transition: all 0.3s ease;
}

.orbu-btn:hover {
  background: rgba(255, 255, 255, 0.95) !important;
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3) !important;
}

.orbu-btn-secondary {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  font-weight: 600;
  min-width: 240px;
  height: 64px !important;
  font-size: 1.125rem !important;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(10px);
}

.orbu-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25) !important;
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}

@media (max-width: 960px) {
  .orbu-container {
    padding: 3rem 2rem;
  }

  .orbu-features {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>