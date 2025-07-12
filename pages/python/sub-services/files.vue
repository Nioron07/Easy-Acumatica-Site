<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="9">
          <v-container>
            <section id="introduction" class="mb-12">
              <h1 class="text-h3 text-primary font-weight-bold">
                Files Service
              </h1>
              <p class="mt-4 text-body-1" style="max-width: 800px;">
                The `FilesService` provides a set of tools for managing file attachments on Acumatica records. You can use it to download existing files, upload new ones, and retrieve metadata like filenames and comments.
              </p>
            </section>

            <section id="methods" class="mb-12">
                <h2 class="text-h4 font-weight-medium mb-4">Service Methods</h2>

                <v-card id="get_file" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_file(api_version, file_id)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Retrieves the raw binary content of a file using its unique `file_id` (a GUID). This is useful when you know the specific ID of the file you want to download.</p>
                        <CodeSnippet :code="getFileExample" />
                    </v-card-text>
                </v-card>

                <v-card id="attach_file_to_record" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>attach_file_to_record(href_template, filename, content, ...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Attaches a new file to an existing Acumatica record. This process involves two main steps:</p>
                        <ol class="pl-5 mb-4">
                            <li><strong>Fetch the target record:</strong> First, you need to get the record you want to attach the file to. The response for this record will contain a special `_links["files:put"]` key, which holds the unique URL template needed for the upload.</li>
                            <li><strong>Call `attach_file_to_record`:</strong> Use the template from step 1, along with the file's name and its binary content, to perform the upload.</li>
                        </ol>
                        <CodeSnippet :code="attachFileExample" />
                    </v-card-text>
                </v-card>
                
                <v-card id="get_file_comments" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>get_file_comments_by...(...)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">These helper methods retrieve a list of file metadata objects for a given record, each containing the `id`, `filename`, and `comment`. This is useful when you only need information about the files, not the files themselves. You can fetch by a record's key fields or by its internal `NoteID`.</p>
                        <CodeSnippet :code="getFileCommentsExample" />
                    </v-card-text>
                </v-card>

                <v-card id="delete_file" class="mb-8" variant="outlined">
                    <v-card-title class="text-h5"><code>delete_file(api_version, file_id)</code></v-card-title>
                    <v-card-text>
                        <p class="mb-4">Permanently deletes a file attachment from Acumatica using its unique `file_id`.</p>
                        <CodeSnippet :code="deleteFileExample" />
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
  { id: 'methods', title: 'Service Methods' },
  { id: 'get_file', title: '  - get_file' },
  { id: 'attach_file_to_record', title: '  - attach_file_to_record' },
  { id: 'get_file_comments', title: '  - get_file_comments_by...' },
  { id: 'delete_file', title: '  - delete_file' },
]);

const getFileExample = ref(`
file_id = "9be45eb7-f97d-400b-96a5-1c4cf82faa96" # The GUID of the file
file_bytes = client.files.get_file("24.200.001", file_id)

with open("downloaded_image.jpg", "wb") as f:
    f.write(file_bytes)
`);

const attachFileExample = ref(`
# 1. Fetch the record to get the upload URL template
stock_item = client.records.get_record_by_key_field(
    "24.200.001", "StockItem", "InventoryID", "ITEM001"
)
href_template = stock_item["_links"]["files:put"]

# 2. Read the local file and call the attach method
with open("product_image.png", "rb") as f:
    file_content = f.read()

client.files.attach_file_to_record(
    href_template=href_template,
    filename="product_image.png",
    content=file_content,
    comment="Main product view" # Optional
)
`);

const getFileCommentsExample = ref(`
# Get file info using the sales order's type and number
attachments = client.files.get_file_comments_by_key_field(
    "24.200.001",
    entity="SalesOrder",
    key="SO", # Order Type
    value="SO006724" # Order Number
)

for file_info in attachments:
    print(f"- {file_info['filename']}")
`);

const deleteFileExample = ref(`
# First, you need the ID of the file to delete
file_id_to_delete = "9be45eb7-f97d-400b-96a5-1c4cf82faa96"

client.files.delete_file("24.200.001", file_id_to_delete)
print(f"File {file_id_to_delete} deleted successfully.")
`);

//SEO
useSeoMeta({
  title: 'Files Service | Acumatica Attachments API',
  description: 'A guide to managing file attachments in Acumatica using the Easy-Acumatica FilesService. Learn to upload, download, and delete files.',
  ogTitle: 'Acumatica Files Service - Easy-Acumatica Docs',
  ogDescription: 'Learn how to manage file attachments programmatically with the Easy-Acumatica API wrapper.',
  ogImage: 'https://www.easyacumatica.com/social-images/home.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acumatica Files API',
  twitterDescription: 'A guide to managing file attachments with Easy-Acumatica.',
  twitterImage: 'https://www.easyacumatica.com/social-images/home.png',
});

defineOgImage({
  title: 'Acumatica Files Service',
  description: 'Upload, download, and manage file attachments using the Easy-Acumatica API wrapper.',
});

</script>