<!-- pages/components/FeatureCard.vue -->
<template>
  <v-card class="feature-card" :class="`feature-card--${color}`" elevation="2">
    <div class="feature-gradient"></div>
    <v-card-text class="text-center pa-6">
      <v-icon :color="color" size="48" class="mb-3 feature-icon">{{ icon }}</v-icon>
      <h3 class="text-h6 font-weight-bold mb-2">{{ title }}</h3>
      <p class="text-body-2 text-medium-emphasis">{{ description }}</p>
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
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  }
});
</script>

<style scoped>
.feature-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
}

.feature-gradient {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card--primary .feature-gradient {
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
}

.feature-card--secondary .feature-gradient {
  background: linear-gradient(135deg, #3949ab 0%, #5c6bc0 100%);
}

.feature-card--accent .feature-gradient {
  background: linear-gradient(135deg, #1e88e5 0%, #42a5f5 100%);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.feature-card:hover .feature-gradient {
  opacity: 0.05;
}

.feature-icon {
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.v-card-text {
  position: relative;
  z-index: 1;
}
</style>