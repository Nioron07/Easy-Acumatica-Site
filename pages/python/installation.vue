<template>
  <div class="installation-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Installation</h1>
              <p class="hero-subtitle">Install Easy-Acumatica v0.5.4 via pip</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-container fluid class="main-content">
      <v-container>
        <v-row>
          <v-col cols="12" md="9">
            <v-container>
              <!-- Prerequisites -->
              <section id="prerequisites" class="doc-section">
            <h2>Prerequisites</h2>
            <ul>
              <li>Python 3.7 or higher</li>
              <li>pip package manager</li>
              <li>Access to an Acumatica instance with REST API enabled</li>
              <li>API credentials (username, password, tenant)</li>
            </ul>
          </section>

          <!-- Basic Installation -->
          <section id="basic-installation" class="doc-section">
            <h2>Basic Installation</h2>
            <p>Install from PyPI:</p>
            <CodeSnippet :code="basicInstall" language="bash" />
          </section>

          <!-- Verify Installation -->
          <section id="verify" class="doc-section">
            <h2>Verify Installation</h2>
            <p>Check the installed version:</p>
            <CodeSnippet :code="verifyInstall" language="bash" />
          </section>

          <!-- Virtual Environment -->
          <section id="virtual-environment" class="doc-section">
            <h2>Virtual Environment (Recommended)</h2>
            <p>Use a virtual environment to isolate dependencies:</p>
            <CodeSnippet :code="venvInstall" language="bash" />
          </section>

          <!-- Specific Version -->
          <section id="specific-version" class="doc-section">
            <h2>Install Specific Version</h2>
            <p>Install a particular version:</p>
            <CodeSnippet :code="specificVersion" language="bash" />
          </section>

          <!-- Development Installation -->
          <section id="development" class="doc-section">
            <h2>Development Installation</h2>
            <p>Install from source for development:</p>
            <CodeSnippet :code="devInstall" language="bash" />
          </section>

          <!-- Next Steps -->
          <section id="next-steps" class="doc-section">
            <h2>Next Steps</h2>
            <p>
              After installation, see the
              <NuxtLink to="/python/quickstart">Quickstart Guide</NuxtLink>
              to begin using Easy-Acumatica.
            </p>
          </section>
            </v-container>
          </v-col>

          <!-- Sticky Navigation -->
          <v-col cols="12" md="3" class="d-none d-md-block">
            <div class="sticky-container">
              <OnPageNav :items="navItems" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import OnPageNav from '~/components/OnPageNav.vue';

// Navigation items
const navItems = ref([
  { id: 'prerequisites', title: 'Prerequisites', icon: 'mdi-clipboard-list' },
  { id: 'basic-installation', title: 'Basic Installation', icon: 'mdi-download' },
  { id: 'verify', title: 'Verify Installation', icon: 'mdi-check-circle' },
  { id: 'virtual-environment', title: 'Virtual Environment', icon: 'mdi-package-variant' },
  { id: 'specific-version', title: 'Specific Version', icon: 'mdi-tag' },
  { id: 'development', title: 'Development', icon: 'mdi-code-braces' },
  { id: 'next-steps', title: 'Next Steps', icon: 'mdi-arrow-right' },
]);

const basicInstall = `pip install easy-acumatica`;

const verifyInstall = `python -c "import easy_acumatica; print(easy_acumatica.__version__)"`;

const venvInstall = `# Create virtual environment
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\\Scripts\\activate

# Install package
pip install easy-acumatica`;

const specificVersion = `pip install easy-acumatica==0.5.4`;

const devInstall = `git clone https://github.com/Nioron07/Easy-Acumatica.git
cd Easy-Acumatica
pip install -e .`;

useSeoMeta({
  title: 'Installation | Easy-Acumatica Python',
  description: 'Install Easy-Acumatica Python package via pip. Requirements: Python 3.7+, Acumatica instance with REST API.',
  ogTitle: 'Install Easy-Acumatica Python Library',
  ogDescription: 'How to install Easy-Acumatica Python library for Acumatica ERP integration. Support for pip, virtual environments, and development installation.',
  ogType: 'article',
  ogUrl: 'https://www.easyacumatica.com/python/installation',
  robots: 'index, follow',
  keywords: 'pip install easy-acumatica, Python Acumatica library, install Acumatica SDK, Python ERP package'
});

useSchemaOrg([
  {
    '@type': 'TechArticle',
    'headline': 'Easy-Acumatica Python Installation Guide',
    'description': 'Complete installation instructions for Easy-Acumatica Python library',
    'url': 'https://www.easyacumatica.com/python/installation',
    'author': {
      '@type': 'Organization',
      'name': 'Easy-Acumatica Team'
    }
  }
]);
</script>

<style scoped>
.installation-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #01579b 0%, #0277bd 100%);
  padding: 4rem 0 3rem;
  margin-bottom: 3rem;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.doc-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.doc-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a237e;
  margin-bottom: 1rem;
}

.doc-section p {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.doc-section ul {
  margin-left: 1.5rem;
  color: #444;
  line-height: 1.8;
}

.doc-section ul li {
  margin-bottom: 0.5rem;
}

.doc-section a {
  color: #5e35b1;
  text-decoration: none;
  font-weight: 500;
}

.doc-section a:hover {
  text-decoration: underline;
}

/* Main Content */
.main-content {
  background: #f8f9fa;
  min-height: 100vh;
}

.content-section {
  scroll-margin-top: 80px;
}

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 100px;
}
</style>
