<script lang="ts" setup>
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui'

defineProps<{
  sidebarExpanded: boolean
}>()

const modalVisible = ref(false)

defineShortcuts({
  'ctrl_/': () => (modalVisible.value = true),
})

const colorMode = useColorMode()

const layout = useLayoutStore()

const groups = computed<CommandPaletteGroup[]>(() => [
  {
    id: 'navigation',
    label: $t('ui.navigation'),
    items: [...layout.topLinks, ...layout.bottomLinks],
  },
  {
    id: 'color_mode',
    label: $t('ui.color_mode'),
    items: layout.colorModes.map<CommandPaletteItem>(({ icon, label, preference }) => ({
      icon,
      label,
      active: preference === colorMode.preference,
      onSelect() {
        colorMode.preference = preference
        modalVisible.value = false
      },
    })),
    ignoreFilter: true,
  },
])
</script>

<template>
  <UModal v-model:open="modalVisible">
    <UDashboardSearchButton
      :collapsed="!sidebarExpanded"
      icon="i-fluent:search-24-regular"
      :kbds="['ctrl', '/']"
      :label="$t('ui.search')"
    />
    <template #content="{ close }">
      <UCommandPalette
        :close="{ onClick: close }"
        :groups
        :placeholder="$t('ui.type_command')"
        :ui="{ label: 'font-normal' }"
      />
    </template>
  </UModal>
</template>
