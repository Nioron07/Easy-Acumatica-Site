<template>
  <div class="quickstart-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-gradient"></div>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <v-chip color="primary" variant="flat" size="small" class="mb-4">
                5 minute setup
              </v-chip>
              <h1 class="hero-title">Quick Start Guide</h1>
              <p class="hero-subtitle">
                Get up and running with Easy-Acumatica v0.4.x in minutes.<br>
                Experience the power of dynamic API generation.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </section>

    <!-- Prerequisites -->
    <section class="prerequisites-section">
      <v-container>
        <v-row>
          <v-col cols="12" lg="10" offset-lg="1">
            <v-alert 
              type="info" 
              variant="tonal" 
              border="start"
              class="prerequisites-alert"
            >
              <v-alert-title class="font-weight-bold mb-2">
                Prerequisites
              </v-alert-title>
              <ul class="prerequisites-list">
                <li>Python 3.7 or higher installed</li>
                <li>Acumatica instance with API access enabled</li>
                <li>API credentials (username, password, tenant, branch)</li>
                <li>Easy-Acumatica v0.4.x installed (<code class="inline-code">pip install easy-acumatica</code>)</li>
              </ul>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Main Content -->
    <v-container fluid class="content-container">
      <!-- Step 1: Initialize Client -->
      <section class="step-section" id="step-1">
        <v-container>
          <div class="step-header">
            <div class="step-number">1</div>
            <div class="step-info">
              <h2 class="step-title">Initialize the Dynamic Client</h2>
              <p class="step-description">
                Create an AcumaticaClient instance that automatically discovers your API structure
              </p>
            </div>
          </div>
          
          <div class="step-content">
            <v-row>
              <v-col cols="12" xl="7">
                <CodeSnippet 
                  :code="initCode" 
                  language="python" 
                />
              </v-col>
              <v-col cols="12" xl="5">
                <div class="explanation-card">
                  <h3 class="explanation-title">
                    What's Happening?
                  </h3>
                  <p class="mb-4">
                    When you initialize the client, it automatically:
                  </p>
                  <ul class="feature-list">
                    <li>Discovers all available endpoints</li>
                    <li>Generates models for every entity</li>
                    <li>Creates service methods dynamically</li>
                    <li>Includes your custom fields</li>
                  </ul>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </section>

      <!-- Step 2: Explore Dynamic Services -->
      <section class="step-section" id="step-2">
        <v-container>
          <div class="step-header">
            <div class="step-number">2</div>
            <div class="step-info">
              <h2 class="step-title">Explore Dynamic Services</h2>
              <p class="step-description">
                Services are automatically attached to your client based on available endpoints
              </p>
            </div>
          </div>
          
          <div class="step-content">
            <v-row>
              <v-col cols="12" xl="8">
                <CodeSnippet
                  :code="discoverCode" 
                  language="python" 
                />
                
                <div class="service-examples mt-6">
                  <h3 class="mb-4">Common Service Operations</h3>
                  <v-tabs v-model="selectedServiceTab" class="service-tabs">
                    <v-tab value="customers">
                      Customers
                    </v-tab>
                    <v-tab value="invoices">
                      Invoices
                    </v-tab>
                    <v-tab value="sales_orders">
                      Sales Orders
                    </v-tab>
                  </v-tabs>
                  
                  <v-window v-model="selectedServiceTab" class="mt-4">
                    <v-window-item value="customers">
                      <CodeSnippet
                        :code="customerServiceCode" 
                        language="python" 
                      />
                    </v-window-item>
                    <v-window-item value="invoices">
                      <CodeSnippet
                        :code="invoiceServiceCode" 
                        language="python" 
                      />
                    </v-window-item>
                    <v-window-item value="sales_orders">
                      <CodeSnippet
                        :code="salesOrderServiceCode" 
                        language="python" 
                      />
                    </v-window-item>
                  </v-window>
                </div>
              </v-col>
              
              <v-col cols="12" xl="4">
                <div class="tip-card">
                  <h3 class="tip-title">
                    Pro Tips
                  </h3>
                  <ul class="tip-list">
                    <li>Service names match your endpoint names (pluralized)</li>
                    <li>All CRUD operations are available automatically</li>
                    <li>Custom actions from your instance are included</li>
                    <li>Type hints provide full IDE support</li>
                  </ul>
                </div>
                
                <div class="method-reference mt-6">
                  <h4 class="mb-3">Available Methods</h4>
                  <v-list density="compact" class="method-list">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon size="small" color="primary">mdi-function</v-icon>
                      </template>
                      <v-list-item-title><code>get_list(**params)</code></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon size="small" color="primary">mdi-function</v-icon>
                      </template>
                      <v-list-item-title><code>get_by_id(id)</code></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon size="small" color="primary">mdi-function</v-icon>
                      </template>
                      <v-list-item-title><code>get_by_keys(**keys)</code></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon size="small" color="primary">mdi-function</v-icon>
                      </template>
                      <v-list-item-title><code>put_entity(entity)</code></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon size="small" color="primary">mdi-function</v-icon>
                      </template>
                      <v-list-item-title><code>delete_by_id(id)</code></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon size="small" color="primary">mdi-function</v-icon>
                      </template>
                      <v-list-item-title><code>invoke_action_*()</code></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </section>

      <!-- Step 3: Work with Dynamic Models -->
      <section class="step-section" id="step-3">
        <v-container>
          <div class="step-header">
            <div class="step-number">3</div>
            <div class="step-info">
              <h2 class="step-title">Work with Dynamic Models</h2>
              <p class="step-description">
                Models are generated from your instance schema with full type safety
              </p>
            </div>
          </div>
          
          <div class="step-content">
            <v-row>
              <v-col cols="12">
                <div class="model-showcase">
                  <v-tabs v-model="modelTab" class="model-tabs">
                    <v-tab value="create">
                      Create
                    </v-tab>
                    <v-tab value="update">
                      Update
                    </v-tab>
                    <v-tab value="complex">
                      Complex
                    </v-tab>
                  </v-tabs>
                  
                  <v-window v-model="modelTab" class="mt-4">
                    <v-window-item value="create">
                      <v-row>
                        <v-col cols="12" xl="8">
                          <CodeSnippet
                            :code="createModelCode" 
                            language="python" 
                          />
                        </v-col>
                        <v-col cols="12" xl="4">
                          <div class="model-info">
                            <h4>Model Features</h4>
                            <ul>
                              <li>Type-safe field access</li>
                              <li>Validation built-in</li>
                              <li>Custom fields included</li>
                              <li>IDE autocomplete</li>
                            </ul>
                          </div>
                        </v-col>
                      </v-row>
                    </v-window-item>
                    
                    <v-window-item value="update">
                      <v-row>
                        <v-col cols="12" xl="8">
                          <CodeSnippet
                            :code="updateModelCode" 
                            language="python" 
                          />
                        </v-col>
                        <v-col cols="12" xl="4">
                          <div class="model-info">
                            <h4>Partial Updates</h4>
                            <p>Only send fields you want to change - the API handles the rest.</p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-window-item>
                    
                    <v-window-item value="complex">
                      <CodeSnippet
                        :code="complexModelCode" 
                        language="python" 
                      />
                    </v-window-item>
                  </v-window>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </section>

      <!-- Step 4: Query with OData -->
      <section class="step-section" id="step-4">
        <v-container>
          <div class="step-header">
            <div class="step-number">4</div>
            <div class="step-info">
              <h2 class="step-title">Query with OData</h2>
              <p class="step-description">
                Use powerful OData query wrappers for filtering, sorting, and pagination
              </p>
            </div>
          </div>
          
          <div class="step-content">
            <v-row>
              <v-col cols="12">
                <div class="odata-intro mb-6">
                  <CodeSnippet
                    :code="odataIntroCode" 
                    language="python" 
                  />
                </div>

                <div class="odata-grid">
                  <v-row>
                    <v-col 
                      v-for="example in odataExamples" 
                      :key="example.title"
                      cols="12" 
                      lg="6"
                    >
                      <div class="odata-card">
                        <h4 class="odata-title">{{ example.title }}</h4>
                        <p class="odata-description">{{ example.description }}</p>
                        <CodeSnippet
                          :code="example.code" 
                          language="python" 
                        />
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </section>

      <!-- Complete Example -->
      <section class="complete-example-section">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="example-card">
                <h2 class="example-title">
                  Complete Example
                </h2>
                <p class="example-subtitle">
                  Putting it all together - a real-world integration
                </p>
                
                <CodeSnippet
                  :code="completeExampleCode" 
                  language="python" 
                />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-container>

    <!-- Next Steps -->
    <section class="next-steps-section">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="section-title">What's Next?</h2>
            <p class="section-subtitle">Dive deeper into Easy-Acumatica's capabilities</p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col 
            v-for="resource in nextResources" 
            :key="resource.title"
            cols="12" 
            md="4"
          >
            <v-card 
              class="resource-card h-100"
              :to="resource.link"
              variant="flat"
              hover
            >
              <v-card-item>
                <div class="resource-icon mb-4">
                  <v-icon :icon="resource.icon" size="32"></v-icon>
                </div>
                <v-card-title class="text-h5 font-weight-bold mb-2">
                  {{ resource.title }}
                </v-card-title>
                <v-card-subtitle class="text-body-1">
                  {{ resource.description }}
                </v-card-subtitle>
              </v-card-item>
              <v-card-actions>
                <v-spacer />
                <v-btn variant="text" color="primary">
                  Explore
                  <v-icon end size="small">mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '../../components/CodeSnippet.vue';

// State
const selectedServiceTab = ref('customers');
const modelTab = ref('create');

// Code examples
const initCode = `from easy_acumatica import AcumaticaClient

# Initialize the client - it discovers everything automatically!
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password",
    tenant="YourTenant",
    branch="YourBranch"
)

# That's it! Your client is ready with all services and models`;

const discoverCode = `# See what services were dynamically created
available_services = [
    attr for attr in dir(client) 
    if not attr.startswith('_') and hasattr(getattr(client, attr), 'get_list')
]
print(f"Found {len(available_services)} services:", available_services)

# Check available models
available_models = [
    name for name in dir(client.models) 
    if not name.startswith('_')
]
print(f"Generated {len(available_models)} models:", available_models[:10], "...")`;

const customerServiceCode = `from easy_acumatica import QueryOptions, F

# Get all customers
customers = client.customers.get_list()

# Get a specific customer by ID
customer = client.customers.get_by_id("CUST001")

# Get customer by key fields
customer = client.customers.get_by_keys(CustomerID="ABCCOMP")

# Query customers with QueryOptions
options = QueryOptions(
    filter=F.Status == "Active",
    select=["CustomerID", "CustomerName", "Email"],
    top=50
)
active_customers = client.customers.get_list(options=options)

# Create a new customer
new_customer = client.models.Customer(
    CustomerID="NEWCUST01",
    CustomerName="New Customer Inc.",
    Email="contact@newcustomer.com",
    Status="Active"
)
result = client.customers.put_entity(new_customer)

# Delete a customer
client.customers.delete_by_id("OLDCUST01")`;

const invoiceServiceCode = `from easy_acumatica import QueryOptions, F
from datetime import datetime

# Get recent invoices with QueryOptions
options = QueryOptions(
    filter=F.Date >= datetime(2024, 1, 1),
    orderby=["Date desc"],
    top=20
)
recent_invoices = client.invoices.get_list(options=options)

# Get invoice by reference number
invoice = client.invoices.get_by_keys(RefNbr="INV-001234")

# Get invoices with details expanded
options = QueryOptions(
    filter=F.CustomerID == "ABCCOMP",
    expand=["Details"]
)
customer_invoices = client.invoices.get_list(options=options)

# Create an invoice with details
invoice = client.models.Invoice(
    CustomerID="ABCCOMP",
    Date="2024-03-15",
    Description="March Services",
    Details=[
        client.models.InvoiceDetail(
            InventoryID="CONSULT",
            Quantity=10,
            UnitPrice=150.00
        )
    ]
)
created_invoice = client.invoices.put_entity(invoice)

# Apply a custom action if available
if hasattr(client.invoices, 'invoke_action_release'):
    client.invoices.invoke_action_release(entity=created_invoice)`;

const salesOrderServiceCode = `from easy_acumatica import QueryOptions, F

# Get open sales orders with details and customer
options = QueryOptions(
    filter=F.Status == "Open",
    expand=["Details", "Customer"],
    orderby=["Date desc"]
)
open_orders = client.sales_orders.get_list(options=options)

# Create a sales order
order = client.models.SalesOrder(
    CustomerID="ABCCOMP",
    Date="2024-03-15",
    RequestedOn="2024-03-20",
    Description="Q1 Widget Order",
    Details=[
        client.models.SalesOrderDetail(
            InventoryID="WIDGET",
            Quantity=100,
            UnitPrice=49.99
        )
    ]
)
created_order = client.sales_orders.put_entity(order)

# Execute order actions
if hasattr(client.sales_orders, 'invoke_action_submit_order'):
    client.sales_orders.invoke_action_submit_order(entity=created_order)`;

const createModelCode = `# Models are dynamically generated with all your fields
new_customer = client.models.Customer(
    CustomerID="CUST001",
    CustomerName="Acme Corporation",
    Email="contact@acmecorp.com",
    Phone="555-0123",
    # Address fields
    AddressLine1="123 Main Street",
    City="New York",
    State="NY",
    PostalCode="10001",
    # Your custom fields are here too!
    UsrCustomField="Value"  # If it exists in your instance
)

# Create the customer
result = client.customers.put_entity(new_customer)
print(f"Created customer: {result.CustomerID}")`;

const updateModelCode = `# Fetch existing invoice
invoice = client.invoices.get_by_id("INV-001234")

# Update specific fields
invoice.Description = "Updated description"
invoice.DueDate = "2024-12-31"

# Or create a partial update
update_data = client.models.Invoice(
    RefNbr="INV-001234",  # Key field required
    Description="Updated via API",
    Terms="NET30"
)

# Apply the update
updated = client.invoices.put_entity(update_data)`;

const complexModelCode = `# Create a complex sales order with multiple details and shipping info
sales_order = client.models.SalesOrder(
    CustomerID="ABCCOMP",
    Date="2024-03-15",
    Description="Q1 2024 Bulk Order",
    RequestedOn="2024-03-20",
    # Order details with different items
    Details=[
        client.models.SalesOrderDetail(
            InventoryID="WIDGET-A",
            Quantity=100,
            UnitPrice=49.99,
            DiscountPercent=10.0
        ),
        client.models.SalesOrderDetail(
            InventoryID="WIDGET-B",
            Quantity=50,
            UnitPrice=79.99,
            DiscountPercent=5.0
        ),
        client.models.SalesOrderDetail(
            InventoryID="SERVICE-INSTALL",
            Quantity=1,
            UnitPrice=500.00
        )
    ],
    # Shipping address (if different from default)
    ShipToAddressLine1="456 Corporate Blvd",
    ShipToCity="Chicago",
    ShipToState="IL",
    ShipToPostalCode="60601"
)

# Create the order
created_order = client.sales_orders.put_entity(sales_order)
print(f"Created order {created_order.OrderNbr} with {len(created_order.Details)} items")`;

const odataIntroCode = `from easy_acumatica import QueryOptions, F, CustomField

# F is a factory for creating filter expressions
# Use it to build complex, type-safe filters

# Simple filter
filter1 = F.Status == "Active"

# Complex filter with logical operators
filter2 = (F.Amount > 1000) & (F.Status == "Active") | (F.Priority == 1)

# String functions
filter3 = F.CustomerName.startswith("ABC") & F.Email.contains("@company.com")

# Date functions
filter4 = F.CreatedDate.year() == 2024

# Custom fields
custom_field = CustomField.field("ItemSettings", "UsrRepairItemType", "InventoryItem")
options = QueryOptions(
    filter=F.Status == "Active",
    custom=[custom_field],
    expand=["InventoryItem"]  # Automatically added
)`;

const odataExamples = ref([
  {
    title: 'Filtering',
    description: 'Build complex filters with the F factory',
    code: `from easy_acumatica import QueryOptions, F

# Simple equality
options = QueryOptions(filter=F.State == "CA")

# Multiple conditions with logical operators
options = QueryOptions(
    filter=(F.CustomerID == "ABC") & (F.Amount > 1000) & (F.Status != "Cancelled")
)

# String functions
options = QueryOptions(
    filter=F.CustomerName.tolower().startswith("acme") & F.Email.endswith("@corp.com")
)

# In operator (v4)
options = QueryOptions(
    filter=F.Status.in_(["Active", "Pending", "Processing"])
)`
  },
  {
    title: 'Selection & Expansion',
    description: 'Control what fields and related data to retrieve',
    code: `from easy_acumatica import QueryOptions

# Select specific fields only
options = QueryOptions(
    select=["CustomerID", "CustomerName", "Email", "Phone"]
)

# Expand related entities
options = QueryOptions(
    expand=["Details", "Customer", "ShippingAddress"]
)

# Combine select and expand
options = QueryOptions(
    select=["OrderNbr", "Date", "Total"],
    expand=["Details", "Customer"],
    filter=F.Status == "Open"
)`
  },
  {
    title: 'Sorting & Pagination',
    description: 'Order results and implement paging',
    code: `from easy_acumatica import QueryOptions

# Sort by single field
options = QueryOptions(orderby="Date desc")

# Sort by multiple fields
options = QueryOptions(orderby=["Priority asc", "Date desc"])

# Pagination
page_size = 20
page = 3
options = QueryOptions(
    top=page_size,
    skip=(page - 1) * page_size,
    orderby="CustomerName"
)`
  },
  {
    title: 'Custom Fields',
    description: 'Include custom fields in your queries',
    code: `from easy_acumatica import QueryOptions, CustomField

# Define custom fields
repair_type = CustomField.field("ItemSettings", "UsrRepairItemType", "InventoryItem")
custom_attr = CustomField.attribute("Document", "OPERATSYST")

# Use in query options
options = QueryOptions(
    filter=F.Status == "Active",
    custom=[repair_type, custom_attr],
    select=["InventoryID", "Description"]
)

# The expand parameter is automatically updated to include "InventoryItem"`
  },
]);

const completeExampleCode = `from easy_acumatica import AcumaticaClient, QueryOptions, F
from datetime import datetime, timedelta

# Initialize client
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="api_user",
    password="secure_password",
    tenant="Company",
    branch="MAIN"
)

def process_monthly_orders():
    """Process orders from the last month and create invoices"""
    
    # Calculate date range
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    
    # Build query options for completed orders
    order_options = QueryOptions(
        filter=(F.Status == "Completed") & (F.Date >= start_date),
        expand=["Details", "Customer"],
        orderby=["Date desc"]
    )
    
    # Get completed orders
    completed_orders = client.sales_orders.get_list(options=order_options)
    print(f"Found {len(completed_orders)} completed orders")
    
    # Process each order
    for order in completed_orders:
        try:
            # Check if invoice already exists
            invoice_options = QueryOptions(
                filter=(F.CustomerID == order.CustomerID) & 
                       (F.Description == f"Order {order.OrderNbr}")
            )
            existing_invoices = client.invoices.get_list(options=invoice_options)
            
            if existing_invoices:
                print(f"Invoice already exists for order {order.OrderNbr}")
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
                        UnitPrice=detail.UnitPrice,
                        DiscountPercent=detail.DiscountPercent
                    )
                    for detail in order.Details
                ]
            )
            
            # Create the invoice
            created_invoice = client.invoices.put_entity(invoice)
            print(f"Created invoice {created_invoice.RefNbr} for order {order.OrderNbr}")
            
            # Optional: Release the invoice if action is available
            if hasattr(client.invoices, 'invoke_action_release'):
                client.invoices.invoke_action_release(entity=created_invoice)
                print(f"Released invoice {created_invoice.RefNbr}")
                
        except Exception as e:
            print(f"Error processing order {order.OrderNbr}: {str(e)}")
            continue
    
    return completed_orders

# Run the process
if __name__ == "__main__":
    orders = process_monthly_orders()
    print(f"Processing complete. Processed {len(orders)} orders.")`;

const nextResources = ref([
  {
    icon: 'mdi-connection',
    title: 'AcumaticaClient Deep Dive',
    description: 'Master the client configuration, session management, and advanced features',
    link: '/python/client'
  },
  {
    icon: 'mdi-api',
    title: 'Dynamic Services Guide',
    description: 'Explore all available services with detailed examples and best practices',
    link: '/python/dynamic-services'
  },
  {
    icon: 'mdi-cube-outline',
    title: 'Model Factory Reference',
    description: 'Learn how models are generated and how to work with complex entities',
    link: '/python/model-factory'
  }
]);

// SEO
useSeoMeta({
  title: 'Quick Start Guide | Easy-Acumatica v0.4.x',
  description: 'Get started with Easy-Acumatica v0.4.x in 5 minutes. Learn how to use the dynamic API client, services, and models.',
  ogTitle: 'Easy-Acumatica v0.4.x Quick Start',
  ogDescription: 'Start building with Easy-Acumatica\'s dynamic Python API in minutes',
});
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  padding: 6rem 0 4rem;
  background: linear-gradient(135deg, #0a0e27 0%, #1a237e 100%);
  overflow: hidden;
}

.hero-gradient {
  position: absolute;
  top: -50%;
  right: -25%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(94, 53, 177, 0.3) 0%, transparent 70%);
  animation: pulse 15s ease-in-out infinite;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
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

/* Floating Shapes */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: #5e35b1;
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: #7e57c2;
  top: 60%;
  right: -5%;
  animation-delay: 5s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: #9575cd;
  bottom: 10%;
  left: 30%;
  animation-delay: 10s;
}

/* Prerequisites Section */
.prerequisites-section {
  padding: 2rem 0;
  background: #f5f5f5;
}

.prerequisites-alert {
  background: white;
  border-left: 4px solid #1976d2;
}

.prerequisites-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.prerequisites-list li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
}

.prerequisites-list li::before {
  content: "✓";
  color: #4caf50;
  font-weight: bold;
  margin-right: 0.75rem;
}

/* Content Container */
.content-container {
  padding: 4rem 0;
  max-width: 1400px;
}

/* Step Sections */
.step-section {
  margin-bottom: 5rem;
  scroll-margin-top: 80px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.step-number {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.step-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a237e;
  margin: 0;
}

.step-description {
  color: #666;
  margin: 0;
}

.step-content {
  padding-left: 84px;
}

/* Inline Code */
.inline-code {
  background: #e3f2fd;
  padding: 0.2rem 0.5rem;
  border-radius: 0.375rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
  color: #1565c0;
}

/* Explanation Cards */
.explanation-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: 100%;
}

.explanation-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a237e;
  margin-bottom: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-list li::before {
  content: "✓";
  color: #4caf50;
  font-weight: bold;
  margin-right: 0.5rem;
}

/* Service Examples */
.service-tabs {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.service-tabs :deep(.v-tab) {
  text-transform: none;
  font-weight: 500;
}

/* Tip Card */
.tip-card {
  background: #fff8e1;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #ffa726;
}

.tip-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e65100;
  margin-bottom: 1rem;
}

.tip-list {
  list-style: none;
  padding: 0;
}

.tip-list li {
  padding: 0.5rem 0;
  color: #bf360c;
}

.tip-list li::before {
  content: "→";
  margin-right: 0.5rem;
}

/* Method Reference */
.method-reference {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.method-list {
  background: #f5f5f5;
  border-radius: 8px;
}

/* Model Showcase */
.model-showcase {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.model-tabs {
  margin-bottom: 1.5rem;
}

.model-info {
  background: #e8eaf6;
  border-radius: 12px;
  padding: 1.5rem;
  height: 100%;
}

.model-info h4 {
  color: #5e35b1;
  margin-bottom: 1rem;
}

.model-info ul {
  list-style: none;
  padding: 0;
}

.model-info ul li {
  padding: 0.5rem 0;
  color: #4527a0;
}

.model-info ul li::before {
  content: "✓";
  margin-right: 0.5rem;
  color: #7e57c2;
}

/* OData Grid */
.odata-intro {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.odata-grid {
  margin-top: 2rem;
}

.odata-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  height: 100%;
}

.odata-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.odata-description {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

/* Complete Example Section */
.complete-example-section {
  background: #f5f5f5;
  padding: 3rem;
  border-radius: 16px;
  margin: 4rem 0;
}

.example-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.example-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.example-subtitle {
  color: #666;
  margin-bottom: 2rem;
}

/* Next Steps Section */
.next-steps-section {
  background: linear-gradient(135deg, #0a0e27 0%, #1a237e 100%);
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
}

.resource-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.resource-icon {
  width: 60px;
  height: 60px;
  background: #e8eaf6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5e35b1;
}
/* Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
  66% { transform: translateY(10px) translateX(-10px) rotate(240deg); }
}

/* Responsive */
@media (max-width: 1280px) {
  .step-content {
    padding-left: 0;
  }
}

@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .step-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>