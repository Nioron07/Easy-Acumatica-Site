<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Bills Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `BillsService` is a high-level helper for interacting with `Bill` resources. It provides methods to create, approve, and release retainage on bills within your Acumatica instance.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To effectively use the service, you will need to import the `BillBuiler` for creating payloads and the `QueryOptions` and `F` factory for filtering.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="create_bill" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_bill(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new bill. You must provide a BillBuilder instance containing the bill's details, such as the vendor, reference number, and line items..</p>
                        <CodeSnippet :code="createBillExample" />
                    </v-card-text>
                </v-card>

                <v-card id="approve_bill" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>approve_bill(api_version, reference_nbr)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method invokes the `Approve`` action on an existing bill, changing its status. You must provide the ReferenceNbr of the bill you wish to approve.</p>
                        <CodeSnippet :code="approveBillExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="release_retainage" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>release_retainage(api_version, reference_nbr, parameters)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method invokes the `ReleaseRetainage` action. You must provide the ReferenceNbr and can optionally provide parameters like RetainagePercent or RetainageAmount in a raw dictionary.</p>
                        <CodeSnippet :code="releaseRetainageExample" />
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
  { id: 'create_bill', title: '  - create_bill' },
  { id: 'approve_bill', title: '  - approve_bill' },
  { id: 'release_retainage', title: '  - release_retainage' },
]);

const importingExample = ref(`
from easy_acumatica.models.bill_builder import BillBuilder
from easy_acumatica.models.query_builder import QueryOptions
from easu_acumatica.models.filter_builder import F
`);

const createBillExample = ref(`
# 1. Build the bill payload
bill_payload = (
    BillBuilder()
    .type("Bill")
    .vendor("VENDACME")
    .reference_nbr("VENDORINV-001")
    .description("Project materials with retainage")
    .add_detail(
        inventory_id="RAW-STEEL",
        quantity=10,
        unit_cost=100.00,
        retained_amount=100.00 # 10% retainage
    )
)

# 2. Use the payload to create the record
new_bill = client.bills.create_bill(
    "24.200.001",
    builder=bill_payload)
`);

const approveBillExample = ref(`
# Approving Bill 000001
bill_ref_nbr = "000001"
client.bills.approve_bill("24.200.001", reference_nbr=bill_ref_nbr)
print(f"Successfully approved Bill: {bill_ref_nbr}")
`);

const releaseRetainageExample = ref(`
# Release retainage for the bill #000001
bill_ref_nbr = "000001"

# Parameters for releasing a specific amount of retainage
retainage_params = {"RetainageAmount": 50.00}
client.bills.release_retainage(
    "24.200.001",
    reference_nbr=bill_ref_nbr,
    parameters=retainage_params
)
`);

//SEO Always at the bottom

useSeoMeta({
  title: 'Bills Service | Acumatica Bills API',
  description: 'Create, approve, and release retainage on vendor bills in Acumatica using the Easy-Acumatica BillsService.',
  ogTitle: 'Acumatica Bills Service - Easy-Acumatica Docs',
  ogDescription: 'A guide to managing vendor bills, including retainage and approvals, using the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png', //changing the path might be required later 
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Vendor Bills API',
  twitterDescription: 'Manage vendor bills with Easy-Acumatica, including approvals and retainage workflows.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Bills Service',
  description: 'Create and manage vendor bills and retainage using Easy-Acumatica.',
});
</script>