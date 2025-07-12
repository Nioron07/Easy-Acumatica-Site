<template>
  <v-navigation-drawer
    v-model="model"
    width="330"
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
  { type: 'item', title: 'Sub-Services Overview', icon: 'mdi-view-grid-outline', link: '/python/sub-services' },
  { type: 'item', title: 'Model Builders Overview', icon: 'mdi-hammer-wrench', link: '/python/models' },
  { type: 'divider' },
  { type: 'subheader', title: 'Services' },
  { 
    type: 'group',
    title: 'Core Services', 
    icon: 'mdi-layers-outline',
    items: [
      { title: 'Actions', link: '/python/sub-services/actions' },
      { title: 'Companies', link: '/python/sub-services/companies' },
      { title: 'Files', link: '/python/sub-services/files' },
      { title: 'Inquiries', link: '/python/sub-services/inquiries' },
      { title: 'Records', link: '/python/sub-services/records' },
    ]
  },
  { 
    type: 'group',
    title: 'Financial Services', 
    icon: 'mdi-finance',
    items: [
      { title: 'Accounts', link: '/python/sub-services/accounts' }, 
      { title: 'Bills', link: '/python/sub-services/bills' },
      { title: 'Invoices', link: '/python/sub-services/invoices' },
      { title: 'Ledgers', link: '/python/sub-services/ledgers' },
      { title: 'Payments', link: '/python/sub-services/payments' },
      { title: 'Tax Categories', link: '/python/sub-services/tax-categories' },
      { title: 'Transactions', link: '/python/sub-services/transactions' },
    ]
  },
  { 
    type: 'group',
    title: 'CRM Services', 
    icon: 'mdi-account-group-outline',
    items: [
      { title: 'Activities', link: '/python/sub-services/activities' }, 
      { title: 'Business Accounts', link: '/python/sub-services/business-accounts'},
      { title: 'Cases', link: '/python/sub-services/cases' },
      { title: 'Contacts', link: '/python/sub-services/contacts' },
      { title: 'Customers', link: '/python/sub-services/customers' },
      { title: 'Leads', link: '/python/sub-services/leads' },
    ]
  },
  { 
    type: 'group',
    title: 'Inventory & Distribution', 
    icon: 'mdi-package-variant-closed',
    items: [
      { title: 'Inventory', link: '/python/sub-services/inventory' },
      { title: 'Purchase Orders', link: '/python/sub-services/purchase-orders' },
      { title: 'Sales Orders', link: '/python/sub-services/sales-orders' },
      { title: 'Shipments', link: '/python/sub-services/shipments' },
      { title: 'Stock Items', link: '/python/sub-services/stock-items' },
    ]
  },
    { 
    type: 'group',
    title: 'Manufacturing & Field Service', 
    icon: 'mdi-factory',
    items: [
      { title: 'BOMs', link: '/python/sub-services/boms'},
      { title: 'Manufacturing', link: '/python/sub-services/manufacturing' },
      { title: 'Service Orders', link: '/python/sub-services/service-orders' },
      { title: 'Work Calendars', link: '/python/sub-services/work-calendars' },
      { title: 'Work Locations', link: '/python/sub-services/work-locations' },
    ]
  },
  { 
    type: 'group',
    title: 'HR & Payroll', 
    icon: 'mdi-account-tie-outline',
    items: [
      { title: 'Codes', link: '/python/sub-services/codes' },
      { title: 'Employees', link: '/python/sub-services/employees' },
      { title: 'Time Entries', link: '/python/sub-services/time-entries' },
    ]
  },
  { type: 'divider' },
  { type: 'subheader', title: 'Builders' },
  { 
    type: 'group',
    title: 'Query & Generic Builders', 
    icon: 'mdi-filter-variant',
    items: [
      { title: 'FilterBuilder', link: '/python/models/filter-builder' },
      { title: 'InquiryBuilder', link: '/python/models/inquiry-builder' },
      { title: 'QueryOptions', link: '/python/models/query-options' },
      { title: 'RecordBuilder', link: '/python/models/record-builder' },
    ]
  },
    { 
    type: 'group',
    title: 'Financial Builders', 
    icon: 'mdi-cash-multiple',
    items: [
      { title: 'BillBuilder',  link: '/python/models/bill-builder'},
      { title: 'InvoiceBuilder', link: '/python/models/invoice-builder' },
      { title: 'PaymentBuilder', link: '/python/models/payment-builder' },
      { title: 'TaxCategoryBuilder', link: '/python/models/tax-category-builder' },
    ]
  },
  { 
    type: 'group',
    title: 'CRM & Contact Builders', 
    icon: 'mdi-account-box-multiple-outline',
    items: [
      { title: 'CaseBuilder', link: '/python/models/case-builder' },
      { title: 'ContactBuilder', link: '/python/models/contact-builder' },
      { title: 'CustomerBuilder', link: '/python/models/customer-builder' },
      { title: 'LeadBuilder', link: '/python/models/lead-builder' },
    ]
  },
  { 
    type: 'group',
    title: 'Inventory & Sales Builders', 
    icon: 'mdi-dolly',
    items: [
      { title: 'InventoryIssueBuilder', link: '/python/models/inventory-issue-builder' },
      { title: 'ItemWarehouseBuilder', link: '/python/models/item-warehouse-builder' },
      { title: 'PurchaseOrderBuilder', link: '/python/models/purchase-order-builder' },
      { title: 'SalesOrderBuilder', link: '/python/models/sales-order-builder' },
      { title: 'ShipmentBuilder', link: '/python/models/shipment-builder' },
      { title: 'StockItemBuilder', link: '/python/models/stock-item-builder' },
    ]
  },
  { 
    type: 'group',
    title: 'HR & Payroll Builders', 
    icon: 'mdi-account-details-outline',
    items: [
      { title: 'Code Builders', link: '/python/models/code-builder' },
      { title: 'Employee Builders', link: '/python/models/employee-payroll-builders' },
      { title: 'TimeEntryBuilder', link: '/python/models/time-entry-builder' },
      { title: 'WorkCalendarBuilder', link: '/python/models/work-calendar-builder' },
      { title: 'WorkLocationBuilder', link: '/python/models/work-location-builder' },
    ]
  },
  { 
    type: 'group',
    title: 'Manufacturing Builders', 
    icon: 'mdi-wall',
    items: [
      { title: 'BomBuilder', link: '/python/models/bom-builder'},
      { title: 'ConfigurationEntryBuilder', link: '/python/models/configuration-entry-builder' },
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