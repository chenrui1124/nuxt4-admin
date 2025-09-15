<script lang="ts" setup>
const colorMode = useColorMode()

const ui = useUiStore()

const colorModes = computed(() => [
  {
    preference: 'system' as const,
    icon: ui.isMaxSm ? 'i-fluent:phone-24-filled' : 'i-fluent:laptop-24-filled',
  },
  {
    preference: 'light' as const,
    icon: 'i-fluent:weather-sunny-24-filled',
  },
  {
    preference: 'dark' as const,
    icon: 'i-fluent:weather-moon-24-filled',
  },
])

const currentIndex = computed(() =>
  colorModes.value.findIndex(({ preference }) => preference === colorMode.preference),
)

function nextColorMode() {
  const nextIndex = (currentIndex.value + 1) % colorModes.value.length
  const preference = colorModes.value[nextIndex]!.preference
  if (preference) colorMode.preference = preference
}
</script>

<template>
  <UButton @click="nextColorMode" :icon="colorModes[currentIndex]?.icon" variant="ghost" />
</template>
