<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, clear: clearSession } = useUserSession()

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label',
      label: user.value?.name,
      avatar: {
        alt: user.value?.name,
        src: user.value?.avatar,
        size: 'xs',
      },
      class: 'font-normal',
    },
    {
      type: 'label',
      label: user.value?.email,
      class: 'font-normal',
    },
  ],
  [
    {
      icon: 'i-lineicons:github',
      label: $t('ui.github_repository'),
      to: 'https://github.com/chenrui1124/nuxt4-admin',
    },
    {
      icon: 'i-fluent:sign-out-24-filled',
      label: $t('ui.logout'),
      async onSelect() {
        await clearSession()
        await navigateTo('/login')
      },
    },
  ],
])
</script>

<template>
  <UDropdownMenu :content="{ align: 'end' }" :items>
    <UAvatar :alt="user?.name" size="sm" :src="user?.avatar" />
  </UDropdownMenu>
</template>
