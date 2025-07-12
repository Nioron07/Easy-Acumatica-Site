<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Employee Payroll Builders
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the builders used for creating and managing employee payroll classes and their individual settings. These builders work with the `EmployeesService`.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builders</h2>
              <p class="text-body-1 mb-4">
                To get started, import the builders from their respective modules.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="payroll-class-builder" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">EmployeePayrollClassBuilder</h2>
              <p class="text-body-1 mb-4">
                This builder constructs the payload for creating an `EmployeePayrollClass`, which acts as a template for payroll settings that can be applied to multiple employees.
              </p>
              <v-card variant="outlined">
                <v-card-text>
                  <CodeSnippet :code="payrollClassExample" />
                </v-card-text>
              </v-card>
            </section>
            
            <section id="payroll-settings-builder" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">EmployeePayrollSettingsBuilder</h2>
              <p class="text-body-1 mb-4">
                This builder constructs the payload for updating the payroll settings of a specific employee. This is used to assign a payroll class, set payment methods, define work locations, and more.
              </p>
              <v-card variant="outlined">
                <v-card-text>
                  <CodeSnippet :code="payrollSettingsExample" />
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
  { id: 'importing-helpers', title: 'Importing Builders' },
  { id: 'payroll-class-builder', title: 'EmployeePayrollClassBuilder' },
  { id: 'payroll-settings-builder', title: 'EmployeePayrollSettingsBuilder' },
]);

const importingExample = ref(`
from easy_acumatica.models.employee_payroll_class_builder import EmployeePayrollClassBuilder
from easy_acumatica.models.employee_payroll_settings_builder import EmployeePayrollSettingsBuilder
`);

const payrollClassExample = ref(`
# Build the payload for a new payroll class
payroll_class_payload = (
    EmployeePayrollClassBuilder()
    .employee_payroll_class_id("SALARIED")
    .description("Salaried Employees, Bi-Weekly")
    .payroll_defaults(EmployeeType="Salaried", PayGroup="BIWEEKLY")
    .add_pto_default(PTOBank="VACATION", EffectiveDate="2023-01-01")
)

# Use with the EmployeesService to create the class
# client.employees.create_employee_payroll_class(
#     "24.200.001", 
#     builder=payroll_class_payload
# )
`);

const payrollSettingsExample = ref(`
# Build the payload to update an employee's payroll settings
payroll_settings_payload = (
    EmployeePayrollSettingsBuilder()
    .employee_id("EP00000004")
    .class_id("SALARIED") # Assign the class created above
    .payment_method("DIRECT")
    .cash_account("10200")
    .add_employment_record(StartDate="2023-01-01", Position="Developer")
)

# Use with the EmployeesService to update the employee
# client.employees.update_employee_payroll_settings(
#     "24.200.001",
#     builder=payroll_settings_payload
# )
`);
</script>