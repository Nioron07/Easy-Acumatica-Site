<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Transactions Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `TransactionsService` provides methods for retrieving financial transaction data from Acumatica ERP. Its primary function is to query the General Ledger for transaction details within a specified date range.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                You will need Python's built-in `datetime` module to specify the date range and `QueryOptions` from `easy_acumatica.models` to expand the results.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

                <v-card id="get_ledger_transactions" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_ledger_transactions(api_version, start_date, end_date, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method retrieves general ledger transactions for a specified period by using the `AccountDetailsForPeriodInquiry` form. Unlike most retrieval methods, this inquiry requires a `PUT` request where the date range is sent in the body. The `easy-acumatica` library handles this complexity for you.</p>
                        <v-alert
                            type="info"
                            variant="tonal"
                            class="mb-4"
                            border="start"
                            density="compact"
                        >
                            To get the actual transaction lines, you must expand the `Results` entity in your `QueryOptions`.
                        </v-alert>
                        <CodeSnippet :code="getTransactionsExample" />
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
  { id: 'get_ledger_transactions', title: '  - get_ledger_transactions' },
]);

const importingExample = ref(`
from datetime import datetime  
from easy_acumatica.models.query_builder import QueryOptions
`);

const getTransactionsExample = ref(`
# Define the start and end of the period
start_date = datetime(2024, 4, 1)
end_date = datetime(2024, 4, 30)

# The 'Results' entity must be expanded to get the transaction lines
opts = QueryOptions(expand=["Results"])

# Call the service
ledger_transactions = client.transactions.get_ledger_transactions(
    "24.200.001",
    start_date=start_date,
    end_date=end_date,
    options=opts
)

# The actual transactions are in the 'Results' list
for trx in ledger_transactions.get("Results", []):
    print(f"Ref: {trx['RefNumber']['value']}, Desc: {trx['TransactionDescription']['value']}")
`);

//SEO
useSeoMeta({
  title: 'Transactions Service | Acumatica GL API',
  description: 'A guide to retrieving General Ledger transactions in Acumatica using the Easy-Acumatica TransactionsService.',
  ogTitle: 'Acumatica Transactions Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to retrieve General Ledger transactions programmatically with the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Transactions API',
  twitterDescription: 'A guide to retrieving General Ledger transactions with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Transactions Service',
  description: 'Retrieve General Ledger transactions using the Easy-Acumatica API wrapper.',
});

</script>