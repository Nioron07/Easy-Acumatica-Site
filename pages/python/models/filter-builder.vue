<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                FilterBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide explains how to use the `F` object to build flexible, type-safe OData v3 queries in a Pythonic way. This feature uses operator overloading to replace manual string manipulation, making your query logic cleaner and less error-prone.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Helper</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `F` factory object from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>
            
            <section id="f-object" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">The `F` Object: Your Gateway to Filtering</h2>
              <p class="text-body-1 mb-4">
                The `F` object is a factory for creating filter expressions. You can refer to any field in your Acumatica entity by simply accessing it as an attribute on `F`. These `F` objects can then be combined using standard Python operators to build your filter.
              </p>
              <ul class="ml-5 text-body-1">
                <li class="mb-2"><code>F.FieldName</code> creates an expression for a standard field.</li>
                <li class="mb-2"><code>F.MainContact.Email</code> creates an expression for a field on a linked entity, which translates to the OData path `MainContact/Email`.</li>
              </ul>
            </section>

            <section id="operators" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Building Filters with Operators</h2>
                <p class="text-body-1 mb-4">
                    You can use familiar Python operators to create your filter logic. The library automatically translates them to the correct OData syntax.
                </p>

                <v-card id="comparison-operators" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Comparison Operators</v-card-title>
                    <v-card-text>
                        <CodeSnippet :code="comparisonExample" />
                    </v-card-text>
                </v-card>

                <v-card id="logical-operators" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Logical Operators (`&`, `|`, `~`)</v-card-title>
                    <v-card-text>
                      <p class="mb-4">Because Python's `and`, `or`, and `not` keywords cannot be overloaded, we use the bitwise operators `&`, `|`, and `~` for logical operations. <strong>Always wrap individual clauses in parentheses `()` when combining them to ensure correct precedence.</strong></p>
                        <CodeSnippet :code="logicalExample" />
                    </v-card-text>
                </v-card>
            </section>
            
            <section id="functions" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Using OData Functions</h2>
                <p class="text-body-1 mb-4">
                  For OData functions like `tolower`, `substringof`, or `round`, you can chain methods directly onto your `F` object expressions.
                </p>

                <v-card id="string-functions" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">String Functions</v-card-title>
                    <v-card-text>
                        <CodeSnippet :code="stringFunctionsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="date-math-functions" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Date & Math Functions</v-card-title>
                    <v-card-text>
                        <CodeSnippet :code="dateMathFunctionsExample" />
                    </v-card-text>
                </v-card>
            </section>

            <section id="custom-fields" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Filtering on Custom Fields</h2>
              <p class="text-body-1 mb-4">
                You can easily filter on custom fields using the special `F.cf()` helper method.
              </p>
              <CodeSnippet :code="customFieldsExample" />
            </section>

          </v-container>
        </v-col>

        <v-col md="3" class="d-none d-md-block">
          <OnPageNav :items="onPageNavItems" />
        </v-col>
      </v-row>
    </v-container>
    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import OnPageNav from '~/components/OnPageNav.vue';

const onPageNavItems = ref([
  { id: 'introduction', title: 'Introduction' },
  { id: 'importing-helpers', title: 'Importing Helper' },
  { id: 'f-object', title: 'The F Object' },
  { id: 'operators', title: 'Building with Operators' },
  { id: 'comparison-operators', title: '  - Comparison' },
  { id: 'logical-operators', title: '  - Logical' },
  { id: 'functions', title: 'Using OData Functions' },
  { id: 'string-functions', title: '  - String Functions' },
  { id: 'date-math-functions', title: '  - Date & Math' },
  { id: 'custom-fields', title: 'Custom Fields' },
]);

const importingExample = ref(`
from easy_acumatica.models import F, QueryOptions
`);

const comparisonExample = ref(`
# OData: Status eq 'Active'
filter1 = F.Status == 'Active'

# OData: Amount gt 100
filter2 = F.Amount > 100
`);

const logicalExample = ref(`
# OData: (Status eq 'Open') and (Amount gt 1000)
filter1 = (F.Status == 'Open') & (F.Amount > 1000)

# OData: (Country eq 'USA') or (Country eq 'CAN')
filter2 = (F.Country == 'USA') | (F.Country == 'CAN')

# OData: not (startswith(CustomerID, 'TEMP'))
filter3 = ~(F.CustomerID.startswith('TEMP'))
`);

const stringFunctionsExample = ref(`
# Find customers whose name contains 'Corp'
f1 = F.CustomerName.contains('Corp')

# Find customers with a .com email address (case-insensitive)
f2 = F.MainContact.Email.tolower().endswith('.com')
`);

const dateMathFunctionsExample = ref(`
# Find invoices due in December
f1 = F.DueDate.month() == 12

# Find items where the rounded freight cost is greater than 10
f2 = F.Freight.round() > 10
`);

const customFieldsExample = ref(`
# Find records where the custom string field UsrRepairType is 'Battery'
cf_filter = F.cf("String", "ItemSettings", "UsrRepairType") == 'Battery'

# Use it in a larger query
full_query = (F.IsActive == True) & cf_filter
`);
</script>