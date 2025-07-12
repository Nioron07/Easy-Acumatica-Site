<template>
  <div>
    <v-container>
      <v-row class="mt-4 mb-8">
        <v-col>
          <h1 class="text-h3 text-primary font-weight-bold">
            Quickstart
          </h1>
          <p class="mt-4 text-body-1" style="max-width: 800px;">
            Follow this guide to understand the fundamental workflow of `easy-acumatica`. Each step introduces a core concept, from initializing the client to filtering data.
          </p>
        </v-col>
      </v-row>

      <v-card class="mb-12" variant="outlined" elevation="6">
        <v-card-item class="bg-blue-lighten-5">
          <v-card-title class="d-flex align-center text-h5 text-primary">
            <v-icon icon="mdi-power-plug-outline" class="mr-3" />
            1. Initialize the Client
          </v-card-title>
        </v-card-item>
        <v-card-text class="pa-5">
          <p class="text-body-1 mb-4">
            Everything starts with the <strong>`AcumaticaClient`</strong>. This object is the main entry point to the API, and it handles all the complex session management (login, cookies, logout) for you. You only need to create one instance for your application.
          </p>
          <CodeSnippet 
            language="python"
            :code="clientInitializationCode"
          />
        </v-card-text>
      </v-card>

      <v-card class="mb-12" variant="outlined" elevation="6">
         <v-card-item class="bg-blue-lighten-5">
          <v-card-title class="d-flex align-center text-h5 text-primary">
            <v-icon icon="mdi-sitemap" class="mr-3" />
            2. Use a Sub-Service
          </v-card-title>
        </v-card-item>
        <v-card-text class="pa-5">
          <p class="text-body-1 mb-4">
            The client provides access to modular <strong>sub-services</strong> that are organized by Acumatica entities. These services are attached directly to the client instance. For example, to interact with customers, you call methods on <strong>`client.customers`</strong>. To work with invoices, you'd use <strong>`client.invoices`</strong>.
          </p>
          <CodeSnippet 
            language="python"
            :code="subServiceCode"
          />
        </v-card-text>
      </v-card>
      
      <v-card class="mb-12" variant="outlined" elevation="6">
         <v-card-item class="bg-blue-lighten-5">
          <v-card-title class="d-flex align-center text-h5 text-primary">
            <v-icon icon="mdi-hammer-wrench" class="mr-3" />
            3. Use a Builder
          </v-card-title>
        </v-card-item>
        <v-card-text class="pa-5">
          <p class="text-body-1 mb-4">
            To create or update records, you use <strong>fluent builders</strong>. These helper classes allow you to construct complex JSON payloads in a clean, readable way by chaining methods. Builders for specific entities are found in the <strong>`easy_acumatica.models`</strong> module.
          </p>
          <CodeSnippet 
            language="python"
            :code="builderCode"
          />
        </v-card-text>
      </v-card>

      <v-card class="mb-12" variant="outlined" elevation="6">
         <v-card-item class="bg-blue-lighten-5">
          <v-card-title class="d-flex align-center text-h5 text-primary">
            <v-icon icon="mdi-filter-variant" class="mr-3" />
            4. Filter with QueryOptions
          </v-card-title>
        </v-card-item>
        <v-card-text class="pa-5">
          <p class="text-body-1 mb-4">
            When fetching data, you can refine your results using the <strong>`QueryOptions`</strong> class and the <strong>`F`</strong> filter factory object, both also available in <strong>`easy_acumatica.models`</strong>. This provides a typed, Pythonic way to create complex OData queries for filtering, selecting specific fields, and more.
          </p>
          <CodeSnippet 
            language="python"
            :code="filteringCode"
          />
        </v-card-text>
      </v-card>

    </v-container>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';

// --- SEO & OG Image Configuration ---
useSeoMeta({
  title: 'Easy-Acumatica Quickstart Guide | Python REST API',
  description: 'Follow this quickstart guide to learn the fundamental workflow of the easy-acumatica Python package, from client initialization to filtering data with QueryOptions.',
  ogTitle: 'Easy-Acumatica Python Quickstart Guide',
  ogDescription: 'Learn the fundamental workflow of the easy-acumatica Python package, from client initialization to filtering data with QueryOptions.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Easy-Acumatica Python Quickstart',
  twitterDescription: 'A step-by-step guide to get started with the Easy-Acumatica Python package for the Acumatica REST API.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});


// --- Page Content Data ---

const clientInitializationCode = ref(`
from easy_acumatica import AcumaticaClient

# The client handles login automatically
client = AcumaticaClient(
    base_url="https://your-instance.acumatica.com",
    username="your_username",
    password="your_password",
    tenant="YourTenant",
    branch="YourBranch"
)
`);

const subServiceCode = ref(`
# Get a list of all customers using the 'customers' sub-service
all_customers = client.customers.get_customers(api_version="24.200.001")
`);

const builderCode = ref(`
from easy_acumatica.models.customer_builder import CustomerBuilder

# Create a builder instance for a new customer
customer_builder = (
    CustomerBuilder()
    .customer_id("NEWCUST01")
    .customer_name("New Awesome Customer")
    .customer_class("DEFAULT")
)

# This builder object is now ready to be passed to a create method
# e.g., client.customers.create_customer("24.200.001", customer_builder)
`);

const filteringCode = ref(`
from easy_acumatica.models.filter_builder import F
from easy_acumatica.models.query_builder import QueryOptions

# Define query options to get the top 5 active customers,
# selecting only their ID and name.
options = QueryOptions(
    filter=F.Status == 'Active',
    select=['CustomerID', 'CustomerName'],
    top=5
)

# Pass the options to the get_customers method
active_customers = client.customers.get_customers(
    api_version="24.200.001",
    options=options
)

for customer in active_customers:
    print(customer['CustomerName']['value'])
`);
</script>