<template>
  <div class="maplibregl-ctrl maplibregl-ctrl-group MapLegend" :isOpen="legendIsShown">
    <v-btn icon="$vuetify" v-if="!legendIsShown" @click.stop="legendIsShown = true"> Button </v-btn>
    <div v-else class="MapLegend__layersCtn">
      <v-btn icon="$vuetify" @click.stop="legendIsShown = false"> Button </v-btn>
      {{ layersList }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyMapStore } from '@/stores/myMapStore'
import { onMounted, ref, watch } from 'vue'
const legendIsShown = ref(false)
const mapStore = useMyMapStore()
const layersList = ref<string[][]>([])

onMounted(() => {
  layersList.value = mapStore.atlasThematicMaps
    .map((map) => map.subLayers.filter((layer) => layer.isShown))
    .map((x) => x.map((y) => y.name))
})

watch(mapStore.atlasThematicMaps, () => {
  layersList.value = mapStore.atlasThematicMaps
    .map((map) => map.subLayers.filter((layer) => layer.isShown))
    .map((x) => x.map((y) => y.name))
})
</script>

<style lang="scss">
.MapLegend {
  flex-flow: row nowrap !important;

  &[isOpen='false'] {
    margin-right: 0.3rem !important;
  }
}

.MapLegend__layersCtn {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
}
</style>
