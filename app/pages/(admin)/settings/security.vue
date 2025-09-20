<script lang="ts" setup>
definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.settings', 'nav.security'],
})
</script>

<template>
  <NuxtLayout name="admin">
    <UPageList class="mx-auto w-lg max-w-full gap-6 p-6">
      <UpdatePassword />
      <AccountDeletion />
    </UPageList>
  </NuxtLayout>
</template>
