<template>
  <v-app>
    <v-app-bar 
      flat
      class="app-bar-style ps-4"
      height="72"
    >
        <div class="d-flex align-center" style="cursor: pointer;" @click="$router.push('/')">
          <v-img 
            src="../assets/EasyAcumaticaLogo.webp" 
            alt="Easy-Acumatica Logo" 
            width="36"
            height="36"
            class="mr-3"
          />
          <div>
            <div class="text-h6 font-weight-bold text-grey-darken-4">Easy-Acumatica</div>
            <div class="text-caption text-grey-darken-1">Documentation</div>
          </div>
        </div>

        <v-spacer />

        <div class="d-none d-md-flex align-center">
          <v-btn
            variant="text"
            color="grey-darken-3"
            class="mx-1 font-weight-medium"
            to="/python"
          >
            <v-icon start>mdi-language-python</v-icon>
            Python
          </v-btn>
          
          <v-btn
            variant="text"
            color="grey-darken-3"
            class="mx-1 font-weight-medium"
            to="/npm/home"
          >
            <v-icon start>mdi-npm</v-icon>
            Node.js
          </v-btn>

          <v-divider vertical class="mx-3" />

          <v-btn
            icon
            variant="text"
            color="grey-darken-2"
            href="https://github.com/Nioron07/Easy-Acumatica"
            target="_blank"
            rel="noopener"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
          
          <v-btn
            icon
            variant="text"
            color="grey-darken-2"
            href="https://pypi.org/project/easy-acumatica/"
            target="_blank"
            rel="noopener"
          >
            <v-icon>mdi-package-variant</v-icon>
          </v-btn>
        </div>
    </v-app-bar>

    <ModernDocsSidebar v-model="drawer" />

    <v-main class="main-content">
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
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import ModernDocsSidebar from '~/components/DocsSidebar.vue';

const drawer = ref(null);
</script>

<style scoped>
.app-bar-style {
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #E0E0E0 !important;
}

.main-content {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Custom scrollbar for main content */
.main-content :deep(.v-main__wrap) {
  scrollbar-width: thin;
  scrollbar-color: #5e35b1 #f0f0f0;
}

.main-content :deep(.v-main__wrap)::-webkit-scrollbar {
  width: 8px;
}

.main-content :deep(.v-main__wrap)::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.main-content :deep(.v-main__wrap)::-webkit-scrollbar-thumb {
  background: #5e35b1;
  border-radius: 4px;
}

.main-content :deep(.v-main__wrap)::-webkit-scrollbar-thumb:hover {
  background: #7e57c2;
}
</style>