<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Ledgers Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `LedgersService` provides a straightforward way to retrieve a list of Ledgers from your Acumatica instance.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To build queries for retrieving ledgers, you will need to import `QueryOptions` and the `F` filter factory.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

                <v-card id="get_ledgers" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_ledgers(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the main method for fetching a list of ledger records. It can be used to get all ledgers or a filtered subset by using `QueryOptions`.</p>
                        
                        <h4 class="text-h6 mt-4 mb-2">Example 1: Get All Ledgers with Expanded Details</h4>
                        <p class="mb-4">This example retrieves all ledgers and uses `$expand` to also fetch the companies and branches associated with each ledger.</p>
                        <CodeSnippet :code="getLedgersExample1" />

                        <h4 class="text-h6 mt-6 mb-2">Example 2: Get a Specific Ledger by ID</h4>
                        <p class="mb-4">You can use a filter to retrieve a single, specific ledger.</p>
                        <CodeSnippet :code="getLedgersExample2" />
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
  { id: 'get_ledgers', title: '  - get_ledgers' },
]);

const importingExample = ref(`
from easy_acumatica.models import QueryOptions, F
`);

const getLedgersExample1 = ref(`
# Use QueryOptions to select fields and expand related entities
opts = QueryOptions(
    select="LedgerID,Description,Branches/BranchID",
    expand="Branches"
)

# Fetch the ledgers
ledgers = client.ledgers.get_ledgers("24.200.001", options=opts)
`);

const getLedgersExample2 = ref(`
# Create a filter for the 'ACTUAL' ledger
ledger_filter = (F.LedgerID == 'ACTUAL')
opts = QueryOptions(filter=ledger_filter)

# Fetch the specific ledger
actual_ledger_list = client.ledgers.get_ledgers("24.200.001", options=opts)
`);
</script>