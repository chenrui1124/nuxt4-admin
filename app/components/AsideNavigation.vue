<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const ui = useUiStore()

defineProps<{
  sidebarExpanded: boolean
}>()

const expandedNavigationItem = useState<string>()

const items = computed<NavigationMenuItem[]>(() =>
  ui.links.map((item, index) => ({
    ...item,
    open: expandedNavigationItem.value === `item-${index}`,
  })),
)
</script>

<template>
  <UNavigationMenu
    v-model="expandedNavigationItem"
    :items
    :collapsed="!(ui.isMaxSm || sidebarExpanded)"
    orientation="vertical"
    type="single"
    popover
  />
</template>
