<script lang="ts" setup>
const colorMode = useColorMode()

const layout = useLayoutStore()

const currentIndex = computed(() =>
  layout.colorModes.findIndex(({ preference }) => preference === colorMode.preference),
)

function nextColorMode() {
  const nextIndex = (currentIndex.value + 1) % layout.colorModes.length
  const preference = layout.colorModes[nextIndex]!.preference
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      if (preference) colorMode.preference = preference
    })
  } else {
    if (preference) colorMode.preference = preference
  }
}
</script>

<template>
  <UButton @click="nextColorMode" :icon="layout.colorModes[currentIndex]?.icon" variant="ghost" />
</template>
