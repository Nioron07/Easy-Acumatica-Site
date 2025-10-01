<template>
  <div class="model-factory-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Dynamic Models</h1>
              <p class="hero-subtitle">
                Type-safe Python dataclasses generated from your Acumatica schema
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
                  When you initialize the <NuxtLink to="/python/client">AcumaticaClient</NuxtLink>, it automatically generates
                  Python dataclass models for every entity in your Acumatica instance. These models provide type hints, IDE
                  autocomplete, and validation for working with Acumatica data.
                </p>
                <CodeSnippet :code="overviewExample" language="python" />
              </section>

              <!-- Accessing Models -->
              <section id="accessing-models" class="doc-section">
                <h2>Accessing Models</h2>
                <p>Models are accessed via <code>client.models</code> using the entity name:</p>
                <CodeSnippet :code="accessingExample" language="python" />
              </section>

              <!-- Creating Entities -->
              <section id="creating-entities" class="doc-section">
                <h2>Creating Entities</h2>
                <p>Instantiate models with field values as keyword arguments:</p>
                <CodeSnippet :code="creatingExample" language="python" />
              </section>

              <!-- Field Types -->
              <section id="field-types" class="doc-section">
                <h2>Field Types</h2>
                <p>Models use Python type hints that correspond to Acumatica field types:</p>
                <CodeSnippet :code="fieldTypesExample" language="python" />
                <p class="note">
                  Most fields are <code>Optional</code> to support partial updates and missing data.
                  Only explicitly required fields in the schema are non-optional.
                </p>
              </section>

              <!-- Complex Fields -->
              <section id="complex-fields" class="doc-section">
                <h2>Complex Fields</h2>
                <p>Entities with detail lines or related objects use nested models:</p>

                <h3>Detail Lines</h3>
                <CodeSnippet :code="detailLinesExample" language="python" />

                <h3>Related Entities</h3>
                <CodeSnippet :code="relatedEntitiesExample" language="python" />
              </section>

              <!-- Custom Fields -->
              <section id="custom-fields" class="doc-section">
                <h2>Custom Fields</h2>
                <p>
                  Custom fields defined in your Acumatica instance are included in the generated models.
                  They appear alongside standard fields with appropriate type hints:
                </p>
                <CodeSnippet :code="customFieldsExample" language="python" />
              </section>

              <!-- Partial Updates -->
              <section id="partial-updates" class="doc-section">
                <h2>Partial Updates</h2>
                <p>
                  Models support partial updates - you only need to provide the key fields and the fields you want to change:
                </p>
                <CodeSnippet :code="partialUpdateExample" language="python" />
              </section>

              <!-- Using with Services -->
              <section id="using-with-services" class="doc-section">
                <h2>Using with Services</h2>
                <p>
                  Models work seamlessly with <NuxtLink to="/python/service-factory">dynamic services</NuxtLink>.
                  Services accept both model instances and plain dictionaries:
                </p>
                <CodeSnippet :code="serviceExample" language="python" />
              </section>

              <!-- Type Hints and IDE Support -->
              <section id="type-hints" class="doc-section">
                <h2>Type Hints and IDE Support</h2>
                <p>
                  Models provide full type hints for IDE autocomplete and type checking. Generate stub files
                  for enhanced IDE support:
                </p>
                <CodeSnippet :code="stubsExample" language="python" />
                <p class="note">
                  Stub generation creates <code>.pyi</code> files that provide type information to IDEs like
                  VSCode and PyCharm without requiring runtime model generation.
                </p>
              </section>

              <!-- Data Validation -->
              <section id="data-validation" class="doc-section">
                <h2>Data Validation</h2>
                <p>Models perform basic type validation when instantiated:</p>
                <CodeSnippet :code="validationExample" language="python" />
              </section>

              <!-- Converting to Dictionaries -->
              <section id="converting" class="doc-section">
                <h2>Converting to Dictionaries</h2>
                <p>Use the <code>build()</code> method to convert models to API-ready dictionaries:</p>
                <CodeSnippet :code="buildExample" language="python" />
              </section>

              <!-- Model Discovery -->
              <section id="discovery" class="doc-section">
                <h2>Model Discovery</h2>
                <p>List all available models:</p>
                <CodeSnippet :code="discoveryExample" language="python" />
              </section>

              <!-- Best Practices -->
              <section id="best-practices" class="doc-section">
                <h2>Best Practices</h2>
                <ul>
                  <li>Use models for better type safety and IDE support</li>
                  <li>Generate stub files once after connecting to enable full autocomplete</li>
                  <li>Leverage optional fields for partial updates</li>
                  <li>Use <code>build()</code> when you need to inspect the API payload</li>
                  <li>Models are thread-safe and can be shared across threads</li>
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
  { id: 'overview', title: 'Overview', icon: 'mdi-information' },
  { id: 'accessing-models', title: 'Accessing Models', icon: 'mdi-folder-open' },
  { id: 'creating-entities', title: 'Creating Entities', icon: 'mdi-plus-box' },
  { id: 'field-types', title: 'Field Types', icon: 'mdi-format-list-bulleted-type' },
  { id: 'complex-fields', title: 'Complex Fields', icon: 'mdi-sitemap' },
  { id: 'custom-fields', title: 'Custom Fields', icon: 'mdi-puzzle' },
  { id: 'partial-updates', title: 'Partial Updates', icon: 'mdi-pencil' },
  { id: 'using-with-services', title: 'Using with Services', icon: 'mdi-api' },
  { id: 'type-hints', title: 'Type Hints & IDE Support', icon: 'mdi-code-tags' },
  { id: 'data-validation', title: 'Data Validation', icon: 'mdi-check-circle' },
  { id: 'converting', title: 'Converting to Dictionaries', icon: 'mdi-swap-horizontal' },
  { id: 'discovery', title: 'Model Discovery', icon: 'mdi-magnify' },
  { id: 'best-practices', title: 'Best Practices', icon: 'mdi-star' },
]);

const overviewExample = `from easy_acumatica import AcumaticaClient

# Initialize client
client = AcumaticaClient()

# Models are automatically generated and available
customer = client.models.Customer(
    CustomerID="CUST001",
    CustomerName="Acme Corporation"
)

# Create in Acumatica
created = client.customers.put_entity(customer)`;

const accessingExample = `# Access models via client.models
Customer = client.models.Customer
Invoice = client.models.Invoice
SalesOrder = client.models.SalesOrder

# Check if a model exists
if hasattr(client.models, 'Customer'):
    print("Customer model available")`;

const creatingExample = `# Simple entity
customer = client.models.Customer(
    CustomerID="CUST001",
    CustomerName="Acme Corporation",
    Email="contact@acme.com",
    Phone="555-0123"
)

# Only required fields need values
# Optional fields can be omitted
minimal_customer = client.models.Customer(
    CustomerID="CUST002",
    CustomerName="Minimal Corp"
)`;

const fieldTypesExample = `from datetime import datetime

# String fields
customer = client.models.Customer(
    CustomerID="CUST001",  # str
    CustomerName="Acme Corp",  # str
    Email="contact@acme.com"  # Optional[str]
)

# Numeric fields
invoice = client.models.Invoice(
    RefNbr="INV001",
    Amount=1500.50,  # float
    TaxTotal=150.05  # Optional[float]
)

# Date/DateTime fields
order = client.models.SalesOrder(
    OrderNbr="SO001",
    Date=datetime.now(),  # datetime
    RequestedOn=datetime(2024, 3, 15)  # Optional[datetime]
)

# Boolean fields
contact = client.models.Contact(
    DisplayName="John Doe",
    Active=True  # bool
)`;

const detailLinesExample = `# Create invoice with detail lines
invoice = client.models.Invoice(
    CustomerID="CUST001",
    Date=datetime.now(),
    Description="March Services",
    Details=[
        client.models.InvoiceDetail(
            InventoryID="SERVICE01",
            Description="Consulting",
            Quantity=10,
            UnitPrice=150.00
        ),
        client.models.InvoiceDetail(
            InventoryID="SERVICE02",
            Description="Support",
            Quantity=5,
            UnitPrice=100.00
        )
    ]
)

created = client.invoices.put_entity(invoice)`;

const relatedEntitiesExample = `# Some entities include related objects
sales_order = client.models.SalesOrder(
    CustomerID="CUST001",
    Date=datetime.now(),
    # Shipping address as nested object
    ShipToAddress=client.models.Address(
        AddressLine1="123 Main St",
        City="New York",
        State="NY",
        PostalCode="10001"
    ),
    Details=[...]
)`;

const customFieldsExample = `# Custom fields appear alongside standard fields
# Assuming "UsrCustomerTier" is a custom field in your instance

customer = client.models.Customer(
    CustomerID="CUST001",
    CustomerName="Acme Corp",
    # Standard field
    CreditLimit=50000.00,
    # Custom field (if exists in your instance)
    UsrCustomerTier="Gold",
    UsrAccountManager="John Smith"
)`;

const partialUpdateExample = `# Partial update - only provide fields to change
update = client.models.Customer(
    CustomerID="CUST001",  # Required: identifies the record
    Email="newemail@acme.com",  # Only field we want to update
    Phone="555-9999"  # And this one
)

# CreditLimit, CustomerName, etc. are not affected
updated = client.customers.put_entity(update)`;

const serviceExample = `# Using a model instance
customer = client.models.Customer(
    CustomerID="CUST001",
    CustomerName="Acme Corp"
)
created = client.customers.put_entity(customer)

# Using a plain dictionary (also works)
customer_dict = {
    "CustomerID": {"value": "CUST002"},
    "CustomerName": {"value": "Other Corp"}
}
created = client.customers.put_entity(customer_dict)

# Models are preferred for type safety`;

const stubsExample = `from easy_acumatica import AcumaticaClient
from easy_acumatica.generate_stubs import generate_stubs_from_client

# Initialize client
client = AcumaticaClient()

# Generate stub files for IDE support
generate_stubs_from_client(client)

# Now your IDE will provide autocomplete for all models
# Example: typing "client.models." will show all available models
# Example: typing "client.models.Customer(" will show all fields`;

const validationExample = `# Type validation happens at instantiation
try:
    customer = client.models.Customer(
        CustomerID="CUST001",
        CustomerName=12345  # Wrong type - should be string
    )
except TypeError as e:
    print(f"Type error: {e}")

# Field name validation
try:
    customer = client.models.Customer(
        CustomerID="CUST001",
        NonExistentField="value"  # Unknown field
    )
except TypeError as e:
    print(f"Unknown field: {e}")`;

const buildExample = `# Create a model
customer = client.models.Customer(
    CustomerID="CUST001",
    CustomerName="Acme Corp",
    Email="contact@acme.com"
)

# Convert to API-ready dictionary
payload = customer.build()
print(payload)
# {
#     "CustomerID": {"value": "CUST001"},
#     "CustomerName": {"value": "Acme Corp"},
#     "Email": {"value": "contact@acme.com"}
# }

# Useful for debugging what will be sent to the API`;

const discoveryExample = `# List all available models using built-in method
models = client.list_models()
print(f"Found {len(models)} models")
print("Sample models:", models[:10])

# Get detailed model information
model_info = client.get_model_info('Customer')
print(f"Customer fields: {model_info['fields']}")
print(f"Field count: {model_info['field_count']}")

# Get model class directly
Customer = client.models.Customer

# Inspect model fields with dataclasses
import dataclasses
fields = dataclasses.fields(Customer)
for field in fields:
    print(f"{field.name}: {field.type}")`;

useSeoMeta({
  title: 'Dynamic Models | Easy-Acumatica Python',
  description: 'Learn how to use automatically generated Python dataclass models for type-safe Acumatica data operations.',
});
</script>

<style scoped>
.model-factory-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%);
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

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 100px;
}
</style>
