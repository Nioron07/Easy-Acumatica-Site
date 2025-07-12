<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Sales Orders Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `SalesOrdersService` is your primary tool for interacting with `SalesOrder` records. It provides methods for managing the entire sales order lifecycle, from creation and updates to executing actions like applying discounts and creating shipments.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create and query sales orders, you'll need the `SalesOrderBuilder`, `QueryOptions`, and `F` filter factory.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">CRUD Methods</h2>

                <v-card id="get_sales_orders" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_sales_orders(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves a list of sales orders. Use `QueryOptions` to filter, select, and expand the results to get the exact data you need.</p>
                        <CodeSnippet :code="getSalesOrdersExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_sales_order" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_sales_order(api_version, builder, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new sales order using a `SalesOrderBuilder` instance to define the order's properties and line items.</p>
                        <CodeSnippet :code="createSalesOrderExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="update_sales_order" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_sales_order(api_version, builder, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Updates an existing sales order. You must include the `OrderType` and `OrderNbr` in the builder to identify which record to modify.</p>
                        <CodeSnippet :code="updateSalesOrderExample" />
                    </v-card-text>
                </v-card>
            </section>
            
            <section id="actions" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Executing Actions</h2>
                <p class="text-body-1 mb-4">
                  The service also provides helpers to execute common business logic actions on sales orders, which are wrappers around the `ActionsService`.
                </p>

                <v-card id="apply_discounts" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>apply_discounts(api_version, order_type, order_nbr)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Triggers the `AutoRecalculateDiscounts` action for a specific sales order.</p>
                        <CodeSnippet :code="applyDiscountsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_shipment" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_shipment(api_version, order_id, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Executes the `SalesOrderCreateShipment` action. Note that this requires the `id` (GUID) of the sales order, not the human-readable `OrderNbr`.</p>
                        <CodeSnippet :code="createShipmentExample" />
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
  { id: 'methods', title: 'CRUD Methods' },
  { id: 'get_sales_orders', title: '  - get_sales_orders' },
  { id: 'create_sales_order', title: '  - create_sales_order' },
  { id: 'update_sales_order', title: '  - update_sales_order' },
  { id: 'actions', title: 'Executing Actions' },
  { id: 'apply_discounts', title: '  - apply_discounts' },
  { id: 'create_shipment', title: '  - create_shipment' },
]);

const importingExample = ref(`
from easy_acumatica.models.sales_order_builder import SalesOrderBuilder
from easy_acumatica.models.query_builder import QueryOptions
from easy_acumatica.models.filter_builder import F
`);

const getSalesOrdersExample = ref(`
# Create a filter for open orders
opts = QueryOptions(
    filter=F.Status == "Open",
    select="OrderType,OrderNbr,CustomerID,OrderTotal",
    expand="Customer"
)

# Fetch the sales orders
open_orders = client.sales_orders.get_sales_orders("24.200.001", options=opts)
`);

const createSalesOrderExample = ref(`
# Build the sales order payload
order_payload = (
    SalesOrderBuilder()
    .order_type("SO")
    .customer_id("ABCCORP")
    .description("New order for project supplies")
    .add_detail(inventory_id="ITEM01", OrderQty=5, UnitPrice=100.0)
)

# Create the sales order
new_order = client.sales_orders.create_sales_order(
    "24.200.001", 
    builder=order_payload
)
`);

const updateSalesOrderExample = ref(`
# Build the update payload to add a new line item
update_payload = (
    SalesOrderBuilder()
    .order_type("SO")
    .order_nbr("SO005555") # The order to update
    .add_detail(inventory_id="ITEM02", OrderQty=2) # The new line
)

# Update the sales order
updated_order = client.sales_orders.update_sales_order(
    "24.200.001", 
    builder=update_payload
)
`);

const applyDiscountsExample = ref(`
client.sales_orders.apply_discounts(
    "24.200.001",
    order_type="SO",
    order_nbr="SO005555"
)
`);

const createShipmentExample = ref(`
# Assume 'new_order' is the response from a create_sales_order call
order_guid = new_order['id']['value']
shipment_date = "2023-10-27T00:00:00"
warehouse_id = "MAIN"

client.sales_orders.create_shipment(
    "24.200.001",
    order_id=order_guid,
    shipment_date=shipment_date,
    warehouse_id=warehouse_id
)
`);

//SEO
useSeoMeta({
  title: 'Sales Orders Service | Acumatica Sales API',
  description: 'A guide to managing Sales Orders in Acumatica using the Easy-Acumatica SalesOrdersService.',
  ogTitle: 'Acumatica Sales Orders Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to create, update, and manage Sales Orders programmatically with the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Sales Orders API',
  twitterDescription: 'A guide to managing Sales Orders with Easy-Acumatica.',
  twitterImage: '/public/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Sales Orders Service',
  description: 'Create, update, and manage Sales Orders using the Easy-Acumatica API wrapper.',
});

</script>