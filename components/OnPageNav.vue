<!-- pages/components/OnPageNav.vue -->
<template>
  <div class="on-page-nav">
    <v-card elevation="2" class="sticky-nav">
      <v-card-title class="text-subtitle-1 font-weight-bold">
        On this page
      </v-card-title>
      
      <v-divider />
      
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in items"
          :key="item.id"
          :href="`#${item.id}`"
          @click.prevent="scrollToSection(item.id)"
          :class="{ 'v-list-item--active': activeSection === item.id }"
        >
          <template v-slot:prepend>
            <v-icon size="small">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text-body-2">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const activeSection = ref('');

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Account for fixed header
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
};

const updateActiveSection = () => {
  const sections = props.items.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  })).filter(section => section.element);

  const scrollPosition = window.scrollY + 100;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    if (section.element.offsetTop <= scrollPosition) {
      activeSection.value = section.id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection);
});
</script>

<style scoped>
.sticky-nav {
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.v-list-item--active {
  background-color: rgba(94, 53, 177, 0.08);
}

.v-list-item--active :deep(.v-list-item-title) {
  color: #5e35b1;
  font-weight: 600;
}
</style>