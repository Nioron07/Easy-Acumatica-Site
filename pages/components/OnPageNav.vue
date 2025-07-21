<template>
  <v-card elevation="4" class="sticky-nav">
    <div class="nav-gradient"></div>
    
    <!-- Connection Status -->
    <v-card-item v-if="!connectionStatus" class="connection-prompt">
      <v-btn
        color="primary"
        variant="flat"
        block
        rounded="pill"
        @click="$emit('connect')"
      >
        <v-icon start>mdi-connection</v-icon>
        Connect to Run Examples
      </v-btn>
    </v-card-item>
    
    <v-card-item v-else class="connection-status">
      <div class="d-flex align-center">
        <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
        <span class="text-body-2">Connected</span>
      </div>
    </v-card-item>
    
    <v-divider />
    
    <!-- Navigation -->
    <v-list density="compact" nav>
      <v-list-subheader class="font-weight-bold">
        ON THIS PAGE
      </v-list-subheader>
      
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        @click="scrollTo(item.id)"
        rounded="lg"
        class="nav-item"
        :class="{ 'active': activeSection === item.id }"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon" size="small" />
        </template>
        
        <template v-slot:append v-if="activeSection === item.id">
          <div class="active-indicator"></div>
        </template>
      </v-list-item>
    </v-list>
    
    <!-- Quick Actions -->
    <v-divider class="mt-4" />
    
    <v-card-actions class="quick-actions">
      <v-btn
        variant="text"
        size="small"
        block
        href="https://github.com/Nioron07/Easy-Acumatica"
        target="_blank"
      >
        <v-icon start size="small">mdi-github</v-icon>
        View on GitHub
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  connectionStatus: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['connect']);

// State
const activeSection = ref('');

// Methods
const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 88; // Height of app bar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const handleScroll = () => {
  const sections = props.items.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  })).filter(s => s.element);

  const scrollPosition = window.scrollY + 100;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const top = section.element.offsetTop;
    
    if (scrollPosition >= top) {
      activeSection.value = section.id;
      break;
    }
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Set initial active section
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.sticky-nav {
  position: sticky;
  top: 88px;
  max-height: calc(100vh - 104px);
  overflow-y: auto;
  background: white;
  border-radius: 12px !important;
}

.nav-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.03;
  pointer-events: none;
}

.connection-prompt,
.connection-status {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
}

.connection-status {
  padding: 0.75rem 1rem;
}

.nav-item {
  margin: 0.125rem 0.5rem;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover {
  background: rgba(94, 53, 177, 0.04);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.1) 0%, rgba(126, 87, 194, 0.1) 100%);
  color: #5e35b1;
}

.active-indicator {
  width: 3px;
  height: 20px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  border-radius: 2px;
  position: absolute;
  right: -8px;
}

.quick-actions {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
}

/* Custom scrollbar */
.sticky-nav::-webkit-scrollbar {
  width: 4px;
}

.sticky-nav::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.sticky-nav::-webkit-scrollbar-thumb {
  background: #5e35b1;
  border-radius: 2px;
}

.sticky-nav::-webkit-scrollbar-thumb:hover {
  background: #7e57c2;
}
</style>