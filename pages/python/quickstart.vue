<template>
  <div class="quickstart-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Quickstart Guide</h1>
              <p class="hero-subtitle">Get started with Easy-Acumatica v0.5.4</p>
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
              <!-- Prerequisites -->
              <section id="prerequisites" class="doc-section">
            <h2>Prerequisites</h2>
            <ul>
              <li>Easy-Acumatica v0.5.4 installed (<code>pip install easy-acumatica</code>)</li>
              <li>Acumatica instance with REST API enabled</li>
              <li>API credentials (username, password, tenant, branch)</li>
            </ul>
          </section>

          <!-- Configuration -->
          <section id="configuration" class="doc-section">
            <h2>Configuration</h2>
            <p>Create a <code>.env</code> file in your project root:</p>
            <CodeSnippet :code="envConfig" language="bash" />
          </section>

          <!-- Initialize Client -->
          <section id="initialize" class="doc-section">
            <h2>Initialize Client</h2>
            <p>The client automatically loads credentials from your <code>.env</code> file:</p>
            <CodeSnippet :code="initClient" language="python" />
            <p class="note">On initialization, the client discovers all available endpoints and generates corresponding services and models.</p>
          </section>

          <!-- Basic CRUD Operations -->
          <section id="crud" class="doc-section">
            <h2>Basic CRUD Operations</h2>

            <h3>Read Data</h3>
            <CodeSnippet :code="readData" language="python" />

            <h3>Create Data</h3>
            <CodeSnippet :code="createData" language="python" />

            <h3>Update Data</h3>
            <CodeSnippet :code="updateData" language="python" />

            <h3>Delete Data</h3>
            <CodeSnippet :code="deleteData" language="python" />
          </section>

          <!-- Querying with OData -->
          <section id="querying" class="doc-section">
            <h2>Querying with OData</h2>
            <p>Use <code>QueryOptions</code> and the <code>F</code> filter factory for complex queries:</p>
            <CodeSnippet :code="queryData" language="python" />
          </section>

          <!-- Working with Related Data -->
          <section id="related-data" class="doc-section">
            <h2>Working with Related Data</h2>
            <p>Use <code>expand</code> to include related entities:</p>
            <CodeSnippet :code="expandData" language="python" />
          </section>

          <!-- Custom Actions -->
          <section id="custom-actions" class="doc-section">
            <h2>Custom Actions</h2>
            <p>Execute custom actions defined in your Acumatica instance:</p>
            <CodeSnippet :code="customActions" language="python" />
          </section>

          <!-- Complete Example -->
          <section id="complete-example" class="doc-section">
            <h2>Complete Example</h2>
            <p>A practical example combining multiple operations:</p>
            <CodeSnippet :code="completeExample" language="python" />
          </section>

          <!-- Next Steps -->
          <section id="next-steps" class="doc-section">
            <h2>Next Steps</h2>
            <ul>
              <li><NuxtLink to="/python/client">Client Configuration</NuxtLink> - Advanced client options and features</li>
              <li><NuxtLink to="/python/dynamic-services">Dynamic Services</NuxtLink> - Service methods and patterns</li>
              <li><NuxtLink to="/python/model-factory">Model Factory</NuxtLink> - Working with dynamic models</li>
              <li><NuxtLink to="/python/odata">OData Queries</NuxtLink> - Advanced filtering and querying</li>
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
  { id: 'prerequisites', title: 'Prerequisites', icon: 'mdi-clipboard-list' },
  { id: 'configuration', title: 'Configuration', icon: 'mdi-file-cog' },
  { id: 'initialize', title: 'Initialize Client', icon: 'mdi-power-plug' },
  { id: 'crud', title: 'CRUD Operations', icon: 'mdi-database' },
  { id: 'querying', title: 'Querying with OData', icon: 'mdi-filter' },
  { id: 'related-data', title: 'Related Data', icon: 'mdi-relation-many-to-many' },
  { id: 'custom-actions', title: 'Custom Actions', icon: 'mdi-lightning-bolt' },
  { id: 'complete-example', title: 'Complete Example', icon: 'mdi-code-braces' },
  { id: 'next-steps', title: 'Next Steps', icon: 'mdi-arrow-right' },
]);

const envConfig = `ACUMATICA_URL=https://your-instance.acumatica.com
ACUMATICA_USERNAME=your-username
ACUMATICA_PASSWORD=your-password
ACUMATICA_TENANT=your-tenant
ACUMATICA_BRANCH=MAIN
ACUMATICA_CACHE_METHODS=true
ACUMATICA_CACHE_TTL_HOURS=24`;

const initClient = `from easy_acumatica import AcumaticaClient

# Automatically loads from .env
client = AcumaticaClient()

# Or specify credentials manually
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password",
    tenant="YourTenant",
    branch="MAIN"
)`;

const readData = `# Get all customers
customers = client.customers.get_list()

# Get customer by ID
customer = client.customers.get_by_id("CUST001")

# Get customer by key fields
customer = client.customers.get_by_keys(CustomerID="CUST001")`;

const createData = `# Create a new customer
new_customer = client.models.Customer(
    CustomerID="CUST001",
    CustomerName="Acme Corporation",
    Email="contact@acmecorp.com",
    Phone="555-0123"
)

result = client.customers.put_entity(new_customer)
print(f"Created customer: {result.CustomerID}")`;

const updateData = `# Get existing customer
customer = client.customers.get_by_id("CUST001")

# Update fields
customer.Email = "newemail@acmecorp.com"
customer.Phone = "555-9999"

# Save changes
updated = client.customers.put_entity(customer)`;

const deleteData = `# Delete by ID
client.customers.delete_by_id("CUST001")

# Delete by key fields
client.customers.delete_by_keys(CustomerID="CUST001")`;

const queryData = `from easy_acumatica.odata import QueryOptions, F

# Simple filter
options = QueryOptions(
    filter=F.Status == "Active"
)
active_customers = client.customers.get_list(options=options)

# Complex filter
options = QueryOptions(
    filter=(F.Status == "Active") & (F.CreditLimit > 10000),
    select=["CustomerID", "CustomerName", "CreditLimit"],
    orderby=["CustomerName"],
    top=50
)
customers = client.customers.get_list(options=options)`;

const expandData = `from easy_acumatica.odata import QueryOptions, F

# Get sales orders with details and customer information
options = QueryOptions(
    filter=F.Status == "Open",
    expand=["Details", "Customer"],
    orderby=["Date desc"]
)
orders = client.sales_orders.get_list(options=options)

# Access expanded data
for order in orders:
    print(f"Order: {order.OrderNbr}")
    print(f"Customer: {order.Customer.CustomerName}")
    for detail in order.Details:
        print(f"  Item: {detail.InventoryID}, Qty: {detail.Quantity}")`;

const customActions = `# Check if action exists
if hasattr(client.invoices, 'invoke_action_release'):
    # Get the invoice
    invoice = client.invoices.get_by_id("INV001234")

    # Execute the release action
    client.invoices.invoke_action_release(entity=invoice)
    print(f"Released invoice {invoice.RefNbr}")`;

const completeExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.odata import QueryOptions, F
from datetime import datetime, timedelta

# Initialize client
client = AcumaticaClient()

# Get recent completed orders
end_date = datetime.now()
start_date = end_date - timedelta(days=30)

options = QueryOptions(
    filter=(F.Status == "Completed") & (F.Date >= start_date),
    expand=["Details", "Customer"],
    orderby=["Date desc"]
)
completed_orders = client.sales_orders.get_list(options=options)

# Process each order
for order in completed_orders:
    # Check if invoice already exists
    invoice_check = QueryOptions(
        filter=(F.CustomerID == order.CustomerID) &
               (F.Description.contains(order.OrderNbr))
    )
    existing = client.invoices.get_list(options=invoice_check)

    if existing:
        print(f"Invoice exists for order {order.OrderNbr}")
        continue

    # Create invoice from order
    invoice = client.models.Invoice(
        CustomerID=order.CustomerID,
        Date=datetime.now().strftime('%Y-%m-%d'),
        Description=f"Invoice for Order {order.OrderNbr}",
        Details=[
            client.models.InvoiceDetail(
                InventoryID=detail.InventoryID,
                Quantity=detail.Quantity,
                UnitPrice=detail.UnitPrice
            )
            for detail in order.Details
        ]
    )

    # Create and release invoice
    created = client.invoices.put_entity(invoice)
    print(f"Created invoice {created.RefNbr} for order {order.OrderNbr}")

    if hasattr(client.invoices, 'invoke_action_release'):
        client.invoices.invoke_action_release(entity=created)
        print(f"Released invoice {created.RefNbr}")`;

useSeoMeta({
  title: 'Quickstart Guide | Easy-Acumatica Python',
  description: 'Get started with Easy-Acumatica v0.5.4. Learn basic CRUD operations, querying, and working with the Acumatica REST API.',
  ogTitle: 'Easy-Acumatica Python Quickstart Guide',
  ogDescription: 'Step-by-step guide to using Easy-Acumatica Python library for Acumatica ERP integration. CRUD operations, OData queries, and more.',
  ogType: 'article',
  ogUrl: 'https://www.easyacumatica.com/python/quickstart',
  robots: 'index, follow',
  keywords: 'Acumatica Python tutorial, Easy-Acumatica quickstart, Acumatica CRUD, OData tutorial, Python ERP integration'
});

useSchemaOrg([
  {
    '@type': 'HowTo',
    'name': 'How to Get Started with Easy-Acumatica Python',
    'description': 'Step-by-step guide to using Easy-Acumatica Python library for Acumatica ERP integration',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Install Easy-Acumatica',
        'text': 'Install the package using pip: pip install easy-acumatica'
      },
      {
        '@type': 'HowToStep',
        'name': 'Configure credentials',
        'text': 'Create a .env file with your Acumatica credentials'
      },
      {
        '@type': 'HowToStep',
        'name': 'Initialize client',
        'text': 'Create an AcumaticaClient instance to connect to your instance'
      },
      {
        '@type': 'HowToStep',
        'name': 'Perform CRUD operations',
        'text': 'Use the dynamically generated services for create, read, update, and delete operations'
      }
    ]
  }
]);
</script>

<style scoped>
.quickstart-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #00695c 0%, #00897b 100%);
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

.doc-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

/* Main Content */
.main-content {
  background: #f8f9fa;
  min-height: 100vh;
}

.content-section {
  scroll-margin-top: 80px;
}

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 100px;
}
</style>
