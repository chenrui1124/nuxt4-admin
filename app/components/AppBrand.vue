<script lang="ts" setup>
defineProps<{
  sidebarExpanded: boolean
}>()
</script>

<template>
  <div
    :class="[
      '-mb-px flex h-11 items-center gap-3 select-none',
      sidebarExpanded ? 'px-1.75' : 'px-1',
    ]"
  >
    <UIcon name="i-fluent-color:apps-48" size="24" class="shrink-0" />
    <span v-if="sidebarExpanded" class="flex-1 font-medium text-default/75">Nuxt4 Admin</span>
  </div>
</template>
