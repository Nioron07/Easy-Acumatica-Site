<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                InvoiceBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `InvoiceBuilder` is your primary tool for creating the JSON payload needed to create or update AR Invoice records with the `InvoicesService`. It provides a fluent, chainable interface for setting fields, line items (Details), and overridden tax lines (TaxDetails).
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `InvoiceBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <p class="text-body-1 mb-4">
                  The builder provides a wide range of methods to construct every part of an invoice.
                </p>

                <v-card id="top-level-fields" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Top-Level Fields</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set common header-level fields on the invoice record. For any field not listed, use the generic `.set()` method.</p>
                        <CodeSnippet :code="topLevelExample" />
                    </v-card-text>
                </v-card>

                <v-card id="add_detail_line" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.add_detail_line(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">To add products or services to the invoice, use this method. It requires an `inventory_id`, `quantity`, and `unit_price`, but you can also pass other line-level fields as keyword arguments.</p>
                        <CodeSnippet :code="addDetailExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="add_tax_detail" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Overriding Taxes</v-card-title>
                    <v-card-text>
                        <p class="mb-4">To manually specify tax amounts instead of letting Acumatica calculate them, you must first call `.is_tax_valid(True)` and then add each tax line using `.add_tax_detail()`.</p>
                        <CodeSnippet :code="addTaxExample" />
                    </v-card-text>
                </v-card>

                <v-card id="id-for-update" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Updating an Invoice with <code>.id()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">When updating an existing invoice, you must identify it by its `NoteID` (GUID). Use the `.id()` method to set this value in the payload.</p>
                        <CodeSnippet :code="updateExample" />
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
  { id: 'top-level-fields', title: '  - Top-Level Fields' },
  { id: 'add_detail_line', title: '  - .add_detail_line()' },
  { id: 'add_tax_detail', title: '  - Overriding Taxes' },
  { id: 'id-for-update', title: '  - Updating with .id()' },
]);

const importingExample = ref(`
from easy_acumatica.models.invoice_builder import InvoiceBuilder
`);

const topLevelExample = ref(`
builder = (
    InvoiceBuilder()
    .type("Invoice")
    .customer("CUST01")
    .date("2025-01-15")
    .description("Project consulting services")
)
`);

const addDetailExample = ref(`
builder = (
    InvoiceBuilder()
    .add_detail_line(
        inventory_id="CONSULTING",
        quantity=10,
        unit_price=150.0,
        TransactionDescription="Initial project consultation"
    )
    .add_detail_line(
        inventory_id="HARDWARE",
        quantity=2,
        unit_price=500.0,
        Branch="PRODWHOLE" # Example of another line-level field
    )
)
`);

const addTaxExample = ref(`
builder = (
    InvoiceBuilder()
    .is_tax_valid(True)  # Required to enable tax override
    .add_tax_detail(tax_id="GST", taxable_amount=1000.0, tax_amount=50.0)
    .add_tax_detail(tax_id="PST", taxable_amount=1000.0, tax_amount=70.0)
)
`);

const updateExample = ref(`
invoice_note_id = "8deb6bf9-2072-eb11-b83e-00155d408001"

update_payload = (
    InvoiceBuilder()
    .id(invoice_note_id) # Identify the invoice to update
    .set("Description", "Updated project scope")
)

# Use with InvoicesService to update the record
# client.invoices.update_invoice("24.200.001", builder=update_payload)
`);
</script>