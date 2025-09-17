<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, clear: clearSession } = useUserSession()

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: $t('ui.logout'),
    icon: 'i-fluent:sign-out-24-filled',
    async onSelect() {
      await clearSession()
      await navigateTo('/login')
    },
  },
])
</script>

<template>
  <UDropdownMenu :content="{ align: 'end' }" :items>
    <UAvatar :alt="user?.name" size="sm" :src="user?.avatar" />
  </UDropdownMenu>
</template>
