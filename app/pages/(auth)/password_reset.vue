<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

import { z } from 'zod'

definePageMeta({
  group: 'auth',
})

const fields = computed(() => [
  {
    name: 'email',
    type: 'text' as const,
    icon: 'i-fluent:mail-24-filled',
    label: $t('auth.email'),
    placeholder: 'example@example.com',
    required: true,
  },
])

const schema = z.object({
  email: z.email($t('auth.email_invalid')).min(1, $t('auth.email_invalid')),
})

type Schema = z.output<typeof schema>

function onSubmitSendEmail(_payload: FormSubmitEvent<Schema>) {
  //
}
</script>

<template>
  <NuxtLayout name="auth">
    <UAuthForm
      @submit="onSubmitSendEmail"
      :fields
      :schema
      icon="i-fluent:password-reset-48-filled"
      loading-auto
      :submit="{ label: $t('auth.send_email') }"
      :title="$t('auth.password_reset')"
      class="max-h-11/12 w-sm max-w-11/12"
      #footer
    >
      <UButton to="/login" block color="neutral" variant="subtle">
        {{ $t('auth.return') }}
      </UButton>
    </UAuthForm>
  </NuxtLayout>
</template>
