<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    persistent
  >
    <v-card class="connection-dialog">
      <div class="dialog-gradient"></div>
      
      <v-card-title class="text-h5 font-weight-bold">
        <v-icon color="primary" class="mr-2">mdi-connection</v-icon>
        Connect to Acumatica
      </v-card-title>
      
      <v-card-text>
        <v-alert
          type="info"
          variant="tonal"
          density="compact"
          class="mb-4"
        >
          Your credentials are stored locally and never sent to our servers. They're only used for the live code examples.
        </v-alert>
        
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="credentials.base_url"
            label="Instance URL"
            placeholder="https://your-instance.acumatica.com"
            prepend-inner-icon="mdi-web"
            :rules="[rules.required, rules.url]"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />
          
          <v-text-field
            v-model="credentials.username"
            label="Username"
            prepend-inner-icon="mdi-account"
            :rules="[rules.required]"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />
          
          <v-text-field
            v-model="credentials.password"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="[rules.required]"
            variant="outlined"
            density="comfortable"
            class="mb-3"
            @click:append-inner="showPassword = !showPassword"
          />
          
          <v-text-field
            v-model="credentials.tenant"
            label="Tenant"
            prepend-inner-icon="mdi-domain"
            :rules="[rules.required]"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />
          
          <v-text-field
            v-model="credentials.branch"
            label="Branch (Optional)"
            prepend-inner-icon="mdi-source-branch"
            variant="outlined"
            density="comfortable"
          />
          
          <v-expansion-panels variant="accordion" class="mb-4">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <span class="text-caption">Advanced Options</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-text-field
                  v-model="credentials.endpoint_name"
                  label="Endpoint Name"
                  density="compact"
                  variant="outlined"
                  placeholder="Default"
                  class="mb-2"
                />
                <v-text-field
                  v-model="credentials.endpoint_version"
                  label="Endpoint Version"
                  density="compact"
                  variant="outlined"
                  placeholder="Auto-detect"
                  class="mb-2"
                />
                <v-checkbox
                  v-model="credentials.verify_ssl"
                  label="Verify SSL Certificate"
                  density="compact"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-form>
      </v-card-text>
      
      <v-divider />
      
      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="text"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="flat"
          :disabled="!valid"
          :loading="connecting"
          @click="connect"
        >
          Connect
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'connected']);

// State
const dialog = ref(props.modelValue);
const form = ref(null);
const valid = ref(false);
const showPassword = ref(false);
const connecting = ref(false);

const credentials = ref({
  base_url: '',
  username: '',
  password: '',
  tenant: '',
  branch: '',
  endpoint_name: 'Default',
  endpoint_version: '',
  verify_ssl: true
});

// Validation rules
const rules = {
  required: v => !!v || 'Required',
  url: v => {
    try {
      new URL(v);
      return true;
    } catch {
      return 'Must be a valid URL';
    }
  }
};

// Methods
const connect = async () => {
  if (!form.value?.validate()) return;
  
  connecting.value = true;
  
  try {
    // In a real implementation, you would validate the connection here
    // For now, we'll simulate a connection attempt
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clean up the credentials object
    const cleanedCreds = {
      base_url: credentials.value.base_url.replace(/\/$/, ''),
      username: credentials.value.username,
      password: credentials.value.password,
      tenant: credentials.value.tenant
    };
    
    if (credentials.value.branch) {
      cleanedCreds.branch = credentials.value.branch;
    }
    
    if (credentials.value.endpoint_name !== 'Default') {
      cleanedCreds.endpoint_name = credentials.value.endpoint_name;
    }
    
    if (credentials.value.endpoint_version) {
      cleanedCreds.endpoint_version = credentials.value.endpoint_version;
    }
    
    cleanedCreds.verify_ssl = credentials.value.verify_ssl;
    
    emit('connected', cleanedCreds);
    dialog.value = false;
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    connecting.value = false;
  }
};

// Watchers
watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal;
});

watch(dialog, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>

<style scoped>
.connection-dialog {
  position: relative;
  overflow: hidden;
}

.dialog-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
  opacity: 0.05;
  pointer-events: none;
}

.v-card-title {
  position: relative;
  z-index: 1;
}
</style>