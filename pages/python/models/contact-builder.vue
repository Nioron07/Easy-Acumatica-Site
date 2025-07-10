<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                ContactBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This page provides an in-depth guide to constructing Contact payloads using the `ContactBuilder` and `Attribute` helpers. You’ll learn how to assemble complex JSON structures with a fluent API—with no need to memorize Acumatica’s exact field names or nesting.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builders</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `ContactBuilder` and `Attribute` classes from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>
            
            <section id="attribute-helper" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">The `Attribute` Helper Class</h2>
              <p class="text-body-1 mb-4">
                The `Attribute` class represents one element of a contact’s `Attributes` array. Use it when adding or updating custom fields on the Contact screen.
              </p>
              <CodeSnippet :code="attributeExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">ContactBuilder Methods</h2>

                <p class="text-body-1 mb-4">
                    The `ContactBuilder` provides a wide range of chainable methods to set all properties of a contact record. Below are examples grouped by functionality.
                </p>

                <v-card id="core-identity" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Core Identity Fields</v-card-title>
                    <v-card-text>
                        <CodeSnippet :code="coreIdentityExample" />
                    </v-card-text>
                </v-card>

                <v-card id="contact-details" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Contact Details</v-card-title>
                    <v-card-text>
                        <CodeSnippet :code="contactDetailsExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="classification" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Classification & Ownership</v-card-title>
                    <v-card-text>
                        <CodeSnippet :code="classificationExample" />
                    </v-card-text>
                </v-card>

                <v-card id="custom-attributes" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Adding Custom Attributes</v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use the `.add_attribute()` method to add custom attributes. The builder ensures that each attribute is unique by its ID.</p>
                        <CodeSnippet :code="customAttributesExample" />
                    </v-card-text>
                </v-card>
            

            </section>
            <section id="full-example" class="mb-8">
              <h2 class="text-h4 font-weight-medium mb-4">Complete Example</h2>
              <p class="text-body-1 mb-4">
                Here is a complete example of how to use the `ContactBuilder` to create a new contact with various properties and custom attributes.
              </p>
              <CodeSnippet :code="fullExample" />
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
  { id: 'importing-helpers', title: 'Importing Builders' },
  { id: 'attribute-helper', title: 'The Attribute Helper' },
  { id: 'methods', title: 'ContactBuilder Methods' },
  { id: 'core-identity', title: '  - Core Identity' },
  { id: 'contact-details', title: '  - Contact Details' },
  { id: 'classification', title: '  - Classification' },
  { id: 'custom-attributes', title: '  - Custom Attributes' },
  { id: 'full-example', title: 'Complete Example' },
]);

const importingExample = ref(`
from easy_acumatica.models import ContactBuilder, Attribute
`);

const attributeExample = ref(`
# Create a single attribute payload
attr = Attribute(
    attribute_id="INTEREST",
    value="Product Updates"
)

# .to_dict() generates the required JSON structure
# print(attr.to_dict())
`);

const coreIdentityExample = ref(`
builder = ContactBuilder()
builder.first_name("Jane").last_name("Doe").middle_name("A.")
`);

const contactDetailsExample = ref(`
builder.email("jane.doe@example.com")
       .phone1("+1 555-1234", phone_type="Business 1")
       .job_title("Sales Engineer")
`);

const classificationExample = ref(`
builder.business_account("ABAKERY")
       .contact_class("ENDCUST")
       .workgroup("Sales")
       .owner("jsmith")
`);

const customAttributesExample = ref(`
builder.add_attribute("INTEREST", "Webinars")
       .add_attribute("REGION", "EMEA")
`);

const fullExample = ref(`
contact_payload = (
    ContactBuilder()
    .first_name("Jane")
    .last_name("Doe")
    .email("jane.doe@example.com")
    .contact_class("ENDCUST")
    .business_account("ABAKERY")
    .add_attribute("INTEREST", "Product Updates")
)

# Get the final dictionary, ready for the API
json_body = contact_payload.build()

# Use with the ContactsService
# client.contacts.create_contact("24.200.001", draft=contact_payload)
`);
</script>