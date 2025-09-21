<script lang="ts" setup>
import type { SerializeObject } from 'nitropack'

type SerializeSafeUser = SerializeObject<SafeUserInsertModel>

const [_user, restoreUser] = useDefaultRef<SerializeSafeUser | null>(() => null)

const [visible, toggle] = useToggle()

defineExpose({
  useUpsertUser(user?: SerializeSafeUser) {
    if (user) _user.value = user
    toggle(true)
  },
})

const formRef = useTemplateRef('form')

async function onSubmitUpsertUser() {
  //
}
</script>

<template>
  <UModal
    v-model:open="visible"
    @close:prevent="restoreUser"
    :title="_user?.id ? $t('admin.edit_user') : $t('admin.new_user')"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UForm ref="form" @submit="onSubmitUpsertUser" :state="_user" class="flex flex-col gap-3">
        <UFormField :label="$t('auth.username')" name="username">
          <UInput :default-value="_user?.username" class="w-full" />
        </UFormField>
        <UFormField :label="$t('admin.email')" name="email">
          <UInput :default-value="_user?.email" class="w-full" />
        </UFormField>
        <UFormField :label="$t('admin.name')" name="name">
          <UInput :default-value="_user?.name" class="w-full" />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton @click="formRef?.submit()" icon="i-fluent:checkmark-24-regular">
        {{ $t('admin.confirm') }}
      </UButton>
    </template>
  </UModal>
</template>
