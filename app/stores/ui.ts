import { useMediaQuery } from '@vueuse/core'

export const useUiStore = defineStore('ui', () => {
  const isMaxSm = useMediaQuery('(width < 40rem)')

  return { isMaxSm }
})
