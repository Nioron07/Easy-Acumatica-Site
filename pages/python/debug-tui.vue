<template>
  <div class="tui-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Interactive Debug TUI</h1>
              <p class="hero-subtitle">
                Explore your Acumatica instance from the terminal with <code>ea-debug</code>
              </p>
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
              <!-- Overview -->
              <section id="overview" class="doc-section">
                <h2>Overview</h2>
                <p>
                  Easy-Acumatica ships with an interactive terminal UI, launched with the
                  <code>ea-debug</code> command. It connects to a tenant and lets you browse every
                  dynamically generated service, model, and Generic Inquiry, run calls against them,
                  and copy the equivalent Python back into your own scripts &mdash; without writing any
                  code first.
                </p>
                <p class="note">
                  The TUI is built on <a href="https://textual.textualize.io/" target="_blank" rel="noopener">Textual</a>
                  and is a debugging / exploration aid. It's an optional extra so the core package
                  stays lightweight.
                </p>
              </section>

              <!-- Installation -->
              <section id="installation" class="doc-section">
                <h2>Installation</h2>
                <p>Install the <code>[tui]</code> extra, which pulls in Textual alongside the core package:</p>
                <CodeSnippet :code="installExample" language="bash" />
              </section>

              <!-- Launching -->
              <section id="launching" class="doc-section">
                <h2>Launching</h2>
                <p>
                  Run <code>ea-debug</code> from any directory. It uses the same credential resolution
                  as <NuxtLink to="/python/client">AcumaticaClient</NuxtLink> &mdash; a <code>.env</code> file or
                  <code>ACUMATICA_*</code> environment variables are picked up automatically, otherwise
                  you'll be prompted to connect.
                </p>
                <CodeSnippet :code="launchExample" language="bash" />
              </section>

              <!-- Services Browser -->
              <section id="services" class="doc-section">
                <h2>Services Browser</h2>
                <p>
                  Lists every dynamically generated service. Select one to run any of its methods:
                  <code>get_list</code>, <code>get_by_id</code>, <code>get_by_keys</code>,
                  <code>get_ad_hoc_schema</code>, <code>get_files</code>, <code>put_entity</code>,
                  <code>put_file</code>, <code>delete_by_id</code>, and <code>delete_by_keys</code>.
                </p>
                <ul>
                  <li>Query options (<code>$top</code>, <code>$skip</code>, <code>$select</code>, <code>$expand</code>, <code>$orderby</code>, <code>$filter</code>) get a guided form.</li>
                  <li>Destructive calls (delete, put) require an explicit confirmation press.</li>
                  <li>A live <strong>Equivalent Python</strong> pane renders the exact call so you can copy it into a script.</li>
                </ul>
              </section>

              <!-- Models Browser -->
              <section id="models" class="doc-section">
                <h2>Models Browser</h2>
                <p>
                  Lists every generated dataclass. Press <kbd>Enter</kbd> on a model to open the
                  recursive model builder &mdash; fill in fields (including nested models and detail
                  lines) and the equivalent <code>client.models.&lt;Model&gt;(...)</code> constructor renders
                  next to the form as you type.
                </p>
              </section>

              <!-- Inquiries Browser -->
              <section id="inquiries" class="doc-section">
                <h2>Inquiries Browser</h2>
                <p>
                  Lists every Generic Inquiry exposed in the tenant's metadata. Each inquiry gets its
                  own execution menu with the same OData query options as <code>get_list</code>. Inquiries
                  that aren't published to OData (the <em>Expose via OData</em> flag on screen
                  <code>SM208000</code>) surface a clear, actionable error instead of a raw 403.
                </p>
                <p class="note">
                  See <NuxtLink to="/python/generic-inquiries">Generic Inquiries</NuxtLink> for the
                  programmatic equivalent.
                </p>
              </section>

              <!-- Equivalent Python -->
              <section id="equivalent-python" class="doc-section">
                <h2>Equivalent Python Pane</h2>
                <p>
                  Every screen &mdash; service calls, model construction, inquiry execution &mdash; renders a
                  live "Equivalent Python" snippet that mirrors what you've configured in the form.
                  This makes the TUI a fast way to learn the API: build the call interactively, then
                  copy the generated code straight into your project.
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

const navItems = ref([
  { id: 'overview', title: 'Overview', icon: 'mdi-information' },
  { id: 'installation', title: 'Installation', icon: 'mdi-download' },
  { id: 'launching', title: 'Launching', icon: 'mdi-console' },
  { id: 'services', title: 'Services Browser', icon: 'mdi-api' },
  { id: 'models', title: 'Models Browser', icon: 'mdi-cube-outline' },
  { id: 'inquiries', title: 'Inquiries Browser', icon: 'mdi-table-search' },
  { id: 'equivalent-python', title: 'Equivalent Python', icon: 'mdi-language-python' },
]);

const installExample = `# Install the package with the interactive TUI extra
pip install easy-acumatica[tui]`;

const launchExample = `# Launch the terminal UI (uses .env / ACUMATICA_* like AcumaticaClient)
ea-debug`;

useSeoMeta({
  title: 'Debug TUI (ea-debug) | Easy-Acumatica Python',
  description: 'Explore your Acumatica instance interactively from the terminal with the ea-debug TUI. Browse services, models, and Generic Inquiries and copy the equivalent Python.',
  ogTitle: 'Interactive Debug TUI - Easy-Acumatica Python',
  ogDescription: 'The ea-debug terminal UI for browsing and testing services, models, and inquiries with a live equivalent-Python pane.',
  ogType: 'article',
  ogUrl: 'https://easyacumatica.com/python/debug-tui',
  robots: 'index, follow',
  keywords: 'ea-debug, Acumatica TUI, Easy-Acumatica terminal UI, Textual, Acumatica API explorer',
});

useSchemaOrg([
  {
    '@type': 'TechArticle',
    'headline': 'Easy-Acumatica Debug TUI (ea-debug)',
    'description': 'Guide to the interactive ea-debug terminal UI for exploring Acumatica services, models, and inquiries.',
    'url': 'https://easyacumatica.com/python/debug-tui',
    'author': {
      '@type': 'Organization',
      'name': 'Easy-Acumatica Team'
    }
  }
]);
</script>

<style scoped>
.tui-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a237e 0%, #5e35b1 100%);
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

.hero-subtitle code {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: white;
}

/* Main Content */
.main-content {
  background: #f8f9fa;
  min-height: 100vh;
}

.doc-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  scroll-margin-top: 80px;
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

.doc-section p.note {
  color: #666;
  font-size: 0.95rem;
  font-style: italic;
}

.doc-section code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  color: #d32f2f;
}

.doc-section kbd {
  background: #333;
  color: white;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.85em;
  font-family: 'Fira Code', monospace;
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

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 100px;
}
</style>
