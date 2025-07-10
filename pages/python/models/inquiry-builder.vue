<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                InquiryBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `InquiryBuilder` is a fluent builder for creating requests for contract-based Generic Inquiries. These are specific inquiry "forms" that require parameters to be sent in the body of a `PUT` request, rather than in the URL.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `InquiryBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="param" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.param(field, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Adds a parameter to the request body. These parameters correspond to the fields on the inquiry form in Acumatica.</p>
                        <CodeSnippet :code="paramExample" />
                    </v-card-text>
                </v-card>

                <v-card id="expand" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.expand(*entities)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Specifies one or more detail entities to expand in the response. For most inquiries, you will need to expand the `Results` entity to get the actual data rows.</p>
                        <CodeSnippet :code="expandExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="to-body-params" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.to_body()</code> and <code>.to_query_params()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">These methods generate the final dictionaries used by the `InquiriesService`. `.to_body()` creates the JSON body for the `PUT` request, and `.to_query_params()` creates the URL query string (for the `$expand` parameter).</p>
                    </v-card-text>
                </v-card>
            </section>

            <section id="full-example" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Complete Example</h2>
                <p class="text-body-1 mb-4">
                    Here is a complete example showing how to use the `InquiryBuilder` with the `InquiriesService` to fetch data from the `InventorySummaryInquiry` form.
                </p>
                <CodeSnippet :code="fullExample" />
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
  { id: 'param', title: '  - .param()' },
  { id: 'expand', title: '  - .expand()' },
  { id: 'to-body-params', title: '  - .to_body() & .to_query_params()' },
  { id: 'full-example', title: 'Complete Example' },
]);

const importingExample = ref(`
from easy_acumatica.models import InquiryBuilder
`);

const paramExample = ref(`
builder = (
    InquiryBuilder()
    .param("InventoryID", "SIMCARD")
    .param("WarehouseID", "YOGI")
)
`);

const expandExample = ref(`
builder.expand("Results", "Totals")

# This will generate a query string like: ?$expand=Results,Totals
`);

const fullExample = ref(`
# 1. Build the inquiry options
opts = (
    InquiryBuilder()
    .param("InventoryID", "SIMCARD")
    .expand("Results")
)

# 2. Use the builder with the InquiriesService
inventory_summary = client.inquiries.get_data_from_inquiry_form(
    "24.200.001",
    "InventorySummaryInquiry",
    opts
)

# 3. Process the results
for row in inventory_summary.get("Results", []):
    print(row)
`);
</script>