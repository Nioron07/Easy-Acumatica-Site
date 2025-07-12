<template>
  <div style="font-family: sans-serif; display: flex; flex-direction: column; justify-content: space-between; width: 1200px; height: 630px; padding: 60px; background-color: #f1f5f9;">
    <div style="display: flex; flex-direction: column;">
      <h1 style="font-size: 64px; color: #0d47a1; margin-bottom: 20px;">
        {{ title || 'Easy-Acumatica Docs' }}
      </h1>
      <p style="font-size: 32px; color: #475569; line-height: 1.5;">
        {{ description }}
      </p>
    </div>
    <div style="display: flex; align-items: center;">
      <img src="../../assets/OGFullLogo.png" width="1280" height="640" style="margin-right: 20px;" />
      <div style="font-size: 28px; color: #1e293b; font-weight: bold;">
        easyacumatica.com
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
})
</script>