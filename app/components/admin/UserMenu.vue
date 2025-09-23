<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, clear: clearSession } = useUserSession()

const items = computed<DropdownMenuItem[]>(() => [
  {
    type: 'separator',
  },
  {
    icon: 'i-lineicons:github',
    label: $t('ui.github_repository'),
    to: 'https://github.com/chenrui1124/nuxt4-admin',
    target: '_blank',
  },
  {
    icon: 'i-fluent:sign-out-24-filled',
    label: $t('ui.logout'),
    async onSelect() {
      await clearSession()
      await navigateTo('/login')
    },
  },
])
</script>

<template>
  <UDropdownMenu v-if="user" :content="{ align: 'end' }" :items>
    <UAvatar :alt="user.name" size="xs" :src="user.avatar!" class="m-1" />
    <template #content-top>
      <div
        class="m-1 -mb-1 grid grid-cols-[min-content_1fr] grid-rows-2 items-center gap-x-1 pr-1.5 text-sm"
      >
        <UAvatar :alt="user.name" :src="user.avatar!" class="col-start-1 row-span-2 m-1.5" />
        <div class="col-start-2">{{ user.name }}</div>
        <div class="col-start-2 text-default/75">{{ user.email }}</div>
      </div>
    </template>
  </UDropdownMenu>
</template>
