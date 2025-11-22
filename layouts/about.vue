<template>
  <v-app>
    <v-app-bar
      flat
      fixed
      app
      class="app-bar-style ps-4"
      height="72"
      elevation="0"
    >
        <!-- Mobile menu button -->
        <v-btn
          icon
          @click="$router.push('/')"
          class="d-md-none mr-2"
          variant="text"
        >
          <v-icon>mdi-home</v-icon>
        </v-btn>

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

        <div class="d-none d-md-flex align-center text-caption text-grey-darken-2 mx-4">
          See an issue?
          <v-btn
            variant="text"
            size="small"
            color="grey-darken-3"
            class="text-caption px-2 ml-1"
            href="https://github.com/Nioron07/Easy-Acumatica-Site"
            target="_blank"
            rel="noopener"
          >
            Contribute to the docs
          </v-btn>
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
            to="/npm"
          >
            <v-icon start>mdi-npm</v-icon>
            Node.js
          </v-btn>

          <v-btn
            variant="text"
            color="grey-darken-3"
            class="mx-1 font-weight-medium"
            to="/orbu"
          >
            <v-icon start>mdi-cloud-sync</v-icon>
            Orbu
          </v-btn>

          <v-divider vertical class="mx-3" />

          <!-- GitHub button - default to main site repo -->
          <v-btn
            icon
            variant="text"
            color="grey-darken-2"
            href="https://github.com/Nioron07/Easy-Acumatica-Site"
            target="_blank"
            rel="noopener"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </div>
    </v-app-bar>

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

<style scoped>
.app-bar-style {
  position: fixed !important;
  top: 0 !important;
  z-index: 1000 !important;
  background-color: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #E0E0E0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
}

.main-content {
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 72px !important;
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
