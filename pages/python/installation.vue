<template>
  <div class="installation-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-gradient"></div>
      <div class="geometric-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      
      <v-container class="hero-content">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <div class="hero-badge mb-4">
              <v-chip color="white" variant="outlined" size="large" class="hero-chip">
                <v-icon start>mdi-package-variant</v-icon>
                v0.4.0 Latest
              </v-chip>
            </div>
            
            <h1 class="hero-title">
              Installation
              <span class="gradient-text">Made Simple</span>
            </h1>
            
            <p class="hero-subtitle">
              Get Easy-Acumatica up and running in seconds with pip
            </p>
            
            <div class="install-command-wrapper">
              <div class="command-container">
                <code class="command-text">pip install easy-acumatica</code>
                <v-btn
                  icon
                  variant="text"
                  class="copy-btn"
                  @click="copyCommand"
                >
                  <v-icon>{{ copied ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Prerequisites Section -->
    <section class="prerequisites-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="section-title">Before You Begin</h2>
            <p class="section-subtitle">Everything you need to get started</p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col 
            v-for="prereq in prerequisites" 
            :key="prereq.title"
            cols="12" 
            md="4"
          >
            <v-card 
              class="prereq-card h-100"
              variant="flat"
              elevation="0"
            >
              <div class="card-gradient"></div>
              <v-card-item>
                <div class="prereq-icon mb-4">
                  <v-icon :icon="prereq.icon" size="48"></v-icon>
                </div>
                <v-card-title class="text-h5 font-weight-bold mb-2">
                  {{ prereq.title }}
                </v-card-title>
                <v-card-subtitle class="text-body-1">
                  {{ prereq.description }}
                </v-card-subtitle>
                <div class="requirement-chip mt-3">
                  <v-chip :color="prereq.color" variant="tonal" label>
                    {{ prereq.requirement }}
                  </v-chip>
                </div>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Installation Steps -->
    <section class="steps-section">
      <v-container>
        <v-row>
          <v-col cols="12" md="8" offset-md="2">
            <h2 class="section-title text-center mb-8">Installation Process</h2>
            
            <!-- Step 1 -->
            <div class="step-card">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Install via pip</h3>
                <p class="step-description mb-4">
                  Run this command in your terminal to install Easy-Acumatica and its dependencies
                </p>
                <div class="code-block">
                  <pre><code>pip install easy-acumatica</code></pre>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="step-card">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Verify Installation</h3>
                <p class="step-description mb-4">
                  Confirm the package is properly installed by checking the version
                </p>
                <div class="code-block">
                  <pre><code>python -c "import easy_acumatica; print(easy_acumatica.__version__)"</code></pre>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="step-card">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Ready to Go!</h3>
                <p class="step-description mb-4">
                  You're all set! The package automatically handles all dependencies including the requests library.
                </p>
                <v-btn
                  color="primary"
                  size="large"
                  rounded="pill"
                  href="/python/quickstart"
                  class="mt-2"
                >
                  Continue to Quickstart
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Advanced Installation -->
    <section class="advanced-section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-expansion-panels class="advanced-panels">
              <v-expansion-panel>
                <v-expansion-panel-title class="panel-title">
                  <v-icon start>mdi-cog</v-icon>
                  Advanced Installation Options
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="panel-content">
                    <h4 class="mb-3">Development Installation</h4>
                    <p class="mb-4">For contributing or testing the latest features:</p>
                    <div class="code-block mb-6">
                      <pre><code>git clone https://github.com/Nioron07/Easy-Acumatica.git
cd Easy-Acumatica
pip install -e .</code></pre>
                    </div>

                    <h4 class="mb-3">Specific Version</h4>
                    <p class="mb-4">Install a particular version:</p>
                    <div class="code-block mb-6">
                      <pre><code>pip install easy-acumatica==0.4.0</code></pre>
                    </div>

                    <h4 class="mb-3">Virtual Environment (Recommended)</h4>
                    <p class="mb-4">Best practice for project isolation:</p>
                    <div class="code-block">
                      <pre><code>python -m venv myproject-env
source myproject-env/bin/activate  # On Windows: myproject-env\Scripts\activate
pip install easy-acumatica</code></pre>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Next Steps CTA -->
    <section class="cta-section">
      <div class="cta-gradient"></div>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="cta-title">Ready to Build?</h2>
            <p class="cta-subtitle mb-8">
              Start integrating with Acumatica in minutes
            </p>
            
            <v-row justify="center">
              <v-col cols="12" sm="auto">
                <v-btn
                  size="x-large"
                  color="white"
                  rounded="pill"
                  href="/python/quickstart"
                  class="cta-btn"
                >
                  <v-icon start>mdi-rocket-launch</v-icon>
                  View Quickstart Guide
                </v-btn>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-btn
                  size="x-large"
                  variant="outlined"
                  color="white"
                  rounded="pill"
                  href="/python/client"
                  class="cta-btn-outline"
                >
                  Explore API Reference
                </v-btn>
              </v-col>
            </v-row>
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

// Copy command functionality
const copied = ref(false);
const copyCommand = () => {
  navigator.clipboard.writeText('pip install easy-acumatica');
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

// Prerequisites data
const prerequisites = ref([
  {
    icon: 'mdi-language-python',
    title: 'Python Environment',
    description: 'A modern Python installation with pip package manager',
    requirement: 'Python 3.7+',
    color: 'primary'
  },
  {
    icon: 'mdi-server',
    title: 'Acumatica Instance',
    description: 'Access to an Acumatica ERP instance with REST API enabled',
    requirement: 'REST API Enabled',
    color: 'secondary'
  },
  {
    icon: 'mdi-account-key',
    title: 'API Credentials',
    description: 'Valid username, password, tenant, and branch for authentication',
    requirement: 'User Access',
    color: 'accent'
  }
]);

// SEO
useSeoMeta({
  title: 'Installation Guide | Easy-Acumatica v0.4',
  description: 'Install Easy-Acumatica Python package with pip. Complete guide with prerequisites, advanced options, and virtual environment setup.',
  ogTitle: 'Easy-Acumatica Installation - Quick & Simple',
  ogDescription: 'Get started with Easy-Acumatica in seconds. Install via pip and start building adaptive Acumatica integrations.',
  ogImage: 'https://www.easyacumatica.com/social-images/installation.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Install Easy-Acumatica for Python',
  twitterDescription: 'Simple pip install for adaptive Acumatica ERP integration. Python 3.7+ supported.',
  twitterImage: 'https://www.easyacumatica.com/social-images/installation.png',
});
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  background: #0a0e27;
  overflow: hidden;
  padding: 6rem 0 4rem;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.9;
}

.geometric-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  opacity: 0.1;
}

.shape-1 {
  top: 10%;
  left: 5%;
  width: 150px;
  height: 150px;
  background: white;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  top: 60%;
  right: 10%;
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: float 15s ease-in-out infinite reverse;
}

.shape-3 {
  bottom: 10%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: white;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  animation: rotate 25s linear infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(0) translateX(-10px); }
  75% { transform: translateY(20px) translateX(5px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-chip {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #82b1ff 0%, #b388ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin-bottom: 3rem;
}

/* Install Command */
.install-command-wrapper {
  display: inline-block;
  position: relative;
}

.command-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.command-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.command-text {
  font-family: 'Fira Code', monospace;
  font-size: 1.25rem;
  color: #5e35b1;
  font-weight: 500;
}

.copy-btn {
  color: #5e35b1 !important;
}

/* Prerequisites Section */
.prerequisites-section {
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

.prereq-card {
  position: relative;
  overflow: hidden;
  border-radius: 20px !important;
  background: white;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.prereq-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(94, 53, 177, 0.15) !important;
  border-color: #5e35b1;
}

.card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.prereq-card:hover .card-gradient {
  opacity: 0.05;
}

.prereq-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 16px rgba(94, 53, 177, 0.3);
}

.requirement-chip {
  margin-top: auto;
}

/* Steps Section */
.steps-section {
  padding: 5rem 0;
}

.step-card {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.15);
}

.step-card:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 3rem;
  bottom: -1.5rem;
  width: 2px;
  height: 1.5rem;
  background: linear-gradient(to bottom, #5e35b1, transparent);
}

.step-number {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(94, 53, 177, 0.3);
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.step-description {
  color: #666;
  line-height: 1.6;
}

.code-block {
  background: #0a0e27;
  color: #82b1ff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-size: 0.95rem;
}

/* Advanced Section */
.advanced-section {
  padding: 3rem 0 5rem;
  background: #f8f9fa;
}

.advanced-panels {
  background: transparent !important;
}

.panel-title {
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1.5rem 2rem;
  background: white;
  border-radius: 12px !important;
}

.panel-content {
  padding: 2rem;
}

.panel-content h4 {
  color: #1a237e;
  font-weight: 600;
}

/* CTA Section */
.cta-section {
  position: relative;
  padding: 5rem 0;
  background: #0a0e27;
  overflow: hidden;
}

.cta-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.9;
}

.cta-section .v-container {
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
}

.cta-btn {
  background: white !important;
  color: #5e35b1 !important;
  font-weight: 600;
  padding: 0 2.5rem !important;
  height: 56px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.cta-btn-outline {
  border-color: white !important;
  color: white !important;
  font-weight: 600;
  padding: 0 2.5rem !important;
  height: 56px !important;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1) !important;
}

.cta-btn-outline:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .command-text {
    font-size: 1rem;
  }
  
  .step-card {
    flex-direction: column;
    text-align: center;
  }
  
  .step-card:not(:last-child)::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>