<script lang="ts" setup>
import type { SearchSchema } from '#shared/schema'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row, Table } from '@tanstack/vue-table'

definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.permissions', 'nav.roles'],
})

useHead({
  title: () => $t('nav.roles'),
})

const layout = useLayoutStore()

/*
 * Source data
 */
const query = reactive<SearchSchema>({
  searchFiled: 'name' as const,
  searchValue: '',
})

const { data } = useFetch('/api/roles', {
  default: () =>
    ({
      data: [],
      meta: {
        defaultRoleId: '',
      },
    }) as GetRolesResponse,
  query,
})

type SerializeRole = (typeof data.value.data)[number]

/*
 * Refs
 */
const tableRef = useTemplateRef<{ tableApi: Table<SerializeRole> }>('table')

/*
 * Column definitions
 */
const columns = computed<TableColumn<SerializeRole>[]>(() => [
  {
    id: 'select',
    enableHiding: false,
    enablePinning: true,
  },
  {
    accessorKey: 'name',
    enableHiding: false,
    header: $t('admin.name'),
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'enabled',
    header: $t('admin.enabled'),
  },
  {
    id: 'is_default',
    header: $t('admin.is_default'),
  },
  {
    id: 'created_at',
    accessorKey: 'createdAt',
    header: $t('admin.created_at'),
  },
  {
    id: 'actions',
    enableHiding: false,
    enablePinning: true,
  },
])

/*
 * Table state
 */
const selectedCount = computed(() => tableRef.value?.tableApi.getSelectedRowModel().rows.length)

const totalCount = computed(() => tableRef.value?.tableApi.getRowCount())

const defaultPage = computed(
  () => (tableRef.value?.tableApi.getState().pagination.pageIndex || 0) + 1,
)

const itemsPerPage = 30

/*
 * Row actions
 */
const pendingUpsertRole = ref<SerializeRole | null>(null)

const pendingDeleteRole = ref<SerializeRole | null>(null)

const useActionsCellDropdownMenuItem = (row: Row<SerializeRole>): DropdownMenuItem[] => [
  {
    icon: 'i-fluent:edit-24-filled',
    label: $t('admin.edit'),
    onSelect() {
      pendingUpsertRole.value = row.original
    },
  },
  {
    color: 'error',
    disabled: row.original.id === data.value.meta.defaultRoleId,
    icon: 'i-fluent:delete-24-filled',
    label: $t('admin.delete'),
    onSelect() {
      pendingDeleteRole.value = row.original
    },
  },
]
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex max-h-full flex-col">
      <div class="flex h-14 shrink-0 items-center gap-3 border-b border-b-accented px-3">
        <TableRowFilter v-model="query.searchValue" :field="$t('admin.name').toLowerCase()" />
        <TableColumnDisplayControl :table-api="tableRef?.tableApi" />
      </div>
      <UTable
        ref="table"
        @state-change="tableRef?.tableApi.resetRowSelection()"
        @select="$event.toggleSelected()"
        :columns
        :column-pinning="{ left: ['select'], right: ['actions'] }"
        :data="data.data"
        :empty="$t('admin.empty')"
        sticky="header"
        class="flex-1 overflow-y-auto"
        :ui="{ thead: 'bg-muted' }"
      >
        <template #select-header="{ table }">
          <UCheckbox
            :model-value="
              table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected()
            "
            @update:model-value="table.toggleAllPageRowsSelected(!!$event)"
          />
        </template>
        <template #select-cell="{ row }">
          <UCheckbox
            :model-value="row.getIsSelected()"
            @update:model-value="row.toggleSelected(!!$event)"
          />
        </template>
        <template #enabled-cell="{ getValue }">
          <!-- TODO @update:modelValue -->
          <USwitch :model-value="getValue<boolean>()" />
        </template>
        <template #is_default-cell="{ row }">
          <UBadge
            v-if="row.original.id === data.meta.defaultRoleId"
            icon="i-fluent:checkmark-24-regular"
            size="sm"
            variant="soft"
          />
        </template>
        <template #created_at-cell="{ getValue }">
          <NuxtTime :datetime="getValue<string>()" />
        </template>
        <template #actions-cell="{ row }">
          <UDropdownMenu :content="{ align: 'end' }" :items="useActionsCellDropdownMenuItem(row)">
            <UButton color="neutral" icon="i-fluent:more-vertical-24-filled" variant="ghost" />
          </UDropdownMenu>
        </template>
      </UTable>
      <div class="flex h-14 shrink-0 items-center border-t border-t-accented px-3">
        <TableSelectedCount :total-count :selected-count />
        <UPagination
          v-if="totalCount && totalCount > itemsPerPage"
          @update:page="tableRef?.tableApi.setPageIndex($event - 1)"
          :default-page
          :items-per-page
          :total="totalCount"
          :class="layout.isMaxSm ? 'mx-auto' : 'ml-auto'"
        />
      </div>
    </div>

    <TableUpsertModal v-model="pendingUpsertRole" title=""> </TableUpsertModal>

    <TableDeleteModal v-model="pendingDeleteRole" title=""> </TableDeleteModal>
  </NuxtLayout>
</template>
