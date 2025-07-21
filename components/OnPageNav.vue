<template>
  <v-card flat bordered rounded="xl" class="sticky-nav">
    <v-list density="compact" nav class="pa-2">
      <v-list-subheader class="nav-subheader">ON THIS PAGE</v-list-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        @click="scrollTo(item.id)"
        rounded="lg"
        class="nav-item"
        :class="{ 'active-nav-item': activeId === item.id }"
      ></v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const activeId = ref(props.items.length ? props.items[0].id : null);
let observer = null;

// Function to smoothly scroll to a section
const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    // Offset for the 72px fixed app bar
    const offset = 72 + 24; // AppBar height + margin
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Set up IntersectionObserver to track active section on scroll
onMounted(() => {
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id;
      }
    });
  };
  
  observer = new IntersectionObserver(observerCallback, {
    rootMargin: "-20% 0px -70% 0px", // a threshold to trigger the change in the middle of the screen
    threshold: 0
  });

  props.items.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  });
});

// Clean up the observer when the component is unmounted
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.sticky-nav {
  position: sticky;
  /* Top position accounts for the 72px app bar + 24px margin */
  top: 96px; 
}

.nav-subheader {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #5e35b1;
  padding-inline-start: 12px !important;
  margin-bottom: 8px;
}

.nav-item {
  color: #424242; /* Dark grey text for readability */
  transition: all 0.2s ease-in-out;
  margin-bottom: 4px;
}

.nav-item:not(.active-nav-item):hover {
  background-color: rgba(94, 53, 177, 0.05);
  color: #5e35b1;
}

.active-nav-item {
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.1) 0%, rgba(126, 87, 194, 0.1) 100%);
  color: #5e35b1;
  font-weight: 500;
  border-left: 3px solid #7e57c2;
}
</style>