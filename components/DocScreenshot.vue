<template>
  <v-card class="screenshot-card" elevation="3" rounded="lg">
    <div v-if="title" class="screenshot-header">
      <div class="screenshot-title">
        <v-icon :icon="icon" size="20" class="mr-2" color="deep-purple" />
        {{ title }}
      </div>
    </div>

    <div class="screenshot-content" :class="{ 'with-border': border }">
      <v-img
        :src="src"
        :alt="alt"
        :aspect-ratio="aspectRatio"
        cover
        class="screenshot-image"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="deep-purple"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
    </div>

    <div v-if="caption" class="screenshot-caption">
      <v-icon icon="mdi-information-outline" size="16" class="mr-2" color="grey-darken-1" />
      <span>{{ caption }}</span>
    </div>
  </v-card>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Documentation screenshot',
  },
  title: {
    type: String,
    default: '',
  },
  caption: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'mdi-image',
  },
  border: {
    type: Boolean,
    default: true,
  },
  aspectRatio: {
    type: Number,
    default: undefined,
  },
});
</script>

<style scoped>
.screenshot-card {
  margin: 1.5rem 0;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;
}

.screenshot-card:hover {
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.15) !important;
}

.screenshot-header {
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.screenshot-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.screenshot-content {
  position: relative;
  background: #f5f5f5;
}

.screenshot-content.with-border {
  padding: 1rem;
}

.screenshot-image {
  border-radius: 4px;
  width: 100%;
}

.screenshot-caption {
  padding: 0.875rem 1.25rem;
  background: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-start;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .screenshot-content.with-border {
    padding: 0.5rem;
  }

  .screenshot-header,
  .screenshot-caption {
    padding: 0.75rem 1rem;
  }
}
</style>
