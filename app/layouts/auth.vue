<script lang="ts" setup>
//
</script>

<template>
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <header class="fixed inset-x-0 top-0 flex h-14 items-center gap-3 px-3">
      <LocaleSwitcher />
      <ColorModeSwitcher />
    </header>
    <main class="contents">
      <slot></slot>
    </main>
  </div>
</template>
