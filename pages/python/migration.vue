<template>
  <div class="migration-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <v-chip color="warning" variant="flat" size="small" class="mb-4">
                <v-icon start size="small">mdi-alert</v-icon>
                Breaking Changes
              </v-chip>
              <h1 class="hero-title">Migration Guide</h1>
              <p class="hero-subtitle">
                Upgrade from v0.4.x to v0.5.x
              </p>
              <div class="version-badges">
                <div class="version-badge old">v0.4.x</div>
                <v-icon color="white" size="32">mdi-arrow-right</v-icon>
                <div class="version-badge new">v0.5.x</div>
              </div>
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
              Version 0.5.x introduces automatic <code>.env</code> file loading, improved caching with 10-20x performance gains,
              and a built-in task scheduler for background operations.
            </p>
            <p>Most of the core API remains unchanged, but there are some new features and minor breaking changes.</p>
          </section>

          <!-- What's New -->
          <section id="whats-new" class="doc-section">
            <h2>What's New in v0.5.x</h2>
            <ul>
              <li><strong>.env File Loading</strong> - Automatic credential discovery from environment files</li>
              <li><strong>Differential Caching</strong> - 10-20x performance improvement with smart cache invalidation</li>
              <li><strong>Task Scheduler</strong> - Built-in background task scheduling system</li>
              <li><strong>Enhanced Error Messages</strong> - More detailed error information</li>
              <li><strong>Improved Type Hints</strong> - Better IDE support and type checking</li>
            </ul>
          </section>

          <!-- Breaking Changes -->
          <section id="breaking-changes" class="doc-section">
            <h2>Breaking Changes</h2>

            <h3>1. Client Initialization Parameters</h3>
            <p>Some parameter names have changed for consistency:</p>
            <CodeSnippet :code="initChanges" language="python" />

            <h3>2. Cache Configuration</h3>
            <p>Cache settings now use a different structure:</p>
            <CodeSnippet :code="cacheChanges" language="python" />

            <h3>3. QueryOptions Behavior</h3>
            <p>QueryOptions now applies stricter validation on filter expressions:</p>
            <CodeSnippet :code="queryChanges" language="python" />
          </section>

          <!-- Migration Steps -->
          <section id="migration-steps" class="doc-section">
            <h2>Migration Steps</h2>

            <h3>Step 1: Update Package</h3>
            <CodeSnippet :code="updatePackage" language="bash" />

            <h3>Step 2: Create .env File (Optional)</h3>
            <p>Take advantage of automatic credential loading:</p>
            <CodeSnippet :code="envFile" language="bash" />

            <h3>Step 3: Update Client Initialization</h3>
            <p>Update parameter names if needed:</p>
            <CodeSnippet :code="updateInit" language="python" />

            <h3>Step 4: Enable Caching (Recommended)</h3>
            <p>Enable differential caching for performance improvements:</p>
            <CodeSnippet :code="enableCaching" language="python" />

            <h3>Step 5: Test Your Code</h3>
            <p>Run your existing code to ensure compatibility:</p>
            <CodeSnippet :code="testCode" language="bash" />
          </section>

          <!-- New Features -->
          <section id="new-features" class="doc-section">
            <h2>Using New Features</h2>

            <h3>Automatic .env Loading</h3>
            <p>The client now automatically searches for and loads <code>.env</code> files:</p>
            <CodeSnippet :code="envLoading" language="python" />

            <h3>Differential Caching</h3>
            <p>Enable caching for 10-20x performance improvements:</p>
            <CodeSnippet :code="cachingExample" language="python" />

            <h3>Task Scheduler</h3>
            <p>Schedule background tasks to run at specific intervals:</p>
            <CodeSnippet :code="schedulerExample" language="python" />
          </section>

          <!-- Compatibility -->
          <section id="compatibility" class="doc-section">
            <h2>Backward Compatibility</h2>
            <p>
              Most v0.4.x code will work without changes. The core API for services, models, and queries
              remains the same. Only initialization parameters and some advanced features have changed.
            </p>
            <p>
              If you're not using advanced features like custom caching or session management,
              your migration should be straightforward.
            </p>
          </section>

          <!-- Troubleshooting -->
          <section id="troubleshooting" class="doc-section">
            <h2>Troubleshooting</h2>

            <h3>Issue: Client fails to initialize</h3>
            <p><strong>Solution:</strong> Check that parameter names are correct. <code>company</code> is now <code>tenant</code>, <code>url</code> is now <code>base_url</code>.</p>

            <h3>Issue: .env file not loading</h3>
            <p><strong>Solution:</strong> Ensure the <code>.env</code> file is in your project root or current working directory. Use absolute paths if needed.</p>

            <h3>Issue: Cache not working as expected</h3>
            <p><strong>Solution:</strong> Verify <code>ACUMATICA_CACHE_METHODS=true</code> is set and TTL is appropriate for your use case.</p>

            <h3>Issue: Type hints not working in IDE</h3>
            <p><strong>Solution:</strong> Regenerate type stubs after upgrading:</p>
            <CodeSnippet :code="regenerateStubs" language="python" />
          </section>

          <!-- Next Steps -->
          <section id="next-steps" class="doc-section">
            <h2>Next Steps</h2>
            <ul>
              <li><NuxtLink to="/python/client">Client Documentation</NuxtLink> - Learn about all client configuration options</li>
              <li><NuxtLink to="/python/quickstart">Quickstart Guide</NuxtLink> - See v0.5.x examples</li>
              <li><NuxtLink to="/python/service-factory">Dynamic Services</NuxtLink> - Understand service usage patterns</li>
            </ul>
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
  { id: 'overview', title: 'Overview', icon: 'mdi-information' },
  { id: 'whats-new', title: "What's New", icon: 'mdi-new-box' },
  { id: 'breaking-changes', title: 'Breaking Changes', icon: 'mdi-alert' },
  { id: 'migration-steps', title: 'Migration Steps', icon: 'mdi-stairs' },
  { id: 'new-features', title: 'New Features', icon: 'mdi-star' },
  { id: 'compatibility', title: 'Compatibility', icon: 'mdi-check-circle' },
  { id: 'troubleshooting', title: 'Troubleshooting', icon: 'mdi-wrench' },
  { id: 'next-steps', title: 'Next Steps', icon: 'mdi-arrow-right' },
]);

const initChanges = `# v0.4.x
client = AcumaticaClient(
    url="https://your-instance.acumatica.com",
    company="YourCompany"
)

# v0.5.x
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",  # 'url' → 'base_url'
    tenant="YourCompany"  # 'company' → 'tenant'
)`;

const cacheChanges = `# v0.4.x
client = AcumaticaClient(
    ...,
    cache_enabled=True,
    cache_ttl=3600
)

# v0.5.x
client = AcumaticaClient(
    ...,
    cache_methods=True,  # 'cache_enabled' → 'cache_methods'
    cache_ttl_hours=1    # 'cache_ttl' (seconds) → 'cache_ttl_hours' (hours)
)`;

const queryChanges = `# v0.4.x - Some invalid filters might have passed
options = QueryOptions(filter=F.Field = "Value")  # Single = might work

# v0.5.x - Strict validation
options = QueryOptions(filter=F.Field == "Value")  # Must use ==`;

const updatePackage = `pip install --upgrade easy-acumatica>=0.5.4`;

const envFile = `ACUMATICA_URL=https://your-instance.acumatica.com
ACUMATICA_USERNAME=your-username
ACUMATICA_PASSWORD=your-password
ACUMATICA_TENANT=your-tenant
ACUMATICA_BRANCH=MAIN
ACUMATICA_CACHE_METHODS=true
ACUMATICA_CACHE_TTL_HOURS=24`;

const updateInit = `# Old way (still works)
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password",
    tenant="YourTenant",
    branch="MAIN"
)

# New way (recommended)
client = AcumaticaClient()  # Loads from .env automatically`;

const enableCaching = `# In your .env file
ACUMATICA_CACHE_METHODS=true
ACUMATICA_CACHE_TTL_HOURS=24

# Or in code
client = AcumaticaClient(
    cache_methods=True,
    cache_ttl_hours=24
)`;

const testCode = `python -m pytest tests/
# Or run your application
python main.py`;

const envLoading = `# Create .env in project root
# No code changes needed - client finds it automatically

from easy_acumatica import AcumaticaClient

# Automatically loads credentials
client = AcumaticaClient()

# Client searches:
# 1. Current directory
# 2. Parent directories
# 3. Project root`;

const cachingExample = `from easy_acumatica import AcumaticaClient

client = AcumaticaClient(
    cache_methods=True,
    cache_ttl_hours=24
)

# First call: fetches from API and caches
customers = client.customers.get_list()

# Second call: returns from cache (10-20x faster)
customers = client.customers.get_list()

# Cache automatically invalidates after updates
client.customers.put_entity(new_customer)  # Cache cleared for customers`;

const schedulerExample = `from easy_acumatica import AcumaticaClient
from datetime import datetime

client = AcumaticaClient()

def sync_customers():
    """Background task to sync customers"""
    customers = client.customers.get_list()
    print(f"Synced {len(customers)} customers at {datetime.now()}")

# Schedule to run every hour
client.scheduler.schedule_task(
    func=sync_customers,
    interval_seconds=3600,
    task_name="customer_sync"
)

# Start the scheduler
client.scheduler.start()

# Your application continues running
# Task runs in background every hour`;

const regenerateStubs = `from easy_acumatica import AcumaticaClient
from easy_acumatica.generate_stubs import generate_stubs_from_client

client = AcumaticaClient()
generate_stubs_from_client(client)`;

useSeoMeta({
  title: 'Migration Guide v0.4 to v0.5 | Easy-Acumatica Python',
  description: 'Migrate from Easy-Acumatica v0.4.x to v0.5.x. New features include .env loading, differential caching, and task scheduling.',
});
</script>

<style scoped>
.migration-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #00aeff 0%, #004280 100%);
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
  margin-bottom: 2rem;
}

.version-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.version-badge {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.version-badge.new {
  background: rgba(76, 175, 80, 0.2);
  border-color: rgba(76, 175, 80, 0.5);
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

.doc-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a237e;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.doc-section p {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.doc-section code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  color: #d32f2f;
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
