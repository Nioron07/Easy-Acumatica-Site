<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Stock Items Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `StockItemsService` is your primary tool for interacting with `StockItem` records. It provides a comprehensive set of methods for managing stock items, including retrieval, creation, updates, and handling file attachments.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create and query stock items, you will need the `StockItemBuilder` and other query helpers.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="crud-methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">CRUD Methods</h2>

                <v-card id="get_stock_items" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_stock_items(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves a list of stock items. Use `QueryOptions` to filter, select, and expand the results.</p>
                        <CodeSnippet :code="getStockItemsExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="get_stock_item_by_id" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_stock_item_by_id(api_version, inventory_id, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves a single, complete stock item record by its `InventoryID`.</p>
                        <CodeSnippet :code="getStockItemByIdExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_stock_item" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_stock_item(api_version, builder, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new stock item using a `StockItemBuilder` instance to define its properties.</p>
                        <CodeSnippet :code="createStockItemExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="update_stock_item" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_stock_item(api_version, builder, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Updates an existing stock item. You must include the `InventoryID` in the builder to identify the record.</p>
                        <CodeSnippet :code="updateStockItemExample" />
                    </v-card-text>
                </v-card>
            </section>
            
            <section id="attachments" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Working with Attachments</h2>

                <v-card id="get_stock_item_attachments" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_stock_item_attachments(api_version, inventory_id)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This helper method retrieves a list of all file attachments for a specific stock item. It returns metadata about the files, not the file content itself.</p>
                        <CodeSnippet :code="getAttachmentsExample" />
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
  { id: 'get_stock_items', title: '  - get_stock_items' },
  { id: 'get_stock_item_by_id', title: '  - get_stock_item_by_id' },
  { id: 'create_stock_item', title: '  - create_stock_item' },
  { id: 'update_stock_item', title: '  - update_stock_item' },
  { id: 'attachments', title: 'Working with Attachments' },
  { id: 'get_stock_item_attachments', title: '  - get_attachments' },
]);

const importingExample = ref(`
from easy_acumatica.models.stock_item_builder import StockItemBuilder
from easy_acumatica.models.query_builder import QueryOptions
from easy_acumatica.models.filter_builder import F
`);

const getStockItemsExample = ref(`
# Create a filter for active, finished good items
opts = QueryOptions(
    filter=(F.ItemStatus == 'Active') & (F.ItemClass.ID == 'FINISHGOOD'),
    select="InventoryID,Description,ItemClass",
    expand="ItemClass"
)

# Fetch the stock items
active_items = client.stock_items.get_stock_items("24.200.001", options=opts)
`);

const getStockItemByIdExample = ref(`
# The InventoryID of the item to fetch
item_id = "STK-ITEM-01"

# Fetch the item
item = client.stock_items.get_stock_item_by_id("24.200.001", item_id)
`);

const createStockItemExample = ref(`
# Build the stock item payload
item_payload = (
    StockItemBuilder()
    .inventory_id("NEW-ITEM-001")
    .description("New Test Stock Item")
    .item_class("DEFAULT")
    .base_uom("EACH")
)

# Create the stock item
new_item = client.stock_items.create_stock_item("24.200.001", builder=item_payload)
`);

const updateStockItemExample = ref(`
# Build the update payload
update_payload = (
    StockItemBuilder()
    .inventory_id("NEW-ITEM-001") # The item to update
    .description("Updated Item Description")
)

# Update the stock item
updated_item = client.stock_items.update_stock_item(
    "24.200.001", 
    builder=update_payload
)
`);

const getAttachmentsExample = ref(`
item_id_with_files = "STK-ITEM-01"
attachments = client.stock_items.get_stock_item_attachments(
    "24.200.001", 
    item_id_with_files
)

if attachments:
    print(f"Attachments for {item_id_with_files}:")
    for file in attachments:
        print(f" - {file['name']}")
`);

//SEO
useSeoMeta({
  title: 'Stock Items Service | Acumatica Inventory API',
  description: 'A guide to managing stock items in Acumatica using the Easy-Acumatica StockItemsService. Learn to create, update, and manage attachments.',
  ogTitle: 'Acumatica Stock Items Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage stock items programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Stock Items API',
  twitterDescription: 'A guide to managing stock items with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Stock Items Service',
  description: 'Create, update, and manage stock items using the Easy-Acumatica API wrapper.',
});

</script>