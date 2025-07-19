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
            <span class="gradient-text">Adapt.</span>
            <span class="gradient-text-2">Evolve.</span>
            <span class="gradient-text-3">Integrate.</span>
          </h1>
          
          <p class="hero-subtitle">
            The intelligent API wrapper that morphs to your Acumatica instance
          </p>
          
          <div class="hero-description">
            <p>Easy-Acumatica isn't just another integration tool—it's a living, breathing extension of your ERP that grows with your business.</p>
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
            <v-col cols="12" sm="auto">
              <v-btn
                size="x-large"
                color="white"
                variant="flat"
                rounded="pill"
                class="hero-btn hero-btn-secondary"
                to="/npm/home"
                elevation="8"
                block
              >
                <v-icon start size="large">mdi-npm</v-icon>
                NPM Docs
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
            <span class="gradient-text">Living Integration</span>
          </h2>
          <p class="section-subtitle mb-12">
            Your Acumatica instance is unique. Your integration should be too.
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

    <!-- Morphing Capabilities Section -->
    <section class="morphing-section">
      <div class="morph-background">
        <div class="morph-shape morph-1"></div>
        <div class="morph-shape morph-2"></div>
      </div>
      
      <v-row justify="center" class="position-relative">
        <v-col cols="12" md="10" class="text-center">
          <h2 class="section-title mb-12">
            <span class="gradient-text-2">Intelligent Flexibility</span>
          </h2>
          
          <v-row>
            <v-col 
              v-for="(capability, i) in morphingCapabilities" 
              :key="i"
              cols="12" 
              md="4"
              class="mb-8"
            >
              <div class="capability-card">
                <div class="capability-icon">
                  <v-icon :icon="capability.icon" size="48"></v-icon>
                </div>
                <h3 class="text-h5 font-weight-bold mb-3">{{ capability.title }}</h3>
                <p class="text-body-1 px-4">{{ capability.description }}</p>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>

    <!-- Benefits Showcase -->
    <section class="benefits-section py-16">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <h2 class="section-title text-center mb-12">
            <span class="gradient-text-3">Why Easy-Acumatica?</span>
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
            <span class="gradient-text">Built for Modern Development</span>
          </h2>
          <p class="section-subtitle mb-12">
            Choose your platform. We speak your language.
          </p>
          
          <v-row justify="center">
            <v-col cols="12" md="5" class="mb-8">
              <div class="tech-card python-card">
                <v-icon icon="mdi-language-python" size="80" class="mb-4"></v-icon>
                <h3 class="text-h4 font-weight-bold mb-4">Python</h3>
                <ul class="tech-features">
                  <li>Type-safe with full hints</li>
                  <li>Async support</li>
                  <li>Pythonic API design</li>
                  <li>Comprehensive error handling</li>
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
                  to="/npm/home"
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

    <!-- Stats Section -->
    <section class="stats-section py-16">
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-row>
            <v-col 
              v-for="(stat, i) in stats" 
              :key="i"
              cols="6" 
              md="3"
              class="text-center"
            >
              <div class="stat-item">
                <div class="stat-number" :data-value="stat.value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-gradient"></div>
      <v-row justify="center" class="position-relative">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="cta-title mb-6">
            Ready to transform your Acumatica integration?
          </h2>
          <p class="cta-subtitle mb-8">
            Join developers who are building smarter, more adaptive integrations.
          </p>
          
          <v-row justify="center">
            <v-col cols="12" sm="auto" class="mb-3 mb-sm-0">
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
                <v-icon start>mdi-github</v-icon>
                View on GitHub
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
  title: 'Easy-Acumatica | Adaptive API Integration for Acumatica ERP',
  description: 'The intelligent API wrapper that morphs to your Acumatica instance. Available for Python and Node.js. Simplify session management, OData queries, and seamlessly adapt to your ERP configuration.',
  ogTitle: 'Easy-Acumatica - The Living API Integration',
  ogDescription: 'Transform your Acumatica ERP integration with an API wrapper that grows with your business. Smart, adaptive, and available for Python and Node.js.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica: Adaptive ERP Integration',
  twitterDescription: 'The API wrapper that morphs to your Acumatica instance. Python & Node.js support.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
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
    'description': 'Adaptive API wrapper for Acumatica ERP integration',
    'url': 'https://www.easyacumatica.com'
  }
]);

// Page Content Data
const adaptationFeatures = ref([
  {
    icon: 'mdi-dna',
    title: 'Self-Discovering',
    description: 'Automatically detects and adapts to your custom fields, endpoints, and configurations.'
  },
  {
    icon: 'mdi-resize',
    title: 'Elastic Scaling',
    description: 'Grows with your business, supporting new modules and entities as you add them.'
  },
  {
    icon: 'mdi-puzzle-outline',
    title: 'Perfect Fit',
    description: 'Molds itself to your unique Acumatica setup, no rigid structures or assumptions.'
  },
  {
    icon: 'mdi-sync',
    title: 'Always Current',
    description: 'Stays synchronized with your instance changes, no manual updates needed.'
  }
]);

const morphingCapabilities = ref([
  {
    icon: 'mdi-shape-outline',
    title: 'Dynamic Typing',
    description: 'Intelligent type inference that adapts to your custom fields and entities in real-time.'
  },
  {
    icon: 'mdi-api',
    title: 'Smart Endpoints',
    description: 'Discovers and utilizes new API endpoints as they become available in your instance.'
  },
  {
    icon: 'mdi-brain',
    title: 'Context Aware',
    description: 'Understands your business logic and provides relevant methods and helpers automatically.'
  }
]);

const benefits = ref([
  {
    title: 'Zero Configuration Overhead',
    description: 'Start integrating immediately. Easy-Acumatica learns your setup on the fly, eliminating complex configuration files.'
  },
  {
    title: 'Future-Proof Architecture',
    description: 'As Acumatica evolves, so does your integration. No breaking changes, just seamless adaptation.'
  },
  {
    title: 'Developer Experience First',
    description: 'Intuitive APIs, comprehensive type hints, and intelligent error messages make development a breeze.'
  },
  {
    title: 'Enterprise-Grade Reliability',
    description: 'Battle-tested session management, automatic retries, and robust error handling for production use.'
  }
]);

const stats = ref([
  { value: '30+', label: 'Services' },
  { value: '100%', label: 'Type Safe' },
  { value: '2', label: 'Platforms' },
  { value: '∞', label: 'Flexibility' }
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
/* Hero Section */
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

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
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

/* Floating Shapes */
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
  animation: float-1 20s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  right: -100px;
  animation: float-2 15s ease-in-out infinite;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
  animation: float-3 25s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, -30px) scale(1.2); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(20px, 20px) rotate(180deg); }
}

/* Adaptation Section */
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

/* Morphing Section */
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
  animation: morph-1 20s ease-in-out infinite;
}

.morph-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #1e88e5 0%, #3949ab 100%);
  bottom: -200px;
  right: -200px;
  animation: morph-2 15s ease-in-out infinite;
}

@keyframes morph-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(100px, 100px) scale(1.2); }
}

@keyframes morph-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-50px, -50px) scale(0.8); }
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

/* Benefits Section */
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

/* Tech Section */
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

/* Stats Section */
.stats-section {
  background: #f8f9fa;
}

.stat-item {
  opacity: 0;
  transform: scale(0.8);
}

.stat-item.animate-in {
  opacity: 1;
  transform: scale(1);
  transition: all 0.6s ease;
}

.stat-number {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.25rem;
  color: #666;
  font-weight: 500;
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

/* Animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>