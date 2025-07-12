<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                ConfigurationEntryBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the `ConfigurationEntryBuilder`, which is your primary tool for creating the JSON payload needed to update `ConfigurationEntry` records with the `ManufacturingService`.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `ConfigurationEntryBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="standard-fields" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Standard Fields</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set the key identifiers for the configuration record. The `configuration_id` is required to identify which configuration to update.</p>
                        <CodeSnippet :code="standardFieldsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="add_feature" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>add_feature(feature_line_nbr, config_results_id, options)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method adds a complete feature object, including its options, to the payload. The `options` parameter is a list of dictionaries, where each dictionary represents an option and its selection status. You must construct this list manually, ensuring the structure matches the API's requirements exactly.</p>
                        <CodeSnippet :code="addFeatureExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="to_body" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>to_body()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Once you have set all the required fields, call the `.to_body()` method to generate the final dictionary, which is ready to be sent as the JSON body in your API request.</p>
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
  { id: 'standard-fields', title: '  - Standard Fields' },
  { id: 'add_feature', title: '  - add_feature' },
  { id: 'to_body', title: '  - to_body' },
]);

const importingExample = ref(`
from easy_acumatica.models.configuration_entry_builder import ConfigurationEntryBuilder
`);

const standardFieldsExample = ref(`
# Identify the configuration and related production order
config_payload = (
    ConfigurationEntryBuilder()
    .configuration_id("MYCONFIG001")
    .prod_order_type("RG")
    .prod_order_nbr("PO000123")
)
`);

const addFeatureExample = ref(`
# 1. Manually define the list of options for a feature
color_options_list = [
    {"LineNbr": {"value": 1}, "Option": {"value": "RED"}, "Selected": {"value": False}},
    {"LineNbr": {"value": 2}, "Option": {"value": "BLUE"}, "Selected": {"value": True}},
]

# 2. Use the list with the add_feature method
config_payload = (
    ConfigurationEntryBuilder()
    .configuration_id("MYCONFIG001")
    .add_feature(
        feature_line_nbr=1,
        config_results_id="<some_results_id>",
        options=color_options_list
    )
)
`);

const toBodyExample = ref(`
# Build the full configuration payload
config_payload = (
    ConfigurationEntryBuilder()
    .configuration_id("MYCONFIG001")
    # ... other methods
)

# Get the final dictionary
json_body = config_payload.to_body()

# Use with the ManufacturingService
# client.manufacturing.update_configuration_entry("25.100.001", builder=config_payload)
`);
</script>