<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Business Accounts Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the <code>BusinessAccountsService</code>, which is your primary tool for retrieving business account records through the Acumatica contract-based API. Use it to list or filter for customers, vendors, or combined account types in your Acumatica ERP instance.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                Before using the service, import the necessary helpers: <code>QueryOptions</code> for query configuration and <code>F</code> for building filter expressions.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

              <v-card id="get_business_accounts" class="mb-8" variant="outlined">
                <v-card-title class="text-h5">
                  <code>get_business_accounts(api_version, options)</code>
                </v-card-title>
                <v-card-text>
                  <p class="mb-4">
                    Retrieves a list of business accounts using the <code>/BusinessAccount</code> endpoint. To retrieve a specific account, filter using <code>QueryOptions</code> and the <code>BusinessAccountID</code> field.
                  </p>
                  <strong>Example 1: Get all active vendor accounts</strong>
                  <CodeSnippet :code="example1" />

                  <br />
                  <strong>Example 2: Get a single account by ID</strong>
                  <CodeSnippet :code="example2" />
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
  { id: 'methods', title: 'Service Method' },
  { id: 'get_business_accounts', title: '  - get_business_accounts' },
]);

const importingExample = ref(`
from easy_acumatica.models.query_builder import QueryOptions
from easy_acumatica.models.filter_builder import F
`);

const example1 = ref(`
# 1. Define query options for active vendors
query = (
    QueryOptions()
    .filter("Status eq 'Active' and Type eq 'Vendor'")
    .select("BusinessAccountID", "BusinessAccountName", "Status")
)

# 2. Fetch the accounts
vendors = client.business_accounts.get_business_accounts("24.200.001", options=query)
for vendor in vendors:
    print(f"ID: {vendor['BusinessAccountID']['value']}, Name: {vendor['BusinessAccountName']['value']}")
`);

const example2 = ref(`
# 1. Define filter for a specific BusinessAccountID
query = QueryOptions(
    filter=F.BusinessAccountID == "000001",
    expand=["MainContact"]
)

# 2. Fetch the specific business account
accounts = client.business_accounts.get_business_accounts("24.200.001", options=query)
if accounts:
    account = accounts[0]
    print(f"Retrieved Account: {account['BusinessAccountName']['value']}")
else:
    print("Account not found.")
`);

useSeoMeta({
  title: 'Business Accounts Service | Acumatica API',
  description: 'Retrieve vendor and customer business accounts using the Easy-Acumatica API wrapper for Acumatica ERP.',
  ogTitle: 'Business Accounts API - Easy-Acumatica Docs',
  ogDescription: 'Learn how to retrieve and filter business account data (vendors/customers) using the Easy-Acumatica integration toolkit.',
  ogImage: '/__og_image__/og.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Business Accounts API',
  twitterDescription: 'Retrieve business accounts from Acumatica ERP using Easy-Acumatica.',
  twitterImage: '/__og_image__/og.png',
});

defineOgImage({
  title: 'Acumatica Business Accounts Service',
  description: 'Use Easy-Acumatica to retrieve and filter business accounts from Acumatica ERP.',
});
</script>
