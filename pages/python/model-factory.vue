<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <h1 class="hero-title">Model Factory</h1>
            <p class="hero-subtitle">
              Type-safe dataclasses generated dynamically from your Acumatica schema
            </p>
            <div class="hero-features">
              <div class="feature-pill">
                <v-icon size="small">mdi-shape-outline</v-icon>
                Dynamic Models
              </div>
              <div class="feature-pill">
                <v-icon size="small">mdi-shield-check</v-icon>
                Type Safety
              </div>
              <div class="feature-pill">
                <v-icon size="small">mdi-puzzle</v-icon>
                Custom Fields
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
            <!-- Architecture Overview -->
            <section id="architecture" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-office-building</v-icon>
                Architecture Overview
              </h2>
              
              <v-card elevation="2" class="mb-6">
                <v-card-text>
                  <p class="mb-4">
                    The Model Factory creates Python dataclasses at runtime from your Acumatica schema definitions. This ensures your models always match your instance's exact structure, including custom fields and modifications.
                  </p>
                  
                  <v-alert type="info" variant="tonal" class="mb-4">
                    <strong>Key Benefit:</strong> No more maintaining model definitions! Models are generated fresh from your instance's schema every time you connect.
                  </v-alert>

                  <h3 class="subsection-title mt-6 mb-3">Generation Process</h3>
                  <ol class="process-list">
                    <li><strong>Schema Analysis:</strong> Parse OpenAPI components/schemas section</li>
                    <li><strong>Type Mapping:</strong> Convert JSON Schema types to Python type hints</li>
                    <li><strong>Dataclass Creation:</strong> Build dataclasses with proper inheritance</li>
                    <li><strong>Reference Resolution:</strong> Handle circular references and forward declarations</li>
                    <li><strong>Attachment to Client:</strong> Models become available via <code>client.models.*</code></li>
                  </ol>
                </v-card-text>
              </v-card>
            </section>

            <!-- Model Structure -->
            <section id="structure" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-file-tree</v-icon>
                Model Structure
              </h2>

              <v-tabs v-model="structureTab" class="modern-tabs mb-6">
                <v-tab value="anatomy">Model Anatomy</v-tab>
                <v-tab value="inheritance">Inheritance</v-tab>
                <v-tab value="types">Type System</v-tab>
              </v-tabs>

              <v-tabs-window v-model="structureTab">
                <v-tabs-window-item value="anatomy">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Anatomy of a Generated Model</h3>
                      <p class="mb-4">
                        Every generated model is a Python dataclass that inherits from <code>BaseDataClassModel</code>:
                      </p>
                      
                      <CodeSnippet :code="modelAnatomyCode" />
                      
                      <p class="mt-4">
                        Models include all fields from your schema, with proper type annotations and optional markers.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="inheritance">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Inheritance Chain</h3>
                      
                      <div class="inheritance-diagram mb-4">
                        <div class="inheritance-level">
                          <v-chip color="primary" label>BaseDataClassModel</v-chip>
                          <div class="inheritance-desc">Base class with serialization methods</div>
                        </div>
                        <div class="inheritance-arrow">↓</div>
                        <div class="inheritance-level">
                          <v-chip color="secondary" label>Entity</v-chip>
                          <div class="inheritance-desc">Common entity fields (id, custom, files)</div>
                        </div>
                        <div class="inheritance-arrow">↓</div>
                        <div class="inheritance-level">
                          <v-chip color="accent" label>YourModel</v-chip>
                          <div class="inheritance-desc">Your specific entity (Bill, Contact, etc.)</div>
                        </div>
                      </div>
                      
                      <CodeSnippet :code="inheritanceExample" />
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="types">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Type System</h3>
                      <p class="mb-4">
                        The Model Factory maps Acumatica types to Python types intelligently:
                      </p>
                      
                      <v-table density="comfortable" class="type-mapping-table mb-4">
                        <thead>
                          <tr>
                            <th>Acumatica Type</th>
                            <th>Python Type</th>
                            <th>Example</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="mapping in typeMappings" :key="mapping.acumatica">
                            <td><code>{{ mapping.acumatica }}</code></td>
                            <td><code>{{ mapping.python }}</code></td>
                            <td><code>{{ mapping.example }}</code></td>
                          </tr>
                        </tbody>
                      </v-table>
                      
                      <p>
                        All fields are marked as <code>Optional</code> to handle partial updates and missing data gracefully.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>
              </v-tabs-window>
            </section>

            <!-- Implementation Details -->
            <section id="implementation" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-cog-outline</v-icon>
                Implementation Details
              </h2>

              <v-card elevation="2">
                <v-card-text>
                  <h3 class="subsection-title mb-3">The Factory Process</h3>
                  
                  <CodeSnippet :code="factoryImplementationCode" />
                  
                  <h3 class="subsection-title mt-6 mb-3">Handling Complex Types</h3>
                  <p class="mb-4">
                    The factory handles several complex scenarios:
                  </p>
                  
                  <v-expansion-panels variant="accordion" class="modern-expansion">
                    <v-expansion-panel>
                      <v-expansion-panel-title class="expansion-title">
                        <v-icon start>mdi-rotate-3d-variant</v-icon>
                        Circular References
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <CodeSnippet :code="circularReferenceCode" />
                      </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-title class="expansion-title">
                        <v-icon start>mdi-wrap</v-icon>
                        Primitive Wrappers
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <p class="mb-3">Acumatica wraps primitives in value objects:</p>
                        <CodeSnippet :code="primitiveWrapperCode" />
                      </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-title class="expansion-title">
                        <v-icon start>mdi-code-json</v-icon>
                        Custom Fields
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <p class="mb-3">Custom fields are discovered and typed automatically:</p>
                        <CodeSnippet :code="customFieldsCode" />
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </section>

            <!-- Usage Patterns -->
            <section id="usage" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-book-open-variant</v-icon>
                Usage Patterns
              </h2>

              <v-row>
                <v-col cols="12" md="6">
                  <v-card elevation="2" class="h-100">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Creating Entities</h3>
                      <CodeSnippet :code="creatingEntitiesCode" />
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-card elevation="2" class="h-100">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Updating Entities</h3>
                      <CodeSnippet :code="updatingEntitiesCode" />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-card elevation="2" class="mt-4">
                <v-card-text>
                  <h3 class="subsection-title mb-3">Working with Nested Data</h3>
                  <CodeSnippet :code="nestedDataCode" />
                </v-card-text>
              </v-card>
            </section>

            <!-- Stub Generation -->
            <section id="stubs" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-code-tags</v-icon>
                Type Stub Generation
              </h2>

              <v-card elevation="2">
                <v-card-text>
                  <p class="mb-4">
                    For optimal IDE support, generate type stubs after connecting:
                  </p>
                  
                  <CodeSnippet :code="stubGenerationCode" />
                  
                  <v-alert type="success" variant="tonal" class="mt-4">
                    <strong>Result:</strong> Full autocomplete for all your models, including custom fields!
                  </v-alert>
                  
                  <h3 class="subsection-title mt-6 mb-3">Generated Stub Example</h3>
                  <CodeSnippet :code="stubExampleCode" language="python" />
                </v-card-text>
              </v-card>
            </section>

            <!-- Best Practices -->
            <section id="practices" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-lightbulb-outline</v-icon>
                Best Practices
              </h2>

              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="practice in bestPractices" :key="practice.title">
                  <v-card elevation="1" class="h-100 practice-card">
                    <v-card-text>
                      <v-icon :color="practice.color" size="40" class="mb-3">
                        {{ practice.icon }}
                      </v-icon>
                      <h4 class="font-weight-bold mb-2">{{ practice.title }}</h4>
                      <p class="text-body-2">{{ practice.description }}</p>
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
  title: 'Model Factory | Easy-Acumatica Python Docs',
  description: 'Understand how Easy-Acumatica generates type-safe dataclass models dynamically from your Acumatica schema. Learn about the model structure, type mapping, and stub generation.',
  ogTitle: 'Model Factory - Dynamic Type Generation',
  ogDescription: 'Discover how Easy-Acumatica creates Python dataclasses that perfectly match your Acumatica instance structure.',
  ogImage: 'https://www.easyacumatica.com/social-images/model-factory.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica Model Factory',
  twitterDescription: 'Runtime model generation with full type safety and custom field support.',
  twitterImage: 'https://www.easyacumatica.com/social-images/model-factory.png',
});

// Navigation items
const navItems = ref([
  { id: 'architecture', title: 'Architecture', icon: 'mdi-office-building' },
  { id: 'structure', title: 'Model Structure', icon: 'mdi-file-tree' },
  { id: 'implementation', title: 'Implementation', icon: 'mdi-cog-outline' },
  { id: 'usage', title: 'Usage Patterns', icon: 'mdi-book-open-variant' },
  { id: 'stubs', title: 'Type Stubs', icon: 'mdi-code-tags' },
  { id: 'practices', title: 'Best Practices', icon: 'mdi-lightbulb-outline' }
]);

// Tab state
const structureTab = ref('anatomy');

// Code examples
const modelAnatomyCode = `@dataclass
class Bill(Entity):
    """Represents the Bill entity.
    
    Attributes:
        Type (str): The type of bill
        Vendor (str): Vendor reference
        ReferenceNbr (str): Reference number
        Status (str): Current status
        Balance (decimal): Outstanding balance
        DueDate (datetime): Payment due date
        DetailTotal (decimal): Total of detail lines
        ApprovalStatus (str): Approval workflow status
        TaxTotal (decimal): Total tax amount
        custom (dict): Custom field container
        files (List[FileLink]): Attached files
    """
    Type: Optional[str] = None
    Vendor: Optional[str] = None
    ReferenceNbr: Optional[str] = None
    Status: Optional[str] = None
    Balance: Optional[Union[str, int, float, Decimal]] = None
    DueDate: Optional[datetime] = None
    DetailTotal: Optional[Union[str, int, float, Decimal]] = None
    ApprovalStatus: Optional[str] = None
    TaxTotal: Optional[Union[str, int, float, Decimal]] = None`;

const inheritanceExample = `# Base class provides serialization
class BaseDataClassModel:
    def build(self) -> dict:
        """Convert model to API-ready dictionary."""
        
    @classmethod
    def from_dict(cls, data: dict) -> 'BaseDataClassModel':
        """Create model from API response."""

# Entity adds common fields
@dataclass
class Entity(BaseDataClassModel):
    id: Optional[str] = None
    custom: Optional[dict] = None
    files: Optional[List['FileLink']] = None

# Your models inherit everything
@dataclass
class Contact(Entity):
    DisplayName: Optional[str] = None
    Email: Optional[str] = None
    # ... other fields`;

const factoryImplementationCode = `class ModelFactory:
    """Dynamically builds Python dataclasses from OpenAPI schema."""
    
    def __init__(self, schema: Dict[str, Any]):
        self._schema = schema
        self._models = {}
        self._primitive_wrappers = {
            "StringValue", "DecimalValue", "BooleanValue", 
            "DateTimeValue", "IntValue", "GuidValue"
        }

    def build_models(self) -> Dict[str, Type[BaseDataClassModel]]:
        """Build all models from schema definitions."""
        definitions = self._schema.get("components", {}).get("schemas", {})
        
        # First pass: Create placeholder classes
        for name in definitions:
            if name not in self._primitive_wrappers:
                # Create empty class to handle forward references
                self._models[name] = type(name, (BaseDataClassModel,), {})
        
        # Second pass: Build complete models
        for name, definition in definitions.items():
            if name in self._primitive_wrappers:
                continue
                
            model_class = self._create_model(name, definition)
            self._models[name] = model_class
        
        # Third pass: Resolve forward references
        self._resolve_forward_references()
        
        return self._models`;

const circularReferenceCode = `# Models can reference each other
@dataclass
class SalesOrder(Entity):
    Customer: Optional['Customer'] = None
    Details: Optional[List['SalesOrderDetail']] = None

@dataclass
class Customer(Entity):
    Orders: Optional[List['SalesOrder']] = None

# Forward references are resolved after all models are created
def _resolve_forward_references(self):
    for model in self._models.values():
        if hasattr(model, '__annotations__'):
            # Update annotations with actual classes
            for field, annotation in model.__annotations__.items():
                resolved = self._resolve_type(annotation)
                model.__annotations__[field] = resolved`;

const primitiveWrapperCode = `# Acumatica wraps primitive values
{
  "Balance": {
    "value": 1234.56
  }
}

# Model Factory handles this automatically
bill = client.models.Bill(
    Balance=1234.56  # Just use the value!
)

# The model's build() method wraps it properly
data = bill.build()
# {"Balance": {"value": 1234.56}}`;

const customFieldsCode = `# Custom fields appear in the schema
{
  "custom": {
    "Document": {
      "AttributeCUSTFIELD": {
        "type": "CustomStringField"
      }
    }
  }
}

# Access custom fields naturally
bill = client.models.Bill()
bill.custom = {
    "Document": {
        "AttributeCUSTFIELD": {"value": "Custom Value"}
    }
}`;

const creatingEntitiesCode = `# Create new entities with models
new_contact = client.models.Contact(
    DisplayName="John Doe",
    Email="john@example.com",
    Phone1="555-0123"
)

# Models validate and format data
created = client.contacts.put_entity(new_contact)`;

const updatingEntitiesCode = `# Partial updates with type safety
update = client.models.Contact(
    id=contact_id,
    Email="newemail@example.com"
    # Only include fields to update
)

updated = client.contacts.put_entity(update)`;

const nestedDataCode = `# Complex nested structures
invoice = client.models.Invoice(
    Customer="CUST001",
    Date=datetime.now(),
    Details=[
        client.models.InvoiceDetail(
            InventoryID="ITEM001",
            Quantity=5,
            UnitPrice=10.00
        ),
        client.models.InvoiceDetail(
            InventoryID="ITEM002", 
            Quantity=3,
            UnitPrice=25.00
        )
    ]
)

# Everything is properly typed!`;

const stubGenerationCode = `# Generate stubs for your instance
from easy_acumatica.generate_stubs import generate_stubs_from_client

# After connecting
client = AcumaticaClient(...)

# Generate .pyi files
generate_stubs_from_client(client)

# Now your IDE knows about all models!`;

const stubExampleCode = `# Generated models.pyi
from typing import Optional, List, Union
from datetime import datetime
from decimal import Decimal

@dataclass
class Bill(Entity):
    """Represents the Bill entity."""
    Type: Optional[str] = ...
    Vendor: Optional[str] = ...
    ReferenceNbr: Optional[str] = ...
    Status: Optional[str] = ...
    Balance: Optional[Union[str, int, float, Decimal]] = ...
    # ... all fields from your schema`;

// Data
const typeMappings = ref([
  { acumatica: 'string', python: 'Optional[str]', example: 'DisplayName: Optional[str]' },
  { acumatica: 'integer', python: 'Optional[int]', example: 'LineNbr: Optional[int]' },
  { acumatica: 'number', python: 'Optional[Union[str, int, float, Decimal]]', example: 'Amount: Optional[Union[str, int, float, Decimal]]' },
  { acumatica: 'boolean', python: 'Optional[bool]', example: 'Active: Optional[bool]' },
  { acumatica: 'date-time', python: 'Optional[datetime]', example: 'CreatedDate: Optional[datetime]' },
  { acumatica: 'array', python: 'Optional[List[T]]', example: 'Details: Optional[List[OrderDetail]]' },
  { acumatica: 'object', python: 'Optional[dict]', example: 'custom: Optional[dict]' }
]);

const bestPractices = ref([
  {
    icon: 'mdi-auto-fix',
    title: 'Trust the Generation',
    description: 'Models are built from your live schema - they\'re always correct',
    color: 'primary'
  },
  {
    icon: 'mdi-file-code',
    title: 'Generate Stubs',
    description: 'Run stub generation for the best IDE experience',
    color: 'secondary'
  },
  {
    icon: 'mdi-delta',
    title: 'Use Partial Updates',
    description: 'Only include fields you want to change when updating',
    color: 'accent'
  },
  {
    icon: 'mdi-package-variant',
    title: 'Let Models Serialize',
    description: 'Use model.build() to get API-ready dictionaries',
    color: 'success'
  },
  {
    icon: 'mdi-shield-check',
    title: 'Type Safety First',
    description: 'Leverage type hints for error prevention',
    color: 'info'
  },
  {
    icon: 'mdi-puzzle',
    title: 'Embrace Custom Fields',
    description: 'Custom fields are discovered automatically',
    color: 'warning'
  }
]);
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  color: white;
  padding: 80px 0 60px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 100%);
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

/* Content */
.main-content {
  background: #fafafa;
  min-height: 100vh;
}

.content-container {
  max-width: 1400px;
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

/* Process List */
.process-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.process-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  line-height: 1.6;
}

.process-list li::before {
  content: counter(list-counter);
  counter-increment: list-counter;
  position: absolute;
  left: 0;
  top: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.process-list {
  counter-reset: list-counter;
}

/* Inheritance Diagram */
.inheritance-diagram {
  text-align: center;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 12px;
}

.inheritance-level {
  margin: 1rem 0;
}

.inheritance-desc {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.5rem;
}

.inheritance-arrow {
  font-size: 1.5rem;
  color: #5e35b1;
  margin: 0.5rem 0;
}

/* Type Mapping Table */
.type-mapping-table {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.type-mapping-table th {
  background: #f5f5f5;
  font-weight: 600;
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

/* Expansion Panels */
.modern-expansion {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}

.expansion-title {
  font-weight: 600;
  font-size: 1.1rem;
}

/* Practice Cards */
.practice-card {
  transition: all 0.3s ease;
  text-align: center;
}

.practice-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 80px;
}
</style>