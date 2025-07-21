<template>
  <v-card 
    :color="color"
    variant="outlined"
    class="best-practice-card"
  >
    <v-card-title class="d-flex align-center">
      <v-icon :icon="icon" :color="color" class="mr-2" />
      {{ title }}
    </v-card-title>
    <v-card-text>
      <ul class="practice-list">
        <li v-for="(item, index) in items" :key="index" class="practice-item">
          {{ item }}
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.best-practice-card {
  height: 100%;
  border-radius: 12px !important;
  transition: all 0.3s ease;
}

.best-practice-card:hover {
  transform: translateY(-2px);
}

.practice-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.practice-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.practice-item::before {
  content: '•';
  position: absolute;
  left: 0;
  font-weight: bold;
  font-size: 1.25rem;
}

.best-practice-card[color="success"] .practice-item::before {
  color: #4caf50;
}

.best-practice-card[color="error"] .practice-item::before {
  color: #f44336;
}
</style>