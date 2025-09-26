<script setup lang="ts">
import { VisAxis, VisBulletLegend, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import type { MedicationRecord, OriginalRecord } from './Charts.vue'

const { months, original } = defineProps<{
  months: string[]
  original: OriginalRecord[]
}>()

const items = computed(() => [
  {
    name: $t('data.medication_cro'),
    color: 'var(--ui-primary)',
  },
  {
    name: $t('data.medication_pip'),
    color: 'var(--ui-secondary)',
  },
  {
    name: $t('data.medication_caz'),
    color: 'var(--ui-warning)',
  },
  {
    name: $t('data.medication_amx'),
    color: 'var(--ui-error)',
  },
])

const data = computed<(MedicationRecord & { month: string })[]>(() =>
  original.map(({ cases }, index) => ({
    month: months[index]!,
    ...Object.values(cases).reduce(
      (acc, wh) => {
        acc.cro += wh.cro
        acc.pip += wh.pip
        acc.caz += wh.caz
        acc.amx += wh.amx
        return acc
      },
      {
        cro: 0,
        pip: 0,
        caz: 0,
        amx: 0,
      },
    ),
  })),
)

type DataRecord = (typeof data.value)[number]

const x = (_: DataRecord, i: number) => i

const y = [
  (d: DataRecord) => d.cro,
  (d: DataRecord) => d.pip,
  (d: DataRecord) => d.caz,
  (d: DataRecord) => d.amx,
]

const color = (_: DataRecord, i: number) => items.value[i]!.color

const ticks = {
  x: (i: number) => `${months[i]}`,
  y: (i: number) => i,
}
</script>

<template>
  <VisBulletLegend :items />
  <VisXYContainer :height="400">
    <VisGroupedBar :data :x :y :color />
    <VisAxis type="x" :tick-format="ticks.x" />
    <VisAxis type="y" :tick-format="ticks.y" />
  </VisXYContainer>
</template>
