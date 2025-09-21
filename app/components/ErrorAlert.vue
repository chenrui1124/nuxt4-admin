<script lang="ts" setup>
defineProps<{
  message: string
}>()

const visible = defineModel<boolean>('open')
</script>

<template>
  <UAlert
    v-if="visible"
    v-model:open="visible"
    close
    color="error"
    icon="i-fluent:info-24-filled"
    :title="message"
    :ui="{ close: 'text-inverted hover:text-inverted/75 active:text-inverted' }"
  />
</template>
