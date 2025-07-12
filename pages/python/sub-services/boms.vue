<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                BOMs Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the `BomsService`, which is your primary tool for creating and retrieving Bill of Material (BOM) records through yoiur Acumatica instance. This is if useful for the automation of creating BOMs or retrieving specific BOMs in software and other applications. 
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To effectively use the service, you will need to import the `BOMBuilder` for creating payloads and the `QueryOptions` and `F` factory for filtering.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

                <v-card id="create_bom" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_bom(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method creates a new BOM. You must provide a `BOMBuilder` instance containing the BOM's details, such as the inventory item it's for and its components.</p>
                        <CodeSnippet :code="createBOMExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_boms" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_boms(api_version, bom_id, revision, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method can retrieve either a list of all BOMs or a single BOM if both bom_id and revision are provided.</p>
                        <strong>Example 1: Retrieving a list of all BOMs.</strong>
                        <CodeSnippet :code="getBOMsExample1" /> 
                        <br>
                        <strong>Example 2: Retrieving a single BOM.</strong>
                        <CodeSnippet :code="getBOMsExample2" />
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
  title: 'BOMs Service | Acumatica BOMs API',
  description: 'A guide to fetching your Acumatica Bill of Materials using the Easy-Acumatica API wrapper',
  ogTitle: 'Acumatica Companies Service - Easy-Acumatica Docs',
  ogDescription: 'A guide to fetching your Acumatica Bill of Materials using the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png', // Uses the dynamically generated OG image
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Bill of Materials API',
  twitterDescription: 'Access and modify your Acumatica Bill of Materials',
  twitterImage: '/public/social-images/home.png', // Uses the dynamically generated OG image
});

defineOgImage({
  title: 'Acumatica BOMs Service',
  description: 'Retrieve and create Bill of Materials with Easy-Acumatica.',
});
const onPageNavItems = ref([
  { id: 'introduction', title: 'Introduction' },
  {id: 'importing-helpers', title: 'Importing Helpers'},
  { id: 'methods', title: 'Service Method' },
  { id: 'create_bom', title: '  - create_bom' },
  { id: 'get_boms', title: '  - get_boms' },
]);


const importingExample = ref(`
from easy_acumatica.models.bom_builder import BOMBuilder
from easy_acumatica.models.query_builder import QueryOptions
from easu_acumatica.models.filter_builder import F
`);

const createBOMExample = ref(`
# 1. Build the BOM payload
bom_payload = (
    BOMBuilder()
    .bom_id("FINISHED-GOOD-01")
    .revision("A")
    .description("Initial production BOM")
    .add_material(
        component_id="RAW-PART-A",
        quantity=2,
        uom="EA"
    )
    .add_material(
        component_id="RAW-PART-B",
        quantity=1,
        uom="EA"
    )
)

# 2. Use the payload to create the record
new_bom = client.boms.create_bom("24.200.001", builder=bom_payload)
print(f"Successfully created BOM: {new_bom['BOMID']['value']} Rev: {new_bom['Revision']['value']}")

`);

const getBOMsExample1 = ref(`
# Example 1. Define query options
query = QueryOptions(
    filter=F.Active == True,
    select="BOMID,Revision,Description"
)

# 2. Retrieve the BOMs
all_boms = client.boms.get_boms("24.200.001", options=query)
for bom in all_boms:
    print(f"BOM: {bom['BOMID']['value']}, Rev: {bom['Revision']['value']}")

`)


const getBOMsExample2 = ref(`
# 1. Retrieve the specific BOM
specific_bom = client.boms.get_boms(
    "24.200.001",
    bom_id="FINISHED-GOOD-01",
    revision="A",
)
print(f"Retrieved BOM: {specific_bom['BOMID']['value']}")

`)

//SEO
useSeoMeta({
  title: 'BOMs Service | Acumatica BOMs API',
  description: 'A guide to creating and retrieving Acumatica Bill of Materials (BOMs) using the Easy-Acumatica BomsService.',
  ogTitle: 'Acumatica BOMs Service - Easy-Acumatica Docs',
  ogDescription: 'A guide to creating and retrieving Bill of Materials from Acumatica using the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica BOMs API',
  twitterDescription: 'Create and manage your Acumatica Bill of Materials using the Easy-Acumatica API.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica BOMs Service',
  description: 'Retrieve and create Bill of Materials with Easy-Acumatica.',
});
</script>