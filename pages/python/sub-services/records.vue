<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Records Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `RecordsService` is a powerful, generic wrapper for performing CRUD (Create, Read, Update, Delete) operations on **any** top-level Acumatica entity, such as `StockItem`, `SalesOrder`, or `PurchaseOrder`. It's your go-to service when a more specialized one (like `CustomersService`) doesn't exist for your target entity.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                You will need the generic `RecordBuilder` for creating and updating records, along with `QueryOptions` and `F` for filtering.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">CRUD Methods</h2>

                <v-card id="create_record" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_record(api_version, entity, record, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new record for any specified entity. You must provide the entity name as a string and the payload using the `RecordBuilder`.</p>
                        <CodeSnippet :code="createRecordExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_records" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Retrieving Records</v-card-title>
                    <v-card-text>
                        <p class="mb-4">The service provides three methods for fetching records based on different criteria:</p>
                        <ul class="ml-3">
                            <li><strong>get_records_by_filter:</strong> The most flexible method, uses a `QueryOptions` object with a `$filter` to find records.</li>
                            <li><strong>get_record_by_id:</strong> Retrieves a single record using its internal Acumatica GUID.</li>
                            <li><strong>get_record_by_key_field:</strong> Retrieves a single record using its primary key fields (e.g., Order Type and Order Number).</li>
                        </ul>
                        <CodeSnippet :code="getRecordsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="update_record" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_record(api_version, entity, record, options)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Updates one or more existing records. You <strong>must</strong> provide a filter in the `options` to specify which record(s) to update.</p>
                        <CodeSnippet :code="updateRecordExample" />
                    </v-card-text>
                </v-card>

                <v-card id="delete_records" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Deleting Records</v-card-title>
                    <v-card-text>
                        <p class="mb-4">The service offers two ways to permanently delete records:</p>
                        <ul class="ml-3">
                            <li><strong>delete_record_by_id:</strong> Deletes a record using its internal GUID.</li>
                            <li><strong>delete_record_by_key_field:</strong> Deletes a record using its primary key(s).</li>
                        </ul>
                        <CodeSnippet :code="deleteRecordExample" />
                    </v-card-text>
                </v-card>
            </section>
            
            <section id="utility-methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Utility Methods</h2>

                <v-card id="get_custom_field_schema" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_custom_field_schema(api_version, entity)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">A powerful introspection tool that retrieves the schema for all custom and user-defined fields associated with an entity. This is useful for dynamically building integrations.</p>
                        <CodeSnippet :code="getSchemaExample" />
                    </v-card-text>
                </v-card>
                <v-card id="request_report" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>request_report(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Initiates a report request and polls until the report is ready. This method follows Acumatica's asynchronous report generation flow and returns the final report content as a `requests.Response` object.</p>
                        <CodeSnippet :code="requestReportExample" />
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
  { id: 'methods', title: 'CRUD Methods' },
  { id: 'create_record', title: '  - create_record' },
  { id: 'get_records', title: '  - Retrieving Records' },
  { id: 'update_record', title: '  - update_record' },
  { id: 'delete_records', title: '  - Deleting Records' },
  { id: 'utility-methods', title: 'Utility Methods' },
  { id: 'get_custom_field_schema', title: '  - get_custom_field_schema' },
  { id: 'request_report', title: '  - request_report' },
]);

const importingExample = ref(`
from easy_acumatica.models.filter_builder import F 
from easy_acumatica.models.query_builder import QueryOptions 
from easy_acumatica.models.record_builder import RecordBuilder
`);

const createRecordExample = ref(`
# Use RecordBuilder to construct the payload for a new Stock Item
item_payload = (
    RecordBuilder()
    .field("InventoryID", "NEW-ITEM-001")
    .field("Description", "A Brand New Stock Item")
    .field("ItemClass", "STOCKITEM")
)

# Call the service to create the record
new_item = client.records.create_record(
    "24.200.001",
    entity="StockItem",
    record=item_payload
)
`);

const getRecordsExample = ref(`
# Example of get_records_by_filter
low_stock_filter = (F.ItemClass.ID == 'FINISHGOOD') & (F.QtyOnHand < 10)
opts = QueryOptions(filter=low_stock_filter)
low_stock_items = client.records.get_records_by_filter(
    "24.200.001",
    entity="StockItem",
    options=opts
)

# Example of get_record_by_id
order = client.records.get_record_by_id(
    "24.200.001", "SalesOrder", "a1b2c3d4-e5f6-..."
)
`);

const updateRecordExample = ref(`
# Specify which record to update using a filter
update_opts = QueryOptions(filter=(F.InventoryID == 'NEW-ITEM-001'))

# Define the fields to change
update_payload = RecordBuilder().field("Description", "An Updated Item Description")

# Perform the update
updated_item = client.records.update_record(
    "24.200.001",
    entity="StockItem",
    record=update_payload,
    options=update_opts
)
`);

const deleteRecordExample = ref(`
# Delete by primary key fields
client.records.delete_record_by_key_field(
    "24.200.001",
    entity="SalesOrder",
    key="SO", 
    value="SO006724"
)

# Delete by internal GUID
client.records.delete_record_by_id(
    "24.200.001",
    entity="SalesOrder",
    record_id="a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6"
)
`);

const getSchemaExample = ref(`
# Get the custom field schema for the StockItem entity
schema = client.records.get_custom_field_schema(
    "24.200.001",
    entity="StockItem"
)

# The 'schema' variable now holds a dictionary detailing all custom fields
print(schema)
`);
const requestReportExample = ref(`
# Define the report parameters
report_params = {
    "FromDate": { "value": "2023-01-01" },
    "ToDate": { "value": "2023-01-31" }
}

# Request the report and wait for it to generate
response = client.records.request_report(
    report_entity="CashAccountSummary",
    endpoint_name="Report",
    endpoint_version="0001",
    parameters=report_params,
    output_format="PDF"
)

# Save the report content to a file
with open("cash_summary.pdf", "wb") as f:
    f.write(response.content)
`);

//SEO
useSeoMeta({
  title: 'Records Service | Acumatica Generic CRUD API',
  description: 'A guide to performing generic CRUD operations on any Acumatica entity using the Easy-Acumatica RecordsService.',
  ogTitle: 'Acumatica Records Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to perform generic CRUD operations programmatically with the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Records API',
  twitterDescription: 'A guide to performing generic CRUD operations with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Records Service',
  description: 'Perform generic CRUD operations on any Acumatica entity using the Easy-Acumatica API wrapper.',
});

</script>