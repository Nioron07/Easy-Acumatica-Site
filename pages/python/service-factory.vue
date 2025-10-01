<template>
  <div class="service-factory-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Dynamic Services</h1>
              <p class="hero-subtitle">
                Automatically generated service methods for every endpoint in your Acumatica instance
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
                  When you initialize the <NuxtLink to="/python/client">AcumaticaClient</NuxtLink>, it automatically discovers
                  all endpoints from your instance's OpenAPI schema and generates corresponding service objects. Each service
                  provides methods for CRUD operations, custom actions, and file handling. For executing multiple operations
                  concurrently, see <NuxtLink to="/python/batching">Batch Operations</NuxtLink>.
                </p>
                <CodeSnippet :code="overviewExample" language="python" />
              </section>

              <!-- Accessing Services -->
              <section id="accessing-services" class="doc-section">
                <h2>Accessing Services</h2>
                <p>Services are accessed as attributes on the client. The attribute name is the entity name in snake_case:</p>
                <CodeSnippet :code="accessingExample" language="python" />
              </section>

              <!-- Common Methods -->
              <section id="common-methods" class="doc-section">
                <h2>Common Methods</h2>
                <p>All services provide a consistent set of methods for interacting with entities:</p>

                <h3>get_list()</h3>
                <p>Retrieve multiple records from an endpoint:</p>
                <CodeSnippet :code="getListExample" language="python" />

                <h3>get_by_id()</h3>
                <p>Retrieve a single record by its ID:</p>
                <CodeSnippet :code="getByIdExample" language="python" />

                <h3>get_by_keys()</h3>
                <p>Retrieve a record by its key field values:</p>
                <CodeSnippet :code="getByKeysExample" language="python" />

                <h3>put_entity()</h3>
                <p>Create or update a record:</p>
                <CodeSnippet :code="putEntityExample" language="python" />

                <h3>delete_by_id()</h3>
                <p>Delete a record by ID:</p>
                <CodeSnippet :code="deleteExample" language="python" />

                <h3>delete_by_keys()</h3>
                <p>Delete a record by key field values:</p>
                <CodeSnippet :code="deleteByKeysExample" language="python" />
              </section>

              <!-- Query Options -->
              <section id="query-options" class="doc-section">
                <h2>Query Options</h2>
                <p>
                  Use <code>QueryOptions</code> to filter, sort, expand, and paginate results.
                  See the <NuxtLink to="/python/odata">OData Queries</NuxtLink> page for detailed information.
                </p>
                <CodeSnippet :code="queryOptionsExample" language="python" />
              </section>

              <!-- Custom Actions -->
              <section id="custom-actions" class="doc-section">
                <h2>Custom Actions</h2>
                <p>
                  Acumatica entities can have custom actions (like "Release", "Post", etc.). These are automatically
                  discovered and available as <code>invoke_action_*</code> methods:
                </p>
                <CodeSnippet :code="customActionsExample" language="python" />
              </section>

              <!-- File Operations -->
              <section id="file-operations" class="doc-section">
                <h2>File Operations</h2>
                <p>Upload and retrieve files attached to entities:</p>

                <h3>put_file()</h3>
                <p>Upload a file to an entity:</p>
                <CodeSnippet :code="putFileExample" language="python" />

                <h3>get_files()</h3>
                <p>Retrieve files attached to an entity:</p>
                <CodeSnippet :code="getFilesExample" language="python" />
              </section>

              <!-- Generic Inquiries -->
              <section id="generic-inquiries" class="doc-section">
                <h2>Generic Inquiries</h2>
                <p>
                  Generic Inquiries (GI) are exposed through the <code>client.Inquiries</code> service. Each inquiry
                  gets its own method based on the inquiry name:
                </p>
                <CodeSnippet :code="inquiryExample" language="python" />
              </section>

              <!-- Custom Endpoints (Extended GI) -->
              <section id="custom-endpoints" class="doc-section">
                <h2>Custom Endpoints (Extended Generic Inquiries)</h2>
                <p>
                  Extended Generic Inquiries that have been published as custom endpoints appear as their own services.
                  These use a special <code>query_custom_endpoint()</code> method:
                </p>
                <CodeSnippet :code="customEndpointExample" language="python" />
                <p class="note">
                  Extended GIs require a PUT request with an empty body. The <code>query_custom_endpoint</code> method
                  handles this automatically. Note that OData filtering may be unstable for custom endpoints - consider
                  filtering results in Python instead.
                </p>
              </section>

              <!-- Service Discovery -->
              <section id="service-discovery" class="doc-section">
                <h2>Service Discovery</h2>
                <p>List all available services and their methods:</p>
                <CodeSnippet :code="discoveryExample" language="python" />
              </section>

              <!-- Working with Models -->
              <section id="working-with-models" class="doc-section">
                <h2>Working with Models</h2>
                <p>
                  Services work with dynamically generated models accessed via <code>client.models</code>.
                  See the <NuxtLink to="/python/model-factory">Model Factory</NuxtLink> page for details.
                </p>
                <CodeSnippet :code="modelsExample" language="python" />
              </section>

              <!-- Error Handling -->
              <section id="error-handling" class="doc-section">
                <h2>Error Handling</h2>
                <p>Service methods raise specific exceptions for different error conditions:</p>
                <CodeSnippet :code="errorHandlingExample" language="python" />
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
  { id: 'accessing-services', title: 'Accessing Services', icon: 'mdi-folder-open' },
  { id: 'common-methods', title: 'Common Methods', icon: 'mdi-function' },
  { id: 'query-options', title: 'Query Options', icon: 'mdi-filter' },
  { id: 'custom-actions', title: 'Custom Actions', icon: 'mdi-lightning-bolt' },
  { id: 'file-operations', title: 'File Operations', icon: 'mdi-file' },
  { id: 'generic-inquiries', title: 'Generic Inquiries', icon: 'mdi-table-search' },
  { id: 'custom-endpoints', title: 'Custom Endpoints', icon: 'mdi-api' },
  { id: 'service-discovery', title: 'Service Discovery', icon: 'mdi-magnify' },
  { id: 'working-with-models', title: 'Working with Models', icon: 'mdi-cube-outline' },
  { id: 'error-handling', title: 'Error Handling', icon: 'mdi-alert-circle' },
]);

const overviewExample = `from easy_acumatica import AcumaticaClient

# Initialize client
client = AcumaticaClient()

# Services are automatically generated and attached
customers = client.customers.get_list()
invoices = client.invoices.get_list()
sales_orders = client.sales_orders.get_list()`;

const accessingExample = `# Entity names are converted to snake_case
client.customers          # Customer entity
client.sales_orders       # SalesOrder entity
client.bills             # Bill entity
client.journal_transactions  # JournalTransaction entity

# Check if a service exists
if hasattr(client, 'customers'):
    print("Customer service available")`;

const getListExample = `from easy_acumatica.odata import QueryOptions, F

# Get all records
all_customers = client.customers.get_list()

# Get with query options
options = QueryOptions(
    filter=F.Status == "Active",
    select=["CustomerID", "CustomerName", "Email"],
    orderby=["CustomerName"],
    top=100
)
active_customers = client.customers.get_list(options=options)`;

const getByIdExample = `# Get by primary key ID
customer = client.customers.get_by_id("ABCCOMP")

# With expand to include related data
options = QueryOptions(expand=["Contacts", "Addresses"])
customer = client.customers.get_by_id("ABCCOMP", options=options)`;

const getByKeysExample = `# Single key field
customer = client.customers.get_by_keys(CustomerID="ABCCOMP")

# Multiple key fields (e.g., for entities with composite keys)
journal_entry = client.journal_transactions.get_by_keys(
    BatchNbr="00001",
    Module="GL"
)

# With query options
options = QueryOptions(expand=["Details"])
invoice = client.invoices.get_by_keys(
    RefNbr="INV001234",
    options=options
)`;

const putEntityExample = `# Create a new customer
new_customer = client.models.Customer(
    CustomerID="NEWCUST",
    CustomerName="New Customer Inc.",
    Email="contact@newcustomer.com"
)
created = client.customers.put_entity(new_customer)

# Update existing (partial update supported)
update = client.models.Customer(
    CustomerID="ABCCOMP",
    Email="newemail@company.com"
)
updated = client.customers.put_entity(update)`;

const deleteExample = `# Delete by ID
client.customers.delete_by_id("OLDCUST")`;

const deleteByKeysExample = `# Delete by key fields
client.customers.delete_by_keys(CustomerID="OLDCUST")

# Multiple keys
client.invoices.delete_by_keys(RefNbr="INV001234")`;

const queryOptionsExample = `from easy_acumatica.odata import QueryOptions, F

options = QueryOptions(
    filter=(F.Status == "Active") & (F.CreditLimit > 10000),
    select=["CustomerID", "CustomerName", "CreditLimit"],
    expand=["Contacts", "PrimaryContact"],
    orderby=["CustomerName asc"],
    top=50,
    skip=0
)

customers = client.customers.get_list(options=options)`;

const customActionsExample = `# Check if action exists
if hasattr(client.invoices, 'invoke_action_release'):
    # Get the invoice
    invoice = client.invoices.get_by_id("INV001234")

    # Execute the release action
    client.invoices.invoke_action_release(invoice)
    print(f"Released invoice {invoice.RefNbr}")

# Actions with parameters
if hasattr(client.sales_orders, 'invoke_action_create_shipment'):
    order = client.sales_orders.get_by_id("SO001234")
    client.sales_orders.invoke_action_create_shipment(order)`;

const putFileExample = `# Upload a file to an entity
with open('invoice.pdf', 'rb') as f:
    file_data = f.read()

client.invoices.put_file(
    entity_id="INV001234",
    filename="invoice.pdf",
    data=file_data,
    comment="Original invoice document"
)`;

const getFilesExample = `# Get list of files attached to an entity
files = client.invoices.get_files("INV001234")

for file_info in files:
    print(f"File: {file_info['name']}, Size: {file_info['size']}")`;

const inquiryExample = `from easy_acumatica.odata import QueryOptions

# List available inquiry methods
inquiries = [m for m in dir(client.Inquiries) if not m.startswith('_')]
print(inquiries)

# Call an inquiry
results = client.Inquiries.account_summary(
    options=QueryOptions(
        filter="AccountCD eq '10000'",
        top=50
    )
)`;

const customEndpointExample = `from easy_acumatica.odata import QueryOptions

# Extended GI endpoints appear as services with descriptive names
# Example: "PE All Items (GI908032)" becomes client.pe_all_items

# Query with default options (expand=none)
results = client.pe_all_items.query_custom_endpoint()

# Query with expansion and pagination
options = QueryOptions(
    expand=['PEALLPRODSDetails'],  # Expand detail fields
    top=100,
    orderby=['InventoryID']
)
results = client.pe_all_items.query_custom_endpoint(options=options)

# Note: OData filtering may be unstable for custom endpoints
# Filtering is better done in Python after retrieving results

# The results structure depends on your GI configuration
for item in results:
    print(f"{item['InventoryID']}: {item['Description']}")`;

const discoveryExample = `# List all available services
services = client.list_services()
print(f"Found {len(services)} services")
print("Services:", services[:10])

# Get detailed service information
service_info = client.get_service_info('Customer')
print(f"Customer service methods: {service_info['methods']}")

# List methods for a specific service
methods = [m for m in dir(client.customers) if not m.startswith('_')]
print("Customer service methods:", methods)

# Check for custom actions
actions = [m for m in dir(client.invoices)
           if m.startswith('invoke_action_')]
print("Invoice actions:", actions)`;

const modelsExample = `# Create entity using model
customer = client.models.Customer(
    CustomerID="CUST001",
    CustomerName="Acme Corp"
)

# Models provide type hints and validation
invoice = client.models.Invoice(
    CustomerID="CUST001",
    Date="2024-03-15",
    Description="March Services",
    Details=[
        client.models.InvoiceDetail(
            InventoryID="SERVICE01",
            Quantity=1,
            UnitPrice=1000.00
        )
    ]
)

# Send to Acumatica
created_invoice = client.invoices.put_entity(invoice)`;

const errorHandlingExample = `from easy_acumatica.exceptions import (
    AcumaticaNotFoundError,
    AcumaticaAuthError,
    AcumaticaAPIError
)

try:
    customer = client.customers.get_by_id("NOTEXIST")
except AcumaticaNotFoundError:
    print("Customer not found")
except AcumaticaAuthError:
    print("Authentication failed")
except AcumaticaAPIError as e:
    print(f"API error: {e.status_code} - {e.message}")`;

useSeoMeta({
  title: 'Dynamic Services | Easy-Acumatica Python',
  description: 'Learn how to use automatically generated service methods for CRUD operations, custom actions, file handling, and Generic Inquiries in Easy-Acumatica.',
});
</script>

<style scoped>
.service-factory-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a237e 0%, #5e35b1 100%);
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

.doc-section p.note {
  color: #666;
  font-size: 0.95rem;
  font-style: italic;
  margin-top: 0.5rem;
}

.doc-section code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  color: #d32f2f;
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
