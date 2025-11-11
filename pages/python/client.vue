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
              <span>AcumaticaClient</span>
            </h1>
            <p class="hero-subtitle">
              Main client class for Acumatica REST API integration
            </p>
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
                  The <code>AcumaticaClient</code> handles authentication, session management, and provides
                  dynamically-generated services and models based on your Acumatica instance's schema.
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
                  The client can be initialized with explicit credentials, environment variables, or automatic .env file loading.
                </p>

                <CodeSnippet :code="initExample" />

                <ParameterTable :parameters="initializationParams" />
              </section>

              <!-- .env File Loading Section -->
              <section id="env-loading" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-file-cog</v-icon>
                  .env File Loading
                </h2>
                <p class="text-body-1 mb-4">
                  As of v0.5.10, the client automatically searches for and loads credentials from .env files.
                  This simplifies configuration management across different environments.
                </p>

                <CodeSnippet :code="envExample" />

                <v-alert class="mt-4" type="info" variant="tonal">
                  The client searches for .env files starting from your script's directory and walking up
                  the directory tree. You can also specify an explicit path with the <code>env_file</code> parameter.
                </v-alert>
              </section>

              <!-- Configuration Section -->
              <section id="configuration" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-cog</v-icon>
                  Configuration Options
                </h2>
                <p class="text-body-1 mb-4">
                  Optional parameters control caching, rate limiting, session behavior, and performance tuning.
                </p>

                <CodeSnippet :code="configExample" />
              </section>

              <!-- Differential Caching Section -->
              <section id="caching" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-cached</v-icon>
                  Differential Caching
                </h2>
                <p class="text-body-1 mb-4">
                  Version 0.5.10 introduces differential caching, which dramatically reduces initialization time
                  by caching generated models and services. The cache intelligently updates only changed components.
                </p>

                <CodeSnippet :code="cachingExample" />

                <v-alert class="mt-4" type="success" variant="tonal">
                  With caching enabled, subsequent client initializations can be 10-20x faster. The cache
                  automatically invalidates when your schema changes or after the TTL expires.
                </v-alert>
              </section>

              <!-- Schema Discovery Section -->
              <section id="discovery" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-magnify-scan</v-icon>
                  Schema Discovery & Introspection
                </h2>
                <p class="text-body-1 mb-4">
                  On initialization, the client fetches the OpenAPI schema and generates models and services
                  based on your instance configuration. The client provides powerful introspection methods
                  to explore available services, models, and their schemas.
                </p>

                <CodeSnippet :code="discoveryExample" />

                <v-alert class="mt-4" type="info" variant="tonal">
                  Schema discovery happens once at initialization. Enable caching to skip this on subsequent runs.
                </v-alert>
              </section>

              <!-- Dynamic Models Section -->
              <section id="models" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-cube-outline</v-icon>
                  Dynamic Models
                </h2>
                <p class="text-body-1 mb-4">
                  Models are Python dataclasses generated from the OpenAPI schema. They include standard
                  fields and any custom fields defined in your instance.
                </p>

                <CodeSnippet :code="modelsExample" />

                <v-alert class="mt-4" type="success" variant="tonal">
                  Generated models support IDE autocompletion and type checking.
                </v-alert>
              </section>

              <!-- Dynamic Services Section -->
              <section id="services" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-api</v-icon>
                  Dynamic Services
                </h2>
                <p class="text-body-1 mb-4">
                  Service instances are created for each endpoint defined in your schema. They provide
                  methods for CRUD operations, actions, and file attachments.
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
                  The client supports OData filtering and query options through the <code>F</code> filter factory
                  and <code>QueryOptions</code> class.
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
                  Filter expressions use Python operators and are automatically converted to OData query strings.
                </v-alert>
              </section>

              <!-- Session Management Section -->
              <section id="session" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-shield-key</v-icon>
                  Session Management
                </h2>
                <p class="text-body-1 mb-4">
                  Sessions can be persistent (default) or non-persistent. The client includes automatic retry logic
                  for idle session timeouts.
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

              <!-- Task Scheduler Section -->
              <section id="scheduler" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-clock-outline</v-icon>
                  Task Scheduler
                </h2>
                <p class="text-body-1 mb-4">
                  Version 0.5.10 adds a built-in task scheduler for running periodic jobs. Access it via
                  <code>client.scheduler</code> property. See the <NuxtLink to="/python/task-scheduler">Task Scheduler</NuxtLink>
                  documentation for detailed information.
                </p>

                <CodeSnippet :code="schedulerExample" />

                <v-alert class="mt-4" type="info" variant="tonal">
                  The scheduler runs in a background thread and continues until explicitly stopped or the
                  client is closed. Tasks can be scheduled with intervals or cron-like expressions.
                  Learn more in the <NuxtLink to="/python/task-scheduler">Task Scheduler guide</NuxtLink>.
                </v-alert>
              </section>

              <!-- Exception Handling Section -->
              <section id="exceptions" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-alert-circle</v-icon>
                  Exception Handling
                </h2>
                <p class="text-body-1 mb-4">
                  The library defines specific exception types for authentication, network, timeout, and API errors.
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

// SEO Configuration
useSeoMeta({
  title: 'AcumaticaClient Documentation | Easy-Acumatica Python',
  description: 'Complete guide to AcumaticaClient class for Acumatica ERP integration. Learn about initialization, configuration, session management, and advanced features.',
  ogTitle: 'AcumaticaClient API Reference - Easy-Acumatica Python',
  ogDescription: 'Comprehensive documentation for the AcumaticaClient class including configuration, caching, OData support, and session management.',
  ogType: 'article',
  ogUrl: 'https://www.easyacumatica.com/python/client',
  robots: 'index, follow',
  keywords: 'AcumaticaClient, Python Acumatica client, session management, API configuration, OData filters, schema discovery'
});

useSchemaOrg([
  {
    '@type': 'TechArticle',
    'headline': 'AcumaticaClient API Reference',
    'description': 'Complete documentation for the AcumaticaClient class in Easy-Acumatica Python library',
    'url': 'https://www.easyacumatica.com/python/client',
    'author': {
      '@type': 'Organization',
      'name': 'Easy-Acumatica Team'
    },
    'about': {
      '@type': 'SoftwareSourceCode',
      'name': 'AcumaticaClient',
      'programmingLanguage': 'Python'
    }
  }
]);

// State
const sessionTab = ref('persistent');
const odataTab = ref('filters');

// Navigation items
const navItems = ref([
  { id: 'introduction', title: 'Introduction', icon: 'mdi-book-open-variant' },
  { id: 'initialization', title: 'Initialization', icon: 'mdi-power-plug' },
  { id: 'env-loading', title: '.env File Loading', icon: 'mdi-file-cog' },
  { id: 'configuration', title: 'Configuration', icon: 'mdi-cog' },
  { id: 'caching', title: 'Differential Caching', icon: 'mdi-cached' },
  { id: 'discovery', title: 'Schema Discovery & Introspection', icon: 'mdi-magnify-scan' },
  { id: 'models', title: 'Dynamic Models', icon: 'mdi-cube-outline' },
  { id: 'services', title: 'Dynamic Services', icon: 'mdi-api' },
  { id: 'odata', title: 'OData Features', icon: 'mdi-filter' },
  { id: 'session', title: 'Session Management', icon: 'mdi-shield-key' },
  { id: 'scheduler', title: 'Task Scheduler', icon: 'mdi-clock-outline' },
  { id: 'exceptions', title: 'Exception Handling', icon: 'mdi-alert-circle' },
  { id: 'advanced', title: 'Advanced Features', icon: 'mdi-rocket' },
]);

// Code examples
const introExample = ref(`from easy_acumatica import AcumaticaClient

# Initialize client (loads from .env automatically)
client = AcumaticaClient()

# Access dynamically generated services
customer = client.customers.get_by_id("ABCCOMP")
print(f"Customer: {customer.CustomerName}")

# Use dynamically generated models
new_customer = client.models.Customer(
    CustomerID="NEWCUST",
    CustomerName="New Customer"
)
created = client.customers.put_entity(new_customer)`);

const initExample = ref(`from easy_acumatica import AcumaticaClient

# Method 1: Automatic .env loading (recommended)
# Client searches for .env file in current directory and parent directories
client = AcumaticaClient()

# Method 2: Specify .env file location
client = AcumaticaClient(env_file="config/.env")

# Method 3: Explicit credentials
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company"
)

# Method 4: Environment variables (without .env file)
# Set: ACUMATICA_URL, ACUMATICA_USERNAME, ACUMATICA_PASSWORD, ACUMATICA_TENANT
import os
os.environ['ACUMATICA_URL'] = 'https://your-instance.acumatica.com'
os.environ['ACUMATICA_USERNAME'] = 'api_user'
# ...
client = AcumaticaClient()

# Method 5: Using a config object
from easy_acumatica import AcumaticaConfig
config = AcumaticaConfig(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company"
)
client = AcumaticaClient(config=config)`);

const envExample = ref(`# .env file in your project root
ACUMATICA_URL=https://your-instance.acumatica.com
ACUMATICA_USERNAME=your-username
ACUMATICA_PASSWORD=your-password
ACUMATICA_TENANT=your-tenant
ACUMATICA_BRANCH=MAIN
ACUMATICA_CACHE_METHODS=true
ACUMATICA_CACHE_TTL_HOURS=24

# Your Python script
from easy_acumatica import AcumaticaClient

# Automatically loads from .env - no credentials needed!
client = AcumaticaClient()

# Or specify a custom .env location
client = AcumaticaClient(env_file="config/.env")

# Disable auto-loading if needed
client = AcumaticaClient(
    base_url="...",
    username="...",
    password="...",
    tenant="...",
    auto_load_env=False  # Don't search for .env files
)`);

const configExample = ref(`client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",

    # Caching (new in v0.5.10)
    cache_methods=True,         # Enable differential caching
    cache_ttl_hours=24,        # Cache lifetime in hours
    cache_dir=Path("~/.cache"), # Cache directory location
    force_rebuild=False,       # Force rebuild ignoring cache

    # Session behavior
    persistent_login=True,      # Maintain session (default)
    retry_on_idle_logout=True,  # Auto-retry on session timeout

    # Performance
    rate_limit_calls_per_second=10.0,  # Rate limiting
    timeout=60,                         # Request timeout (seconds)

    # SSL verification
    verify_ssl=True,

    # API endpoint
    endpoint_name="Default",
    endpoint_version=None,  # Auto-detect latest

    # Localization
    branch="MAIN",
    locale="en-US"
)`);

const cachingExample = ref(`from easy_acumatica import AcumaticaClient
from pathlib import Path

# Enable caching for faster subsequent initializations
client = AcumaticaClient(
    cache_methods=True,           # Enable differential caching
    cache_ttl_hours=24,          # Cache valid for 24 hours
    cache_dir=Path("~/.cache/acumatica")  # Custom cache location
)

# First run: Full schema discovery and model/service generation (~5-10 seconds)
# Subsequent runs: Differential cache loading (~0.5-1 second)

# Check cache statistics
stats = client.get_cache_stats()
print(f"Cache hits: {stats['hits']}")
print(f"Cache misses: {stats['misses']}")
print(f"Cache age: {stats['age_hours']:.1f} hours")

# Force rebuild (ignores cache)
client = AcumaticaClient(force_rebuild=True)

# Clear cache manually
client.clear_cache()

# The cache intelligently tracks changes:
# - Only rebuilds models/services that changed
# - Removes models/services that were deleted
# - Preserves unchanged components from cache
# - Automatically invalidates on schema changes`);

const schedulerExample = ref(`from easy_acumatica import AcumaticaClient
import time

client = AcumaticaClient()

# Define a task function
def sync_customers():
    customers = client.customers.get_list()
    # Process customers...
    print(f"Synced {len(customers)} customers")

# Schedule task to run every 5 minutes
task_id = client.scheduler.schedule_task(
    func=sync_customers,
    interval_seconds=300,  # 5 minutes
    task_name="customer_sync"
)

# Schedule with a cron-like expression
task_id = client.scheduler.schedule_task(
    func=sync_customers,
    cron_expression="0 */6 * * *",  # Every 6 hours
    task_name="hourly_sync"
)

# List scheduled tasks
tasks = client.scheduler.list_tasks()
for task in tasks:
    print(f"{task['name']}: {task['status']}")

# Stop a specific task
client.scheduler.stop_task(task_id)

# Stop all tasks
client.scheduler.stop_all()

# Scheduler automatically stops when client is closed
client.close()`);

const discoveryExample = ref(`# The client discovers everything on initialization
client = AcumaticaClient()

# Use built-in methods to see what was discovered
print("\\nAvailable Services:")
services = client.list_services()
print(f"Found {len(services)} services")
for service in services[:10]:  # Show first 10
    print(f"  - {service}")

print("\\nAvailable Models:")
models = client.list_models()
print(f"Found {len(models)} models")
for model in models[:10]:  # Show first 10
    print(f"  - {model}")

# Get detailed information about a specific service
service_info = client.get_service_info('Customer')
print(f"\\nCustomer service: {service_info['entity_name']}")
print(f"Available methods: {service_info['methods']}")
print(f"Available actions: {service_info.get('actions', [])}")

# Get detailed information about a specific model
model_info = client.get_model_info('Customer')
print(f"\\nCustomer model fields: {model_info['field_count']} fields")
print(f"Field names: {list(model_info['fields'].keys())[:10]}")

# Check for custom fields
customer_fields = model_info['fields']
custom_fields = [name for name in customer_fields if name.startswith('Usr')]
print(f"Custom fields on Customer: {custom_fields}")

# Get complete schema information
schema_info = client.get_schema_info()
print(f"\\nSchema version: {schema_info.get('version')}")
print(f"Total endpoints: {schema_info.get('endpoint_count')}")`);

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
from easy_acumatica.odata import QueryOptions, F

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

const filterExample = ref(`from easy_acumatica.odata import F

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

const queryOptionsExample = ref(`from easy_acumatica.odata import QueryOptions, F

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

const advancedOdataExample = ref(`from easy_acumatica.odata import F, QueryOptions, CustomField

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
    AcumaticaError,
    AcumaticaAuthError,
    AcumaticaNotFoundError,
    AcumaticaValidationError,
    AcumaticaBusinessRuleError,
    AcumaticaConcurrencyError,
    AcumaticaServerError,
    AcumaticaConnectionError,
    AcumaticaTimeoutError,
    AcumaticaRateLimitError
)

try:
    customer = client.customers.get_by_id("UNKNOWN")

except AcumaticaNotFoundError as e:
    # 404 - Resource not found
    print(f"Not found: {e}")
    print(f"Suggestions: {e.suggestions}")

except AcumaticaAuthError as e:
    # 401/403 - Authentication or authorization failed
    print(f"Auth error: {e.message}")
    print(f"Status: {e.status_code}")

except AcumaticaValidationError as e:
    # 400/422 - Data validation failed
    print(f"Validation error: {e}")
    if e.field_errors:
        for field, errors in e.field_errors.items():
            print(f"  {field}: {errors}")

except AcumaticaBusinessRuleError as e:
    # 422 - Business rule violation
    print(f"Business rule error: {e}")

except AcumaticaConcurrencyError as e:
    # 412 - Concurrent modification
    print(f"Concurrency conflict: {e}")

except AcumaticaTimeoutError as e:
    # Request timeout
    print(f"Timeout: {e.timeout_seconds}s")

except AcumaticaRateLimitError as e:
    # 429 - Rate limit exceeded
    print(f"Rate limited. Retry after: {e.retry_after}s")

except AcumaticaServerError as e:
    # 5xx - Server error
    print(f"Server error: {e.status_code}")

except AcumaticaConnectionError as e:
    # Network/connection error
    print(f"Connection error: {e}")

except AcumaticaError as e:
    # Catch-all for any Acumatica error
    print(f"Error: {e}")
    print(f"Detailed: {e.get_detailed_message()}")
    print(f"Context: {e.context}")`);

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
  { name: 'base_url', type: 'str', required: false, description: 'Root URL of your Acumatica instance' },
  { name: 'username', type: 'str', required: false, description: 'API username' },
  { name: 'password', type: 'str', required: false, description: 'API password' },
  { name: 'tenant', type: 'str', required: false, description: 'Tenant/Company name' },
  { name: 'branch', type: 'str', required: false, description: 'Branch code' },
  { name: 'locale', type: 'str', required: false, description: 'Locale (e.g., "en-US")' },
  { name: 'env_file', type: 'str | Path', required: false, description: 'Path to .env file (v0.5.10+)' },
  { name: 'auto_load_env', type: 'bool', required: false, description: 'Auto-search for .env files (default: True, v0.5.10+)' },
  { name: 'cache_methods', type: 'bool', required: false, description: 'Enable differential caching (v0.5.10+)' },
  { name: 'cache_ttl_hours', type: 'int', required: false, description: 'Cache TTL in hours (default: 24, v0.5.10+)' },
  { name: 'cache_dir', type: 'Path', required: false, description: 'Cache directory (default: ~/.easy_acumatica_cache, v0.5.10+)' },
  { name: 'force_rebuild', type: 'bool', required: false, description: 'Force rebuild ignoring cache (v0.5.10+)' },
  { name: 'verify_ssl', type: 'bool', required: false, description: 'Verify SSL certificates (default: True)' },
  { name: 'persistent_login', type: 'bool', required: false, description: 'Maintain session (default: True)' },
  { name: 'retry_on_idle_logout', type: 'bool', required: false, description: 'Auto-retry on timeout (default: True)' },
  { name: 'endpoint_name', type: 'str', required: false, description: 'API endpoint name (default: "Default")' },
  { name: 'endpoint_version', type: 'str', required: false, description: 'Specific API version' },
  { name: 'config', type: 'AcumaticaConfig', required: false, description: 'Config object (overrides other params)' },
  { name: 'rate_limit_calls_per_second', type: 'float', required: false, description: 'API rate limit (default: 10.0)' },
  { name: 'timeout', type: 'int', required: false, description: 'Request timeout in seconds (default: 60)' },
]);

// Service patterns
const servicePatterns = ref([
  { pattern: 'get_by_id(entity_id, select=None, expand=None)', description: 'Retrieve a record by ID' },
  { pattern: 'get_list(filter=None, options=None)', description: 'List records with OData filtering' },
  { pattern: 'put_entity(entity)', description: 'Create or update a record' },
  { pattern: 'delete_by_id(entity_id)', description: 'Delete a record by ID' },
  { pattern: 'put_file(entity_id, filename, data, comment=None)', description: 'Attach a file to a record' },
  { pattern: 'get_files(entity_id)', description: 'List files attached to a record' },
  { pattern: 'invoke_action_<action_name>(entity, parameters=None)', description: 'Execute an action (dynamically generated)' },
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