<script lang="ts" setup>
const { selectedCount = 0, totalCount = 0 } = defineProps<{
  selectedCount: number | undefined
  totalCount: number | undefined
}>()

const layout = useLayoutStore()
</script>

<template>
  <span v-if="selectedCount && !layout.isMaxSm" class="ml-px text-sm/normal text-muted">
    {{ $t('admin.selection_count', { selectedCount, totalCount }) }}
  </span>
</template>
