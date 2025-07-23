<template>
  <div class="quickstart-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-gradient"></div>
      <div class="animated-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
      
      <v-container class="hero-content">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <div class="hero-badge mb-4">
              <v-chip color="white" variant="outlined" size="large" class="hero-chip">
                <v-icon start>mdi-rocket-launch</v-icon>
                5 Minutes to First API Call
              </v-chip>
            </div>
            
            <h1 class="hero-title">
              Quick Start
              <span class="gradient-text">Guide</span>
            </h1>
            
            <p class="hero-subtitle">
              Master the fundamentals of Easy-Acumatica through hands-on examples
            </p>
            
            <div class="hero-pills">
              <span class="pill">
                <v-icon start size="small">mdi-lightning-bolt</v-icon>
                Zero Configuration
              </span>
              <span class="pill">
                <v-icon start size="small">mdi-auto-fix</v-icon>
                Auto-Discovery
              </span>
              <span class="pill">
                <v-icon start size="small">mdi-code-tags</v-icon>
                Fluent API
              </span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Interactive Steps -->
    <section class="steps-section">
      <v-container>
        <v-row>
          <v-col cols="12" lg="8" offset-lg="2">
            <!-- Step 1: Initialize Client -->
            <div class="step-container" :class="{ 'step-active': activeStep >= 1 }">
              <div class="step-header" @click="activeStep = 1">
                <div class="step-number">
                  <v-icon v-if="activeStep > 1" color="white">mdi-check</v-icon>
                  <span v-else>1</span>
                </div>
                <div class="step-info">
                  <h3 class="step-title">Initialize the Client</h3>
                  <p class="step-subtitle">Create your connection to Acumatica</p>
                </div>
                <v-icon class="step-arrow">
                  {{ activeStep === 1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>
              
              <v-expand-transition>
                <div v-show="activeStep === 1" class="step-content">
                  <p class="step-description">
                    The <code class="inline-code">AcumaticaClient</code> is your gateway to the API. 
                    It handles authentication, session management, and provides access to all services.
                  </p>
                  
                  <div class="code-card">
                    <div class="code-header">
                      <span class="code-filename">main.py</span>
                      <v-btn
                        icon="mdi-content-copy"
                        size="small"
                        variant="text"
                        @click="copyCode(clientCode)"
                      ></v-btn>
                    </div>
                    <pre class="code-content"><code>{{ clientCode }}</code></pre>
                  </div>
                  
                  <v-alert class="feature-alert mt-4" type="info" variant="tonal">
                    <v-icon slot="prepend">mdi-lightbulb</v-icon>
                    <strong>Pro Tip:</strong> The client automatically manages login sessions and cookies. 
                    Create one instance and reuse it throughout your application.
                  </v-alert>
                  
                  <div class="step-actions">
                    <v-btn
                      color="primary"
                      rounded="pill"
                      @click="nextStep"
                    >
                      Continue
                      <v-icon end>mdi-arrow-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>
            </div>

            <!-- Step 2: Use Sub-Services -->
            <div class="step-container" :class="{ 'step-active': activeStep >= 2 }">
              <div class="step-header" @click="activeStep = 2">
                <div class="step-number">
                  <v-icon v-if="activeStep > 2" color="white">mdi-check</v-icon>
                  <span v-else>2</span>
                </div>
                <div class="step-info">
                  <h3 class="step-title">Access Sub-Services</h3>
                  <p class="step-subtitle">Work with specific Acumatica entities</p>
                </div>
                <v-icon class="step-arrow">
                  {{ activeStep === 2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>
              
              <v-expand-transition>
                <div v-show="activeStep === 2" class="step-content">
                  <p class="step-description">
                    Sub-services are automatically attached to your client instance. Each service 
                    corresponds to an Acumatica entity type.
                  </p>
                  
                  <div class="service-grid">
                    <div 
                      v-for="service in subServices" 
                      :key="service.name"
                      class="service-card"
                      :class="{ 'service-active': selectedService === service.name }"
                      @click="selectedService = service.name"
                    >
                      <v-icon :icon="service.icon" size="24"></v-icon>
                      <span>{{ service.label }}</span>
                    </div>
                  </div>
                  
                  <div class="code-card mt-4">
                    <div class="code-header">
                      <span class="code-filename">{{ selectedService }}_example.py</span>
                      <v-btn
                        icon="mdi-content-copy"
                        size="small"
                        variant="text"
                        @click="copyCode(serviceExamples[selectedService])"
                      ></v-btn>
                    </div>
                    <pre class="code-content"><code>{{ serviceExamples[selectedService] }}</code></pre>
                  </div>
                  
                  <div class="step-actions">
                    <v-btn
                      variant="text"
                      rounded="pill"
                      @click="prevStep"
                    >
                      <v-icon start>mdi-arrow-left</v-icon>
                      Back
                    </v-btn>
                    <v-btn
                      color="primary"
                      rounded="pill"
                      @click="nextStep"
                    >
                      Continue
                      <v-icon end>mdi-arrow-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>
            </div>

            <!-- Step 3: Use Builders -->
            <div class="step-container" :class="{ 'step-active': activeStep >= 3 }">
              <div class="step-header" @click="activeStep = 3">
                <div class="step-number">
                  <v-icon v-if="activeStep > 3" color="white">mdi-check</v-icon>
                  <span v-else>3</span>
                </div>
                <div class="step-info">
                  <h3 class="step-title">Build with Fluent API</h3>
                  <p class="step-subtitle">Create and update records elegantly</p>
                </div>
                <v-icon class="step-arrow">
                  {{ activeStep === 3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>
              
              <v-expand-transition>
                <div v-show="activeStep === 3" class="step-content">
                  <p class="step-description">
                    Builders provide a clean, chainable interface for constructing complex payloads. 
                    Say goodbye to nested JSON structures!
                  </p>
                  
                  <div class="builder-showcase">
                    <v-tabs v-model="builderTab" class="builder-tabs">
                      <v-tab value="create">Create Customer</v-tab>
                      <v-tab value="update">Update Invoice</v-tab>
                      <v-tab value="complex">Complex Example</v-tab>
                    </v-tabs>
                    
                    <v-window v-model="builderTab">
                      <v-window-item value="create">
                        <div class="code-card">
                          <pre class="code-content"><code>{{ builderExamples.create }}</code></pre>
                        </div>
                      </v-window-item>
                      <v-window-item value="update">
                        <div class="code-card">
                          <pre class="code-content"><code>{{ builderExamples.update }}</code></pre>
                        </div>
                      </v-window-item>
                      <v-window-item value="complex">
                        <div class="code-card">
                          <pre class="code-content"><code>{{ builderExamples.complex }}</code></pre>
                        </div>
                      </v-window-item>
                    </v-window>
                  </div>
                  
                  <div class="step-actions">
                    <v-btn
                      variant="text"
                      rounded="pill"
                      @click="prevStep"
                    >
                      <v-icon start>mdi-arrow-left</v-icon>
                      Back
                    </v-btn>
                    <v-btn
                      color="primary"
                      rounded="pill"
                      @click="nextStep"
                    >
                      Continue
                      <v-icon end>mdi-arrow-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>
            </div>

            <!-- Step 4: Query with OData -->
            <div class="step-container" :class="{ 'step-active': activeStep >= 4 }">
              <div class="step-header" @click="activeStep = 4">
                <div class="step-number">
                  <v-icon v-if="activeStep > 4" color="white">mdi-check</v-icon>
                  <span v-else>4</span>
                </div>
                <div class="step-info">
                  <h3 class="step-title">Query with OData</h3>
                  <p class="step-subtitle">Filter, select, and expand your data</p>
                </div>
                <v-icon class="step-arrow">
                  {{ activeStep === 4 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </div>
              
              <v-expand-transition>
                <div v-show="activeStep === 4" class="step-content">
                  <p class="step-description">
                    Use OData parameters to precisely control what data you retrieve. 
                    Filter results, select specific fields, and expand related entities.
                  </p>
                  
                  <div class="odata-examples">
                    <div 
                      v-for="example in odataExamples" 
                      :key="example.title"
                      class="odata-card"
                    >
                      <h4>{{ example.title }}</h4>
                      <p>{{ example.description }}</p>
                      <div class="code-snippet">
                        <code>{{ example.code }}</code>
                      </div>
                    </div>
                  </div>
                  
                  <v-alert class="success-alert mt-4" type="success" variant="tonal">
                    <v-icon slot="prepend">mdi-party-popper</v-icon>
                    <strong>Congratulations!</strong> You've mastered the core concepts of Easy-Acumatica. 
                    You're ready to build powerful integrations!
                  </v-alert>
                  
                  <div class="step-actions">
                    <v-btn
                      variant="text"
                      rounded="pill"
                      @click="prevStep"
                    >
                      <v-icon start>mdi-arrow-left</v-icon>
                      Back
                    </v-btn>
                    <v-btn
                      color="success"
                      rounded="pill"
                      size="large"
                      @click="completeGuide"
                    >
                      Complete Guide
                      <v-icon end>mdi-check-circle</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>
            </div>
          </v-col>
          
          <!-- Progress Sidebar -->
          <v-col cols="12" lg="3" class="d-none d-lg-block">
            <div class="progress-sidebar">
              <h4 class="progress-title">Your Progress</h4>
              <div class="progress-bar-vertical">
                <div 
                  class="progress-fill" 
                  :style="{ height: progressPercentage + '%' }"
                ></div>
              </div>
              <div class="progress-steps">
                <div 
                  v-for="(step, index) in progressSteps" 
                  :key="index"
                  class="progress-step"
                  :class="{ 'completed': activeStep > index + 1, 'active': activeStep === index + 1 }"
                >
                  <v-icon :icon="step.icon" size="small"></v-icon>
                  <span>{{ step.label }}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

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
              :href="resource.link"
              variant="flat"
              hover
            >
              <div class="card-glow"></div>
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
import { ref, computed } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';

// Active step tracking
const activeStep = ref(1);
const selectedService = ref('customers');
const builderTab = ref('create');

// Progress calculation
const progressPercentage = computed(() => {
  return (activeStep.value / 4) * 100;
});

// Navigation functions
const nextStep = () => {
  if (activeStep.value < 4) {
    activeStep.value++;
  }
};

const prevStep = () => {
  if (activeStep.value > 1) {
    activeStep.value--;
  }
};

const completeGuide = () => {
  // Could add completion animation or redirect
  console.log('Guide completed!');
};

// Copy code function
const copyCode = (code) => {
  navigator.clipboard.writeText(code);
  // Could add toast notification
};

// Code examples
const clientCode = `from easy_acumatica import AcumaticaClient

# Initialize the client with your credentials
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password",
    company="YourCompany",
    branch="YourBranch"
)`;

const subServices = ref([
  { name: 'customers', label: 'Customers', icon: 'mdi-account-group' },
  { name: 'invoices', label: 'Invoices', icon: 'mdi-file-document' },
  { name: 'sales_orders', label: 'Sales Orders', icon: 'mdi-cart' },
  { name: 'vendors', label: 'Vendors', icon: 'mdi-truck' },
]);

const serviceExamples = {
  customers: `# Get all customers
customers = client.customers.get_all()

# Get a specific customer
customer = client.customers.get_by_id("ABCCOMP")

# Get customers with filters
active_customers = client.customers.get(
    filter="Status eq 'Active'"
)`,
  invoices: `# Get all invoices
invoices = client.invoices.get_all()

# Get invoices for a specific customer
customer_invoices = client.invoices.get(
    filter="CustomerID eq 'ABCCOMP'"
)`,
  sales_orders: `# Get recent sales orders
recent_orders = client.sales_orders.get(
    filter="Date ge '2024-01-01'",
    top=10
)`,
  vendors: `# Get active vendors
active_vendors = client.vendors.get(
    filter="Status eq 'Active'",
    select="VendorID,VendorName,Email"
)`,
};

const builderExamples = {
  create: `from easy_acumatica.models import CustomerBuilder

# Create a new customer with fluent API
new_customer = (
    CustomerBuilder()
    .customer_id("NEWCUST")
    .customer_name("New Customer Inc.")
    .email("contact@newcustomer.com")
    .phone("555-0123")
    .address_line_1("123 Main St")
    .city("New York")
    .state("NY")
    .postal_code("10001")
)

# Create the customer
created = client.customers.create(builder=new_customer)`,
  update: `from easy_acumatica.models import InvoiceBuilder

# Update an existing invoice
update_payload = (
    InvoiceBuilder()
    .description("Updated description")
    .due_date("2024-12-31")
    .add_detail_line(
        inventory_id="WIDGET",
        quantity=5,
        unit_price=99.99
    )
)

# Apply the update
updated = client.invoices.update(
    "INV-001234",
    builder=update_payload
)`,
  complex: `from easy_acumatica.models import SalesOrderBuilder

# Create a complex sales order
order = (
    SalesOrderBuilder()
    .customer_id("ABCCOMP")
    .date("2024-03-15")
    .description("Q1 Widget Order")
    .add_detail_line(
        inventory_id="WIDGET-A",
        quantity=100,
        unit_price=49.99,
        discount_percent=10
    )
    .add_detail_line(
        inventory_id="WIDGET-B",
        quantity=50,
        unit_price=79.99
    )
    .shipping_address(
        line1="456 Corporate Blvd",
        city="Chicago",
        state="IL",
        postal_code="60601"
    )
    .requested_on("2024-03-20")
)

# Create the order
created_order = client.sales_orders.create(builder=order)`,
};

const odataExamples = ref([
  {
    title: '$filter',
    description: 'Filter records based on conditions',
    code: `client.customers.get(filter="State eq 'CA' and Status eq 'Active'")`
  },
  {
    title: '$select',
    description: 'Choose specific fields to return',
    code: `client.invoices.get(select="InvoiceNbr,CustomerID,Amount,Status")`
  },
  {
    title: '$expand',
    description: 'Include related entity data',
    code: `client.sales_orders.get(expand="Details,Customer")`
  },
  {
    title: '$top & $skip',
    description: 'Implement pagination',
    code: `client.products.get(top=20, skip=40)  # Page 3, 20 items per page`
  },
]);

const progressSteps = ref([
  { icon: 'mdi-power-plug', label: 'Initialize' },
  { icon: 'mdi-api', label: 'Sub-Services' },
  { icon: 'mdi-tools', label: 'Builders' },
  { icon: 'mdi-filter', label: 'Queries' },
]);

const nextResources = ref([
  {
    icon: 'mdi-book-open-variant',
    title: 'API Reference',
    description: 'Complete documentation of all services, methods, and builders',
    link: '/python/client'
  },
  {
    icon: 'mdi-puzzle',
    title: 'Sub-Services',
    description: 'Deep dive into each service with real-world examples',
    link: '/python/sub-services'
  },
  {
    icon: 'mdi-lightbulb-on',
    title: 'Best Practices',
    description: 'Tips, patterns, and performance optimization techniques',
    link: '/python/best-practices'
  }
]);

// SEO
useSeoMeta({
  title: 'Quick Start Guide | Easy-Acumatica v0.4',
  description: 'Get started with Easy-Acumatica in 5 minutes. Learn to initialize the client, use sub-services, build payloads, and query with OData.',
  ogTitle: 'Easy-Acumatica Quick Start - 5 Minutes to First API Call',
  ogDescription: 'Master the fundamentals of Easy-Acumatica through interactive examples. Zero configuration required.',
  ogImage: 'https://www.easyacumatica.com/social-images/quickstart.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica Quick Start Guide',
  twitterDescription: 'From zero to API mastery in 5 minutes. Interactive guide with live examples.',
  twitterImage: 'https://www.easyacumatica.com/social-images/quickstart.png',
});
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
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  top: -20%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: rgba(130, 177, 255, 0.3);
}

.orb-2 {
  bottom: -30%;
  right: -15%;
  width: 500px;
  height: 500px;
  background: rgba(179, 136, 255, 0.3);
  animation-delay: -5s;
}

.orb-3 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% { 
    transform: translate(0, 0) scale(1); 
  }
  33% { 
    transform: translate(30px, -30px) scale(1.1); 
  }
  66% { 
    transform: translate(-20px, 20px) scale(0.9); 
  }
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
  font-size: 4rem;
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

.hero-pills {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.pill {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Steps Section */
.steps-section {
  padding: 4rem 0 5rem;
  background: #f8f9fa;
}

.step-container {
  background: white;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.step-container.step-active {
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.15);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.step-header:hover {
  background: rgba(94, 53, 177, 0.02);
}

.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.step-container.step-active .step-number {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(94, 53, 177, 0.4);
}

.step-info {
  flex: 1;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 0.25rem;
}

.step-subtitle {
  color: #666;
  font-size: 0.95rem;
}

.step-arrow {
  color: #666;
  transition: transform 0.3s ease;
}

.step-content {
  padding: 0 2rem 2rem;
}

.step-description {
  color: #555;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.inline-code {
  background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
  padding: 0.2rem 0.5rem;
  border-radius: 0.375rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
  color: #5e35b1;
}

/* Code Cards */
.code-card {
  background: #0a0e27;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.code-filename {
  color: #82b1ff;
  font-size: 0.875rem;
  font-family: 'Fira Code', monospace;
}

.code-content {
  padding: 1.5rem;
  margin: 0;
  color: #e0e0e0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
}

.code-content code {
  color: inherit;
}

/* Service Grid */
.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.service-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-card:hover {
  border-color: #5e35b1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(94, 53, 177, 0.15);
}

.service-card.service-active {
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  color: white;
  border-color: transparent;
}

.service-card span {
  display: block;
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}

/* Builder Showcase */
.builder-showcase {
  margin-top: 1.5rem;
}

.builder-tabs {
  background: #f5f5f5;
  border-radius: 12px 12px 0 0;
}

/* OData Examples */
.odata-examples {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.odata-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.odata-card:hover {
  border-color: #5e35b1;
  box-shadow: 0 4px 12px rgba(94, 53, 177, 0.1);
}

.odata-card h4 {
  color: #1a237e;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.odata-card p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.code-snippet {
  background: #f5f5f5;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  overflow-x: auto;
}

/* Alerts */
.feature-alert {
  background: linear-gradient(135deg, #5e35b108 0%, #7e57c208 100%);
  border-left: 4px solid #5e35b1;
}

.success-alert {
  background: linear-gradient(135deg, #4caf5008 0%, #8bc34a08 100%);
  border-left: 4px solid #4caf50;
}

/* Step Actions */
.step-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

/* Progress Sidebar */
.progress-sidebar {
  position: sticky;
  top: 100px;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.progress-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 1.5rem;
}

.progress-bar-vertical {
  width: 4px;
  height: 200px;
  background: #e0e0e0;
  border-radius: 2px;
  margin: 0 auto 1.5rem;
  position: relative;
}

.progress-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, #5e35b1 0%, #7e57c2 100%);
  border-radius: 2px;
  transition: height 0.3s ease;
}

.progress-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #999;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.progress-step.completed {
  color: #4caf50;
}

.progress-step.active {
  color: #5e35b1;
  font-weight: 600;
}

/* Next Steps Section */
.next-steps-section {
  padding: 5rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #666;
}

.resource-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px !important;
  background: white;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(94, 53, 177, 0.15) !important;
  border-color: #5e35b1;
}

.card-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.resource-card:hover .card-glow {
  opacity: 0.05;
}

.resource-icon {
  width: 64px
}
</style>