<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const layout = useLayoutStore()

defineProps<{
  sidebarExpanded: boolean
}>()

const expandedNavigationItem = useState<string>()

const items = computed<NavigationMenuItem[]>(() =>
  layout.links.map((item, index) => ({
    ...item,
    open: expandedNavigationItem.value === `item-${index}`,
  })),
)
</script>

<template>
  <UNavigationMenu
    v-model="expandedNavigationItem"
    :items
    :collapsed="!(layout.isMaxSm || sidebarExpanded)"
    orientation="vertical"
    type="single"
    popover
  />
</template>
