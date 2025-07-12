<template>
  <v-layout>
    <v-app-bar color="primary" density="compact" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-card color="white" width="30" height="30" class="mx-2 rounded" style="padding: 3px;" elevation="5" v-ripple>
        <v-img src="../assets/EasyAcumaticaLogo.webp" alt="Logo" @click="$router.push('/')" class="hover"></v-img>
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
<Head>
  <Link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<Link rel="shortcut icon" href="/favicon.ico" />
<Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<Meta name="apple-mobile-web-app-title" content="Easy-Acumatica" />
<Link rel="manifest" href="/site.webmanifest" />
</Head>
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