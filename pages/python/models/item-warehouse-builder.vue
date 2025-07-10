<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                ItemWarehouseBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `ItemWarehouseBuilder` is your primary tool for creating the JSON payload needed to update `ItemWarehouse` records with the `InventoryService`. It allows you to modify an item's settings for a specific warehouse.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `ItemWarehouseBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="identifying-record" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Identifying the Record</v-card-title>
                    <v-card-text>
                        <p class="mb-4">To update an item's warehouse details, you <strong>must</strong> specify both the `InventoryID` and the `WarehouseID` using their respective shortcut methods.</p>
                        <CodeSnippet :code="identifyingExample" />
                    </v-card-text>
                </v-card>

                <v-card id="override" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.override(field, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">A common use case is to override default replenishment or other settings. The `.override()` method simplifies this by automatically prefixing the field name with "Override" (e.g., `.override("Replenishment", True)` sets the `OverrideReplenishment` field).</p>
                        <CodeSnippet :code="overrideExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="to_body" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.to_body()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Once you have set all the required fields, call `.to_body()` to generate the final dictionary, which is ready to be sent as the JSON body in your API request.</p>
                        <CodeSnippet :code="toBodyExample" />
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
  { id: 'identifying-record', title: '  - Identifying the Record' },
  { id: 'override', title: '  - .override()' },
  { id: 'to_body', title: '  - .to_body()' },
]);

const importingExample = ref(`
from easy_acumatica.models import ItemWarehouseBuilder
`);

const identifyingExample = ref(`
item_warehouse_payload = (
    ItemWarehouseBuilder()
    .inventory_id("ITEM001")
    .warehouse_id("MAIN")
)
`);

const overrideExample = ref(`
# Build a payload to update replenishment settings
item_warehouse_payload = (
    ItemWarehouseBuilder()
    .inventory_id("ITEM001")
    .warehouse_id("MAIN")
    .override("Replenishment", True)
    .set("ReplenishmentSource", "Purchase")
    .set("PreferredVendor", "VENDOR01")
)
`);

const toBodyExample = ref(`
# Build the full payload
details_to_update = (
    ItemWarehouseBuilder()
    .inventory_id("ITEM001")
    .warehouse_id("MAIN")
    .set("IsAValuationMethod", "Standard")
    .set("StdCost", 15.50)
)

# Get the final dictionary
json_body = details_to_update.to_body()

# Use with the InventoryService
# client.inventory.update_item_warehouse_details("24.200.001", builder=details_to_update)
`);
</script>