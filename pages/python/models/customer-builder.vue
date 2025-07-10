<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                CustomerBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `CustomerBuilder` is your primary tool for creating the JSON payload needed to create or update Customer records with the `CustomersService`. It provides a fluent, chainable interface for setting the fields of a customer record.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `CustomerBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>
                <p class="text-body-1 mb-4">
                  You can set fields using either the generic `.set()` method or one of the convenient shortcut methods.
                </p>

                <v-card id="shortcut-methods" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5">Shortcut Methods</v-card-title>
                    <v-card-text>
                        <p class="mb-4">For common fields, you can use one of the built-in shortcut methods for a cleaner syntax.</p>
                        <CodeSnippet :code="shortcutExample" />
                    </v-card-text>
                </v-card>

                <v-card id="set-method" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>set(field_name, value)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the general-purpose method for setting any field on the customer record.</p>
                        <CodeSnippet :code="setExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="to_body" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>to_body()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Once you have set all the required fields, call the `.to_body()` method to generate the final dictionary, which is formatted correctly and ready to be sent as the JSON body in your API request.</p>
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
  { id: 'importing-helpers', title: 'Importing Builder' },
  { id: 'methods', title: 'Builder Methods' },
  { id: 'shortcut-methods', title: '  - Shortcut Methods' },
  { id: 'set-method', title: '  - set()' },
  { id: 'to_body', title: '  - to_body()' },
]);

const importingExample = ref(`
from easy_acumatica.models import CustomerBuilder
`);

const shortcutExample = ref(`
customer_payload = (
    CustomerBuilder()
    .customer_id("CUST001")
    .customer_name("Global Tech Inc.")
    .customer_class("DEFAULT")
)
`);

const setExample = ref(`
customer_payload = CustomerBuilder()

# Use the .set() method for any field not covered by a shortcut
customer_payload.set("CreditLimit", 5000.0)
customer_payload.set("Status", "Active")
`);

const toBodyExample = ref(`
# Build the customer payload
customer_payload = (
    CustomerBuilder()
    .customer_id("CUST001")
    .customer_name("Global Tech Inc.")
    .set("Status", "Active")
)

# Get the final dictionary
json_body = customer_payload.to_body()

# Use with the CustomersService
# client.customers.create_customer("24.200.001", builder=customer_payload)
`);
</script>