<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Code Builders
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                This guide covers the payload builders for creating payroll-related "Code" entities in Acumatica, such as Deduction/Benefit codes and Earning Type codes. These builders are used with the `CodesService`.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing the Builders</h2>
              <p class="text-body-1 mb-4">
                The builders for payroll codes are located in the `easy_acumatica.models.code_builder` module.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="builders" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Builder Classes</h2>

                <v-card id="deduction-benefit-code-builder" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>DeductionBenefitCodeBuilder</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This builder constructs the payload for creating a new Deduction or Benefit code. It provides methods to set all the necessary fields, including nested objects for GL accounts and employee deduction settings.</p>
                        <CodeSnippet :code="deductionExample" />
                    </v-card-text>
                </v-card>

                <v-card id="earning-type-code-builder" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>EarningTypeCodeBuilder</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This builder constructs the payload for a new Earning Type code, which defines different types of employee compensation (e.g., regular wage, overtime, bonus).</p>
                        <CodeSnippet :code="earningExample" />
                    </v-card-text>
                </v-card>

                <v-card id="payroll-wcc-code-builder" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>PayrollWCCCodeBuilder</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This builder is used to define Workers' Compensation Class Codes. Its structure is slightly different, as it involves setting a country and then adding one or more WCC codes to a list.</p>
                        <CodeSnippet :code="wccExample" />
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
  { id: 'builders', title: 'Builder Classes' },
  { id: 'deduction-benefit-code-builder', title: '  - DeductionBenefitCode' },
  { id: 'earning-type-code-builder', title: '  - EarningTypeCode' },
  { id: 'payroll-wcc-code-builder', title: '  - PayrollWCCCode' },
]);

const importingExample = ref(`
from easy_acumatica.models.code_builder import (
    DeductionBenefitCodeBuilder,
    EarningTypeCodeBuilder,
    PayrollWCCCodeBuilder,
)
`);

const deductionExample = ref(`
# Build the payload for a new 401k deduction code
deduction_payload = (
    DeductionBenefitCodeBuilder()
    .code_id("401K")
    .description("Employee 401k Contribution")
    .contribution_type("DED")  # 'DED' for Deduction, 'BEN' for Benefit
    .active(True)
    .employee_deduction(calculation_method="GRS", percent=5.0)
    .gl_accounts(deduction_liability_account="210100")
)

# Use the builder with the CodesService
# new_code = client.codes.create_deduction_benefit_code("24.200.001", builder=deduction_payload)
`);

const earningExample = ref(`
# Build the payload for an Overtime earning type
earning_payload = (
    EarningTypeCodeBuilder()
    .code_id("OT")
    .description("Overtime Hourly")
    .category("Wage")
    .accrue_time_off(True)
    .active(True)
)

# Use the builder with the CodesService
# new_earning_type = client.codes.create_earning_type_code("24.200.001", builder=earning_payload)
`);

const wccExample = ref(`
# Build the payload for US-based WCC codes
wcc_payload = (
    PayrollWCCCodeBuilder()
    .country("US")
    .add_wcc_code(wcc_code="8810", description="Clerical Office Employees")
    .add_wcc_code(wcc_code="7219", description="Trucking and Hauling")
)

# Use the builder with the CodesService
# new_wcc_codes = client.codes.create_payroll_wcc_code("24.200.001", builder=wcc_payload)
`);
</script>