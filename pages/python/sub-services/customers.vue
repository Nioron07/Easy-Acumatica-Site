<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Customers Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `CustomersService` is your primary tool for interacting with Customer records through the contract-based API. It provides methods to create, retrieve, and update customer data, as well as several specialized helpers for common tasks.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                Before using the service, you should import the necessary builders and query helpers from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="core-methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Core Methods</h2>

                <v-card id="get_customers" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_customers(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the main method for fetching a list of customer records. It can be used to get all customers or a filtered, specific list by using `QueryOptions`.</p>
                        <CodeSnippet :code="getCustomersExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_customer" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_customer(api_version, builder)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use this method to create a new customer record. You must provide a `CustomerBuilder` object containing the new customer's details.</p>
                        <CodeSnippet :code="createCustomerExample" />
                    </v-card-text>
                </v-card>

                <v-card id="update_customer" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_customer(api_version, builder, options)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use this method to update one or more existing customers. You <strong>must</strong> provide a filter in the `options` object to specify which customer(s) to update.</p>
                        <CodeSnippet :code="updateCustomerExample" />
                    </v-card-text>
                </v-card>
            </section>

            <section id="specialized-helpers" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Specialized Helpers</h2>

                <v-card id="assign_tax_zone" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>assign_tax_zone(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">A shortcut method to assign a specific tax zone to a customer.</p>
                        <CodeSnippet :code="assignTaxZoneExample" />
                    </v-card-text>
                </v-card>

                <v-card id="get_shipping_contact" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_shipping_contact(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">A convenient helper to retrieve just the `ShippingContact` object for a single customer. It returns the contact dictionary or `None` if not found.</p>
                        <CodeSnippet :code="getShippingContactExample" />
                    </v-card-text>
                </v-card>

                <v-card id="update_customer_currency_overriding" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_customer_currency_overriding(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Enables or disables the ability to override currency and exchange rates for a specific customer.</p>
                        <CodeSnippet :code="updateCurrencyExample" />
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
  { id: 'core-methods', title: 'Core Methods' },
  { id: 'get_customers', title: '  - get_customers' },
  { id: 'create_customer', title: '  - create_customer' },
  { id: 'update_customer', title: '  - update_customer' },
  { id: 'specialized-helpers', title: 'Specialized Helpers' },
  { id: 'assign_tax_zone', title: '  - assign_tax_zone' },
  { id: 'get_shipping_contact', title: '  - get_shipping_contact' },
  { id: 'update_customer_currency_overriding', title: '  - currency_overriding' },
]);

const importingExample = ref(`
from easy_acumatica.models.filter_builder import F  
from easy_acumatica.models.query_builder import QueryOptions, CustomField  
from easy_acumatica.models.customer_builder import CustomerBuilder
`);

const getCustomersExample = ref(`
# Create a filter for active customers
my_filter = (F.Status == 'Active')

# Use QueryOptions to select specific fields and expand related data
opts = QueryOptions(
    filter=my_filter,
    select=["CustomerID", "CustomerName", "BillingContact/Email"],
    expand=["BillingContact"]
)

# Fetch the customers
active_customers = client.customers.get_customers("24.200.001", options=opts)
`);

const createCustomerExample = ref(`
# Build the customer payload
customer_payload = (
    CustomerBuilder()
    .customer_id("NEWCUST01")
    .customer_name("New Innovations Inc.")
    .customer_class("DEFAULT")
)

# Create the customer
new_customer = client.customers.create_customer("24.200.001", customer_payload)
`);

const updateCustomerExample = ref(`
# Define a filter to find the customer to update
update_filter = F.MainContact.Email == 'test@newinnovations.com'
opts = QueryOptions(filter=update_filter)

# Define the fields to update
update_payload = CustomerBuilder().set("CustomerClass", "INTL")

# Perform the update
updated_customer = client.customers.update_customer(
    "24.200.001", 
    update_payload, 
    options=opts
)
`);

const assignTaxZoneExample = ref(`
client.customers.assign_tax_zone(
    "24.200.001",
    customer_id="NEWCUST01",
    tax_zone="AVATAX"
)
`);

const getShippingContactExample = ref(`
shipping_info = client.customers.get_shipping_contact(
    "24.200.001",
    customer_id="NEWCUST01"
)

if shipping_info:
    print(shipping_info.get('Email', {}).get('value'))
`);

const updateCurrencyExample = ref(`
# Enable currency overriding for a customer
client.customers.update_customer_currency_overriding(
    "24.200.001",
    customer_id="NEWCUST01",
    enable=True,
    currency_rate_type="SPOT"  # Optional, defaults to 'SPOT'
)
`);

//SEO
useSeoMeta({
  title: 'Customers Service | Acumatica CRM API',
  description: 'A guide to creating, retrieving, and updating customers in Acumatica using the Easy-Acumatica CustomersService.',
  ogTitle: 'Acumatica Customers Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage customers programmatically with the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Customers API',
  twitterDescription: 'A guide to creating, retrieving, and updating customers with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Customers Service',
  description: 'Create, retrieve, and update customers using the Easy-Acumatica API wrapper.',
});

</script>