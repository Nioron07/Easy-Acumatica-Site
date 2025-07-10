<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                RecordBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `RecordBuilder` offers a fluent, generic way to construct JSON payloads for <strong>any</strong> Acumatica entity—customers, orders, stock items, etc.—without manual nesting or merging. It is the most flexible builder in the library.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `RecordBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Core Methods</h2>

                <v-card id="field" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.field(name, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Sets a simple data field, automatically wrapping it in the required `{"value": ...}` structure.</p>
                        <CodeSnippet :code="`rb = RecordBuilder().field('CustomerID', 'CUST100')`" />
                    </v-card-text>
                </v-card>

                <v-card id="link" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.link(name)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Navigates into a linked entity block (e.g., `BillTo` address). This returns a new child builder, allowing you to set fields on the nested object. Use `.up()` to return to the parent.</p>
                        <CodeSnippet :code="linkExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="add_detail" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.add_detail(name)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Appends a new line item to a detail list (e.g., `OrderLines`). This returns a new builder scoped to that specific line, allowing you to set its fields.</p>
                        <CodeSnippet :code="addDetailExample" />
                    </v-card-text>
                </v-card>

                <v-card id="custom" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.custom(view, field, value, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Sets user-defined or custom fields, creating the nested `custom` block in the JSON payload.</p>
                        <CodeSnippet :code="customExample" />
                    </v-card-text>
                </v-card>

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
  { id: 'importing-helpers', title: 'Importing Builder' },
  { id: 'methods', title: 'Core Methods' },
  { id: 'field', title: '  - .field()' },
  { id: 'link', title: '  - .link()' },
  { id: 'add_detail', title: '  - .add_detail()' },
  { id: 'custom', title: '  - .custom()' },
]);

const importingExample = ref(`
from easy_acumatica.models import RecordBuilder
`);

const linkExample = ref(`
rb = RecordBuilder()
rb.link("BillTo") \\
  .field("LocationID", "MAIN") \\
  .field("AddressLine1", "123 Elm St") \\
  .up() # back to root
`);

const addDetailExample = ref(`
order = RecordBuilder().field("OrderType", "SO")

# Add first order line
order.add_detail("OrderLines") \\
     .field("InventoryID", "ABC123") \\
     .field("Quantity", 5)

# The builder is now scoped to the line; .up() is not needed
# to add another line to the same detail list.
order.add_detail("OrderLines") \\
     .field("InventoryID", "XYZ789") \\
     .field("Quantity", 2)
`);

const customExample = ref(`
rb = RecordBuilder()
rb.custom(
    "SalesOrderEntry", 
    "UsrPriority", 
    value="High", 
    type_="CustomStringField"
)
`);
</script>