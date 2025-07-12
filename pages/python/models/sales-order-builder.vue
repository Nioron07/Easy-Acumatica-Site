<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                SalesOrderBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `SalesOrderBuilder` is a fluent builder for creating the JSON payload needed to create or update `SalesOrder` records. It handles top-level fields as well as nested lists for details, payments, and taxes.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `SalesOrderBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="standard-fields" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Standard Fields</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set common header-level fields on the sales order. For any other field, you can use the generic `.set()` method.</p>
                        <CodeSnippet :code="standardFieldsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="add_detail" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.add_detail(**kwargs)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Adds a detail line to the sales order. You can pass any line-level field as a keyword argument.</p>
                        <CodeSnippet :code="addDetailExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="add_payment" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.add_payment(**kwargs)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Adds a payment to the sales order.</p>
                        <CodeSnippet :code="addPaymentExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="add_tax_detail" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.add_tax_detail(**kwargs)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Adds a tax detail line to the sales order, typically for tax overrides.</p>
                        <CodeSnippet :code="addTaxDetailExample" />
                    </v-card-text>
                </v-card>

                <v-card id="to_body" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.to_body()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Once you have set all the required fields and details, call `.to_body()` to generate the final dictionary, ready to be sent as the JSON body in your API request.</p>
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
  { id: 'methods', title: 'Builder Methods' },
  { id: 'standard-fields', title: '  - Standard Fields' },
  { id: 'add_detail', title: '  - .add_detail()' },
  { id: 'add_payment', title: '  - .add_payment()' },
  { id: 'add_tax_detail', title: '  - .add_tax_detail()' },
  { id: 'to_body', title: '  - .to_body()' },
]);

const importingExample = ref(`
from easy_acumatica.models.sales_order_builder import SalesOrderBuilder
`);

const standardFieldsExample = ref(`
so_payload = (
    SalesOrderBuilder()
    .order_type("SO")
    .customer_id("ABCCORP")
    .hold(False)
    .set("Description", "Order for new project materials")
)
`);

const addDetailExample = ref(`
so_payload.add_detail(
    InventoryID="ITEM01",
    OrderQty=5,
    UnitPrice=100.0
)
`);

const addPaymentExample = ref(`
so_payload.add_payment(
    PaymentAmount=500.00,
    PaymentMethod="VISA"
)
`);

const addTaxDetailExample = ref(`
so_payload.add_tax_detail(
    TaxID="NYSTATETAX",
    TaxAmount=42.50
)
`);
</script>