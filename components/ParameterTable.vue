<template>
  <v-table density="comfortable" class="parameter-table">
    <thead>
      <tr>
        <th class="text-left font-weight-bold">Parameter</th>
        <th class="text-left font-weight-bold">Type</th>
        <th class="text-left font-weight-bold">Required</th>
        <th class="text-left font-weight-bold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="param in parameters" :key="param.name">
        <td>
          <code class="param-name">{{ param.name }}</code>
        </td>
        <td>
          <code class="param-type">{{ param.type }}</code>
        </td>
        <td>
          <v-chip
            :color="param.required ? 'error' : 'success'"
            variant="tonal"
            size="small"
            label
          >
            {{ param.required ? 'Required' : 'Optional' }}
          </v-chip>
        </td>
        <td class="param-description">{{ param.description }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
defineProps({
  parameters: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.parameter-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(94, 53, 177, 0.1);
}

.parameter-table th {
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.05) 0%, rgba(126, 87, 194, 0.05) 100%);
  color: #1a237e;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.param-name {
  background: rgba(94, 53, 177, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #5e35b1;
  font-weight: 500;
}

.param-type {
  background: rgba(33, 150, 243, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.75rem;
  color: #1976d2;
}

.param-description {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #424242;
}
</style>