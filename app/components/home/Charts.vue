<script lang="ts">
export interface OriginalRecord {
  cases: {
    [C in 'beijing' | 'hangzhou' | 'zibo']: MedicationRecord
  }
}

export interface MedicationRecord {
  cro: number
  pip: number
  caz: number
  amx: number
}
</script>

<script lang="ts" setup>
import { faker } from '@faker-js/faker'
import type { TabsItem } from '@nuxt/ui'

const { t } = useI18n()

const randomNumber = () => faker.number.int({ min: 1000, max: 9999 })

const months = computed(() => [
  t('data.january'),
  t('data.february'),
  t('data.march'),
  t('data.april'),
  t('data.may'),
  t('data.june'),
  t('data.july'),
  t('data.august'),
  t('data.september'),
  t('data.october'),
  t('data.november'),
  t('data.december'),
])

const original: OriginalRecord[] = Array.from({ length: 12 }).map(() => ({
  cases: {
    beijing: {
      cro: randomNumber(),
      pip: randomNumber(),
      caz: randomNumber(),
      amx: randomNumber(),
    },
    hangzhou: {
      cro: randomNumber(),
      pip: randomNumber(),
      caz: randomNumber(),
      amx: randomNumber(),
    },
    zibo: {
      cro: randomNumber(),
      pip: randomNumber(),
      caz: randomNumber(),
      amx: randomNumber(),
    },
  },
}))

const tabs = computed<TabsItem[]>(() => [
  {
    label: t('data.by_warehouse'),
    slot: 'by_warehouse',
  },
  {
    label: t('data.by_medication'),
    slot: 'by_medication',
  },
])
</script>

<template>
  <UCard>
    <UTabs :items="tabs" class="" :ui="{ list: 'size-fit self-start' }">
      <template #by_warehouse>
        <HomeChartByWarehouse :months :original />
      </template>
      <template #by_medication>
        <HomeChartByMedication :months :original />
      </template>
    </UTabs>
  </UCard>
</template>
