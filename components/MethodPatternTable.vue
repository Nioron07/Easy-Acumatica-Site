<template>
  <v-table density="comfortable" class="method-pattern-table">
    <thead>
      <tr>
        <th class="text-left font-weight-bold">Method Pattern</th>
        <th class="text-left font-weight-bold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pattern in patterns" :key="pattern.pattern">
        <td>
          <code class="method-pattern">{{ pattern.pattern }}</code>
        </td>
        <td class="pattern-description">{{ pattern.description }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
defineProps({
  patterns: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.method-pattern-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(94, 53, 177, 0.1);
}

.method-pattern-table th {
  background: linear-gradient(135deg, rgba(94, 53, 177, 0.05) 0%, rgba(126, 87, 194, 0.05) 100%);
  color: #1a237e;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.method-pattern {
  background: rgba(94, 53, 177, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #5e35b1;
  font-weight: 500;
  display: inline-block;
}

.pattern-description {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #424242;
}
</style>