<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                TimeEntryBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `TimeEntryBuilder` is your primary tool for creating the JSON payload needed to create `TimeEntry` records with the `TimeEntriesService`. It provides a fluent, chainable interface for setting the fields of a time entry.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `TimeEntryBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="shortcut-methods" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Shortcut Methods</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set the most common fields for a time entry.</p>
                        <CodeSnippet :code="shortcutExample" />
                    </v-card-text>
                </v-card>

                <v-card id="set-method" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.set(field_name, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the general-purpose method for setting any other field on the time entry record.</p>
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
              <h2 class="text-h4 font-weight-medium mb-4">Complete Example with TimeEntriesService</h2>
              <p class="text-body-1 mb-4">
                Here is a complete example of how to use the `TimeEntryBuilder` to create a new time entry record.
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
from easy_acumatica.models.time_entry_builder import TimeEntryBuilder
`);

const shortcutExample = ref(`
time_entry_payload = (
    TimeEntryBuilder()
    .summary("Initial project setup and configuration")
    .date("2022-08-17T09:00:00")
    .employee("EP00000026")
    .project_id("TOMYUM1")
    .project_task_id("PHASE1")
    .earning_type("RG")
    .time_spent("03:00")
    .billable_time("02:30")
)
`);

const setExample = ref(`
builder = TimeEntryBuilder()
builder.set("CostCode", "00-000")
`);

const toBodyExample = ref(`
# Build the time entry
time_entry_payload = (
    TimeEntryBuilder()
    .summary("Team meeting")
    .date("2022-08-17T14:00:00")
    .employee("EP00000026")
    .time_spent("00:30")
)

# Get the final dictionary
json_body = time_entry_payload.to_body()

# The json_body will look like this:
# {
#   "Summary": {"value": "Team meeting"},
#   "Date": {"value": "2022-08-17T14:00:00"},
#   "Employee": {"value": "EP00000026"},
#   "TimeSpent": {"value": "00:30"}
# }
`);

const completeExample = ref(`
from easy_acumatica.models.time_entry_builder import TimeEntryBuilder

# 1. Build the time entry payload
time_entry_to_create = (
    TimeEntryBuilder()
    .summary("Finalizing documentation for Phase 1")
    .date("2022-08-17T15:00:00")
    .employee("EP00000026")
    .project_id("TOMYUM1")
    .project_task_id("PHASE1")
    .earning_type("RG")
    .time_spent("01:00")
    .billable_time("01:00")
)

# 2. Use the payload with the TimeEntriesService to create the record
try:
    new_entry = client.time_entries.create_time_entry(
        "24.200.001",
        builder=time_entry_to_create
    )
    print(f"Successfully created time entry: {new_entry['TimeEntryID']['value']}")
except Exception as e:
    print(f"Failed to create time entry: {e}")
`);

//SEO
useSeoMeta({
  title: 'TimeEntryBuilder | Acumatica Time Tracking API',
  description: 'A guide to building JSON payloads for time entries in Acumatica using the Easy-Acumatica TimeEntryBuilder.',
  ogTitle: 'Acumatica TimeEntryBuilder - Easy-Acumatica Docs',
  ogDescription: 'Learn how to construct time entry payloads for the Acumatica API with the fluent TimeEntryBuilder.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica TimeEntryBuilder API',
  twitterDescription: 'A guide to creating time entry payloads with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica TimeEntryBuilder',
  description: 'Create and update time entries using the Easy-Acumatica API wrapper.',
});
</script>