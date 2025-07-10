<template>
  <v-card elevation="5" class="sticky-nav">
    <v-list density="compact" nav>
      <v-list-subheader class="font-weight-bold">ON THIS PAGE</v-list-subheader>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        @click="scrollTo(item.id)"
        rounded="lg"
        class="mb-1"
      ></v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    // The offset accounts for the height of the app bar
    const offset = 72;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped>
.sticky-nav {
  position: sticky;
  top: 40px; 
}
</style>