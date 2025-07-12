<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                TaxCategoryBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `TaxCategoryBuilder` is your primary tool for creating the JSON payload needed to create or update `TaxCategory` records with the `TaxCategoryService`. It provides a fluent, chainable interface for setting the fields of a tax category.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `TaxCategoryBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="shortcut-methods" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Shortcut Methods</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set the most common fields for a tax category.</p>
                        <CodeSnippet :code="shortcutExample" />
                    </v-card-text>
                </v-card>

                <v-card id="set-method" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.set(field_name, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the general-purpose method for setting any other field on the tax category record.</p>
                        <CodeSnippet :code="setExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="to_body" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.to_body()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Once you have set all the required fields, call `.to_body()` to generate the final dictionary, ready to be sent as the JSON body in your API request.</p>
                        <CodeSnippet :code="toBodyExample" />
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
  { id: 'set-method', title: '  - .set()' },
  { id: 'to_body', title: '  - .to_body()' },
]);

const importingExample = ref(`
from easy_acumatica.models.tax_category_builder import TaxCategoryBuilder
`);

const shortcutExample = ref(`
tax_category_payload = (
    TaxCategoryBuilder()
    .tax_category_id("SERVICES")
    .description("Taxable Professional Services")
    .active(True)
    .exclude_listed_taxes(False)
    .note("Default tax category for all service items.")
)
`);

const setExample = ref(`
builder = TaxCategoryBuilder()
builder.set("TaxCategoryID", "GOODS")
builder.set("Description", "Taxable Goods")
`);

const toBodyExample = ref(`
# Build the tax category
tax_category_payload = (
    TaxCategoryBuilder()
    .tax_category_id("EXEMPT")
    .description("Non-taxable items")
    .active(True)
)

# Get the final dictionary
json_body = tax_category_payload.to_body()

# The json_body will look like this:
# {
#   "TaxCategoryID": {"value": "EXEMPT"},
#   "Description": {"value": "Non-taxable items"},
#   "Active": {"value": True}
# }

# Use with the TaxCategoryService
# client.tax_categories.update_tax_category("24.200.001", builder=tax_category_payload)
`);

//SEO
useSeoMeta({
  title: 'TaxCategoryBuilder | Acumatica Tax API',
  description: 'A guide to building JSON payloads for tax categories in Acumatica using the Easy-Acumatica TaxCategoryBuilder.',
  ogTitle: 'Acumatica TaxCategoryBuilder - Easy-Acumatica Docs',
  ogDescription: 'Learn how to construct tax category payloads for the Acumatica API with the fluent TaxCategoryBuilder.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica TaxCategoryBuilder API',
  twitterDescription: 'A guide to creating tax category payloads with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica TaxCategoryBuilder',
  description: 'Create and update tax categories using the Easy-Acumatica API wrapper.',
});
</script>