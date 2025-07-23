<!-- pages/python/client.vue -->
<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-gradient"></div>
      <v-container class="hero-content">
        <v-row justify="center" align="center">
          <v-col cols="12" md="10" lg="8">
            <div class="hero-badge mb-4">
              <v-chip color="white" size="large" class="font-weight-bold">
                <v-icon start>mdi-lightning-bolt</v-icon>
                Dynamic Client
              </v-chip>
            </div>
            
            <h1 class="hero-title">
              <span class="gradient-text">AcumaticaClient</span>
            </h1>
            
            <p class="hero-subtitle">
              The intelligent, self-configuring API client that adapts to your instance
            </p>
            
            <div class="hero-features">
              <div class="feature-pill">
                <v-icon start size="small">mdi-auto-fix</v-icon>
                Self-Configuring
              </div>
              <div class="feature-pill">
                <v-icon start size="small">mdi-shield-check</v-icon>
                Type-Safe
              </div>
              <div class="feature-pill">
                <v-icon start size="small">mdi-rocket</v-icon>
                Zero Boilerplate
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-container fluid class="py-0">
      <v-container class="py-8">
        <v-row>
          <v-col cols="12" md="9">
            <v-container class="pa-0">
              <!-- Introduction Section -->
              <section id="introduction" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-book-open-variant</v-icon>
                  Introduction
                </h2>
                <p class="text-body-1 mb-4">
                  The <code class="inline-code">AcumaticaClient</code> is the heart of Easy-Acumatica's v0.4.0 revolution.
                  Unlike traditional static APIs, it dynamically discovers your instance's capabilities and generates a
                  perfectly-fitted client at runtime.
                </p>

                <v-alert type="info" variant="tonal" border="start" class="feature-alert mb-6">
                  <v-alert-title class="font-weight-bold">What's Revolutionary in v0.4.0</v-alert-title>
                  <ul class="mt-2">
                    <li>Zero static code - everything is generated at runtime</li>
                    <li>Automatic discovery of custom fields and endpoints</li>
                    <li>Perfect type hints for your exact configuration</li>
                    <li>Seamless adaptation to instance changes</li>
                  </ul>
                </v-alert>

                <!-- Static Example -->
                <CodePlayground title="Your First Connection" :initial-code="introExample" />
              </section>

              <!-- Initialization Section -->
              <section id="initialization" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-power-plug</v-icon>
                  Initialization
                </h2>
                <p class="text-body-1 mb-4">
                  When you create an <code class="inline-code">AcumaticaClient</code>, it immediately connects to your
                  instance, discovers all available endpoints, and builds a complete type-safe interface tailored to your
                  configuration.
                </p>

                <h3 class="subsection-title">Parameters</h3>
                <ParameterTable :parameters="initializationParams" />

                <CodePlayground title="Advanced Initialization" :initial-code="advancedInitExample" class="mt-6" />
              </section>

              <!-- Configuration Section -->
              <section id="configuration" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-cog</v-icon>
                  Configuration
                </h2>
                <p class="text-body-1 mb-4">
                  Use the <code class="inline-code">AcumaticaConfig</code> class for centralized configuration management.
                </p>

                <CodePlayground title="Using AcumaticaConfig" :initial-code="configExample" />
              </section>

              <!-- Dynamic Discovery Section -->
              <section id="discovery" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-magnify-scan</v-icon>
                  Dynamic Discovery
                </h2>
                <p class="text-body-1 mb-4">
                  The magic happens during initialization. The client interrogates your instance and builds everything
                  it needs.
                </p>

                <v-row class="mb-6">
                  <v-col cols="12" md="4">
                    <FeatureCard icon="mdi-magnify-scan" title="Endpoint Discovery"
                      description="Automatically finds all available API endpoints and their versions" 
                      color="primary" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <FeatureCard icon="mdi-cube-scan" title="Model Generation"
                      description="Creates type-safe dataclasses for every entity in your instance" 
                      color="secondary" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <FeatureCard icon="mdi-cogs" title="Service Creation"
                      description="Builds service methods that match your exact API surface" 
                      color="accent" />
                  </v-col>
                </v-row>

                <CodePlayground title="Explore Your Instance" :initial-code="discoveryExample" />
              </section>

              <!-- Dynamic Models Section -->
              <section id="models" class="content-section">
                <h2 class="section-title">
                  <v-icon class="section-icon">mdi-cube-outline</v-icon>
                  Dynamic Models
                </h2>
                <p class="text-body-1 mb-4">
                  All models are generated at runtime and attached to <code class="inline-code">client.models</code>.
                  They include your custom fields and provide perfect IDE support.
                </p>

                <CodePlayground title="Working with Dynamic Models" :initial-code="modelsExample" />

                <v-alert type="success" variant="tonal" border="start" class="tip-alert mt-6">
                  <v-alert-title class="font-weight-bold">Pro Tip</v-alert-title>
                  Your IDE will provide autocomplete for all dynamically generated models and their fields!
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

                <CodePlayground title="Using Dynamic Services" :initial-code="servicesExample" />

                <h3 class="subsection-title mt-8">Service Method Patterns</h3>
                <MethodPatternTable :patterns="servicePatterns" />
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
                    <CodePlayground title="Persistent Session (Default)" :initial-code="persistentSessionExample" />
                  </v-tabs-window-item>

                  <v-tabs-window-item value="non-persistent">
                    <CodePlayground title="Non-Persistent Session" :initial-code="nonPersistentSessionExample" />
                  </v-tabs-window-item>

                  <v-tabs-window-item value="retry">
                    <CodePlayground title="Automatic Retry on Session Timeout" :initial-code="retryExample" />
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

                <CodePlayground title="Handling Exceptions" :initial-code="exceptionExample" />
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
                      <CodePlayground title="Working with Files" :initial-code="fileExample" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title class="expansion-title">
                      <v-icon start>mdi-speedometer</v-icon>
                      Rate Limiting
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <CodePlayground title="Rate Limit Configuration" :initial-code="rateLimitExample" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title class="expansion-title">
                      <v-icon start>mdi-cog-clockwise</v-icon>
                      Executing Actions
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <CodePlayground title="Business Logic Actions" :initial-code="actionsExample" />
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
import CodePlayground from '../components/CodePlayground.vue';
import OnPageNav from '~/components/OnPageNav.vue';
import ParameterTable from '../components/ParameterTable.vue';
import FeatureCard from '../components/FeatureCard.vue';
import MethodPatternTable from '../components/MethodPatternTable.vue';

// State
const sessionTab = ref('persistent');

// Navigation items
const navItems = ref([
  { id: 'introduction', title: 'Introduction', icon: 'mdi-book-open-variant' },
  { id: 'initialization', title: 'Initialization', icon: 'mdi-power-plug' },
  { id: 'configuration', title: 'Configuration', icon: 'mdi-cog' },
  { id: 'discovery', title: 'Dynamic Discovery', icon: 'mdi-magnify-scan' },
  { id: 'models', title: 'Dynamic Models', icon: 'mdi-cube-outline' },
  { id: 'services', title: 'Dynamic Services', icon: 'mdi-api' },
  { id: 'session', title: 'Session Management', icon: 'mdi-shield-key' },
  { id: 'exceptions', title: 'Exception Handling', icon: 'mdi-alert-circle' },
  { id: 'advanced', title: 'Advanced Features', icon: 'mdi-rocket' },
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
new_customer = client.models.Customer(
    CustomerID="DYNAMIC01",
    CustomerName="Dynamic Customer"
)
result = client.customers.create(new_customer)`);

const advancedInitExample = ref(`from easy_acumatica import AcumaticaClient

# Using environment variables (recommended)
client = AcumaticaClient()  # Reads from ACUMATICA_* env vars

# With custom endpoint and version
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    endpoint_name="CustomEndpoint",
    endpoint_version="24.200.001",
    rate_limit_calls_per_second=5.0,  # Custom rate limit
    timeout=120  # 2 minute timeout
)

# Non-persistent sessions for short operations
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    persistent_login=False  # Login/logout for each request
)`);

const configExample = ref(`from easy_acumatica import AcumaticaClient, AcumaticaConfig

# Create a configuration object
config = AcumaticaConfig(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    branch="MAIN",
    endpoint_name="Default",
    endpoint_version="24.200.001",
    rate_limit_calls_per_second=10.0,
    timeout=60,
    verify_ssl=True,
    persistent_login=True,
    retry_on_idle_logout=True
)

# Pass config to client
client = AcumaticaClient(config=config)

# Or load from environment with custom prefix
config = AcumaticaConfig.from_env(prefix="MY_ACU_")
client = AcumaticaClient(config=config)

# Override specific settings
config.rate_limit_calls_per_second = 20.0
config.timeout = 30
client = AcumaticaClient(config=config)`);

const discoveryExample = ref(`# After initialization, explore what's available

# List all discovered endpoints
print("Available endpoints:", client.endpoints)

# See all generated models
models = [name for name in dir(client.models) if not name.startswith('_')]
print(f"Generated {len(models)} models:", models[:5], "...")

# Check available services
services = [attr for attr in dir(client) if attr.endswith('s') and not attr.startswith('_')]
print(f"Created {len(services)} services:", services[:5], "...")

# Inspect a model's fields
customer_fields = client.models.Customer.__dataclass_fields__.keys()
print(f"Customer model has {len(customer_fields)} fields")

# Check custom fields on your instance
if hasattr(client.models.SalesOrder, 'UsrCustomField'):
    print("Found custom field UsrCustomField on SalesOrder!")`);

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
customer = client.customers.get(["PYTHN001"])

# GET - With field selection
customer = client.customers.get(
    keys=["PYTHN001"],
    select="CustomerID,CustomerName,Balance"
)

# LIST - Get multiple records
all_customers = client.customers.list()

# LIST - With filtering using Filter class
from easy_acumatica import Filter

active_customers = client.customers.list(
    filter=Filter(Status="Active") & Filter(CustomerClass="LOCAL"),
    select="CustomerID,CustomerName",
    top=10
)

# CREATE - Add new record
new_customer = client.models.Customer(
    CustomerID="PYTHN002",
    CustomerName="Another Python Customer"
)
created = client.customers.create(new_customer)

# UPDATE - Modify existing
customer.CustomerName = "Updated Name"
updated = client.customers.update(customer)

# DELETE - Remove record
client.customers.delete(["PYTHN002"])`);

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
customers = client.customers.list()
orders = client.sales_orders.list()
invoices = client.invoices.list()

# Session automatically cleaned up on exit
# Or explicitly:
client.logout()`);

const nonPersistentSessionExample = ref(`# For scripts or short-lived operations

client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    persistent_login=False
)

# Each operation logs in and out automatically
customer = client.customers.get(["CUST001"])  # Login -> Get -> Logout
order = client.sales_orders.get(["SO001"])    # Login -> Get -> Logout

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
    customer = client.customers.get([customer_id])
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
    customer = client.customers.get(["UNKNOWN"])
    
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
order = client.sales_orders.get(["SO001"])

# Attach a file
with open("invoice.pdf", "rb") as f:
    client.sales_orders.attach_file(
        keys=["SO001"],
        filename="invoice.pdf",
        content=f.read()
    )

# List attached files
files = client.sales_orders.get_files(["SO001"])
for file in files:
    print(f"{file['filename']} - {file['id']}")

# Download a file
file_content = client.sales_orders.get_file(
    keys=["SO001"],
    file_id=files[0]["id"]
)

# Delete a file
client.sales_orders.delete_file(
    keys=["SO001"],
    file_id=files[0]["id"]
)`);

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
    customer = client.customers.get([f"CUST{i:03d}"])
    # No need to add delays - handled automatically

# Burst handling
# Even if you make many calls at once, they're queued and rate-limited
results = []
for customer_id in customer_ids[:100]:
    # These are fired rapidly but executed at 5/second
    results.append(client.customers.get([customer_id]))

# For parallel operations, rate limit is shared across threads
from concurrent.futures import ThreadPoolExecutor

def fetch_customer(cid):
    return client.customers.get([cid])

with ThreadPoolExecutor(max_workers=10) as executor:
    # All threads share the same rate limit
    futures = [executor.submit(fetch_customer, cid) for cid in customer_ids]
    results = [f.result() for f in futures]`);

const actionsExample = ref(`# Execute built-in and custom actions

# Release a sales order
client.sales_orders.invoke_action(
    name="ReleaseSalesOrder",
    payload={
        "entity": {
            "OrderType": "SO",
            "OrderNbr": "SO001"
        }
    }
)

# Run a custom action
result = client.custom_endpoint.invoke_action(
    name="ProcessBatch",
    payload={
        "BatchID": "BATCH001",
        "ProcessDate": "2024-01-15"
    }
)

# Actions return results
print(f"Processed {result.get('RecordsProcessed', 0)} records")

# Actions with parameters
client.invoices.invoke_action(
    name="EmailInvoice",
    payload={
        "entity": {"Type": "INV", "ReferenceNbr": "INV001"},
        "parameters": {
            "EmailTo": "customer@example.com",
            "EmailCC": "accounting@company.com"
        }
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
  { method: 'get(keys, select=None, expand=None)', description: 'Retrieve a single record by its keys' },
  { method: 'list(top=None, skip=None, filter=None, select=None, orderby=None, expand=None)', description: 'List records with optional OData parameters' },
  { method: 'create(entity)', description: 'Create a new record' },
  { method: 'update(entity)', description: 'Update an existing record' },
  { method: 'delete(keys)', description: 'Delete a record by its keys' },
  { method: 'get_by_id(id)', description: 'Get a record by its internal ID' },
  { method: 'invoke_action(name, payload)', description: 'Execute an action' },
  { method: 'attach_file(keys, filename, content)', description: 'Attach a file to a record' },
  { method: 'get_files(keys)', description: 'List files attached to a record' },
  { method: 'get_file(keys, file_id)', description: 'Download a specific file' },
  { method: 'delete_file(keys, file_id)', description: 'Delete a file attached to an entity' },
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

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
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
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  border-radius: 2px;
}

.section-icon {
  color: #5e35b1;
  font-size: 1.75rem;
}

.subsection-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

/* Inline Code */
.inline-code {
  background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
  padding: 0.2rem 0.5rem;
  border-radius: 0.375rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
  color: #5e35b1;
  box-shadow: 0 1px 3px rgba(94, 53, 177, 0.1);
}

/* Alerts */
.feature-alert {
  background: linear-gradient(135deg, #5e35b108 0%, #7e57c208 100%);
  border-left: 4px solid #5e35b1;
  box-shadow: 0 2px 8px rgba(94, 53, 177, 0.1);
}

.tip-alert {
  background: linear-gradient(135deg, #4caf5008 0%, #8bc34a08 100%);
  border-left: 4px solid #4caf50;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);
}

/* Tabs */
.modern-tabs :deep(.v-tab) {
  text-transform: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.modern-tabs :deep(.v-tab--selected) {
  background: linear-gradient(135deg, #5e35b115 0%, #7e57c215 100%);
}

/* Expansion Panels */
.modern-expansion {
  box-shadow: 0 2px 8px rgba(94, 53, 177, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.expansion-title {
  font-weight: 600;
  transition: all 0.3s ease;
}

.modern-expansion :deep(.v-expansion-panel-title:hover) {
  background: linear-gradient(135deg, #5e35b108 0%, #7e57c208 100%);
}

/* Sticky Navigation */
.sticky-container {
  position: sticky;
  top: 80px;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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
    font-size: 1.75rem;
  }
}
</style>