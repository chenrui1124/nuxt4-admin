<script lang="ts" setup>
definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.settings', 'nav.general'],
})

useHead({
  title: () => $t('nav.general'),
})
</script>

<template>
  <NuxtLayout name="admin">
    <!--  -->
  </NuxtLayout>
</template>
