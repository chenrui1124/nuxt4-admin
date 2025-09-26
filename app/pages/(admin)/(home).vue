<script lang="ts" setup>
definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.home'],
})
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex flex-col">
      <div class="p-3 md:p-6">
        <HomeStats />
      </div>
      <div class="p-3 pt-0 md:p-6 md:pt-0">
        <HomeCharts />
      </div>
    </div>
  </NuxtLayout>
</template>
