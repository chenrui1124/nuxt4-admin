<script lang="ts" setup>
import type { SerializeObject } from 'nitropack'

type SerializeSafeUser = SerializeObject<GetUsersResponse['data'][number]>

const [_users, restoreUsers] = useDefaultRef<SerializeSafeUser[]>(() => [])

const [visible, toggle] = useToggle()

defineExpose({
  useDeleteUsers(users: SerializeSafeUser[]) {
    _users.value = users
    toggle(true)
  },
})

async function onClickConfirmDelete() {
  // TODO
}
</script>

<template>
  <UModal
    v-model:open="visible"
    @close:prevent="restoreUsers"
    :title="$t('admin.delete_users')"
    :description="$t('admin.delete_confirmation')"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UPageList divide class="gap-3">
        <UUser
          v-for="{ id, name, role, createdAt, email, avatar } of _users"
          :key="id"
          :avatar="avatar ? { src: avatar, alt: name } : void 0"
          :ui="{ avatar: 'self-start mt-1 mr-1', wrapper: 'w-full mb-3' }"
        >
          <template #name>
            <div class="flex items-center gap-3">
              {{ name }}
              <UBadge color="neutral" variant="soft" class="ml-auto">{{ role.name }}</UBadge>
            </div>
          </template>
          <template #description>
            <div>{{ email }}</div>
            <div>{{ $t('admin.created_at') }} {{ new Date(createdAt).toLocaleDateString() }}</div>
          </template>
        </UUser>
      </UPageList>
    </template>
    <template #footer="{ close }">
      <UButton
        @click="onClickConfirmDelete().then(close)"
        color="error"
        icon="i-fluent:delete-24-filled"
        loading-auto
      >
        {{ $t('admin.confirm') }}
      </UButton>
    </template>
  </UModal>
</template>
