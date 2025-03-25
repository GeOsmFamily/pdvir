<template>
  <InfoCard id="test" typeLabel="test">
    <template #content>
      <span class="InfoCard__title">{{ features[0].name }}</span>
      {{ features }}
    </template>
  </InfoCard>
</template>

<script setup lang="ts">
import InfoCard from '@/components/global/InfoCard.vue'
import type { FilteredQGISLayerFeatures } from '@/models/interfaces/map/AtlasMap'

defineProps<{
  features: FilteredQGISLayerFeatures[]
}>()
</script>
