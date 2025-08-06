<template>
  <div class="examples-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container class="py-16">
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center">
            <div class="hero-badge mb-4">
              <v-chip class="gradient-chip" size="small">
                <v-icon start size="x-small">mdi-code-tags</v-icon>
                Code Examples
              </v-chip>
            </div>
            
            <h1 class="hero-title mb-4">
              Real-World <span class="gradient-text">Examples</span>
            </h1>
            
            <p class="hero-subtitle mb-8">
              Learn by example with practical, production-ready code snippets
            </p>

            <div class="quick-nav">
              <v-btn
                v-for="item in quickNavItems"
                :key="item.id"
                :href="`#${item.id}`"
                variant="tonal"
                class="ma-1 gradient-hover"
              >
                {{ item.title }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
      
      <!-- Animated background shapes -->
      <div class="hero-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </section>

    <!-- Main Content -->
    <v-container class="examples-content py-12">
      <!-- Client Initialization -->
      <section id="initialization" class="example-section mb-16">
        <v-row>
          <v-col cols="12">
            <div class="section-header mb-8">
              <v-chip class="gradient-chip-outline" size="small" variant="outlined">
                <v-icon start>mdi-power-plug</v-icon>
                Getting Started
              </v-chip>
              <h2 class="section-title mb-4">Initializing the Client</h2>
              <p class="section-description">
                Connect to your Acumatica instance and discover all available models and services
              </p>
            </div>

            <v-card class="example-card" elevation="0">
              <v-tabs 
                v-model="initTab" 
                bg-color="white" 
                class="example-tabs"
                color="deep-purple"
              >
                <v-tab value="basic">Basic Setup</v-tab>
                <v-tab value="env">Environment Variables</v-tab>
                <v-tab value="advanced">Advanced Config</v-tab>
              </v-tabs>

              <v-window v-model="initTab">
                <v-window-item value="basic">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="initBasicExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>

                <v-window-item value="env">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="initEnvExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>

                <v-window-item value="advanced">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="initAdvancedExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Service Calls -->
      <section id="services" class="example-section mb-16">
        <v-row>
          <v-col cols="12">
            <div class="section-header mb-8">
              <v-chip class="gradient-chip-outline" size="small" variant="outlined">
                <v-icon start>mdi-api</v-icon>
                Service Operations
              </v-chip>
              <h2 class="section-title mb-4">Calling Services</h2>
              <p class="section-description">
                Use dynamically generated services to interact with your Acumatica data
              </p>
            </div>

            <v-row>
              <v-col cols="12" md="6">
                <v-card class="example-card service-card h-100" elevation="0">
                  <v-card-title class="example-card-title">
                    <v-icon start class="gradient-icon">mdi-database-search</v-icon>
                    Reading Data
                  </v-card-title>
                  <div class="code-container">
                    <CodeSnippet 
                      :code="serviceReadExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="example-card service-card h-100" elevation="0">
                  <v-card-title class="example-card-title">
                    <v-icon start class="gradient-icon">mdi-database-plus</v-icon>
                    Creating Records
                  </v-card-title>
                  <div class="code-container">
                    <CodeSnippet 
                      :code="serviceCreateExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="example-card service-card h-100" elevation="0">
                  <v-card-title class="example-card-title">
                    <v-icon start class="gradient-icon">mdi-database-edit</v-icon>
                    Updating Records
                  </v-card-title>
                  <div class="code-container">
                    <CodeSnippet 
                      :code="serviceUpdateExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="example-card service-card h-100" elevation="0">
                  <v-card-title class="example-card-title">
                    <v-icon start class="gradient-icon">mdi-database-remove</v-icon>
                    Deleting Records
                  </v-card-title>
                  <div class="code-container">
                    <CodeSnippet 
                      :code="serviceDeleteExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>

      <!-- Building Models -->
      <section id="models" class="example-section mb-16">
        <v-row>
          <v-col cols="12">
            <div class="section-header mb-8">
              <v-chip class="gradient-chip-outline" size="small" variant="outlined">
                <v-icon start>mdi-cube-outline</v-icon>
                Data Models
              </v-chip>
              <h2 class="section-title mb-4">Building Models</h2>
              <p class="section-description">
                Work with strongly-typed, auto-generated models that match your Acumatica instance
              </p>
            </div>

            <v-card class="example-card" elevation="0">
              <v-tabs 
                v-model="modelTab" 
                bg-color="white" 
                class="example-tabs"
                color="deep-purple"
              >
                <v-tab value="simple">Simple Model</v-tab>
                <v-tab value="nested">Nested Data</v-tab>
                <v-tab value="custom">Custom Fields</v-tab>
              </v-tabs>

              <v-window v-model="modelTab">
                <v-window-item value="simple">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="modelSimpleExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>

                <v-window-item value="nested">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="modelNestedExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>

                <v-window-item value="custom">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="modelCustomExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Generic Inquiries -->
      <section id="inquiries" class="example-section mb-16">
        <v-row>
          <v-col cols="12">
            <div class="section-header mb-8">
              <v-chip class="gradient-chip-outline" size="small" variant="outlined">
                <v-icon start>mdi-chart-box</v-icon>
                Generic Inquiries
              </v-chip>
              <h2 class="section-title mb-4">Calling Generic Inquiries</h2>
              <p class="section-description">
                Access your custom Generic Inquiries with auto-generated methods
              </p>
            </div>

            <v-row>
              <v-col cols="12" lg="6">
                <v-card class="example-card inquiry-card" elevation="0">
                  <v-card-title class="example-card-title">
                    <v-icon start class="gradient-icon">mdi-magnify-scan</v-icon>
                    Basic Inquiry Call
                  </v-card-title>
                  <div class="code-container">
                    <CodeSnippet 
                      :code="giBasicExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" lg="6">
                <v-card class="example-card inquiry-card" elevation="0">
                  <v-card-title class="example-card-title">
                    <v-icon start class="gradient-icon">mdi-filter-variant</v-icon>
                    Inquiry with Filters
                  </v-card-title>
                  <div class="code-container">
                    <CodeSnippet 
                      :code="giFilteredExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>

      <!-- Filters and QueryOptions -->
      <section id="filters" class="example-section mb-16">
        <v-row>
          <v-col cols="12">
            <div class="section-header mb-8">
              <v-chip class="gradient-chip-outline" size="small" variant="outlined">
                <v-icon start>mdi-filter</v-icon>
                OData Queries
              </v-chip>
              <h2 class="section-title mb-4">Building Filters & QueryOptions</h2>
              <p class="section-description">
                Create powerful, type-safe OData queries with the F factory and QueryOptions
              </p>
            </div>

            <v-card class="example-card mb-6" elevation="0">
              <v-card-title class="example-card-title">
                <v-icon start class="gradient-icon">mdi-filter-outline</v-icon>
                Filter Examples
              </v-card-title>
              
              <v-tabs 
                v-model="filterTab" 
                bg-color="white" 
                class="example-tabs"
                color="deep-purple"
              >
                <v-tab value="basic">Basic Filters</v-tab>
                <v-tab value="complex">Complex Logic</v-tab>
                <v-tab value="functions">Functions</v-tab>
              </v-tabs>

              <v-window v-model="filterTab">
                <v-window-item value="basic">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="filterBasicExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>

                <v-window-item value="complex">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="filterComplexExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>

                <v-window-item value="functions">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="filterFunctionsExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>
              </v-window>
            </v-card>

            <v-card class="example-card" elevation="0">
              <v-card-title class="example-card-title">
                <v-icon start class="gradient-icon">mdi-cog-outline</v-icon>
                QueryOptions Examples
              </v-card-title>
              
              <v-tabs 
                v-model="queryTab" 
                bg-color="white" 
                class="example-tabs"
                color="deep-purple"
              >
                <v-tab value="basic">Basic Options</v-tab>
                <v-tab value="advanced">Advanced Query</v-tab>
                <v-tab value="custom">With Custom Fields</v-tab>
              </v-tabs>

              <v-window v-model="queryTab">
                <v-window-item value="basic">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="queryBasicExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>

                <v-window-item value="advanced">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="queryAdvancedExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>

                <v-window-item value="custom">
                  <div class="code-container">
                    <CodeSnippet 
                      :code="queryCustomExample" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Complete Examples -->
      <section id="complete" class="example-section">
        <v-row>
          <v-col cols="12">
            <div class="section-header mb-8">
              <v-chip class="gradient-chip-outline" size="small" variant="outlined">
                <v-icon start>mdi-package-variant</v-icon>
                Complete Examples
              </v-chip>
              <h2 class="section-title mb-4">Full Workflow Examples</h2>
              <p class="section-description">
                End-to-end examples showing complete integration patterns
              </p>
            </div>

            <v-expansion-panels variant="accordion" class="example-panels">
              <v-expansion-panel
                v-for="example in completeExamples"
                :key="example.title"
                class="example-panel"
                elevation="0"
              >
                <v-expansion-panel-title>
                  <div class="panel-title">
                    <v-icon class="gradient-icon mr-3">{{ example.icon }}</v-icon>
                    <div>
                      <div class="font-weight-bold">{{ example.title }}</div>
                      <div class="text-caption text-grey-darken-1">{{ example.description }}</div>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="code-container">
                    <CodeSnippet 
                      :code="example.code" 
                      language="python"
                      :show-line-numbers="true"
                    />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </section>
    </v-container>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';

// Tab states
const initTab = ref('basic');
const modelTab = ref('simple');
const filterTab = ref('basic');
const queryTab = ref('basic');

// Quick navigation items
const quickNavItems = ref([
  { id: 'initialization', title: 'Client Setup' },
  { id: 'services', title: 'Services' },
  { id: 'models', title: 'Models' },
  { id: 'inquiries', title: 'Generic Inquiries' },
  { id: 'filters', title: 'Filters & Queries' },
  { id: 'complete', title: 'Full Examples' }
]);

// Initialization examples
const initBasicExample = ref(`from easy_acumatica import AcumaticaClient

# Basic initialization
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    branch="MAIN"
)

# The client automatically discovers all available models and services
print(f"Connected to: {client.base_url}")
print(f"Available services: {[attr for attr in dir(client) if not attr.startswith('_')]}")
print(f"Available models: {dir(client.models)}")`);

const initEnvExample = ref(`import os
from easy_acumatica import AcumaticaClient

# Set environment variables
os.environ['ACUMATICA_URL'] = "https://your-instance.acumatica.com"
os.environ['ACUMATICA_USERNAME'] = "api_user"
os.environ['ACUMATICA_PASSWORD'] = "secure_password"
os.environ['ACUMATICA_TENANT'] = "Company"
os.environ['ACUMATICA_BRANCH'] = "MAIN"

# Initialize using environment variables
client = AcumaticaClient()

# Or mix environment variables with parameters
client = AcumaticaClient(
    branch="BRANCH01"  # Override specific values
)`);

const initAdvancedExample = ref(`from easy_acumatica import AcumaticaClient, AcumaticaConfig

# Using a config object
config = AcumaticaConfig(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    endpoint_name="Default",
    endpoint_version="23.200.001"
)

# Advanced initialization with all options
client = AcumaticaClient(
    config=config,
    persistent_login=True,      # Keep session alive
    retry_on_idle_logout=True,  # Auto-retry on 401
    rate_limit_calls_per_second=10.0,  # API throttling
    timeout=60,                 # Request timeout
    verify_ssl=True            # SSL verification
)`);

// Service examples
const serviceReadExample = ref(`# Get a single record by ID
customer = client.customers.get_by_id("ABCCOMP")
print(f"Customer: {customer.CustomerName}")
print(f"Balance: {customer.Balance}")

# Get multiple records
from easy_acumatica import QueryOptions

options = QueryOptions(top=10)
customers = client.customers.get_list(options)

for customer in customers:
    print(f"{customer.CustomerID}: {customer.CustomerName}")`);

const serviceCreateExample = ref(`# Create a new customer
new_customer = client.models.Customer(
    CustomerID="NEWCUST01",
    CustomerName="New Customer Inc.",
    CustomerClass="DEFAULT",
    Status="Active",
    MainContact={
        "Email": {"value": "contact@newcustomer.com"},
        "Phone1": {"value": "555-0100"}
    }
)

# Save to Acumatica
created = client.customers.put_entity(new_customer)
print(f"Created customer: {created.CustomerID}")`);

const serviceUpdateExample = ref(`# Update an existing record
# Method 1: Fetch, modify, save
customer = client.customers.get_by_id("CUST001")
customer.CreditLimit = 50000
customer.Terms = "30D"

updated = client.customers.put_entity(customer)

# Method 2: Update specific fields only
update = client.models.Customer(
    id=customer.id,  # Use the internal ID
    CreditLimit=75000
)
updated = client.customers.put_entity(update)`);

const serviceDeleteExample = ref(`# Delete a record by ID
try:
    client.customers.delete_by_id("OLDCUST01")
    print("Customer deleted successfully")
except AcumaticaNotFoundError:
    print("Customer not found")
except AcumaticaAPIError as e:
    print(f"Delete failed: {e.message}")`);

// Model examples
const modelSimpleExample = ref(`# Creating a simple model instance
bill = client.models.Bill(
    Type="Bill",
    Vendor="VENDOR01",
    Date="2024-01-15",
    Description="Office supplies",
    Amount=1250.00
)

# All fields are optional and type-hinted
invoice = client.models.Invoice(
    Customer="CUST001",
    Date="2024-01-20"
    # Other fields will use defaults
)`);

const modelNestedExample = ref(`# Models with nested data structures
sales_order = client.models.SalesOrder(
    CustomerID="ABCCOMP",
    Date="2024-01-15",
    Description="January Order",
    
    # Nested details
    Details=[
        {
            "InventoryID": {"value": "ITEM001"},
            "Quantity": {"value": 10},
            "UnitPrice": {"value": 25.00}
        },
        {
            "InventoryID": {"value": "ITEM002"},
            "Quantity": {"value": 5},
            "UnitPrice": {"value": 50.00}
        }
    ],
    
    # Nested contact info
    ShipContact={
        "Attention": {"value": "Shipping Dept"},
        "Phone1": {"value": "555-0123"}
    }
)`);

const modelCustomExample = ref(`# Working with custom fields
item = client.models.InventoryItem(
    InventoryID="CUSTOM001",
    Description="Custom Item",
    
    # Custom fields go in the 'custom' dictionary
    custom={
        "ItemSettings": {
            "UsrCustomField1": {"value": "Special Value"},
            "UsrCategory": {"value": "Premium"}
        },
        "Document": {
            "AttributeMYFIELD": {"value": "Attribute Value"}
        }
    }
)

# Reading custom fields from response
item = client.inventory_items.get_by_id("ITEM001")
if item.custom and "ItemSettings" in item.custom:
    custom_value = item.custom["ItemSettings"].get("UsrCustomField1", {}).get("value")`);

// Generic Inquiry examples
const giBasicExample = ref(`# Call a generic inquiry - methods are auto-generated
# from your instance's Generic Inquiries

# Simple inquiry call
results = client.inquiries.Account_Details()

# Process the results
for account in results['value']:
    print(f"Account: {account['AccountID']['value']}")
    print(f"Balance: {account['Balance']['value']}")

# Another inquiry
customer_list = client.inquiries.Customer_List()
for customer in customer_list['value']:
    print(customer['CustomerName']['value'])`);

const giFilteredExample = ref(`from easy_acumatica import QueryOptions, F

# Generic inquiries support full OData operations
options = QueryOptions(
    filter=F.Balance > 10000,
    orderby="Balance desc",
    top=20
)

# Apply filters to inquiry
results = client.inquiries.Account_Details(options=options)

# Complex filtering on inquiry
options = QueryOptions(
    filter=(
        (F.AccountType == "Asset") & 
        (F.IsActive == True) &
        (F.Balance != 0)
    ),
    select=["AccountID", "AccountName", "Balance"],
    orderby=["AccountType", "AccountID"]
)

filtered_accounts = client.inquiries.Account_Summary(options=options)`);

// Filter examples
const filterBasicExample = ref(`from easy_acumatica import F

# Basic equality
filter1 = F.CustomerID == "ABCCOMP"

# Comparison operators
filter2 = F.Balance > 1000
filter3 = F.DueDate <= "2024-12-31"
filter4 = F.Status != "Cancelled"

# Null checks
filter5 = F.DeletedDate == None
filter6 = F.Email != None

# Combining filters
combined = (F.Status == "Active") & (F.Balance > 0)`);

const filterComplexExample = ref(`from easy_acumatica import F

# Complex logical operations
filter1 = (
    (F.CustomerClass == "WHOLESALE") & 
    (F.CreditLimit >= 10000) & 
    (F.Status == "Active")
)

# OR operations
filter2 = (F.Priority == "High") | (F.Priority == "Critical")

# NOT operations
filter3 = ~(F.Status == "Deleted")

# Nested conditions
complex_filter = (
    ((F.Status == "Active") | (F.Status == "OnHold")) &
    (F.Balance > 1000) &
    (F.Terms.in_(["30D", "60D", "90D"])) &
    ~(F.CustomerClass == "INTERNAL")
)`);

const filterFunctionsExample = ref(`from easy_acumatica import F

# String functions
filter1 = F.CustomerName.startswith("ABC")
filter2 = F.Email.endswith("@company.com")
filter3 = F.Description.contains("urgent")
filter4 = F.CustomerName.tolower() == "acme corp"
filter5 = F.Code.length() > 10

# Date functions
from datetime import datetime

filter6 = F.OrderDate.year() == 2024
filter7 = F.CreatedDate.month() == 1
filter8 = F.DueDate.day() == 15

# Math functions
filter9 = F.Price.round() == 100
filter10 = F.Quantity.floor() > 5

# Navigation properties
filter11 = F.MainContact.Email != None
filter12 = F.Customer.CustomerClass == "PREMIUM"`);

// QueryOptions examples
const queryBasicExample = ref(`from easy_acumatica import QueryOptions, F

# Basic QueryOptions
options = QueryOptions(
    top=10,
    skip=0,
    orderby="CustomerName"
)

# With selection
options = QueryOptions(
    select=["CustomerID", "CustomerName", "Balance"],
    top=50
)

# With filter
options = QueryOptions(
    filter=F.Status == "Active",
    orderby="Balance desc"
)`);

const queryAdvancedExample = ref(`from easy_acumatica import QueryOptions, F

# Advanced query with all features
options = QueryOptions(
    # Complex filter
    filter=(
        (F.Status == "Active") & 
        (F.Balance > 1000) & 
        (F.CustomerClass.in_(["WHOLESALE", "RETAIL"]))
    ),
    
    # Select specific fields
    select=[
        "CustomerID", 
        "CustomerName", 
        "Balance", 
        "CreditLimit"
    ],
    
    # Include related entities
    expand=["MainContact", "DefaultLocation"],
    
    # Sort by multiple fields
    orderby=["CustomerClass", "Balance desc"],
    
    # Pagination
    top=20,
    skip=40
)

results = client.customers.get_list(options)`);

const queryCustomExample = ref(`from easy_acumatica import QueryOptions, F, CustomField

# QueryOptions with custom fields
custom_field = CustomField.field(
    "CustomerSettings", 
    "UsrVIPStatus"
)

options = QueryOptions(
    filter=(F.Status == "Active"),
    select=["CustomerID", "CustomerName"],
    
    # Include custom fields
    custom=[
        custom_field,
        CustomField.field("CustomerSettings", "UsrLoyaltyTier"),
        CustomField.attribute("Document", "CUSTOMERTYPE")
    ],
    
    # Custom fields may require expansion
    expand=["CustomerSettings"],
    
    top=10
)

# Use with any service
results = client.customers.get_list(options)

# Access custom field values
for customer in results:
    if customer.custom and "CustomerSettings" in customer.custom:
        vip_status = customer.custom["CustomerSettings"].get("UsrVIPStatus", {}).get("value")`);

// Complete workflow examples
const completeExamples = ref([
  {
    title: 'Order Processing Workflow',
    description: 'Complete workflow for creating and processing a sales order',
    icon: 'mdi-cart',
    color: 'primary',
    code: `from easy_acumatica import AcumaticaClient, QueryOptions, F
from datetime import datetime, timedelta

# Initialize client
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="password",
    tenant="Company"
)

# Step 1: Check customer credit
customer = client.customers.get_by_id("ABCCOMP")
if customer.Balance > customer.CreditLimit:
    print(f"Warning: Customer over credit limit")
    
# Step 2: Check inventory availability
items_to_order = [
    {"id": "ITEM001", "qty": 10},
    {"id": "ITEM002", "qty": 5}
]

for item in items_to_order:
    inventory = client.inventory_items.get_by_id(item["id"])
    # Check available quantity logic here
    
# Step 3: Create sales order
order = client.models.SalesOrder(
    CustomerID="ABCCOMP",
    Date=datetime.now().isoformat(),
    RequestedOn=(datetime.now() + timedelta(days=7)).isoformat(),
    Description="Web Order #12345",
    CustomerOrder="PO-2024-001",
    
    Details=[
        {
            "InventoryID": {"value": item["id"]},
            "Quantity": {"value": item["qty"]},
            "UOM": {"value": "EA"}
        }
        for item in items_to_order
    ],
    
    # Custom fields
    custom={
        "Document": {
            "UsrWebOrderID": {"value": "WEB-12345"},
            "UsrPriority": {"value": "High"}
        }
    }
)

# Step 4: Create the order
created_order = client.sales_orders.put_entity(order)
print(f"Created order: {created_order.OrderNbr}")

# Step 5: Query recent orders
recent_orders_options = QueryOptions(
    filter=(
        (F.CustomerID == "ABCCOMP") & 
        (F.Date >= (datetime.now() - timedelta(days=30)).isoformat())
    ),
    orderby="Date desc",
    top=10
)

recent_orders = client.sales_orders.get_list(recent_orders_options)
for order in recent_orders:
    print(f"Order {order.OrderNbr}: {order.OrderTotal}")`
  },
  {
    title: 'Batch Invoice Processing',
    description: 'Process multiple invoices with error handling and reporting',
    icon: 'mdi-file-document-multiple',
    color: 'success',
    code: `from easy_acumatica import AcumaticaClient, QueryOptions, F
from easy_acumatica.exceptions import AcumaticaAPIError, AcumaticaNotFoundError
import csv
from datetime import datetime

client = AcumaticaClient()

def process_invoice_batch(invoice_file):
    """Process a batch of invoices from a CSV file"""
    
    results = {
        'success': [],
        'failed': [],
        'skipped': []
    }
    
    with open(invoice_file, 'r') as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            try:
                # Validate customer exists
                try:
                    customer = client.customers.get_by_id(row['CustomerID'])
                except AcumaticaNotFoundError:
                    results['skipped'].append({
                        'row': row,
                        'reason': f"Customer {row['CustomerID']} not found"
                    })
                    continue
                
                # Create invoice
                invoice = client.models.Invoice(
                    CustomerID=row['CustomerID'],
                    Date=row['Date'],
                    DueDate=row['DueDate'],
                    Description=row['Description'],
                    
                    Details=[{
                        "InventoryID": {"value": row['ItemID']},
                        "Quantity": {"value": float(row['Quantity'])},
                        "UnitPrice": {"value": float(row['UnitPrice'])}
                    }]
                )
                
                # Add custom fields if present
                if 'PONumber' in row:
                    invoice.custom = {
                        "Document": {
                            "UsrPONumber": {"value": row['PONumber']}
                        }
                    }
                
                # Create the invoice
                created = client.invoices.put_entity(invoice)
                results['success'].append(created.ReferenceNbr)
                
            except AcumaticaAPIError as e:
                results['failed'].append({
                    'row': row,
                    'error': str(e)
                })
            except Exception as e:
                results['failed'].append({
                    'row': row,
                    'error': f"Unexpected error: {str(e)}"
                })
    
    # Generate report
    print(f"\\nBatch Processing Complete:")
    print(f"✓ Success: {len(results['success'])} invoices created")
    print(f"✗ Failed: {len(results['failed'])} invoices failed")
    print(f"⊘ Skipped: {len(results['skipped'])} invoices skipped")
    
    if results['failed']:
        print("\\nFailed Invoices:")
        for fail in results['failed']:
            print(f"  - Customer {fail['row']['CustomerID']}: {fail['error']}")
    
    return results

# Run the batch
results = process_invoice_batch('invoices.csv')`
  },
  {
    title: 'Financial Report Generator',
    description: 'Generate financial reports using Generic Inquiries and data aggregation',
    icon: 'mdi-chart-line',
    color: 'info',
    code: `from easy_acumatica import AcumaticaClient, QueryOptions, F
from datetime import datetime, timedelta
import pandas as pd

client = AcumaticaClient()

def generate_ar_aging_report(as_of_date=None):
    """Generate an AR Aging report using Generic Inquiries"""
    
    if not as_of_date:
        as_of_date = datetime.now()
    
    # Call AR Aging Generic Inquiry
    options = QueryOptions(
        filter=F.Balance > 0,
        orderby="CustomerID"
    )
    
    aging_data = client.inquiries.AR_Aging_By_Customer(options)
    
    # Process the data
    report_data = []
    for record in aging_data['value']:
        report_data.append({
            'Customer': record['CustomerID']['value'],
            'Current': record['Current']['value'] or 0,
            '1-30 Days': record['Period1']['value'] or 0,
            '31-60 Days': record['Period2']['value'] or 0,
            '61-90 Days': record['Period3']['value'] or 0,
            'Over 90': record['Period4']['value'] or 0,
            'Total': record['Balance']['value'] or 0
        })
    
    # Create DataFrame for analysis
    df = pd.DataFrame(report_data)
    
    # Summary statistics
    summary = {
        'Total AR': df['Total'].sum(),
        'Current': df['Current'].sum(),
        'Past Due': df['Total'].sum() - df['Current'].sum(),
        'Over 90 Days': df['Over 90'].sum(),
        'Customer Count': len(df),
        'Average Balance': df['Total'].mean()
    }
    
    # High-risk accounts (significant balance over 90 days)
    high_risk = df[df['Over 90'] > 5000].sort_values('Over 90', ascending=False)
    
    # Generate report
    print(f"\\nAR Aging Report - {as_of_date.strftime('%Y-%m-%d')}")
    print("=" * 60)
    print(f"Total AR: \${summary['Total AR']:,.2f}")
    print(f"Current: \${summary['Current']:,.2f}")
    print(f"Past Due: \${summary['Past Due']:,.2f}")
    print(f"\\nHigh Risk Accounts (>$5000 over 90 days):")
    
    for _, account in high_risk.iterrows():
        print(f"  {account['Customer']}: \${account['Over 90']:,.2f}")
    
    return df, summary

# Generate the report
df, summary = generate_ar_aging_report()

# Export to Excel (optional)
df.to_excel('ar_aging_report.xlsx', index=False)`
  },
  {
    title: 'Custom Integration Sync',
    description: 'Sync data between Acumatica and external system with conflict resolution',
    icon: 'mdi-sync',
    color: 'purple',
    code: `from easy_acumatica import AcumaticaClient, QueryOptions, F
from datetime import datetime
import hashlib
import json

client = AcumaticaClient()

class DataSyncManager:
    """Manages bi-directional sync between Acumatica and external system"""
    
    def __init__(self, client):
        self.client = client
        self.sync_log = []
        
    def calculate_checksum(self, data):
        """Calculate checksum for change detection"""
        json_str = json.dumps(data, sort_keys=True)
        return hashlib.md5(json_str.encode()).hexdigest()
    
    def sync_customers(self, external_customers):
        """Sync customers with conflict resolution"""
        
        # Get all Acumatica customers
        options = QueryOptions(
            select=["CustomerID", "CustomerName", "Email", "Phone", "LastModified"],
            expand=["MainContact"]
        )
        acumatica_customers = self.client.customers.get_list(options)
        
        # Create lookup dictionaries
        acumatica_dict = {c.CustomerID: c for c in acumatica_customers}
        external_dict = {c['id']: c for c in external_customers}
        
        # Find differences
        only_in_acumatica = set(acumatica_dict.keys()) - set(external_dict.keys())
        only_in_external = set(external_dict.keys()) - set(acumatica_dict.keys())
        in_both = set(acumatica_dict.keys()) & set(external_dict.keys())
        
        # Process new records from external system
        for customer_id in only_in_external:
            ext_customer = external_dict[customer_id]
            
            new_customer = self.client.models.Customer(
                CustomerID=ext_customer['id'],
                CustomerName=ext_customer['name'],
                CustomerClass="DEFAULT",
                MainContact={
                    "Email": {"value": ext_customer.get('email')},
                    "Phone1": {"value": ext_customer.get('phone')}
                }
            )
            
            try:
                created = self.client.customers.put_entity(new_customer)
                self.sync_log.append({
                    'action': 'CREATE',
                    'entity': 'Customer',
                    'id': customer_id,
                    'status': 'SUCCESS'
                })
            except Exception as e:
                self.sync_log.append({
                    'action': 'CREATE',
                    'entity': 'Customer',
                    'id': customer_id,
                    'status': 'FAILED',
                    'error': str(e)
                })
        
        # Process updates for existing records
        for customer_id in in_both:
            acumatica_cust = acumatica_dict[customer_id]
            external_cust = external_dict[customer_id]
            
            # Detect changes using checksums
            acumatica_data = {
                'name': acumatica_cust.CustomerName,
                'email': acumatica_cust.MainContact.Email if acumatica_cust.MainContact else None,
                'phone': acumatica_cust.MainContact.Phone1 if acumatica_cust.MainContact else None
            }
            
            external_data = {
                'name': external_cust['name'],
                'email': external_cust.get('email'),
                'phone': external_cust.get('phone')
            }
            
            if self.calculate_checksum(acumatica_data) != self.calculate_checksum(external_data):
                # Conflict resolution: Use last modified timestamp
                # (In real scenario, implement your business logic)
                
                update = self.client.models.Customer(
                    id=acumatica_cust.id,
                    CustomerName=external_cust['name'],
                    MainContact={
                        "Email": {"value": external_cust.get('email')},
                        "Phone1": {"value": external_cust.get('phone')}
                    }
                )
                
                try:
                    updated = self.client.customers.put_entity(update)
                    self.sync_log.append({
                        'action': 'UPDATE',
                        'entity': 'Customer',
                        'id': customer_id,
                        'status': 'SUCCESS'
                    })
                except Exception as e:
                    self.sync_log.append({
                        'action': 'UPDATE',
                        'entity': 'Customer',
                        'id': customer_id,
                        'status': 'FAILED',
                        'error': str(e)
                    })
        
        return self.generate_sync_report()
    
    def generate_sync_report(self):
        """Generate sync summary report"""
        summary = {
            'total': len(self.sync_log),
            'success': len([l for l in self.sync_log if l['status'] == 'SUCCESS']),
            'failed': len([l for l in self.sync_log if l['status'] == 'FAILED']),
            'created': len([l for l in self.sync_log if l['action'] == 'CREATE']),
            'updated': len([l for l in self.sync_log if l['action'] == 'UPDATE'])
        }
        
        print("\\nSync Report")
        print("=" * 40)
        print(f"Total Operations: {summary['total']}")
        print(f"Successful: {summary['success']}")
        print(f"Failed: {summary['failed']}")
        print(f"Created: {summary['created']}")
        print(f"Updated: {summary['updated']}")
        
        if summary['failed'] > 0:
            print("\\nFailed Operations:")
            for log in self.sync_log:
                if log['status'] == 'FAILED':
                    print(f"  - {log['action']} {log['entity']} {log['id']}: {log.get('error', 'Unknown error')}")
        
        return summary

# Example usage
sync_manager = DataSyncManager(client)

# Mock external data
external_customers = [
    {'id': 'CUST001', 'name': 'Updated Customer Name', 'email': 'new@email.com', 'phone': '555-0001'},
    {'id': 'NEWCUST', 'name': 'Brand New Customer', 'email': 'new@customer.com', 'phone': '555-9999'}
]

summary = sync_manager.sync_customers(external_customers)`
  }
]);

// SEO Meta
useSeoMeta({
  title: 'Examples - Easy-Acumatica Python',
  description: 'Comprehensive code examples for Easy-Acumatica Python wrapper. Learn how to initialize clients, call services, build models, use Generic Inquiries, and create complex OData queries.',
  ogTitle: 'Easy-Acumatica Python Examples',
  ogDescription: 'Real-world code examples and patterns for integrating with Acumatica ERP using Python.'
});
</script>

<style scoped>
.examples-page {
  background: #ffffff;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.hero-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: white;
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  left: -50px;
  animation: float 15s ease-in-out infinite reverse;
}

.shape-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 10%;
  animation: float 25s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-badge {
  display: inline-block;
}

.gradient-chip {
  background: white;
  color: #667eea;
  font-weight: 600;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  color: white;
}

.gradient-text {
  background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
}

/* Quick Navigation */
.quick-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.gradient-hover {
  background: white;
  color: #667eea;
  transition: all 0.3s ease;
}

.gradient-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Content Sections */
.examples-content {
  max-width: 1400px;
  margin: 0 auto;
}

.example-section {
  scroll-margin-top: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.gradient-chip-outline {
  background: white;
  border: 2px solid transparent;
  background-image: linear-gradient(white, white), 
                    linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  color: #667eea;
  font-weight: 600;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-description {
  font-size: 1.125rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
}

/* Example Cards */
.example-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.example-card:hover {
  border-color: #667eea;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.service-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
}

.inquiry-card {
  background: linear-gradient(135deg, #ffffff 0%, #faf8ff 100%);
}

.example-card-title {
  background: linear-gradient(135deg, #f8f9ff 0%, #faf8ff 100%);
  border-bottom: 1px solid #e8e8f0;
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: #333;
}

.gradient-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Code Container */
.code-container {
  background: #1e1e1e;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
}

/* Tabs */
.example-tabs {
  border-bottom: 1px solid #e0e0e0;
}

.example-tabs .v-tab {
  text-transform: none;
  font-weight: 500;
  color: #666;
}

.example-tabs .v-tab--selected {
  color: #667eea;
}

/* Expansion Panels */
.example-panels {
  background: transparent;
}

.example-panel {
  background: white;
  border: 1px solid #e0e0e0;
  margin-bottom: 1rem;
  border-radius: 12px !important;
  overflow: hidden;
  transition: all 0.3s ease;
}

.example-panel:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
}

.panel-title {
  display: flex;
  align-items: center;
  width: 100%;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .shape-1, .shape-2, .shape-3 {
    display: none;
  }
}
</style>