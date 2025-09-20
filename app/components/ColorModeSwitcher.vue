<script lang="ts" setup>
const colorMode = useColorMode()

const ui = useUiStore()

const currentIndex = computed(() =>
  ui.colorModes.findIndex(({ preference }) => preference === colorMode.preference),
)

function nextColorMode() {
  const nextIndex = (currentIndex.value + 1) % ui.colorModes.length
  const preference = ui.colorModes[nextIndex]!.preference
  if (preference) colorMode.preference = preference
}
</script>

<template>
  <UButton @click="nextColorMode" :icon="ui.colorModes[currentIndex]?.icon" variant="ghost" />
</template>
