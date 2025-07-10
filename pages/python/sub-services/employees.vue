<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Employees Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `EmployeesService` is your primary tool for creating and retrieving Employee records, as well as managing their associated payroll classes and settings.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To create employees and their related settings, you will need to import the relevant builders from the `easy_acumatica.models` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="get_employees" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_employees(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This is the main method for fetching a list of employee records. It can be used to get all employees or a filtered, specific list by using `QueryOptions`.</p>
                        <CodeSnippet :code="getEmployeesExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_employee" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_employee(api_version, builder, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Use this method to create a new employee record. You must provide an `EmployeeBuilder` object containing the new employee's details. The builder helps construct the required nested JSON structure for contact info, employee settings, and financial settings.</p>
                        <CodeSnippet :code="createEmployeeExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_employee_payroll_class" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_employee_payroll_class(api_version, builder)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new employee payroll class, which acts as a template for payroll settings that can be applied to multiple employees.</p>
                        <CodeSnippet :code="createPayrollClassExample" />
                    </v-card-text>
                </v-card>

                <v-card id="update_employee_payroll_settings" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>update_employee_payroll_settings(api_version, builder, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Updates the payroll settings for a specific employee. This is used to assign a payroll class, set payment methods, define work locations, and more.</p>
                        <CodeSnippet :code="updatePayrollSettingsExample" />
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
  { id: 'importing-helpers', title: 'Importing Helpers' },
  { id: 'methods', title: 'Service Methods' },
  { id: 'get_employees', title: '  - get_employees' },
  { id: 'create_employee', title: '  - create_employee' },
  { id: 'create_employee_payroll_class', title: '  - create_payroll_class' },
  { id: 'update_employee_payroll_settings', title: '  - update_payroll_settings' },
]);

const importingExample = ref(`
from easy_acumatica.models import (
    EmployeeBuilder,
    EmployeePayrollClassBuilder,
    EmployeePayrollSettingsBuilder,
    QueryOptions,
    F
)
`);

const getEmployeesExample = ref(`
# Create a filter to find a specific employee
employee_filter = F.EmployeeID == 'EP00000001'

# Use QueryOptions to expand all related settings objects
opts = QueryOptions(
    filter=employee_filter,
    expand=["ContactInfo", "EmployeeSettings", "FinancialSettings"]
)

# Fetch the employee data
employees = client.employees.get_employees("24.200.001", options=opts)
`);

const createEmployeeExample = ref(`
# Build the employee payload using the fluent builder
employee_payload = (
    EmployeeBuilder()
    .status("Active")
    .contact_info(first_name="Jane", last_name="Doe")
    .employee_settings(branch_id="HEADOFFICE", department_id="SALES")
    .financial_settings(payment_method="CHECK")
)

# Create the employee
new_employee = client.employees.create_employee(
    "24.200.001", 
    builder=employee_payload
)
`);

const createPayrollClassExample = ref(`
# Build the payload for a new payroll class
payroll_class_payload = (
    EmployeePayrollClassBuilder()
    .employee_payroll_class_id("SALARIED")
    .description("Salaried Employees, Bi-Weekly")
    .payroll_defaults(EmployeeType="Salaried", PayGroup="BIWEEKLY")
)

# Create the payroll class
new_class = client.employees.create_employee_payroll_class(
    "24.200.001",
    builder=payroll_class_payload
)
`);

const updatePayrollSettingsExample = ref(`
# Build the payload to update a specific employee's payroll settings
payroll_settings_payload = (
    EmployeePayrollSettingsBuilder()
    .employee_id("EP00000004")
    .class_id("SALARIED")
    .payment_method("DIRECT")
    .cash_account("10200")
)

# Update the employee's payroll settings
updated_settings = client.employees.update_employee_payroll_settings(
    "24.200.001",
    builder=payroll_settings_payload
)
`);
</script>