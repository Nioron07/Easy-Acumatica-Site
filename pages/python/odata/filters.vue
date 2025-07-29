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
          <v-card-title class="pa-6">
            <div>
              <h2 class="translator-title">
                <v-icon color="primary" class="mr-3">mdi-swap-horizontal</v-icon>
                Filter Translator
              </h2>
              <p class="translator-subtitle">Convert OData syntax to Python F factory syntax</p>
            </div>
          </v-card-title>
          
          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" md="6">
                <div class="translator-input">
                  <label class="input-label">OData Filter Expression</label>
                  <v-textarea
                    v-model="odataInput"
                    variant="outlined"
                    rows="4"
                    placeholder="Enter OData filter (e.g., Status eq 'Active' and Amount gt 1000)"
                    @input="translateFilter"
                    hide-details
                  ></v-textarea>
                  
                  <div class="input-examples">
                    <span class="examples-label">Try these:</span>
                    <v-chip
                      v-for="(example, i) in odataExamples"
                      :key="i"
                      size="small"
                      class="example-chip"
                      @click="odataInput = example; translateFilter()"
                    >
                      {{ example.substring(0, 40) }}...
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
                
                <div class="basic-example mt-4">
                  <CodeSnippet
                    :code="basicFilterExample"
                    language="python"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Common Filter Patterns -->
      <section class="content-section">
        <h2 class="section-title">Common Filter Patterns</h2>
        
        <v-row>
          <v-col v-for="example in filterExamples" :key="example.title" cols="12" md="6">
            <v-card class="example-card h-100" :color="example.color" variant="outlined">
              <v-card-title>
                <v-icon :icon="example.icon" class="mr-2"></v-icon>
                {{ example.title }}
              </v-card-title>
              <v-card-subtitle>{{ example.description }}</v-card-subtitle>
              <v-card-text>
                <CodeSnippet
                  :code="example.code"
                  language="python"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Advanced Features -->
      <section class="content-section">
        <h2 class="section-title">Advanced Features</h2>
        
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="feature in advancedFeatures"
            :key="feature.title"
          >
            <v-expansion-panel-title>
              <v-icon :icon="feature.icon" class="mr-3"></v-icon>
              {{ feature.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="mb-4">{{ feature.description }}</p>
              <CodeSnippet
                :code="feature.code"
                language="python"
              />
              <v-alert v-if="feature.note" type="info" variant="tonal" class="mt-4">
                {{ feature.note }}
              </v-alert>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>

      <!-- Best Practices -->
      <section class="content-section">
        <h2 class="section-title">Best Practices</h2>
        
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="best-practices-card h-100" color="success" variant="outlined">
              <v-card-title>
                <v-icon>mdi-check-circle</v-icon>
                Do's
              </v-card-title>
              <v-card-text>
                <v-list density="compact">
                  <v-list-item v-for="practice in goodPractices" :key="practice">
                    <template v-slot:prepend>
                      <v-icon color="success" size="small">mdi-check</v-icon>
                    </template>
                    <v-list-item-title>{{ practice }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card class="best-practices-card h-100" color="error" variant="outlined">
              <v-card-title>
                <v-icon>mdi-close-circle</v-icon>
                Don'ts
              </v-card-title>
              <v-card-text>
                <v-list density="compact">
                  <v-list-item v-for="practice in badPractices" :key="practice">
                    <template v-slot:prepend>
                      <v-icon color="error" size="small">mdi-close</v-icon>
                    </template>
                    <v-list-item-title>{{ practice }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Complete Function Reference -->
      <section class="content-section">
        <h2 class="section-title">Complete Function Reference</h2>
        
        <v-card>
          <v-card-text>
            <p class="mb-4">All available filter operations and their OData equivalents:</p>
            
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
                    <v-chip size="x-small" :color="ref.version.includes('v4') ? 'warning' : 'info'">
                      {{ ref.version }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <h3 class="mt-6 mb-3">Additional Functions</h3>
            <v-table>
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Example</th>
                  <th>Description</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="func in additionalFunctions" :key="func.name">
                  <td><code>{{ func.name }}</code></td>
                  <td><code>{{ func.example }}</code></td>
                  <td>{{ func.desc }}</td>
                  <td>
                    <v-chip size="x-small" :color="func.version.includes('v4') ? 'warning' : 'info'">
                      {{ func.version }}
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
import CodeSnippet from '~/components/CodeSnippet.vue';

// Translator state
const odataInput = ref('');
const pythonOutput = ref('');

// Example OData strings
const odataExamples = [
  "CustomerID eq 'ABC123' and Amount gt 1000",
  "Status eq 'Active' or Priority eq 1",
  "startswith(CustomerName, 'ABC') and contains(Email, '@company.com')",
  "year(CreatedDate) eq 2024 and month(CreatedDate) ge 6",
  "Price mul Quantity gt 500",
  "CustomerClass in ('WHOLESALE', 'RETAIL')"
];

// Enhanced filter translation function
const translateFilter = () => {
  if (!odataInput.value) {
    pythonOutput.value = '';
    return;
  }
  
  let translated = odataInput.value;
  
  // First, handle nested function calls by parsing from inside out
  const functionPatterns = [
    // Date/time functions
    { pattern: /year\(([^)]+)\)/g, replacement: 'F.$1.year()' },
    { pattern: /month\(([^)]+)\)/g, replacement: 'F.$1.month()' },
    { pattern: /day\(([^)]+)\)/g, replacement: 'F.$1.day()' },
    { pattern: /hour\(([^)]+)\)/g, replacement: 'F.$1.hour()' },
    { pattern: /minute\(([^)]+)\)/g, replacement: 'F.$1.minute()' },
    { pattern: /second\(([^)]+)\)/g, replacement: 'F.$1.second()' },
    
    // String functions with arguments
    { pattern: /startswith\(([^,]+),\s*'([^']+)'\)/g, replacement: 'F.$1.startswith("$2")' },
    { pattern: /endswith\(([^,]+),\s*'([^']+)'\)/g, replacement: 'F.$1.endswith("$2")' },
    { pattern: /contains\(([^,]+),\s*'([^']+)'\)/g, replacement: 'F.$1.contains("$2")' },
    { pattern: /substringof\('([^']+)',\s*([^)]+)\)/g, replacement: 'F.$2.substringof("$1")' },
    { pattern: /indexof\(([^,]+),\s*'([^']+)'\)/g, replacement: 'F.$1.indexof("$2")' },
    { pattern: /substring\(([^,]+),\s*(\d+)\)/g, replacement: 'F.$1.substring($2)' },
    { pattern: /substring\(([^,]+),\s*(\d+),\s*(\d+)\)/g, replacement: 'F.$1.substring($2, $3)' },
    { pattern: /replace\(([^,]+),\s*'([^']+)',\s*'([^']+)'\)/g, replacement: 'F.$1.replace("$2", "$$3")' },
    
    // String functions without arguments
    { pattern: /tolower\(([^)]+)\)/g, replacement: 'F.$1.tolower()' },
    { pattern: /toupper\(([^)]+)\)/g, replacement: 'F.$1.toupper()' },
    { pattern: /trim\(([^)]+)\)/g, replacement: 'F.$1.trim()' },
    { pattern: /length\(([^)]+)\)/g, replacement: 'F.$1.length()' },
    
    // Math functions
    { pattern: /round\(([^)]+)\)/g, replacement: 'F.$1.round()' },
    { pattern: /floor\(([^)]+)\)/g, replacement: 'F.$1.floor()' },
    { pattern: /ceiling\(([^)]+)\)/g, replacement: 'F.$1.ceiling()' }
  ];
  
  // Apply function transformations
  functionPatterns.forEach(({ pattern, replacement }) => {
    translated = translated.replace(pattern, replacement);
  });
  
  // Handle 'in' operator for v4
  translated = translated.replace(/(\w+)\s+in\s+\(([^)]+)\)/g, (match, field, values) => {
    // Convert values to Python list format
    const pythonValues = values.replace(/'/g, '"');
    return `F.${field}.in_([${pythonValues}])`;
  });
  
  // Replace operators (order matters!)
  const operatorReplacements = [
    [/ eq /g, ' == '],
    [/ ne /g, ' != '],
    [/ gt /g, ' > '],
    [/ ge /g, ' >= '],
    [/ lt /g, ' < '],
    [/ le /g, ' <= '],
    [/ and /g, ' & '],
    [/ or /g, ' | '],
    [/^not\s+/g, '~'],
    [/\s+not\s+/g, ' ~'],
    
    // Arithmetic operators
    [/ add /g, ' + '],
    [/ sub /g, ' - '],
    [/ mul /g, ' * '],
    [/ div /g, ' / '],
    [/ mod /g, ' % ']
  ];
  
  operatorReplacements.forEach(([pattern, replacement]) => {
    translated = translated.replace(pattern, replacement);
  });
  
  // Handle field references - add F. prefix to unquoted identifiers
  translated = translated.replace(/(?<![F.])\b([A-Z][a-zA-Z0-9_]*)\b(?!\s*\()/g, 'F.$1');
  
  // Convert string literals from single to double quotes
  translated = translated.replace(/'([^']*)'/g, '"$1"');
  
  // Handle null
  translated = translated.replace(/\bnull\b/g, 'None');
  
  // Clean up any double F. prefixes
  translated = translated.replace(/F\.F\./g, 'F.');
  
  pythonOutput.value = translated;
};

// Copy functionality
const copyPythonCode = async () => {
  try {
    await navigator.clipboard.writeText(pythonOutput.value);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Basic example
const basicFilterExample = `from easy_acumatica import F

# Import the F factory
from easy_acumatica import F

# Create simple filters
active_filter = F.Status == "Active"
high_value_filter = F.Amount > 1000

# Combine filters with logical operators
combined_filter = (F.Status == "Active") & (F.Amount > 1000)

# Use the filter with QueryOptions
from easy_acumatica import QueryOptions

options = QueryOptions(filter=combined_filter)
results = client.customers.get_list(options)`;

// Filter examples
const filterExamples = ref([
  {
    title: 'Basic Comparisons',
    icon: 'mdi-compare',
    color: 'primary',
    description: 'Use standard Python operators for comparisons',
    code: `# Equality
filter = F.CustomerID == "ABCDE"

# Inequality
filter = F.Status != "Deleted"

# Greater than / Less than
filter = (F.Amount > 1000) & (F.Amount <= 5000)

# Null checks
filter = F.DeletedDate == None
filter = F.Description != None`
  },
  {
    title: 'Logical Operations',
    icon: 'mdi-brain',
    color: 'success',
    description: 'Combine filters with &, |, and ~',
    code: `# AND operation
filter = (F.Status == "Active") & (F.Balance > 0)

# OR operation
filter = (F.Priority == "High") | (F.DueDate < datetime.now())

# NOT operation
filter = ~(F.Status == "Deleted")

# Complex combination
filter = (
    (F.CustomerClass == "WHOLESALE") & 
    ((F.CreditLimit >= 10000) | (F.PrepaymentRequired == False))
)`
  },
  {
    title: 'String Functions',
    icon: 'mdi-format-text',
    color: 'info',
    description: 'Built-in string manipulation functions',
    code: `# String matching
filter = F.CustomerName.startswith("ABC")
filter = F.Email.endswith("@company.com")
filter = F.Description.contains("urgent")

# String transformation
filter = F.CustomerName.tolower() == "acme corp"
filter = F.Code.toupper().startswith("US")

# String length
filter = F.Description.length() > 100
filter = F.Code.trim().length() == 5`
  },
  {
    title: 'Date Functions',
    icon: 'mdi-calendar',
    color: 'warning',
    description: 'Extract date components for filtering',
    code: `# Date component extraction
filter = F.CreatedDate.year() == 2024
filter = F.DueDate.month() == 12
filter = F.OrderDate.day() <= 15

# Date range filters
filter = (F.Date.year() == 2024) & (F.Date.month() >= 6)

# Time components
filter = F.Timestamp.hour() >= 9
filter = F.Timestamp.minute() == 0`
  },
  {
    title: 'Arithmetic Operations',
    icon: 'mdi-calculator',
    color: 'purple',
    description: 'Perform calculations in filters',
    code: `# Basic arithmetic
filter = (F.Price * F.Quantity) > 1000
filter = (F.Total - F.Discount) >= 500

# Percentage calculations
filter = (F.Discount / F.Total) > 0.1
filter = F.Quantity % 10 == 0

# Complex expressions
filter = ((F.Price * 1.1) + F.Tax) <= F.MaxPrice`
  },
  {
    title: 'List Operations (v4)',
    icon: 'mdi-format-list-checks',
    color: 'teal',
    description: 'Check if value is in a list',
    code: `# In operator (OData v4 only)
filter = F.Status.in_(["Active", "Pending", "Processing"])
filter = F.CustomerClass.in_(["WHOLESALE", "RETAIL"])

# Multiple values
customer_ids = ["CUST001", "CUST002", "CUST003"]
filter = F.CustomerID.in_(customer_ids)`
  }
]);

// Advanced features
const advancedFeatures = ref([
  {
    title: 'Custom Fields',
    icon: 'mdi-puzzle',
    description: 'Access custom fields using the cf() method',
    code: `# Access a custom field
filter = F.cf("String", "ItemSettings", "UsrRepairType") == "Warranty"

# Custom field with type specification
filter = F.cf("Decimal", "Document", "UsrCustomAmount") > 100

# Combine with other conditions
filter = (
    (F.Status == "Active") & 
    (F.cf("DateTime", "Document", "UsrExpiryDate").year() == 2024)
)`,
    note: 'Custom fields require the field type, view name, and field name'
  },
  {
    title: 'Nested Properties',
    icon: 'mdi-file-tree',
    description: 'Access properties through relationships',
    code: `# Access nested properties
filter = F.Customer.CustomerClass == "WHOLESALE"
filter = F.MainContact.Email.endswith("@company.com")

# Multiple levels
filter = F.DefaultLocation.Address.State == "CA"

# Combine with functions
filter = F.Customer.Balance > 1000`,
    note: 'Ensure related entities are included in expand parameter'
  },
  {
    title: 'Complex Expressions',
    icon: 'mdi-code-braces',
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
    F.Email.tolower().trim().endswith("@company.com") &
    F.CustomerName.replace(" ", "").length() > 5
)`,
    note: 'Use parentheses to ensure correct operator precedence'
  },
  {
    title: 'Special Characters',
    icon: 'mdi-format-quote-close',
    description: 'Handle special characters in string values',
    code: `# Single quotes in strings are automatically escaped
filter = F.CustomerName == "O'Brien's Company"

# Special characters
filter = F.Description.contains("50% off")
filter = F.Code == "A&B-123"

# Unicode characters
filter = F.CompanyName == "Café Société"`,
    note: 'The F factory automatically handles escaping special characters'
  }
]);

// Best practices
const goodPractices = ref([
  'Use F factory for all field references',
  'Use parentheses for complex expressions',
  'Use type-safe operators (==, !=, >, etc.)',
  'Use in_() for multiple value checks',
  'Chain string functions for complex logic',
  'Test filters with small datasets first',
  'Use meaningful variable names for filters'
]);

const badPractices = ref([
  'Writing raw OData strings',
  'Forgetting parentheses in complex filters',
  'Using Python "and", "or" instead of &, |',
  'Hardcoding field names as strings',
  'Building filters with string concatenation',
  'Ignoring null value handling',
  'Creating overly complex single expressions'
]);

// API Reference
const apiReference = ref([
  // Comparison operators
  { python: 'F.Field == value', odata: 'Field eq value', desc: 'Equality check', version: 'v3+' },
  { python: 'F.Field != value', odata: 'Field ne value', desc: 'Inequality check', version: 'v3+' },
  { python: 'F.Field > value', odata: 'Field gt value', desc: 'Greater than', version: 'v3+' },
  { python: 'F.Field >= value', odata: 'Field ge value', desc: 'Greater or equal', version: 'v3+' },
  { python: 'F.Field < value', odata: 'Field lt value', desc: 'Less than', version: 'v3+' },
  { python: 'F.Field <= value', odata: 'Field le value', desc: 'Less or equal', version: 'v3+' },
  
  // Logical operators
  { python: 'filter1 & filter2', odata: 'filter1 and filter2', desc: 'Logical AND', version: 'v3+' },
  { python: 'filter1 | filter2', odata: 'filter1 or filter2', desc: 'Logical OR', version: 'v3+' },
  { python: '~filter', odata: 'not filter', desc: 'Logical NOT', version: 'v3+' },
  
  // Arithmetic operators
  { python: 'F.Field + value', odata: 'Field add value', desc: 'Addition', version: 'v3+' },
  { python: 'F.Field - value', odata: 'Field sub value', desc: 'Subtraction', version: 'v3+' },
  { python: 'F.Field * value', odata: 'Field mul value', desc: 'Multiplication', version: 'v3+' },
  { python: 'F.Field / value', odata: 'Field div value', desc: 'Division', version: 'v3+' },
  { python: 'F.Field % value', odata: 'Field mod value', desc: 'Modulo', version: 'v3+' },
  
  // String functions
  { python: 'F.Field.startswith("val")', odata: 'startswith(Field, \'val\')', desc: 'String starts with', version: 'v3+' },
  { python: 'F.Field.endswith("val")', odata: 'endswith(Field, \'val\')', desc: 'String ends with', version: 'v3+' },
  { python: 'F.Field.contains("val")', odata: 'contains(Field, \'val\')', desc: 'String contains', version: 'v4' },
  { python: 'F.Field.substringof("val")', odata: 'substringof(\'val\', Field)', desc: 'String contains (v3)', version: 'v3' },
  { python: 'F.Field.length()', odata: 'length(Field)', desc: 'String length', version: 'v3+' },
  { python: 'F.Field.indexof("val")', odata: 'indexof(Field, \'val\')', desc: 'Find substring index', version: 'v3+' },
  { python: 'F.Field.substring(start)', odata: 'substring(Field, start)', desc: 'Extract substring', version: 'v3+' },
  { python: 'F.Field.tolower()', odata: 'tolower(Field)', desc: 'Convert to lowercase', version: 'v3+' },
  { python: 'F.Field.toupper()', odata: 'toupper(Field)', desc: 'Convert to uppercase', version: 'v3+' },
  { python: 'F.Field.trim()', odata: 'trim(Field)', desc: 'Remove whitespace', version: 'v3+' },
  { python: 'F.Field.replace("a", "b")', odata: 'replace(Field, \'a\', \'b\')', desc: 'Replace substring', version: 'v4' },
  
  // Date functions
  { python: 'F.Date.year()', odata: 'year(Date)', desc: 'Extract year', version: 'v3+' },
  { python: 'F.Date.month()', odata: 'month(Date)', desc: 'Extract month', version: 'v3+' },
  { python: 'F.Date.day()', odata: 'day(Date)', desc: 'Extract day', version: 'v3+' },
  { python: 'F.Time.hour()', odata: 'hour(Time)', desc: 'Extract hour', version: 'v3+' },
  { python: 'F.Time.minute()', odata: 'minute(Time)', desc: 'Extract minute', version: 'v3+' },
  { python: 'F.Time.second()', odata: 'second(Time)', desc: 'Extract second', version: 'v3+' },
  
  // Other
  { python: 'F.Field.in_([1,2,3])', odata: 'Field in (1,2,3)', desc: 'Value in list', version: 'v4' },
  { python: 'F.cf("Type", "View", "Field")', odata: 'cf.Type(f=\'View.Field\')', desc: 'Custom field', version: 'v3+' }
]);

// Additional functions
const additionalFunctions = ref([
  { name: 'round()', example: 'F.Price.round()', desc: 'Round to nearest integer', version: 'v3+' },
  { name: 'floor()', example: 'F.Price.floor()', desc: 'Round down to integer', version: 'v3+' },
  { name: 'ceiling()', example: 'F.Price.ceiling()', desc: 'Round up to integer', version: 'v3+' },
  { name: 'has()', example: 'F.Field.has(Enum.Value)', desc: 'Check enum flag', version: 'v4' },
  { name: 'cast()', example: 'F.Field.cast("Edm.String")', desc: 'Type cast', version: 'v4' },
  { name: 'isof()', example: 'F.Field.isof("Type")', desc: 'Type check', version: 'v4' },
  { name: 'divby()', example: 'F.Total.divby(12)', desc: 'Decimal division', version: 'v4' },
  { name: 'matchesPattern()', example: 'F.Email.matchesPattern(".*@.*")', desc: 'Regex match', version: 'v4' }
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
  75% { transform: translateY(20px) rotate(5deg); }
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
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin: 1rem 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 300;
}

.hero-demo {
  display: inline-block;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.demo-transform {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.demo-python, .demo-odata {
  text-align: center;
}

.demo-label {
  display: block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.demo-python code, .demo-odata code {
  font-size: 1.25rem;
  color: white;
  font-family: 'Fira Code', monospace;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: block;
}

.transform-arrow {
  color: rgba(255, 255, 255, 0.7);
  font-size: 2rem;
  animation: pulse-arrow 2s ease-in-out infinite;
}

@keyframes pulse-arrow {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

/* Translator Section */
.translator-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 3rem 0;
  margin-bottom: 3rem;
}

.translator-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
}

.translator-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.translator-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.translator-subtitle {
  color: #666;
  font-size: 1.1rem;
}

.translator-input, .translator-output {
  height: 100%;
}

.input-label, .output-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-examples {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.examples-label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.example-chip {
  cursor: pointer;
  transition: all 0.2s ease;
}

.example-chip:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.output-box {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 1rem;
  min-height: 120px;
  position: relative;
}

.output-box pre {
  margin: 0;
  color: #e6e6e6;
}

.output-box code {
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
}

.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.copy-btn:hover {
  color: white;
}

/* Content Sections */
.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

/* Cards */
.info-card {
  background: #f8f9fa;
  border-radius: 16px;
  overflow: hidden;
}

.example-card {
  height: 100%;
  transition: all 0.3s ease;
}

.example-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.best-practices-card {
  height: 100%;
  transition: all 0.3s ease;
}

.best-practices-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Code styling */
.inline-code {
  background: rgba(102, 126, 234, 0.1);
  color: #5e35b1;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
}

/* Table styling */
.v-table {
  background: transparent;
}

.v-table thead tr {
  background: #f5f5f5;
}

.v-table tbody tr:hover {
  background: #fafafa;
}

/* Mobile responsiveness */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .demo-transform {
    flex-direction: column;
    gap: 1rem;
  }
  
  .transform-arrow {
    transform: rotate(90deg);
  }
  
  @keyframes pulse-arrow {
    0%, 100% { transform: rotate(90deg) translateX(0); }
    50% { transform: rotate(90deg) translateX(5px); }
  }
}
</style>