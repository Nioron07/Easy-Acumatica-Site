<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                BillBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The <code>BillBuilder</code> is your primary tool for creating the JSON payload needed to create or update <code>Bill</code> records with the <code>BillsService</code>. It provides a fluent, chainable interface for setting the fields of a bill record, including linking to purchase orders or receipts.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the <code>BillBuilder</code> from the models directory.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>
              <p class="text-body-1 mb-4">
                The builder provides both general-purpose and shortcut methods for constructing a valid JSON payload. Most bills will also include one or more detail lines.
              </p>

              <v-card id="shortcut-methods" class="mb-8" variant="outlined">
                <v-card-title class="text-h5">Shortcut Methods</v-card-title>
                <v-card-text>
                  <p class="mb-4">For common fields like vendor and vendor reference, you can use built-in shortcuts:</p>
                  <CodeSnippet :code="shortcutExample" />
                </v-card-text>
              </v-card>

              <v-card id="set-method" class="mb-8" variant="outlined">
                <v-card-title class="text-h5"><code>set(field_name, value)</code></v-card-title>
                <v-card-text>
                  <p class="mb-4">Use this to set any field that doesn't have a dedicated shortcut method.</p>
                  <CodeSnippet :code="setExample" />
                </v-card-text>
              </v-card>

              <v-card id="to_body" class="mb-8" variant="outlined">
                <v-card-title class="text-h5"><code>to_body()</code></v-card-title>
                <v-card-text>
                  <p class="mb-4">Generates the final dictionary formatted for use in your API request.</p>
                  <CodeSnippet :code="toBodyExample" />
                </v-card-text>
              </v-card>
            </section>

            <section id="adding-details" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Adding Details</h2>

              <v-card id="detail_from_pr" class="mb-8" variant="outlined">
                <v-card-title class="text-h5"><code>add_detail_from_pr(po_receipt_nbr)</code></v-card-title>
                <v-card-text>
                  <p class="mb-4">The most common method, used for linking bills to received goods.</p>
                  <CodeSnippet :code="detailFromPRExample" />
                </v-card-text>
              </v-card>

              <v-card id="standalone_detail" class="mb-8" variant="outlined">
                <v-card-title class="text-h5"><code>add_detail(**kwargs)</code></v-card-title>
                <v-card-text>
                  <p class="mb-4">Use this when the bill is not tied to a PO or receipt, like utility or service bills.</p>
                  <CodeSnippet :code="standaloneDetailExample" />
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
  { id: 'shortcut-methods', title: '  - Shortcut Methods' },
  { id: 'set-method', title: '  - set()' },
  { id: 'to_body', title: '  - to_body()' },
  { id: 'adding-details', title: 'Adding Details' },
  { id: 'detail_from_pr', title: '  - add_detail_from_pr' },
  { id: 'standalone_detail', title: '  - add_detail' },
]);

const importingExample = ref(`
from easy_acumatica.models.bill_builder import BillBuilder
`);

const shortcutExample = ref(`
bill_payload = (
    BillBuilder()
    .vendor("VENDACME")
    .vendor_ref("INV-12345")
    .type("Bill")
)
`);

const setExample = ref(`
builder = BillBuilder()
builder.set("Status", "Balanced")
builder.set("Terms", "Net30")
`);

const toBodyExample = ref(`
bill_payload = (
    BillBuilder()
    .vendor("VENDACME")
    .vendor_ref("INV-12345")
    .add_detail(inventory_id="ITEM01", qty=10, unit_cost=5.00)
)
json_body = bill_payload.to_body()
`);

const detailFromPRExample = ref(`
bill_payload = (
    BillBuilder()
    .type("Bill")
    .vendor("VENDACME")
    .vendor_ref("INV-12345")
    .description("Bill for received goods")
    .add_detail_from_pr(po_receipt_nbr="PR000789")
)
`);

const standaloneDetailExample = ref(`
expense_payload = (
    BillBuilder()
    .vendor("UTILITIES")
    .vendor_ref("ACCT-555")
    .add_detail(
        expense_account="700100",
        tran_desc="Monthly electricity bill",
        qty=1,
        unit_cost=250.75
    )
)
`);

//SEO
useSeoMeta({
  title: 'BillBuilder | Acumatica Vendor Bills API',
  description: 'Build JSON payloads for vendor bills using Easy-Acumatica\'s BillBuilder. Supports standalone lines and PO/receipt-linked details.',
  ogTitle: 'Acumatica BillBuilder - Easy-Acumatica Docs',
  ogDescription: 'Build and structure Acumatica vendor bill payloads using the Easy-Acumatica BillBuilder. Ideal for integrating with the BillsService.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica BillBuilder API',
  twitterDescription: 'Use Easy-Acumatica to build vendor bill payloads for Acumatica ERP.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica BillBuilder',
  description: 'Create vendor bills and retainage line items with Easy-Acumatica.',
});
</script>
