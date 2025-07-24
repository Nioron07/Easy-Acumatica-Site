<template>
  <div class="odata-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-gradient"></div>
      <div class="hero-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <v-container class="hero-content">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <v-chip color="white" variant="outlined" size="large" class="mb-4 hero-chip">
              <v-icon start>mdi-database-search</v-icon>
              OData Query Builder
            </v-chip>
            <h1 class="hero-title">
              Query Options
            </h1>
            <p class="hero-subtitle">
              Build powerful OData queries with a clean, type-safe API
            </p>
            <div class="code-preview">
              <pre><code class="language-python">from easy_acumatica import QueryOptions, F

options = QueryOptions(
    filter=F.Amount > 1000,
    select=["CustomerID", "Amount", "Status"],
    expand=["Details"],
    order_by="Amount desc",
    top=50
)</code></pre>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Main Content -->
    <v-container class="content-container">
      <!-- Introduction -->
      <section class="content-section">
        <v-row>
          <v-col cols="12">
            <v-card class="info-card gradient-border">
              <v-card-text>
                <div class="d-flex align-center mb-3">
                  <v-icon color="primary" size="28" class="mr-3">mdi-information</v-icon>
                  <h3 class="text-h5 font-weight-bold">Overview</h3>
                </div>
                <p class="text-body-1">
                  The <code class="inline-code">QueryOptions</code> class provides a clean, type-safe way to build 
                  OData queries for the Acumatica REST API. It handles all the complex URL encoding and parameter 
                  formatting, letting you focus on your business logic.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Basic Usage -->
      <section class="content-section">
        <h2 class="section-title">Basic Usage</h2>
        
        <v-row>
          <v-col cols="12">
            <div class="example-card">
              <h3 class="example-title">Import and Initialize</h3>
              <CodePlayground
                :initial-code="basicUsageCode"
                language="python"
              />
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- Parameters -->
      <section class="content-section">
        <h2 class="section-title">Available Parameters</h2>
        
        <v-row>
          <v-col v-for="param in parameters" :key="param.name" cols="12" md="6">
            <v-card class="parameter-card h-100" elevation="0">
              <v-card-text>
                <div class="parameter-header">
                  <code class="parameter-name">{{ param.name }}</code>
                  <v-chip size="small" color="primary" variant="tonal">
                    {{ param.type }}
                  </v-chip>
                </div>
                <p class="parameter-desc mt-3">{{ param.description }}</p>
                <div class="parameter-example mt-3">
                  <CodePlayground
                    :initial-code="param.example"
                    language="python"
                    :show-copy-button="true"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Advanced Examples -->
      <section class="content-section">
        <h2 class="section-title">Advanced Examples</h2>
        
        <v-tabs v-model="exampleTab" class="example-tabs mb-6">
          <v-tab v-for="example in advancedExamples" :key="example.title" :value="example.title">
            {{ example.title }}
          </v-tab>
        </v-tabs>

        <v-window v-model="exampleTab">
          <v-window-item v-for="example in advancedExamples" :key="example.title" :value="example.title">
            <v-card class="example-card" elevation="0">
              <v-card-text>
                <p class="example-description mb-4">{{ example.description }}</p>
                <CodePlayground
                  :initial-code="example.code"
                  language="python"
                />
                <div v-if="example.notes" class="mt-4">
                  <v-alert type="info" variant="tonal" density="compact">
                    <div v-html="example.notes"></div>
                  </v-alert>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </section>

      <!-- Best Practices -->
      <section class="content-section">
        <h2 class="section-title">Best Practices</h2>
        
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="tip-card h-100">
              <v-card-text>
                <div class="d-flex align-center mb-3">
                  <v-icon color="success" size="28" class="mr-3">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold">Performance Tips</h3>
                </div>
                <ul class="tip-list">
                  <li>Use <code>select</code> to limit fields and reduce payload size</li>
                  <li>Apply <code>filter</code> early to minimize data transfer</li>
                  <li>Use <code>top</code> with pagination for large datasets</li>
                  <li>Only <code>expand</code> entities you actually need</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card class="tip-card h-100">
              <v-card-text>
                <div class="d-flex align-center mb-3">
                  <v-icon color="warning" size="28" class="mr-3">mdi-alert</v-icon>
                  <h3 class="text-h6 font-weight-bold">Common Pitfalls</h3>
                </div>
                <ul class="tip-list">
                  <li>Remember that <code>skip</code> without <code>top</code> has no effect</li>
                  <li>Field names in <code>select</code> are case-sensitive</li>
                  <li>Complex filters may impact query performance</li>
                  <li>Some custom fields require special <code>custom</code> parameter</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- API Reference -->
      <section class="content-section">
        <h2 class="section-title">API Reference</h2>
        
        <v-card class="reference-card">
          <v-card-text>
            <h3 class="mb-4">QueryOptions Class</h3>
            <div class="reference-code">
              <pre><code class="language-python">class QueryOptions:
    def __init__(
        self,
        select: Optional[List[str]] = None,
        filter: Optional[Union[str, Filter]] = None,
        expand: Optional[List[str]] = None,
        custom: Optional[List[Union[str, CustomField]]] = None,
        order_by: Optional[str] = None,
        top: Optional[int] = None,
        skip: Optional[int] = None
    ):
        """
        Initialize query options for OData requests.
        
        All parameters are optional and can be combined as needed.
        """</code></pre>
            </div>
            
            <h4 class="mt-6 mb-3">Methods</h4>
            <v-table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Description</th>
                  <th>Returns</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>to_dict()</code></td>
                  <td>Convert options to dictionary format for API calls</td>
                  <td><code>Dict[str, Any]</code></td>
                </tr>
                <tr>
                  <td><code>to_params()</code></td>
                  <td>Convert options to URL parameters</td>
                  <td><code>Dict[str, str]</code></td>
                </tr>
                <tr>
                  <td><code>copy(**kwargs)</code></td>
                  <td>Create a copy with updated parameters</td>
                  <td><code>QueryOptions</code></td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </section>

      <!-- Next Steps -->
      <section class="content-section">
        <v-card class="next-steps-card gradient-border">
          <v-card-text>
            <h2 class="text-h4 font-weight-bold mb-4">Next Steps</h2>
            <v-row>
              <v-col cols="12" md="6">
                <v-btn
                  size="large"
                  color="primary"
                  variant="flat"
                  block
                  to="/python/odata/filters"
                  class="text-none"
                >
                  <v-icon start>mdi-filter</v-icon>
                  Learn About Filters
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  size="large"
                  color="secondary"
                  variant="tonal"
                  block
                  to="/python/sub-services/records"
                  class="text-none"
                >
                  <v-icon start>mdi-database</v-icon>
                  Using with Records Service
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </section>
    </v-container>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/CodeSnippet.vue';
import CodePlayground from '~/components/CodeSnippet.vue';

// Active tab for examples
const exampleTab = ref('Complex Queries');

// Basic usage example
const basicUsageCode = `from easy_acumatica import QueryOptions, F

# Create a simple query
options = QueryOptions(
    filter=F.Status == "Active",
    top=10
)

# Use with a service
active_customers = client.customers.get_list(options)`;

// Parameters definition
const parameters = ref([
  {
    name: 'filter',
    type: 'Filter | str',
    description: 'OData filter expression to limit results. Can use the F factory for type-safe filters or raw OData strings.',
    example: `# Using F factory (recommended)
options = QueryOptions(
    filter=F.Amount > 1000
)

# Using raw OData string
options = QueryOptions(
    filter="Amount gt 1000"
)`
  },
  {
    name: 'select',
    type: 'List[str]',
    description: 'List of field names to include in the response. Reduces payload size by only returning specified fields.',
    example: `options = QueryOptions(
    select=["CustomerID", "CustomerName", "Email"]
)

# Returns only specified fields`
  },
  {
    name: 'expand',
    type: 'List[str]',
    description: 'List of related entities to include in the response. Follows navigation properties.',
    example: `options = QueryOptions(
    expand=["BillingContact", "ShippingAddress", "Details"]
)

# Includes related entity data`
  },
  {
    name: 'order_by',
    type: 'str',
    description: 'Field name and direction for sorting results. Use "desc" suffix for descending order.',
    example: `# Ascending order (default)
options = QueryOptions(order_by="CustomerName")

# Descending order
options = QueryOptions(order_by="CreatedDate desc")`
  },
  {
    name: 'top',
    type: 'int',
    description: 'Maximum number of records to return. Essential for pagination and performance.',
    example: `# Get first 50 records
options = QueryOptions(
    top=50,
    filter=F.Status == "Active"
)`
  },
  {
    name: 'skip',
    type: 'int',
    description: 'Number of records to skip. Used with top for pagination. Requires top to be set.',
    example: `# Get records 51-100
options = QueryOptions(
    top=50,
    skip=50
)`
  },
  {
    name: 'custom',
    type: 'List[CustomField | str]',
    description: 'List of custom fields to include. Use CustomField helper for proper formatting.',
    example: `from easy_acumatica import CustomField

options = QueryOptions(
    custom=[
        CustomField.field("ItemSettings", "UsrRepairType")
    ]
)`
  }
]);

// Advanced examples
const advancedExamples = ref([
  {
    title: 'Complex Queries',
    description: 'Combine multiple parameters for sophisticated data retrieval',
    code: `from easy_acumatica import QueryOptions, F, CustomField

# Complex query with all parameters
options = QueryOptions(
    # Filter by multiple conditions
    filter=(F.Status == "Active") & (F.Balance > 1000) & (F.CustomerClass == "WHOLESALE"),
    
    # Select specific fields
    select=["CustomerID", "CustomerName", "Balance", "CreditLimit"],
    
    # Include related entities
    expand=["MainContact", "DefaultLocation"],
    
    # Include custom fields
    custom=[
        CustomField.field("CustomerSettings", "UsrVIPStatus"),
        CustomField.field("CustomerSettings", "UsrLoyaltyPoints")
    ],
    
    # Sort by balance descending
    order_by="Balance desc",
    
    # Limit to top 20
    top=20
)

# Execute query
top_customers = client.customers.get_list(options)`,
    notes: 'This example shows how to combine all QueryOptions parameters for a comprehensive query.'
  },
  {
    title: 'Pagination',
    description: 'Implement efficient pagination for large datasets',
    code: `def get_all_active_invoices(client, page_size=100):
    """Retrieve all active invoices using pagination."""
    all_invoices = []
    skip = 0
    
    while True:
        options = QueryOptions(
            filter=F.Status == "Open",
            top=page_size,
            skip=skip,
            order_by="Date desc"
        )
        
        # Get page of results
        page = client.invoices.get_list(options)
        
        # Add to results
        all_invoices.extend(page)
        
        # Check if we got a full page
        if len(page) < page_size:
            break
            
        # Move to next page
        skip += page_size
    
    return all_invoices

# Usage
invoices = get_all_active_invoices(client)
print(f"Retrieved {len(invoices)} invoices")`,
    notes: 'Always use <code>order_by</code> with pagination to ensure consistent results.'
  },
  {
    title: 'Dynamic Queries',
    description: 'Build queries dynamically based on user input or conditions',
    code: `def build_customer_query(
    status=None, 
    min_balance=None, 
    customer_class=None,
    include_contacts=False
):
    """Build a dynamic query based on parameters."""
    
    # Start with base options
    options = {
        "select": ["CustomerID", "CustomerName", "Balance", "Status"],
        "top": 100
    }
    
    # Build filter conditions
    conditions = []
    
    if status:
        conditions.append(F.Status == status)
    
    if min_balance is not None:
        conditions.append(F.Balance >= min_balance)
    
    if customer_class:
        conditions.append(F.CustomerClass == customer_class)
    
    # Combine conditions with AND
    if conditions:
        filter_expr = conditions[0]
        for condition in conditions[1:]:
            filter_expr = filter_expr & condition
        options["filter"] = filter_expr
    
    # Add expansion if requested
    if include_contacts:
        options["expand"] = ["MainContact", "Contacts"]
    
    return QueryOptions(**options)

# Usage examples
query1 = build_customer_query(status="Active", min_balance=5000)
query2 = build_customer_query(customer_class="RETAIL", include_contacts=True)`,
    notes: 'Building queries dynamically allows for flexible, reusable query logic.'
  },
  {
    title: 'Performance Optimization',
    description: 'Optimize queries for better performance',
    code: `# BAD: Retrieving all fields when you only need a few
bad_options = QueryOptions(
    filter=F.Status == "Active"
)

# GOOD: Select only needed fields
good_options = QueryOptions(
    filter=F.Status == "Active",
    select=["CustomerID", "CustomerName", "Email"]
)

# BAD: Expanding everything
bad_options = QueryOptions(
    expand=["*"]  # Don't do this!
)

# GOOD: Expand only what you need
good_options = QueryOptions(
    expand=["MainContact"],
    select=["CustomerID", "CustomerName", "MainContact.Email"]
)

# GOOD: Use server-side filtering instead of client-side
# Instead of:
all_customers = client.customers.get_list()
active = [c for c in all_customers if c.Status == "Active"]

# Do this:
options = QueryOptions(filter=F.Status == "Active")
active = client.customers.get_list(options)`,
    notes: 'Proper use of QueryOptions can significantly improve API performance and reduce bandwidth usage.'
  }
]);

// SEO
useSeoMeta({
  title: 'QueryOptions - OData Query Builder | Easy-Acumatica Python',
  description: 'Learn how to use QueryOptions to build powerful OData queries in Easy-Acumatica. Filter, select, expand, and paginate your Acumatica data efficiently.',
  ogTitle: 'QueryOptions - Easy-Acumatica OData Builder',
  ogDescription: 'Build type-safe OData queries with QueryOptions. Complete guide with examples.',
});
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  background: #0a0e27;
  overflow: hidden;
  padding: 4rem 0;
  margin-bottom: 3rem;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.9;
}

.hero-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  background: white;
  opacity: 0.05;
}

.shape-1 {
  top: 20%;
  left: 10%;
  width: 200px;
  height: 200px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  bottom: 20%;
  right: 10%;
  width: 150px;
  height: 150px;
  border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  animation: float 25s ease-in-out infinite reverse;
}

.shape-3 {
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); }
  33% { transform: translateY(-20px) translateX(10px); }
  66% { transform: translateY(20px) translateX(-10px); }
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.05; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.02; }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-chip {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin: 1rem 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 300;
}

.code-preview {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.code-preview pre {
  margin: 0;
  color: #e6e6e6;
}

.code-preview code {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Content Sections */
.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

/* Cards */
.info-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  border-radius: 16px;
  pointer-events: none;
}

.parameter-card {
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.parameter-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: #667eea;
}

.parameter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.parameter-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #667eea;
  font-family: 'Fira Code', monospace;
}

.parameter-desc {
  color: #666;
  line-height: 1.6;
}

.inline-code {
  background: #e8eaf6;
  color: #5e35b1;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
}

/* Example Cards */
.example-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.example-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a237e;
  margin-bottom: 1rem;
}

.example-description {
  color: #666;
  line-height: 1.6;
}

.example-tabs :deep(.v-tabs) {
  background: #f8f9fa;
  border-radius: 12px;
}

.example-tabs :deep(.v-tab) {
  text-transform: none;
  font-weight: 500;
}

/* Tip Cards */
.tip-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.tip-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-list li {
  padding: 0.75rem 0;
  position: relative;
  padding-left: 1.5rem;
  color: #666;
}

.tip-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.tip-list code {
  background: #e8eaf6;
  color: #5e35b1;
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  font-size: 0.875em;
}

/* Reference Card */
.reference-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

.reference-code {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
}

.reference-code pre {
  margin: 0;
  color: #e6e6e6;
}

.reference-code code {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Next Steps Card */
.next-steps-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  margin-top: 3rem;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>