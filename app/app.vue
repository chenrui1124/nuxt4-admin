<script lang="ts" setup>
useHead({
  titleTemplate(title) {
    return title ? `${title} - Nuxt4 Admin` : 'Nuxt4 Admin'
  },
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
