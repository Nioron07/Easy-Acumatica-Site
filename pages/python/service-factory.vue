<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <h1 class="hero-title">Service Factory</h1>
            <p class="hero-subtitle">
              Dynamic runtime generation of service classes from your Acumatica schema
            </p>
            <div class="hero-features">
              <div class="feature-pill">
                <v-icon size="small">mdi-factory</v-icon>
                Runtime Generation
              </div>
              <div class="feature-pill">
                <v-icon size="small">mdi-code-tags</v-icon>
                Full Autocomplete
              </div>
              <div class="feature-pill">
                <v-icon size="small">mdi-api</v-icon>
                Type-Safe Methods
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
                    The Service Factory is the heart of Easy-Acumatica's dynamic architecture. Instead of maintaining static service definitions, it generates service classes at runtime by introspecting your Acumatica instance's OpenAPI and OData schemas.
                  </p>
                  
                  <v-alert type="info" variant="tonal" class="mb-4">
                    <strong>Key Insight:</strong> Every service method is created dynamically when you initialize the client, ensuring perfect alignment with your instance's actual capabilities.
                  </v-alert>

                  <h3 class="subsection-title mt-6 mb-3">How It Works</h3>
                  <ol class="process-list">
                    <li><strong>Schema Discovery:</strong> The client fetches OpenAPI and OData schemas from your instance</li>
                    <li><strong>Service Generation:</strong> ServiceFactory parses the schemas and creates service classes</li>
                    <li><strong>Method Creation:</strong> Each endpoint operation becomes a properly typed method</li>
                    <li><strong>Client Attachment:</strong> Services are attached to the client as attributes (e.g., <code>client.bills</code>)</li>
                    <li><strong>Stub Generation:</strong> Type stubs are created for IDE autocomplete support</li>
                  </ol>
                </v-card-text>
              </v-card>
            </section>

            <!-- Implementation Details -->
            <section id="implementation" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-cog-outline</v-icon>
                Implementation Details
              </h2>

              <v-tabs v-model="implementationTab" class="modern-tabs mb-6">
                <v-tab value="factory">Factory Process</v-tab>
                <v-tab value="methods">Method Generation</v-tab>
                <v-tab value="stubs">Type Stubs</v-tab>
              </v-tabs>

              <v-tabs-window v-model="implementationTab">
                <v-tabs-window-item value="factory">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">The Factory Process</h3>
                      <p class="mb-4">
                        The <code>ServiceFactory</code> class performs sophisticated schema analysis:
                      </p>
                      
                      <CodeSnippet :code="factoryProcessCode" />
                      
                      <p class="mt-4">
                        The factory handles both OpenAPI paths (for standard REST operations) and OData metadata (for Generic Inquiries), creating a unified service interface.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="methods">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Dynamic Method Creation</h3>
                      <p class="mb-4">
                        Methods are created using Python's dynamic function generation capabilities:
                      </p>
                      
                      <CodeSnippet :code="methodGenerationCode" />
                      
                      <p class="mt-4">
                        Each method is wrapped with proper error handling, rate limiting, and automatic session management.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="stubs">
                  <v-card elevation="1">
                    <v-card-text>
                      <h3 class="subsection-title mb-3">Type Stub Generation</h3>
                      <p class="mb-4">
                        For IDE support, Easy-Acumatica generates <code>.pyi</code> stub files:
                      </p>
                      
                      <CodeSnippet :code="stubGenerationCode" />
                      
                      <v-alert type="success" variant="tonal" class="mt-4">
                        <strong>Result:</strong> Full autocomplete and type checking in VSCode, PyCharm, and other Python IDEs!
                      </v-alert>
                    </v-card-text>
                  </v-card>
                </v-tabs-window-item>
              </v-tabs-window>
            </section>

            <!-- Service Patterns -->
            <section id="patterns" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-palette-outline</v-icon>
                Service Patterns
              </h2>

              <v-card elevation="2">
                <v-card-text>
                  <p class="mb-4">
                    The Service Factory recognizes and implements these method patterns:
                  </p>
                  
                  <MethodPatternTable :patterns="servicePatterns" />
                  
                  <h3 class="subsection-title mt-6 mb-3">Naming Convention</h3>
                  <p>
                    Service names follow a predictable pattern:
                  </p>
                  <ul class="naming-list mt-3">
                    <li><strong>Entity Name:</strong> <code>Bill</code> → <code>client.bills</code></li>
                    <li><strong>Multi-word:</strong> <code>SalesOrder</code> → <code>client.sales_orders</code></li>
                    <li><strong>Inquiries:</strong> <code>AccountSummary</code> → <code>client.account_summarys</code></li>
                  </ul>
                </v-card-text>
              </v-card>
            </section>

            <!-- Advanced Features -->
            <section id="advanced" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-rocket</v-icon>
                Advanced Features
              </h2>

              <v-expansion-panels variant="accordion" class="modern-expansion">
                <v-expansion-panel>
                  <v-expansion-panel-title class="expansion-title">
                    <v-icon start>mdi-memory</v-icon>
                    Schema Caching
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="mb-3">
                      The Service Factory implements intelligent schema caching to improve performance:
                    </p>
                    <CodeSnippet :code="cachingExample" />
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="expansion-title">
                    <v-icon start>mdi-puzzle</v-icon>
                    Custom Endpoints
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="mb-3">
                      The factory automatically discovers and wraps custom endpoints:
                    </p>
                    <CodeSnippet :code="customEndpointExample" />
                  </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-title class="expansion-title">
                    <v-icon start>mdi-shield-check</v-icon>
                    Method Validation
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="mb-3">
                      All generated methods include automatic validation:
                    </p>
                    <CodeSnippet :code="validationExample" />
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </section>

            <!-- Best Practices -->
            <section id="practices" class="content-section">
              <h2 class="section-title">
                <v-icon class="section-icon">mdi-lightbulb-outline</v-icon>
                Best Practices
              </h2>

              <v-card elevation="2">
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="practice in bestPractices" :key="practice.title">
                      <template v-slot:prepend>
                        <v-avatar color="primary" size="32">
                          <v-icon size="small">{{ practice.icon }}</v-icon>
                        </v-avatar>
                      </template>
                      <v-list-item-title class="font-weight-medium">
                        {{ practice.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ practice.description }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
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
import MethodPatternTable from '../../components/MethodPatternTable.vue';

// SEO Configuration
useSeoMeta({
  title: 'Service Factory | Easy-Acumatica Python Docs',
  description: 'Learn how Easy-Acumatica dynamically generates service classes at runtime. Understand the factory pattern, method generation, and type stub creation for perfect IDE support.',
  ogTitle: 'Service Factory - Dynamic API Generation',
  ogDescription: 'Discover how Easy-Acumatica creates type-safe service methods dynamically from your Acumatica schema.',
  ogImage: 'https://www.easyacumatica.com/social-images/service-factory.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica Service Factory',
  twitterDescription: 'Runtime service generation with full type safety and autocomplete support.',
  twitterImage: 'https://www.easyacumatica.com/social-images/service-factory.png',
});

// Navigation items
const navItems = ref([
  { id: 'architecture', title: 'Architecture', icon: 'mdi-office-building' },
  { id: 'implementation', title: 'Implementation', icon: 'mdi-cog-outline' },
  { id: 'patterns', title: 'Service Patterns', icon: 'mdi-palette-outline' },
  { id: 'advanced', title: 'Advanced Features', icon: 'mdi-rocket' },
  { id: 'practices', title: 'Best Practices', icon: 'mdi-lightbulb-outline' }
]);

// Tab state
const implementationTab = ref('factory');

// Code examples
const factoryProcessCode = `class ServiceFactory:
    """Dynamically builds service classes from Acumatica schemas."""
    
    def __init__(self, client: AcumaticaClient, schema: Dict[str, Any]):
        self._client = client
        self._schema = schema

    def build_services(self) -> Dict[str, BaseService]:
        """Parse schemas and generate all services."""
        services = {}
        
        # Parse OpenAPI paths
        paths = self._schema.get("paths", {})
        for path, operations in paths.items():
            tag = self._extract_tag(operations)
            if tag not in services:
                services[tag] = self._create_service(tag)
            
            # Add methods for each operation
            for method, details in operations.items():
                self._add_method_to_service(
                    services[tag], path, method, details
                )
        
        # Parse OData metadata for Generic Inquiries
        odata_services = self._parse_odata_metadata()
        services.update(odata_services)
        
        return services`;

const methodGenerationCode = `def _create_method(self, operation_id: str, details: Dict) -> Callable:
    """Generate a method dynamically based on operation details."""
    
    # Determine method template based on operation type
    if "GetList" in operation_id:
        def method(self, options: QueryOptions = None, api_version: str = None):
            """Fetches a list of entities."""
            return self._get_list(options=options, api_version=api_version)
    
    elif "PutEntity" in operation_id:
        def method(self, data: Union[dict, BaseModel], options: QueryOptions = None):
            """Creates or updates an entity."""
            return self._put_entity(data, options=options)
    
    elif "InvokeAction" in operation_id:
        def method(self, invocation: BaseModel, api_version: str = None):
            """Invokes a custom action."""
            action_name = self._extract_action_name(operation_id)
            return self._post_action(action_name, invocation.build())
    
    # Generate docstring from OpenAPI spec
    method.__doc__ = self._generate_docstring(operation_id, details)
    method.__name__ = self._to_snake_case(operation_id)
    
    return method`;

const stubGenerationCode = `def generate_service_stub(service_name: str, service: BaseService) -> List[str]:
    """Generate type stub for a service class."""
    lines = [f"class {service_name}Service(BaseService):"]
    
    # Add class docstring
    if service.__doc__:
        lines.append(f'    """{service.__doc__}"""')
    
    # Generate method stubs
    for method_name in dir(service):
        if method_name.startswith('_'):
            continue
            
        method = getattr(service, method_name)
        if not callable(method):
            continue
        
        # Extract signature using inspect
        sig = inspect.signature(method)
        params = []
        
        for param_name, param in sig.parameters.items():
            if param_name == 'self':
                params.append('self')
            else:
                # Get type annotation
                annotation = get_type_string(param.annotation)
                default = '...' if param.default != param.empty else ''
                params.append(f'{param_name}: {annotation}{default}')
        
        # Add method stub
        return_type = get_type_string(sig.return_annotation)
        lines.append(f'    def {method_name}({", ".join(params)}) -> {return_type}:')
        if method.__doc__:
            lines.append(f'        """{method.__doc__}"""')
        lines.append('        ...')
    
    return lines`;

const cachingExample = `# Schema caching is automatic
client = AcumaticaClient(
    base_url="https://example.acumatica.com",
    username="user",
    password="pass",
    tenant="Company"
)

# First initialization fetches and caches schemas
# Subsequent operations use cached data

# Force schema refresh if needed
client._schema_cache.clear()
client._populate_endpoint_info()`;

const customEndpointExample = `# Custom endpoints are discovered automatically
# If you have a custom endpoint "MyCustomAPI/1.0"

# It becomes available as:
client.my_custom_apis.get_list()
client.my_custom_apis.put_entity(data)

# With full autocomplete support!`;

const validationExample = `# All methods include automatic validation

# Entity ID validation
client.bills.get_by_id("invalid-id")  # Raises ValueError

# Data validation
client.bills.put_entity("not-a-dict")  # Raises TypeError

# Options validation  
client.bills.get_list(options="invalid")  # Raises TypeError`;

// Data
const servicePatterns = ref([
  {
    pattern: 'get_list(options)',
    description: 'Retrieves a filtered list of entities using OData query options'
  },
  {
    pattern: 'get_by_id(entity_id, options)',
    description: 'Fetches a single entity by its primary key'
  },
  {
    pattern: 'put_entity(data, options)',
    description: 'Creates a new entity or updates an existing one'
  },
  {
    pattern: 'delete_by_id(entity_id)',
    description: 'Deletes an entity by its primary key'
  },
  {
    pattern: 'invoke_action(invocation)',
    description: 'Executes a custom action on the entity'
  },
  {
    pattern: 'put_file(entity_id, filename, data)',
    description: 'Attaches a file to an entity'
  },
  {
    pattern: 'get_files(entity_id)',
    description: 'Retrieves files attached to an entity'
  }
]);

const bestPractices = ref([
  {
    icon: 'mdi-refresh',
    title: 'Let the Factory Work',
    description: 'Trust the automatic generation process. Services are created to match your exact instance configuration.'
  },
  {
    icon: 'mdi-code-tags',
    title: 'Generate Stubs for IDEs',
    description: 'Run the stub generator after client initialization for the best development experience.'
  },
  {
    icon: 'mdi-cached',
    title: 'Cache Schema Appropriately',
    description: 'Schema caching improves performance. Clear cache only when your instance structure changes.'
  },
  {
    icon: 'mdi-puzzle',
    title: 'Embrace Dynamic Methods',
    description: 'Methods are created to match your endpoints exactly. No need to worry about missing functionality.'
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

/* Lists */
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

.naming-list {
  list-style: none;
  padding: 0;
}

.naming-list li {
  padding: 0.5rem 0;
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

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 80px;
}
</style>