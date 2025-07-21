<template>
  <v-card 
    elevation="2" 
    class="feature-card h-100"
    hover
  >
    <div class="feature-gradient"></div>
    <v-card-item>
      <div class="text-center">
        <v-avatar
          color="primary"
          size="56"
          class="mb-4 feature-icon"
        >
          <v-icon :icon="icon" size="28" color="white" />
        </v-avatar>
        <h3 class="text-h6 font-weight-bold mb-2">{{ title }}</h3>
        <p class="text-body-2 text-medium-emphasis">{{ description }}</p>
      </div>
    </v-card-item>
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
  }
});
</script>

<style scoped>
.feature-card {
  position: relative;
  transition: all 0.3s ease;
  border-radius: 12px !important;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .feature-gradient {
  opacity: 0.05;
}

.feature-icon {
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%) !important;
  box-shadow: 0 4px 20px rgba(94, 53, 177, 0.3);
}
</style>