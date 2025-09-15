<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const ui = useUiStore()

defineProps<{
  sidebarExpanded: boolean
}>()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: $t('nav.dashboard'),
    icon: 'i-material-symbols:view-kanban-rounded',
    to: '/dashboard',
  },
  {
    label: $t('nav.permissions'),
    icon: 'i-material-symbols:shield-locked-rounded',
    children: [
      {
        label: $t('nav.roles'),
        icon: 'i-material-symbols:person-edit-rounded',
        to: '/permissions/roles',
      },
      {
        label: $t('nav.users'),
        icon: 'i-material-symbols:group-rounded',
        to: '/permissions/users',
      },
    ],
  },
])
</script>

<template>
  <UNavigationMenu
    :items
    :collapsed="!(ui.isMaxSm || sidebarExpanded)"
    orientation="vertical"
    popover
  />
</template>
