<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

import * as z from 'zod'

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
      label:'mb-2'
    },
  },
])

const schema = computed(() =>
  z.object({
    username: z.string().min(1, $t('auth.username_required')),
    password: z.string().min(1, $t('auth.password_required')),
  }),
)

type Schema = z.output<typeof schema>

function onSubmitLogin(payload: FormSubmitEvent<Schema>) {
  //
}

const alertVisible = ref()
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
      <template #password-hint>
        <ULink to="/password_reset" class="font-medium text-primary" tabindex="-1">
          {{ $t('auth.forgot_password') }}
        </ULink>
      </template>
      <template #validation>
        <UAlert
          v-if="alertVisible"
          v-model:open="alertVisible"
          close
          color="error"
          icon="i-fluent:info-24-filled"
          :title="$t('auth.credentials_invalid')"
        />
      </template>
    </UAuthForm>
  </NuxtLayout>
</template>
