<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()

const layout = useLayoutStore()

const sidebarExpanded = useState(() => !layout.isMaxSm)

function toggleSidebarVisible() {
  sidebarExpanded.value = !sidebarExpanded.value
}

const sidebarToggleIcon = computed(() =>
  layout.isMaxSm
    ? sidebarExpanded.value
      ? 'i-fluent:dismiss-24-regular'
      : 'i-fluent:list-24-regular'
    : sidebarExpanded.value
      ? 'i-fluent:panel-left-24-filled'
      : 'i-fluent:panel-left-24-regular',
)

const SIDEBAR_WIDTH = '15rem'

defineShortcuts({
  ctrl_b: () => toggleSidebarVisible(),
})

const breadcrumbItems = computed((): BreadcrumbItem[] => {
  const items = (route.meta.i18nKeys ?? []).map(key => ({ label: $t(key) }))
  return layout.isMaxSm ? [items.at(-1)!] : items
})
</script>

<template>
  <div
    style="
      grid-template-areas:
        'aside header'
        'aside main';
    "
    :style="{
      gridTemplateColumns:
        layout.isMaxSm || sidebarExpanded ? `${SIDEBAR_WIDTH} 1fr` : '3.5rem 1fr',
    }"
    :class="[
      'h-screen w-screen',
      layout.isMaxSm
        ? 'flex flex-col'
        : '-ml-px grid grid-rows-[min-content_1fr] transition-[grid-template-columns] duration-300 ease-in-out',
    ]"
  >
    <header
      style="grid-area: header"
      class="flex h-14 items-center gap-3 border-b border-b-accented px-3"
    >
      <UTooltip
        arrow
        :content="{ sideOffset: 3 }"
        :disabled="layout.isMaxSm"
        :kbds="['Ctrl', 'B']"
        :text="sidebarExpanded ? $t('ui.collapse_sidebar') : $t('ui.expand_sidebar')"
      >
        <UButton @click="toggleSidebarVisible()" :icon="sidebarToggleIcon" variant="ghost" />
      </UTooltip>
      <UBreadcrumb
        :items="breadcrumbItems"
        separator-icon="i-material-symbols:chevron-right"
        :ui="{ link: 'font-normal' }"
      />
      <LocaleSelect />
      <ColorModeSwitch />
      <AdminUserMenu />
    </header>
    <aside
      style="grid-area: aside"
      :class="[
        'overflow-y-auto',
        layout.isMaxSm
          ? ['fixed inset-x-0 top-14 bottom-0 z-10 bg-default', sidebarExpanded || 'hidden']
          : 'overflow-x-hidden border-r border-r-accented bg-elevated/15',
      ]"
    >
      <div
        :style="{ minWidth: sidebarExpanded ? SIDEBAR_WIDTH : '3.5rem' }"
        :class="['flex flex-col gap-3 overflow-x-hidden overflow-y-auto p-3']"
      >
        <AdminBrand :sidebar-expanded />
        <AdminCommandPalette :sidebar-expanded />
        <AdminNavigation :sidebar-expanded />
      </div>
    </aside>
    <main style="grid-area: main" :class="['overflow-y-auto', layout.isMaxSm && 'flex-1']">
      <slot></slot>
    </main>
  </div>
</template>
