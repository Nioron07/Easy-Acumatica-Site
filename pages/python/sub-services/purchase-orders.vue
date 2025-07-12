<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Purchase Orders Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `PurchaseOrdersService` provides a dedicated method for creating Purchase Order records in Acumatica.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create a purchase order, you will need to import the `PurchaseOrderBuilder` and, optionally, `QueryOptions`.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

                <v-card id="create_purchase_order" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_purchase_order(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method creates a new Purchase Order. You must provide a `PurchaseOrderBuilder` object containing the purchase order details. You can use the builder to set top-level fields like the `VendorID` and add detail lines for each item being purchased.</p>
                        <CodeSnippet :code="createPurchaseOrderExample" />
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
  { id: 'create_purchase_order', title: '  - create_purchase_order' },
]);

const importingExample = ref(`
from easy_acumatica.models.purchase_order_builder import PurchaseOrderBuilder
from easy_acumatica.models.query_builder import QueryOptions
`);

const createPurchaseOrderExample = ref(`
# 1. Build the purchase order payload
po_payload = (
    PurchaseOrderBuilder()
    .vendor_id("GOODFRUITS")
    .location("MAIN")
    .add_detail(
        BranchID="HEADOFFICE",
        InventoryID="APPLES",
        OrderQty=100,
        UOM="LB"
    )
    .hold(False)
)

# 2. Use the service to create the purchase order
new_po = client.purchase_orders.create_purchase_order(
    "24.200.001", 
    builder=po_payload
)
`);

//SEO
useSeoMeta({
  title: 'Purchase Orders Service | Acumatica Procurement API',
  description: 'A guide to creating Purchase Orders in Acumatica using the Easy-Acumatica PurchaseOrdersService.',
  ogTitle: 'Acumatica Purchase Orders Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to create Purchase Orders programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Purchase Orders API',
  twitterDescription: 'A guide to creating Purchase Orders with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Purchase Orders Service',
  description: 'Create Purchase Orders using the Easy-Acumatica API wrapper.',
});

</script>