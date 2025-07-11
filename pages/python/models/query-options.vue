<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                QueryOptions & CustomField
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                `QueryOptions` is a container class that bundles all common OData parameters into a single, easy-to-use object. It works seamlessly with the `F` object to handle `$filter` expressions and provides intelligent helpers for `$custom` and `$expand`.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To use these features, import the necessary helpers from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Building Queries</h2>

                <v-card id="basic-usage" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Basic Usage</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Combine a filter with other parameters like `$select`, `$top`, and `$skip` for pagination.</p>
                        <CodeSnippet :code="basicExample" />
                    </v-card-text>
                </v-card>

                <v-card id="custom-fields" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Smart Custom Fields (`$custom`)</v-card-title>
                    <v-card-text>
                        <p class="mb-4">The `custom` parameter accepts a list of `CustomField` objects, which makes formatting safe and easy. A key feature is that if you request a custom field from a detail entity (e.g., "Details"), `QueryOptions` will <strong>automatically add that entity to the `$expand` list for you</strong>, preventing common errors.</p>
                        <CodeSnippet :code="customFieldExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="raw-strings" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Using Raw String Filters</v-card-title>
                    <v-card-text>
                        <p class="mb-4">If you need to use complex OData syntax not covered by the `F` object, you can always provide a raw string to the `filter` parameter as an escape hatch.</p>
                        <CodeSnippet :code="rawStringExample" />
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
useSeoMeta({
  title: 'QueryOptions & CustomField - Easy-Acumatica Python',
  description: 'Learn how to use the QueryOptions container to bundle OData parameters and handle custom fields and filters in the easy-acumatica Python library.',
  ogTitle: 'QueryOptions & CustomField Guide',
  ogDescription: 'A guide to building powerful OData queries with QueryOptions for the easy-acumatica Python library.',
})
const onPageNavItems = ref([
  { id: 'introduction', title: 'Introduction' },
  { id: 'importing-helpers', title: 'Importing Helpers' },
  { id: 'methods', title: 'Building Queries' },
  { id: 'basic-usage', title: '  - Basic Usage' },
  { id: 'custom-fields', title: '  - Custom Fields' },
  { id: 'raw-strings', title: '  - Raw String Filters' },
]);

const importingExample = ref(`
from easy_acumatica.models import QueryOptions, CustomField, F
`);

const basicExample = ref(`
# Create a filter using the F object
my_filter = (F.Category == 'Hardware') & (F.Stock < 20)

# Bundle it into QueryOptions for a paginated request
opts = QueryOptions(
    filter=my_filter,
    select=["ItemID", "Name", "Stock"],
    top=50,
    skip=100 # Requesting the third page of 50 items
)

# .to_params() generates the final dictionary for the request
params = opts.to_params()
`);

const customFieldExample = ref(`
opts = QueryOptions(
    filter=F.Type == 'SalesOrder',
    expand=["MainContact"], # Note: "Details" is NOT included here
    custom=[
        # A custom field on the top-level entity
        CustomField.field("OrderProperties", "UsrPriority"),

        # A custom field on the "Details" entity
        CustomField.field("Transactions", "UsrSpecialCode", entity_name="Details"),
        
        # A user-defined attribute
        CustomField.attribute("Document", "OPERATSYST")
    ]
)

params = opts.to_params()
# params['$expand'] will be 'Details,MainContact'
# "Details" was added automatically!
`);

const rawStringExample = ref(`
opts = QueryOptions(
    filter="substringof('special', Description) and Price gt 100",
    select=["Description", "Price"]
)
`);
</script>