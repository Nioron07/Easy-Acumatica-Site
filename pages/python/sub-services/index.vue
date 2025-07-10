<template>
  <div>
    <v-container>
      <v-row class="mt-4 mb-8">
        <v-col>
          <h1 class="text-h3 text-primary font-weight-bold">
            Sub-Services
          </h1>
          <p class="mt-4 text-body-1" style="max-width: 800px;">
            Sub-services are the primary way to interact with specific Acumatica API endpoints. They are accessed as properties on an initialized `AcumaticaClient` instance (e.g., `client.customers`). Each service provides a set of methods tailored to a specific entity, simplifying tasks like creating records, fetching data, and executing actions.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="service in services"
          :key="service.title"
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
            :to="service.link"
          >
            <v-card-item>
              <v-card-title class="d-flex align-center text-h6">
                <v-icon :icon="service.icon" class="mr-3 text-primary" />
                {{ service.title }}
              </v-card-title>
            </v-card-item>
            <v-card-text class="flex-grow-1">{{ service.description }}</v-card-text>
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

const services = ref([
  { title: 'Accounts', icon: 'mdi-bank-outline', description: 'Manage GL Accounts and Account Groups.', link: '/python/sub-services/accounts' },
  { title: 'Actions', icon: 'mdi-play-box-outline', description: 'Execute standard and custom business logic actions on records.', link: '/python/sub-services/actions' },
  { title: 'Activities', icon: 'mdi-note-text-outline', description: 'Create and link activities like notes and tasks to other records.', link: '/python/sub-services/activities' },
  { title: 'Cases', icon: 'mdi-face-agent', description: 'Create and manage support case records.', link: '/python/sub-services/cases' },
  { title: 'Codes', icon: 'mdi-pound-box-outline', description: 'Create various payroll-related code entities.', link: '/python/sub-services/codes' },
  { title: 'Companies', icon: 'mdi-domain', description: 'Retrieve your organization\'s company and branch structure.', link: '/python/sub-services/companies' },
  { title: 'Contacts', icon: 'mdi-card-account-details-outline', description: 'Manage contact records with full CRUD and linking capabilities.', link: '/python/sub-services/contacts' },
  { title: 'Customers', icon: 'mdi-account-group-outline', description: 'Create, retrieve, and update customer records.', link: '/python/sub-services/customers' },
  { title: 'Employees', icon: 'mdi-account-tie-outline', description: 'Manage employee records and their associated payroll settings.', link: '/python/sub-services/employees' },
  { title: 'Files', icon: 'mdi-paperclip', description: 'Handle uploading, downloading, and managing file attachments.', link: '/python/sub-services/files' },
  { title: 'Inquiries', icon: 'mdi-database-search-outline', description: 'Run contract-based and OData Generic Inquiries.', link: '/python/sub-services/inquiries' },
  { title: 'Inventory', icon: 'mdi-package-variant-closed', description: 'Manage inventory transactions, inquiries, and warehouse settings.', link: '/python/sub-services/inventory' },
  { title: 'Invoices', icon: 'mdi-receipt', description: 'Manage the full lifecycle of AR Invoices.', link: '/python/sub-services/invoices' },
  { title: 'Leads', icon: 'mdi-account-star-outline', description: 'A specialized service for creating new lead records.', link: '/python/sub-services/leads' },
  { title: 'Ledgers', icon: 'mdi-book-open-page-variant-outline', description: 'Retrieve a list of General Ledger records.', link: '/python/sub-services/ledgers' },
  { title: 'Manufacturing', icon: 'mdi-factory', description: 'Interact with manufacturing-specific entities like product configurations.', link: '/python/sub-services/manufacturing' },
  { title: 'Payments', icon: 'mdi-credit-card-outline', description: 'Create, retrieve, and manage customer payments.', link: '/python/sub-services/payments' },
  { title: 'Purchase Orders', icon: 'mdi-cart-arrow-down', description: 'Create and manage Purchase Order records.', link: '/python/sub-services/purchase-orders' },
  { title: 'Records', icon: 'mdi-file-document-multiple-outline', description: 'A powerful, generic wrapper for CRUD operations on any entity.', link: '/python/sub-services/records' },
  { title: 'Sales Orders', icon: 'mdi-clipboard-text-outline', description: 'Manage the full lifecycle of Sales Orders.', link: '/python/sub-services/sales-orders' },
  { title: 'Service Orders', icon: 'mdi-wrench', description: 'Retrieve Service Order records.', link: '/python/sub-services/service-orders' },
  { title: 'Shipments', icon: 'mdi-truck-delivery-outline', description: 'Manage the full shipment lifecycle, from creation to confirmation.', link: '/python/sub-services/shipments' },
  { title: 'Stock Items', icon: 'mdi-cube-outline', description: 'Manage stock item records and their file attachments.', link: '/python/sub-services/stock-items' },
  { title: 'Transactions', icon: 'mdi-finance', description: 'Retrieve financial transaction data from the General Ledger.', link: '/python/sub-services/transactions' },
]);
</script>