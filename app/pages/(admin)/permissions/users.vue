<script lang="ts" setup>
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row, Table } from '@tanstack/vue-table'
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
 * Source data
 */
const query = reactive<PaginationSchema>({
  pageSize: 30,
  pageIndex: 1,
  searchFiled: 'name',
  searchValue: '',
})

const { data } = useFetch('/api/users', {
  default: () => ({ data: [], meta: { total: 0 } }),
  query,
})

type SerializeSafeUser = (typeof data.value.data)[number]

/*
 * Refs
 */
const tableRef = useTemplateRef<{ tableApi: Table<SerializeSafeUser> }>('table')

/*
 * Column definitions
 */
const columns = computed<TableColumn<SerializeSafeUser>[]>(() => [
  {
    id: 'select',
    enableHiding: false,
    enablePinning: true,
  },
  {
    accessorKey: 'name',
    enableHiding: false,
    header: $t('admin.name'),
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: 'avatar',
    header: $t('admin.avatar'),
  },
  {
    accessorKey: 'role',
    header: $t('admin.role'),
  },
  {
    id: 'created_at',
    accessorKey: 'createdAt',
    header: $t('admin.created_at'),
  },
  {
    accessorKey: 'email',
    header: $t('admin.email'),
    cell: ({ getValue }) => getValue(),
  },
  {
    id: 'actions',
    enableHiding: false,
    enablePinning: true,
  },
])

const useActionsCellDropdownMenuItem = (row: Row<SerializeSafeUser>): DropdownMenuItem[] => [
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
]

/*
 * Selected count
 */
const selectedCount = computed(() => tableRef.value?.tableApi.getSelectedRowModel().rows.length)

const totalCount = computed(() => tableRef.value?.tableApi.getRowCount())
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex max-h-full flex-col">
      <div class="flex h-14 shrink-0 items-center gap-3 border-b border-b-accented px-3">
        <TableRowFilter v-model="query.searchValue" :field="$t('admin.name').toLowerCase()" />
        <UButton
          v-if="selectedCount"
          :aria-label="layout.isMaxSm ? $t('admin.delete') : void 0"
          @click=""
          color="error"
          icon="i-fluent:delete-24-filled"
          :label="layout.isMaxSm ? void 0 : $t('admin.delete')"
        />
        <UButton
          :aria-label="layout.isMaxSm ? $t('admin.new_user') : void 0"
          @click=""
          icon="i-fluent:add-24-regular"
          :label="layout.isMaxSm ? void 0 : $t('admin.new_user')"
        />
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
        <template #avatar-cell="{ row }">
          <UAvatar :alt="row.getValue('name')" size="sm" :src="row.getValue('avatar')" />
        </template>
        <template #role-cell="{ getValue }">
          <UBadge color="neutral" variant="soft">
            {{ (getValue() as SerializeSafeUser['role']).name }}
          </UBadge>
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
          v-model:page="query.pageIndex"
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
