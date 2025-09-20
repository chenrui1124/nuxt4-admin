<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Table } from '@tanstack/vue-table'

const { tableApi } = defineProps<{
  tableApi: Table<any> | undefined
}>()

const items = computed<DropdownMenuItem[]>(
  () =>
    tableApi
      ?.getAllColumns()
      .filter(col => col.getCanHide())
      .map<DropdownMenuItem>(col => ({
        label: $t(`admin.${col.id}`),
        type: 'checkbox',
        checked: col.getIsVisible(),
        onUpdateChecked: (checked: boolean) =>
          tableApi.getColumn(col.id)?.toggleVisibility(!!checked),
        onSelect: event => event.preventDefault(),
      })) ?? [],
)
</script>

<template>
  <UDropdownMenu :content="{ align: 'end' }" :items>
    <UButton
      color="neutral"
      trailing-icon="i-fluent:layout-column-four-focus-right-24-filled"
      variant="outline"
    >
      {{ $t('admin.display_columns') }}
    </UButton>
  </UDropdownMenu>
</template>
