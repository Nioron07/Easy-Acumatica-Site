<template>
  <div class="orbu-setup-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Setup & Installation</h1>
              <p class="hero-subtitle">Get Orbu up and running in minutes</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-container fluid class="main-content">
      <v-container>
        <v-row>
          <v-col cols="12" md="9">
            <v-container>
              <!-- Local Development Notice -->
              <v-alert type="warning" variant="tonal" prominent class="mb-6">
                <v-alert-title class="d-flex align-center">
                  <v-icon icon="mdi-laptop" class="mr-2" />
                  Local Development Setup
                </v-alert-title>
                <p class="mt-2 mb-2">
                  This guide covers running Orbu locally for development and testing purposes.
                </p>
                <p class="mb-0">
                  <strong>For production deployment:</strong> Use a cloud service or dedicated server with proper security configurations.
                  Deploy using Docker on platforms like AWS, Azure, Google Cloud, DigitalOcean, or your own infrastructure.
                  Ensure you configure firewalls, use secure passwords, enable HTTPS, and follow production security best practices.
                </p>
              </v-alert>

              <!-- Prerequisites -->
              <section id="prerequisites" class="doc-section">
                <h2>Prerequisites</h2>
                <p>Before installing Orbu, ensure you have the following:</p>
                <ul>
                  <li><strong>Docker</strong> and <strong>Docker Compose</strong> installed on your system</li>
                  <li><strong>Git</strong> for cloning the repository</li>
                  <li><strong>Python 3.x</strong> (for generating encryption keys during manual setup)</li>
                  <li>Access to one or more Acumatica instances with REST API enabled</li>
                </ul>

                <v-alert type="info" variant="tonal" class="mt-4">
                  <strong>Note:</strong> Orbu runs entirely in Docker containers, making installation consistent across Windows, macOS, and Linux.
                </v-alert>
              </section>

              <!-- Automated Setup -->
              <section id="automated-setup" class="doc-section">
                <h2>Quick Start (Automated Setup)</h2>
                <p>The fastest way to get Orbu running is using the automated setup scripts. Choose your platform:</p>

                <v-tabs v-model="setupTab" color="deep-purple" class="mt-4">
                  <v-tab value="windows">
                    <v-icon start>mdi-microsoft-windows</v-icon>
                    Windows (PowerShell)
                  </v-tab>
                  <v-tab value="linux">
                    <v-icon start>mdi-linux</v-icon>
                    Linux / macOS
                  </v-tab>
                </v-tabs>

                <v-window v-model="setupTab" class="mt-4">
                  <v-window-item value="windows">
                    <CodeSnippet :code="automatedSetupWindows" language="powershell" />
                  </v-window-item>
                  <v-window-item value="linux">
                    <CodeSnippet :code="automatedSetupLinux" language="bash" />
                  </v-window-item>
                </v-window>

                <p class="mt-4">The setup script will automatically:</p>
                <ul>
                  <li>Check Docker and Docker Compose installation</li>
                  <li>Create <code>.env</code> file from template</li>
                  <li>Generate encryption and secret keys</li>
                  <li>Start all services</li>
                  <li>Wait for services to be healthy</li>
                </ul>

                <v-alert type="success" variant="tonal" class="mt-4">
                  <strong>That's it!</strong> Once the script completes, access Orbu at <a href="http://localhost:8080" target="_blank" class="url-link">http://localhost:8080</a>
                </v-alert>
              </section>

              <!-- Manual Setup -->
              <section id="manual-setup" class="doc-section">
                <h2>Manual Setup</h2>
                <p>If you prefer manual control or the automated script doesn't work for your environment, follow these steps:</p>

                <h3>1. Clone Repository</h3>
                <p>First, clone the Orbu repository from GitHub:</p>
                <CodeSnippet :code="cloneCode" language="bash" />

                <h3 class="mt-6">2. Configure Environment</h3>
                <p>Create your environment file and generate the required encryption keys:</p>

                <v-tabs v-model="manualTab" color="deep-purple" class="mt-4">
                  <v-tab value="windows">
                    <v-icon start>mdi-microsoft-windows</v-icon>
                    Windows (PowerShell)
                  </v-tab>
                  <v-tab value="linux">
                    <v-icon start>mdi-linux</v-icon>
                    Linux / macOS
                  </v-tab>
                </v-tabs>

                <v-window v-model="manualTab" class="mt-4">
                  <v-window-item value="windows">
                    <CodeSnippet :code="manualConfigWindows" language="powershell" />
                  </v-window-item>
                  <v-window-item value="linux">
                    <CodeSnippet :code="manualConfigLinux" language="bash" />
                  </v-window-item>
                </v-window>

                <v-alert type="warning" variant="tonal" class="mt-4">
                  <strong>Important:</strong> After running the generate_keys.py script, open the <code>.env</code> file and change <code>POSTGRES_PASSWORD</code> to a secure password of your choice.
                </v-alert>

                <h3 class="mt-6">Environment Variables</h3>
                <p>Key environment variables in your <code>.env</code> file:</p>
                <CodeSnippet :code="envExample" language="bash" />

                <h3 class="mt-6">Configuration Options</h3>
                <v-table>
                  <thead>
                    <tr>
                      <th>Variable</th>
                      <th>Description</th>
                      <th>Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="config in configOptions" :key="config.name">
                      <td><code>{{ config.name }}</code></td>
                      <td>{{ config.description }}</td>
                      <td>
                        <v-chip size="small" :color="config.required ? 'error' : 'success'" variant="flat">
                          {{ config.required ? 'Yes' : 'No' }}
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </v-table>

                <v-alert type="warning" variant="tonal" class="mt-4">
                  <strong>Security Warning:</strong> Keep your <code>.env</code> file secure and never commit it to version control. The encryption key protects sensitive Acumatica credentials stored in the database.
                </v-alert>

                <h3 class="mt-6">3. Start Services</h3>
                <p>With configuration complete, start all Orbu services using Docker Compose:</p>
                <CodeSnippet :code="dockerUpCode" language="bash" />

                <h3 class="mt-6">4. Verify Services</h3>
                <p>Check that all services are running correctly:</p>
                <CodeSnippet :code="dockerPsCode" language="bash" />

                <p class="mt-4">You should see four containers running:</p>
                <ul>
                  <li><code>orbu-nginx</code> - Nginx reverse proxy (serves frontend and routes API calls)</li>
                  <li><code>orbu-backend</code> - Flask API server</li>
                  <li><code>orbu-frontend</code> - Vue.js build container</li>
                  <li><code>orbu-postgres</code> - PostgreSQL database</li>
                </ul>

                <v-alert type="success" variant="tonal" class="mt-4">
                  <strong>Tip:</strong> Initial startup may take 2-3 minutes as containers build and the database initializes. Subsequent starts will be much faster.
                </v-alert>
              </section>

              <!-- Access Application -->
              <section id="access" class="doc-section">
                <h2>Access Application</h2>
                <p>Once all services are running, open your web browser and navigate to:</p>

                <v-card class="url-card" elevation="2">
                  <v-card-text class="text-center py-6">
                    <v-icon icon="mdi-open-in-new" size="32" color="deep-purple" class="mb-3" />
                    <h3 class="text-h5 mb-2">
                      <a href="http://localhost:8080" target="_blank" class="url-link">
                        http://localhost:8080
                      </a>
                    </h3>
                    <p class="text-body-2 text-grey-darken-1 mb-0">Default Orbu web interface</p>
                  </v-card-text>
                </v-card>

                <p class="mt-4">You should see the Orbu welcome page. You're now ready to add your first Acumatica client!</p>

                <v-alert type="info" variant="tonal" class="mt-4">
                  <strong>Next Steps:</strong> Head to the <NuxtLink to="/orbu/clients">Client Management</NuxtLink> guide to learn how to connect your first Acumatica instance.
                </v-alert>
              </section>

              <!-- Troubleshooting -->
              <section id="troubleshooting" class="doc-section">
                <h2>Troubleshooting</h2>

                <h3>View Logs</h3>
                <p>If you encounter issues, check the container logs:</p>
                <CodeSnippet :code="logsCode" language="bash" />

                <p class="mt-4">View logs for a specific service:</p>
                <CodeSnippet :code="specificLogsCode" language="bash" />

                <h3 class="mt-6">Rebuild Services</h3>
                <p>If services fail to start or behave unexpectedly, try rebuilding:</p>
                <CodeSnippet :code="rebuildCode" language="bash" />

                <h3 class="mt-6">Common Issues</h3>
                <v-expansion-panels variant="accordion">
                  <v-expansion-panel
                    v-for="issue in commonIssues"
                    :key="issue.title"
                    elevation="0"
                  >
                    <v-expansion-panel-title>
                      <v-icon :icon="issue.icon" class="mr-3" color="warning" />
                      {{ issue.title }}
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <p><strong>Problem:</strong> {{ issue.problem }}</p>
                      <p><strong>Solution:</strong> {{ issue.solution }}</p>
                      <CodeSnippet v-if="issue.code" :code="issue.code" language="bash" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <!-- Stopping and Restarting -->
              <section id="management" class="doc-section">
                <h2>Service Management</h2>

                <h3>Stop Services</h3>
                <p>To stop all Orbu services:</p>
                <CodeSnippet :code="stopCode" language="bash" />

                <h3 class="mt-6">Restart Services</h3>
                <p>To restart services after stopping:</p>
                <CodeSnippet :code="restartCode" language="bash" />

                <h3 class="mt-6">Remove Services</h3>
                <p>To completely remove all containers and volumes (including database data):</p>
                <CodeSnippet :code="removeCode" language="bash" />

                <v-alert type="error" variant="tonal" class="mt-4">
                  <strong>Warning:</strong> The <code>--volumes</code> flag will delete all database data including saved clients and endpoints. Only use this if you want to completely reset Orbu.
                </v-alert>
              </section>

              <!-- Next Steps -->
              <section id="next-steps" class="doc-section">
                <h2>Next Steps</h2>
                <p>Now that Orbu is installed, you're ready to explore its features:</p>
                <v-row class="mt-4">
                  <v-col cols="12" md="6">
                    <v-card class="next-step-card" elevation="2" to="/orbu/clients">
                      <v-card-text>
                        <v-icon icon="mdi-server-network" size="32" color="deep-purple" class="mb-3" />
                        <h3 class="text-h6 mb-2">Client Management</h3>
                        <p class="text-body-2">Connect your first Acumatica instance</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card class="next-step-card" elevation="2" to="/orbu/services">
                      <v-card-text>
                        <v-icon icon="mdi-magnify" size="32" color="deep-purple" class="mb-3" />
                        <h3 class="text-h6 mb-2">Browse Services</h3>
                        <p class="text-body-2">Explore available REST API services</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </section>
            </v-container>
          </v-col>

          <!-- Sticky Navigation -->
          <v-col cols="12" md="3" class="d-none d-md-block">
            <div class="sticky-container">
              <OnPageNav :items="navItems" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import OnPageNav from '~/components/OnPageNav.vue';

// Tab state
const setupTab = ref('windows');
const manualTab = ref('windows');

// Navigation items
const navItems = ref([
  { id: 'prerequisites', title: 'Prerequisites', icon: 'mdi-clipboard-list' },
  { id: 'automated-setup', title: 'Quick Start', icon: 'mdi-rocket-launch' },
  { id: 'manual-setup', title: 'Manual Setup', icon: 'mdi-file-cog' },
  { id: 'access', title: 'Access Application', icon: 'mdi-open-in-new' },
  { id: 'troubleshooting', title: 'Troubleshooting', icon: 'mdi-tools' },
  { id: 'management', title: 'Service Management', icon: 'mdi-cog' },
  { id: 'next-steps', title: 'Next Steps', icon: 'mdi-arrow-right' },
]);

// Configuration options table
const configOptions = ref([
  { name: 'POSTGRES_DB', description: 'PostgreSQL database name', required: true },
  { name: 'POSTGRES_USER', description: 'PostgreSQL username', required: true },
  { name: 'POSTGRES_PASSWORD', description: 'PostgreSQL password', required: true },
  { name: 'ENCRYPTION_KEY', description: 'Fernet encryption key for credential storage', required: true },
  { name: 'SECRET_KEY', description: 'Flask secret key for session management', required: true },
]);

// Common issues
const commonIssues = ref([
  {
    icon: 'mdi-alert-circle',
    title: 'Port Already in Use',
    problem: 'Docker reports that port 8080 is already in use.',
    solution: 'Either stop the service using port 8080, or modify the port mapping in docker-compose.yml to use a different port (e.g., 8081:80).',
    code: null,
  },
  {
    icon: 'mdi-database-alert',
    title: 'Database Connection Failed',
    problem: 'Backend cannot connect to PostgreSQL database.',
    solution: 'Ensure the database container is running and credentials in .env match those in docker-compose.yml. Wait a few seconds for the database to fully initialize.',
    code: 'docker compose logs postgres',
  },
  {
    icon: 'mdi-key-minus',
    title: 'Invalid Encryption Key',
    problem: 'Application fails to start with encryption key error.',
    solution: 'Regenerate the encryption key using the generate_keys.py script and ensure it\'s properly set in the .env file without extra spaces or quotes.',
    code: 'python scripts/generate_keys.py',
  },
  {
    icon: 'mdi-docker',
    title: 'Docker Build Fails',
    problem: 'Docker containers fail to build with dependency errors.',
    solution: 'Ensure you have a stable internet connection and try rebuilding with the --no-cache flag.',
    code: 'docker compose build --no-cache',
  },
]);

// Code snippets - Automated Setup
const automatedSetupWindows = ref(`# Clone repository
git clone https://github.com/Nioron07/Orbu.git
cd Orbu

# Run setup script
.\\scripts\\setup.ps1`);

const automatedSetupLinux = ref(`# Clone repository
git clone https://github.com/Nioron07/Orbu.git
cd Orbu

# Run setup script
bash scripts/setup.sh`);

// Code snippets - Manual Setup
const cloneCode = ref(`git clone https://github.com/Nioron07/Orbu.git
cd Orbu`);

const manualConfigWindows = ref(`# 1. Create environment file from template
Copy-Item .env.example .env

# 2. Generate encryption keys (saves to .env automatically)
python scripts/generate_keys.py

# 3. Edit .env and change POSTGRES_PASSWORD to a secure password`);

const manualConfigLinux = ref(`# 1. Create environment file from template
cp .env.example .env

# 2. Generate encryption keys (saves to .env automatically)
python3 scripts/generate_keys.py

# 3. Edit .env and change POSTGRES_PASSWORD to a secure password`);

const envExample = ref(`# Database
POSTGRES_DB=orbu
POSTGRES_USER=orbu
POSTGRES_PASSWORD=your-secure-password

# Encryption (REQUIRED)
ENCRYPTION_KEY=your-fernet-key

# Flask
SECRET_KEY=your-secret-key`);

const dockerUpCode = ref(`docker compose up -d`);

const dockerPsCode = ref(`docker compose ps`);

const logsCode = ref(`# View all logs
docker compose logs`);

const specificLogsCode = ref(`# View logs for a specific service
docker compose logs backend
docker compose logs nginx
docker compose logs postgres`);

const rebuildCode = ref(`# Rebuild and restart
docker compose down
docker compose up -d --build`);

const stopCode = ref(`docker compose stop`);

const restartCode = ref(`docker compose up -d`);

const removeCode = ref(`# Remove containers and volumes (deletes all data!)
docker compose down --volumes`);

definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'Setup & Installation | Orbu Documentation',
  description: 'Complete guide to installing and configuring Orbu, the self-hosted Acumatica management platform. Docker-based deployment with PostgreSQL and encrypted credential storage.',
  ogTitle: 'Orbu Setup Guide - Installation and Configuration',
  ogDescription: 'Step-by-step guide to deploy Orbu using Docker for managing multiple Acumatica ERP instances.',
  ogType: 'article',
  ogUrl: 'https://easyacumatica.com/orbu/setup',
  robots: 'index, follow',
  keywords: 'Orbu setup, Orbu installation, Docker deployment, Acumatica management, PostgreSQL, self-hosted, configuration guide'
});
</script>

<style scoped>
.orbu-setup-page {
  background: #f8f9fa;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%);
  color: white;
  padding: 4rem 0 3rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
}

/* Main Content */
.main-content {
  padding: 3rem 0;
}

.doc-section {
  margin-bottom: 4rem;
}

.doc-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #5e35b1;
}

.doc-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3949ab;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.doc-section p {
  line-height: 1.8;
  color: #333;
  margin-bottom: 1rem;
}

.doc-section ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.doc-section ul li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.doc-section code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #d63384;
}

/* URL Card */
.url-card {
  margin: 2rem 0;
  border: 2px solid #5e35b1;
  transition: all 0.3s ease;
}

.url-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.2) !important;
}

.url-link {
  color: #5e35b1;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.url-link:hover {
  color: #7e57c2;
  text-decoration: underline;
}

/* Next Step Cards */
.next-step-card {
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
}

.next-step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(94, 53, 177, 0.2) !important;
}

/* Tables */
.v-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.v-table :deep(th) {
  background: #5e35b1 !important;
  color: white !important;
  font-weight: 600;
}

.v-table :deep(code) {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

/* Expansion Panels */
.v-expansion-panels {
  margin-top: 1rem;
}

/* Tabs */
.v-tabs {
  border-radius: 8px;
  overflow: hidden;
}

/* Sticky Nav */
.sticky-container {
  position: sticky;
  top: 100px;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-section {
    padding: 3rem 0 2rem;
  }

  .main-content {
    padding: 2rem 0;
  }
}
</style>
