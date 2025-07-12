<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                CaseBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `CaseBuilder` is your primary tool for creating the JSON payload needed to create or update Case records with the `CasesService`. It provides a fluent, chainable interface for setting the fields of a case record, including related cases and custom fields.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `CaseBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="standard-fields" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Standard Fields</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set common top-level fields on the case record. For any other field, you can use the generic `.set()` method.</p>
                        <CodeSnippet :code="standardFieldsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="add_related_case" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>add_related_case(case_id)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use this method to link the new case to an existing one by its `CaseCD`. You can chain this method to link multiple cases.</p>
                        <CodeSnippet :code="relatedCaseExample" />
                    </v-card-text>
                </v-card>

                <v-card id="set_custom_field" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>set_custom_field(view, field, value, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method allows you to set custom fields defined in your Acumatica instance.</p>
                        <CodeSnippet :code="customFieldExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="to_body" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>to_body()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Once you have set all the required fields, call the `.to_body()` method to generate the final dictionary. This dictionary is formatted correctly and is ready to be sent as the JSON body in your API request.</p>
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
  { id: 'importing-helpers', title: 'Importing Helpers' },
  { id: 'methods', title: 'Builder Methods' },
  { id: 'standard-fields', title: '  - Standard Fields' },
  { id: 'add_related_case', title: '  - add_related_case' },
  { id: 'set_custom_field', title: '  - set_custom_field' },
  { id: 'to_body', title: '  - to_body' },
]);

const importingExample = ref(`
from easy_acumatica.models.case_builder import CaseBuilder
`);

const standardFieldsExample = ref(`
case_payload = (
    CaseBuilder()
    .class_id("SUPPORT")
    .business_account("ABCCORP")
    .subject("Cannot log in to portal")
    .set("Priority", "High") # Using the generic .set() method
)
`);

const relatedCaseExample = ref(`
case_payload = (
    CaseBuilder()
    .subject("Duplicate of existing issue")
    .add_related_case("CR000123")
    .add_related_case("CR000124")
)
`);

const customFieldExample = ref(`
case_payload = (
    CaseBuilder()
    .subject("Inquiry about support tiers")
    .set_custom_field(
        view="Case",
        field="UsrSupportTier", # Custom field name
        value="Gold"
    )
)
`);

const toBodyExample = ref(`
# Build the case
case_payload = (
    CaseBuilder()
    .class_id("SUPPORT")
    .subject("Cannot log in")
)

# Get the final dictionary
json_body = case_payload.to_body()

# json_body is now ready to be used with a service method:
# client.cases.create_case("24.200.001", builder=case_payload)
`);
</script>