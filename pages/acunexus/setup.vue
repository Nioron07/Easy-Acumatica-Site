<template>
  <div class="acunexus-setup-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" lg="10" class="text-center">
            <div class="hero-content">
              <h1 class="hero-title">Setup & Installation</h1>
              <p class="hero-subtitle">Get AcuNexus up and running in minutes</p>
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
                  This guide covers running AcuNexus locally for development and testing purposes.
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
                <p>Before installing AcuNexus, ensure you have the following:</p>
                <ul>
                  <li><strong>Docker</strong> and <strong>Docker Compose</strong> installed on your system</li>
                  <li><strong>Git</strong> for cloning the repository</li>
                  <li><strong>Python 3.x</strong> (for generating encryption keys)</li>
                  <li>At least <strong>2GB RAM</strong> and <strong>5GB disk space</strong></li>
                  <li>Access to one or more Acumatica instances with REST API enabled</li>
                </ul>

                <v-alert type="info" variant="tonal" class="mt-4">
                  <strong>Note:</strong> AcuNexus runs entirely in Docker containers, making installation consistent across Windows, macOS, and Linux.
                </v-alert>
              </section>

              <!-- Clone Repository -->
              <section id="clone" class="doc-section">
                <h2>1. Clone Repository</h2>
                <p>First, clone the AcuNexus repository from GitHub:</p>
                <CodeSnippet :code="cloneCode" language="bash" />
                <p class="mt-4">Navigate into the project directory:</p>
                <CodeSnippet :code="cdCode" language="bash" />
              </section>

              <!-- Environment Configuration -->
              <section id="configuration" class="doc-section">
                <h2>2. Configure Environment</h2>
                <p>AcuNexus requires environment variables for configuration. Start by copying the example environment file:</p>
                <CodeSnippet :code="copyEnvCode" language="bash" />

                <h3 class="mt-6">Generate Encryption Keys</h3>
                <p>AcuNexus uses encryption to securely store Acumatica credentials. Generate the required encryption key using Python:</p>
                <CodeSnippet :code="generateKeyCode" language="bash" />

                <h3 class="mt-6">Update .env File</h3>
                <p>Open the <code>.env</code> file and update the following required variables:</p>
                <CodeSnippet :code="envExample" language="bash" />

                <v-alert type="warning" variant="tonal" class="mt-4">
                  <strong>Security Warning:</strong> Keep your <code>.env</code> file secure and never commit it to version control. The encryption key protects sensitive Acumatica credentials stored in the database.
                </v-alert>

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
              </section>

              <!-- Build and Start Services -->
              <section id="start" class="doc-section">
                <h2>3. Start Services</h2>
                <p>With configuration complete, build and start all AcuNexus services using Docker Compose:</p>
                <CodeSnippet :code="dockerUpCode" language="bash" />

                <p class="mt-4">This command will:</p>
                <ul>
                  <li>Build the frontend (Vue 3) and backend (Flask) containers</li>
                  <li>Start a PostgreSQL database container</li>
                  <li>Initialize the database schema</li>
                  <li>Start all services in detached mode</li>
                </ul>

                <h3 class="mt-6">Verify Services</h3>
                <p>Check that all services are running correctly:</p>
                <CodeSnippet :code="dockerPsCode" language="bash" />

                <p class="mt-4">You should see three containers running:</p>
                <ul>
                  <li><code>acunexus-frontend</code> - Vue.js web interface</li>
                  <li><code>acunexus-backend</code> - Flask API server</li>
                  <li><code>acunexus-db</code> - PostgreSQL database</li>
                </ul>

                <v-alert type="success" variant="tonal" class="mt-4">
                  <strong>Tip:</strong> Initial startup may take 2-3 minutes as containers build and the database initializes. Subsequent starts will be much faster.
                </v-alert>
              </section>

              <!-- Access Application -->
              <section id="access" class="doc-section">
                <h2>4. Access Application</h2>
                <p>Once all services are running, open your web browser and navigate to:</p>

                <v-card class="url-card" elevation="2">
                  <v-card-text class="text-center py-6">
                    <v-icon icon="mdi-open-in-new" size="32" color="deep-purple" class="mb-3" />
                    <h3 class="text-h5 mb-2">
                      <a href="http://localhost:8080" target="_blank" class="url-link">
                        http://localhost:8080
                      </a>
                    </h3>
                    <p class="text-body-2 text-grey-darken-1 mb-0">Default AcuNexus web interface</p>
                  </v-card-text>
                </v-card>

                <p class="mt-4">You should see the AcuNexus welcome page. You're now ready to add your first Acumatica client!</p>

                <v-alert type="info" variant="tonal" class="mt-4">
                  <strong>Next Steps:</strong> Head to the <NuxtLink to="/acunexus/clients">Client Management</NuxtLink> guide to learn how to connect your first Acumatica instance.
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
                <p>To stop all AcuNexus services:</p>
                <CodeSnippet :code="stopCode" language="bash" />

                <h3 class="mt-6">Restart Services</h3>
                <p>To restart services after stopping:</p>
                <CodeSnippet :code="restartCode" language="bash" />

                <h3 class="mt-6">Remove Services</h3>
                <p>To completely remove all containers and volumes (including database data):</p>
                <CodeSnippet :code="removeCode" language="bash" />

                <v-alert type="error" variant="tonal" class="mt-4">
                  <strong>Warning:</strong> The <code>--volumes</code> flag will delete all database data including saved clients and endpoints. Only use this if you want to completely reset AcuNexus.
                </v-alert>
              </section>

              <!-- Next Steps -->
              <section id="next-steps" class="doc-section">
                <h2>Next Steps</h2>
                <p>Now that AcuNexus is installed, you're ready to explore its features:</p>
                <v-row class="mt-4">
                  <v-col cols="12" md="6">
                    <v-card class="next-step-card" elevation="2" to="/acunexus/clients">
                      <v-card-text>
                        <v-icon icon="mdi-server-network" size="32" color="deep-purple" class="mb-3" />
                        <h3 class="text-h6 mb-2">Client Management</h3>
                        <p class="text-body-2">Connect your first Acumatica instance</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card class="next-step-card" elevation="2" to="/acunexus/services">
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
import DocScreenshot from '~/components/DocScreenshot.vue';
import OnPageNav from '~/components/OnPageNav.vue';

// Navigation items
const navItems = ref([
  { id: 'prerequisites', title: 'Prerequisites', icon: 'mdi-clipboard-list' },
  { id: 'clone', title: 'Clone Repository', icon: 'mdi-git' },
  { id: 'configuration', title: 'Configure Environment', icon: 'mdi-file-cog' },
  { id: 'start', title: 'Start Services', icon: 'mdi-rocket-launch' },
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
  { name: 'FLASK_ENV', description: 'Flask environment (production/development)', required: false },
]);

// Common issues
const commonIssues = ref([
  {
    icon: 'mdi-alert-circle',
    title: 'Port Already in Use',
    problem: 'Docker reports that port 8080 is already in use.',
    solution: 'Either stop the service using port 8080, or modify the port mapping in docker-compose.yml to use a different port (e.g., 8081:8080).',
    code: null,
  },
  {
    icon: 'mdi-database-alert',
    title: 'Database Connection Failed',
    problem: 'Backend cannot connect to PostgreSQL database.',
    solution: 'Ensure the database container is running and credentials in .env match those in docker-compose.yml. Wait a few seconds for the database to fully initialize.',
    code: 'docker compose logs db',
  },
  {
    icon: 'mdi-key-alert',
    title: 'Invalid Encryption Key',
    problem: 'Application fails to start with encryption key error.',
    solution: 'Regenerate the encryption key using the Python command and ensure it\'s properly set in the .env file without extra spaces or quotes.',
    code: 'python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"',
  },
  {
    icon: 'mdi-docker',
    title: 'Docker Build Fails',
    problem: 'Docker containers fail to build with dependency errors.',
    solution: 'Ensure you have a stable internet connection and try rebuilding with the --no-cache flag.',
    code: 'docker compose build --no-cache',
  },
]);

// Code snippets
const cloneCode = ref(`git clone https://github.com/Nioron07/AcuNexus.git`);

const cdCode = ref(`cd AcuNexus`);

const copyEnvCode = ref(`# Copy environment template
cp .env.example .env`);

const generateKeyCode = ref(`# Generate encryption key
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"`);

const envExample = ref(`# Database Configuration
POSTGRES_DB=acunexus
POSTGRES_USER=acunexus
POSTGRES_PASSWORD=your-secure-password-here

# Encryption (REQUIRED - Generate using the Python command above)
ENCRYPTION_KEY=your-generated-fernet-key-here

# Flask Configuration
SECRET_KEY=your-secret-key-here
FLASK_ENV=production`);

const dockerUpCode = ref(`# Build and start all services
docker compose up -d`);

const dockerPsCode = ref(`# Check status
docker compose ps`);

const logsCode = ref(`# View all logs
docker compose logs`);

const specificLogsCode = ref(`# View logs for a specific service
docker compose logs backend
docker compose logs frontend
docker compose logs db`);

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
  title: 'Setup & Installation | AcuNexus Documentation',
  description: 'Complete guide to installing and configuring AcuNexus, the self-hosted Acumatica management platform.',
});
</script>

<style scoped>
.acunexus-setup-page {
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
