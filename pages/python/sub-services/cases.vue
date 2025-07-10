<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Cases Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `CasesService` is your primary tool for interacting with Case records in Acumatica. It allows you to programmatically create support cases, link related cases together, and manage their properties.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create cases, you'll need the `CaseBuilder` from the `easy_acumatica.models` module. You may also need `QueryOptions` if you wish to customize the API response.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="create_case" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_case(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the main method for creating a new case record. You must provide a `CaseBuilder` object containing the new case's details. You can optionally provide `QueryOptions` to customize the response, for example, to expand related entities.</p>
                        <CodeSnippet :code="createCaseExample" />
                    </v-card-text>
                </v-card>

                <v-card id="link_case_to_another_case" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>link_case_to_another_case(api_version, builder)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This helper method creates a new case and links it to one or more existing cases in a single API call. This is useful for tracking duplicate issues or grouping related problems. To use this method, your `CaseBuilder` must include the `CaseCD` of the case(s) you want to link to, added via the `.add_related_case()` method.</p>
                        <CodeSnippet :code="linkCaseExample" />
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
  { id: 'create_case', title: '  - create_case' },
  { id: 'link_case_to_another_case', title: '  - link_case_to_another' },
]);

const importingExample = ref(`
from easy_acumatica.models import CaseBuilder, QueryOptions
`);

const createCaseExample = ref(`
# Build the case payload
case_payload = (
    CaseBuilder()
    .class_id("HIGH")  # Set the Case Class
    .subject("Urgent: Main website is down")
    .set("BusinessAccount", "ABCCORP") # Set the customer for the case
)

# Create the case
new_case = client.cases.create_case("24.200.001", case_payload)
print(f"Successfully created case with ID: {new_case['CaseCD']['value']}")
`);

const linkCaseExample = ref(`
# Build the payload for the new case, specifying the existing case to link to.
related_case_payload = (
    CaseBuilder()
    .class_id("MEDIUM")
    .subject("Users in Texas also reporting website down")
    .add_related_case("CR000456") # The CaseCD of the existing master ticket
)

# Create the new case and link it. 
# The response automatically includes the expanded 'RelatedCases' field.
linked_case = client.cases.link_case_to_another_case(
    "24.200.001", 
    related_case_payload
)

print(f"Successfully created case: {linked_case['CaseCD']['value']}")
`);
</script>