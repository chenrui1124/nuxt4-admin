<script lang="ts" setup>
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { UsersSchema } from '~~/shared/schema'

import { refDebounced } from '@vueuse/core'
import { da } from 'zod/locales'

definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.permissions', 'nav.users'],
})

/*
 * Resolve components
 */
const UAvatar = resolveComponent('UAvatar')

const UBadge = resolveComponent('UBadge')

const UButton = resolveComponent('UButton')

const UCheckbox = resolveComponent('UCheckbox')

const UDropdownMenu = resolveComponent('UDropdownMenu')

const tableRef = useTemplateRef('table')

/**
 * Pagination
 */
const page = ref<number>(1)

const limit = ref<number>(30)

/*
 * Filter
 */
const filterName = ref('')

const debouncedName = refDebounced(filterName, 1000)

/*
 * Source data
 */
const { data } = useFetch('/api/users', {
  default: () => ({ data: [], meta: { total: 0 } }),
  query: { page, limit, name: debouncedName },
})

type UserModel = (typeof data.value.data)[number]

/*
 * Column definitions
 */
const columns = computed<TableColumn<UserModel>[]>(() => [
  {
    id: 'select',
    enableHiding: false,
    enablePinning: true,
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
      }),
  },
  {
    accessorKey: 'name',
    enableHiding: false,
    header: $t('admin.name'),
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'avatar',
    header: $t('admin.avatar'),
    cell: ({ row }) =>
      h(UAvatar, {
        alt: row.getValue('name'),
        size: 'sm',
        src: row.getValue('avatar'),
      }),
  },
  {
    accessorKey: 'role',
    header: $t('admin.role'),
    cell: ({ row }) =>
      h(
        UBadge,
        { color: 'neutral', variant: 'soft' },
        { default: () => row.getValue<UserModel>('role').name },
      ),
  },
  {
    id: 'created_at',
    accessorKey: 'createdAt',
    header: $t('admin.created_at'),
    cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
  },
  {
    accessorKey: 'email',
    header: $t('admin.email'),
    cell: ({ row }) => row.getValue('email'),
  },
  {
    id: 'actions',
    enableHiding: false,
    enablePinning: true,
    cell: ({ row }) =>
      h(
        UDropdownMenu,
        {
          content: {
            align: 'end',
          },
          items: [
            {
              icon: 'i-fluent:edit-24-filled',
              label: $t('admin.edit'),
              onSelect() {},
            },
            {
              color: 'error',
              icon: 'i-fluent:delete-24-filled',
              label: $t('admin.delete'),
              onSelect() {},
            },
          ],
        },
        {
          default: () =>
            h(UButton, {
              color: 'neutral',
              icon: 'i-fluent:more-vertical-24-filled',
              variant: 'ghost',
            }),
        },
      ),
  },
])

/*
 * Row selection
 */
const selection = ref<Record<string, boolean>>({})

const selectionCount = computed(() => Object.keys(selection.value).length)
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex max-h-full flex-col">
      <div class="flex h-14 shrink-0 items-center gap-3 border-b border-b-accented px-3">
        <UInput
          v-model="filterName"
          leading-icon="i-fluent:search-24-regular"
          :placeholder="$t('admin.filter_by', { field: $t('admin.name').toLowerCase() })"
          class="mr-auto"
          :ui="{ trailing: 'pe-1' }"
          #trailing
        >
          <UButton
            v-if="filterName"
            @click="filterName = ''"
            color="neutral"
            icon="i-fluent:dismiss-24-regular"
            size="sm"
            variant="link"
          />
        </UInput>
        <UDropdownMenu
          :content="{ align: 'end' }"
          :items="
            tableRef?.tableApi
              .getAllColumns()
              .filter(col => col.getCanHide())
              .map<DropdownMenuItem>(col => ({
                label: $t(`admin.${col.id}`),
                type: 'checkbox',
                checked: col.getIsVisible(),
                onUpdateChecked: (checked: boolean) =>
                  tableRef?.tableApi.getColumn(col.id)?.toggleVisibility(!!checked),
                onSelect: event => event.preventDefault(),
              }))
          "
        >
          <UButton
            color="neutral"
            trailing-icon="i-fluent:layout-column-four-focus-right-24-filled"
            variant="outline"
          >
            {{ $t('admin.display_columns') }}
          </UButton>
        </UDropdownMenu>
      </div>
      <UTable
        ref="table"
        v-model:row-selection="selection"
        @select="row => row.toggleSelected()"
        :columns
        :column-pinning="{ left: ['select'], right: ['actions'] }"
        :data="data.data"
        :empty="$t('admin.empty')"
        sticky="header"
        class="flex-1 overflow-y-auto"
        :ui="{ thead: 'bg-muted' }"
      />
      <div class="flex h-14 shrink-0 items-center border-t border-t-accented px-3">
        <span v-if="selectionCount" class="ml-px text-sm/normal text-muted">
          {{ $t('admin.selection_count', { count: selectionCount, total: limit }) }}
        </span>
        <UPagination
          v-model:page="page"
          :items-per-page="limit"
          :total="data.meta.total"
          class="ml-auto"
        />
      </div>
    </div>
  </NuxtLayout>
</template>
