<template>
  <div>
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-gradient"></div>
        <v-container class="hero-content">
          <v-row justify="center" align="center">
            <v-col cols="12" md="10" lg="8">
              <div class="version-badge mb-4">
                <v-chip color="white" size="large" class="font-weight-bold">
                  <v-icon start>mdi-rocket-launch</v-icon>
                  Version 0.4.0
                </v-chip>
              </div>

              <h1 class="hero-title">
                AcumaticaClient <span class="gradient-text">v0.4.0</span>
              </h1>

              <p class="hero-subtitle">
                The intelligent core that dynamically adapts to your Acumatica instance
              </p>

              <div class="hero-features">
                <div class="feature-pill">
                  <v-icon start size="small">mdi-dna</v-icon>
                  Dynamic Model Generation
                </div>
                <div class="feature-pill">
                  <v-icon start size="small">mdi-api</v-icon>
                  Auto-Service Discovery
                </div>
                <div class="feature-pill">
                  <v-icon start size="small">mdi-shield-check</v-icon>
                  Type-Safe Runtime
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Connection Banner -->
      <section class="connection-banner" v-if="!isConnected">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <v-card class="connection-card" elevation="8">
                <div class="connection-gradient"></div>
                <v-card-item>
                  <v-row align="center">
                    <v-col cols="12" md="8">
                      <h3 class="text-h5 font-weight-bold mb-2">
                        <v-icon start color="primary">mdi-power-plug</v-icon>
                        Connect to Your Instance
                      </h3>
                      <p class="text-body-1 mb-0">
                        Run live examples directly on your Acumatica instance. Your credentials are stored locally and
                        never sent to our servers.
                      </p>
                      <p class="text-caption text-medium-emphasis mt-2">
                        <v-icon size="x-small">mdi-information</v-icon>
                        Note: Due to browser security, connections are routed through a CORS proxy for demonstration
                        purposes.
                      </p>
                    </v-col>
                    <v-col cols="12" md="4" class="text-md-end">
                      <v-btn color="primary" size="large" rounded="pill" @click="connectionDialog = true"
                        prepend-icon="mdi-connection">
                        Connect Now
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Pyodide Loading Status -->
      <v-container v-if="pyodideLoading" class="mt-4">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-alert type="info" variant="tonal" border="start">
              <v-alert-title>Loading Python Environment</v-alert-title>
              <p class="mb-2">Initializing Pyodide and installing easy-acumatica package...</p>
              <v-progress-linear indeterminate color="primary" height="4" />
            </v-alert>
          </v-col>
        </v-row>
      </v-container>

      <!-- Pyodide Error Status -->
      <v-container v-if="!pyodideLoading && !pyodideReady" class="mt-4">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-alert type="error" variant="tonal" border="start">
              <v-alert-title>Python Environment Error</v-alert-title>
              <p>Failed to load the Python environment. Please refresh the page to try again.</p>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>

      <!-- Main Content -->
      <v-container fluid>
        <v-row>
          <!-- Content Column -->
          <v-col cols="12" md="9">
            <v-container>
              <!-- Introduction Section -->
              <section id="introduction" class="mb-12">
                <h2 class="section-title mb-4">Introduction</h2>
                <p class="text-body-1 mb-4">
                  The <code class="inline-code">AcumaticaClient</code> in v0.4.0 represents a paradigm shift in ERP
                  integration.
                  Unlike traditional static APIs, it dynamically discovers your instance's capabilities and generates a
                  perfectly-fitted
                  client at runtime.
                </p>

                <v-alert type="info" variant="tonal" border="start" class="mb-6">
                  <v-alert-title>What's Revolutionary in v0.4.0</v-alert-title>
                  <ul class="mt-2">
                    <li>Zero static code - everything is generated at runtime</li>
                    <li>Automatic discovery of custom fields and endpoints</li>
                    <li>Perfect type hints for your exact configuration</li>
                    <li>Seamless adaptation to instance changes</li>
                  </ul>
                </v-alert>

                <!-- Live Example -->
                <CodePlayground title="Your First Connection" :initial-code="introExample" :runnable="true"
                  @run="executeCode" />
              </section>

              <!-- Initialization Section -->
              <section id="initialization" class="mb-12">
                <h2 class="section-title mb-4">Initialization</h2>
                <p class="text-body-1 mb-4">
                  When you create an <code class="inline-code">AcumaticaClient</code>, it immediately connects to your
                  instance,
                  discovers all available endpoints, and builds a complete type-safe interface tailored to your
                  configuration.
                </p>

                <h3 class="text-h5 font-weight-bold mb-3">Parameters</h3>
                <ParameterTable :parameters="initializationParams" />

                <CodePlayground title="Advanced Initialization" :initial-code="advancedInitExample" :runnable="true"
                  @run="executeCode" class="mt-6" />
              </section>

              <!-- Dynamic Discovery Section -->
              <section id="discovery" class="mb-12">
                <h2 class="section-title mb-4">Dynamic Discovery</h2>
                <p class="text-body-1 mb-4">
                  The magic happens during initialization. The client interrogates your instance and builds everything
                  it needs.
                </p>

                <v-row class="mb-6">
                  <v-col cols="12" md="4">
                    <FeatureCard icon="mdi-magnify-scan" title="Endpoint Discovery"
                      description="Automatically finds all available API endpoints and their versions" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <FeatureCard icon="mdi-cube-scan" title="Model Generation"
                      description="Creates type-safe dataclasses for every entity in your instance" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <FeatureCard icon="mdi-cogs" title="Service Creation"
                      description="Builds service methods that match your exact API surface" />
                  </v-col>
                </v-row>

                <CodePlayground title="Explore Your Instance" :initial-code="discoveryExample" :runnable="true"
                  @run="executeCode" />
              </section>

              <!-- Dynamic Models Section -->
              <section id="models" class="mb-12">
                <h2 class="section-title mb-4">Dynamic Models</h2>
                <p class="text-body-1 mb-4">
                  All models are generated at runtime and attached to <code class="inline-code">client.models</code>.
                  They include your custom fields and provide perfect IDE support.
                </p>

                <CodePlayground title="Working with Dynamic Models" :initial-code="modelsExample" :runnable="true"
                  @run="executeCode" />

                <v-alert type="success" variant="tonal" border="start" class="mt-6">
                  <v-alert-title>Pro Tip</v-alert-title>
                  Your IDE will provide autocomplete for all dynamically generated models and their fields!
                </v-alert>
              </section>

              <!-- Dynamic Services Section -->
              <section id="services" class="mb-12">
                <h2 class="section-title mb-4">Dynamic Services</h2>
                <p class="text-body-1 mb-4">
                  Services are dynamically attached to the client based on your available endpoints.
                  Each service provides methods that correspond exactly to your API operations.
                </p>

                <CodePlayground title="Using Dynamic Services" :initial-code="servicesExample" :runnable="true"
                  @run="executeCode" />

                <h3 class="text-h5 font-weight-bold mt-8 mb-4">Service Method Patterns</h3>
                <MethodPatternTable :patterns="servicePatterns" />
              </section>

              <!-- Session Management Section -->
              <section id="session" class="mb-12">
                <h2 class="section-title mb-4">Session Management</h2>
                <p class="text-body-1 mb-4">
                  The client handles all session complexity for you, with intelligent retry logic and automatic cleanup.
                </p>

                <v-tabs v-model="sessionTab" class="mb-6">
                  <v-tab value="persistent">Persistent Sessions</v-tab>
                  <v-tab value="non-persistent">Non-Persistent Sessions</v-tab>
                  <v-tab value="retry">Retry Logic</v-tab>
                </v-tabs>

                <v-tabs-window v-model="sessionTab">
                  <v-tabs-window-item value="persistent">
                    <CodePlayground title="Persistent Session (Default)" :initial-code="persistentSessionExample"
                      :runnable="true" @run="executeCode" />
                  </v-tabs-window-item>

                  <v-tabs-window-item value="non-persistent">
                    <CodePlayground title="Non-Persistent Session" :initial-code="nonPersistentSessionExample"
                      :runnable="true" @run="executeCode" />
                  </v-tabs-window-item>

                  <v-tabs-window-item value="retry">
                    <CodePlayground title="Automatic Retry on Session Timeout" :initial-code="retryExample"
                      :runnable="true" @run="executeCode" />
                  </v-tabs-window-item>
                </v-tabs-window>
              </section>

              <!-- Advanced Features Section -->
              <section id="advanced" class="mb-12">
                <h2 class="section-title mb-4">Advanced Features</h2>

                <v-expansion-panels variant="accordion" class="mb-6">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <v-icon start>mdi-file-upload</v-icon>
                      File Attachments
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <CodePlayground title="Working with Files" :initial-code="fileExample" :runnable="true"
                        @run="executeCode" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <v-icon start>mdi-filter</v-icon>
                      Complex Queries with OData
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <CodePlayground title="Advanced Filtering" :initial-code="odataExample" :runnable="true"
                        @run="executeCode" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <v-icon start>mdi-cog-play</v-icon>
                      Executing Actions
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <CodePlayground title="Business Logic Actions" :initial-code="actionsExample" :runnable="true"
                        @run="executeCode" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <!-- Best Practices Section -->
              <section id="practices" class="mb-12">
                <h2 class="section-title mb-4">Best Practices</h2>

                <v-row>
                  <v-col cols="12" md="6">
                    <BestPracticeCard icon="mdi-check-circle" title="Do" color="success" :items="bestPracticesDo" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <BestPracticeCard icon="mdi-close-circle" title="Don't" color="error" :items="bestPracticesDont" />
                  </v-col>
                </v-row>
              </section>
            </v-container>
          </v-col>

          <!-- Sticky Navigation -->
          <v-col cols="12" md="3" class="d-none d-md-block">
            <OnPageNav :items="navItems" :connection-status="isConnected" @connect="connectionDialog = true" />
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Connection Dialog -->
    <ConnectionDialog v-model="connectionDialog" @connected="handleConnection" />

    <!-- Code Output Dialog -->
    <CodeOutputDialog v-model="outputDialog" :output="codeOutput" :error="codeError" :loading="codeLoading" />

    <PageFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodePlayground from '../components/CodePlayground.vue';
import ConnectionDialog from '../components/ConnectionDialog.vue';
import OnPageNav from '~/components/OnPageNav.vue';
import ParameterTable from '../components/ParameterTable.vue';
import FeatureCard from '../components/FeatureCard.vue';
import MethodPatternTable from '../components/MethodPatternTable.vue';
import BestPracticeCard from '../components/BestPracticeCard.vue';
import CodeOutputDialog from '../components/CodeOutputDialog.vue';

// State
const connectionDialog = ref(false);
const outputDialog = ref(false);
const isConnected = ref(false);
const credentials = ref(null);
const sessionTab = ref('persistent');
const codeOutput = ref('');
const codeError = ref('');
const codeLoading = ref(false);
const pyodide = ref(null);
const pyodideLoading = ref(true);
const pyodideReady = ref(false);
const worker = ref(null);

// Provide connection status to child components
provide('isConnected', isConnected);

// Navigation items
const navItems = ref([
  { id: 'introduction', title: 'Introduction', icon: 'mdi-book-open-variant' },
  { id: 'initialization', title: 'Initialization', icon: 'mdi-power-plug' },
  { id: 'discovery', title: 'Dynamic Discovery', icon: 'mdi-magnify-scan' },
  { id: 'models', title: 'Dynamic Models', icon: 'mdi-cube-outline' },
  { id: 'services', title: 'Dynamic Services', icon: 'mdi-api' },
  { id: 'session', title: 'Session Management', icon: 'mdi-shield-key' },
  { id: 'advanced', title: 'Advanced Features', icon: 'mdi-rocket' },
  { id: 'practices', title: 'Best Practices', icon: 'mdi-check-decagram' },
]);

// Code examples
const introExample = ref(`# The v0.4.0 way - everything is dynamic!
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
customers = client.customers.get_list()
print(f"Found {len(customers)} customers")`);

const advancedInitExample = ref(`# Advanced initialization with all options
from easy_acumatica import AcumaticaClient

client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    branch="MAIN",
    locale="en-US",
    verify_ssl=True,  # Important for production
    persistent_login=True,  # Efficient for multiple operations
    retry_on_idle_logout=True,  # Auto-reconnect on timeout
    endpoint_name="Default",  # Can use custom endpoints
    endpoint_version="24.200.001"  # Pin to specific version
)

# The client is now fully initialized with:
# - All models generated and attached to client.models
# - All services created and attached as client.<entity>s
# - Session established and ready for operations

print(f"Connected to: {client.base_url}")
print(f"Using endpoint: {client.endpoints['Default']['version']}")`);

const discoveryExample = ref(`# Explore what was discovered during initialization

# 1. Check available endpoints
print("Available endpoints:")
for name, info in client.endpoints.items():
    print(f"  - {name}: version {info['version']}")

# 2. Explore generated models
print(f"\\nGenerated {len(dir(client.models))} models:")
# Show first 10 models
for model_name in sorted(dir(client.models))[:10]:
    if not model_name.startswith('_'):
        model_class = getattr(client.models, model_name)
        print(f"  - {model_name}: {len(model_class.__annotations__)} fields")

# 3. Explore available services
print(f"\\nAvailable services:")
for attr in sorted(dir(client)):
    if attr.endswith('s') and not attr.startswith('_'):
        service = getattr(client, attr)
        print(f"  - client.{attr}: {type(service).__name__}")

# 4. Inspect a specific model's fields
if hasattr(client.models, 'Customer'):
    print(f"\\nCustomer model fields:")
    for field_name, field_type in client.models.Customer.__annotations__.items():
        print(f"  - {field_name}: {field_type}")`);

const modelsExample = ref(`# Working with dynamically generated models

# 1. Create a new customer using the generated model
new_customer = client.models.Customer(
    CustomerID="DYNAMIC001",
    CustomerName="Dynamically Created Customer",
    CustomerClass="DEFAULT",
    # Your custom fields are here too!
    # UsrCustomField="Value"  # If you have custom fields
)

# 2. The model knows how to convert itself to Acumatica format
payload = new_customer.to_acumatica_payload()
print(f"Generated payload: {payload}")

# 3. Use it with the service
created = client.customers.put_entity(new_customer)
print(f"Created customer: {created['CustomerID']['value']}")

# 4. Models support all your entity's fields
invoice = client.models.Invoice(
    Type="Invoice",
    Customer="DYNAMIC001",
    Date="2025-01-15T00:00:00",
    Description="Created with dynamic model"
)

# Add detail lines (also dynamic!)
detail = client.models.InvoiceDetail(
    InventoryID="ITEM001",
    Amount=5,
    UnitPrice=99.99
)

# Models handle nested structures automatically
invoice.Details = [detail]`);

const servicesExample = ref(`# Dynamic services adapt to your exact API

# 1. Standard CRUD operations are generated automatically
# GET operations
all_items = client.stock_items.get_list()
specific_item = client.stock_items.get_by_id("*Item ID here*")

# PUT operations (create/update)
new_item = client.models.StockItem(
    InventoryID="NEWITEM001",
    Description="Dynamically created item"
)
created_item = client.stock_items.put_entity(new_item)

# DELETE operations
# client.stock_items.delete_by_id("OLDITEM001")

# 2. OData query support is built-in
from easy_acumatica import QueryOptions, F

options = QueryOptions(
    filter=F.DefaultWarehouseID == 'MAIN',
    select=['InventoryID', 'Description', 'BasePrice'],
    top=10
)
active_items = client.stock_items.get_list(options=options)

# 3. Actions are dynamically discovered too
# If your entity has actions, they're available as methods
# client.sales_orders.invoke_action(action_invocation)

# 4. File operations (if supported by the entity)
# client.stock_items.put_file(
#     entity_id="ITEM001",
#     filename="product_image.jpg",
#     data=image_bytes,
#     comment="Product photo"
# )`);

const persistentSessionExample = ref(`# Persistent sessions (default) - most efficient

# The client logs in once during initialization
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password",
    tenant="YourTenant",
    persistent_login=True  # This is the default
)

# All subsequent operations reuse the same session
for i in range(100):
    # No login/logout overhead between calls
    customer = client.customers.get_by_id(f"CUST{i:03d}")
    print(f"Processing {customer['CustomerName']['value']}")

# Session is automatically cleaned up on exit
# Or you can manually logout
client.logout()

# Benefits:
# - Single login for entire script lifetime
# - Much faster for multiple operations
# - Automatic cleanup via atexit hooks
# - Perfect for batch processing`);

const nonPersistentSessionExample = ref(`# Non-persistent sessions - for serverless/stateless

# Each operation handles its own session
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username", 
    password="your_password",
    tenant="YourTenant",
    persistent_login=False  # Key difference
)

# Each call does: login -> operation -> logout
customer = client.customers.get_by_id("CUST001")
# Session is already closed

# Another call creates a new session
invoice = client.invoices.get_list()
# Session is closed again

# Benefits:
# - No session state to manage
# - Safe for serverless functions
# - Works in distributed systems
# - Each request is independent

# Trade-off: Slower due to login/logout overhead`);

const retryExample = ref(`# Automatic retry on session timeout

import time

client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password", 
    tenant="YourTenant",
    retry_on_idle_logout=True  # Enable auto-retry (default)
)

# Simulate a long-running process
customers = client.customers.get_list()
print(f"Processing {len(customers)} customers...")

# Simulate session timeout (e.g., lunch break)
print("Simulating 2-hour delay...")
# time.sleep(7200)  # Don't actually run this!

# The next call would normally fail with 401
# But retry_on_idle_logout makes it transparent
try:
    # This automatically:
    # 1. Detects the 401 error
    # 2. Re-authenticates 
    # 3. Retries the request
    # 4. Returns the result as if nothing happened
    more_customers = client.customers.get_list()
    print(f"Still working! Got {len(more_customers)} customers")
except Exception as e:
    print(f"Failed even after retry: {e}")`);

const fileExample = ref(`# Working with file attachments

# 1. Upload a file to a stock item
with open('product_photo.jpg', 'rb') as f:
    image_data = f.read()

client.stock_items.put_file(
    entity_id="ITEM001",
    filename="main_product_image.jpg",
    data=image_data,
    comment="Primary product photo - high resolution"
)

# 2. List files attached to an entity
files = client.stock_items.get_files("ITEM001")
for file_info in files:
    print(f"File: {file_info['filename']} - {file_info['comment']}")

# 3. The generic approach works for any entity supporting files
# Upload to a customer
client.customers.put_file(
    entity_id="CUST001",
    filename="contract.pdf",
    data=contract_bytes,
    comment="Signed service agreement"
)

# 4. Files are automatically linked to the entity
# They appear in the Acumatica UI immediately`);

const odataExample = ref(`# Advanced OData filtering with the F object
from easy_acumatica import QueryOptions, F

# 1. Complex filter with multiple conditions
complex_filter = (
    (F.CustomerClass == 'WHOLESALE') & 
    (F.Balance > 1000) &
    (F.Status == 'Active')
)

options = QueryOptions(
    filter=complex_filter,
    select=['CustomerID', 'CustomerName', 'Balance'],
    orderby='Balance desc',
    top=20
)

top_wholesale = client.customers.get_list(options=options)

# 2. Working with dates
from datetime import datetime, timedelta

last_month = datetime.now() - timedelta(days=30)
recent_orders = QueryOptions(
    filter=F.OrderDate >= last_month.isoformat(),
    expand=['Details', 'Customer'],
    select=['OrderNbr', 'OrderTotal', 'Customer/CustomerName']
)

orders = client.sales_orders.get_list(options=recent_orders)

# 3. Nested property filtering
# Filter by related entity properties
options = QueryOptions(
    filter=F.MainContact.Email.endswith('@important.com'),
    select=['CustomerID', 'CustomerName', 'MainContact/Email']
)

vip_customers = client.customers.get_list(options=options)`);

const actionsExample = ref(`# Executing business logic actions

# 1. Simple action without parameters
# Create an action invocation using the generated model
release_action = client.models.ReleaseInvoiceAction(
    entity={
        "Type": {"value": "Invoice"},
        "ReferenceNbr": {"value": "INV001234"}
    }
)

# Execute the action
result = client.invoices.invoke_action(release_action)
print(f"Invoice released: {result}")

# 2. Action with parameters
confirm_shipment = client.models.ConfirmShipmentAction(
    entity={
        "ShipmentNbr": {"value": "SH001234"}
    },
    parameters={
        "ShipmentDate": {"value": "2025-01-15T00:00:00"}
    }
)

result = client.shipments.invoke_action(confirm_shipment)

# 3. Complex action example
# Process a return with multiple parameters
process_return = client.models.ProcessReturnAction(
    entity={
        "OrderType": {"value": "SO"},
        "OrderNbr": {"value": "SO001234"}
    },
    parameters={
        "ReturnReason": {"value": "Defective"},
        "RestockingFee": {"value": 25.00},
        "CreateCreditMemo": {"value": True}
    }
)

result = client.sales_orders.invoke_action(process_return)`);

// Parameters table data
const initializationParams = ref([
  { name: 'base_url', type: 'str', required: true, description: 'Root URL of your Acumatica instance' },
  { name: 'username', type: 'str', required: true, description: 'API user credentials' },
  { name: 'password', type: 'str', required: true, description: 'API user password' },
  { name: 'tenant', type: 'str', required: true, description: 'Target tenant (company) code' },
  { name: 'branch', type: 'str', required: false, description: 'Branch code within the tenant' },
  { name: 'locale', type: 'str', required: false, description: 'UI locale (e.g., "en-US")' },
  { name: 'verify_ssl', type: 'bool', required: false, description: 'Validate TLS certificates (default: True)' },
  { name: 'persistent_login', type: 'bool', required: false, description: 'Keep session alive between calls (default: True)' },
  { name: 'retry_on_idle_logout', type: 'bool', required: false, description: 'Auto-retry on session timeout (default: True)' },
  { name: 'endpoint_name', type: 'str', required: false, description: 'API endpoint name (default: "Default")' },
  { name: 'endpoint_version', type: 'str', required: false, description: 'Specific API version to use' },
]);

const servicePatterns = ref([
  { pattern: 'get_list(options)', description: 'Retrieve all entities with optional filtering' },
  { pattern: 'get_by_id(entity_id, options)', description: 'Get a specific entity by ID' },
  { pattern: 'put_entity(data, options)', description: 'Create or update an entity' },
  { pattern: 'delete_by_id(entity_id)', description: 'Delete an entity' },
  { pattern: 'invoke_action(invocation)', description: 'Execute a business action' },
  { pattern: 'put_file(entity_id, filename, data)', description: 'Attach a file to an entity' },
  { pattern: 'get_files(entity_id)', description: 'List files attached to an entity' },
]);

const bestPracticesDo = ref([
  'Let the client discover your instance structure',
  'Use generated models for type safety',
  'Leverage IDE autocomplete for field names',
  'Handle exceptions appropriately',
  'Use persistent sessions for batch operations',
  'Let the client manage session lifecycle',
]);

const bestPracticesDont = ref([
  'Hard-code field names or structures',
  'Manually construct API payloads',
  'Create multiple clients for the same instance',
  'Ignore SSL verification in production',
  'Leave sessions open indefinitely',
  'Bypass the dynamic model system',
]);

// Methods
const handleConnection = (creds) => {
  credentials.value = creds;
  isConnected.value = true;
  connectionDialog.value = false;
  // Store in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('acumatica_demo_creds', JSON.stringify(creds));
  }
};

const executeCode = async (code) => {
  if (!isConnected.value || !credentials.value) {
    connectionDialog.value = true;
    return;
  }

  if (!pyodideReady.value) {
    codeError.value = 'Python environment is still loading. Please wait...';
    outputDialog.value = true;
    return;
  }

  codeOutput.value = '';
  codeError.value = '';
  codeLoading.value = true;
  outputDialog.value = true;

  let executableCode = code;
  if (credentials.value) {
    const corsProxy = 'http://localhost:3001/raw?url=';
    const proxiedBaseUrl = corsProxy + credentials.value.base_url;

    // Replace all placeholders with actual credential values
    executableCode = executableCode
      .replace(/https:\/\/your-instance\.acumatica\.com/g, proxiedBaseUrl)
      .replace(/your_username/g, credentials.value.username)
      .replace(/your_password/g, credentials.value.password)
      .replace(/YourTenant/g, credentials.value.tenant)
      .replace(/api_user/g, credentials.value.username)
      .replace(/secure_password/g, credentials.value.password)
      .replace(/Company/g, credentials.value.tenant);

    // Handle branch replacement
    if (credentials.value.branch) {
      executableCode = executableCode
        .replace(/YourBranch/g, credentials.value.branch)
        .replace(/MAIN/g, credentials.value.branch);
    } else {
      // If no branch is provided, remove the line from the code
      executableCode = executableCode.replace(/^\s*branch=.*,?\s*$/gm, '');
    }
  }
  
  worker.value.postMessage({ code: executableCode });
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('acumatica_demo_creds');
    if (stored) {
      credentials.value = JSON.parse(stored);
      isConnected.value = true;
    }

    worker.value = new Worker(new URL('./pyodide-worker.js', import.meta.url), { type: 'module' });

    worker.value.onmessage = (event) => {
      const { type, output, error } = event.data;
      if (type === 'ready') {
        pyodideLoading.value = false;
        pyodideReady.value = true;
        console.log("✅ Pyodide worker is ready.");
      } else if (type === 'success') {
        codeLoading.value = false;
        codeOutput.value = output;
        codeError.value = '';
      } else if (type === 'error') {
        codeLoading.value = false;
        codeOutput.value = '';
        codeError.value = error;
      }
    };
  }
});

onUnmounted(() => {
  // Terminate the worker when the component is removed
  if (worker.value) {
    worker.value.terminate();
  }
});


// SEO
useSeoMeta({
  title: 'AcumaticaClient v0.4.0 | Dynamic Python API Client',
  description: 'Learn about the revolutionary AcumaticaClient v0.4.0 that dynamically adapts to your Acumatica instance with zero static code.',
  ogTitle: 'AcumaticaClient v0.4.0 - Dynamic ERP Integration',
  ogDescription: 'The intelligent Python client that discovers your Acumatica instance and generates a perfect API interface at runtime.',
  ogImage: 'https://www.easyacumatica.com/social-images/python-client-v4.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'AcumaticaClient v0.4.0 - Zero Static Code',
  twitterDescription: 'Dynamic model generation, automatic service discovery, perfect type safety.',
  twitterImage: 'https://www.easyacumatica.com/social-images/python-client-v4.png',
});
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 25%, #5e35b1 50%, #7e57c2 100%);
  opacity: 0.95;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 3rem 0;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #b39ddb 0%, #e1bee7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 300;
}

.hero-features {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-pill {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 500;
}

/* Connection Banner */
.connection-banner {
  background: #f8f9fa;
  padding: 2rem 0;
}

.connection-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px !important;
}

.connection-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.05;
}

/* Section Styles */
.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a237e;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  border-radius: 2px;
}

/* Code Styles */
.inline-code {
  background: rgba(94, 53, 177, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
  color: #5e35b1;
}

/* Sticky Navigation */
.sticky-nav {
  position: sticky;
  top: 88px;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-features {
    justify-content: center;
  }

  .feature-pill {
    font-size: 0.875rem;
  }
}
</style>