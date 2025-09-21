import { shallowRef } from 'vue'

export function useDefaultRef<T>(defaultValueFn: () => T) {
  const value = shallowRef(defaultValueFn())

  const restore = () => (value.value = defaultValueFn())

  return [value, restore] as const
}
