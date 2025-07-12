<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Leads Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `LeadsService` provides a straightforward way to create new Lead records through the contract-based API. While the Acumatica endpoint for creating a lead is the same as for a general contact, this service provides a clear, dedicated interface for this specific task.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create a new lead, you must import the `LeadBuilder` to construct the request payload.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

                <v-card id="create_lead" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_lead(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use this method to create a new lead record. You must provide a `LeadBuilder` object containing the new lead's details. The endpoint often only requires basic contact information like first name, last name, and email.</p>
                        <CodeSnippet :code="createLeadExample" />
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
  { id: 'create_lead', title: '  - create_lead' },
]);

const importingExample = ref(`
from easy_acumatica.models.lead_builder import LeadBuilder
`);

const createLeadExample = ref(`
# Build the lead payload using the fluent builder
lead_payload = (
    LeadBuilder()
    .first_name("Brent")
    .last_name("Edds")
    .email("brent.edds.test@example.com")
)

# Use the service to create the lead
new_lead = client.leads.create_lead(
    "24.200.001",
    builder=lead_payload
)

# The response will contain the full lead/contact record
print(f"Successfully created lead with NoteID: {new_lead['NoteID']['value']}")
`);

//SEO
useSeoMeta({
  title: 'Leads Service | Acumatica CRM API',
  description: 'A guide to creating new leads in Acumatica using the Easy-Acumatica LeadsService.',
  ogTitle: 'Acumatica Leads Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to create new leads programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Leads API',
  twitterDescription: 'A guide to creating new leads with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Leads Service',
  description: 'Create new leads using the Easy-Acumatica API wrapper.',
});

</script>