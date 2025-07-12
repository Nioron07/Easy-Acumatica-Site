<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Inventory Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `InventoryService` is your primary tool for interacting with inventory-related records and actions. It provides methods for managing inventory transactions, querying inventory levels, and updating warehouse-specific item details.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To use the service, you will need to import the necessary builders from `easy_acumatica.models`.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="create_inventory_issue" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_inventory_issue(api_version, builder)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new inventory issue record. You must provide an `InventoryIssueBuilder` instance containing the transaction details.</p>
                        <CodeSnippet :code="createIssueExample" />
                    </v-card-text>
                </v-card>

                <v-card id="release_inventory_issue" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>release_inventory_issue(api_version, reference_nbr, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Invokes the `ReleaseInventoryIssue` action on an existing inventory issue. This is a long-running action, so the method handles the polling necessary to wait for completion.</p>
                        <CodeSnippet :code="releaseIssueExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_inventory_quantity_available" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_inventory_quantity_available(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves quantity information for a specific item using the `InventoryQuantityAvailable` inquiry form. This method uses the `InquiriesService` internally.</p>
                        <CodeSnippet :code="getQuantityExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_inventory_summary" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_inventory_summary(api_version, inventory_id)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves summary information for a specific item across all warehouses using the `InventorySummaryInquiry` form.</p>
                        <CodeSnippet :code="getSummaryExample" />
                    </v-card-text>
                </v-card>

                <v-card id="update_item_warehouse_details" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_item_warehouse_details(api_version, builder)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method allows you to update settings for an item at a specific warehouse, such as replenishment settings or default GL accounts.</p>
                        <CodeSnippet :code="updateWarehouseDetailsExample" />
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
  { id: 'methods', title: 'Service Methods' },
  { id: 'create_inventory_issue', title: '  - create_inventory_issue' },
  { id: 'release_inventory_issue', title: '  - release_inventory_issue' },
  { id: 'get_inventory_quantity_available', title: '  - get_quantity_available' },
  { id: 'get_inventory_summary', title: '  - get_inventory_summary' },
  { id: 'update_item_warehouse_details', title: '  - update_warehouse_details' },
]);

const importingExample = ref(`
from easy_acumatica.models.inventory_issue_builder import InventoryIssueBuilder
from easy_acumatica.models.item_warehouse_builder import ItemWarehouseBuilder
from easy_acumatica.models.inquiry_builder import InquiryBuilder
`);

const createIssueExample = ref(`
# 1. Build the inventory issue payload
issue_payload = (
    InventoryIssueBuilder()
    .set("Description", "Issue for project materials")
    .add_detail(
        InventoryID="RAW-MAT-01",
        Warehouse="MAIN",
        Qty=10,
        UOM="EACH"
    )
)

# 2. Use the payload to create the record
new_issue = client.inventory.create_inventory_issue("24.200.001", issue_payload)
`);

const releaseIssueExample = ref(`
# The reference number from the created issue
issue_ref_nbr = "004683" 

# This will block until the release is complete or it times out
client.inventory.release_inventory_issue(
    "24.200.001",
    reference_nbr=issue_ref_nbr
)
`);

const getQuantityExample = ref(`
# Fetch quantity data for a specific item
quantity_data = client.inventory.get_inventory_quantity_available(
    "24.200.001",
    inventory_id="MYITEM",
    last_modified_date_time="2023-01-01T00:00:00"
)

for row in quantity_data:
    print(f"Warehouse: {row['Warehouse']['value']}, Qty Available: {row['QtyAvailable']['value']}")
`);

const getSummaryExample = ref(`
# Fetch summary data for a specific item
summary_data = client.inventory.get_inventory_summary("24.200.001", "MYITEM")

for row in summary_data:
    print(f"Warehouse: {row['Warehouse']['value']}, Qty On Hand: {row['QtyOnHand']['value']}")
`);

const updateWarehouseDetailsExample = ref(`
# 1. Build the update payload
item_warehouse_payload = (
    ItemWarehouseBuilder()
    .inventory_id("MYITEM")
    .warehouse_id("MAIN")
    .set("DefaultIssueFrom", "RECEIVING") # Set the new default location
)

# 2. Use the payload to update the record
updated_details = client.inventory.update_item_warehouse_details(
    "24.200.001",
    builder=item_warehouse_payload
)
`);

//SEO
useSeoMeta({
  title: 'Inventory Service | Acumatica Inventory Management API',
  description: 'A guide to managing inventory in Acumatica using the Easy-Acumatica InventoryService. Learn to create inventory issues, check stock levels, and more.',
  ogTitle: 'Acumatica Inventory Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage inventory programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Inventory API',
  twitterDescription: 'A guide to managing inventory with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Inventory Service',
  description: 'Manage inventory transactions, inquiries, and warehouse settings using the Easy-Acumatica API wrapper.',
});

</script>