<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import type { PaginationSchema } from '~~/shared/schema'

definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.permissions', 'nav.users'],
})

useHead({
  title: () => $t('nav.users'),
})

const layout = useLayoutStore()

/*
 * Refs
 */
const tableRef = useTemplateRef('table')
const upsertModalRef = useTemplateRef('upsertModal')
const deleteModalRef = useTemplateRef('deleteModal')

/*
 * Resolve components
 */
const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UCheckbox = resolveComponent('UCheckbox')
const UDropdownMenu = resolveComponent('UDropdownMenu')

/*
 * Pagination & Filter
 */
const query = reactive<PaginationSchema>({
  pageSize: 30,
  pageIndex: 1,
  searchFiled: 'name',
  searchValue: '',
})

/*
 * Source data
 */
const { data } = useFetch('/api/users', {
  default: () => ({ data: [], meta: { total: 0 } }),
  query,
})

type SerializeSafeUser = (typeof data.value.data)[number]

/*
 * Column definitions
 */
const columns = computed<TableColumn<SerializeSafeUser>[]>(() => [
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
        { default: () => row.getValue<SerializeSafeUser['role']>('role').name },
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
              onSelect() {
                upsertModalRef.value?.useUpsertUser(row.original)
              },
            },
            {
              color: 'error',
              icon: 'i-fluent:delete-24-filled',
              label: $t('admin.delete'),
              onSelect() {
                deleteModalRef.value?.useDeleteUsers([row.original])
              },
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
const [selection, restoreSelection] = useDefaultRef<Record<number, true>>(() => ({}))

const selectionCount = computed(() => Object.keys(selection.value).length)

/*
 * Actions
 */
function onClickBatchDelete() {
  const selectedItems = tableRef.value?.tableApi.getSelectedRowModel().rows.map(row => row.original)
  if (selectedItems) {
    deleteModalRef.value?.useDeleteUsers(selectedItems)
  }
}
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex max-h-full flex-col">
      <div class="flex h-14 shrink-0 items-center gap-3 border-b border-b-accented px-3">
        <TableRowFilter v-model="query.searchValue" :field="$t('admin.name').toLowerCase()" />
        <UButton
          v-if="selectionCount"
          :aria-label="layout.isMaxSm ? $t('admin.delete') : void 0"
          @click="onClickBatchDelete()"
          color="error"
          icon="i-fluent:delete-24-filled"
          :label="layout.isMaxSm ? void 0 : $t('admin.delete')"
        />
        <UButton
          :aria-label="layout.isMaxSm ? $t('admin.new_user') : void 0"
          @click="upsertModalRef?.useUpsertUser()"
          icon="i-fluent:add-24-regular"
          :label="layout.isMaxSm ? void 0 : $t('admin.new_user')"
        />
        <TableColumnDisplayControl :table-api="tableRef?.tableApi" />
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
        <span v-if="selectionCount && !layout.isMaxSm" class="ml-px text-sm/normal text-muted">
          {{
            $t('admin.selection_count', {
              count: selectionCount,
              total: tableRef?.tableApi.getRowCount(),
            })
          }}
        </span>
        <UPagination
          v-model:page="query.pageIndex"
          @update:page="restoreSelection"
          :items-per-page="query.pageSize"
          :total="data.meta.total"
          :class="layout.isMaxSm ? 'mx-auto' : 'ml-auto'"
        />
      </div>
    </div>

    <!-- Modal -->
    <PermissionsUpsertUser ref="upsertModal" />
    <PermissionsDeleteUsers ref="deleteModal" />
  </NuxtLayout>
</template>
