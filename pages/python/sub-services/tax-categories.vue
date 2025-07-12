<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Tax Category Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the `TaxCategoryService`, which is your primary tool for creating or updating tax category records through the contract-based API.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                Before you start, import the necessary builders and query helpers. The `TaxCategoryService` methods rely on these to construct payloads and define query parameters.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

                <v-card id="update_tax_category" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_tax_category(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new tax category or updates an existing one. The API uses a `PUT` request, which will create a new record if the `TaxCategoryID` doesn't exist, or update it if it does. You must provide a `TaxCategoryBuilder` instance containing the category's details.</p>
                        <CodeSnippet :code="createTaxCategoryExample" />
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
  { id: 'update_tax_category', title: '  - update_tax_category' },
]);

const importingExample = ref(`
from easy_acumatica.models.tax_category_builder import TaxCategoryBuilder
from easy_acumatica.models.query_builder import QueryOptions
`);

const createTaxCategoryExample = ref(`
# 1. Build the tax category payload
tax_category_payload = (
    TaxCategoryBuilder()
    .tax_category_id("SERVICES")
    .description("Taxable Professional Services")
    .active(True)
    .exclude_listed_taxes(False)
)

# 2. Use the payload to create or update the record
try:
    new_category = client.tax_categories.update_tax_category(
        "24.200.001",
        builder=tax_category_payload
    )
    print(f"Successfully created or updated tax category: {new_category['TaxCategoryID']['value']}")
except Exception as e:
    print(f"Failed to process tax category: {e}")
`);

//SEO
useSeoMeta({
  title: 'Tax Category Service | Acumatica Tax API',
  description: 'A guide to creating and updating tax categories in Acumatica using the Easy-Acumatica TaxCategoryService.',
  ogTitle: 'Acumatica Tax Category Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage tax categories programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Tax Category API',
  twitterDescription: 'A guide to creating and updating tax categories with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Tax Category Service',
  description: 'Create and update tax categories using the Easy-Acumatica API wrapper.',
});
</script>