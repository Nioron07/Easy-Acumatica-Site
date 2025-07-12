<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                BOMBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The <code>BOMBuilder</code> is your primary tool for creating the JSON payload needed to create Bill of Material (BOM) records with the <code>BomsService</code>. It provides a fluent, chainable interface for setting the fields of a BOM record and supports defining multiple operations and materials.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the <code>BOMBuilder</code> from the models directory.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>
              <p class="text-body-1 mb-4">
                The builder provides both general-purpose and shortcut methods for constructing a valid JSON payload. The core of building a BOM is adding operations and their associated materials.
              </p>

              <v-card id="shortcut-methods" class="mb-8" variant="outlined">
                <v-card-title class="text-h5">Shortcut Methods</v-card-title>
                <v-card-text>
                  <p class="mb-4">Use shortcut methods to set commonly used top-level fields.</p>
                  <CodeSnippet :code="shortcutExample" />
                </v-card-text>
              </v-card>

              <v-card id="set-method" class="mb-8" variant="outlined">
                <v-card-title class="text-h5"><code>set(field_name, value)</code></v-card-title>
                <v-card-text>
                  <p class="mb-4">Use this to set any field that doesn't have a dedicated shortcut method.</p>
                  <CodeSnippet :code="setExample" />
                </v-card-text>
              </v-card>

              <v-card id="to_body" class="mb-8" variant="outlined">
                <v-card-title class="text-h5"><code>to_body()</code></v-card-title>
                <v-card-text>
                  <p class="mb-4">Generates the final dictionary formatted for use in your API request.</p>
                  <CodeSnippet :code="toBodyExample" />
                </v-card-text>
              </v-card>
            </section>

            <section id="adding-operations" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Adding Operations and Materials</h2>

              <v-card id="add-operation" class="mb-8" variant="outlined">
                <v-card-title class="text-h5"><code>add_operation(operation_nbr, work_center, materials)</code></v-card-title>
                <v-card-text>
                  <p class="mb-4">Use this to add a manufacturing operation and its material list.</p>
                  <CodeSnippet :code="operationsExample" />
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
  { id: 'set-method', title: '  - set()' },
  { id: 'to_body', title: '  - to_body()' },
  { id: 'adding-operations', title: 'Adding Operations and Materials' },
  { id: 'add-operation', title: '  - add_operation()' },
]);

const importingExample = ref(`
from easy_acumatica.models.bom_builder import BOMBuilder
`);

const shortcutExample = ref(`
bom_payload = (
    BOMBuilder()
    .bom_id("FINISHED-PRODUCT")
    .inventory_id("FINISHED-PRODUCT")
    .revision("A")
    .description("Main assembly BOM")
)
`);

const setExample = ref(`
builder = BOMBuilder()
builder.set("BOMType", "Manufacturing")
builder.set("IsActive", True)
`);

const toBodyExample = ref(`
bom_payload = (
    BOMBuilder()
    .bom_id("SIMPLE-BOM")
    .inventory_id("SIMPLE-BOM")
    .revision("A")
    .add_operation(
        operation_nbr="10",
        work_center="ASSEMBLY",
        materials=[{"InventoryID": "COMPONENT-Z", "QtyRequired": 1.0}]
    )
)
json_body = bom_payload.to_body()
`);

const operationsExample = ref(`
op_10_materials = [
    {"InventoryID": "RAW-PART-A", "QtyRequired": 2.0, "UOM": "EA"},
    {"InventoryID": "RAW-PART-B", "QtyRequired": 5.0, "UOM": "EA"}
]

bom_payload = (
    BOMBuilder()
    .bom_id("FINISHED-ASSEMBLY")
    .inventory_id("FINISHED-ASSEMBLY")
    .revision("A")
    .description("Multi-step Assembly BOM")
    .add_operation(
        operation_nbr="10",
        work_center="CUTTING",
        materials=op_10_materials
    )
    .add_operation(
        operation_nbr="20",
        work_center="WELDING",
        materials=[{"InventoryID": "SUB-ASSEMBLY-X", "QtyRequired": 1.0}]
    )
)
`);

//SEO

useSeoMeta({
  title: 'BOMBuilder | Acumatica BOM API',
  description: 'Build JSON payloads for Bill of Materials in Acumatica using Easy-Acumatica’s fluent BOMBuilder interface.',
  ogTitle: 'Acumatica BOMBuilder - Easy-Acumatica Docs',
  ogDescription: 'Create and structure Acumatica BOM records programmatically using the Easy-Acumatica BOMBuilder. Supports multiple operations and materials.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica BOMBuilder API',
  twitterDescription: 'Define Bill of Materials for Acumatica using Easy-Acumatica’s fluent BOMBuilder interface.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica BOMBuilder',
  description: 'Create Bill of Materials and operation steps using Easy-Acumatica.',
});

</script>
