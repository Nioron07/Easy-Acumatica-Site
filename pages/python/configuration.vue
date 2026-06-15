<template>
  <div class="config-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Configuration</h1>
              <p class="hero-subtitle">
                Centralize connection settings with <code>AcumaticaConfig</code>
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
                  <code>AcumaticaConfig</code> is a dataclass that holds every connection, caching, and
                  performance setting in one place. Build it from explicit values, environment
                  variables, or a JSON/YAML file, then hand it to the
                  <NuxtLink to="/python/client">AcumaticaClient</NuxtLink> via the <code>config</code>
                  parameter. It's the cleanest way to share one configuration across scripts and
                  environments.
                </p>
                <CodeSnippet :code="overviewExample" language="python" />
                <p class="note">
                  <code>AcumaticaConfig</code> lives in the <code>easy_acumatica.config</code> module &mdash;
                  import it with <code>from easy_acumatica.config import AcumaticaConfig</code>.
                </p>
              </section>

              <!-- From environment -->
              <section id="from-env" class="doc-section">
                <h2>From Environment Variables</h2>
                <p>
                  <code>from_env()</code> reads <code>ACUMATICA_*</code> variables (the prefix is
                  configurable). The four connection fields are required; everything else falls back to
                  its default.
                </p>
                <CodeSnippet :code="fromEnvExample" language="python" />
              </section>

              <!-- From file -->
              <section id="from-file" class="doc-section">
                <h2>From a Config File</h2>
                <p>
                  <code>from_file()</code> loads JSON or YAML (the format is auto-detected from the
                  extension). YAML requires <code>PyYAML</code>. Unknown keys are ignored, so a stale
                  file won't crash startup.
                </p>
                <CodeSnippet :code="fromFileExample" language="python" />
                <p>A JSON config file looks like this:</p>
                <CodeSnippet :code="jsonFileExample" language="json" />
              </section>

              <!-- From dict -->
              <section id="from-dict" class="doc-section">
                <h2>From a Dictionary</h2>
                <p><code>from_dict()</code> builds a config from a plain dict, ignoring unknown keys:</p>
                <CodeSnippet :code="fromDictExample" language="python" />
              </section>

              <!-- Saving -->
              <section id="saving" class="doc-section">
                <h2>Saving &amp; Exporting</h2>
                <p>
                  Persist a config with <code>to_file()</code> or convert it to a dict with
                  <code>to_dict()</code>. Passwords are excluded by default &mdash; pass
                  <code>include_password=True</code> only when you really need it.
                </p>
                <CodeSnippet :code="savingExample" language="python" />
              </section>

              <!-- Validation -->
              <section id="validation" class="doc-section">
                <h2>Validation</h2>
                <p>
                  Call <code>validate()</code> to check required fields, the URL scheme, numeric ranges,
                  and the log level before connecting. It raises
                  <code>AcumaticaConfigError</code> with actionable suggestions on failure.
                </p>
                <CodeSnippet :code="validationExample" language="python" />
              </section>

              <!-- Optimization presets -->
              <section id="presets" class="doc-section">
                <h2>Optimization Presets</h2>
                <p>
                  Two helpers return a tuned copy of the config without mutating the original:
                </p>
                <ul>
                  <li><code>optimize_for_performance()</code> &mdash; enables caching, a longer cache TTL, persistent login, and a shorter timeout.</li>
                  <li><code>optimize_for_development()</code> &mdash; disables caching, forces a rebuild, raises the log level to <code>DEBUG</code>, and uses a longer timeout.</li>
                </ul>
                <CodeSnippet :code="presetsExample" language="python" />
              </section>

              <!-- Masking -->
              <section id="masking" class="doc-section">
                <h2>Masking Sensitive Data</h2>
                <p>
                  The default <code>repr()</code> masks the password, so logging a config never leaks
                  credentials. Use <code>mask_sensitive_data()</code> for an explicit masked string.
                </p>
                <CodeSnippet :code="maskingExample" language="python" />
              </section>

              <!-- Fields reference -->
              <section id="fields" class="doc-section">
                <h2>Fields Reference</h2>
                <p>The required fields must be supplied; all others have defaults.</p>
                <ParameterTable :parameters="configFields" />
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
import ParameterTable from '~/components/ParameterTable.vue';

const navItems = ref([
  { id: 'overview', title: 'Overview', icon: 'mdi-information' },
  { id: 'from-env', title: 'From Environment', icon: 'mdi-application-variable' },
  { id: 'from-file', title: 'From a File', icon: 'mdi-file-cog' },
  { id: 'from-dict', title: 'From a Dictionary', icon: 'mdi-code-braces' },
  { id: 'saving', title: 'Saving & Exporting', icon: 'mdi-content-save' },
  { id: 'validation', title: 'Validation', icon: 'mdi-check-decagram' },
  { id: 'presets', title: 'Optimization Presets', icon: 'mdi-tune' },
  { id: 'masking', title: 'Masking Secrets', icon: 'mdi-shield-lock' },
  { id: 'fields', title: 'Fields Reference', icon: 'mdi-table' },
]);

const overviewExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.config import AcumaticaConfig

config = AcumaticaConfig(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    branch="MAIN",
    cache_methods=True,
)

# Pass the config to the client
client = AcumaticaClient(config=config)`;

const fromEnvExample = `from easy_acumatica.config import AcumaticaConfig

# Reads ACUMATICA_URL, ACUMATICA_USERNAME, ACUMATICA_PASSWORD,
# ACUMATICA_TENANT (required) plus any optional ACUMATICA_* settings.
config = AcumaticaConfig.from_env()

# Use a custom prefix if your variables differ
config = AcumaticaConfig.from_env(prefix="ACU_")`;

const fromFileExample = `from pathlib import Path
from easy_acumatica.config import AcumaticaConfig

# Format auto-detected from the extension (.json, .yaml, .yml)
config = AcumaticaConfig.from_file(Path("config.json"))
config = AcumaticaConfig.from_file(Path("config.yaml"))`;

const jsonFileExample = `{
  "base_url": "https://your-instance.acumatica.com",
  "username": "api_user",
  "password": "secure_password",
  "tenant": "Company",
  "branch": "MAIN",
  "verify_ssl": true,
  "timeout": 60,
  "rate_limit_calls_per_second": 10.0,
  "cache_methods": true,
  "cache_ttl_hours": 24
}`;

const fromDictExample = `from easy_acumatica.config import AcumaticaConfig

config = AcumaticaConfig.from_dict({
    "base_url": "https://your-instance.acumatica.com",
    "username": "api_user",
    "password": "secure_password",
    "tenant": "Company",
    "cache_methods": True,
})`;

const savingExample = `from pathlib import Path

# Save to a file (password excluded by default for safety)
config.to_file(Path("config.json"))
config.to_file(Path("config.yaml"))

# Include the password explicitly if you must
config.to_file(Path("config.json"), include_password=True)

# Or export to a dict (Path objects become strings)
data = config.to_dict()`;

const validationExample = `from easy_acumatica.exceptions import AcumaticaConfigError

try:
    config.validate()
except AcumaticaConfigError as e:
    print(f"Invalid config: {e}")
    print(f"Suggestions: {e.suggestions}")`;

const presetsExample = `# Production: caching on, longer TTL, shorter timeout
prod_config = config.optimize_for_performance()
client = AcumaticaClient(config=prod_config)

# Development: caching off, force rebuild, verbose logging
dev_config = config.optimize_for_development()
client = AcumaticaClient(config=dev_config)`;

const maskingExample = `# repr() is safe to log - the password is masked
print(config)
# AcumaticaConfig({... 'password': '***MASKED***' ...})

masked = config.mask_sensitive_data()`;

const configFields = ref([
  { name: 'base_url', type: 'str', required: true, description: 'Root URL of your Acumatica instance' },
  { name: 'username', type: 'str', required: true, description: 'API username' },
  { name: 'password', type: 'str', required: true, description: 'API password' },
  { name: 'tenant', type: 'str', required: true, description: 'Tenant/Company identifier' },
  { name: 'branch', type: 'str', required: false, description: 'Optional branch within the tenant' },
  { name: 'locale', type: 'str', required: false, description: 'UI locale, e.g. "en-US"' },
  { name: 'verify_ssl', type: 'bool', required: false, description: 'Verify SSL certificates (default: True)' },
  { name: 'persistent_login', type: 'bool', required: false, description: 'Keep session alive between requests (default: True)' },
  { name: 'retry_on_idle_logout', type: 'bool', required: false, description: 'Auto-retry on session timeout (default: True)' },
  { name: 'endpoint_name', type: 'str', required: false, description: 'API endpoint name (default: "Default")' },
  { name: 'endpoint_version', type: 'str', required: false, description: 'Specific API version (default: latest)' },
  { name: 'timeout', type: 'int', required: false, description: 'Request timeout in seconds (default: 60)' },
  { name: 'max_retries', type: 'int', required: false, description: 'Maximum retry attempts (default: 3)' },
  { name: 'rate_limit_calls_per_second', type: 'float', required: false, description: 'API rate limit (default: 10.0)' },
  { name: 'cache_methods', type: 'bool', required: false, description: 'Enable differential caching (default: False)' },
  { name: 'cache_ttl_hours', type: 'int', required: false, description: 'Cache TTL in hours (default: 24)' },
  { name: 'schema_cache_ttl_hours', type: 'int', required: false, description: 'Disk schema cache TTL in hours (default: 1; must be <= cache_ttl_hours)' },
  { name: 'cache_dir', type: 'Path', required: false, description: 'Cache directory (default: ~/.easy_acumatica_cache)' },
  { name: 'force_rebuild', type: 'bool', required: false, description: 'Force rebuild ignoring cache (default: False)' },
  { name: 'log_level', type: 'str', required: false, description: 'Logging level (default: "INFO")' },
  { name: 'log_file', type: 'str', required: false, description: 'Optional path to a log file' },
]);

useSeoMeta({
  title: 'Configuration (AcumaticaConfig) | Easy-Acumatica Python',
  description: 'Configure Easy-Acumatica with AcumaticaConfig: load from environment, JSON/YAML files, or dicts, validate settings, and apply performance/development presets.',
  ogTitle: 'AcumaticaConfig - Easy-Acumatica Python',
  ogDescription: 'Centralize connection, caching, and performance settings with AcumaticaConfig and pass them to the client.',
  ogType: 'article',
  ogUrl: 'https://easyacumatica.com/python/configuration',
  robots: 'index, follow',
  keywords: 'AcumaticaConfig, Acumatica configuration, from_env, from_file, Easy-Acumatica config',
});

useSchemaOrg([
  {
    '@type': 'TechArticle',
    'headline': 'AcumaticaConfig Configuration Guide',
    'description': 'How to configure the Easy-Acumatica client with AcumaticaConfig.',
    'url': 'https://easyacumatica.com/python/configuration',
    'author': {
      '@type': 'Organization',
      'name': 'Easy-Acumatica Team'
    }
  }
]);
</script>

<style scoped>
.config-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #00695c 0%, #00897b 100%);
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
  color: #00695c;
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
  color: #00695c;
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
  color: #00897b;
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
