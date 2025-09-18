<template>
  <div
    style="height: 100vh; height: 100dvh"
    class="flex w-screen flex-col items-center justify-center pb-14"
  >
    <header class="fixed inset-x-0 top-0 flex h-14 items-center gap-3 px-3">
      <LocaleSwitcher />
      <ColorModeSwitcher />
    </header>
    <main class="contents">
      <slot></slot>
    </main>
  </div>
</template>
