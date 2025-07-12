<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Work Locations Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the `WorkLocationsService`, which is your primary tool for creating and retrieving work location records through the contract-based API.
              </p>
              <v-alert
                type="warning"
                variant="tonal"
                class="mt-4"
                border="start"
                density="compact"
                icon="mdi-alert-circle-outline"
              >
                <strong>Warning:</strong> This service is currently untested due to limitations in the development environment. Please contact the library maintainers on <a href="https://github.com/Nioron07/Easy-Acumatica">GitHub</a> if you encounter any issues with this specific endpoint.
              </v-alert>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                Before you start, import the necessary builders and query helpers.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="create_work_location" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_work_location(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method creates a new work location. You must provide a `WorkLocationBuilder` instance containing the location's details.</p>
                        <CodeSnippet :code="createWorkLocationExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_work_locations" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_work_locations(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method retrieves a list of work locations. You can use `QueryOptions` to filter for specific locations.</p>
                        <CodeSnippet :code="getWorkLocationsExample" />
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
  { id: 'methods', title: 'Service Methods' },
  { id: 'create_work_location', title: '  - create_work_location' },
  { id: 'get_work_locations', title: '  - get_work_locations' },
]);

const importingExample = ref(`
from easy_acumatica.models.work_location_builder import WorkLocationBuilder
from easy_acumatica.models.query_builder import QueryOptions
from easy_acumatica.filters import F
`);

const createWorkLocationExample = ref(`
# 1. Build the work location payload
# This assumes a WorkLocationBuilder with methods like location_id and description
location_payload = (
    WorkLocationBuilder()
    .location_id("WAREHOUSE-B")
    .description("Secondary Warehouse Location")
    .active(True)
)

# 2. Use the payload to create the record
try:
    new_location = client.work_locations.create_work_location("24.200.001", builder=location_payload)
    print(f"Successfully created Work Location: {new_location['LocationID']['value']}")
except Exception as e:
    print(f"Failed to create work location: {e}")
`);

const getWorkLocationsExample = ref(`
# 1. Define query options
query = QueryOptions(filter=F.Active == True)

# 2. Retrieve the work location(s)
try:
    locations = client.work_locations.get_work_locations("24.200.001", options=query)
    for loc in locations:
        print(f"ID: {loc['LocationID']['value']}, Description: {loc['Description']['value']}")
except Exception as e:
    print(f"Failed to get work locations: {e}")
`);

//SEO
useSeoMeta({
  title: 'Work Locations Service | Acumatica HR API',
  description: 'A guide to creating and retrieving work locations in Acumatica using the Easy-Acumatica WorkLocationsService.',
  ogTitle: 'Acumatica Work Locations Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage work locations programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Work Locations API',
  twitterDescription: 'A guide to creating and retrieving work locations with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Work Locations Service',
  description: 'Create and retrieve work locations using the Easy-Acumatica API wrapper.',
});
</script>