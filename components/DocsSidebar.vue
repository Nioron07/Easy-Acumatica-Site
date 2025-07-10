<template>
  <v-navigation-drawer
    v-model="model"
    width="280"
    temporary
  >
    <v-list nav>
      <template v-for="(item, i) in navigation" :key="i">
        
        <v-list-subheader v-if="item.type === 'subheader'" class="font-weight-bold" :title="item.title"></v-list-subheader>

        <v-divider v-else-if="item.type === 'divider'" class="my-2"></v-divider>

        <v-list-group v-else-if="item.type === 'group'" :value="item.title">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
              rounded="lg"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :title="subItem.title"
            :to="subItem.link"
            rounded="lg"
          ></v-list-item>
        </v-list-group>

        <v-list-item
          v-else-if="item.type === 'item'"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.link"
          rounded="lg"
        ></v-list-item>

      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// defineModel allows the component to use v-model from its parent.
const model = defineModel();
const route = useRoute();

// --- Updated Navigation Data Structures with a 'type' property ---

const pythonNav = [
  { type: 'subheader', title: 'Python Docs' },
  { type: 'item', title: 'Home', icon: 'mdi-home', link: '/python' },
  { type: 'item', title: 'Installation', icon: 'mdi-language-python', link: '/python/installation' },
  { type: 'item', title: 'Quickstart', icon: 'mdi-rocket-launch-outline', link: '/python/quickstart' },
  { type: 'item', title: 'Client', icon: 'mdi-cog-outline', link: '/python/client' },
  { type: 'divider' },
  { 
    type: 'group',
    title: 'Sub-Services', 
    icon: 'mdi-view-grid-outline',
    items: [
      { title: 'Overview', link: '/python/sub-services' },
      { title: 'Accounts', link: '/python/sub-services/accounts' }, 
      { title: 'Actions', link: '/python/sub-services/actions' },
      { title: 'Activities', link: '/python/sub-services/activities' }, 
      { title: 'Cases', link: '/python/sub-services/cases' },
      { title: 'Codes', link: '/python/sub-services/codes' },
      { title: 'Companies', link: '/python/sub-services/companies' },
      { title: 'Contacts', link: '/python/sub-services/contacts' },
      { title: 'Customers', link: '/python/sub-services/customers' },
      { title: 'Employees', link: '/python/sub-services/employees' },
      { title: 'Files', link: '/python/sub-services/files' },
      { title: 'Inquiries', link: '/python/sub-services/inquiries' },
      { title: 'Inventory', link: '/python/sub-services/inventory' },
      { title: 'Invoices', link: '/python/sub-services/invoices' },
      { title: 'Leads', link: '/python/sub-services/leads' },
      { title: 'Ledgers', link: '/python/sub-services/ledgers' },
      { title: 'Manufacturing', link: '/python/sub-services/manufacturing' },
      { title: 'Payments', link: '/python/sub-services/payments' },
      { title: 'Purchase Orders', link: '/python/sub-services/purchase-orders' },
      { title: 'Records', link: '/python/sub-services/records' },
      { title: 'Sales Orders', link: '/python/sub-services/sales-orders' },
      { title: 'Service Orders', link: '/python/sub-services/service-orders' },
      { title: 'Shipments', link: '/python/sub-services/shipments' },
      { title: 'Stock Items', link: '/python/sub-services/stock-items' },
      { title: 'Transactions', link: '/python/sub-services/transactions' },
    ]
  },
  { 
    type: 'group',
    title: 'Model Builders', 
    icon: 'mdi-hammer-wrench',
    items: [
      { title: 'Overview', link: '/python/models' },
      { title: 'CaseBuilder', link: '/python/models/case-builder' },
      { title: 'CodeBuilder', link: '/python/models/code-builder' },
      { title: 'ConfigurationEntryBuilder', link: '/python/models/configuration-entry-builder' },
      { title: 'ContactBuilder', link: '/python/models/contact-builder' },
      { title: 'CustomerBuilder', link: '/python/models/customer-builder' },
      { title: 'EmployeeBuilder', link: '/python/models/employee-builder' },
      { title: 'Employee Payroll Builders', link: '/python/models/employee-payroll-builders' },
      { title: 'FilterBuilder', link: '/python/models/filter-builder' },
      { title: 'InquiryBuilder', link: '/python/models/inquiry-builder' },
      { title: 'InventoryIssueBuilder', link: '/python/models/inventory-issue-builder' },
      { title: 'InvoiceBuilder', link: '/python/models/invoice-builder' },
      { title: 'ItemWarehouseBuilder', link: '/python/models/item-warehouse-builder' },
      { title: 'LeadBuilder', link: '/python/models/lead-builder' },
      { title: 'PaymentBuilder', link: '/python/models/payment-builder' },
      { title: 'PurchaseOrderBuilder', link: '/python/models/purchase-order-builder' },
      { title: 'QueryOptions', link: '/python/models/query-options' },
      { title: 'RecordBuilder', link: '/python/models/record-builder' },
      { title: 'SalesOrderBuilder', link: '/python/models/sales-order-builder' },
      { title: 'ShipmentBuilder', link: '/python/models/shipment-builder' },
      { title: 'StockItemBuilder', link: '/python/models/stock-item-builder' },
    ]
  },
];

const npmNav = [
  { type: 'subheader', title: 'NPM Docs' },
  { type: 'item', title: 'Installation', icon: 'mdi-npm', link: '/npm/installation' },
  { type: 'item', title: 'Quickstart', icon: 'mdi-rocket-launch-outline', link: '/npm/quickstart' },
  { type: 'item', title: 'AcumaticaClient', icon: 'mdi-cog-outline', link: '/npm/client' },
  { type: 'divider' },
  { 
    type: 'group',
    title: 'Sub-Services', 
    icon: 'mdi-view-grid-outline',
    items: [
      { title: 'Customers', link: '/npm/sub-services/customers' },
      { title: 'Invoices', link: '/npm/sub-services/invoices' },
      { title: 'Payments', link: '/npm/sub-services/payments' },
    ]
  },
  { 
    type: 'group',
    title: 'Model Builders', 
    icon: 'mdi-hammer-wrench',
    items: [
      { title: 'CustomerBuilder', link: '/npm/models/customer-builder' },
      { title: 'InvoiceBuilder', link: '/npm/models/invoice-builder' },
      { title: 'PaymentBuilder', link: '/npm/models/payment-builder' },
    ]
  },
];

// Computed property to determine which navigation to show
const navigation = computed(() => {
  if (route.path.startsWith('/python')) {
    return pythonNav;
  }
  if (route.path.startsWith('/npm')) {
    return npmNav;
  }
  return []; // Return empty if on a non-docs page
});
</script>