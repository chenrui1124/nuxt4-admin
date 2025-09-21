<script lang="ts" setup>
definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.settings', 'nav.security'],
})

useHead({
  title: () => $t('nav.security'),
})
</script>

<template>
  <NuxtLayout name="admin">
    <UPageList class="mx-auto w-lg max-w-full gap-6 p-6">
      <SettingsUpdatePassword />
      <SettingsDeleteAccount />
    </UPageList>
  </NuxtLayout>
</template>
