<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
            <section id="introduction" class="mb-12">
            <h1 class="text-h3 text-primary font-weight-bold">
              AcumaticaClient
            </h1>
            <div class="text-h6 text-grey-darken-1 font-weight-medium mt-2">
              Version v0.3.6
            </div>
            <p class="mt-4 text-body-1" style="max-width: 800px;">
              The `AcumaticaClient` is the core of the package. It's the primary object you'll interact with to manage sessions, access API services, and configure connection behavior. This page provides an in-depth guide to every aspect of the client.
            </p>
          </section>

            <section id="initialization" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Initialization</h2>
              <p class="text-body-1 mb-4">
                Instantiate the `AcumaticaClient` with your ERP credentials. By default, the client logs in immediately upon creation. Below is a breakdown of every parameter you can use.
              </p>

              <v-card id="param-base_url" class="mb-6" variant="outlined">
                <v-card-title><code>base_url</code></v-card-title>
                <v-card-text>
                  <p class="mb-3"><b>Type:</b> <code>str</code> | <b>Required</b></p>
                  <p>This is the root URL of your Acumatica ERP instance. It should not include a trailing slash.</p>
                  <CodeSnippet :code="`client = AcumaticaClient(base_url='https://my-erp.acumatica.com', ...)`" />
                </v-card-text>
              </v-card>

              <v-card id="param-credentials" class="mb-6" variant="outlined">
                <v-card-title><code>username, password, tenant, branch</code></v-card-title>
                <v-card-text>
                  <p class="mb-3"><b>Type:</b> <code>str</code> | <b>Required</b></p>
                  <p>These are your standard Acumatica login credentials. Ensure the user has the necessary API access rights.</p>
                  <CodeSnippet :code="`client = AcumaticaClient(\n    username='api-user',\n    password='YourPassword',\n    tenant='YourCompanyTenant',\n    branch='MAINBRANCH',\n    ...\n)`" />
                </v-card-text>
              </v-card>

              <v-card id="param-persistent_login" class="mb-6" variant="outlined">
                <v-card-title><code>persistent_login</code></v-card-title>
                <v-card-text>
                  <p class="mb-3"><b>Type:</b> <code>bool</code> | <b>Default:</b> <code>True</code></p>
                  <p>This parameter controls the session lifecycle. When `True`, the client logs in once upon creation and registers an automatic logout for when your script exits. This is efficient for scripts making multiple API calls. When `False`, the client will perform a login before and a logout after every single API call, which is less efficient but can be useful in certain serverless or stateless environments.</p>
                  <CodeSnippet :code="`# For long-running scripts (recommended)\nclient = AcumaticaClient(persistent_login=True, ...)\n\n# For single-use or stateless functions\nclient_stateless = AcumaticaClient(persistent_login=False, ...)`" />
                </v-card-text>
              </v-card>

              <v-card id="param-retry" class="mb-6" variant="outlined">
                <v-card-title><code>retry_on_idle_logout</code></v-card-title>
                <v-card-text>
                  <p class="mb-3"><b>Type:</b> <code>bool</code> | <b>Default:</b> <code>True</code></p>
                  <p>If your script is idle for longer than the server's session timeout, your next API call will fail with a `401 Unauthorized` error. When this parameter is `True`, the client will automatically detect this specific error, re-authenticate, and retry the failed API call one time. This adds significant resiliency to long-running applications.</p>
                  <CodeSnippet :code="`# A resilient client that can recover from session timeouts\nclient = AcumaticaClient(retry_on_idle_logout=True, ...)`" />
                </v-card-text>
              </v-card>
            </section>
            
            <section id="sub-services" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Sub-Services</h2>
                <p class="text-body-1 mb-4">
                    Access Acumatica endpoints through typed sub-services attached directly to the client instance. This provides a clean, object-oriented way to organize your API calls.
                </p>
                <CodeSnippet :code="servicesExample" />
            </section>

            <section id="get-endpoint-info" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">get_endpoint_info()</h2>
              <p class="text-body-1 mb-4">
                This utility method retrieves the Acumatica build version and a list of all available API endpoints and their versions from your instance. This is useful for discovery and ensuring compatibility.
              </p>
              <CodeSnippet :code="endpointInfoExample" />
          </section>
        </v-col>
        <v-col>
            
    
    <OnPageNav :items="onPageNavItems" class="d-none d-md-block" />
        </v-col>
      </v-row>
    </v-container>
    
    <PageFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageFooter from '~/components/PythonPageFooter.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import OnPageNav from '~/components/OnPageNav.vue';

// Data for the on-page navigation
const onPageNavItems = ref([
  { id: 'introduction', title: 'Introduction' },
  { id: 'initialization', title: 'Initialization' },
  { id: 'param-base_url', title: '  - base_url' },
  { id: 'param-credentials', title: '  - Credentials' },
  { id: 'param-persistent_login', title: '  - persistent_login' },
  { id: 'param-retry', title: '  - retry_on_idle_logout' },
  { id: 'sub-services', title: 'Sub-Services' },
  { id: 'get-endpoint-info', title: 'get_endpoint_info()' },
]);

const servicesExample = ref(`
# Fetch customers using the 'customers' service
customers = client.customers.get_customers("24.200.001")

# Create an invoice using the 'invoices' service
# new_invoice = client.invoices.create_invoice(...)
`);

const endpointInfoExample = ref(`
# Fetch endpoint information
endpoints_info = client.get_endpoint_info()

# Print the Acumatica build version
print(endpoints_info['version']['acumaticaBuildVersion'])

# List all available endpoint versions
for endpoint in endpoints_info['endpoints']:
    if endpoint['name'] == 'Default':
        print(f"Default Endpoint Version: {endpoint['version']}")
`);

</script>