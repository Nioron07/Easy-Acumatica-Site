<template>
  <div class="filters-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-gradient"></div>
      <div class="animated-bg">
        <div class="floating-symbol symbol-1">&</div>
        <div class="floating-symbol symbol-2">|</div>
        <div class="floating-symbol symbol-3">></div>
        <div class="floating-symbol symbol-4">=</div>
      </div>
      <v-container class="hero-content">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <v-chip color="white" variant="outlined" size="large" class="mb-4 hero-chip">
              <v-icon start>mdi-filter-variant</v-icon>
              OData Filter Builder
            </v-chip>
            <h1 class="hero-title">
              Filters & F Factory
            </h1>
            <p class="hero-subtitle">
              Build type-safe OData filters with Python-like syntax
            </p>
            <div class="hero-demo">
              <div class="demo-transform">
                <div class="demo-python">
                  <span class="demo-label">Python</span>
                  <code>F.Amount > 1000</code>
                </div>
                <v-icon class="transform-arrow">mdi-arrow-right</v-icon>
                <div class="demo-odata">
                  <span class="demo-label">OData</span>
                  <code>Amount gt 1000</code>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Filter Translator Tool -->
    <section class="translator-section">
      <v-container>
        <v-card class="translator-card" elevation="8">
          <v-card-text>
            <h2 class="translator-title">
              <v-icon start color="primary">mdi-translate</v-icon>
              OData to Python Filter Translator
            </h2>
            <p class="translator-subtitle">
              Convert OData filter strings to Easy-Acumatica Python syntax
            </p>
            
            <v-row class="mt-6">
              <v-col cols="12" md="6">
                <div class="translator-input">
                  <label class="input-label">OData Filter String</label>
                  <v-textarea
                    v-model="odataInput"
                    placeholder="Enter OData filter: (CustomerID eq '000001' and SalesTotal ge 100)"
                    variant="outlined"
                    rows="3"
                    auto-grow
                    @input="translateFilter"
                  />
                  <div class="input-examples">
                    <span class="examples-label">Examples:</span>
                    <v-chip 
                      v-for="example in odataExamples" 
                      :key="example"
                      size="small"
                      @click="odataInput = example; translateFilter()"
                      class="example-chip"
                    >
                      {{ example }}
                    </v-chip>
                  </div>
                </div>
              </v-col>
              
              <v-col cols="12" md="6">
                <div class="translator-output">
                  <label class="output-label">Python Syntax</label>
                  <div class="output-box">
                    <pre><code>{{ pythonOutput || 'Translation will appear here...' }}</code></pre>
                    <v-btn
                      v-if="pythonOutput"
                      icon="mdi-content-copy"
                      size="small"
                      variant="text"
                      @click="copyPythonCode"
                      class="copy-btn"
                    >
                      <v-tooltip text="Copy to clipboard" location="top">
                        <template v-slot:activator="{ props }">
                          <v-icon v-bind="props">mdi-content-copy</v-icon>
                        </template>
                      </v-tooltip>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </section>

    <!-- Main Content -->
    <v-container class="content-container">
      <!-- Introduction -->
      <section class="content-section">
        <h2 class="section-title">The F Factory</h2>
        
        <v-row>
          <v-col cols="12">
            <v-card class="info-card">
              <v-card-text>
                <p class="text-body-1">
                  The <code class="inline-code">F</code> factory is your gateway to building type-safe, readable OData filters 
                  using familiar Python syntax. Instead of writing error-prone OData strings, you can use Python operators 
                  and methods that get automatically translated to proper OData syntax.
                </p>
                
                <div class="feature-grid mt-4">
                  <div class="feature-item">
                    <v-icon color="primary">mdi-shield-check</v-icon>
                    <span>Type-safe operations</span>
                  </div>
                  <div class="feature-item">
                    <v-icon color="primary">mdi-code-tags</v-icon>
                    <span>IDE autocomplete</span>
                  </div>
                  <div class="feature-item">
                    <v-icon color="primary">mdi-bug-check</v-icon>
                    <span>Syntax validation</span>
                  </div>
                  <div class="feature-item">
                    <v-icon color="primary">mdi-book-open</v-icon>
                    <span>Readable code</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Basic Operators -->
      <section class="content-section">
        <h2 class="section-title">Basic Operators</h2>
        
        <v-row>
          <v-col v-for="operator in basicOperators" :key="operator.op" cols="12" sm="6" lg="4">
            <v-card class="operator-card h-100">
              <v-card-text>
                <div class="operator-header">
                  <code class="operator-symbol">{{ operator.op }}</code>
                  <v-chip size="small" color="secondary" variant="tonal">
                    {{ operator.odata }}
                  </v-chip>
                </div>
                <p class="operator-desc">{{ operator.desc }}</p>
                <CodePlayground
                  :initial-code="operator.example"
                  language="python"
                  :compact="true"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Logical Operators -->
      <section class="content-section">
        <h2 class="section-title">Logical Operators</h2>
        
        <v-row>
          <v-col cols="12">
            <v-card class="example-card">
              <v-card-text>
                <p class="mb-4">
                  Combine multiple conditions using Python's logical operators. 
                  Parentheses are important for complex expressions!
                </p>
                
                <v-tabs v-model="logicalTab" class="mb-4">
                  <v-tab value="and">AND (&)</v-tab>
                  <v-tab value="or">OR (|)</v-tab>
                  <v-tab value="not">NOT (~)</v-tab>
                  <v-tab value="complex">Complex</v-tab>
                </v-tabs>
                
                <v-window v-model="logicalTab">
                  <v-window-item v-for="example in logicalExamples" :key="example.type" :value="example.type">
                    <CodePlayground
                      :initial-code="example.code"
                      language="python"
                    />
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- String Functions -->
      <section class="content-section">
        <h2 class="section-title">String Functions</h2>
        
        <div class="function-grid">
          <v-row>
            <v-col v-for="func in stringFunctions" :key="func.name" cols="12" md="6">
              <v-card class="function-card">
                <v-card-text>
                  <h3 class="function-name">
                    <code>{{ func.name }}()</code>
                  </h3>
                  <p class="function-desc">{{ func.desc }}</p>
                  <CodePlayground
                    :initial-code="func.example"
                    language="python"
                    :compact="true"
                  />
                  <v-chip 
                    v-if="func.version" 
                    size="x-small" 
                    color="info" 
                    variant="tonal"
                    class="mt-2"
                  >
                    {{ func.version }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </section>

      <!-- Date Functions -->
      <section class="content-section">
        <h2 class="section-title">Date & Time Functions</h2>
        
        <v-row>
          <v-col cols="12">
            <v-alert type="info" variant="tonal" class="mb-4">
              Date functions extract components from datetime fields for filtering
            </v-alert>
          </v-col>
          
          <v-col v-for="func in dateFunctions" :key="func.name" cols="12" sm="6" lg="4">
            <v-card class="date-function-card h-100">
              <v-card-text>
                <h4 class="date-func-name">{{ func.name }}()</h4>
                <p class="date-func-desc">{{ func.desc }}</p>
                <code class="date-func-example">{{ func.example }}</code>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Advanced Features -->
      <section class="content-section">
        <h2 class="section-title">Advanced Features</h2>
        
        <v-expansion-panels class="advanced-panels">
          <v-expansion-panel v-for="feature in advancedFeatures" :key="feature.title">
            <v-expansion-panel-title>
              <div class="panel-title">
                <v-icon :color="feature.color" class="mr-3">{{ feature.icon }}</v-icon>
                {{ feature.title }}
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="mb-4">{{ feature.description }}</p>
              <CodePlayground
                :initial-code="feature.code"
                language="python"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>

      <!-- Best Practices -->
      <section class="content-section">
        <h2 class="section-title">Best Practices</h2>
        
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="practice-card good-practice h-100">
              <v-card-title>
                <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                Do This
              </v-card-title>
              <v-card-text>
                <div class="practice-item" v-for="item in goodPractices" :key="item">
                  <v-icon size="small" color="success">mdi-check</v-icon>
                  <span>{{ item }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card class="practice-card bad-practice h-100">
              <v-card-title>
                <v-icon color="error" class="mr-2">mdi-close-circle</v-icon>
                Avoid This
              </v-card-title>
              <v-card-text>
                <div class="practice-item" v-for="item in badPractices" :key="item">
                  <v-icon size="small" color="error">mdi-close</v-icon>
                  <span>{{ item }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- API Reference -->
      <section class="content-section">
        <h2 class="section-title">Complete API Reference</h2>
        
        <v-card class="reference-card">
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Python Syntax</th>
                  <th>OData Output</th>
                  <th>Description</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ref in apiReference" :key="ref.python">
                  <td><code>{{ ref.python }}</code></td>
                  <td><code>{{ ref.odata }}</code></td>
                  <td>{{ ref.desc }}</td>
                  <td>
                    <v-chip size="x-small" :color="ref.version === 'v4' ? 'info' : 'default'">
                      {{ ref.version }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </section>
    </v-container>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodePlayground from '~/components/CodeSnippet.vue';

// Translator state
const odataInput = ref('');
const pythonOutput = ref('');

// Example OData strings
const odataExamples = [
  "CustomerID eq '000001' and SalesTotal ge 100",
  "Status eq 'Active' or Priority eq 1",
  "startswith(CustomerName, 'ABC') and contains(Email, '@company.com')",
  "year(CreatedDate) eq 2024 and Amount gt 1000"
];

// Filter translation function
const translateFilter = () => {
  if (!odataInput.value) {
    pythonOutput.value = '';
    return;
  }
  
  let translated = odataInput.value;
  
  // Translation mappings
  const replacements = [
    // Operators
    [/ eq /g, ' == '],
    [/ ne /g, ' != '],
    [/ gt /g, ' > '],
    [/ ge /g, ' >= '],
    [/ lt /g, ' < '],
    [/ le /g, ' <= '],
    [/ and /g, ' & '],
    [/ or /g, ' | '],
    [/^not /g, '~'],
    [/ not /g, ' ~'],
    
    // String functions
    [/startswith\(([^,]+),\s*'([^']+)'\)/g, 'F.$1.startswith("$2")'],
    [/endswith\(([^,]+),\s*'([^']+)'\)/g, 'F.$1.endswith("$2")'],
    [/contains\(([^,]+),\s*'([^']+)'\)/g, 'F.$1.contains("$2")'],
    [/tolower\(([^)]+)\)/g, 'F.$1.tolower()'],
    [/toupper\(([^)]+)\)/g, 'F.$1.toupper()'],
    [/trim\(([^)]+)\)/g, 'F.$1.trim()'],
    [/length\(([^)]+)\)/g, 'F.$1.length()'],
    
    // Date functions
    [/year\(([^)]+)\)/g, 'F.$1.year()'],
    [/month\(([^)]+)\)/g, 'F.$1.month()'],
    [/day\(([^)]+)\)/g, 'F.$1.day()'],
    [/hour\(([^)]+)\)/g, 'F.$1.hour()'],
    [/minute\(([^)]+)\)/g, 'F.$1.minute()'],
    [/second\(([^)]+)\)/g, 'F.$1.second()'],
    
    // Field references
    [/(?<!F\.)([A-Za-z][A-Za-z0-9_]*)/g, (match, field) => {
      // Don't replace if it's already F.field or if it's a string value
      if (translated.includes(`F.${field}`) || translated.includes(`"${field}"`) || translated.includes(`'${field}'`)) {
        return match;
      }
      // Check if it's a field name (starts with uppercase or is a known field pattern)
      if (/^[A-Z]/.test(field) || ['id', 'status', 'amount', 'date'].includes(field.toLowerCase())) {
        return `F.${field}`;
      }
      return match;
    }],
    
    // String values
    [/'([^']+)'/g, '"$1"']
  ];
  
  // Apply replacements
  replacements.forEach(([pattern, replacement]) => {
    translated = translated.replace(pattern, replacement);
  });
  
  // Wrap in parentheses if complex
  if (translated.includes(' & ') || translated.includes(' | ')) {
    translated = `(${translated})`;
  }
  
  pythonOutput.value = translated;
};

// Copy function
const copyPythonCode = () => {
  navigator.clipboard.writeText(pythonOutput.value);
  // You might want to add a snackbar notification here
};

// Tabs
const logicalTab = ref('and');

// Data for sections
const basicOperators = ref([
  {
    op: '==',
    odata: 'eq',
    desc: 'Equal to',
    example: `# Check if status equals 'Active'
filter = F.Status == "Active"`
  },
  {
    op: '!=',
    odata: 'ne',
    desc: 'Not equal to',
    example: `# Exclude cancelled orders
filter = F.Status != "Cancelled"`
  },
  {
    op: '>',
    odata: 'gt',
    desc: 'Greater than',
    example: `# Amount greater than 1000
filter = F.Amount > 1000`
  },
  {
    op: '>=',
    odata: 'ge',
    desc: 'Greater than or equal',
    example: `# Priority 1 or higher
filter = F.Priority >= 1`
  },
  {
    op: '<',
    odata: 'lt',
    desc: 'Less than',
    example: `# Quantity below 10
filter = F.Quantity < 10`
  },
  {
    op: '<=',
    odata: 'le',
    desc: 'Less than or equal',
    example: `# Discount up to 20%
filter = F.Discount <= 0.20`
  }
]);

const logicalExamples = ref([
  {
    type: 'and',
    code: `# AND operator - both conditions must be true
filter = (F.Status == "Active") & (F.Amount > 1000)

# Multiple AND conditions
filter = (F.CustomerClass == "WHOLESALE") & (F.CreditLimit >= 10000) & (F.Status == "Active")`
  },
  {
    type: 'or',
    code: `# OR operator - at least one condition must be true
filter = (F.Status == "Active") | (F.Status == "Pending")

# Multiple OR conditions
filter = (F.Priority == 1) | (F.Amount > 5000) | (F.CustomerType == "VIP")`
  },
  {
    type: 'not',
    code: `# NOT operator - negates the condition
filter = ~(F.Status == "Cancelled")

# Equivalent to !=
filter = F.Status != "Cancelled"  # Same as above`
  },
  {
    type: 'complex',
    code: `# Combining AND and OR - use parentheses!
filter = ((F.Status == "Active") | (F.Status == "Pending")) & (F.Amount > 1000)

# Complex business logic
filter = (
    (F.CustomerClass == "RETAIL") & 
    (F.Balance > 0) & 
    ((F.LastOrderDate >= "2024-01-01") | (F.TotalPurchases > 10000))
)`
  }
]);

const stringFunctions = ref([
  {
    name: 'startswith',
    desc: 'Check if string starts with value',
    example: `# Customers starting with 'ABC'
filter = F.CustomerName.startswith("ABC")`
  },
  {
    name: 'endswith',
    desc: 'Check if string ends with value',
    example: `# Emails ending with '@company.com'
filter = F.Email.endswith("@company.com")`
  },
  {
    name: 'contains',
    desc: 'Check if string contains value',
    example: `# Description contains 'urgent'
filter = F.Description.contains("urgent")`
  },
  {
    name: 'tolower',
    desc: 'Convert to lowercase for comparison',
    example: `# Case-insensitive comparison
filter = F.CustomerName.tolower() == "acme corp"`
  },
  {
    name: 'toupper',
    desc: 'Convert to uppercase for comparison',
    example: `# Match uppercase code
filter = F.Code.toupper() == "USA"`
  },
  {
    name: 'trim',
    desc: 'Remove whitespace from both ends',
    example: `# Match after trimming spaces
filter = F.Reference.trim() == "REF123"`
  },
  {
    name: 'length',
    desc: 'Get string length',
    example: `# SKUs longer than 10 characters
filter = F.SKU.length() > 10`
  },
  {
    name: 'concat',
    desc: 'Concatenate strings',
    example: `# Combine first and last name
filter = F.FirstName.concat(" ", F.LastName) == "John Doe"`,
    version: 'OData v4'
  },
  {
    name: 'indexof',
    desc: 'Find position of substring',
    example: `# Check position of substring
filter = F.Email.indexof("@") > 0`,
    version: 'OData v4'
  },
  {
    name: 'substring',
    desc: 'Extract substring',
    example: `# Check area code
filter = F.Phone.substring(0, 3) == "555"`,
    version: 'OData v4'
  }
]);

const dateFunctions = ref([
  {
    name: 'year',
    desc: 'Extract year',
    example: 'F.CreatedDate.year() == 2024'
  },
  {
    name: 'month',
    desc: 'Extract month (1-12)',
    example: 'F.DueDate.month() == 12'
  },
  {
    name: 'day',
    desc: 'Extract day of month',
    example: 'F.OrderDate.day() == 15'
  },
  {
    name: 'hour',
    desc: 'Extract hour (0-23)',
    example: 'F.Timestamp.hour() >= 9'
  },
  {
    name: 'minute',
    desc: 'Extract minute',
    example: 'F.Timestamp.minute() == 30'
  },
  {
    name: 'second',
    desc: 'Extract second',
    example: 'F.Timestamp.second() == 0'
  }
]);

const advancedFeatures = ref([
  {
    title: 'The in_ Operator',
    icon: 'mdi-format-list-bulleted',
    color: 'primary',
    description: 'Check if a value is in a list (OData v4 only)',
    code: `# Check if status is in a list of values
filter = F.Status.in_(["Active", "Pending", "Processing"])

# Equivalent to multiple OR conditions
filter = (F.Status == "Active") | (F.Status == "Pending") | (F.Status == "Processing")

# Works with other types too
filter = F.Priority.in_([1, 2, 3])
filter = F.CustomerID.in_(["C001", "C002", "C003"])`
  },
  {
    title: 'Custom Fields',
    icon: 'mdi-puzzle',
    color: 'secondary',
    description: 'Access custom fields using the cf() method',
    code: `# Access a custom field
filter = F.cf("String", "ItemSettings", "UsrRepairType") == "Warranty"

# Combine with other conditions
filter = (F.Status == "Active") & (F.cf("Decimal", "Document", "UsrCustomAmount") > 100)

# Custom field with date functions
filter = F.cf("DateTime", "Document", "UsrExpiryDate").year() == 2024`
  },
  {
    title: 'Null Handling',
    icon: 'mdi-null',
    color: 'accent',
    description: 'Check for null/empty values',
    code: `# Check if field is null
filter = F.Description == None

# Check if field is not null
filter = F.Description != None

# Combine with other conditions
filter = (F.Notes != None) & (F.Notes.length() > 0)`
  },
  {
    title: 'Complex Expressions',
    icon: 'mdi-code-braces',
    color: 'warning',
    description: 'Build sophisticated filter expressions',
    code: `# Multi-level conditions with proper parentheses
filter = (
    ((F.CustomerClass == "WHOLESALE") | (F.CustomerClass == "RETAIL")) &
    (F.Balance > 0) &
    (F.CreditLimit >= 5000) &
    (
        (F.LastOrderDate.year() == 2024) |
        (F.TotalOrders > 50)
    )
)

# String manipulation with multiple functions
filter = (
    F.Email.tolower().endswith("@company.com") &
    F.CustomerName.trim().length() > 3
)`
  }
]);

const goodPractices = ref([
  'Use F factory for all field references',
  'Use parentheses for complex expressions',
  'Use type-safe operators (==, !=, >, etc.)',
  'Use in_() for multiple value checks',
  'Chain string functions for complex logic',
  'Test filters with small datasets first'
]);

const badPractices = ref([
  'Writing raw OData strings',
  'Forgetting parentheses in complex filters',
  'Using Python "and", "or" instead of &, |',
  'Hardcoding field names as strings',
  'Building filters with string concatenation',
  'Ignoring null value handling'
]);

const apiReference = ref([
  { python: 'F.Field == value', odata: 'Field eq value', desc: 'Equality check', version: 'v3+' },
  { python: 'F.Field != value', odata: 'Field ne value', desc: 'Inequality check', version: 'v3+' },
  { python: 'F.Field > value', odata: 'Field gt value', desc: 'Greater than', version: 'v3+' },
  { python: 'F.Field >= value', odata: 'Field ge value', desc: 'Greater or equal', version: 'v3+' },
  { python: 'F.Field < value', odata: 'Field lt value', desc: 'Less than', version: 'v3+' },
  { python: 'F.Field <= value', odata: 'Field le value', desc: 'Less or equal', version: 'v3+' },
  { python: 'filter1 & filter2', odata: 'filter1 and filter2', desc: 'Logical AND', version: 'v3+' },
  { python: 'filter1 | filter2', odata: 'filter1 or filter2', desc: 'Logical OR', version: 'v3+' },
  { python: '~filter', odata: 'not filter', desc: 'Logical NOT', version: 'v3+' },
  { python: 'F.Field.startswith("val")', odata: 'startswith(Field, "val")', desc: 'String starts with', version: 'v3+' },
  { python: 'F.Field.endswith("val")', odata: 'endswith(Field, "val")', desc: 'String ends with', version: 'v3+' },
  { python: 'F.Field.contains("val")', odata: 'contains(Field, "val")', desc: 'String contains', version: 'v4' },
  { python: 'F.Field.length()', odata: 'length(Field)', desc: 'String length', version: 'v3+' },
  { python: 'F.Field.in_([1,2,3])', odata: 'Field in (1,2,3)', desc: 'Value in list', version: 'v4' },
  { python: 'F.Date.year()', odata: 'year(Date)', desc: 'Extract year', version: 'v3+' },
  { python: 'F.cf("Type", "View", "Field")', odata: 'cf.Type(f="View.Field")', desc: 'Custom field', version: 'v3+' }
]);

// SEO
useSeoMeta({
  title: 'Filters & F Factory - OData Filter Builder | Easy-Acumatica Python',
  description: 'Build type-safe OData filters using Python syntax. Complete guide to the F factory with examples, translator tool, and API reference.',
  ogTitle: 'OData Filters - Easy-Acumatica Python',
  ogDescription: 'Transform Python expressions into OData filters. Type-safe, readable, and powerful.',
});
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  background: #0a0e27;
  overflow: hidden;
  padding: 4rem 0;
  margin-bottom: 3rem;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.9;
}

.animated-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.floating-symbol {
  position: absolute;
  font-size: 4rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.1);
  font-family: 'Fira Code', monospace;
  animation: float-symbol 20s ease-in-out infinite;
}

.symbol-1 { top: 20%; left: 10%; animation-delay: 0s; }
.symbol-2 { top: 60%; right: 15%; animation-delay: 5s; }
.symbol-3 { bottom: 30%; left: 60%; animation-delay: 10s; }
.symbol-4 { top: 40%; right: 40%; animation-delay: 15s; }

@keyframes float-symbol {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(10deg); }
  50% { transform: translateY(0) rotate(-10deg); }
  75% { transform: translateY(-20px) rotate(10deg); }
}
</style>