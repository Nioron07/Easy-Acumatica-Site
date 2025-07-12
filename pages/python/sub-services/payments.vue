<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Payments Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `PaymentsService` is used for creating, retrieving, and managing `Payment` records in Acumatica. This includes creating standalone payments and processing them through to financial release.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create and query payments, you'll need the `PaymentBuilder` and `QueryOptions` helpers from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="create_payment" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_payment(api_version, builder)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new Payment record. This method is versatile and can be used to create payments that are applied to specific documents or standalone payments not linked to an invoice. You must provide a `PaymentBuilder` object with all the required details.</p>
                        <CodeSnippet :code="createPaymentExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_payment" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_payment(api_version, payment_type, reference_nbr, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves a single payment record identified by its key fields: `payment_type` (e.g., 'Payment', 'Prepayment') and `reference_nbr`. You can use `QueryOptions` to expand related data, but filtering is not allowed as the record is already uniquely identified.</p>
                        <CodeSnippet :code="getPaymentExample" />
                    </v-card-text>
                </v-card>

                <v-card id="release_payment" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>release_payment(api_version, payment_type, reference_nbr, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Invokes the `Release` action for a payment, which triggers the financial posting process. This is often an asynchronous operation on the server, and this method automatically handles the polling required to wait for its completion.</p>
                        <CodeSnippet :code="releasePaymentExample" />
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
  { id: 'create_payment', title: '  - create_payment' },
  { id: 'get_payment', title: '  - get_payment' },
  { id: 'release_payment', title: '  - release_payment' },
]);

const importingExample = ref(`
from easy_acumatica.models.payment_builder import PaymentBuilder  
from easy_acumatica.models.query_builder import QueryOptions
`);

const createPaymentExample = ref(`
# Build the payment payload
payment_builder = (
    PaymentBuilder()
    .type("Payment")
    .customer_id("AACUSTOMER")
    .payment_amount(150.00)
    .cash_account("10200") # Specify the cash account
    .add_document_to_apply("Invoice", "AR004792") # Apply to a specific invoice
)

# Create the payment
new_payment = client.payments.create_payment("24.200.001", payment_builder)
`);

const getPaymentExample = ref(`
from easy_acumatica.models import QueryOptions

# Define options to expand the application history
opts = QueryOptions(expand=["ApplicationHistory"])

# Get a specific payment by its type and reference number
payment_details = client.payments.get_payment(
    "24.200.001",
    payment_type="Payment",
    reference_nbr="001864",
    options=opts
)
`);

const releasePaymentExample = ref(`
# Release a specific payment to post it financially
client.payments.release_payment(
    "24.200.001",
    payment_type="Payment",
    reference_nbr="001864"
)

print("Payment has been released.")
`);

//SEO
useSeoMeta({
  title: 'Payments Service | Acumatica AR Payments API',
  description: 'A guide to managing AR payments in Acumatica using the Easy-Acumatica PaymentsService. Learn to create, retrieve, and release payments.',
  ogTitle: 'Acumatica Payments Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage AR payments programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Payments API',
  twitterDescription: 'A guide to managing AR payments with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Payments Service',
  description: 'Create, retrieve, and release AR payments using the Easy-Acumatica API wrapper.',
});

</script>