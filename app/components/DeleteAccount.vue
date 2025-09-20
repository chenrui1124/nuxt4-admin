<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

import { z } from 'zod'

const form = useTemplateRef('form')

const CONFIRMATION_TEXT = 'DELETE'

const state = reactive({
  confirm: '',
})

const schema = computed(() =>
  z.object({
    confirm: z.custom(
      value => value === CONFIRMATION_TEXT,
      $t('auth.confirm_account_deletion_error'),
    ),
  }),
)

function onSubmitDeleteAccount(payload: FormSubmitEvent<any>) {
  //
}
</script>

<template>
  <UPageCard
    icon="i-fluent:person-warning-24-filled"
    :title="$t('auth.account')"
    :description="$t('auth.account_deletion_description')"
    spotlight
    spotlight-color="error"
    :ui="{ leadingIcon: 'text-error' }"
  >
    <UModal :title="$t('auth.confirm_account_deletion_title')" :ui="{ footer: 'justify-end' }">
      <UButton color="error" class="w-fit">
        {{ $t('auth.account_deletion') }}
      </UButton>
      <template #body>
        <UForm @submit="onSubmitDeleteAccount" ref="form" :state :schema>
          <p class="mb-3 text-sm/normal">
            <I18nT keypath="auth.confirm_account_deletion_description">
              <template #text>
                <span class="text-error">{{ CONFIRMATION_TEXT }}</span>
              </template>
            </I18nT>
          </p>
          <UFormField name="confirm">
            <UInput color="error" class="w-full" />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <UButton @click="form?.submit()" color="error" icon="i-fluent:dismiss-circle-24-filled">
          {{ $t('auth.confirm_delete') }}
        </UButton>
      </template>
    </UModal>
  </UPageCard>
</template>
