<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Service Orders Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `ServiceOrdersService` is a sub-service designed to retrieve `ServiceOrder` records from Acumatica.
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
                To build queries for retrieving service orders, you will need to import `QueryOptions` and the `F` filter factory.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

                <v-card id="get_service_orders" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_service_orders(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method retrieves a list of service orders. You can use `QueryOptions` to filter the results, select specific fields, or expand related entities.</p>
                        <CodeSnippet :code="getServiceOrdersExample" />
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
  { id: 'methods', title: 'Service Method' },
  { id: 'get_service_orders', title: '  - get_service_orders' },
]);

const importingExample = ref(`
from easy_acumatica.models.query_builder import QueryOptions
from easy_acumatica.filters import F
`);

const getServiceOrdersExample = ref(`
# Create a filter for open service orders
opts = QueryOptions(
    filter=F.Status == 'Open',
    select='OrderNbr,CustomerID,Description',
    expand='Customer'
)

# Fetch the open service orders
open_service_orders = client.service_orders.get_service_orders(
    "24.200.001",
    options=opts
)
`);

//SEO
useSeoMeta({
  title: 'Service Orders Service | Acumatica Field Service API',
  description: 'A guide to retrieving Service Orders in Acumatica using the Easy-Acumatica ServiceOrdersService.',
  ogTitle: 'Acumatica Service Orders Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to retrieve Service Orders programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Service Orders API',
  twitterDescription: 'A guide to retrieving Service Orders with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Service Orders Service',
  description: 'Retrieve Service Orders using the Easy-Acumatica API wrapper.',
});

</script>