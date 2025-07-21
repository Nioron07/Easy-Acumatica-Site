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
          <v-btn
            variant="text"
            size="small"
            @click="resetCode"
            :disabled="code === initialCode"
          >
            <v-icon start>mdi-restore</v-icon>
            Reset
          </v-btn>
          <v-btn variant="text" size="small" @click="copyCode" color="primary">
            <v-icon start>{{ copyIcon }}</v-icon>
            {{ copyText }}
          </v-btn>
          <v-btn
            v-if="runnable"
            variant="flat"
            size="small"
            color="primary"
            @click="runCode"
            :loading="running"
          >
            <v-icon start>mdi-play</v-icon>
            Run
          </v-btn>
        </div>
      </div>
    </v-card-title>

    <v-divider />

    <div ref="editorRef" style="padding: 1%; background-color: #282c35;"></div>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

// CodeMirror imports
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

const props = defineProps({
  title: { type: String, required: true },
  initialCode: { type: String, required: true },
  language: { type: String, default: 'python' }, // Kept for future use
  runnable: { type: Boolean, default: false },
});

const emit = defineEmits(['run']);

// State
const code = ref(props.initialCode);
const copyText = ref('Copy');
const copyIcon = ref('mdi-content-copy');
const running = ref(false);

// Template Ref for CodeMirror's mount point
const editorRef = ref(null);
let editorView = null;

// This function creates the listener that syncs CodeMirror's content
// with our component's `code` ref.
const updateListener = EditorView.updateListener.of((update) => {
  if (update.docChanged) {
    code.value = update.state.doc.toString();
  }
});

onMounted(() => {
  const startState = EditorState.create({
    doc: code.value,
    extensions: [
      python(),
      oneDark, // Theme
      keymap.of([...defaultKeymap, indentWithTab]), // Basic keymaps + Tab support
      updateListener, // Our sync listener
      EditorView.lineWrapping, // Wrap long lines
    ],
  });

  editorView = new EditorView({
    state: startState,
    parent: editorRef.value,
  });
});

// Clean up the editor when the component is destroyed
onBeforeUnmount(() => {
  if (editorView) {
    editorView.destroy();
  }
});

// Watch for external changes to the initial code (e.g., from a reset button)
watch(() => props.initialCode, (newCode) => {
    code.value = newCode;
    if (editorView) {
        editorView.dispatch({
            changes: { from: 0, to: editorView.state.doc.length, insert: newCode }
        });
    }
});


// --- Component Methods ---
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(code.value);
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

const resetCode = () => {
  // This will trigger the watch effect to update the editor
  props.initialCode = props.initialCode;
  if (editorView) {
    editorView.dispatch({
        changes: { from: 0, to: editorView.state.doc.length, insert: props.initialCode }
    });
  }
};

const runCode = async () => {
  running.value = true;
  try {
    emit('run', code.value);
  } finally {
    running.value = false;
  }
};
</script>

<style>
/* Style CodeMirror to match the v-card theme */
.code-playground .cm-editor {
  background-color: #282c34;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
}
.code-playground .cm-gutters {
  background-color: #282c34;
  border-right: 1px solid #3a404c;
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
</style>