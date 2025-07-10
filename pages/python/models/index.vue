<template>
  <div>
    <v-container>
      <v-row class="mt-4 mb-8">
        <v-col>
          <h1 class="text-h3 text-primary font-weight-bold">
            Model Builders
          </h1>
          <p class="mt-4 text-body-1" style="max-width: 800px;">
            Model Builders are fluent, chainable helper classes designed to simplify the creation of complex JSON payloads for Acumatica API requests. They handle the required `{"value": ...}` formatting automatically and provide convenient, type-hinted methods for setting fields.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="builder in builders"
          :key="builder.title"
          cols="12"
          md="6"
          lg="4"
          class="d-flex"
        >
          <v-card
            class="d-flex flex-column flex-grow-1"
            hover
            variant="outlined"
            elevation="4"
            :to="builder.link"
          >
            <v-card-item>
              <v-card-title class="d-flex align-center text-h6">
                <v-icon :icon="builder.icon" class="mr-3 text-primary" />
                {{ builder.title }}
              </v-card-title>
            </v-card-item>
            <v-card-text class="flex-grow-1">{{ builder.description }}</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" variant="text">
                    Read More
                    <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';

const builders = ref([
  { title: 'CaseBuilder', icon: 'mdi-face-agent', description: 'Constructs payloads for creating and updating Case records.', link: '/python/models/case-builder' },
  { title: 'Code Builders', icon: 'mdi-pound-box-outline', description: 'Build payloads for payroll-related code entities.', link: '/python/models/code-builder' },
  { title: 'ConfigurationEntryBuilder', icon: 'mdi-cogs', description: 'Builds payloads for product configurations in manufacturing.', link: '/python/models/configuration-entry-builder' },
  { title: 'ContactBuilder', icon: 'mdi-card-account-details-outline', description: 'Constructs payloads for creating and updating Contact records.', link: '/python/models/contact-builder' },
  { title: 'CustomerBuilder', icon: 'mdi-account-group-outline', description: 'Constructs payloads for creating and updating Customer records.', link: '/python/models/customer-builder' },
  { title: 'EmployeeBuilder', icon: 'mdi-account-tie-outline', description: 'Builds payloads with nested objects for creating Employee records.', link: '/python/models/employee-builder' },
  { title: 'Employee Payroll Builders', icon: 'mdi-cash-register', description: 'Constructs payloads for employee payroll classes and settings.', link: '/python/models/employee-payroll-builders' },
  { title: 'FilterBuilder', icon: 'mdi-filter-variant', description: 'A Pythonic DSL for creating complex OData filter queries.', link: '/python/models/filter-builder' },
  { title: 'InquiryBuilder', icon: 'mdi-comment-question-outline', description: 'Builds requests for contract-based inquiry forms.', link: '/python/models/inquiry-builder' },
  { title: 'InventoryIssueBuilder', icon: 'mdi-package-variant', description: 'Constructs payloads for creating Inventory Issue records.', link: '/python/models/inventory-issue-builder' },
  { title: 'InvoiceBuilder', icon: 'mdi-receipt', description: 'Constructs payloads for creating and updating AR Invoice records.', link: '/python/models/invoice-builder' },
  { title: 'ItemWarehouseBuilder', icon: 'mdi-warehouse', description: 'Constructs payloads for updating warehouse-specific item settings.', link: '/python/models/item-warehouse-builder' },
  { title: 'LeadBuilder', icon: 'mdi-account-star-outline', description: 'A simple tool for creating new Lead records.', link: '/python/models/lead-builder' },
  { title: 'PaymentBuilder', icon: 'mdi-credit-card-outline', description: 'Constructs payloads for creating and managing AR Payments.', link: '/python/models/payment-builder' },
  { title: 'PurchaseOrderBuilder', icon: 'mdi-cart-arrow-down', description: 'Constructs payloads for creating Purchase Order records.', link: '/python/models/purchase-order-builder' },
  { title: 'QueryOptions', icon: 'mdi-help-box', description: 'A container class for building complex OData queries.', link: '/python/models/query-options' },
  { title: 'RecordBuilder', icon: 'mdi-file-document-multiple-outline', description: 'A generic, fluent builder for any Acumatica entity.', link: '/python/models/record-builder' },
  { title: 'SalesOrderBuilder', icon: 'mdi-clipboard-text-outline', description: 'Constructs payloads for creating and updating Sales Orders.', link: '/python/models/sales-order-builder' },
  { title: 'ShipmentBuilder', icon: 'mdi-truck-delivery-outline', description: 'Constructs payloads for creating and updating Shipment records.', link: '/python/models/shipment-builder' },
  { title: 'StockItemBuilder', icon: 'mdi-cube-outline', description: 'Constructs payloads for creating and updating Stock Item records.', link: '/python/models/stock-item-builder' },

  
  // Add other builders here as their pages are created
]);
</script>