<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                ShipmentBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `ShipmentBuilder` is your primary tool for creating the JSON payload needed to create or update `Shipment` records with the `ShipmentsService`.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `ShipmentBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="standard-fields" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Standard Fields</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set common header-level fields on the shipment. For any other field, you can use the generic `.set()` method.</p>
                        <CodeSnippet :code="standardFieldsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="add_detail" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.add_detail(**kwargs)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Adds a detail line to the shipment, typically referencing an order to be fulfilled.</p>
                        <CodeSnippet :code="addDetailExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="add_package" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.add_package(**kwargs)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Adds a package to the shipment, including its box type, weight, and other details.</p>
                        <CodeSnippet :code="addPackageExample" />
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
  { id: 'add_package', title: '  - .add_package()' },
  { id: 'to_body', title: '  - .to_body()' },
]);

const importingExample = ref(`
from easy_acumatica.models import ShipmentBuilder
`);

const standardFieldsExample = ref(`
shipment_payload = (
    ShipmentBuilder()
    .type("Shipment")
    .customer_id("CUST001")
    .warehouse_id("MAIN")
    .shipment_date("2023-10-27T00:00:00")
    .set("ShipVia", "FEDEXG")
)
`);

const addDetailExample = ref(`
# This adds a sales order line to the shipment
shipment_payload.add_detail(
    OrderType="SO",
    OrderNbr="SO005555"
)
`);

const addPackageExample = ref(`
# This adds a package to the shipment
shipment_payload.add_package(
    BoxID="MEDIUMBOX",
    Weight=15.2,
    DeclaredValue=250.00
)
`);
</script>