<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const ui = useUiStore()

defineProps<{
  sidebarExpanded: boolean
}>()

const expandedNavigationItem = useState<string>()

const items = computed<NavigationMenuItem[]>(() =>
  [
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
    {
      label: $t('nav.settings'),
      icon: 'i-fluent:settings-24-filled',
      children: [
        {
          label: $t('nav.general'),
          icon: 'i-fluent:person-24-filled',
          to: '/settings/general',
        },
        {
          label: $t('nav.security'),
          icon: 'i-fluent:shield-24-filled',
          to: '/settings/security',
        },
      ],
    },
  ].map((item, index) => ({
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
