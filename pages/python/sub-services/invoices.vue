<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Invoices Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `InvoicesService` is your primary tool for creating, retrieving, updating, and releasing AR Invoice records. It handles the full lifecycle of an invoice, from creation to final posting in the General Ledger.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                Before using the service, import the necessary builders and query helpers from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="core-methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Core Methods</h2>

                <v-card id="get_invoices" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_invoices(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the main method for fetching a list of invoice records. It can be used to get all invoices or a filtered, specific list by using `QueryOptions`.</p>
                        <CodeSnippet :code="getInvoicesExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_invoice" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_invoice(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use this method to create a new invoice. You must provide an `InvoiceBuilder` object containing the new invoice's details. This is also the method used to override tax details by setting `is_tax_valid(True)` and providing your own `TaxDetails`.</p>
                        <CodeSnippet :code="createInvoiceExample" />
                    </v-card-text>
                </v-card>

                <v-card id="update_invoice" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_invoice(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use this method to update an existing invoice. You <strong>must</strong> identify the invoice by calling the `.id()` method on the `InvoiceBuilder` with the invoice's `NoteID` (GUID).</p>
                        <CodeSnippet :code="updateInvoiceExample" />
                    </v-card-text>
                </v-card>
            </section>

            <section id="actions" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Actions</h2>

                <v-card id="release_invoice" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>release_invoice(api_version, note_id, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This invokes the `ReleaseInvoice` action, which posts the invoice to the General Ledger, changing its status from `Balanced` to `Open`. This is a critical financial step that cannot be easily undone. The method handles asynchronous polling automatically, waiting for the action to complete on the server.</p>
                        <CodeSnippet :code="releaseInvoiceExample" />
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
  { id: 'core-methods', title: 'Core Methods' },
  { id: 'get_invoices', title: '  - get_invoices' },
  { id: 'create_invoice', title: '  - create_invoice' },
  { id: 'update_invoice', title: '  - update_invoice' },
  { id: 'actions', title: 'Actions' },
  { id: 'release_invoice', title: '  - release_invoice' },
]);

const importingExample = ref(`
from easy_acumatica.models import InvoiceBuilder, QueryOptions, F
`);

const getInvoicesExample = ref(`
# Create a filter for invoices with an 'Open' status
my_filter = (F.Status == 'Open')

# Use QueryOptions to select specific fields and page the results
opts = QueryOptions(
    filter=my_filter,
    select=["ReferenceNbr", "Type", "Customer", "Amount"],
    top=25
)

# Fetch the invoices
open_invoices = client.invoices.get_invoices("24.200.001", options=opts)
`);

const createInvoiceExample = ref(`
# Build the invoice payload with a tax override
invoice_payload = (
    InvoiceBuilder()
    .type("Invoice")
    .customer("AACUSTOMER")
    .description("Invoice with custom tax override")
    .is_tax_valid(True)  # Required to override taxes
    .add_detail_line("CONSULTING", 10, 100.0)
    .add_tax_detail("GST", 1000.0, 50.0)  # Manually specify tax
)

# Create the invoice
new_invoice = client.invoices.create_invoice("24.200.001", invoice_payload)
`);

const updateInvoiceExample = ref(`
# The NoteID (GUID) of the invoice to update
invoice_note_id = "8deb6bf9-2072-eb11-b83e-00155d408001"

# Define the fields to update
update_payload = (
    InvoiceBuilder()
    .id(invoice_note_id)
    .set("Description", "Updated description for the invoice.")
)

# Perform the update
updated_invoice = client.invoices.update_invoice("24.200.001", update_payload)
`);

const releaseInvoiceExample = ref(`
# The NoteID (GUID) of the invoice to release
invoice_note_id_to_release = "8beb2af9-fa58-ec11-9e16-9828a61840c3"

print(f"Releasing invoice {invoice_note_id_to_release}...")
client.invoices.release_invoice(
    "24.200.001",
    note_id=invoice_note_id_to_release
)
print("Invoice released successfully.")
`);
</script>