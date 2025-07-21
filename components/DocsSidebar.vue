<!-- components/ModernDocsSidebar.vue -->
<template>
  <v-navigation-drawer
    v-model="model"
    :rail="rail"
    :width="320"
    class="modern-sidebar"
    @mouseenter="rail = false"
    @mouseleave="rail = true"
  >
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon 
            :icon="currentIcon" 
            size="32"
            :color="currentColor"
            class="mr-3"
          />
          <div>
            <h3 class="text-h6 font-weight-bold" v-if="!rail">{{ currentTitle }}</h3>
            <p class="text-caption text-grey-darken-1 mb-0" v-if="!rail">{{ currentSubtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <v-divider />

    <!-- Search Bar -->
    <div class="pa-3" v-if="!rail">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search docs..."
        variant="solo"
        flat
        hide-details
        density="compact"
        class="search-field"
      />
    </div>

    <!-- Navigation List -->
    <v-list 
      nav 
      class="py-0"
      :lines="false"
    >
      <template v-for="(section, i) in filteredNavigation" :key="i">
        
        <!-- Section Header -->
        <div 
          v-if="section.type === 'header'" 
          class="section-header"
          :class="{ 'mt-4': i > 0 }"
        >
          <v-icon 
            v-if="section.icon" 
            :icon="section.icon"
            size="20"
            class="mr-2"
            :color="section.color || 'primary'"
          />
          <span>{{ section.title }}</span>
        </div>

        <!-- Divider -->
        <v-divider 
          v-else-if="section.type === 'divider'" 
          class="my-2"
        />

        <!-- Navigation Group -->
        <v-list-group 
          v-else-if="section.type === 'group'"
          :value="isGroupActive(section)"
        >
          <template v-slot:activator="{ props, isOpen }">
            <v-list-item
              v-bind="props"
              :prepend-icon="rail ? section.icon : undefined"
              rounded="lg"
              class="group-item"
            >
              <template v-slot:prepend v-if="!rail">
                <v-icon :icon="section.icon" :color="section.color || 'grey-darken-1'" />
              </template>
              <v-list-item-title class="font-weight-medium">
                {{ section.title }}
              </v-list-item-title>
              <template v-slot:append>
                <v-icon 
                  :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  size="20"
                />
              </template>
            </v-list-item>
          </template>

          <!-- Group Items -->
          <v-list-item
            v-for="item in section.items"
            :key="item.title"
            :to="item.link"
            rounded="lg"
            class="nested-item"
            :class="{ 'active-item': isActiveRoute(item.link) }"
          >
            <v-list-item-title class="text-body-2">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- Single Navigation Item -->
        <v-list-item
          v-else-if="section.type === 'item'"
          :to="section.link"
          rounded="lg"
          class="nav-item"
          :class="{ 'active-item': isActiveRoute(section.link) }"
        >
          <template v-slot:prepend>
            <v-icon :icon="section.icon" :color="section.color || 'grey-darken-1'" />
          </template>
          <v-list-item-title class="font-weight-medium">
            {{ section.title }}
          </v-list-item-title>
          <template v-slot:append v-if="section.badge">
            <v-chip 
              size="x-small" 
              :color="section.badgeColor || 'primary'"
              variant="tonal"
            >
              {{ section.badge }}
            </v-chip>
          </template>
        </v-list-item>

      </template>
    </v-list>

    <!-- Version Info -->
    <template v-slot:append v-if="!rail">
      <v-divider />
      <div class="pa-4 text-center">
        <v-chip 
          size="small" 
          variant="outlined"
          :color="currentColor"
        >
          {{ currentVersion }}
        </v-chip>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const route = useRoute();
const search = ref('');
const rail = ref(true);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Determine current section based on route
const currentSection = computed(() => {
  if (route.path.startsWith('/python')) return 'python';
  if (route.path.startsWith('/npm')) return 'npm';
  return 'home';
});

const currentTitle = computed(() => {
  return currentSection.value === 'python' ? 'Python Docs' : 
         currentSection.value === 'npm' ? 'Node.js Docs' : 
         'Documentation';
});

const currentSubtitle = computed(() => {
  return currentSection.value === 'python' ? 'v0.4.0 - Dynamic Generation' : 
         currentSection.value === 'npm' ? 'TypeScript Ready' : 
         'Choose your platform';
});

const currentIcon = computed(() => {
  return currentSection.value === 'python' ? 'mdi-language-python' : 
         currentSection.value === 'npm' ? 'mdi-npm' : 
         'mdi-book-open-variant';
});

const currentColor = computed(() => {
  return currentSection.value === 'python' ? 'primary' : 
         currentSection.value === 'npm' ? 'success' : 
         'grey-darken-1';
});

const currentVersion = computed(() => {
  return currentSection.value === 'python' ? 'Python v0.4.0' : 
         currentSection.value === 'npm' ? 'NPM v1.0.0' : 
         'Easy-Acumatica';
});

// Navigation structure
const pythonNav = [
  { type: 'header', title: 'Getting Started', icon: 'mdi-rocket-launch', color: 'primary' },
  { type: 'item', title: 'Home', icon: 'mdi-home', link: '/python' },
  { type: 'item', title: 'Installation', icon: 'mdi-download', link: '/python/installation' },
  { type: 'item', title: 'Quickstart', icon: 'mdi-lightning-bolt', link: '/python/quickstart', badge: 'New' },
  { type: 'item', title: 'Migration Guide', icon: 'mdi-swap-horizontal', link: '/python/migration' },
  
  { type: 'divider' },
  { type: 'header', title: 'Core Concepts', icon: 'mdi-cube-outline', color: 'deep-purple' },
  { type: 'item', title: 'AcumaticaClient', icon: 'mdi-connection', link: '/python/client' },
  { type: 'item', title: 'Service Factory', icon: 'mdi-factory', link: '/python/service-factory' },
  { type: 'item', title: 'Model Factory', icon: 'mdi-shape-outline', link: '/python/model-factory' },
  
  { type: 'divider' },
  { type: 'header', title: 'Services', icon: 'mdi-api', color: 'indigo' },
  {
    type: 'group',
    title: 'Core Services',
    icon: 'mdi-layers-outline',
    color: 'indigo',
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
    color: 'green',
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
    icon: 'mdi-account-group',
    color: 'blue',
    items: [
      { title: 'Activities', link: '/python/sub-services/activities' },
      { title: 'Business Accounts', link: '/python/sub-services/business-accounts' },
      { title: 'Cases', link: '/python/sub-services/cases' },
      { title: 'Contacts', link: '/python/sub-services/contacts' },
      { title: 'Customers', link: '/python/sub-services/customers' },
      { title: 'Leads', link: '/python/sub-services/leads' },
    ]
  },
  {
    type: 'group',
    title: 'Inventory & Supply Chain',
    icon: 'mdi-package-variant',
    color: 'orange',
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
    color: 'brown',
    items: [
      { title: 'BOMs', link: '/python/sub-services/boms' },
      { title: 'Manufacturing', link: '/python/sub-services/manufacturing' },
      { title: 'Service Orders', link: '/python/sub-services/service-orders' },
      { title: 'Work Calendars', link: '/python/sub-services/work-calendars' },
      { title: 'Work Locations', link: '/python/sub-services/work-locations' },
    ]
  },
  {
    type: 'group',
    title: 'HR & Payroll',
    icon: 'mdi-account-tie',
    color: 'teal',
    items: [
      { title: 'Codes', link: '/python/sub-services/codes' },
      { title: 'Employees', link: '/python/sub-services/employees' },
      { title: 'Time Entries', link: '/python/sub-services/time-entries' },
    ]
  },
  
  { type: 'divider' },
  { type: 'header', title: 'Model Builders', icon: 'mdi-hammer-wrench', color: 'purple' },
  {
    type: 'group',
    title: 'Query & Generic',
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
      { title: 'BillBuilder', link: '/python/models/bill-builder' },
      { title: 'InvoiceBuilder', link: '/python/models/invoice-builder' },
      { title: 'PaymentBuilder', link: '/python/models/payment-builder' },
      { title: 'TaxCategoryBuilder', link: '/python/models/tax-category-builder' },
    ]
  },
  {
    type: 'group',
    title: 'CRM & Contact Builders',
    icon: 'mdi-account-box-multiple',
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
    icon: 'mdi-account-details',
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
      { title: 'BomBuilder', link: '/python/models/bom-builder' },
      { title: 'ConfigurationEntryBuilder', link: '/python/models/configuration-entry-builder' },
    ]
  },
];

const npmNav = [
  { type: 'header', title: 'Getting Started', icon: 'mdi-rocket-launch', color: 'success' },
  { type: 'item', title: 'Installation', icon: 'mdi-npm', link: '/npm/installation' },
  { type: 'item', title: 'Quickstart', icon: 'mdi-lightning-bolt', link: '/npm/quickstart' },
  { type: 'item', title: 'AcumaticaClient', icon: 'mdi-cog-outline', link: '/npm/client' },
  
  { type: 'divider' },
  { type: 'header', title: 'Services', icon: 'mdi-api', color: 'teal' },
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

// Get navigation based on current section
const navigation = computed(() => {
  return currentSection.value === 'python' ? pythonNav : 
         currentSection.value === 'npm' ? npmNav : 
         [];
});

// Filter navigation based on search
const filteredNavigation = computed(() => {
  if (!search.value) return navigation.value;
  
  const searchLower = search.value.toLowerCase();
  const filtered = [];
  
  navigation.value.forEach(section => {
    if (section.type === 'item') {
      if (section.title.toLowerCase().includes(searchLower)) {
        filtered.push(section);
      }
    } else if (section.type === 'group') {
      const filteredItems = section.items.filter(item => 
        item.title.toLowerCase().includes(searchLower)
      );
      if (filteredItems.length > 0) {
        filtered.push({
          ...section,
          items: filteredItems
        });
      }
    }
  });
  
  return filtered;
});

// Check if route is active
const isActiveRoute = (link) => {
  return route.path === link;
};

// Check if group contains active route
const isGroupActive = (group) => {
  return group.items?.some(item => isActiveRoute(item.link));
};

// Close drawer on route change for mobile
watch(() => route.path, () => {
  if (window.innerWidth < 960) {
    model.value = false;
  }
});
</script>

<style scoped>
.modern-sidebar {
  background: white;
  border-right: 1px solid rgba(0, 0, 0, 0.08) !important;
  min-width:70px;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.search-field {
  transition: all 0.3s ease;
}

.search-field:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-header {
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
  display: flex;
  align-items: center;
}

.nav-item {
  margin: 0.125rem 0.5rem;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(94, 53, 177, 0.04);
}

.group-item {
  margin: 0.125rem 0.5rem;
}

.nested-item {
  margin: 0.125rem 0.5rem 0.125rem 2.5rem;
  transition: all 0.2s ease;
}

.nested-item:hover {
  background: rgba(94, 53, 177, 0.04);
}

.active-item {
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.1) 0%, rgba(126, 87, 194, 0.1) 100%);
  color: #5e35b1;
}

.active-item:hover {
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.15) 0%, rgba(126, 87, 194, 0.15) 100%);
}

/* Rail mode adjustments */
.v-navigation-drawer--rail .section-header {
  display: none;
}

.v-navigation-drawer--rail .nested-item {
  margin-left: 0.5rem;
}

/* Custom scrollbar */
.v-navigation-drawer__content {
  scrollbar-width: thin;
  scrollbar-color: #5e35b1 #f0f0f0;
}

.v-navigation-drawer__content::-webkit-scrollbar {
  width: 6px;
}

.v-navigation-drawer__content::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background: #5e35b1;
  border-radius: 3px;
}

.v-navigation-drawer__content::-webkit-scrollbar-thumb:hover {
  background: #7e57c2;
}
.modern-sidebar.v-navigation-drawer--rail .nav-item.active-item,
.modern-sidebar.v-navigation-drawer--rail .group-item.v-list-item--active {
  width: 40px; /* Override Vuetify's default */
}

/* Ensure the icon prepend slot doesn't have extra margin */
.modern-sidebar.v-navigation-drawer--rail .v-list-item__prepend {
  margin-inline-end: 0;
}
</style>