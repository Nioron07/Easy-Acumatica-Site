<!-- layouts/landing.vue -->
<template>
  <v-app>
    <!-- Transparent App Bar for Landing -->
    <v-app-bar 
      flat
      class="landing-navbar"
      height="72"
      absolute
      color="transparent"
    >
      <v-container class="d-flex align-center px-4">
        <!-- Logo Section -->
        <div class="d-flex align-center">
          <v-card 
            class="logo-card-landing mr-3" 
            flat
          >
            <v-img 
              src="../assets/EasyAcumaticaLogo.webp" 
              alt="Easy-Acumatica Logo" 
              width="40"
              height="40"
            />
          </v-card>
          
          <div>
            <div class="text-h5 font-weight-bold text-white">Easy-Acumatica</div>
          </div>
        </div>

        <v-spacer />

        <!-- Landing Navigation -->
        <div class="d-none d-md-flex align-center">
          <v-btn
            variant="text"
            color="white"
            class="mx-2"
            to="/python"
          >
            <v-icon start>mdi-language-python</v-icon>
            Python Docs
          </v-btn>
          
          <v-btn
            variant="text"
            color="white"
            class="mx-2"
            to="/npm/home"
          >
            <v-icon start>mdi-npm</v-icon>
            Node.js Docs
          </v-btn>

          <v-divider vertical class="mx-3" color="white" opacity="0.3" />

          <v-btn
            variant="outlined"
            color="white"
            class="mx-2"
            href="https://github.com/Nioron07/Easy-Acumatica"
            target="_blank"
            rel="noopener"
          >
            <v-icon start>mdi-github</v-icon>
            GitHub
          </v-btn>
        </div>

        <!-- Mobile Menu -->
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind="props"
              color="white"
              class="d-md-none"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          
          <v-list class="mobile-menu">
            <v-list-item to="/python" prepend-icon="mdi-language-python">
              <v-list-item-title>Python Docs</v-list-item-title>
            </v-list-item>
            <v-list-item to="/npm/home" prepend-icon="mdi-npm">
              <v-list-item-title>Node.js Docs</v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item 
              href="https://github.com/Nioron07/Easy-Acumatica"
              target="_blank"
              prepend-icon="mdi-github"
            >
              <v-list-item-title>GitHub</v-list-item-title>
            </v-list-item>
            <v-list-item 
              href="https://pypi.org/project/easy-acumatica/"
              target="_blank"
              prepend-icon="mdi-package-variant"
            >
              <v-list-item-title>PyPI</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main>
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
import { onMounted, onUnmounted } from 'vue';

// Handle navbar transparency on scroll
const handleScroll = () => {
  const navbar = document.querySelector('.landing-navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.landing-navbar {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.1) !important;
}

.landing-navbar.scrolled {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 25%, #5e35b1 50%, #7e57c2 100%) !important;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.logo-card-landing {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.logo-card-landing:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.mobile-menu {
  min-width: 200px;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
}
</style>