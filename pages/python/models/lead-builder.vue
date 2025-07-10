<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                LeadBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `LeadBuilder` is a simple tool for creating the JSON payload needed to create new Lead records with the `LeadsService`. It provides a fluent, chainable interface for setting the most common fields of a lead record.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `LeadBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="shortcut-methods" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Shortcut Methods</v-card-title>
                    <v-card-text>
                        <p class="mb-4">For the most common lead fields, you can use one of the built-in shortcut methods.</p>
                        <CodeSnippet :code="shortcutExample" />
                    </v-card-text>
                </v-card>

                <v-card id="set-method" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.set(field_name, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the general-purpose method for setting any other field on the lead record that may not have a dedicated shortcut.</p>
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
from easy_acumatica.models import LeadBuilder
`);

const shortcutExample = ref(`
lead_payload = (
    LeadBuilder()
    .first_name("Brent")
    .last_name("Edds")
    .email("brent.edds.test@example.com")
)
`);

const setExample = ref(`
# Use .set() to add other fields like CompanyName
lead_payload = (
    LeadBuilder()
    .first_name("Maria")
    .set("CompanyName", "Global Innovations")
)
`);

const toBodyExample = ref(`
# Build the lead payload
lead_payload = (
    LeadBuilder()
    .first_name("Maria")
    .last_name("Sanchez")
    .email("maria.s@example.com")
)

# Get the final dictionary
json_body = lead_payload.to_body()

# Use with the LeadsService
# client.leads.create_lead("24.200.001", builder=lead_payload)
`);
</script>