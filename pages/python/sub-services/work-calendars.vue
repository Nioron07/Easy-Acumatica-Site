<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Work Calendars Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the `WorkCalendarsService`, which is your primary tool for creating and retrieving work calendar records through the contract-based API.
              </p>
               <v-alert
                type="info"
                variant="tonal"
                class="mt-4"
                border="start"
                density="compact"
              >
                According to the service notes, the get_work_calendar endpoint may only return basic information like ID, Description, and Time Zone, not the detailed day-by-day exceptions or schedules.
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

                <v-card id="create_work_calendar" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_work_calendar(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method creates a new work calendar. You must provide a `WorkCalendarBuilder` instance containing the calendar's details.</p>
                        <CodeSnippet :code="createWorkCalendarExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_work_calendar" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_work_calendar(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method retrieves a list of work calendars. You must use `QueryOptions` to filter for the calendar you want.</p>
                        <CodeSnippet :code="getWorkCalendarExample" />
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
  { id: 'create_work_calendar', title: '  - create_work_calendar' },
  { id: 'get_work_calendar', title: '  - get_work_calendar' },
]);

const importingExample = ref(`
from easy_acumatica.models.work_calendar_builder import WorkCalendarBuilder
from easy_acumatica.models.query_builder import QueryOptions
from easy_acumatica.filters import F
`);

const createWorkCalendarExample = ref(`
# 1. Build the work calendar payload
# This assumes a WorkCalendarBuilder with methods like calendar_id, time_zone, and add_exception
calendar_payload = (
    WorkCalendarBuilder()
    .calendar_id("US-HOLIDAYS")
    .time_zone("CST")
    .add_exception(date="2024-12-25", description="Christmas Day")
)

# 2. Use the payload to create the record
try:
    new_calendar = client.work_calendars.create_work_calendar("24.200.001", builder=calendar_payload)
    print(f"Successfully created Work Calendar: {new_calendar['CalendarID']['value']}")
except Exception as e:
    print(f"Failed to create work calendar: {e}")
`);

const getWorkCalendarExample = ref(`
# 1. Define query options
query = QueryOptions(filter=F.CalendarID == 'US-HOLIDAYS')

# 2. Retrieve the work calendar(s)
try:
    calendars = client.work_calendars.get_work_calendar("24.200.001", options=query)
    for calendar in calendars:
        print(f"ID: {calendar['CalendarID']['value']}, Time Zone: {calendar['TimeZone']['value']}")
except Exception as e:
    print(f"Failed to get work calendars: {e}")
`);

//SEO
useSeoMeta({
  title: 'Work Calendars Service | Acumatica Scheduling API',
  description: 'A guide to creating and retrieving work calendars in Acumatica using the Easy-Acumatica WorkCalendarsService.',
  ogTitle: 'Acumatica Work Calendars Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage work calendars programmatically with the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Work Calendars API',
  twitterDescription: 'A guide to creating and retrieving work calendars with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Work Calendars Service',
  description: 'Create and retrieve work calendars using the Easy-Acumatica API wrapper.',
});
</script>