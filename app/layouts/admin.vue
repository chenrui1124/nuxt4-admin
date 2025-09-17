<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

import { useToggle } from '@vueuse/core'

const route = useRoute()

const ui = useUiStore()

const [sidebarExpanded, toggleSidebarVisible] = useToggle(!ui.isMaxSm)

const sidebarToggleIcon = computed(() =>
  ui.isMaxSm
    ? sidebarExpanded
      ? 'i-fluent:dismiss-24-regular'
      : 'i-fluent:list-24-regular'
    : sidebarExpanded
      ? 'i-fluent:panel-left-24-filled'
      : 'i-fluent:panel-left-24-regular',
)

const sidebarWidth = '15rem'

defineShortcuts({
  ctrl_b: () => toggleSidebarVisible(),
})

const breadcrumbItems = computed((): BreadcrumbItem[] =>
  (route.meta.i18nKeys ?? []).map(key => ({ label: $t(key) })),
)
</script>

<template>
  <div
    style="
      grid-template-areas:
        'aside header'
        'aside main';
    "
    :style="{
      gridTemplateColumns: ui.isMaxSm || sidebarExpanded ? `${sidebarWidth} 1fr` : '3.5rem 1fr',
    }"
    :class="[
      'h-screen w-screen',
      ui.isMaxSm
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
        :disabled="ui.isMaxSm"
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
      <LocaleSwitcher />
      <ColorModeSwitcher />
      <UserMenu />
    </header>
    <aside
      style="grid-area: aside"
      :class="[
        'overflow-y-auto',
        ui.isMaxSm
          ? ['fixed inset-x-0 top-14 bottom-0 z-10 bg-default', sidebarExpanded || 'hidden']
          : 'overflow-x-hidden border-r border-r-accented bg-elevated/15',
      ]"
    >
      <div
        :style="{ minWidth: sidebarExpanded ? sidebarWidth : '3.5rem' }"
        :class="['flex flex-col gap-3 overflow-x-hidden overflow-y-auto p-3']"
      >
        <AsideNavigation :sidebar-expanded />
      </div>
    </aside>
    <main style="grid-area: main" :class="['overflow-y-auto', ui.isMaxSm && 'flex-1']">
      <slot></slot>
    </main>
  </div>
</template>
