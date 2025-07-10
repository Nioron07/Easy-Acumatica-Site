<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Actions Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `ActionsService` is used to execute business logic actions on Acumatica records, such as "Confirm Shipment," "Release from Hold," or other custom actions defined in your instance. This service is the key to automating processes that would normally require user interaction in the Acumatica UI.
              </p>
            </section>

            <section id="importing-helpers" class="mb-12">
              <h2 class="text-h4 font-weight-medium mb-4">Importing Helpers</h2>
              <p class="text-body-1 mb-4">
                To identify the record on which to perform an action, you will typically use the `RecordBuilder`.
              </p>
              <CodeSnippet :code="importingExample" />
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="execute_action" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>execute_action(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method is for standard, straightforward actions that may have simple, flat parameters. It's the most common way to trigger business logic.</p>
                        <h4 class="text-h6 mt-4 mb-2">Example 1: Action with No Parameters</h4>
                        <p class="mb-4">Reopening a Sales Order requires identifying the order by its key fields but needs no extra parameters.</p>
                        <CodeSnippet :code="executeActionExample1" />
                        
                        <h4 class="text-h6 mt-6 mb-2">Example 2: Action with Simple Parameters</h4>
                        <p class="mb-4">Changing a Business Account ID requires identifying the account to change and providing the new ID as a simple parameter.</p>
                        <CodeSnippet :code="executeActionExample2" />
                    </v-card-text>
                </v-card>

                <v-card id="execute_custom_action" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>execute_custom_action(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">This method is for more complex actions that would typically open a dialog box in the UI and require nested parameters. The structure of the `custom_parameters` dictionary must exactly match the structure Acumatica expects for the dialog box.</p>
                        <h4 class="text-h6 mt-4 mb-2">Example: Closing a Case with a Reason</h4>
                        <p class="mb-4">This action requires a `Reason` parameter, which is defined in the `FilterPreview` view within the UI dialog. We replicate this structure in our `custom_parameters`.</p>
                        <CodeSnippet :code="executeCustomActionExample" />
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
  { id: 'execute_action', title: '  - execute_action' },
  { id: 'execute_custom_action', title: '  - execute_custom_action' },
]);

const importingExample = ref(`
from easy_acumatica.models import RecordBuilder
`);

const executeActionExample1 = ref(`
# 1. Identify the Sales Order by its key fields
order_to_reopen = RecordBuilder().field("OrderType", "SO").field("OrderNbr", "000001")

# 2. Execute the action
client.actions.execute_action(
    api_version="24.200.001",
    entity_name="SalesOrder",
    action_name="ReopenSalesOrder",
    entity=order_to_reopen
)
`);

const executeActionExample2 = ref(`
# 1. Identify the Business Account to change
account_to_change = RecordBuilder().field("BusinessAccountID", "CANDYY")

# 2. Define the action's parameters
new_id_params = {"BusinessAccountID": "CANDYYY"}

# 3. Execute the action
client.actions.execute_action(
    api_version="24.200.001",
    entity_name="BusinessAccount",
    action_name="ChangeBusinessAccountID",
    entity=account_to_change,
    parameters=new_id_params
)
`);

const executeCustomActionExample = ref(`
# 1. Identify the Case by its ID
case_to_close = RecordBuilder().field("id", "e3f46a39-1a14-e911-816f-bc920a5e0ac8")

# 2. Define the nested custom parameters
# The structure must match what Acumatica expects for the dialog box.
close_params = {
    "FilterPreview": {
        "Reason": {
            "type": "CustomStringField",
            "value": "Abandoned"
        }
    }
}

# 3. Execute the custom action
client.actions.execute_custom_action(
    api_version="24.200.001",
    entity_name="Case",
    action_name="Close",
    entity=case_to_close,
    custom_parameters=close_params
)
`);
</script>