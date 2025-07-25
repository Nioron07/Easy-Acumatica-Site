<template>
  <div class="queryoptions-page">
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
                
                <v-alert type="info" variant="tonal" class="mt-4">
                  <strong>Pro tip:</strong> QueryOptions works seamlessly with the F factory for building filters. 
                  All parameters are optional and can be combined as needed.
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Quick Start Examples -->
      <section class="content-section">
        <h2 class="section-title">Quick Start Examples</h2>
        
        <v-row>
          <v-col cols="12">
            <v-tabs v-model="quickStartTab" class="mb-4">
              <v-tab value="simple">Simple Query</v-tab>
              <v-tab value="filtered">Filtered Query</v-tab>
              <v-tab value="complex">Complex Query</v-tab>
            </v-tabs>

            <v-tabs-window v-model="quickStartTab">
              <v-tabs-window-item value="simple">
                <CodeSnippet
                  :code="simpleQueryExample"
                  language="python"
                />
              </v-tabs-window-item>

              <v-tabs-window-item value="filtered">
                <CodeSnippet
                  :code="filteredQueryExample"
                  language="python"
                />
              </v-tabs-window-item>

              <v-tabs-window-item value="complex">
                <CodeSnippet
                  :code="complexQueryExample"
                  language="python"
                />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-col>
        </v-row>
      </section>

      <!-- Parameters Reference -->
      <section class="content-section">
        <h2 class="section-title">Parameters Reference</h2>
        
        <v-card>
          <v-card-text>
            <p class="mb-4">All QueryOptions parameters with examples:</p>
            
            <v-expansion-panels variant="accordion">
              <v-expansion-panel v-for="param in allParameters" :key="param.name">
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <code class="param-name">{{ param.name }}</code>
                    <v-chip size="small" class="ml-3" :color="param.required ? 'error' : 'default'">
                      {{ param.required ? 'Required' : 'Optional' }}
                    </v-chip>
                    <span class="ml-3 text-grey">{{ param.type }}</span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="mb-3">{{ param.description }}</p>
                  <CodeSnippet
                    :code="param.example"
                    language="python"
                  />
                  <v-alert v-if="param.note" type="info" variant="tonal" class="mt-3">
                    {{ param.note }}
                  </v-alert>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </section>

      <!-- Advanced Usage Patterns -->
      <section class="content-section">
        <h2 class="section-title">Advanced Usage Patterns</h2>
        
        <v-row>
          <v-col v-for="pattern in advancedPatterns" :key="pattern.title" cols="12">
            <v-card class="pattern-card">
              <v-card-title>
                <v-icon :icon="pattern.icon" class="mr-2"></v-icon>
                {{ pattern.title }}
              </v-card-title>
              <v-card-subtitle>{{ pattern.description }}</v-card-subtitle>
              <v-card-text>
                <CodeSnippet
                  :code="pattern.code"
                  language="python"
                />
                <v-alert v-if="pattern.warning" type="warning" variant="tonal" class="mt-4">
                  <strong>Warning:</strong> {{ pattern.warning }}
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- QueryOptions Methods -->
      <section class="content-section">
        <h2 class="section-title">QueryOptions Methods</h2>
        
        <v-card>
          <v-card-text>
            <p class="mb-4">Available methods on QueryOptions instances:</p>
            
            <v-table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Description</th>
                  <th>Returns</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="method in queryOptionsMethods" :key="method.name">
                  <td><code>{{ method.name }}</code></td>
                  <td>{{ method.description }}</td>
                  <td><code>{{ method.returns }}</code></td>
                  <td><code>{{ method.example }}</code></td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </section>

      <!-- Filter Functions Reference -->
      <section class="content-section">
        <h2 class="section-title">Filter Functions Reference</h2>
        
        <v-card>
          <v-card-text>
            <div class="d-flex align-center mb-4">
              <v-icon color="primary" size="28" class="mr-3">mdi-filter-variant</v-icon>
              <div>
                <h3 class="text-h6 mb-1">Need help with filter functions?</h3>
                <p class="text-body-2 text-grey-darken-1">
                  The filter parameter accepts Filter objects created with the F factory, which provides
                  a comprehensive set of functions for building OData queries.
                </p>
              </div>
            </div>
            
            <v-btn
              color="primary"
              variant="flat"
              size="large"
              to="/python/odata/filters"
              class="text-none"
            >
              <v-icon start>mdi-book-open-variant</v-icon>
              View Complete Filter Reference
            </v-btn>
            
            <v-divider class="my-4"></v-divider>
            
            <h4 class="mb-3">Quick Examples</h4>
            <CodeSnippet
              :code="filterQuickExamples"
              language="python"
            />
          </v-card-text>
        </v-card>
      </section>

      <!-- Next Steps -->
      <section class="content-section">
        <v-card class="next-steps-card gradient-border">
          <v-card-text>
            <h2 class="text-h4 font-weight-bold mb-4">Next Steps</h2>
            <v-row>
              <v-col>
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
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';

// Active tab
const quickStartTab = ref('simple');

// Example code
const simpleQueryExample = `from easy_acumatica import QueryOptions

# Get top 10 customers
options = QueryOptions(top=10)
customers = client.customers.get_list(options)

# Get specific fields only
options = QueryOptions(
    select=["CustomerID", "CustomerName", "Email"]
)
customers = client.customers.get_list(options)`;

const filteredQueryExample = `from easy_acumatica import QueryOptions, F

# Filter active customers with balance > 1000
options = QueryOptions(
    filter=(F.Status == "Active") & (F.Balance > 1000),
    order_by="Balance desc",
    top=50
)
customers = client.customers.get_list(options)

# Complex filter with string functions
options = QueryOptions(
    filter=(
        F.CustomerName.startswith("ABC") & 
        F.Email.endswith("@company.com") &
        (F.CustomerClass == "WHOLESALE")
    ),
    select=["CustomerID", "CustomerName", "Email", "Balance"]
)`;

const complexQueryExample = `from easy_acumatica import QueryOptions, F, CustomField

# Complex query with all features
options = QueryOptions(
    # Multiple filter conditions
    filter=(
        (F.Status == "Active") & 
        (F.Balance > 1000) & 
        (F.LastOrderDate.year() == 2024)
    ),
    
    # Select specific fields
    select=[
        "CustomerID", 
        "CustomerName", 
        "Balance", 
        "CreditLimit",
        "LastOrderDate"
    ],
    
    # Include related entities
    expand=["MainContact", "DefaultLocation"],
    
    # Include custom fields
    custom=[
        CustomField.field("CustomerSettings", "UsrVIPStatus"),
        CustomField.field("CustomerSettings", "UsrLoyaltyLevel")
    ],
    
    # Sort by multiple fields
    order_by=["CustomerClass", "Balance desc"],
    
    # Pagination
    top=20,
    skip=0
)

# Execute the query
results = client.customers.get_list(options)

# Process results
for customer in results:
    print(f"{customer.CustomerID}: {customer.Balance}")`;

// All parameters
const allParameters = ref([
  {
    name: 'filter',
    type: 'Filter | str',
    required: false,
    description: 'OData filter expression to limit results. Use the F factory for type-safe filters.',
    example: `# Using F factory (recommended)
options = QueryOptions(
    filter=F.Status == "Active"
)

# Complex filter
options = QueryOptions(
    filter=(F.Amount > 1000) & (F.CustomerClass == "WHOLESALE")
)

# String filter (not recommended)
options = QueryOptions(
    filter="Status eq 'Active'"
)`,
    note: 'Always use the F factory for type-safe, readable filters. String filters are error-prone.'
  },
  {
    name: 'select',
    type: 'List[str]',
    required: false,
    description: 'List of field names to return. Reduces payload size by only returning specified fields.',
    example: `# Select specific fields
options = QueryOptions(
    select=["CustomerID", "CustomerName", "Email", "Phone"]
)

# Combine with filter
options = QueryOptions(
    filter=F.Status == "Active",
    select=["CustomerID", "Balance"]
)`,
    note: 'Selecting only needed fields improves performance and reduces bandwidth.'
  },
  {
    name: 'expand',
    type: 'List[str]',
    required: false,
    description: 'List of related entities to include in the response.',
    example: `# Expand single entity
options = QueryOptions(
    expand=["MainContact"]
)

# Expand multiple entities
options = QueryOptions(
    expand=["MainContact", "DefaultLocation", "ShippingAddress"]
)

# Expand with filter and select
options = QueryOptions(
    filter=F.Status == "Active",
    select=["CustomerID", "CustomerName"],
    expand=["MainContact", "CreditTerms"]
)`,
    note: 'Expanded entities are automatically included when using custom fields that reference them.'
  },
  {
    name: 'top',
    type: 'int',
    required: false,
    description: 'Maximum number of records to return. Essential for pagination and performance.',
    example: `# Get first 50 records
options = QueryOptions(
    top=50
)

# Combine with filter and sort
options = QueryOptions(
    filter=F.Status == "Active",
    order_by="CreatedDate desc",
    top=10
)`,
    note: 'Always use top to limit results, especially during development and testing.'
  },
  {
    name: 'skip',
    type: 'int',
    required: false,
    description: 'Number of records to skip. Used with top for pagination.',
    example: `# Skip first 50, get next 50 (page 2)
options = QueryOptions(
    top=50,
    skip=50
)

# Pagination helper
def get_page(page_number, page_size=20):
    return QueryOptions(
        top=page_size,
        skip=(page_number - 1) * page_size,
        order_by="CustomerID"  # Always use order_by with pagination
    )`,
    note: 'Always use order_by with skip to ensure consistent pagination results.'
  },
  {
    name: 'order_by',
    type: 'str | List[str]',
    required: false,
    description: 'Field(s) to sort by. Use "field desc" for descending order.',
    example: `# Single field sort
options = QueryOptions(
    order_by="CustomerName"
)

# Descending sort
options = QueryOptions(
    order_by="Balance desc"
)

# Multiple fields
options = QueryOptions(
    order_by=["CustomerClass", "Balance desc"]
)`,
    note: 'Field names are case-sensitive. Use desc for descending, default is ascending.'
  },
  {
    name: 'custom',
    type: 'List[CustomField | str]',
    required: false,
    description: 'List of custom fields to include in the response.',
    example: `from easy_acumatica import CustomField

# Single custom field
options = QueryOptions(
    custom=[
        CustomField.field("CustomerSettings", "UsrVIPStatus")
    ]
)

# Multiple custom fields with entity reference
options = QueryOptions(
    custom=[
        CustomField.field("ItemSettings", "UsrRepairType", "InventoryItem"),
        CustomField.field("Document", "UsrApprovalStatus")
    ],
    expand=["InventoryItem"]  # Automatically added if not present
)`,
    note: 'Custom fields require exact field type, view name, and field name from Acumatica.'
  },
  {
    name: 'count',
    type: 'bool',
    required: false,
    description: 'Include total count of matching records (OData v4 only).',
    example: `# Request count with results
options = QueryOptions(
    filter=F.Status == "Active",
    top=10,
    count=True
)

# The response will include @odata.count`,
    note: 'Only available in OData v4. Check your Acumatica version.'
  },
  {
    name: 'search',
    type: 'str',
    required: false,
    description: 'Free-text search across searchable fields (OData v4 only).',
    example: `# Search across all searchable fields
options = QueryOptions(
    search="john smith",
    top=20
)

# Combine with filter
options = QueryOptions(
    search="urgent",
    filter=F.Status == "Open"
)`,
    note: 'Search behavior depends on Acumatica configuration. Not all fields are searchable.'
  }
]);

// Advanced patterns
const advancedPatterns = ref([
  {
    title: 'Dynamic Query Building',
    icon: 'mdi-cog-outline',
    description: 'Build queries dynamically based on runtime conditions',
    code: `def build_customer_query(
    status=None,
    min_balance=None,
    customer_class=None,
    include_contacts=False,
    page=1,
    page_size=20
):
    """Build a dynamic customer query based on parameters."""
    
    # Start with base options
    options_dict = {
        "select": ["CustomerID", "CustomerName", "Balance", "Status"],
        "order_by": "CustomerName",
        "top": page_size,
        "skip": (page - 1) * page_size
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
        options_dict["filter"] = filter_expr
    
    # Add expansion if requested
    if include_contacts:
        options_dict["expand"] = ["MainContact", "Contacts"]
        options_dict["select"].extend(["MainContact.Email", "MainContact.Phone"])
    
    return QueryOptions(**options_dict)

# Usage examples
query1 = build_customer_query(status="Active", min_balance=5000)
query2 = build_customer_query(customer_class="RETAIL", include_contacts=True, page=2)
query3 = build_customer_query()  # No filters, just pagination`,
    warning: 'Always validate user inputs before building queries to prevent injection attacks.'
  },
  {
    title: 'Efficient Pagination',
    icon: 'mdi-book-open-page-variant',
    description: 'Implement efficient pagination for large datasets',
    code: `class PaginatedQuery:
    """Helper class for paginated queries."""
    
    def __init__(self, client, service_name, page_size=50):
        self.client = client
        self.service = getattr(client, service_name)
        self.page_size = page_size
    
    def get_all(self, base_options=None):
        """Get all records using pagination."""
        all_records = []
        skip = 0
        
        while True:
            # Build options for this page
            options_dict = {
                "top": self.page_size,
                "skip": skip,
                "order_by": "id"  # Consistent ordering required
            }
            
            # Merge with base options
            if base_options:
                if hasattr(base_options, 'to_dict'):
                    base_dict = base_options.to_dict()
                else:
                    base_dict = base_options
                options_dict.update(base_dict)
            
            options = QueryOptions(**options_dict)
            
            # Get page
            page = self.service.get_list(options)
            
            if not page:
                break
                
            all_records.extend(page)
            
            # Check if we got a full page
            if len(page) < self.page_size:
                break
            
            skip += self.page_size
            
        return all_records
    
    def get_page(self, page_number, base_options=None):
        """Get a specific page of results."""
        options_dict = {
            "top": self.page_size,
            "skip": (page_number - 1) * self.page_size,
            "order_by": "id"
        }
        
        if base_options:
            if hasattr(base_options, 'to_dict'):
                base_dict = base_options.to_dict()
            else:
                base_dict = base_options
            options_dict.update(base_dict)
        
        options = QueryOptions(**options_dict)
        return self.service.get_list(options)

# Usage
paginator = PaginatedQuery(client, "customers", page_size=100)

# Get all active customers
base_options = QueryOptions(filter=F.Status == "Active")
all_active = paginator.get_all(base_options)

# Get specific page
page_3 = paginator.get_page(3, base_options)`,
    warning: 'Large datasets can impact performance. Consider using server-side filtering instead of retrieving all records.'
  },
  {
    title: 'Performance Optimization',
    icon: 'mdi-speedometer',
    description: 'Optimize queries for maximum performance',
    code: `# BAD: Retrieving all fields when you only need a few
bad_options = QueryOptions(
    filter=F.Status == "Active"
)
# This returns ALL fields for each record

# GOOD: Select only needed fields
good_options = QueryOptions(
    filter=F.Status == "Active",
    select=["CustomerID", "CustomerName", "Email", "Balance"]
)
# Much smaller payload, faster response

# GOOD: Expand only what you need
good_options = QueryOptions(
    expand=["MainContact"],
    select=[
        "CustomerID", 
        "CustomerName", 
        "MainContact.Email",
        "MainContact.Phone"
    ]
)

# BAD: Client-side filtering
all_customers = client.customers.get_list()
active = [c for c in all_customers if c.Status == "Active"]

# GOOD: Server-side filtering
options = QueryOptions(filter=F.Status == "Active")
active = client.customers.get_list(options)

# Monitoring query performance
import time

def measure_query(options):
    start = time.time()
    results = client.customers.get_list(options)
    duration = time.time() - start
    
    print(f"Query took {duration:.2f} seconds")
    print(f"Retrieved {len(results)} records")
    
    if hasattr(results, '__sizeof__'):
        size = sys.getsizeof(results) / 1024
        print(f"Payload size: ~{size:.1f} KB")
    
    return results

# Test different approaches
measure_query(QueryOptions(top=10))  # Baseline
measure_query(QueryOptions(top=10, select=["CustomerID"]))  # Minimal`,
    warning: ''
  },
  {
    title: 'Copying and Modifying Queries',
    icon: 'mdi-content-copy',
    description: 'Create variations of existing queries',
    code: `# Base query
base_options = QueryOptions(
    select=["CustomerID", "CustomerName", "Balance"],
    order_by="CustomerName"
)

# Method 1: Using copy() method
active_options = base_options.copy(
    filter=F.Status == "Active"
)

# Method 2: Convert to dict and modify
base_dict = base_options.to_dict()
base_dict["filter"] = F.Status == "Inactive"
inactive_options = QueryOptions(**base_dict)

# Method 3: Build query templates
class QueryTemplates:
    @staticmethod
    def customer_summary(status=None, min_balance=None):
        """Standard customer summary query."""
        options = {
            "select": [
                "CustomerID",
                "CustomerName", 
                "Balance",
                "CreditLimit",
                "Status"
            ],
            "order_by": "Balance desc"
        }
        
        filters = []
        if status:
            filters.append(F.Status == status)
        if min_balance is not None:
            filters.append(F.Balance >= min_balance)
            
        if filters:
            filter_expr = filters[0]
            for f in filters[1:]:
                filter_expr = filter_expr & f
            options["filter"] = filter_expr
            
        return QueryOptions(**options)
    
    @staticmethod
    def customer_details(customer_id):
        """Detailed customer query."""
        return QueryOptions(
            filter=F.CustomerID == customer_id,
            expand=[
                "MainContact",
                "DefaultLocation",
                "CreditTerms",
                "Contacts",
                "Locations"
            ]
        )

# Usage
summary = QueryTemplates.customer_summary(status="Active", min_balance=1000)
details = QueryTemplates.customer_details("CUST001")`,
    warning: ''
  }
]);

// QueryOptions methods
const queryOptionsMethods = ref([
  {
    name: 'to_dict()',
    description: 'Convert QueryOptions to a dictionary',
    returns: 'Dict[str, Any]',
    example: 'options.to_dict()'
  },
  {
    name: 'to_params()',
    description: 'Convert to URL parameters with $ prefixes',
    returns: 'Dict[str, str]',
    example: 'options.to_params()'
  },
  {
    name: 'copy(**kwargs)',
    description: 'Create a copy with updated parameters',
    returns: 'QueryOptions',
    example: 'options.copy(top=50)'
  }
]);

// Filter quick examples
const filterQuickExamples = `from easy_acumatica import QueryOptions, F

# Basic comparisons
options = QueryOptions(filter=F.Status == "Active")
options = QueryOptions(filter=(F.Amount > 1000) & (F.Amount <= 5000))

# String functions
options = QueryOptions(filter=F.CustomerName.startswith("ABC"))
options = QueryOptions(filter=F.Email.contains("@company.com"))

# Date functions
options = QueryOptions(filter=F.CreatedDate.year() == 2024)
options = QueryOptions(filter=(F.Date >= "2024-01-01") & (F.Date < "2024-07-01"))

# Complex filters
options = QueryOptions(
    filter=(
        (F.Status == "Active") & 
        (F.CustomerClass.in_(["WHOLESALE", "RETAIL"])) &
        (F.Balance > 0)
    )
)`;

// SEO
useSeoMeta({
  title: 'QueryOptions - OData Query Builder | Easy-Acumatica Python',
  description: 'Learn how to use QueryOptions to build powerful OData queries in Easy-Acumatica. Filter, select, expand, and paginate your Acumatica data efficiently.',
  ogTitle: 'QueryOptions - Easy-Acumatica OData Builder',
  ogDescription: 'Build type-safe OData queries with QueryOptions. Complete guide with examples and function reference.',
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
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-block;
  text-align: left;
}

.code-preview pre {
  margin: 0;
  color: #e6e6e6;
}

.code-preview code {
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  line-height: 1.5;
}

/* Content */
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
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

/* Cards */
.info-card {
  background: #f8f9fa;
  border-radius: 16px;
  overflow: hidden;
}

.gradient-border {
  position: relative;
  background: white;
}

.gradient-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.pattern-card {
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.pattern-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.next-steps-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

/* Code */
.inline-code {
  background: rgba(102, 126, 234, 0.1);
  color: #5e35b1;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
}

.param-name {
  font-weight: 600;
  font-size: 1rem;
  color: #1a237e;
}

/* Tables */
.v-table {
  background: transparent;
}

.v-table thead tr {
  background: #f5f5f5;
}

.v-table tbody tr:hover {
  background: #fafafa;
}

.v-table code {
  background: #f5f5f5;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.85em;
}

/* Mobile */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .code-preview {
    max-width: 100%;
    overflow-x: auto;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>