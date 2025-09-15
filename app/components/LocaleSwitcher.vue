<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const { locale, locales, setLocale } = useI18n()

const items = computed(() =>
  locales.value.map<DropdownMenuItem>(({ code, name }) => ({
    label: name,
    type: 'checkbox' as const,
    checked: locale.value === code,
    onSelect: async () => await setLocale(code),
  })),
)
</script>

<template>
  <UDropdownMenu :content="{ align: 'end' }" :items>
    <UButton icon="i-fluent:local-language-zi-24-filled" variant="ghost" class="ml-auto" />
  </UDropdownMenu>
</template>
