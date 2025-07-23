<!-- pages/components/CodePlayground.vue -->
<template>
  <v-card class="code-playground" elevation="4">
    <div class="playground-gradient"></div>

    <v-card-title class="playground-header">
      <div class="d-flex align-center justify-space-between w-100">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-code-tags</v-icon>
          <span class="font-weight-bold">{{ title }}</span>
        </div>
        <div class="d-flex align-center" style="gap: 0.5rem">
          <v-btn variant="text" size="small" @click="copyCode" color="primary">
            <v-icon start>{{ copyIcon }}</v-icon>
            {{ copyText }}
          </v-btn>
        </div>
      </div>
    </v-card-title>

    <v-divider />

    <div class="code-container">
      <pre class="language-python"><code class="language-python" v-html="highlightedCode"></code></pre>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  initialCode: { type: String, required: true },
  language: { type: String, default: 'python' },
  runnable: { type: Boolean, default: false }, // Kept for backward compatibility but ignored
});

// State
const copyText = ref('Copy');
const copyIcon = ref('mdi-content-copy');
let Prism = null;

// Load Prism.js
onMounted(async () => {
  // Check if Prism is already loaded
  if (window.Prism) {
    Prism = window.Prism;
    return;
  }

  // Load Prism CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
  document.head.appendChild(link);

  // Load Prism JS
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
  script.async = true;
  
  // Load Python language support
  const pythonScript = document.createElement('script');
  pythonScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js';
  pythonScript.async = true;
  
  script.onload = () => {
    document.head.appendChild(pythonScript);
    pythonScript.onload = () => {
      Prism = window.Prism;
      // Force re-render
      highlightedCode.value;
    };
  };
  
  document.head.appendChild(script);
});

// Compute highlighted code
const highlightedCode = computed(() => {
  if (Prism && Prism.languages.python) {
    return Prism.highlight(props.initialCode, Prism.languages.python, 'python');
  }
  // Fallback: just escape HTML
  return props.initialCode
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
});

// Watch for Prism loading
watch(() => window.Prism, (newVal) => {
  if (newVal) {
    Prism = newVal;
  }
});

// Methods
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.initialCode);
    copyText.value = 'Copied!';
    copyIcon.value = 'mdi-check';
    setTimeout(() => {
      copyText.value = 'Copy';
      copyIcon.value = 'mdi-content-copy';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};
</script>

<style scoped>
.code-playground {
  position: relative;
  overflow: hidden;
}

.playground-header {
  background: #21252b;
  color: white;
  padding: 0.75rem 1rem;
}

.playground-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.05;
  pointer-events: none;
}

.code-container {
  background-color: #2d2d2d;
  padding: 0;
  overflow-x: auto;
}

/* Override Prism theme to match our design */
.code-container :deep(pre[class*="language-"]) {
  margin: 0;
  padding: 1rem;
  background: #2d2d2d;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-container :deep(code[class*="language-"]) {
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
}

/* Custom scrollbar for code container */
.code-container::-webkit-scrollbar {
  height: 8px;
}

.code-container::-webkit-scrollbar-track {
  background: #21252b;
}

.code-container::-webkit-scrollbar-thumb {
  background: #3a404c;
  border-radius: 4px;
}

.code-container::-webkit-scrollbar-thumb:hover {
  background: #4a525f;
}

/* Additional token colors to match One Dark theme */
.code-container :deep(.token.comment) {
  color: #5c6370;
}

.code-container :deep(.token.string) {
  color: #98c379;
}

.code-container :deep(.token.keyword) {
  color: #c678dd;
}

.code-container :deep(.token.builtin) {
  color: #61afef;
}

.code-container :deep(.token.number) {
  color: #d19a66;
}

.code-container :deep(.token.operator) {
  color: #56b6c2;
}

.code-container :deep(.token.class-name) {
  color: #e5c07b;
}

.code-container :deep(.token.function) {
  color: #61afef;
}

.code-container :deep(.token.decorator) {
  color: #e5c07b;
}
</style>