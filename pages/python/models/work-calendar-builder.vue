<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                WorkCalendarBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `WorkCalendarBuilder` is your primary tool for creating the JSON payload needed to create `WorkCalendar` records with the `WorkCalendarsService`.
              </p>
              <v-alert
                type="info"
                variant="tonal"
                class="mt-4"
                border="start"
                density="compact"
              >
                As noted in the builder's source code, there is currently no public method to add calendar exceptions or define specific workdays through this builder.
              </v-alert>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `WorkCalendarBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>

                <v-card id="shortcut-methods" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Shortcut Methods</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the shortcut methods to set the most common fields for a work calendar.</p>
                        <CodeSnippet :code="shortcutExample" />
                    </v-card-text>
                </v-card>

                <v-card id="set-method" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.set(field_name, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the general-purpose method for setting any other field on the work calendar record.</p>
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
              <h2 class="text-h4 font-weight-medium mb-4">Complete Example with WorkCalendarsService</h2>
              <p class="text-body-1 mb-4">
                Here is a complete example of how to use the `WorkCalendarBuilder` to create a new work calendar record.
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
from easy_acumatica.models.work_calendar_builder import WorkCalendarBuilder
`);

const shortcutExample = ref(`
calendar_payload = (
    WorkCalendarBuilder()
    .work_calendar_id("STANDARD")
    .description("Standard Mon-Fri Work Week")
    .time_zone("GMTM0600C") # Example: US Central Time
)
`);

const setExample = ref(`
builder = WorkCalendarBuilder()
builder.set("WorkCalendarID", "24-7-OPS")
builder.set("Description", "24/7 Operations Calendar")
`);

const toBodyExample = ref(`
# Build the work calendar
calendar_payload = (
    WorkCalendarBuilder()
    .work_calendar_id("STANDARD")
    .description("Standard Mon-Fri Work Week")
)

# Get the final dictionary
json_body = calendar_payload.to_body()

# The json_body will look like this:
# {
#   "WorkCalendarID": {"value": "STANDARD"},
#   "Description": {"value": "Standard Mon-Fri Work Week"}
# }
`);

const completeExample = ref(`
from easy_acumatica.models.work_calendar_builder import WorkCalendarBuilder

# 1. Build the work calendar payload
calendar_to_create = (
    WorkCalendarBuilder()
    .work_calendar_id("24-7-OPS")
    .description("24/7 Operations Calendar")
    .time_zone("GMT")
)

# 2. Use the payload with the WorkCalendarsService to create the record
try:
    new_calendar = client.work_calendars.create_work_calendar(
        "24.200.001",
        builder=calendar_to_create
    )
    print(f"Successfully created work calendar: {new_calendar['WorkCalendarID']['value']}")
except Exception as e:
    print(f"Failed to create work calendar: {e}")
`);

//SEO
useSeoMeta({
  title: 'WorkCalendarBuilder | Acumatica Scheduling API',
  description: 'A guide to building JSON payloads for work calendars in Acumatica using the Easy-Acumatica WorkCalendarBuilder.',
  ogTitle: 'Acumatica WorkCalendarBuilder - Easy-Acumatica Docs',
  ogDescription: 'Learn how to construct work calendar payloads for the Acumatica API with the fluent WorkCalendarBuilder.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica WorkCalendarBuilder API',
  twitterDescription: 'A guide to creating work calendar payloads with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica WorkCalendarBuilder',
  description: 'Create and update work calendars using the Easy-Acumatica API wrapper.',
});
</script>