<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="floating-shape shape-4"></div>
      </div>
      <v-container class="hero-content">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <div class="warning-badge">
              <v-icon color="white" size="20">mdi-alert-octagon</v-icon>
              <span>Breaking Changes Ahead</span>
            </div>
            <h1 class="hero-title">
              <span class="title-gradient">Migration Guide</span>
            </h1>
            <p class="hero-subtitle">
              Transform your codebase from static v0.3.x to the revolutionary dynamic v0.4.x
            </p>
            <div class="version-transition">
              <div class="version-box old-version-box">
                <span class="version-label">FROM</span>
                <span class="version-number">v0.3.x</span>
                <span class="version-type">Static</span>
              </div>
              <div class="arrow-container">
                <v-icon size="40" color="white">mdi-arrow-right-thick</v-icon>
              </div>
              <div class="version-box new-version-box">
                <span class="version-label">TO</span>
                <span class="version-number">v0.4.x</span>
                <span class="version-type">Dynamic</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Main Content -->
    <v-container class="main-content pb-16">
      <v-container class="content-container">
        <v-row>
          <v-col cols="12" md="9">
            <!-- Overview Section -->
            <section id="overview" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-information-outline</v-icon>
                Overview
              </h2>
              
              <v-alert type="info" variant="tonal" class="mb-6">
                <strong>Major Architecture Change:</strong> v0.4.0 introduces a completely dynamic approach where models and services are generated at runtime from your Acumatica instance's schema. No more static model definitions!
              </v-alert>

              <v-card elevation="2">
                <v-card-text>
                  <h3 class="subsection-title mb-4">What's Changed?</h3>
                  
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="version-comparison old-version">
                        <h4><v-icon color="error" size="small">mdi-close-circle</v-icon> v0.3.x (Static)</h4>
                        <ul>
                          <li>Pre-defined model classes</li>
                          <li>Manual service definitions</li>
                          <li>Fixed field sets</li>
                          <li>No custom field support</li>
                          <li>Manual updates for changes</li>
                          <li>Import specific models</li>
                        </ul>
                      </div>
                    </v-col>
                    
                    <v-col cols="12" md="6">
                      <div class="version-comparison new-version">
                        <h4><v-icon color="success" size="small">mdi-check-circle</v-icon> v0.4.x (Dynamic)</h4>
                        <ul>
                          <li>Runtime-generated models</li>
                          <li>Auto-discovered services</li>
                          <li>All fields from schema</li>
                          <li>Full custom field support</li>
                          <li>Zero maintenance</li>
                          <li>Models via client.models.*</li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </section>

            <!-- Breaking Changes Section -->
            <section id="breaking-changes" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-alert-octagon</v-icon>
                Breaking Changes
              </h2>

              <v-expansion-panels variant="accordion" class="modern-expansion">
                <v-expansion-panel>
                  <v-expansion-panel-title class="expansion-title error--text">
                    <v-icon start color="error">mdi-import</v-icon>
                    Import Statements
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="breaking-change-content">
                      <h4 class="mb-3">Model imports are completely different</h4>
                      
                      <div class="mb-4">
                        <p class="font-weight-medium mb-2">❌ Old way (v0.3.x):</p>
                        <CodeSnippet :code="oldImportsCode" />
                      </div>
                      
                      <div>
                        <p class="font-weight-medium mb-2">✅ New way (v0.4.x):</p>
                        <CodeSnippet :code="newImportsCode" />
                      </div>
                      
                      <v-alert type="warning" variant="tonal" class="mt-4">
                        Models are no longer imported directly. They're accessed through <code>client.models.*</code>
                      </v-alert>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="expansion-title error--text">
                    <v-icon start color="error">mdi-api</v-icon>
                    Service Access Pattern
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="breaking-change-content">
                      <h4 class="mb-3">Services are now attributes on the client</h4>
                      
                      <div class="mb-4">
                        <p class="font-weight-medium mb-2">❌ Old way (v0.3.x):</p>
                        <CodeSnippet :code="oldServiceCode" />
                      </div>
                      
                      <div>
                        <p class="font-weight-medium mb-2">✅ New way (v0.4.x):</p>
                        <CodeSnippet :code="newServiceCode" />
                      </div>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="expansion-title error--text">
                    <v-icon start color="error">mdi-package-variant</v-icon>
                    Model Structure
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div class="breaking-change-content">
                      <h4 class="mb-3">All fields are now Optional</h4>
                      
                      <p class="mb-3">
                        In v0.4.x, all model fields are <code>Optional[T]</code> to support partial updates and missing data:
                      </p>
                      
                      <CodeSnippet :code="modelStructureCode" />
                      
                      <v-alert type="info" variant="tonal" class="mt-4">
                        This change allows for more flexible data handling and partial updates.
                      </v-alert>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </section>

            <!-- Step by Step Migration -->
            <section id="step-by-step" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-stairs</v-icon>
                Step-by-Step Migration
              </h2>

              <v-stepper v-model="migrationStep" alt-labels class="migration-stepper">
                <v-stepper-header>
                  <v-stepper-item 
                    v-for="(step, i) in migrationSteps" 
                    :key="i"
                    :value="i + 1"
                    :title="step.title"
                    :complete="migrationStep > i + 1"
                  />
                </v-stepper-header>

                <v-stepper-window>
                  <v-stepper-window-item 
                    v-for="(step, i) in migrationSteps" 
                    :key="i"
                    :value="i + 1"
                  >
                    <v-card elevation="0">
                      <v-card-text>
                        <h3 class="mb-4">{{ step.title }}</h3>
                        <div v-html="step.content"></div>
                        <CodeSnippet v-if="step.code" :code="step.code" />
                      </v-card-text>
                    </v-card>
                  </v-stepper-window-item>
                </v-stepper-window>

                <v-stepper-actions
                  @click:prev="migrationStep--"
                  @click:next="migrationStep++"
                />
              </v-stepper>
            </section>

            <!-- Common Patterns -->
            <section id="patterns" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-puzzle-outline</v-icon>
                Common Migration Patterns
              </h2>

              <v-tabs v-model="patternTab" class="modern-tabs mb-6">
                <v-tab value="crud">CRUD Operations</v-tab>
                <v-tab value="filtering">Filtering & Queries</v-tab>
                <v-tab value="custom">Custom Fields</v-tab>
                <v-tab value="error">Error Handling</v-tab>
              </v-tabs>

              <v-tabs-window v-model="patternTab">
                <v-tabs-window-item value="crud">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">CRUD Operations Migration</h3>
                      
                      <div class="pattern-example mb-6">
                        <h4 class="mb-2">Creating Records</h4>
                        <v-row>
                          <v-col cols="12" md="6">
                            <p class="font-weight-medium text-error mb-2">❌ Old (v0.3.x)</p>
                            <CodeSnippet :code="oldCreatePattern" />
                          </v-col>
                          <v-col cols="12" md="6">
                            <p class="font-weight-medium text-success mb-2">✅ New (v0.4.x)</p>
                            <CodeSnippet :code="newCreatePattern" />
                          </v-col>
                        </v-row>
                      </div>

                      <div class="pattern-example">
                        <h4 class="mb-2">Updating Records</h4>
                        <v-row>
                          <v-col cols="12" md="6">
                            <p class="font-weight-medium text-error mb-2">❌ Old (v0.3.x)</p>
                            <CodeSnippet :code="oldUpdatePattern" />
                          </v-col>
                          <v-col cols="12" md="6">
                            <p class="font-weight-medium text-success mb-2">✅ New (v0.4.x)</p>
                            <CodeSnippet :code="newUpdatePattern" />
                          </v-col>
                        </v-row>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="filtering">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Filtering & Query Migration</h3>
                      <CodeSnippet :code="filteringMigrationCode" />
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="custom">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Custom Fields (New in v0.4.x!)</h3>
                      <CodeSnippet :code="customFieldsCode" />
                      <v-alert type="success" variant="tonal" class="mt-4">
                        Custom fields are now automatically discovered and available in your models!
                      </v-alert>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="error">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Error Handling Updates</h3>
                      <CodeSnippet :code="errorHandlingCode" />
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>
              </v-tabs-window>
            </section>

            <!-- Troubleshooting -->
            <section id="troubleshooting" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-wrench</v-icon>
                Troubleshooting
              </h2>

              <v-card elevation="2">
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="issue in commonIssues" :key="issue.title">
                      <template v-slot:prepend>
                        <v-avatar :color="issue.severity" size="40">
                          <v-icon>{{ issue.icon }}</v-icon>
                        </v-avatar>
                      </template>
                      <v-list-item-title class="font-weight-medium">
                        {{ issue.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-wrap">
                        <strong>Problem:</strong> {{ issue.problem }}
                        <br>
                        <strong>Solution:</strong> {{ issue.solution }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </section>

            <!-- Benefits -->
            <section id="benefits" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-trophy</v-icon>
                Migration Benefits
              </h2>

              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="benefit in migrationBenefits" :key="benefit.title">
                  <v-card elevation="2" class="benefit-card h-100">
                    <v-card-text class="text-center">
                      <v-icon :color="benefit.color" size="48" class="mb-3">
                        {{ benefit.icon }}
                      </v-icon>
                      <h4 class="font-weight-bold mb-2">{{ benefit.title }}</h4>
                      <p class="text-body-2">{{ benefit.description }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </section>
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

// SEO Configuration
useSeoMeta({
  title: 'Migration Guide v0.3 to v0.4 | Easy-Acumatica Python',
  description: 'Complete guide for migrating from static Easy-Acumatica v0.3.x to the new dynamic v0.4.x architecture. Breaking changes, step-by-step instructions, and common patterns.',
  ogTitle: 'Easy-Acumatica Migration Guide',
  ogDescription: 'Upgrade from static to dynamic: Complete migration guide for Easy-Acumatica v0.4',
  ogImage: 'https://www.easyacumatica.com/social-images/migration-guide.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica v0.4 Migration',
  twitterDescription: 'Step-by-step guide to upgrade from v0.3.x to v0.4.x dynamic architecture',
  twitterImage: 'https://www.easyacumatica.com/social-images/migration-guide.png',
});

// Navigation items
const navItems = ref([
  { id: 'overview', title: 'Overview', icon: 'mdi-information-outline' },
  { id: 'breaking-changes', title: 'Breaking Changes', icon: 'mdi-alert-octagon' },
  { id: 'step-by-step', title: 'Step-by-Step', icon: 'mdi-stairs' },
  { id: 'patterns', title: 'Common Patterns', icon: 'mdi-puzzle-outline' },
  { id: 'troubleshooting', title: 'Troubleshooting', icon: 'mdi-wrench' },
  { id: 'benefits', title: 'Benefits', icon: 'mdi-trophy' }
]);

// State
const migrationStep = ref(1);
const patternTab = ref('crud');

// Code examples
const oldImportsCode = `# v0.3.x - Import specific models
from easy_acumatica.models import Bill, Contact, SalesOrder
from easy_acumatica import Client

# Models were pre-defined classes`;

const newImportsCode = `# v0.4.x - Only import the client
from easy_acumatica import AcumaticaClient

# Models are dynamically generated and accessed via client
# client.models.Bill, client.models.Contact, etc.`;

const oldServiceCode = `# v0.3.x - Separate service instances
from easy_acumatica import Client
from easy_acumatica.services import BillService

client = Client(...)
bill_service = BillService(client)
bills = bill_service.get()`;

const newServiceCode = `# v0.4.x - Services are client attributes
from easy_acumatica import AcumaticaClient

client = AcumaticaClient(...)
# Services are automatically attached!
bills = client.bills.get_list()`;

const modelStructureCode = `# v0.4.x - All fields are Optional
@dataclass
class Contact(Entity):
    DisplayName: Optional[str] = None
    Email: Optional[str] = None
    Phone1: Optional[str] = None
    # Even required fields in Acumatica are Optional here
    # This allows partial updates and flexible data handling`;

const oldCreatePattern = `# v0.3.x
from easy_acumatica.models import Contact

contact = Contact()
contact.DisplayName = "John Doe"
contact.Email = "john@example.com"

result = contact_service.create(contact)`;

const newCreatePattern = `# v0.4.x
# Models via client.models
contact = client.models.Contact(
    DisplayName="John Doe",
    Email="john@example.com"
)

result = client.contacts.put_entity(contact)`;

const oldUpdatePattern = `# v0.3.x
contact = contact_service.get_by_id("C000123")
contact.Email = "newemail@example.com"
updated = contact_service.update(contact)`;

const newUpdatePattern = `# v0.4.x
# Partial updates supported!
update = client.models.Contact(
    id="C000123",
    Email="newemail@example.com"
)
updated = client.contacts.put_entity(update)`;

const filteringMigrationCode = `# v0.3.x - String-based filters
bills = bill_service.get(filter="Status eq 'Open'")

# v0.4.x - QueryOptions with F factory
from easy_acumatica import QueryOptions, F

bills = client.bills.get_list(
    options=QueryOptions(
        filter=F.Status == "Open",
        top=10,
        orderby="DueDate desc"
    )
)`;

const customFieldsCode = `# v0.4.x - Custom fields are discovered automatically!
# If your instance has custom fields, they appear in the model

invoice = client.models.Invoice(
    Customer="CUST001",
    # Standard fields
    Date=datetime.now(),
    # Your custom fields are here too!
    custom={
        "Document": {
            "AttributeMYFIELD": {"value": "Custom Value"}
        }
    }
)

# They also appear in responses
invoice = client.invoices.get_by_id("INV000123")
print(invoice.custom)  # Access all custom fields`;

const errorHandlingCode = `# v0.3.x - Generic exceptions
try:
    bill = bill_service.get_by_id("BILL123")
except Exception as e:
    print(f"Error: {e}")

# v0.4.x - Specific exception types
from easy_acumatica.exceptions import (
    AcumaticaNotFoundError,
    AcumaticaAuthError,
    AcumaticaAPIError
)

try:
    bill = client.bills.get_by_id("BILL123")
except AcumaticaNotFoundError:
    print("Bill not found")
except AcumaticaAuthError:
    print("Authentication failed")
except AcumaticaAPIError as e:
    print(f"API error: {e.status_code} - {e.message}")`;

// Migration steps
const migrationSteps = ref([
  {
    title: 'Update Package',
    content: `<p class="mb-3">First, update to the latest version of easy-acumatica:</p>`,
    code: `pip install --upgrade easy-acumatica>=0.4.7`
  },
  {
    title: 'Update Imports',
    content: `<p class="mb-3">Replace all model imports with the new client import:</p>`,
    code: `# Remove these:
# from easy_acumatica.models import Bill, Contact, etc.
# from easy_acumatica import Client

# Add this:
from easy_acumatica import AcumaticaClient`
  },
  {
    title: 'Update Client Initialization',
    content: `<p class="mb-3">Change from Client to AcumaticaClient:</p>`,
    code: `# Old
client = Client(
    url="https://your.acumatica.com",
    username="user",
    password="pass",
    company="Company"
)

# New
client = AcumaticaClient(
    base_url="https://your.acumatica.com",
    username="user",
    password="pass",
    tenant="Company"  # Note: 'company' → 'tenant'
)`
  },
  {
    title: 'Update Service Usage',
    content: `<p class="mb-3">Services are now attributes on the client. Update all service calls:</p>`,
    code: `# Old: separate service instances
bill_service = BillService(client)
bills = bill_service.get()

# New: services as client attributes
bills = client.bills.get_list()`
  },
  {
    title: 'Update Model Usage',
    content: `<p class="mb-3">Access models through client.models instead of imports:</p>`,
    code: `# Old
from easy_acumatica.models import Bill
bill = Bill(Type="Bill", Vendor="V001")

# New
bill = client.models.Bill(Type="Bill", Vendor="V001")`
  },
  {
    title: 'Generate Type Stubs',
    content: `<p class="mb-3">For IDE support, generate type stubs after connecting:</p>`,
    code: `from easy_acumatica.generate_stubs import generate_stubs_from_client

# After client initialization
client = AcumaticaClient(...)

# Generate stubs for autocomplete
generate_stubs_from_client(client)`
  }
]);

// Common issues
const commonIssues = ref([
  {
    title: 'ImportError: cannot import name "Bill"',
    problem: 'Trying to import models directly',
    solution: 'Use client.models.Bill instead of importing',
    icon: 'mdi-import',
    severity: 'error'
  },
  {
    title: 'AttributeError: "Client" object has no attribute "bills"',
    problem: 'Using old Client class instead of AcumaticaClient',
    solution: 'Change to AcumaticaClient and ensure proper initialization',
    icon: 'mdi-alert',
    severity: 'warning'
  },
  {
    title: 'No autocomplete in IDE',
    problem: 'Type stubs not generated',
    solution: 'Run generate_stubs_from_client() after connecting',
    icon: 'mdi-code-tags',
    severity: 'info'
  },
  {
    title: 'Custom fields not appearing',
    problem: 'Looking for custom fields as direct attributes',
    solution: 'Access via the "custom" dictionary on the model',
    icon: 'mdi-puzzle',
    severity: 'info'
  }
]);

// Benefits
const migrationBenefits = ref([
  {
    icon: 'mdi-auto-fix',
    title: 'Zero Maintenance',
    description: 'Models update automatically when your instance changes',
    color: 'primary'
  },
  {
    icon: 'mdi-puzzle',
    title: 'Custom Field Support',
    description: 'All custom fields are discovered and available',
    color: 'secondary'
  },
  {
    icon: 'mdi-flash',
    title: 'Always Current',
    description: 'No more version mismatches with your instance',
    color: 'accent'
  },
  {
    icon: 'mdi-code-tags',
    title: 'Full Type Safety',
    description: 'Complete IDE support with generated stubs',
    color: 'success'
  },
  {
    icon: 'mdi-package-down',
    title: 'Smaller Package',
    description: 'No bundled model definitions to maintain',
    color: 'info'
  },
  {
    icon: 'mdi-api',
    title: 'Better API Coverage',
    description: 'Access to all endpoints and operations',
    color: 'warning'
  }
]);
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%);
  color: white;
  padding: 100px 0 80px;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  background: white;
  animation: float 20s infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
  animation-duration: 25s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: -100px;
  animation-delay: 5s;
  animation-duration: 30s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  bottom: -75px;
  left: 30%;
  animation-delay: 10s;
  animation-duration: 20s;
}

.shape-4 {
  width: 400px;
  height: 400px;
  top: 20%;
  right: 20%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(50px, -30px) rotate(90deg);
  }
  50% {
    transform: translate(-30px, 50px) rotate(180deg);
  }
  75% {
    transform: translate(30px, 30px) rotate(270deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.2;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.warning-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(238, 90, 36, 0.3);
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 8px 20px rgba(238, 90, 36, 0.3);
  }
  50% {
    box-shadow: 0 8px 30px rgba(238, 90, 36, 0.5);
  }
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.title-gradient {
  background: linear-gradient(to right, #ffffff 0%, #e0e0e0 50%, #ffffff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

.hero-subtitle {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.version-transition {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.version-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  min-width: 180px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.version-box::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.version-box:hover::before {
  transform: translateX(100%);
}

.old-version-box {
  animation: slideInLeft 0.8s ease;
}

.new-version-box {
  animation: slideInRight 0.8s ease;
  border-color: rgba(76, 175, 80, 0.5);
  background: rgba(76, 175, 80, 0.1);
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.version-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.version-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.version-type {
  display: block;
  font-size: 1rem;
  opacity: 0.9;
}

.arrow-container {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

/* Content */
.main-content {
  background: #fafafa;
  min-height: 100vh;
}

.content-container {
  max-width: 1600px;
}

.content-section {
  margin-bottom: 4rem;
  scroll-margin-top: 80px;
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
}

/* Version Comparison */
.version-comparison {
  padding: 1.5rem;
  border-radius: 12px;
  height: 100%;
}

.old-version {
  background: #ffebee;
  border: 1px solid #ffcdd2;
}

.new-version {
  background: #e8f5e9;
  border: 1px solid #c8e6c9;
}

.version-comparison h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.version-comparison ul {
  list-style: none;
  padding: 0;
}

.version-comparison li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
}

.old-version li::before {
  content: "•";
  color: #d32f2f;
  margin-right: 0.5rem;
}

.new-version li::before {
  content: "•";
  color: #388e3c;
  margin-right: 0.5rem;
}

/* Breaking Changes */
.modern-expansion {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}

.expansion-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.breaking-change-content {
  padding: 1rem;
}

/* Method Table */
.method-table {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.method-table th {
  background: #f5f5f5;
  font-weight: 600;
}

/* Migration Stepper */
.migration-stepper {
  box-shadow: none;
  background: transparent;
}

/* Pattern Examples */
.pattern-example {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 2rem;
}

.pattern-example:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

/* Benefit Cards */
.benefit-card {
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* Code */
code {
  background: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  color: #5e35b1;
}

/* Tabs */
.modern-tabs {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 4px;
}

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 80px;
}
</style>