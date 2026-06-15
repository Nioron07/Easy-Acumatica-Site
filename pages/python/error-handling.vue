<template>
  <div class="errors-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Error Handling</h1>
              <p class="hero-subtitle">
                Typed exceptions with rich, actionable context
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
                  Every failure raised by Easy-Acumatica is an <code>AcumaticaError</code> (or a subclass).
                  Each exception carries structured context &mdash; the HTTP status, the operation and entity
                  involved, the raw API response, and a list of suggested fixes &mdash; so you can branch on
                  the error type and surface a useful message. All exceptions and the
                  <code>ErrorCode</code> enum are importable from the top-level package.
                </p>
                <CodeSnippet :code="importExample" language="python" />
              </section>

              <!-- Hierarchy -->
              <section id="hierarchy" class="doc-section">
                <h2>Exception Hierarchy</h2>
                <p>All exceptions derive from <code>AcumaticaError</code>:</p>
                <v-table density="comfortable" class="ref-table">
                  <thead>
                    <tr>
                      <th>Exception</th>
                      <th>Raised on</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in hierarchy" :key="row.name">
                      <td><code>{{ row.name }}</code></td>
                      <td>{{ row.when }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </section>

              <!-- Catching errors -->
              <section id="catching" class="doc-section">
                <h2>Catching Errors</h2>
                <p>
                  Catch specific subclasses first, then fall back to <code>AcumaticaError</code> for a
                  catch-all. The base class exposes <code>get_detailed_message()</code> for a fully
                  formatted report including suggestions and the API response.
                </p>
                <CodeSnippet :code="catchExample" language="python" />
              </section>

              <!-- Attributes -->
              <section id="attributes" class="doc-section">
                <h2>Exception Attributes</h2>
                <p>Every <code>AcumaticaError</code> carries the following context:</p>
                <v-table density="comfortable" class="ref-table">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in attributes" :key="row.name">
                      <td><code>{{ row.name }}</code></td>
                      <td>{{ row.desc }}</td>
                    </tr>
                  </tbody>
                </v-table>
                <p class="note">
                  Some subclasses add their own attributes &mdash; e.g.
                  <code>AcumaticaValidationError.field_errors</code>,
                  <code>AcumaticaRateLimitError.retry_after</code>, and
                  <code>AcumaticaTimeoutError.timeout_seconds</code>.
                </p>
              </section>

              <!-- Suggestions -->
              <section id="suggestions" class="doc-section">
                <h2>Suggestions &amp; Detailed Messages</h2>
                <p>
                  Each exception ships with a list of <code>suggestions</code> tailored to the error type,
                  and <code>get_detailed_message()</code> formats the whole context into a single
                  readable block &mdash; ideal for logs.
                </p>
                <CodeSnippet :code="suggestionsExample" language="python" />
              </section>

              <!-- ErrorCode -->
              <section id="error-code" class="doc-section">
                <h2>The ErrorCode Enum</h2>
                <p>
                  <code>error_code</code> is an <code>ErrorCode</code> enum value when the failure maps to a
                  known code (server-supplied codes outside the enum are kept as raw strings). It groups
                  authentication, client, server, business-logic, connection, configuration, and
                  operation errors.
                </p>
                <CodeSnippet :code="errorCodeExample" language="python" />
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
  { id: 'hierarchy', title: 'Exception Hierarchy', icon: 'mdi-file-tree' },
  { id: 'catching', title: 'Catching Errors', icon: 'mdi-alert-circle' },
  { id: 'attributes', title: 'Exception Attributes', icon: 'mdi-format-list-bulleted' },
  { id: 'suggestions', title: 'Suggestions & Messages', icon: 'mdi-lightbulb-on' },
  { id: 'error-code', title: 'ErrorCode Enum', icon: 'mdi-code-tags' },
]);

const hierarchy = ref([
  { name: 'AcumaticaError', when: 'Base class for all errors; also raised for generic 400s' },
  { name: 'AcumaticaAuthError', when: 'Authentication / authorization failures (401, 403)' },
  { name: 'AcumaticaNotFoundError', when: 'Resource not found (404)' },
  { name: 'AcumaticaValidationError', when: 'Field-level validation failures (400, 422) - adds field_errors' },
  { name: 'AcumaticaBusinessRuleError', when: 'Business rule violations (422)' },
  { name: 'AcumaticaConcurrencyError', when: 'Record modified by another user (412)' },
  { name: 'AcumaticaServerError', when: 'Server-side errors (5xx)' },
  { name: 'AcumaticaConnectionError', when: 'Network / connection failures' },
  { name: 'AcumaticaTimeoutError', when: 'Request timeout (subclass of AcumaticaConnectionError)' },
  { name: 'AcumaticaRateLimitError', when: 'Rate limit exceeded (429) - adds retry_after' },
  { name: 'AcumaticaConfigError', when: 'Invalid or missing configuration' },
  { name: 'AcumaticaSchemaError', when: 'Schema / endpoint problems' },
  { name: 'AcumaticaBatchError', when: 'Batch execution failures - adds failed_operations' },
  { name: 'AcumaticaRetryExhaustedError', when: 'All retry attempts exhausted' },
]);

const attributes = ref([
  { name: 'message', desc: 'Primary error message' },
  { name: 'error_code', desc: 'ErrorCode enum value (or raw string for unknown codes)' },
  { name: 'status_code', desc: 'HTTP status code, when applicable' },
  { name: 'operation', desc: 'Operation being performed (e.g. "get_by_id")' },
  { name: 'entity', desc: 'Entity type involved (e.g. "Customer")' },
  { name: 'entity_id', desc: 'Specific entity ID, when applicable' },
  { name: 'request_data', desc: 'Data sent in the request' },
  { name: 'response_data', desc: 'Raw response from the API' },
  { name: 'suggestions', desc: 'List of actionable suggestions for fixing the error' },
  { name: 'timestamp', desc: 'UTC timestamp of when the error occurred' },
  { name: 'context', desc: 'Additional context (HTTP method, URL, redacted headers, ...)' },
  { name: 'get_detailed_message()', desc: 'Method returning a fully formatted report of all the above' },
]);

const importExample = `from easy_acumatica import (
    AcumaticaError,
    AcumaticaAuthError,
    AcumaticaNotFoundError,
    AcumaticaValidationError,
    AcumaticaBusinessRuleError,
    AcumaticaConcurrencyError,
    AcumaticaServerError,
    AcumaticaConnectionError,
    AcumaticaTimeoutError,
    AcumaticaRateLimitError,
    AcumaticaConfigError,
    AcumaticaSchemaError,
    AcumaticaBatchError,
    AcumaticaRetryExhaustedError,
    ErrorCode,
)`;

const catchExample = `from easy_acumatica import (
    AcumaticaNotFoundError,
    AcumaticaAuthError,
    AcumaticaValidationError,
    AcumaticaRateLimitError,
    AcumaticaError,
)

try:
    customer = client.customers.get_by_id("UNKNOWN")

except AcumaticaNotFoundError as e:          # 404
    print(f"Not found: {e}")
    print(f"Suggestions: {e.suggestions}")

except AcumaticaAuthError as e:              # 401 / 403
    print(f"Auth error [{e.status_code}]: {e.message}")

except AcumaticaValidationError as e:        # 400 / 422
    print(f"Validation failed: {e}")
    for field, errors in e.field_errors.items():
        print(f"  {field}: {errors}")

except AcumaticaRateLimitError as e:         # 429
    print(f"Rate limited. Retry after {e.retry_after}s")

except AcumaticaError as e:                  # catch-all
    print(e.get_detailed_message())`;

const suggestionsExample = `try:
    client.customers.get_by_id("UNKNOWN")
except AcumaticaError as e:
    # Concise one-line string
    print(str(e))                 # [404] Customer with ID 'UNKNOWN' was not found

    # Actionable suggestions
    for tip in e.suggestions:
        print(f"- {tip}")

    # Full formatted report (great for logs)
    print(e.get_detailed_message())`;

const errorCodeExample = `from easy_acumatica import ErrorCode

try:
    client.customers.get_by_id("UNKNOWN")
except AcumaticaError as e:
    if e.error_code == ErrorCode.NOT_FOUND:
        print("Handle the missing record")
    elif e.error_code == ErrorCode.RATE_LIMIT_EXCEEDED:
        print("Back off and retry")`;

useSeoMeta({
  title: 'Error Handling | Easy-Acumatica Python',
  description: 'Handle Acumatica API errors with typed exceptions. Learn the AcumaticaError hierarchy, exception attributes, suggestions, and the ErrorCode enum.',
  ogTitle: 'Error Handling - Easy-Acumatica Python',
  ogDescription: 'Typed exceptions with rich context: the AcumaticaError hierarchy, attributes, suggestions, and ErrorCode enum.',
  ogType: 'article',
  ogUrl: 'https://easyacumatica.com/python/error-handling',
  robots: 'index, follow',
  keywords: 'AcumaticaError, Easy-Acumatica exceptions, error handling, ErrorCode, Acumatica API errors',
});

useSchemaOrg([
  {
    '@type': 'TechArticle',
    'headline': 'Easy-Acumatica Error Handling',
    'description': 'Guide to the AcumaticaError exception hierarchy and handling Acumatica API errors.',
    'url': 'https://easyacumatica.com/python/error-handling',
    'author': {
      '@type': 'Organization',
      'name': 'Easy-Acumatica Team'
    }
  }
]);
</script>

<style scoped>
.errors-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #b71c1c 0%, #e53935 100%);
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
  color: #b71c1c;
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
  color: #c62828;
}

.ref-table {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.ref-table th {
  background: rgba(183, 28, 28, 0.05);
  color: #b71c1c;
  font-weight: 700;
  text-align: left;
}

.doc-section a {
  color: #e53935;
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
