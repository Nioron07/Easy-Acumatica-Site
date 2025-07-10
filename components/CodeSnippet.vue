<template>
  <v-card class="code-card" elevation="4" dark>
    <div class="code-toolbar">
      <v-chip label size="small" class="language-chip">{{ language }}</v-chip>
      <v-btn variant="text" size="small" @click="copyCode" color="blue">
        <v-icon :icon="copyIcon" class="mr-2" />
        {{ copyText }}
      </v-btn>
    </div>

    <v-card-text class="pa-0">
      <pre><code ref="codeBlock" :class="`language-${language}`">{{ code }}</code></pre>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue';
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
});

const codeBlock = ref(null);
const copyText = ref('Copy');
const copyIcon = ref('mdi-content-copy');

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
    setTimeout(() => {
      copyText.value = 'Copy';
      copyIcon.value = 'mdi-content-copy';
    }, 2000);
  } catch (err) {
    copyText.value = 'Error';
    console.error('Failed to copy: ', err);
  }
};

onMounted(applyHighlighting);
onUpdated(applyHighlighting);
</script>

<style scoped>
.code-card {
  position: relative;
  background-color: #282c34; /* atom-one-dark background */
  overflow: hidden;
}

.code-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background-color: #353b45;
  border-bottom: 1px solid #444;
}

.language-chip {
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #abb2bf;
}

pre, code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9em;
  text-align: left;
}

pre {
  margin: 0;
  padding: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>