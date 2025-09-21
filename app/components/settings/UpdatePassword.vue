<script lang="ts" setup>
import type { AuthFormProps, FormSubmitEvent } from '@nuxt/ui'

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '#shared/consts'
import { throttle } from 'es-toolkit'
import { z } from 'zod'

const toast = useToast()

const fields = computed<AuthFormProps['fields']>(() => [
  {
    type: 'password' as const,
    name: 'currentPassword',
    label: $t('auth.current_password'),
    defaultValue: '',
    required: true,
  },
  {
    type: 'password' as const,
    name: 'newPassword',
    label: $t('auth.new_password'),
    defaultValue: '',
    required: true,
  },
])

const schema = computed(() => {
  const password = () =>
    z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        $t('auth.too_short', { field: $t('auth.password'), length: PASSWORD_MIN_LENGTH }),
      )
      .max(
        PASSWORD_MAX_LENGTH,
        $t('auth.too_long', { field: $t('auth.password'), length: PASSWORD_MAX_LENGTH }),
      )

  return z.object({
    currentPassword: password(),
    newPassword: password(),
  })
})

type PasswordChangeSchema = z.output<typeof schema.value>

const [alert, restoreAlert] = useDefaultRef(
  () => ({
    visible: false,
    message: (): string => '',
  }),
  { deep: true },
)

const authFormRef = useTemplateRef('authForm')

const onSubmitUpdatePassword = throttle((payload: FormSubmitEvent<PasswordChangeSchema>) => {
  restoreAlert()
  const { currentPassword, newPassword } = payload.data
  if (currentPassword === newPassword) {
    alert.value = {
      visible: true,
      message: () => $t('auth.password_same'),
    }
  } else {
    authFormRef.value!.state.currentPassword = ''
    authFormRef.value!.state.newPassword = ''
    toast.add({
      color: 'success',
      icon: 'i-fluent:checkmark-circle-24-filled',
      title: $t('auth.password_updated'),
    })
  }
}, 3000)
</script>

<template>
  <UPageCard
    icon="i-fluent:password-24-filled"
    :title="$t('auth.password')"
    :description="$t('auth.password_change_description')"
  >
    <UAuthForm
      @submit="onSubmitUpdatePassword"
      ref="authForm"
      :fields
      :schema
      :submit="{ label: $t('auth.update'), class: 'w-fit' }"
      :ui="{ header: 'items-start', description: 'text-left' }"
      #providers
    >
      <ErrorAlert v-model:open="alert.visible" :message="alert.message()" />
    </UAuthForm>
  </UPageCard>
</template>
