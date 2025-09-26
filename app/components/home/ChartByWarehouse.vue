<script lang="ts" setup>
import { CurveType } from '@unovis/ts'
import { VisArea, VisAxis, VisBulletLegend, VisLine, VisXYContainer } from '@unovis/vue'
import type { OriginalRecord } from './Charts.vue'

const { months, original } = defineProps<{
  months: string[]
  original: OriginalRecord[]
}>()

const warehouses = computed(() => ({
  beijing: {
    name: $t('data.warehouse_beijing'),
    color: 'var(--ui-primary)',
  },
  hangzhou: {
    name: $t('data.warehouse_hangzhou'),
    color: 'var(--ui-secondary)',
  },
  zibo: {
    name: $t('data.warehouse_zibo'),
    color: 'var(--ui-warning)',
  },
}))

const data = computed(() =>
  original.map(({ cases }) => ({
    cases: {
      beijing: Object.values(cases.beijing).reduce((a, b) => a + b, 0),
      hangzhou: Object.values(cases.hangzhou).reduce((a, b) => a + b, 0),
      zibo: Object.values(cases.zibo).reduce((a, b) => a + b, 0),
    },
  })),
)

type DataRecord = (typeof data.value)[number]

const accessor = (key: keyof typeof warehouses.value) => ({
  x: (_: DataRecord, i: number) => i,
  y: (r: DataRecord) => r.cases[key],
  color: warehouses.value[key].color,
})

const ticks = {
  x: (i: number) => `${months[i]}`,
  y: (i: number) => i,
}
</script>

<template>
  <VisXYContainer :data :height="400">
    <VisBulletLegend :items="Object.values(warehouses)" />
    <template v-for="(_, key) in warehouses" :key>
      <VisLine :="accessor(key)" :curve-type="CurveType.Basis" />
      <VisArea :="accessor(key)" :curve-type="CurveType.Basis" :opacity="0.1" />
    </template>
    <VisAxis type="x" :tick-format="ticks.x" />
    <VisAxis type="y" :tick-format="ticks.y" />
  </VisXYContainer>
</template>
