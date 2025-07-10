<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                EmployeeBuilder
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `EmployeeBuilder` is your primary tool for creating the JSON payload needed to create new Employee records with the `EmployeesService`. It simplifies the process by handling the nested JSON structure required by the Employee endpoint, including the `ContactInfo`, `FinancialSettings`, and `EmployeeSettings` objects.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builder</h2>
              <p class="text-body-1 mb-4">
                To get started, import the `EmployeeBuilder` from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Methods</h2>
                <p class="text-body-1 mb-4">
                  The builder provides dedicated methods for each section of the employee record.
                </p>

                <v-card id="status" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.status(status)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Sets the top-level status of the employee (e.g., 'Active', 'Inactive').</p>
                        <CodeSnippet :code="`builder = EmployeeBuilder().status('Active')`" />
                    </v-card-text>
                </v-card>

                <v-card id="contact_info" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.contact_info(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Sets fields within the nested `ContactInfo` object. Common fields are available as named arguments, and any others can be passed as keyword arguments (kwargs).</p>
                        <CodeSnippet :code="contactInfoExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="financial_settings" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.financial_settings(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Sets fields within the nested `FinancialSettings` object, such as payment information and GL accounts.</p>
                        <CodeSnippet :code="financialSettingsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="employee_settings" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.employee_settings(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Sets fields within the nested `EmployeeSettings` object, including organizational details like department and class.</p>
                        <CodeSnippet :code="employeeSettingsExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="to_body" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>.to_body()</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Once you have set all the required fields, call `.to_body()` to generate the final dictionary, ready to be sent as the JSON body in your API request.</p>
                        <CodeSnippet :code="toBodyExample" />
                    </v-card-text>
                </v-card>
            </section>

          </v-container>
        </v-col>

        <v-col md="3" class="d-none d-md-block">
          <OnPageNav :items="onPageNavItems" />
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

const onPageNavItems = ref([
  { id: 'introduction', title: 'Introduction' },
  { id: 'importing-helpers', title: 'Importing Builder' },
  { id: 'methods', title: 'Builder Methods' },
  { id: 'status', title: '  - status()' },
  { id: 'contact_info', title: '  - contact_info()' },
  { id: 'financial_settings', title: '  - financial_settings()' },
  { id: 'employee_settings', title: '  - employee_settings()' },
  { id: 'to_body', title: '  - to_body()' },
]);

const importingExample = ref(`
from easy_acumatica.models import EmployeeBuilder
`);

const contactInfoExample = ref(`
builder.contact_info(
    first_name="Jane",
    last_name="Doe",
    email="jane.doe@example.com",
    Title="Lead Developer"  # Passed as a kwarg
)
`);

const financialSettingsExample = ref(`
builder.financial_settings(
    ap_account="20000",
    payment_method="CHECK",
    terms="NET30"
)
`);

const employeeSettingsExample = ref(`
builder.employee_settings(
    branch_id="HEADOFFICE",
    department_id="RND",
    employee_class="EMPSALARIED"
)
`);

const toBodyExample = ref(`
# Build a complete employee payload
employee_payload = (
    EmployeeBuilder()
    .status("Active")
    .contact_info(first_name="Jane", last_name="Doe")
    .financial_settings(payment_method="DIRECT")
    .employee_settings(department_id="SUPPORT")
)

# Get the final dictionary
json_body = employee_payload.to_body()

# Use with the EmployeesService
# client.employees.create_employee("24.200.001", builder=employee_payload)
`);
</script>