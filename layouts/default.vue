<template>
  <v-layout>
    <v-app-bar color="primary" density="compact" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-card color="white" width="30" height="30" class="mx-2 rounded" style="padding: 3px;" elevation="5" v-ripple>
        <v-img src="../assets/EasyAcumaticaLogo.png" alt="Logo" @click="$router.push('/')" class="hover"></v-img>
      </v-card>

      <v-toolbar-title class="font-weight-bold">Easy-Acumatica Docs</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn 
        href="https://github.com/Nioron07/Easy-Acumatica"
        target="_blank"
        icon
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <DocsSidebar v-model="drawer" />

    <v-main style="min-height: 100vh;">
      <slot />
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue';
import DocsSidebar from '~/components/DocsSidebar.vue';

const drawer = ref(null); 
</script>

<style scoped>
.hover {
  cursor: pointer;
}
</style>