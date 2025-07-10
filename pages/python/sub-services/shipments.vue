<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Shipments Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `ShipmentsService` is your primary tool for interacting with `Shipment` records and their related actions. It allows you to manage the shipment lifecycle, from creation and updates to confirming the shipment and preparing an invoice from it.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create and query shipments, you will need the `ShipmentBuilder` and other query helpers.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="crud-methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">CRUD Methods</h2>

                <v-card id="get_shipments" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_shipments(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves a list of shipments. Use `QueryOptions` to filter, select, and expand the results.</p>
                        <CodeSnippet :code="getShipmentsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_shipment" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_shipment(api_version, builder, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new shipment using a `ShipmentBuilder` instance. This is typically used for creating shipments that are not generated directly from a sales order.</p>
                        <CodeSnippet :code="createShipmentExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="update_shipment" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_shipment(api_version, builder, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Updates an existing shipment. You must include the `ShipmentNbr` in the builder to identify the record to modify.</p>
                        <CodeSnippet :code="updateShipmentExample" />
                    </v-card-text>
                </v-card>
            </section>
            
            <section id="actions" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Executing Actions</h2>
                <p class="text-body-1 mb-4">
                  The service also provides helpers to execute common actions on shipments.
                </p>

                <v-card id="confirm_shipment" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>confirm_shipment(api_version, shipment_nbr)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Triggers the `ConfirmShipment` action for a specific shipment. Note that this action is on the `SalesOrder` endpoint in Acumatica, but is wrapped here for convenience.</p>
                        <CodeSnippet :code="confirmShipmentExample" />
                    </v-card-text>
                </v-card>

                <v-card id="prepare_invoice" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>prepare_invoice(api_version, shipment_nbr)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Executes the `PrepareInvoice` action, which generates an invoice from the shipment.</p>
                        <CodeSnippet :code="prepareInvoiceExample" />
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
  { id: 'importing-helpers', title: 'Importing Helpers' },
  { id: 'crud-methods', title: 'CRUD Methods' },
  { id: 'get_shipments', title: '  - get_shipments' },
  { id: 'create_shipment', title: '  - create_shipment' },
  { id: 'update_shipment', title: '  - update_shipment' },
  { id: 'actions', title: 'Executing Actions' },
  { id: 'confirm_shipment', title: '  - confirm_shipment' },
  { id: 'prepare_invoice', title: '  - prepare_invoice' },
]);

const importingExample = ref(`
from easy_acumatica.models import ShipmentBuilder, QueryOptions, F
`);

const getShipmentsExample = ref(`
# Create a filter for confirmed shipments
opts = QueryOptions(
    filter=F.Status == "Confirmed",
    select="ShipmentNbr,CustomerID,WarehouseID,ShipmentDate"
)

# Fetch the shipments
confirmed_shipments = client.shipments.get_shipments("24.200.001", options=opts)
`);

const createShipmentExample = ref(`
# Build the shipment payload
shipment_payload = (
    ShipmentBuilder()
    .customer_id("ABCCORP")
    .warehouse_id("MAIN")
    .add_detail(InventoryID="ITEM01", ShippedQty=10)
)

# Create the shipment
new_shipment = client.shipments.create_shipment("24.200.001", builder=shipment_payload)
`);

const updateShipmentExample = ref(`
# Build the update payload to add a package
update_payload = (
    ShipmentBuilder()
    .shipment_nbr("SH001234") # The shipment to update
    .add_package(BoxID="LARGEBOX", Weight=25.5)
)

# Update the shipment
updated_shipment = client.shipments.update_shipment(
    "24.200.001",
    builder=update_payload
)
`);

const confirmShipmentExample = ref(`
client.shipments.confirm_shipment(
    "24.200.001",
    shipment_nbr="SH001234"
)
`);

const prepareInvoiceExample = ref(`
client.shipments.prepare_invoice(
    "24.200.001",
    shipment_nbr="SH001234"
)
`);
</script>