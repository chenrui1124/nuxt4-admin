<script lang="ts" setup>
definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.settings', 'nav.security'],
})
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex flex-col gap-6 p-6">
      <UpdatePassword />
    </div>
  </NuxtLayout>
</template>
