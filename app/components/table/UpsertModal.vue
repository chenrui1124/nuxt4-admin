<script lang="ts" setup generic="T">
defineProps<{
  title: string
  description?: string
}>()

const pendingUpsertItem = defineModel<T | null>({ required: true })

const [state, toggle] = useToggle()

watch(pendingUpsertItem, value => void (value && toggle(true)))

function close() {
  toggle(false)
}

function onAfterLeaveClear() {
  pendingUpsertItem.value = null
}

const emit = defineEmits<{
  confirm: []
}>()

function onClickConfirm() {
  emit('confirm')
}
</script>

<template>
  <UModal
    v-model:open="state"
    :title
    :description
    @after:leave="onAfterLeaveClear"
    :ui="{ footer: 'justify-end gap-3' }"
  >
    <template #body>
      <slot :="{ close }"></slot>
    </template>
    <template #footer>
      <UButton @click="close" color="neutral" variant="soft">
        {{ $t('common.cancel') }}
      </UButton>
      <UButton @click="onClickConfirm">
        {{ $t('common.confirm') }}
      </UButton>
    </template>
  </UModal>
</template>
