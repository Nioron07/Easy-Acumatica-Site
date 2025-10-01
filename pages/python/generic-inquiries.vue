<template>
  <div class="inquiries-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Generic Inquiries</h1>
              <p class="hero-subtitle">
                Access Acumatica Generic Inquiries via OData endpoints
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
                  Generic Inquiries (GI) in Acumatica are custom data queries configured through the Acumatica UI.
                  Easy-Acumatica automatically discovers available Generic Inquiries and generates methods to access them.
                </p>
                <p>
                  All inquiries are accessed through <code>client.inquiries</code> and support filtering, sorting, and pagination
                  using <NuxtLink to="/python/odata/queryoptions">QueryOptions</NuxtLink>.
                </p>
                <CodeSnippet :code="overviewExample" language="python" />
              </section>

              <!-- Discovery -->
              <section id="discovery" class="doc-section">
                <h2>Discovery</h2>
                <p>List available Generic Inquiries in your Acumatica instance:</p>
                <CodeSnippet :code="discoveryExample" language="python" />
              </section>

              <!-- Basic Usage -->
              <section id="basic-usage" class="doc-section">
                <h2>Basic Usage</h2>
                <p>Access Generic Inquiry results using the dynamically generated methods:</p>
                <CodeSnippet :code="basicUsageExample" language="python" />
              </section>

              <!-- Filtering -->
              <section id="filtering" class="doc-section">
                <h2>Filtering Results</h2>
                <p>Use <NuxtLink to="/python/odata/filters">F factory</NuxtLink> and QueryOptions to filter inquiry results:</p>
                <CodeSnippet :code="filteringExample" language="python" />
              </section>

              <!-- Pagination -->
              <section id="pagination" class="doc-section">
                <h2>Pagination</h2>
                <p>Handle large result sets with pagination:</p>
                <CodeSnippet :code="paginationExample" language="python" />
              </section>

              <!-- Field Selection -->
              <section id="field-selection" class="doc-section">
                <h2>Field Selection</h2>
                <p>Select specific fields to reduce payload size:</p>
                <CodeSnippet :code="fieldSelectionExample" language="python" />
              </section>

              <!-- Sorting -->
              <section id="sorting" class="doc-section">
                <h2>Sorting</h2>
                <p>Sort inquiry results:</p>
                <CodeSnippet :code="sortingExample" language="python" />
              </section>

              <!-- Complex Example -->
              <section id="complex-example" class="doc-section">
                <h2>Complex Example</h2>
                <p>Combine filtering, sorting, pagination, and field selection:</p>
                <CodeSnippet :code="complexExample" language="python" />
              </section>

              <!-- Method Naming -->
              <section id="method-naming" class="doc-section">
                <h2>Method Naming</h2>
                <p>
                  Generic Inquiry names are converted to snake_case method names. The system removes special characters
                  and converts spaces to underscores.
                </p>
                <v-table>
                  <thead>
                    <tr>
                      <th>Inquiry Name</th>
                      <th>Method Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Customer Orders Summary</td>
                      <td><code>client.inquiries.customer_orders_summary()</code></td>
                    </tr>
                    <tr>
                      <td>AP-Invoice-Details</td>
                      <td><code>client.inquiries.ap_invoice_details()</code></td>
                    </tr>
                    <tr>
                      <td>Open Sales Orders</td>
                      <td><code>client.inquiries.open_sales_orders()</code></td>
                    </tr>
                    <tr>
                      <td>Inventory by Location</td>
                      <td><code>client.inquiries.inventory_by_location()</code></td>
                    </tr>
                  </tbody>
                </v-table>
              </section>

              <!-- Best Practices -->
              <section id="best-practices" class="doc-section">
                <h2>Best Practices</h2>
                <ul>
                  <li>Use <code>select</code> to request only needed fields</li>
                  <li>Apply filters to reduce result set size</li>
                  <li>Use pagination for large datasets</li>
                  <li>Check inquiry availability with <code>hasattr()</code> before calling</li>
                  <li>Cache inquiry results when data doesn't change frequently</li>
                  <li>Generic Inquiries are read-only - use entity endpoints for write operations</li>
                </ul>
              </section>

              <!-- Troubleshooting -->
              <section id="troubleshooting" class="doc-section">
                <h2>Troubleshooting</h2>
                
                <h3>Inquiry Not Found</h3>
                <CodeSnippet :code="troubleshootingExample" language="python" />
                
                <h3>Empty Results</h3>
                <p>
                  If an inquiry returns empty results, verify the inquiry works in the Acumatica UI and check
                  that your filter conditions are correct.
                </p>

                <h3>Performance Issues</h3>
                <p>
                  Large Generic Inquiries can be slow. Optimize by:
                </p>
                <ul>
                  <li>Using filters to reduce result set</li>
                  <li>Selecting only necessary fields</li>
                  <li>Adding appropriate pagination</li>
                  <li>Optimizing the GI query in Acumatica</li>
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

const navItems = ref([
  { id: 'overview', title: 'Overview', icon: 'mdi-information' },
  { id: 'discovery', title: 'Discovery', icon: 'mdi-magnify' },
  { id: 'basic-usage', title: 'Basic Usage', icon: 'mdi-play' },
  { id: 'filtering', title: 'Filtering', icon: 'mdi-filter' },
  { id: 'pagination', title: 'Pagination', icon: 'mdi-page-next' },
  { id: 'field-selection', title: 'Field Selection', icon: 'mdi-table-column' },
  { id: 'sorting', title: 'Sorting', icon: 'mdi-sort' },
  { id: 'complex-example', title: 'Complex Example', icon: 'mdi-code-braces' },
  { id: 'method-naming', title: 'Method Naming', icon: 'mdi-format-text' },
  { id: 'best-practices', title: 'Best Practices', icon: 'mdi-star' },
  { id: 'troubleshooting', title: 'Troubleshooting', icon: 'mdi-help-circle' },
]);

const overviewExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.odata import QueryOptions, F

client = AcumaticaClient()

# Access a Generic Inquiry
results = client.inquiries.customer_sales_summary()

# With filtering
options = QueryOptions(
    filter=F.CustomerClass == "WHOLESALE",
    top=50
)
filtered_results = client.inquiries.customer_sales_summary(options=options)`;

const discoveryExample = `# List all available inquiries
for service in dir(client.inquiries):
    if not service.startswith('_'):
        print(service)

# Check if specific inquiry exists
if hasattr(client.inquiries, 'customer_sales_summary'):
    results = client.inquiries.customer_sales_summary()

# Get inquiry method info
import inspect
method = getattr(client.inquiries, 'customer_sales_summary')
print(inspect.getsource(method))`;

const basicUsageExample = `# Call an inquiry without options
all_results = client.inquiries.open_sales_orders()

# Iterate through results
for order in all_results:
    print(f"Order: {order['OrderNbr']}, Customer: {order['CustomerID']}")

# Access specific fields
for order in all_results:
    order_number = order.get('OrderNbr')
    total = order.get('OrderTotal')
    status = order.get('Status')`;

const filteringExample = `from easy_acumatica.odata import QueryOptions, F

# Simple filter
options = QueryOptions(
    filter=F.CustomerClass == "WHOLESALE"
)
wholesale_customers = client.inquiries.customer_list(options=options)

# Complex filter
options = QueryOptions(
    filter=(
        (F.Status == "Open") & 
        (F.OrderTotal > 10000) &
        (F.OrderDate.year() == 2024)
    )
)
large_orders = client.inquiries.open_sales_orders(options=options)

# String operations
options = QueryOptions(
    filter=F.CustomerName.startswith("ABC")
)
abc_customers = client.inquiries.customer_list(options=options)`;

const paginationExample = `# Get first 100 results
options = QueryOptions(top=100)
page1 = client.inquiries.inventory_summary(options=options)

# Get next 100 results (skip first 100)
options = QueryOptions(top=100, skip=100)
page2 = client.inquiries.inventory_summary(options=options)

# Pagination loop
page_size = 100
page = 0
all_results = []

while True:
    options = QueryOptions(top=page_size, skip=page * page_size)
    results = client.inquiries.inventory_summary(options=options)
    
    if not results:
        break
    
    all_results.extend(results)
    page += 1
    
    print(f"Fetched {len(results)} items (total: {len(all_results)})")`;

const fieldSelectionExample = `# Select specific fields only
options = QueryOptions(
    select=["CustomerID", "CustomerName", "Balance"],
    top=50
)
customers = client.inquiries.customer_list(options=options)

# Result contains only selected fields
for customer in customers:
    print(customer)  # Only CustomerID, CustomerName, Balance`;

const sortingExample = `# Sort ascending
options = QueryOptions(
    orderby=["CustomerName"]
)
sorted_customers = client.inquiries.customer_list(options=options)

# Sort descending
options = QueryOptions(
    orderby=["OrderTotal desc"]
)
high_value_orders = client.inquiries.open_sales_orders(options=options)

# Multiple sort fields
options = QueryOptions(
    orderby=["CustomerClass", "Balance desc"]
)
customers = client.inquiries.customer_list(options=options)`;

const complexExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.odata import QueryOptions, F
from datetime import datetime, timedelta

client = AcumaticaClient()

# Complex inquiry with all options
thirty_days_ago = datetime.now() - timedelta(days=30)

options = QueryOptions(
    # Filter for recent high-value wholesale orders
    filter=(
        (F.CustomerClass == "WHOLESALE") &
        (F.Status == "Open") &
        (F.OrderTotal >= 5000) &
        (F.OrderDate >= thirty_days_ago)
    ),
    # Select only needed fields
    select=[
        "OrderNbr",
        "CustomerID", 
        "CustomerName",
        "OrderDate",
        "OrderTotal",
        "Status"
    ],
    # Sort by total descending
    orderby=["OrderTotal desc"],
    # First 50 results
    top=50
)

orders = client.inquiries.open_sales_orders(options=options)

# Process results
total_value = sum(order.get('OrderTotal', 0) for order in orders)
print(f"Found {len(orders)} high-value wholesale orders")
print(f"Total value: \${total_value:,.2f}")

for order in orders:
    print(f"{order['OrderNbr']}: {order['CustomerName']} - \${order['OrderTotal']:,.2f}")`;

const troubleshootingExample = `# Check if inquiry exists before calling
if hasattr(client.inquiries, 'my_custom_inquiry'):
    results = client.inquiries.my_custom_inquiry()
else:
    print("Inquiry 'my_custom_inquiry' not found")
    print("Available inquiries:")
    for attr in dir(client.inquiries):
        if not attr.startswith('_'):
            print(f"  - {attr}")

# Handle potential errors
try:
    results = client.inquiries.customer_sales_summary()
except AttributeError:
    print("Inquiry not available - check Acumatica configuration")
except Exception as e:
    print(f"Error accessing inquiry: {e}")`;

useSeoMeta({
  title: 'Generic Inquiries | Easy-Acumatica Python',
  description: 'Access Acumatica Generic Inquiries using Python. Filter, sort, and paginate inquiry results with QueryOptions.',
});
</script>

<style scoped>
.inquiries-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #00897b 0%, #26a69a 100%);
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
  color: #00897b;
  text-decoration: none;
  font-weight: 500;
}

.doc-section a:hover {
  text-decoration: underline;
}

/* Tables */
.v-table {
  margin-top: 1rem;
}

.v-table code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 100px;
}
</style>