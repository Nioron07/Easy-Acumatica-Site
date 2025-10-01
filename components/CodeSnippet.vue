<template>
  <v-card class="code-card" elevation="2" rounded="lg">
    <div class="code-toolbar">
      <div class="code-toolbar-left">
        <v-chip label size="small" class="language-chip" variant="flat">
          {{ languageDisplay }}
        </v-chip>
      </div>
      <v-btn
        variant="text"
        size="small"
        @click="copyCode"
        class="copy-btn"
        :class="{ copied: isCopied }"
      >
        <v-icon :icon="copyIcon" size="18" />
        <span class="ml-2">{{ copyText }}</span>
      </v-btn>
    </div>

    <div class="code-content">
      <pre><code ref="codeBlock" :class="`language-${language}`">{{ code }}</code></pre>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'python',
  },
  showLineNumbers: {
    type: Boolean,
    default: false,
  },
});

const codeBlock = ref(null);
const copyText = ref('Copy');
const copyIcon = ref('mdi-content-copy');
const isCopied = ref(false);

const languageDisplay = computed(() => {
  const langMap = {
    'python': 'Python',
    'javascript': 'JavaScript',
    'bash': 'Bash',
    'json': 'JSON',
    'yaml': 'YAML',
    'typescript': 'TypeScript',
  };
  return langMap[props.language] || props.language.toUpperCase();
});

const applyHighlighting = () => {
  if (codeBlock.value) {
    hljs.highlightElement(codeBlock.value);
  }
};

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copyText.value = 'Copied!';
    copyIcon.value = 'mdi-check';
    isCopied.value = true;
    setTimeout(() => {
      copyText.value = 'Copy';
      copyIcon.value = 'mdi-content-copy';
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    copyText.value = 'Error';
    console.error('Failed to copy: ', err);
    setTimeout(() => {
      copyText.value = 'Copy';
      copyIcon.value = 'mdi-content-copy';
      isCopied.value = false;
    }, 2000);
  }
};

onMounted(applyHighlighting);
onUpdated(applyHighlighting);
</script>

<style scoped>
.code-card {
  position: relative;
  background-color: #1e1e2e;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin: 1rem 0;
}

.code-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #2d2d3f 0%, #252533 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.code-toolbar-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-chip {
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  background: rgba(102, 126, 234, 0.15) !important;
  color: #82b1ff !important;
  border: 1px solid rgba(102, 126, 234, 0.3);
  padding: 0 0.75rem;
  text-transform: uppercase;
}

.copy-btn {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  color: #82b1ff !important;
  background: rgba(130, 177, 255, 0.1) !important;
}

.copy-btn.copied {
  color: #4caf50 !important;
}

.code-content {
  background-color: #1e1e2e;
  overflow-x: auto;
  max-height: 600px;
}

/* Custom scrollbar */
.code-content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.code-content::-webkit-scrollbar-track {
  background: #2d2d3f;
}

.code-content::-webkit-scrollbar-thumb {
  background: rgba(130, 177, 255, 0.3);
  border-radius: 5px;
}

.code-content::-webkit-scrollbar-thumb:hover {
  background: rgba(130, 177, 255, 0.5);
}

pre {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
  line-height: 1.7;
}

code {
  font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  tab-size: 2;
  hyphens: none;
}

/* Enhanced syntax highlighting overrides */
:deep(.hljs) {
  background: transparent;
  color: #abb2bf;
}

:deep(.hljs-keyword),
:deep(.hljs-selector-tag),
:deep(.hljs-literal),
:deep(.hljs-section),
:deep(.hljs-link) {
  color: #c678dd;
  font-weight: 500;
}

:deep(.hljs-function),
:deep(.hljs-title) {
  color: #61afef;
  font-weight: 500;
}

:deep(.hljs-string),
:deep(.hljs-attr),
:deep(.hljs-template-variable),
:deep(.hljs-variable) {
  color: #98c379;
}

:deep(.hljs-comment),
:deep(.hljs-quote) {
  color: #5c6370;
  font-style: italic;
}

:deep(.hljs-number),
:deep(.hljs-regexp),
:deep(.hljs-literal) {
  color: #d19a66;
}

:deep(.hljs-built_in),
:deep(.hljs-builtin-name) {
  color: #e6c07b;
}

:deep(.hljs-params) {
  color: #e06c75;
}

:deep(.hljs-meta) {
  color: #61afef;
}

:deep(.hljs-class .hljs-title) {
  color: #e6c07b;
  font-weight: 600;
}

/* Python-specific improvements */
:deep(.hljs-decorator),
:deep(.hljs-meta) {
  color: #61afef;
}

/* Make operators and punctuation more visible */
:deep(.hljs-operator),
:deep(.hljs-punctuation) {
  color: #abb2bf;
}

/* Improve readability for functions and methods */
:deep(.hljs-title.function_),
:deep(.hljs-title.class_) {
  color: #61afef;
  font-weight: 500;
}
</style>