<script lang="ts" setup>
import { z } from 'zod'
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '~~/shared/consts'

definePageMeta({
  group: 'admin',
  i18nKeys: ['nav.settings', 'nav.general'],
})

useHead({
  title: () => $t('nav.general'),
})

const { user } = useUserSession()

const name = ref(user.value?.name)

const email = ref(user.value?.email)

const avatar = ref()

const state = reactive({
  name: user.value?.name ?? '',
  email: user.value?.email ?? '',
})

const schema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, $t('auth.too_short', { filed: $t('admin.name') }))
    .max(NAME_MAX_LENGTH, $t('auth.too_long', { field: $t('admin.name') })),
  email: z.email($t('auth.email_invalid')),
})

async function onClickSendVerificationEmail() {
  // TODO
}

const { open: openFileUpload } = useFileUpload({
  accept: 'image/*',
  onUpdate(files) {
    // TODO
  },
})

async function onClickUploadAvatar() {
  openFileUpload()
}
</script>

<template>
  <NuxtLayout name="admin">
    <UPageList class="mx-auto w-lg max-w-full gap-6 p-6">
      <div class="flex items-center gap-5">
        <button @click="onClickUploadAvatar" class="relative size-fit">
          <UAvatar :alt="user?.name!" :src="user?.avatar!" class="peer" />
          <div
            class="pointer-events-none absolute inset-0 inline-flex items-center justify-center bg-default/50 opacity-0 transition peer-hover:opacity-100"
          >
            <UIcon name="i-fluent:edit-24-filled" />
          </div>
        </button>
        <UButton class="ml-auto w-fit">{{ $t('admin.save_changes') }}</UButton>
      </div>
      <UCard variant="subtle" :ui="{ body: 'flex flex-col gap-5' }">
        <UForm :state :schema class="contents">
          <UFormField
            :label="$t('admin.name')"
            name="name"
            required
            class="flex w-full flex-row items-center gap-5"
            :ui="{ container: 'ml-auto mt-0' }"
          >
            <UInput v-model="name" class="w-55.5 max-w-full" />
          </UFormField>
          <USeparator />
          <UFormField
            :label="$t('admin.email')"
            name="email"
            required
            class="flex w-full flex-row items-center gap-5"
            :ui="{ container: 'ml-auto mt-0' }"
          >
            <UInput v-model="email" class="w-55.5 max-w-full" />
          </UFormField>
          <UButton @click="onClickSendVerificationEmail" loading-auto class="ml-auto">
            {{ $t('admin.send_verification_email') }}
          </UButton>
        </UForm>
      </UCard>
    </UPageList>
  </NuxtLayout>
</template>
