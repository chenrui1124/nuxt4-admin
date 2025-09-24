<script lang="ts" setup>
defineProps<{
  sidebarExpanded: boolean
}>()
</script>

<template>
  <div
    :class="[
      '-mb-px flex h-11 items-center gap-3 select-none max-sm:mx-auto',
      sidebarExpanded ? 'px-1.75' : 'px-1',
    ]"
  >
    <UIcon name="i-material-symbols:view-kanban-rounded" size="24" class="shrink-0 text-primary" />
    <span v-if="sidebarExpanded" class="flex-1 text-lg/none font-medium text-default">
      Nuxt4 Admin
    </span>
  </div>
</template>
