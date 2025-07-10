<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                PaymentBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `PaymentBuilder` is your primary tool for creating the JSON payload needed to create AR Payment records with the `PaymentsService`. It provides a fluent, chainable interface for setting payment fields and building complex nested lists, like documents to apply.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `PaymentBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="top-level-fields" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Top-Level Fields</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set common header-level fields on the payment record. For any field not listed, use the generic `.set()` method.</p>
                        <CodeSnippet :code="topLevelExample" />
                    </v-card-text>
                </v-card>

                <v-card id="adding-details" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Adding Details to a Payment</v-card-title>
                    <v-card-text>
                        <p class="mb-4">The builder includes special methods for building the nested lists required for applying payments or including external transaction data.</p>
                        <h4 class="text-h6 mt-4 mb-2"><code>.add_document_to_apply(...)</code></h4>
                        <p class="mb-4">Adds a document like an invoice or credit memo to the `DocumentsToApply` list.</p>
                        <CodeSnippet :code="addDocumentExample" />

                        <h4 class="text-h6 mt-6 mb-2"><code>.add_order_to_apply(...)</code></h4>
                        <p class="mb-4">Adds a sales order to the `OrdersToApply` list.</p>
                        <CodeSnippet :code="addOrderExample" />
                        
                        <h4 class="text-h6 mt-6 mb-2"><code>.add_credit_card_transaction(...)</code></h4>
                        <p class="mb-4">Adds externally processed credit card transaction data to the `CreditCardTransactionInfo` list.</p>
                        <CodeSnippet :code="addCCTransactionExample" />
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
  { id: 'adding-details', title: '  - Adding Details' },
]);

const importingExample = ref(`
from easy_acumatica.models import PaymentBuilder
`);

const topLevelExample = ref(`
payment_payload = (
    PaymentBuilder()
    .type("Payment")
    .customer_id("CUST01")
    .payment_amount(150.75)
    .payment_method("CHECK")
    .payment_ref("CHK-1055")
    .cash_account("10200")
    .hold(False)
)
`);

const addDocumentExample = ref(`
payment_payload.add_document_to_apply(
    doc_type="INV", 
    reference_nbr="INV00451", 
    doc_line_nbr=1
)
`);

const addOrderExample = ref(`
payment_payload.add_order_to_apply(
    order_type="SO", 
    order_nbr="SO00789"
)
`);

const addCCTransactionExample = ref(`
payment_payload.add_credit_card_transaction(
    tran_nbr="ext_tran_id_12345",
    tran_type="Authorize and Capture",
    auth_nbr="auth_code_abc789"
)
`);
</script>