<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    scrollable
  >
    <v-card class="output-dialog">
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-console</v-icon>
          Code Output
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="dialog = false"
        />
      </v-card-title>
      
      <v-divider />
      
      <v-card-text class="pa-0">
        <div v-if="loading" class="text-center pa-8">
          <v-progress-circular
            indeterminate
            color="primary"
            size="48"
          />
          <p class="mt-4 text-body-2 text-medium-emphasis">
            Executing code...
          </p>
        </div>
        
        <div v-else-if="error" class="error-output">
          <div class="output-header error">
            <v-icon start size="small">mdi-alert-circle</v-icon>
            Error
          </div>
          <pre class="output-content error-content">{{ error }}</pre>
        </div>
        
        <div v-else-if="output" class="success-output">
          <div class="output-header success">
            <v-icon start size="small">mdi-check-circle</v-icon>
            Output
          </div>
          <pre class="output-content">{{ output }}</pre>
        </div>
        
        <div v-else class="text-center pa-8 text-medium-emphasis">
          No output to display
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  output: String,
  error: String,
  loading: Boolean
});

const emit = defineEmits(['update:modelValue']);

const dialog = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal;
});

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>

<style scoped>
.output-dialog {
  border-radius: 12px !important;
}

.output-header {
  padding: 0.75rem 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.output-header.success {
  background: rgba(76, 175, 80, 0.1);
  color: #2e7d32;
}

.output-header.error {
  background: rgba(244, 67, 54, 0.1);
  color: #c62828;
}

.output-content {
  margin: 0;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  background: #f5f5f5;
  max-height: 400px;
  overflow-y: auto;
}

.error-content {
  color: #c62828;
  background: #ffebee;
}

/* Custom scrollbar */
.output-content::-webkit-scrollbar {
  width: 8px;
}

.output-content::-webkit-scrollbar-track {
  background: #e0e0e0;
}

.output-content::-webkit-scrollbar-thumb {
  background: #9e9e9e;
  border-radius: 4px;
}

.output-content::-webkit-scrollbar-thumb:hover {
  background: #757575;
}
</style>