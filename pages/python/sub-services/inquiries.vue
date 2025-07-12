<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Inquiries Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `InquiriesService` provides two distinct methods for running Acumatica Generic Inquiries (GIs), each corresponding to a different API endpoint type. Understanding the difference is key to fetching the data you need effectively.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                Depending on which method you use, you will need to import the appropriate builder from `easy_acumatica.models`.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="get_data_from_inquiry_form" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_data_from_inquiry_form(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method executes a contract-based inquiry by sending a `PUT` request to an endpoint like `/entity/Default/{version}/{inquiryName}`. It is used for inquiries that are exposed as "forms" and require parameters to be sent in the request body. You must use the `InquiryBuilder` to construct the payload for this method.</p>
                        <CodeSnippet :code="inquiryFormExample" />
                    </v-card-text>
                </v-card>

                <v-card id="execute_generic_inquiry" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>execute_generic_inquiry(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method executes a standard OData Generic Inquiry by sending a `GET` request to an endpoint like `/odata/{inquiryName}`. This is the more common way to query GIs. It uses the familiar `QueryOptions` and `F` factory for filtering, selecting, and ordering data via URL parameters.</p>
                        <CodeSnippet :code="genericInquiryExample" />
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
  { id: 'get_data_from_inquiry_form', title: '  - Inquiry Form' },
  { id: 'execute_generic_inquiry', title: '  - Generic Inquiry (OData)' },
]);

const importingExample = ref(`
from easy_acumatica.models.inquiry_builder import InquiryOptions
from easy_acumatica.models.filter_builder import F
from easy_acumatica.models.query_builder import QueryOptions
`);

const inquiryFormExample = ref(`
# Use InquiryBuilder to set parameters in the request body
opts = (
    InquiryBuilder()
    .param("InventoryID", "SIMCARD")
    .expand("Results")
)

# Execute the inquiry form via a PUT request
inventory_summary = client.inquiries.get_data_from_inquiry_form(
    "24.200.001",
    "InventorySummaryInquiry",
    opts
)
`);

const genericInquiryExample = ref(`
# Use QueryOptions to filter results via URL parameters
opts = QueryOptions(
    filter=F.Status == 'Active',
    select=['CustomerID', 'CustomerName'],
    top=10
)

# Execute the generic inquiry via a GET request
active_customers = client.inquiries.execute_generic_inquiry(
    "CustomerListInquiry", 
    opts
)

# The result is often in a 'value' key for OData inquiries
for customer in active_customers.get("value", []):
    print(customer["CustomerName"])
`);

//SEO
useSeoMeta({
  title: 'Inquiries Service | Acumatica Generic Inquiry API',
  description: 'A guide to running both contract-based and OData Generic Inquiries in Acumatica using the Easy-Acumatica InquiriesService.',
  ogTitle: 'Acumatica Inquiries Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to run Generic Inquiries programmatically with the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Inquiries API',
  twitterDescription: 'A guide to running Generic Inquiries with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Inquiries Service',
  description: 'Run Generic Inquiries using the Easy-Acumatica API wrapper.',
});

</script>