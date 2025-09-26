<script lang="ts" setup>
import { faker } from '@faker-js/faker'

const source = [
  {
    count: faker.number.int({ min: 1000, max: 9999 }),
    delta: faker.number.float({ fractionDigits: 3, min: -0.5, max: 0.5 }),
  },
  {
    count: faker.number.int({ min: 1000, max: 9999 }),
    delta: faker.number.float({ fractionDigits: 3, min: -0.5, max: 0.5 }),
  },
  {
    count: faker.number.int({ min: 10, max: 25 }),
  },
  {
    count: faker.number.int({ min: 25, max: 50 }),
  },
]

const items = computed(() => [
  {
    icon: 'i-mdi:package-variant-closed-plus',
    title: $t('data.inbound_quantity'),
    ...source[0],
  },
  {
    icon: 'i-mdi:package-variant-closed-minus',
    title: $t('data.outbound_quantity'),
    count: faker.number.int({ min: 1000, max: 9999 }),
    delta: faker.number.float({ fractionDigits: 3, min: -0.5, max: 0.5 }),
    ...source[1],
  },
  {
    icon: 'i-mdi:alert-circle-outline',
    title: $t('data.expiring_soon'),
    count: faker.number.int({ min: 10, max: 25 }),
    ...source[2],
  },
  {
    icon: 'mdi:file-document-alert-outline',
    title: $t('data.low_stock_count'),
    count: faker.number.int({ min: 25, max: 50 }),
    ...source[3],
  },
])
</script>

<template>
  <UPageGrid class="gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-px">
    <UPageCard
      v-for="{ icon, title, count, delta } of items"
      :icon
      :title
      :ui="{
        leading: 'p-2.5 rounded-full bg-primary/10 border border-primary/25 flex-col',
        title: 'font-normal text-sm text-default',
      }"
      variant="subtle"
      class="first:rounded-l-lg last:rounded-r-lg hover:z-1 lg:rounded-none"
    >
      <div class="flex items-center gap-3">
        <div class="text-2xl font-bold">{{ count }}</div>
        <UBadge v-if="delta" size="lg" :color="delta > 0 ? 'success' : 'error'" variant="subtle">
          {{ new Intl.NumberFormat('en', { style: 'percent' }).format(delta) }}
        </UBadge>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
