<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Accounts Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `AccountService` is a sub-service for managing General Ledger (GL) Accounts and Account Groups in Acumatica. It provides methods to retrieve accounts, create and manage account groups, and assign accounts to those groups.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                When querying for accounts, you may need to import the `QueryOptions` and `F` filter factory helpers.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="get_accounts" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_accounts(api_version, options=None)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves a list of GL Accounts. This method supports the full range of OData query parameters through the `QueryOptions` object, allowing for powerful and specific queries to filter, select, expand, or paginate the results.</p>
                        <CodeSnippet :code="getAccountsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="create_account_group" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>create_account_group(api_version, group_id, description)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Creates a new account group. This is useful for organizing your GL accounts into logical categories.</p>
                        <CodeSnippet :code="createAccountGroupExample" />
                    </v-card-text>
                </v-card>

                <v-card id="add_account_to_group" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>add_account_to_group(api_version, accountCD, groupID)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Assigns an existing GL Account to a specific Account Group using their respective identifiers.</p>
                        <CodeSnippet :code="addAccountToGroupExample" />
                    </v-card-text>
                </v-card>

                <v-card id="remove_account_from_group" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>remove_account_from_group(api_version, accountCD)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Removes a GL Account from its currently assigned Account Group. This is achieved by updating the account's `AccountGroup` property to `null`.</p>
                        <CodeSnippet :code="removeAccountFromGroupExample" />
                    </v-card-text>
                </v-card>

                <v-card id="set_default_account_for_group" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>set_default_account_for_group(api_version, group_id, account_id)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Specifies the default account for a given account group.</p>
                        <CodeSnippet :code="setDefaultAccountForGroupExample" />
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
  { id: 'get_accounts', title: '  - get_accounts' },
  { id: 'create_account_group', title: '  - create_account_group' },
  { id: 'add_account_to_group', title: '  - add_account_to_group' },
  { id: 'remove_account_from_group', title: '  - remove_account...' },
  { id: 'set_default_account_for_group', title: '  - set_default_account...' },
]);

const importingExample = ref(`
from easy_acumatica.models import QueryOptions, F
`);

const getAccountsExample = ref(`
# Create a filter to find all 'Asset' type accounts
options = QueryOptions(
    filter=F.Type == 'Asset',
    select=["AccountCD", "Description", "Type"]
)

# Fetch the filtered list of accounts
asset_accounts = client.accounts.get_accounts("24.200.001", options=options)
`);

const createAccountGroupExample = ref(`
# Create a new account group for long-term assets
new_group = client.accounts.create_account_group(
    "24.200.001",
    group_id="ASSET-L",
    description="Long-Term Assets"
)
`);

const addAccountToGroupExample = ref(`
# Assign an account to the newly created group
updated_account = client.accounts.add_account_to_group(
    "24.200.001",
    accountCD="170100",  # Account Identifier
    groupID="ASSET-L"    # Group Identifier
)
`);

const removeAccountFromGroupExample = ref(`
# Remove the account from any group it belongs to
updated_account = client.accounts.remove_account_from_group(
    "24.200.001",
    accountCD="170100"
)
`);

const setDefaultAccountForGroupExample = ref(`
# Set a default account for an account group
updated_group = client.accounts.set_default_account_for_group(
    "24.200.001",
    group_id="ASSET-L",
    account_id="170100"
)
`);
</script>