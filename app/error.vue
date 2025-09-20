<script lang="ts" setup>
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <UError
    :error="{
      statusCode: error.statusCode,
      statusMessage: error.statusCode === 404 ? $t('error.not_found') : $t('error.unknown'),
    }"
    :ui="{
      statusCode: 'text-3xl',
    }"
  >
    <template #links>
      <UButton
        @click="$router.back()"
        color="secondary"
        icon="i-fluent:arrow-circle-left-24-filled"
      >
        {{ $t('ui.back') }}
      </UButton>
      <UButton as="NuxtLink" to="/" icon="i-fluent:home-24-filled">
        {{ $t('ui.home') }}
      </UButton>
    </template>
  </UError>
</template>
