<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { useLoginSchema, type LoginSchema } from '~~/shared/schema'

definePageMeta({
  group: 'auth',
})

useHead({
  title: () => $t('auth.login'),
})

const fields = computed(() => [
  {
    name: 'username',
    type: 'text' as const,
    defaultValue: '',
    icon: 'i-fluent:person-circle-24-filled',
    label: $t('auth.username'),
    required: true,
  },
  {
    name: 'password',
    type: 'password' as const,
    defaultValue: '',
    icon: 'i-fluent:password-24-filled',
    label: $t('auth.password'),
    required: true,
  },
  {
    name: 'remember',
    type: 'checkbox' as const,
    defaultValue: false,
    label: $t('auth.remember'),
    ui: {
      label: 'mb-2',
    },
  },
])

const schema = useLoginSchema({
  usernameRequired: $t('auth.username_required'),
  passwordRequired: $t('auth.password_required'),
})

const { fetch: refreshSession } = useUserSession()

const [alert, restoreAlert] = useDefaultRef(
  () => ({
    visible: false,
    message: (): string => '',
  }),
  { deep: true },
)

async function onSubmitLogin(payload: FormSubmitEvent<LoginSchema>) {
  try {
    restoreAlert()
    await $fetch('/api/login', { method: 'POST', body: payload.data })
    await refreshSession()
    await navigateTo('/')
  } catch (error) {
    const statusCode = (error as any).data.statusCode
    alert.value = {
      visible: true,
      message:
        statusCode === 401 ? () => $t('auth.credentials_invalid') : () => $t('auth.server_error'),
    }
  }
}
</script>

<template>
  <NuxtLayout name="auth">
    <UAuthForm
      @submit="onSubmitLogin"
      :fields
      icon="i-fluent:person-48-filled"
      loading-auto
      :schema
      :submit="{ label: $t('auth.continue_login') }"
      :title="$t('auth.login')"
      class="max-h-11/12 w-sm max-w-11/12"
    >
      <template #providers>
        <ErrorAlert v-model:open="alert.visible" :message="alert.message()" />
      </template>
      <template #password-hint>
        <ULink to="/password_reset" class="font-medium text-primary" tabindex="-1">
          {{ $t('auth.forgot_password') }}
        </ULink>
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>
