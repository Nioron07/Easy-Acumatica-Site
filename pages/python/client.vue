<template>
  <div class="page-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-gradient"></div>
      <div class="animated-bg">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
      </div>
      <v-container class="hero-content">
        <v-row justify="center" align="center">
          <v-col cols="12" class="text-center">
            <h1 class="hero-title">
              <span class="gradient-text">AcumaticaClient</span>
            </h1>
            <p class="hero-subtitle">
              The intelligent client that discovers your entire Acumatica instance
            </p>
            <div class="hero-features">
              <div class="feature-pill">
                <v-icon>mdi-lightning-bolt</v-icon>
                Dynamic Discovery
              </div>
              <div class="feature-pill">
                <v-icon>mdi-shield-check</v-icon>
                Type Safety
              </div>
              <div class="feature-pill">
                <v-icon>mdi-auto-fix</v-icon>
                Zero Configuration
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Main Content -->
    <v-container fluid class="main-content">
      <v-container>
        <v-row>
          <v-col cols="12" md="9">
            <v-container>
              <!-- Introduction Section -->
              <section id="introduction" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-book-open-variant</v-icon>
                  Introduction
                </h2>
                <p class="text-body-1 mb-4">
                  The <code>AcumaticaClient</code> is your gateway to seamless Acumatica integration. 
                  It automatically discovers your endpoints, generates models, and creates type-safe services - all at runtime.
                </p>

                <CodeSnippet :code="introExample" />
              </section>

              <!-- Initialization Section -->
              <section id="initialization" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-power-plug</v-icon>
                  Initialization
                </h2>
                <p class="text-body-1 mb-4">
                  Initialize your client with credentials. The client will automatically discover and configure everything else.
                </p>

                <CodeSnippet :code="initExample" />

                <ParameterTable :parameters="initializationParams" />
              </section>

              <!-- Configuration Section -->
              <section id="configuration" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-cog</v-icon>
                  Configuration Options
                </h2>
                <p class="text-body-1 mb-4">
                  Configure advanced behaviors with optional parameters.
                </p>

                <CodeSnippet :code="configExample" />
              </section>

              <!-- Dynamic Discovery Section -->
              <section id="discovery" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-magnify-scan</v-icon>
                  Dynamic Discovery
                </h2>
                <p class="text-body-1 mb-4">
                  The client automatically discovers your Acumatica instance structure on initialization.
                </p>

                <CodeSnippet :code="discoveryExample" />

                <v-alert class="mt-4" type="info" variant="tonal">
                  Discovery happens once during initialization. The client caches the structure for optimal performance.
                </v-alert>
              </section>

              <!-- Dynamic Models Section -->
              <section id="models" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-cube-outline</v-icon>
                  Dynamic Models
                </h2>
                <p class="text-body-1 mb-4">
                  Models are generated dynamically based on your actual Acumatica entities. 
                  They include all standard fields and your custom fields automatically.
                </p>

                <CodeSnippet :code="modelsExample" />

                <v-alert class="mt-4" type="success" variant="tonal">
                  Models provide full IDE support with autocompletion and type hints!
                </v-alert>
              </section>

              <!-- Dynamic Services Section -->
              <section id="services" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-api</v-icon>
                  Dynamic Services
                </h2>
                <p class="text-body-1 mb-4">
                  Services are dynamically attached to the client based on your available endpoints.
                  Each service provides methods that correspond exactly to your API operations.
                </p>

                <CodeSnippet :code="servicesExample" />

                <h3 class="subsection-title mt-8">Service Method Patterns</h3>
                <MethodPatternTable :patterns="servicePatterns" />
              </section>

              <!-- OData Features Section -->
              <section id="odata" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-filter</v-icon>
                  OData Query Features
                </h2>
                <p class="text-body-1 mb-4">
                  Leverage the power of OData with our intuitive query builder and filter factory.
                </p>

                <v-tabs v-model="odataTab" class="mb-6 modern-tabs">
                  <v-tab value="filters">Filter Builder</v-tab>
                  <v-tab value="queryoptions">Query Options</v-tab>
                  <v-tab value="advanced">Advanced Queries</v-tab>
                </v-tabs>

                <v-tabs-window v-model="odataTab">
                  <v-tabs-window-item value="filters">
                    <CodeSnippet :code="filterExample" />
                  </v-tabs-window-item>

                  <v-tabs-window-item value="queryoptions">
                    <CodeSnippet :code="queryOptionsExample" />
                  </v-tabs-window-item>

                  <v-tabs-window-item value="advanced">
                    <CodeSnippet :code="advancedOdataExample" />
                  </v-tabs-window-item>
                </v-tabs-window>

                <v-alert class="mt-4" type="info" variant="tonal">
                  The <code>F</code> factory creates filter expressions that work with both OData v3 and v4.
                  Function names are automatically lowercased for compatibility.
                </v-alert>
              </section>

              <!-- Session Management Section -->
              <section id="session" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-shield-key</v-icon>
                  Session Management
                </h2>
                <p class="text-body-1 mb-4">
                  The client handles all session complexity for you, with intelligent retry logic and automatic cleanup.
                </p>

                <v-tabs v-model="sessionTab" class="mb-6 modern-tabs">
                  <v-tab value="persistent">Persistent Sessions</v-tab>
                  <v-tab value="non-persistent">Non-Persistent Sessions</v-tab>
                  <v-tab value="retry">Retry Logic</v-tab>
                </v-tabs>

                <v-tabs-window v-model="sessionTab">
                  <v-tabs-window-item value="persistent">
                    <CodeSnippet :code="persistentSessionExample" />
                  </v-tabs-window-item>

                  <v-tabs-window-item value="non-persistent">
                    <CodeSnippet :code="nonPersistentSessionExample" />
                  </v-tabs-window-item>

                  <v-tabs-window-item value="retry">
                    <CodeSnippet :code="retryExample" />
                  </v-tabs-window-item>
                </v-tabs-window>
              </section>

              <!-- Exception Handling Section -->
              <section id="exceptions" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-alert-circle</v-icon>
                  Exception Handling
                </h2>
                <p class="text-body-1 mb-4">
                  Easy-Acumatica provides specific exception types for different error scenarios.
                </p>

                <CodeSnippet :code="exceptionExample" />
              </section>

              <!-- Advanced Features Section -->
              <section id="advanced" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-rocket</v-icon>
                  Advanced Features
                </h2>

                <v-expansion-panels variant="accordion" class="modern-expansion mb-6">
                  <v-expansion-panel>
                    <v-expansion-panel-title class="expansion-title">
                      <v-icon start>mdi-file-upload</v-icon>
                      File Attachments
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <CodeSnippet :code="fileExample" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title class="expansion-title">
                      <v-icon start>mdi-speedometer</v-icon>
                      Rate Limiting
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <CodeSnippet :code="rateLimitExample" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title class="expansion-title">
                      <v-icon start>mdi-cog-clockwise</v-icon>
                      Executing Actions
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <CodeSnippet :code="actionsExample" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
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
import CodeSnippet from '../../components/CodeSnippet.vue';
import OnPageNav from '~/components/OnPageNav.vue';
import ParameterTable from '../../components/ParameterTable.vue';
import MethodPatternTable from '../../components/MethodPatternTable.vue';

// State
const sessionTab = ref('persistent');
const odataTab = ref('filters');

// Navigation items
const navItems = ref([
  { id: 'introduction', title: 'Introduction', icon: 'mdi-book-open-variant' },
  { id: 'initialization', title: 'Initialization', icon: 'mdi-power-plug' },
  { id: 'configuration', title: 'Configuration', icon: 'mdi-cog' },
  { id: 'discovery', title: 'Dynamic Discovery', icon: 'mdi-magnify-scan' },
  { id: 'models', title: 'Dynamic Models', icon: 'mdi-cube-outline' },
  { id: 'services', title: 'Dynamic Services', icon: 'mdi-api' },
  { id: 'odata', title: 'OData Features', icon: 'mdi-filter' },
  { id: 'session', title: 'Session Management', icon: 'mdi-shield-key' },
  { id: 'exceptions', title: 'Exception Handling', icon: 'mdi-alert-circle' },
  { id: 'advanced', title: 'Advanced Features', icon: 'mdi-rocket' },
]);

// Code examples
const introExample = ref(`# The v0.4.8 way - everything is dynamic!
from easy_acumatica import AcumaticaClient

# Initialize - this discovers your entire instance
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password",
    tenant="YourTenant",
    branch="YourBranch"
)

# Models are generated and ready to use
print(f"Available models: {dir(client.models)}")

# Services are attached dynamically
print(f"Available services: {[attr for attr in dir(client) if attr.endswith('s') and not attr.startswith('_')]}")

# Use them immediately with full type safety!
customer = client.customers.get_by_id("ABCCOMP")
print(f"Customer: {customer.CustomerName}")`);

const initExample = ref(`from easy_acumatica import AcumaticaClient

# Method 1: Direct parameters
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    branch="MAIN"
)

# Method 2: Environment variables
# Set: ACUMATICA_URL, ACUMATICA_USERNAME, etc.
client = AcumaticaClient()

# Method 3: Mix of both (env vars as defaults)
client = AcumaticaClient(
    tenant="Company",  # Override specific values
    branch="BRANCH01"
)

# Method 4: Using a config object
from easy_acumatica import AcumaticaConfig

config = AcumaticaConfig(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    endpoint_name="Default",
    endpoint_version="23.200.001"
)
client = AcumaticaClient(config=config)`);

const configExample = ref(`# Configure advanced behaviors
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    
    # Session behavior
    persistent_login=True,      # Keep session alive (default)
    retry_on_idle_logout=True,  # Auto-retry on 401 (default)
    
    # Performance tuning
    rate_limit_calls_per_second=10.0,  # API throttling
    timeout=60,                        # Request timeout in seconds
    
    # SSL and security
    verify_ssl=True,           # Verify SSL certificates
    
    # API targeting
    endpoint_name="Default",   # Which endpoint to use
    endpoint_version=None,     # Auto-detect latest version
    
    # Localization
    locale="en-US"            # API locale setting
)`);

const discoveryExample = ref(`# The client discovers everything on initialization
client = AcumaticaClient(...)

# See what was discovered
print("\\nAvailable Services:")
for attr in dir(client):
    if attr.endswith('s') and not attr.startswith('_'):
        service = getattr(client, attr)
        print(f"  - client.{attr} -> {type(service).__name__}")

print("\\nAvailable Models:")
for model_name in sorted(dir(client.models)):
    if not model_name.startswith('_'):
        model = getattr(client.models, model_name)
        print(f"  - {model_name}: {len(model.__dataclass_fields__)} fields")

# Check if custom entities exist
if hasattr(client, 'custom_entity'):
    print("\\nCustom entity service available!")

# Check for custom fields
customer_fields = client.models.Customer.__dataclass_fields__
custom_fields = [f for f in customer_fields if f.startswith('Usr')]
print(f"\\nCustom fields on Customer: {custom_fields}")`);

const modelsExample = ref(`# All models follow Python dataclass patterns

# Create a new customer
customer = client.models.Customer(
    CustomerID="PYTHN001",
    CustomerName="Python Customer",
    CustomerClass="DEFAULT",
    # Your custom fields are here too!
    UsrCustomField="Custom Value" if hasattr(client.models.Customer, 'UsrCustomField') else None
)

# Models support all standard operations
print(customer.CustomerID)  # PYTHN001
print(customer.__dict__)    # See all fields

# Nested models work seamlessly
order = client.models.SalesOrder(
    OrderType="SO",
    CustomerID="PYTHN001",
    Details=[
        client.models.SalesOrderDetail(
            InventoryID="WIDGET",
            Quantity=5
        )
    ]
)

# Type hints work perfectly in your IDE
# Your editor knows all fields and their types!`);

const servicesExample = ref(`# Services provide intuitive CRUD operations

# GET - Retrieve by keys
customer = client.customers.get_by_id("PYTHN001")

# GET - With field selection
opts = QueryOptions(filter=F.CustomerID == "PYTHN001", select=["CustomerID","CustomerName","Balance"])
customer = client.customers.get_list(options=opts)

# LIST - Get multiple records
all_customers = client.customers.get_list()

# LIST - With OData parameters
from easy_acumatica import F, QueryOptions

# CREATE - Add new record
new_customer = client.models.Customer(
    CustomerID="PYTHN002",
    CustomerName="Another Python Customer"
)
created = client.customers.put_entity(new_customer)

# UPDATE - Modify existing
customer.CustomerName = "Updated Name"
updated = client.customers.put_entity(customer)

# DELETE - Remove record
client.customers.delete_by_id("PYTHN002")`);

const filterExample = ref(`from easy_acumatica import F

# Simple equality filter
active_filter = F.Status == "Active"

# Comparison operators
high_value = F.Balance > 10000
recent = F.CreatedDate >= "2024-01-01"

# Logical operators
combined = (F.Status == "Active") & (F.Balance > 5000)
either_or = (F.Type == "Business") | (F.Type == "Corporate")

# String functions (lowercase for OData compatibility)
name_starts = F.CustomerName.tolower().startswith("acme")
contains_text = F.Description.contains("important")
name_ends = F.CustomerName.endswith("LLC")

# Date functions
this_year = F.CreatedDate.year() == 2024
this_month = F.OrderDate.month() == 3

# Navigation properties
has_email = F.MainContact.Email != None
contact_city = F.MainContact.Address.City == "New York"

# Complex nested conditions
complex_filter = (
    ((F.Status == "Active") | (F.Status == "OnHold")) &
    (F.Balance > 1000) &
    F.CustomerName.tolower().startswith("tech") &
    (F.Terms == "30D" | F.Terms == "60D")
)

# Use with list operations
results = client.customers.get_list(filter=complex_filter)`);

const queryOptionsExample = ref(`from easy_acumatica import QueryOptions, F

# Basic QueryOptions
options = QueryOptions(
    filter=F.Status == "Active",
    select=["CustomerID", "CustomerName", "Balance"],
    expand=["MainContact", "Orders"],
    top=50,
    skip=0,
    orderby="CustomerName"
)

# Apply to any list operation
customers = client.customers.get_list(options=options)

# Complex query with multiple parameters
complex_options = QueryOptions(
    filter=(
        (F.Type == "Business") & 
        (F.Balance > 5000) & 
        F.CustomerName.contains("Corp")
    ),
    select=["CustomerID", "CustomerName", "Balance", "MainContact"],
    expand=["MainContact", "Orders", "Orders/Details"],
    orderby=["Balance desc", "CustomerName"],  # Multiple sort fields
    top=20
)

# Use with generic inquiries
inquiry_options = QueryOptions(
    filter=F.AccountID == "1000",
    top=10
)
inquiry_results = client.inquiries.Account_Details(options=inquiry_options)

# Pagination helper
def get_all_pages(service, page_size=100):
    skip = 0
    all_records = []
    
    while True:
        options = QueryOptions(top=page_size, skip=skip)
        records = service.list(options=options)
        
        if not records:
            break
            
        all_records.extend(records)
        skip += page_size
        
    return all_records`);

const advancedOdataExample = ref(`from easy_acumatica import F, QueryOptions, CustomField

# Advanced filtering with arithmetic
price_margin = (F.SalesPrice - F.Cost) / F.Cost > 0.3
high_margin_products = client.products.get_list(filter=price_margin)

# Multiple navigation levels
deep_filter = F.Orders.Details.Product.Category == "Electronics"

# Using IN operator (OData v4)
status_list = F.Status.in_(["Active", "OnHold", "Pending"])

# Complex date filtering
from datetime import datetime, timedelta

# Last 30 days
thirty_days_ago = (datetime.now() - timedelta(days=30)).isoformat()
recent_orders = client.sales_orders.get_list(
    filter=F.OrderDate > thirty_days_ago
)

# Custom fields with QueryOptions
custom_field = CustomField.field("Document", "UsrCustomStatus")
options = QueryOptions(
    filter=F.Status == "Active",
    custom=[custom_field, "UsrAnotherField"],
    expand=["Details"]  # Automatically handles expand requirements
)

# Combining everything in a real-world query
comprehensive_query = QueryOptions(
    filter=(
        (F.Type == "SO") &
        (F.Status != "Cancelled") &
        (F.OrderTotal > 1000) &
        F.CustomerID.Customer.Status == "Active"
    ),
    select=[
        "OrderNbr", "OrderDate", "CustomerID", 
        "OrderTotal", "Status"
    ],
    expand=["Customer", "Details", "Details/InventoryItem"],
    orderby=["OrderDate desc", "OrderTotal desc"],
    top=100,
    custom=[
        CustomField.field("Document", "UsrPriority"),
        CustomField.field("Details", "UsrNotes", "Details")
    ]
)

orders = client.sales_orders.get_list(options=comprehensive_query)`);

const persistentSessionExample = ref(`# Default behavior - one login, multiple operations

client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company"
    # persistent_login=True is the default
)

# Session established once during __init__
# All operations use the same session
customers = client.customers.get_list()
orders = client.sales_orders.get_list()
invoices = client.invoices.get_list()

# Session automatically cleaned up on exit`);

const nonPersistentSessionExample = ref(`# For scripts or short-lived operations

client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    persistent_login=False
)

# Each operation logs in and out automatically
customer = client.customers.get_by_id("CUST001")  # Login -> Get -> Logout
order = client.sales_orders.get_by_id("SO001")    # Login -> Get -> Logout

# No cleanup needed - each operation is self-contained`);

const retryExample = ref(`# Automatic retry on idle timeout (401 errors)

client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    retry_on_idle_logout=True  # Default
)

# Long running process...
for customer_id in large_customer_list:
    # If session times out, client automatically:
    # 1. Catches the 401 error
    # 2. Logs in again
    # 3. Retries the operation
    # 4. Returns the result seamlessly
    customer = client.customers.get_by_id(customer_id)
    process_customer(customer)
    time.sleep(60)  # Even with delays, it just works`);

const exceptionExample = ref(`from easy_acumatica import (
    AcumaticaException,
    AcumaticaAuthError,
    AcumaticaAPIError,
    AcumaticaNetworkError,
    AcumaticaTimeoutError,
    AcumaticaNotFoundError
)

try:
    # This might fail in various ways
    customer = client.customers.get_by_id("UNKNOWN")
    
except AcumaticaNotFoundError as e:
    # Record doesn't exist
    print(f"Customer not found: {e}")
    
except AcumaticaAuthError as e:
    # Authentication failed
    print(f"Auth error: {e}")
    # Maybe refresh credentials
    
except AcumaticaTimeoutError as e:
    # Request timed out
    print(f"Timeout after {e.timeout}s")
    # Maybe retry with longer timeout
    
except AcumaticaAPIError as e:
    # API returned an error
    print(f"API error {e.status_code}: {e.message}")
    print(f"Details: {e.details}")
    
except AcumaticaNetworkError as e:
    # Network-level error
    print(f"Network error: {e}")
    
except AcumaticaException as e:
    # Catch-all for any Acumatica-related error
    print(f"Acumatica error: {e}")`);

const fileExample = ref(`# Upload files to any entity

# Get a sales order
order = client.sales_orders.get_by_id("SO001")

# Attach a file
with open("invoice.pdf", "rb") as f:
    client.sales_orders.put_file(
        entity_id="SO001",
        filename="invoice.pdf",
        data=f.read(),
        comment="Note: please contact customer before moving to shipping"
    )

# List attached files
files = client.sales_orders.get_files("SO001")
for file in files:
    print(f"{file['filename']} - {file['id']}")
`);

const rateLimitExample = ref(`from easy_acumatica import AcumaticaClient

# Configure rate limiting at initialization
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    rate_limit_calls_per_second=5.0  # Max 5 calls per second
)

# The client automatically throttles requests
# This loop will take at least 10 seconds (50 calls at 5/sec)
for i in range(50):
    customer = client.customers.get_by_id(f"CUST{i:03d}")
    # No need to add delays - handled automatically

# Burst handling
# Even if you make many calls at once, they're queued and rate-limited
results = []
for customer_id in customer_ids[:100]:
    # These are fired rapidly but executed at 5/second
    results.append(client.customers.get_by_id(customer_id))

# For parallel operations, rate limit is shared across threads
from concurrent.futures import ThreadPoolExecutor

def fetch_customer(cid):
    return client.customers.get_by_id(cid)

with ThreadPoolExecutor(max_workers=10) as executor:
    # All threads share the same rate limit
    futures = [executor.submit(fetch_customer, cid) for cid in customer_ids]
    results = [f.result() for f in futures]`);

const actionsExample = ref(`# Execute built-in and custom actions

# Release a sales order
client.sales_orders.invoke_action_release_sales_order(
  "entity": {
      "OrderType": "SO",
      "OrderNbr": "SO001"
  }
)

# Run a custom action
result = client.custom_endpoint.invoke_action_process_batch(
    entity={
        "BatchID": "BATCH001",
        "ProcessDate": "2024-01-15"
    }
)

# Actions return results
print(f"Processed {result.get('RecordsProcessed', 0)} records")

# Actions with parameters
client.invoices.invoke_action_email_invoice(
    "entity": {"Type": "INV", "ReferenceNbr": "INV001"},
    "parameters": {
        "EmailTo": "customer@example.com",
        "EmailCC": "accounting@company.com"
    }
)`);

// Initialize parameters
const initializationParams = ref([
  { name: 'base_url', type: 'str', required: false, description: 'Root URL of your Acumatica instance (or use env var)' },
  { name: 'username', type: 'str', required: false, description: 'API username (or use env var)' },
  { name: 'password', type: 'str', required: false, description: 'API password (or use env var)' },
  { name: 'tenant', type: 'str', required: false, description: 'Tenant/Company name (or use env var)' },
  { name: 'branch', type: 'str', required: false, description: 'Branch code (optional)' },
  { name: 'locale', type: 'str', required: false, description: 'Locale like "en-US" (optional)' },
  { name: 'verify_ssl', type: 'bool', required: false, description: 'Verify SSL certificates (default: True)' },
  { name: 'persistent_login', type: 'bool', required: false, description: 'Keep session alive (default: True)' },
  { name: 'retry_on_idle_logout', type: 'bool', required: false, description: 'Auto-retry on timeout (default: True)' },
  { name: 'endpoint_name', type: 'str', required: false, description: 'API endpoint name (default: "Default")' },
  { name: 'endpoint_version', type: 'str', required: false, description: 'Specific API version (optional)' },
  { name: 'config', type: 'AcumaticaConfig', required: false, description: 'Config object (overrides other params)' },
  { name: 'rate_limit_calls_per_second', type: 'float', required: false, description: 'API rate limit (default: 10.0)' },
  { name: 'timeout', type: 'int', required: false, description: 'Request timeout in seconds (default: 60)' },
]);

// Service patterns
const servicePatterns = ref([
  { pattern: 'get(keys, select=None, expand=None)', description: 'Retrieve a single record by its keys' },
  { pattern: 'list(top=None, skip=None, filter=None, select=None, orderby=None, expand=None)', description: 'List records with optional OData parameters' },
  { pattern: 'create(entity)', description: 'Create a new record' },
  { pattern: 'update(entity)', description: 'Update an existing record' },
  { pattern: 'delete(keys)', description: 'Delete a record by its keys' },
  { pattern: 'get_by_id(id)', description: 'Get a record by its internal ID' },
  { pattern: 'invoke_action(name, payload)', description: 'Execute an action' },
  { pattern: 'attach_file(keys, filename, content)', description: 'Attach a file to a record' },
  { pattern: 'get_files(keys)', description: 'List files attached to a record' },
  { pattern: 'get_file(keys, file_id)', description: 'Download a specific file' },
  { pattern: 'delete_file(keys, file_id)', description: 'Delete a file attached to an entity' },
]);
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  background: #0a0e27;
  overflow: hidden;
  padding: 4rem 0 3rem;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.85;
}

.animated-bg {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 20s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: -100px;
  animation-delay: 5s;
}

.shape-3 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(0) rotate(180deg);
  }
  75% {
    transform: translateY(20px) rotate(270deg);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #82b1ff 0%, #b388ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin-bottom: 2rem;
}

.hero-features {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-pill {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.feature-pill:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Content Sections */
.content-section {
  margin-bottom: 4rem;
  position: relative;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  color: #5e35b1;
}

.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

/* Feature List */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.6;
}

/* Modern Tabs */
.modern-tabs {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 4px;
}

/* Modern Expansion Panels */
.modern-expansion {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}

.expansion-title {
  font-weight: 600;
  font-size: 1.1rem;
}

/* Sticky Container */
.sticky-container {
  position: sticky;
  top: 80px;
}

/* Code styling */
code {
  background: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  color: #5e35b1;
}

/* Main content */
.main-content {
  background: #fafafa;
  min-height: 100vh;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>