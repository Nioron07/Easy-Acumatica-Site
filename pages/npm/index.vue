<template>
  <v-container fluid class="construction-container pa-0">
    <!-- Background -->
    <div class="gradient-bg"></div>

    <!-- Main Content -->
    <v-container class="content-wrapper">
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" md="8" lg="6">
          <!-- Card -->
          <v-card class="main-card elevation-4">
            <v-card-text class="text-center pa-8">
              <!-- Logo -->
              <div class="logo-container mb-6">
                <v-icon size="64" color="red">mdi-npm</v-icon>
              </div>

              <!-- Title -->
              <h1 class="text-h3 font-weight-bold mb-4">
                Node.js Documentation
              </h1>
              
              <!-- Status Badge -->
              <v-chip
                size="large"
                color="purple"
                class="mb-6"
                prepend-icon="mdi-hammer-wrench"
              >
                Under Construction
              </v-chip>

              <!-- Description -->
              <p class="text-h6 mb-8 text-grey-darken-2">
                The Node.js/npm package documentation is currently being developed.
              </p>

              <!-- Features List -->
              <v-row class="mb-8">
                <v-col cols="12" sm="4">
                  <div class="feature-item">
                    <v-icon size="32" color="blue" class="mb-2">mdi-lightning-bolt</v-icon>
                    <div class="text-body-1 font-weight-medium">Dynamic API</div>
                  </div>
                </v-col>
                <v-col cols="12" sm="4">
                  <div class="feature-item">
                    <v-icon size="32" color="purple" class="mb-2">mdi-code-tags</v-icon>
                    <div class="text-body-1 font-weight-medium">TypeScript</div>
                  </div>
                </v-col>
                <v-col cols="12" sm="4">
                  <div class="feature-item">
                    <v-icon size="32" color="red" class="mb-2">mdi-rocket</v-icon>
                    <div class="text-body-1 font-weight-medium">Async/Await</div>
                  </div>
                </v-col>
              </v-row>

              <!-- Action Buttons -->
              <div class="d-flex flex-column flex-sm-row gap-3 justify-center">
                <v-btn
                  size="large"
                  rounded="lg"
                  color="blue"
                  variant="flat"
                  prepend-icon="mdi-arrow-left"
                  @click="$router.push('/python')"
                >
                  Python Docs
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  size="large"
                  rounded="lg"
                  variant="outlined"
                  color="purple"
                  prepend-icon="mdi-github"
                  href="https://github.com/joebewon/Easy-Acumatica"
                  target="_blank"
                >
                  View on GitHub
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.construction-container {
  min-height: 100vh;
  position: relative;
}

/* Background */
.gradient-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  opacity: 0.1;
}

/* Content */
.content-wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Card */
.main-card {
  background: white !important;
  border-radius: 16px !important;
}

/* Logo Container */
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Feature Items */
.feature-item {
  padding: 1rem;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .main-card {
    margin: 1rem;
  }
}
</style>