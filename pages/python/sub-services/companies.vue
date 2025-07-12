<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Companies Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `CompaniesService` is a specialized service for retrieving your organization's structure, including all companies and their associated branches. This is useful for administrative tasks or for integrations that need to be aware of the multi-company or multi-branch setup within your Acumatica instance.
              </p>
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Method</h2>

                <v-card id="get_structure" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_structure(api_version)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method retrieves a complete list of companies and their branches. It handles the API request to the `/CompaniesStructure` endpoint, automatically expands the `Results` field, and returns it directly as a list of dictionaries.</p>
                        <CodeSnippet :code="getStructureExample" />
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
useSeoMeta({
  title: 'Companies Service | Acumatica Organization Structure API',
  description: 'Retrieve your Acumatica organization\'s complete company and branch structure programmatically using the Easy-Acumatica CompaniesService.',
  ogTitle: 'Acumatica Companies Service - Easy-Acumatica Docs',
  ogDescription: 'A guide to fetching your Acumatica company and branch hierarchy using the Easy-Acumatica API wrapper.',
  ogImage: '/public/social-images/home.png', // Uses the dynamically generated OG image
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Company & Branch API',
  twitterDescription: 'Access your Acumatica organizational structure with the Easy-Acumatica CompaniesService.',
  twitterImage: '/public/social-images/home.png', // Uses the dynamically generated OG image
});

defineOgImage({
  title: 'Acumatica Companies Service',
  description: 'Retrieve your organization\'s company and branch structure with Easy-Acumatica.',
});
const onPageNavItems = ref([
  { id: 'introduction', title: 'Introduction' },
  { id: 'methods', title: 'Service Method' },
  { id: 'get_structure', title: '  - get_structure' },
]);

const getStructureExample = ref(`
# 1. Call the get_structure method
company_hierarchy = client.companies.get_structure("24.200.001")

# 2. Process and display the results
print("--- Acumatica Company Hierarchy ---")
for company in company_hierarchy:
    company_id = company.get('CompanyID', {}).get('value', 'N/A')
    print(f"\\nCompany: {company_id}")

    branches = company.get('Branches', [])
    if not branches:
        print("  - No branches found for this company.")
        continue

    for branch in branches:
        branch_id = branch.get('BranchID', {}).get('value', 'N/A')
        print(f"  - Branch: {branch_id}")
`);
</script>