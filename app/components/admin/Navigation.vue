<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const layout = useLayoutStore()

defineProps<{
  sidebarExpanded: boolean
}>()

const expandedNavigationItem = useState<string>()

const items = computed<NavigationMenuItem[]>(() =>
  layout.topLinks.map((item, index) => ({
    ...item,
    open: expandedNavigationItem.value === `item-${index}`,
  })),
)
</script>

<template>
  <div class="flex flex-1 flex-col gap-1.5">
    <UNavigationMenu
      v-model="expandedNavigationItem"
      :items
      :collapsed="!(layout.isMaxSm || sidebarExpanded)"
      orientation="vertical"
      type="single"
      popover
    />
    <UNavigationMenu :items="layout.bottomLinks" orientation="vertical" class="mt-auto" />
  </div>
</template>
