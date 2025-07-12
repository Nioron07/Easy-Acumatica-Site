<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                WorkLocationBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `WorkLocationBuilder` is your primary tool for creating the JSON payload needed to create or update `WorkLocation` records with the `WorkLocationsService`. It provides a fluent, chainable interface for setting the fields of a work location, including its address.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `WorkLocationBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="shortcut-methods" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Shortcut Methods</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set the most common fields for a work location.</p>
                        <CodeSnippet :code="shortcutExample" />
                    </v-card-text>
                </v-card>

                <v-card id="set-method" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.set(field_name, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the general-purpose method for setting any other field on the work location record.</p>
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

            <section id="complete-example" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Complete Example with WorkLocationsService</h2>
              <p class="text-body-1 mb-4">
                Here is a complete example of how to use the `WorkLocationBuilder` to create a new work location record.
              </p>
              <CodeSnippet :code="completeExample" />
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
  { id: 'complete-example', title: 'Complete Example' },
]);

const importingExample = ref(`
from easy_acumatica.models.work_location_builder import WorkLocationBuilder
`);

const shortcutExample = ref(`
location_payload = (
    WorkLocationBuilder()
    .work_location_id("MAIN-OFFICE")
    .work_location_name("Main Corporate Office")
    .active(True)
    .address_info(
        address_line_1="123 Corporate Way",
        city="Someville",
        state="CA",
        postal_code="90210",
        country="US"
    )
)
`);

const setExample = ref(`
builder = WorkLocationBuilder()
builder.set("WorkLocationID", "WAREHOUSE-B")
builder.set("Description", "Secondary Warehouse Location")
`);

const toBodyExample = ref(`
# Build the work location
location_payload = (
    WorkLocationBuilder()
    .work_location_id("MAIN-OFFICE")
    .address_info(city="Someville", state="CA")
)

# Get the final dictionary
json_body = location_payload.to_body()

# The json_body will look like this:
# {
#   "WorkLocationID": {"value": "MAIN-OFFICE"},
#   "AddressInfo": {
#     "City": {"value": "Someville"},
#     "State": {"value": "CA"}
#   }
# }
`);

const completeExample = ref(`
from easy_acumatica.models.work_location_builder import WorkLocationBuilder

# 1. Build the work location payload
location_to_create = (
    WorkLocationBuilder()
    .work_location_id("EAST-WH")
    .work_location_name("East Coast Warehouse")
    .active(True)
    .address_info(
        address_line_1="456 Distribution Dr",
        city="Eastville",
        state="NY",
        postal_code="10001",
        country="US"
    )
)

# 2. Use the payload with the WorkLocationsService to create the record
try:
    new_location = client.work_locations.create_work_location(
        "24.200.001",
        builder=location_to_create
    )
    print(f"Successfully created work location: {new_location['WorkLocationID']['value']}")
except Exception as e:
    print(f"Failed to create work location: {e}")
`);

//SEO
useSeoMeta({
  title: 'WorkLocationBuilder | Acumatica HR API',
  description: 'A guide to building JSON payloads for work locations in Acumatica using the Easy-Acumatica WorkLocationBuilder.',
  ogTitle: 'Acumatica WorkLocationBuilder - Easy-Acumatica Docs',
  ogDescription: 'Learn how to construct work location payloads for the Acumatica API with the fluent WorkLocationBuilder.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica WorkLocationBuilder API',
  twitterDescription: 'A guide to creating work location payloads with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica WorkLocationBuilder',
  description: 'Create and update work locations using the Easy-Acumatica API wrapper.',
});
</script>