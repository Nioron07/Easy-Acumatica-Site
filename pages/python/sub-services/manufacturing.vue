<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Manufacturing Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `ManufacturingService` is your primary tool for interacting with manufacturing-specific entities like `ConfigurationEntry`. It allows you to retrieve and update product configurations, which is essential for managing customizable products within Acumatica's manufacturing modules.
              </p>
              <v-alert
                type="info"
                variant="tonal"
                class="mt-4"
                border="start"
                density="compact"
              >
                Note: This service uses the `MANUFACTURING` endpoint prefix instead of `Default`.
              </v-alert>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create and update configurations, you need to import the `ConfigurationEntryBuilder`.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="get_configuration_entry" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_configuration_entry(api_version, configuration_id)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method retrieves a single `ConfigurationEntry` record by its unique ID. It automatically expands the `Attributes` and `Features/Options` to give you a complete view of the configuration.</p>
                        <CodeSnippet :code="getEntryExample" />
                    </v-card-text>
                </v-card>

                <v-card id="update_configuration_entry" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_configuration_entry(api_version, builder)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method sends your changes to a `ConfigurationEntry`. You must provide the `ConfigurationID` within the builder to identify the record to update.</p>
                        <CodeSnippet :code="updateEntryExample" />
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
  { id: 'get_configuration_entry', title: '  - get_configuration_entry' },
  { id: 'update_configuration_entry', title: '  - update_configuration_entry' },
]);

const importingExample = ref(`
from easy_acumatica.models.configuration_entry_builder import ConfigurationEntryBuilder
`);

const getEntryExample = ref(`
# The ID of the configuration to fetch
config_id = "MYCONFIG001"

# Call the get_configuration_entry method
config_entry = client.manufacturing.get_configuration_entry(
    "25.100.001", 
    config_id
)
`);

const updateEntryExample = ref(`
# Build the configuration payload to update a feature
# This example assumes your builder has methods to modify features and options
config_update_payload = (
    ConfigurationEntryBuilder()
    .configuration_id("MYCONFIG001")
    # This is a conceptual example; your builder would need logic
    # to find and update the correct option within the Features list.
    # .set_option_selected("COLOR", "BLUE", True)
)

# Use the payload to update the record
updated_config = client.manufacturing.update_configuration_entry(
    "25.100.001",
    builder=config_update_payload
)
`);

//SEO
useSeoMeta({
  title: 'Manufacturing Service | Acumatica Manufacturing API',
  description: 'A guide to managing product configurations in Acumatica using the Easy-Acumatica ManufacturingService.',
  ogTitle: 'Acumatica Manufacturing Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage product configurations programmatically with the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Manufacturing API',
  twitterDescription: 'A guide to managing product configurations with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Manufacturing Service',
  description: 'Manage product configurations using the Easy-Acumatica API wrapper.',
});

</script>