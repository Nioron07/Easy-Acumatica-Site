<template>
  <div class="about-page">
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <section class="hero-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" class="text-center">
              <h1 class="hero-title mb-4">About the Team</h1>
              <p class="hero-description mb-8">
                Meet the people behind Easy-Acumatica
              </p>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Team Grid Section -->
      <section class="team-section">
        <v-container>
          <v-row>
            <v-col cols="12" md="6" v-for="(member, index) in teamMembers" :key="index">
              <v-card class="team-card h-100" elevation="2">
                <v-card-text class="pa-6">
                  <!-- Avatar Section -->
                  <div class="text-center mb-4">
                    <v-avatar size="120" color="deep-purple">
                      <v-img
                        v-if="member.avatar"
                        :src="member.avatar"
                        :alt="member.name"
                        cover
                      />
                      <v-icon v-else size="64" color="white">mdi-account</v-icon>
                    </v-avatar>
                  </div>

                  <!-- Name and Role -->
                  <h3 class="team-name text-center mb-2">{{ member.name }}</h3>
                  <p class="team-role text-center mb-4">{{ member.role }}</p>

                  <!-- Description -->
                  <p class="team-description mb-4">{{ member.description }}</p>

                  <!-- Social/Link Buttons -->
                  <div class="team-links d-flex justify-center gap-2">
                    <v-btn
                      v-for="(link, linkIndex) in member.links"
                      :key="linkIndex"
                      :icon="link.icon"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="text"
                      color="deep-purple"
                      size="small"
                    >
                      <v-icon>{{ link.icon }}</v-icon>
                      <v-tooltip activator="parent" location="bottom">
                        {{ link.label }}
                      </v-tooltip>
                    </v-btn>
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
import { ref } from 'vue';

const teamMembers = ref([
  {
    name: 'Matthew Hirstius',
    role: 'Creator/Contributor: EasyAcumatica for Python, Orbu',
    avatar: '/Matt_Pic.jpg',
    description: 'Hi, I\'m Matt — a software developer and Computer Science student at the University of Illinois Urbana-Champaign. I specialize in building practical business solutions with a focus on automation, system integration, and application development. I\'m passionate about creating tools that solve real-world problems and help businesses operate more efficiently.',
    links: [
      { icon: 'mdi-github', url: 'https://github.com/Nioron07', label: 'GitHub' },
      { icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/matthew-hirstius-b43334316/', label: 'LinkedIn' }
    ]
  },
  {
    name: 'Joseph Habisohn',
    role: 'Creator/Contributor: EasyAcumatica for NPM',
    avatar: '/Joe_Pic.jpeg',
    description: 'Hey, my name is Joseph Habisohn and I am studying Computer Science at the University of Illinois at Urbana-Champaign. My current interests include the creation of person-first software and the application of software in robotics',
    links: [
      { icon: 'mdi-github', url: 'https://github.com/joebewon', label: 'GitHub' },
      { icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/joseph-habisohn-a6245a321/', label: 'LinkedIn' }
    ]
  },
  {
    name: 'Chris Xu',
    role: 'Contributor: EasyAcumatica for Python',
    avatar: '/Chris_Pic.png',
    description: 'Hello, I am Chris Xu. I\'m a first-year at UIUC studying computer engineering with plans to minor in either CS or semiconductors. I am interested in hardware-software integration as well as hardware system analysis.',
    links: [
      { icon: 'mdi-github', url: 'https://github.com/Typhlosion123', label: 'GitHub' },
      { icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/chrisyxu/', label: 'LinkedIn' },
      { icon: 'mdi-web', url: 'https://www.chrisyxu.com/aboutme', label: 'Website' }
    ]
  },
  {
    name: 'Anthony Dibasillio',
    role: 'Contributor: EasyAcumatica for Python',
    avatar: '/AJ_Pic.jpg',
    description: 'Hi, I\'m AJ',
    links: [
      { icon: 'mdi-github', url: 'https://github.com/mgcountss', label: 'GitHub' },
      { icon: 'mdi-web', url: 'https://www.mgcounts.com/', label: 'Website' }
    ]
  }
]);

definePageMeta({
  layout: 'about',
});

useSeoMeta({
  title: 'About the Team | Easy-Acumatica',
  description: 'Meet the team behind Easy-Acumatica - Python and Node.js libraries for Acumatica ERP integration.',
  ogTitle: 'About the Team - Easy-Acumatica',
  ogDescription: 'Meet the developers and contributors behind Easy-Acumatica.',
  ogType: 'website',
  ogUrl: 'https://easyacumatica.com/about',
  twitterCard: 'summary',
  twitterTitle: 'About the Easy-Acumatica Team',
  twitterDescription: 'Meet the team behind Easy-Acumatica.',
  robots: 'index, follow',
});
</script>

<style scoped>
.about-page {
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

/* Team Section */
.team-section {
  padding: 4rem 0;
}

.team-card {
  transition: all 0.3s ease;
  border-radius: 16px;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.2) !important;
}

.team-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a237e;
}

.team-role {
  font-size: 1rem;
  font-weight: 500;
  color: #5e35b1;
}

.team-description {
  color: #666;
  line-height: 1.6;
  text-align: center;
}

.team-links {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.team-links .v-btn {
  transition: all 0.3s ease;
}

.team-links .v-btn:hover {
  transform: translateY(-2px);
}
</style>
