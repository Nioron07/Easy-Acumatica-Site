<!-- components/DocsSidebar.vue -->
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
                  size="small"
                />
              </template>
            </v-list-item>
          </template>

          <!-- Group Items -->
          <v-list-item
            v-for="item in section.items"
            :key="item.link"
            :to="item.link"
            rounded="lg"
            class="nested-item"
            :class="{ 'active-item': isActiveRoute(item.link) }"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- Single Navigation Item -->
        <v-list-item
          v-else-if="section.type === 'item'"
          :to="section.link"
          :prepend-icon="section.icon"
          rounded="lg"
          class="nav-item"
          :class="{ 'active-item': isActiveRoute(section.link) }"
        >
          <v-list-item-title class="font-weight-medium">
            {{ section.title }}
          </v-list-item-title>
          <template v-slot:append v-if="section.badge">
            <v-chip size="x-small" :color="section.badgeColor || 'primary'">
              {{ section.badge }}
            </v-chip>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

// Props
const props = defineProps({
  modelValue: Boolean,
  section: {
    type: String,
    default: 'python'
  }
});

// Emits
const emit = defineEmits(['update:modelValue']);

// Route
const route = useRoute();

// Model for drawer
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// State
const search = ref('');
const rail = ref(true);

// Current section based on route
const currentSection = computed(() => {
  const path = route.path;
  if (path.startsWith('/python')) return 'python';
  if (path.startsWith('/npm')) return 'npm';
  return 'home';
});

// Dynamic title based on current section
const currentTitle = computed(() => {
  return currentSection.value === 'python' ? 'Python Docs' : 
         currentSection.value === 'npm' ? 'Node.js Docs' : 
         'Documentation';
});

const currentSubtitle = computed(() => {
  return currentSection.value === 'python' ? 'v0.4.8 - Dynamic Generation' : 
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
  return currentSection.value === 'python' ? 'Python v0.4.8' : 
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
  { type: 'item', title: 'Examples', icon: 'mdi-code-brackets', link: '/python/examples' },
  
  { type: 'divider' },
  { type: 'header', title: 'Core Concepts', icon: 'mdi-cube-outline', color: 'deep-purple' },
  { type: 'item', title: 'AcumaticaClient', icon: 'mdi-connection', link: '/python/client' },
  { type: 'item', title: 'Service Factory', icon: 'mdi-factory', link: '/python/service-factory' },
  { type: 'item', title: 'Model Factory', icon: 'mdi-shape-outline', link: '/python/model-factory' },
  
  { type: 'divider' },
  { type: 'header', title: 'OData & Queries', icon: 'mdi-database-search', color: 'blue' },
  { type: 'item', title: 'Query Options', icon: 'mdi-tune', link: '/python/odata/queryoptions' },
  { type: 'item', title: 'Filters & F Factory', icon: 'mdi-filter', link: '/python/odata/filters' }
];

const npmNav = [
//   { type: 'header', title: 'Getting Started', icon: 'mdi-rocket-launch', color: 'success' },
//   { type: 'item', title: 'Installation', icon: 'mdi-npm', link: '/npm/installation' },
//   { type: 'item', title: 'Quickstart', icon: 'mdi-lightning-bolt', link: '/npm/quickstart' },
//   { type: 'item', title: 'TypeScript Setup', icon: 'mdi-language-typescript', link: '/npm/typescript' },
  
//   { type: 'divider' },
//   { type: 'header', title: 'Core', icon: 'mdi-cube-outline', color: 'teal' },
//   { type: 'item', title: 'AcumaticaClient', icon: 'mdi-cog-outline', link: '/npm/client' },
//   { type: 'item', title: 'Configuration', icon: 'mdi-tune', link: '/npm/configuration' },
  
//   { type: 'divider' },
//   { type: 'header', title: 'API Reference', icon: 'mdi-api', color: 'cyan' },
//   { type: 'item', title: 'Methods', icon: 'mdi-function', link: '/npm/api/methods' },
//   { type: 'item', title: 'Types', icon: 'mdi-format-list-bulleted-type', link: '/npm/api/types' },
//   { type: 'item', title: 'Interfaces', icon: 'mdi-share-variant', link: '/npm/api/interfaces' },
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