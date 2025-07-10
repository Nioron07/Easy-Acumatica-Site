<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Contacts Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `ContactsService` is a high-level helper for interacting with `Contact` resources. It provides methods to list, create, update, delete, and link contacts within your Acumatica instance.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To effectively use the service, you will need to import the `ContactBuilder` for creating payloads and the `QueryOptions` and `F` factory for filtering.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="get_contacts" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_contacts(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves a list of contacts. You can provide an optional `QueryOptions` object to filter, expand, select, or paginate the results.</p>
                        <CodeSnippet :code="getContactsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_contact" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_contact(api_version, draft)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new contact or lead in Acumatica. This method requires a `ContactBuilder` instance to construct the JSON payload for the new record.</p>
                        <CodeSnippet :code="createContactExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="update_contact" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_contact(api_version, filter_, payload)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Updates one or more existing contacts that match the specified `filter_`. You can provide the update payload as either a `ContactBuilder` instance or a raw dictionary.</p>
                        <CodeSnippet :code="updateContactExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="deactivate_contact" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>deactivate_contact(api_version, filter_, active=False)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Performs a "soft-delete" by setting the `Active` status of contacts matching the filter. Set the `active` parameter to `True` to reactivate them.</p>
                        <CodeSnippet :code="deactivateContactExample" />
                    </v-card-text>
                </v-card>

                <v-card id="delete_contact" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>delete_contact(api_version, note_id)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Permanently deletes a contact from Acumatica. This action is irreversible and requires the `NoteID` (GUID) of the contact to be deleted.</p>
                        <CodeSnippet :code="deleteContactExample" />
                    </v-card-text>
                </v-card>

                <v-card id="link_contact_to_customer" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>link_contact_to_customer(api_version, contact_id, business_account, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Associates an existing contact with a customer (Business Account) record. This is a specialized update operation that sets the `BusinessAccount` field on the contact.</p>
                        <CodeSnippet :code="linkContactExample" />
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
  { id: 'get_contacts', title: '  - get_contacts' },
  { id: 'create_contact', title: '  - create_contact' },
  { id: 'update_contact', title: '  - update_contact' },
  { id: 'deactivate_contact', title: '  - deactivate_contact' },
  { id: 'delete_contact', title: '  - delete_contact' },
  { id: 'link_contact_to_customer', title: '  - link_contact_to_customer' },
]);

const importingExample = ref(`
from easy_acumatica.models import ContactBuilder, QueryOptions, F
`);

const getContactsExample = ref(`
# Find a specific contact by their ContactID
opts = QueryOptions(filter=F.ContactID == 100073)

contact = client.contacts.get_contacts("24.200.001", options=opts)
`);

const createContactExample = ref(`
# Build the payload for a new contact
draft = (
    ContactBuilder()
    .first_name("Brent")
    .last_name("Edds")
    .email("brent.edds@example.com")
    .contact_class("ENDCUST")
)

# Create the contact
created_contact = client.contacts.create_contact("24.200.001", draft)
`);

const updateContactExample = ref(`
# Change the email for the contact with ID 100200
update_payload = ContactBuilder().email("new.email@example.com")

updated_contact = client.contacts.update_contact(
    "24.200.001",
    filter_=(F.ContactID == 100200),
    payload=update_payload
)
`);

const deactivateContactExample = ref(`
# Deactivate a specific contact
client.contacts.deactivate_contact(
    "24.200.001",
    filter_=(F.ContactID == 100200),
    active=False
)
`);

const deleteContactExample = ref(`
# The NoteID is a GUID, not the integer ContactID
note_id_to_delete = "123e4567-e89b-12d3-a456-426614174000"

# Permanently delete the contact
client.contacts.delete_contact("24.200.001", note_id=note_id_to_delete)
`);

const linkContactExample = ref(`
# Associate contact 104000 with business account 'ABAKERY'
client.contacts.link_contact_to_customer(
    "24.200.001",
    contact_id=104000,
    business_account="ABAKERY"
)
`);
</script>