import { ref, shallowRef } from 'vue'

export function useDefaultRef<T>(defaultValueFn: () => T, config?: { deep?: boolean }) {
  const value = config?.deep ? ref(defaultValueFn()) : shallowRef(defaultValueFn())

  const restore = () => (value.value = defaultValueFn())

  return [value, restore] as const
}
