<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Activities Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `ActivitiesService` is used to create activities (like notes, tasks, or events) and link them to other records in Acumatica, such as Cases, Customers, or Leads. This is essential for building a complete history of interactions with a given record.
              </p>
            </section>

            <section id="linking-process" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">The Linking Process</h2>
              <p class="text-body-1 mb-4">
                To link an activity to another record, you first need the <strong>`NoteID`</strong> (a GUID) of that parent record. You can get this `NoteID` when you first create the record or by fetching it from Acumatica. The service uses this `NoteID` and a specific `RelatedEntityType` string to create the connection.
              </p>
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="create_activity_linked_to_case" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_activity_linked_to_case(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new activity and attaches it to a specific support case. This is useful for logging correspondence, internal notes, or tasks related to resolving an issue.</p>
                        <CodeSnippet :code="linkToCaseExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_activity_linked_to_customer" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_activity_linked_to_customer(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new activity and attaches it to a customer record. This helps maintain a complete communication history with the customer.</p>
                        <CodeSnippet :code="linkToCustomerExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_activity_linked_to_lead" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_activity_linked_to_lead(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new activity and attaches it to a sales lead, perfect for tracking follow-ups, calls, and meeting notes during the sales process.</p>
                        <CodeSnippet :code="linkToLeadExample" />
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

// --- SEO & OG Image Configuration ---

useSeoMeta({
  title: 'Activities Service | Easy-Acumatica Docs',
  description: 'Learn to create and link activities like notes, tasks, or events to records such as Cases, Customers, or Leads in Acumatica using the Easy-Acumatica Python library.',
});

defineOgImage({
  title: 'Activities Service',
  description: 'Create and link activities to any record in Acumatica with the Easy-Acumatica library.',
});


// --- Page Content Data ---

const onPageNavItems = ref([
  { id: 'introduction', title: 'Introduction' },
  { id: 'linking-process', title: 'The Linking Process' },
  { id: 'methods', title: 'Service Methods' },
  { id: 'create_activity_linked_to_case', title: '  - Link to Case' },
  { id: 'create_activity_linked_to_customer', title: '  - Link to Customer' },
  { id: 'create_activity_linked_to_lead', title: '  - Link to Lead' },
]);

const linkToCaseExample = ref(`
# Assume you have the NoteID of a case
case_note_id = "e3f46a39-1a14-e911-816f-bc920a5e0ac8"

# Create a 'Task' activity linked to the case
new_task = client.activities.create_activity_linked_to_case(
    api_version="24.200.001",
    case_note_id=case_note_id,
    summary="Investigate user login issue",
    details="User reports being unable to log in since the last update.",
    activity_type="T"  # 'T' for Task, 'M' for Note (default)
)
`);

const linkToCustomerExample = ref(`
# Assume you have the NoteID of a customer
customer_note_id = "f37200d6-35ea-eb11-9dee-9828a61840c3"

# Create a 'Note' activity linked to the customer
new_note = client.activities.create_activity_linked_to_customer(
    api_version="24.200.001",
    customer_note_id=customer_note_id,
    summary="Follow-up call with customer",
    details="Discussed the new pricing model and upcoming features."
)
`);

const linkToLeadExample = ref(`
# Assume you have the NoteID of a lead
lead_note_id = "a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6"

# Create a 'Note' activity linked to the lead
new_activity = client.activities.create_activity_linked_to_lead(
    api_version="24.200.001",
    lead_note_id=lead_note_id,
    summary="Initial contact with new lead",
    details="Sent introductory email and scheduled a demo for next week."
)
`);
</script>