<template>
  <v-app>
    <v-app-bar 
      flat
      class="app-bar-style"
      height="72"
    >
      <v-container class="d-flex align-center px-4">
        <div class="d-flex align-center" style="cursor: pointer;" @click="$router.push('/')">
          <v-img 
            src="../assets/EasyAcumaticaLogo.webp" 
            alt="Easy-Acumatica Logo" 
            width="36"
            height="36"
            class="mr-3"
          />
          <div class="text-h5 font-weight-bold text-grey-darken-4">Easy-Acumatica</div>
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
            Python Docs
          </v-btn>
          
          <v-btn
            variant="text"
            color="grey-darken-3"
            class="mx-1 font-weight-medium"
            to="/npm"
          >
            <v-icon start>mdi-npm</v-icon>
            Node.js Docs
          </v-btn>

          <v-divider vertical class="mx-3" />

          <v-btn
            variant="outlined"
            color="grey-darken-3"
            class="mx-2"
            href="https://github.com/Nioron07/Easy-Acumatica"
            target="_blank"
            rel="noopener"
          >
            <v-icon start>mdi-github</v-icon>
            GitHub
          </v-btn>
        </div>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind="props"
              color="grey-darken-3"
              class="d-md-none"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          
          <v-list class="mobile-menu">
            <v-list-item to="/python" prepend-icon="mdi-language-python">
              <v-list-item-title>Python Docs</v-list-item-title>
            </v-list-item>
            <v-list-item to="/npm">
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
// No script logic needed for the header anymore!
</script>

<style scoped>
.app-bar-style {
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #E0E0E0 !important;
}

.mobile-menu {
  min-width: 200px;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
}
</style>