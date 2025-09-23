<script lang="ts" setup>
import type { PaginationWithSearchSchema } from '#shared/schema'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row, Table } from '@tanstack/vue-table'
import type { GetUsersResponse } from '~~/shared/types/api'

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
const query = reactive<PaginationWithSearchSchema>({
  pageSize: 30,
  pageIndex: 1,
  searchFiled: 'name' as const,
  searchValue: '',
})

const { data, status } = useFetch('/api/users', {
  default: () =>
    ({
      data: [],
      meta: { total: 0 },
    }) satisfies GetUsersResponse,
  query,
})

type SerializeUserWithRoleName = (typeof data.value.data)[number]

/*
 * Refs
 */
const tableRef = useTemplateRef<{ tableApi: Table<SerializeUserWithRoleName> }>('table')

/*
 * Column definitions
 */
const columns = computed<TableColumn<SerializeUserWithRoleName>[]>(() => [
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

/*
 * Table state
 */
const selectedCount = computed(() => tableRef.value?.tableApi.getSelectedRowModel().rows.length)

const totalCount = computed(() => tableRef.value?.tableApi.getRowCount())

/*
 * Row actions
 */
const pendingUpsertUser = ref<Pick<
  SafeUserInsertModel,
  'id' | 'name' | 'email' | 'username'
> | null>(null)

const pendingDeleteUsers = ref<SerializeUserWithRoleName[] | null>(null)

const useActionsCellDropdownMenuItem = (
  row: Row<SerializeUserWithRoleName>,
): DropdownMenuItem[] => [
  {
    icon: 'i-fluent:edit-24-filled',
    label: $t('admin.edit'),
    onSelect() {
      pendingUpsertUser.value = row.original
    },
  },
  {
    color: 'error',
    icon: 'i-fluent:delete-24-filled',
    label: $t('admin.delete'),
    onSelect() {
      pendingDeleteUsers.value = [row.original]
    },
  },
]

function onClickTriggerInsertUser() {
  pendingUpsertUser.value = { name: '', email: '', username: '' }
}

function onClickTriggerBatchDelete() {
  const selections = tableRef.value?.tableApi.getSelectedRowModel().rows.map(row => row.original)
  if (selections) pendingDeleteUsers.value = selections
}

const form = useTemplateRef('form')

async function onConfirmTriggerSubmit() {
  await form.value?.submit()
}

function onSubmitUpsertUser() {
  // TODO
}

function onConfirmDeleteUsers() {
  // TODO
}
</script>

<template>
  <NuxtLayout name="admin">
    <div class="flex max-h-full flex-col">
      <div class="flex h-14 shrink-0 items-center gap-3 border-b border-b-accented px-3">
        <TableRowFilter v-model="query.searchValue" :field="$t('admin.name').toLowerCase()" />
        <UButton
          v-if="selectedCount"
          :aria-label="layout.isMaxSm ? $t('admin.delete') : void 0"
          @click="onClickTriggerBatchDelete()"
          color="error"
          icon="i-fluent:delete-24-filled"
          :label="layout.isMaxSm ? void 0 : $t('admin.delete')"
        />
        <UButton
          :aria-label="layout.isMaxSm ? $t('admin.new_user') : void 0"
          @click="onClickTriggerInsertUser()"
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
        :loading="status === 'pending'"
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
            {{ (getValue() as SerializeUserWithRoleName['role']).name }}
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
    <TableUpsertModal
      v-model="pendingUpsertUser"
      @confirm="onConfirmTriggerSubmit"
      :title="pendingUpsertUser?.id ? $t('admin.edit_user') : $t('admin.new_user')"
    >
      <UForm
        ref="form"
        @submit="onSubmitUpsertUser"
        :state="pendingUpsertUser"
        class="flex flex-col gap-3"
      >
        <UFormField :label="$t('auth.username')" name="username">
          <UInput :default-value="pendingUpsertUser?.username" class="w-full" />
        </UFormField>
        <UFormField :label="$t('admin.email')" name="email">
          <UInput :default-value="pendingUpsertUser?.email" class="w-full" />
        </UFormField>
        <UFormField :label="$t('admin.name')" name="name">
          <UInput :default-value="pendingUpsertUser?.name" class="w-full" />
        </UFormField>
      </UForm>
    </TableUpsertModal>

    <TableDeleteModal
      v-model="pendingDeleteUsers"
      @confirm="onConfirmDeleteUsers"
      :title="$t('admin.delete_users')"
      :description="$t('admin.delete_confirmation')"
    >
      <UPageList divide class="gap-3 *:not-last:pb-3">
        <UUser
          v-for="{ id, name, role, createdAt, email, avatar } of pendingDeleteUsers"
          :key="id"
          :avatar="avatar ? { src: avatar, alt: name } : void 0"
          :ui="{ avatar: 'self-start mt-1 mr-1', wrapper: 'w-full' }"
        >
          <template #name>
            <div class="flex items-center gap-3">
              {{ name }}
              <UBadge color="neutral" variant="soft" class="ml-auto">{{ role.name }}</UBadge>
            </div>
          </template>
          <template #description>
            <div>{{ email }}</div>
            <div>
              {{ $t('admin.created_at') }}
              <NuxtTime :datetime="createdAt" />
            </div>
          </template>
        </UUser>
      </UPageList>
    </TableDeleteModal>
  </NuxtLayout>
</template>
