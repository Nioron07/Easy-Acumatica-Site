<template>
  <div class="contact-page">
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <section class="hero-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" class="text-center">
              <h1 class="hero-title mb-4">Contact Us</h1>
              <p class="hero-description mb-8">
                We're here to help with questions, issues, or consulting inquiries
              </p>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Contact Options Section -->
      <section class="contact-section">
        <v-container>
          <v-row>
            <!-- GitHub Issues Card -->
            <v-col cols="12" md="6">
              <v-card class="contact-card h-100" elevation="2">
                <v-card-text class="pa-6">
                  <div class="text-center mb-4">
                    <v-icon size="64" color="deep-purple">mdi-github</v-icon>
                  </div>
                  <h3 class="contact-title text-center mb-3">Report Issues on GitHub</h3>
                  <p class="contact-description mb-4">
                    Found a bug or have a feature request? Submit an issue on the respective GitHub repository:
                  </p>

                  <div class="github-links">
                    <v-btn
                      href="https://github.com/Nioron07/Easy-Acumatica/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      block
                      color="deep-purple"
                      variant="outlined"
                      class="mb-3"
                    >
                      <v-icon start>mdi-language-python</v-icon>
                      Easy-Acumatica Python Issues
                      <v-icon end>mdi-open-in-new</v-icon>
                    </v-btn>

                    <v-btn
                      href="https://github.com/Nioron07/Orbu/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      block
                      color="deep-purple"
                      variant="outlined"
                      class="mb-3"
                    >
                      <v-icon start>mdi-cloud-sync</v-icon>
                      Orbu Issues
                      <v-icon end>mdi-open-in-new</v-icon>
                    </v-btn>

                    <v-btn
                      href="https://github.com/joebewon/Easy-Acumatica/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      block
                      color="deep-purple"
                      variant="outlined"
                    >
                      <v-icon start>mdi-npm</v-icon>
                      Easy-Acumatica Node.js Issues
                      <v-icon end>mdi-open-in-new</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Email Contact Card -->
            <v-col cols="12" md="6">
              <v-card class="contact-card h-100" elevation="2">
                <v-card-text class="pa-6">
                  <div class="text-center mb-4">
                    <v-icon size="64" color="deep-purple">mdi-email</v-icon>
                  </div>
                  <h3 class="contact-title text-center mb-3">Email Us Directly</h3>
                  <p class="contact-description mb-4">
                    For general questions, consulting inquiries, or other matters, reach out to us via email:
                  </p>

                  <div class="email-contact text-center">
                    <v-card class="email-card pa-4 mb-4" variant="tonal" color="deep-purple">
                      <a
                        class="email-link"
                      >
                        <v-icon start>mdi-email-outline</v-icon>
                        OrbuApp@protonmail.com
                      </a>
                    </v-card>

                    <v-btn
                      href="mailto:OrbuApp@protonmail.com"
                      color="deep-purple"
                      variant="flat"
                      size="large"
                      rounded="pill"
                    >
                      <v-icon start>mdi-send</v-icon>
                      Send Email
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Discussions Section -->
          <v-row class="mt-6">
            <v-col cols="12">
              <v-card class="contact-card" elevation="2">
                <v-card-text class="pa-6">
                  <div class="text-center">
                    <v-icon size="48" color="deep-purple" class="mb-3">mdi-forum</v-icon>
                    <h3 class="contact-title mb-3">Join the Discussion</h3>
                    <p class="contact-description mb-4">
                      Connect with other users, ask questions, and share ideas in our GitHub Discussions:
                    </p>
                    <div class="d-flex flex-wrap gap-3 justify-center">
                      <v-btn
                        href="https://github.com/Nioron07/Easy-Acumatica/discussions"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="deep-purple"
                        variant="outlined"
                        class="mr-2"
                      >
                        <v-icon start>mdi-language-python</v-icon>
                        Python Discussions
                        <v-icon end>mdi-open-in-new</v-icon>
                      </v-btn>

                      <v-btn
                        href="https://github.com/Nioron07/Orbu/discussions"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="deep-purple"
                        variant="outlined"
                      >
                        <v-icon start>mdi-cloud-sync</v-icon>
                        Orbu Discussions
                        <v-icon end>mdi-open-in-new</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-container>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'about',
});

useSeoMeta({
  title: 'Contact Us | Easy-Acumatica',
  description: 'Get in touch with the Easy-Acumatica team for questions, issues, or consulting inquiries.',
  ogTitle: 'Contact Us - Easy-Acumatica',
  ogDescription: 'Reach out to us via GitHub or email for support, questions, and consulting.',
  ogType: 'website',
  ogUrl: 'https://easyacumatica.com/contact',
  twitterCard: 'summary',
  twitterTitle: 'Contact Easy-Acumatica',
  twitterDescription: 'Get support and connect with the Easy-Acumatica team.',
  robots: 'index, follow',
});
</script>

<style scoped>
.contact-page {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%);
  color: white;
  padding: 4rem 0;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  color: white;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  max-width: 700px;
  margin: 0 auto;
}

/* Contact Section */
.contact-section {
  padding: 4rem 0;
}

.contact-card {
  transition: all 0.3s ease;
  border-radius: 16px;
}

.contact-card:hover {
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.2) !important;
}

.contact-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
}

.contact-description {
  color: #666;
  line-height: 1.6;
  justify-self: center;
}

.github-links {
  margin-top: 1rem;
}

.github-links .v-btn {
  transition: all 0.3s ease;
}

.github-links .v-btn:hover {
  transform: translateX(4px);
}

.email-card {
  border-radius: 12px;
}

.email-link {
  color: #5e35b1;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.contact-topics {
  text-align: left;
}

.topic-list {
  color: #666;
  line-height: 1.8;
  padding-left: 1.5rem;
}

.topic-list li {
  margin-bottom: 0.5rem;
}
</style>
