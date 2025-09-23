<script lang="ts" setup>
const { modelValue } = defineProps<{
  field: string
  modelValue: string | undefined
}>()

const emit = defineEmits<{
  'update:modelValue': [modelValue: string | undefined]
}>()

const filter = ref(modelValue)

const debouncedFilter = debouncedRef(filter, 1000)

watch(debouncedFilter, value => emit('update:modelValue', value))
</script>

<template>
  <UInput
    v-model.trim="filter"
    leading-icon="i-fluent:search-24-regular"
    :placeholder="$t('admin.filter_by', { field })"
    class="mr-auto"
    :ui="{ trailing: 'pe-1' }"
    #trailing
  >
    <UButton
      v-if="filter"
      @click="filter = ''"
      color="neutral"
      icon="i-fluent:dismiss-24-regular"
      size="sm"
      variant="link"
    />
  </UInput>
</template>
