<template>
  <div class="batching-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Batch Operations</h1>
              <p class="hero-subtitle">
                Execute multiple API calls concurrently for improved performance
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
                  Batch operations allow you to execute multiple API calls concurrently using separate authenticated HTTP sessions.
                  This dramatically improves performance when you need to perform many operations, achieving significant speedups
                  through parallel execution.
                </p>
                <CodeSnippet :code="overviewExample" language="python" />
              </section>

              <!-- Basic Usage -->
              <section id="basic-usage" class="doc-section">
                <h2>Basic Usage</h2>
                <p>Create batch calls using the <code>.batch</code> property on any service method:</p>
                <CodeSnippet :code="basicUsageExample" language="python" />
              </section>

              <!-- Batch Execution -->
              <section id="batch-execution" class="doc-section">
                <h2>Executing Batches</h2>
                <p>Execute batches with the <code>BatchCall</code> class and unpack results:</p>
                <CodeSnippet :code="executionExample" language="python" />
              </section>

              <!-- Configuration Options -->
              <section id="configuration" class="doc-section">
                <h2>Configuration Options</h2>
                <p>Control batch execution behavior with various options:</p>
                <CodeSnippet :code="configurationExample" language="python" />
                <ul>
                  <li><code>max_concurrent</code>: Maximum number of concurrent API calls (default: 10)</li>
                  <li><code>timeout</code>: Total timeout for batch execution in seconds</li>
                  <li><code>fail_fast</code>: Stop execution on first failure (default: False)</li>
                  <li><code>return_exceptions</code>: Return exceptions instead of raising (default: True)</li>
                  <li><code>progress_callback</code>: Function called with progress updates</li>
                </ul>
              </section>

              <!-- Helper Functions -->
              <section id="helper-functions" class="doc-section">
                <h2>Helper Functions</h2>
                <p>Use helper functions for common batching patterns:</p>

                <h3>Batch Fetch by IDs</h3>
                <CodeSnippet :code="batchByIdsExample" language="python" />

                <h3>Batch Queries with Filters</h3>
                <CodeSnippet :code="batchFiltersExample" language="python" />
              </section>

              <!-- Error Handling -->
              <section id="error-handling" class="doc-section">
                <h2>Error Handling</h2>
                <p>Handle errors in batch operations:</p>
                <CodeSnippet :code="errorHandlingExample" language="python" />
              </section>

              <!-- Progress Tracking -->
              <section id="progress-tracking" class="doc-section">
                <h2>Progress Tracking</h2>
                <p>Monitor batch execution progress:</p>
                <CodeSnippet :code="progressExample" language="python" />
              </section>

              <!-- Statistics -->
              <section id="statistics" class="doc-section">
                <h2>Batch Statistics</h2>
                <p>Access execution statistics after batch completion:</p>
                <CodeSnippet :code="statisticsExample" language="python" />
              </section>

              <!-- Retry Failed Calls -->
              <section id="retry" class="doc-section">
                <h2>Retrying Failed Calls</h2>
                <p>Retry only the failed calls from a batch:</p>
                <CodeSnippet :code="retryExample" language="python" />
              </section>

              <!-- Advanced Usage -->
              <section id="advanced" class="doc-section">
                <h2>Advanced Usage</h2>
                <p>Combine batching with other features for complex workflows:</p>
                <CodeSnippet :code="advancedExample" language="python" />
              </section>

              <!-- Performance Tips -->
              <section id="performance" class="doc-section">
                <h2>Performance Tips</h2>
                <ul>
                  <li>Adjust <code>max_concurrent</code> based on your server's capacity (typically 5-20)</li>
                  <li>Use batch operations for independent calls only - dependent calls should run sequentially</li>
                  <li>Each batch call uses a separate authenticated session to avoid serialization bottlenecks</li>
                  <li>Sessions are automatically created, authenticated, and cleaned up</li>
                  <li>Batching works best with read operations; use cautiously with writes</li>
                  <li>Monitor your Acumatica server's load when using high concurrency</li>
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
  { id: 'basic-usage', title: 'Basic Usage', icon: 'mdi-play' },
  { id: 'batch-execution', title: 'Batch Execution', icon: 'mdi-rocket-launch' },
  { id: 'configuration', title: 'Configuration', icon: 'mdi-cog' },
  { id: 'helper-functions', title: 'Helper Functions', icon: 'mdi-function-variant' },
  { id: 'error-handling', title: 'Error Handling', icon: 'mdi-alert-circle' },
  { id: 'progress-tracking', title: 'Progress Tracking', icon: 'mdi-progress-clock' },
  { id: 'statistics', title: 'Statistics', icon: 'mdi-chart-line' },
  { id: 'retry', title: 'Retrying Failed Calls', icon: 'mdi-refresh' },
  { id: 'advanced', title: 'Advanced Usage', icon: 'mdi-star' },
  { id: 'performance', title: 'Performance Tips', icon: 'mdi-speedometer' },
]);

const overviewExample = `from easy_acumatica import AcumaticaClient, BatchCall

client = AcumaticaClient()

# Create batch of customer lookups
# Use .batch(args) when passing arguments
batch = BatchCall(
    client.customers.get_by_id.batch("CUST001"),
    client.customers.get_by_id.batch("CUST002"),
    client.customers.get_by_id.batch("CUST003"),
    max_concurrent=5
)

# Execute all calls concurrently
cust1, cust2, cust3 = batch.execute()

# 3x faster than sequential calls!`;

const basicUsageExample = `# Use .batch() at the END of the method call
# With arguments: method.batch(args)
# Without arguments: method.batch() with empty parens

# Batch calls with arguments
get_cust1 = client.customers.get_by_id.batch("CUST001")
get_cust2 = client.customers.get_by_id.batch("CUST002")
get_inv1 = client.invoices.get_by_id.batch("INV001")

# Batch calls without arguments
get_all_customers = client.customers.get_list.batch()
get_all_orders = client.sales_orders.get_list.batch()

# These calls haven't executed yet - they're just wrapped for batching`;

const executionExample = `from easy_acumatica import BatchCall

# Create and execute batch with arguments
batch = BatchCall(
    client.customers.get_by_id.batch("CUST001"),
    client.customers.get_by_id.batch("CUST002"),
    client.customers.get_by_id.batch("CUST003")
)

# Execute and unpack results
customer1, customer2, customer3 = batch.execute()

# Batch without arguments - use empty parens
batch = BatchCall(
    client.customers.get_list.batch(),
    client.sales_orders.get_list.batch(),
    client.stock_items.get_list.batch(),
    max_concurrent=5
)

# Execute and get individual results
batch.execute()
for result in batch.get_successful_results():
    print(f"Retrieved {len(result)} records")`;

const configurationExample = `from easy_acumatica import BatchCall

# Progress callback
def on_progress(completed, total):
    print(f"Progress: {completed}/{total} calls completed")

# Configured batch
batch = BatchCall(
    client.customers.get_by_id.batch("CUST001"),
    client.customers.get_by_id.batch("CUST002"),
    client.customers.get_by_id.batch("CUST003"),
    max_concurrent=5,           # Max 5 concurrent calls
    timeout=30.0,               # 30 second total timeout
    fail_fast=False,            # Continue on errors
    return_exceptions=True,     # Return errors, don't raise
    progress_callback=on_progress
)

results = batch.execute()`;

const batchByIdsExample = `from easy_acumatica.batch import create_batch_from_ids

# Fetch many customers by ID
customer_ids = ["CUST001", "CUST002", "CUST003", "CUST004", "CUST005"]

batch = create_batch_from_ids(
    client.customers,
    customer_ids,
    method_name='get_by_id'
)

customers = batch.execute()`;

const batchFiltersExample = `from easy_acumatica.odata import QueryOptions, F
from easy_acumatica.batch import create_batch_from_filters

# Create multiple filter queries
filters = [
    QueryOptions(filter=F.Status == "Active"),
    QueryOptions(filter=F.Status == "OnHold"),
    QueryOptions(filter=F.Status == "Inactive")
]

batch = create_batch_from_filters(
    client.customers,
    filters,
    method_name='get_list'
)

active, on_hold, inactive = batch.execute()
print(f"Active: {len(active)}, On Hold: {len(on_hold)}, Inactive: {len(inactive)}")`;

const errorHandlingExample = `from easy_acumatica import BatchCall

batch = BatchCall(
    client.customers.get_by_id.batch("CUST001"),
    client.customers.get_by_id.batch("NOTEXIST"),  # Will fail
    client.customers.get_by_id.batch("CUST003"),
    return_exceptions=True  # Return errors instead of raising
)

results = batch.execute()

# Check each result
for i, result in enumerate(results):
    if isinstance(result, Exception):
        print(f"Call {i} failed: {result}")
    else:
        print(f"Call {i} succeeded: {result['CustomerID']}")

# Or get only successful results
successful = batch.get_successful_results()
print(f"Got {len(successful)} successful results")

# Get failed calls
failed = batch.get_failed_calls()
for index, call, error in failed:
    print(f"Call {index} failed with: {error}")`;

const progressExample = `from easy_acumatica import BatchCall

def progress_handler(completed, total):
    percent = (completed / total) * 100
    print(f"\\rProgress: {completed}/{total} ({percent:.1f}%)", end="")

batch = BatchCall(
    *[client.customers.get_by_id.batch(f"CUST{i:03d}") for i in range(1, 101)],
    max_concurrent=10,
    progress_callback=progress_handler
)

results = batch.execute()
print("\\nBatch complete!")`;

const statisticsExample = `batch = BatchCall(
    client.customers.get_by_id.batch("CUST001"),
    client.customers.get_by_id.batch("CUST002"),
    client.customers.get_by_id.batch("CUST003")
)

batch.execute()

# Print summary
batch.print_summary()

# Access stats directly
stats = batch.stats
print(f"Total time: {stats.total_time:.2f}s")
print(f"Average call time: {stats.average_call_time:.3f}s")
print(f"Success rate: {stats.successful_calls / stats.total_calls * 100:.1f}%")
print(f"Concurrency level: {stats.concurrency_level}")`;

const retryExample = `# Initial batch with some failures
batch = BatchCall(
    client.customers.get_by_id.batch("CUST001"),
    client.customers.get_by_id.batch("NOTEXIST"),  # Fails
    client.customers.get_by_id.batch("CUST003"),
    client.customers.get_by_id.batch("ALSOBAD"),   # Fails
    return_exceptions=True
)

batch.execute()

# Retry only failed calls
retry_batch = batch.retry_failed_calls(max_concurrent=3)
retry_results = retry_batch.execute()

# Combine successful results from both attempts
all_successful = batch.get_successful_results() + retry_batch.get_successful_results()
print(f"Total successful: {len(all_successful)}")`;

const advancedExample = `from easy_acumatica import AcumaticaClient, BatchCall
from easy_acumatica.odata import QueryOptions, F

client = AcumaticaClient()

# Fetch multiple customers with details
customer_ids = ["CUST001", "CUST002", "CUST003"]
options = QueryOptions(expand=["Contacts", "Orders"])

# Create batch with query options
batch = BatchCall(
    *[client.customers.get_by_id.batch(cid, options=options) for cid in customer_ids],
    max_concurrent=5
)

customers = batch.execute()

# Process results and create new batch for updates
update_batch = BatchCall(
    *[
        client.customers.put_entity.batch({
            "CustomerID": {"value": cust["CustomerID"]["value"]},
            "CreditLimit": {"value": cust["CreditLimit"]["value"] * 1.1}
        })
        for cust in customers if not isinstance(cust, Exception)
    ],
    max_concurrent=3  # Lower concurrency for writes
)

updated = update_batch.execute()
print(f"Updated {len(updated)} customers")`;

useSeoMeta({
  title: 'Batch Operations | Easy-Acumatica Python',
  description: 'Execute multiple API calls concurrently for improved performance with Easy-Acumatica batch operations.',
});
</script>

<style scoped>
.batching-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1565c0 0%, #42a5f5 100%);
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

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 100px;
}
</style>
