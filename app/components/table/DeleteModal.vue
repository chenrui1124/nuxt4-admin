<script lang="ts" setup generic="T">
defineProps<{
  title: string
  description?: string
}>()

const pendingDeleteItem = defineModel<T | null>({ required: true })

const [state, toggle] = useToggle()

watch(pendingDeleteItem, value => void (value && toggle(true)))

function close() {
  toggle(false)
}

function onAfterLeaveClear() {
  pendingDeleteItem.value = null
}

const emits = defineEmits<{
  confirm: []
}>()

function onClickConfirm() {
  emits('confirm')
}
</script>

<template>
  <UModal
    v-model:open="state"
    @after:leave="onAfterLeaveClear"
    :title
    :description
    :ui="{ footer: 'justify-end gap-3' }"
  >
    <template #body>
      <slot :="{ close }"></slot>
    </template>
    <template #footer>
      <UButton @click="close" color="neutral" variant="soft">
        {{ $t('common.cancel') }}
      </UButton>
      <UButton @click="onClickConfirm" color="error" variant="soft">
        {{ $t('common.confirm') }}
      </UButton>
    </template>
  </UModal>
</template>
