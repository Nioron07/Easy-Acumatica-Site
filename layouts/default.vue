<!-- layouts/default.vue -->
<template>
  <v-app>
    <!-- Modern App Bar -->
    <v-app-bar 
      flat
      class="navbar-gradient"
      height="72"
    >
      <v-container class="d-flex align-center px-4">
        <!-- Mobile Menu -->
        <v-app-bar-nav-icon 
          @click="drawer = !drawer"
          class="d-md-none"
          color="white"
        />
        
        <!-- Logo Section -->
        <div class="d-flex align-center">
          <v-card 
            class="logo-card mr-3" 
            @click="$router.push('/')"
            flat
          >
            <v-img 
              src="../assets/EasyAcumaticaLogo.webp" 
              alt="Easy-Acumatica Logo" 
              width="36"
              height="36"
            />
          </v-card>
          
          <div>
            <div class="text-h6 font-weight-bold text-white">Easy-Acumatica</div>
            <div class="text-caption text-white-darken-2">Documentation</div>
          </div>
        </div>

        <v-spacer />

        <!-- Desktop Navigation -->
        <div class="d-none d-md-flex align-center">
          <v-btn
            variant="text"
            color="white"
            class="mx-1"
            to="/python"
          >
            <v-icon start>mdi-language-python</v-icon>
            Python
          </v-btn>
          
          <v-btn
            variant="text"
            color="white"
            class="mx-1"
            to="/npm/home"
          >
            <v-icon start>mdi-npm</v-icon>
            Node.js
          </v-btn>

          <v-divider vertical class="mx-3" color="white" opacity="0.3" />

          <v-btn
            icon
            variant="text"
            color="white"
            href="https://github.com/Nioron07/Easy-Acumatica"
            target="_blank"
            rel="noopener"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
          
          <v-btn
            icon
            variant="text"
            color="white"
            href="https://pypi.org/project/easy-acumatica/"
            target="_blank"
            rel="noopener"
          >
            <v-icon>mdi-package-variant</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Modern Navigation Drawer -->
    <ModernDocsSidebar v-model="drawer" />

    <!-- Main Content -->
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
.navbar-gradient {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 25%, #5e35b1 50%, #7e57c2 100%);
}

.logo-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 6px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.logo-card:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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