<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Time Entries Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the `TimeEntriesService`, which is your primary tool for creating and retrieving time entry records through the contract-based API.
              </p>
              <v-alert
                type="warning"
                variant="tonal"
                class="mt-4"
                border="start"
                density="compact"
                icon="mdi-alert-circle-outline"
              >
                <strong>Please Note:</strong> This service is currently untested due to limitations in the development environment. If you encounter any issues, please report them on the project's <a href="https://github.com/Nioron07/Easy-Acumatica">GitHub</a> page.
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

                <v-card id="create_time_entry" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_time_entry(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new time entry. You must provide a `TimeEntryBuilder` instance containing the entry's details.</p>
                        <CodeSnippet :code="createTimeEntryExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_time_entries" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_time_entries(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves a list of time entries. You must use `QueryOptions` to filter, select, and expand the results.</p>
                        <CodeSnippet :code="getTimeEntriesExample" />
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
  { id: 'create_time_entry', title: '  - create_time_entry' },
  { id: 'get_time_entries', title: '  - get_time_entries' },
]);

const importingExample = ref(`
from easy_acumatica.models.time_entry_builder import TimeEntryBuilder
from easy_acumatica.models.query_builder import QueryOptions
from easy_acumatica.filters import F
`);

const createTimeEntryExample = ref(`
# 1. Build the time entry payload
time_entry_payload = (
    TimeEntryBuilder()
    .summary("Worked on API integration task")
    .date("2022-08-18T10:00:00")
    .employee("EP00000026")
    .project_id("INTERNAL")
    .project_task_id("DEV")
    .earning_type("RG")
    .time_spent("02:00")
    .billable_time("02:00")
)

# 2. Use the payload to create the record
try:
    new_entry = client.time_entries.create_time_entry("24.200.001", builder=time_entry_payload)
    print(f"Successfully created Time Entry with ID: {new_entry['TimeEntryID']['value']}")
except Exception as e:
    print(f"Failed to create time entry: {e}")
`);

const getTimeEntriesExample = ref(`
# 1. Define query options
query = QueryOptions(
    filter=(F.Employee == 'EP00000026') & (F.Date >= '2022-08-15') & (F.Date < '2022-08-22'),
    select="Date,ProjectID,TimeSpent,Summary"
)

# 2. Retrieve the time entries
try:
    time_entries = client.time_entries.get_time_entries("24.200.001", options=query)
    for entry in time_entries:
        print(f"Date: {entry['Date']['value']}, Project: {entry['ProjectID']['value']}, Time: {entry['TimeSpent']['value']}")
except Exception as e:
    print(f"Failed to get time entries: {e}")
`);

//SEO
useSeoMeta({
  title: 'Time Entries Service | Acumatica Time Tracking API',
  description: 'A guide to creating and retrieving time entry records in Acumatica using the Easy-Acumatica TimeEntriesService.',
  ogTitle: 'Acumatica Time Entries Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage time entries programmatically with the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Time Entries API',
  twitterDescription: 'A guide to creating and retrieving time entries with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Time Entries Service',
  description: 'Create and retrieve time entries using the Easy-Acumatica API wrapper.',
});
</script>