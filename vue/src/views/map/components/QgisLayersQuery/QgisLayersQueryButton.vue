<template>
  <div class="maplibregl-ctrl maplibregl-ctrl-group QgisQueryButton">
    <v-btn
      icon="mdi-database-search"
      @click.stop="mapStore.isQgisLayerQueryActive = !mapStore.isQgisLayerQueryActive"
      :class="{
        'text-white': mapStore.isQgisLayerQueryActive,
        'text-main-blue': !mapStore.isQgisLayerQueryActive
      }"
      :color="mapStore.isQgisLayerQueryActive ? 'main-blue' : 'white'"
    ></v-btn>
  </div>
</template>
<script setup lang="ts">
import { useMyMapStore } from '@/stores/myMapStore'
import { computed, watch } from 'vue'

const mapStore = useMyMapStore()
const map = computed(() => mapStore.myMap?.map)

watch(
  () => mapStore.isQgisLayerQueryActive,
  (isActive) => {
    if (isActive) {
      if (map.value) {
        map.value.getCanvas().style.cursor = 'pointer'
        map.value.on('click', queryQgisLayer)
      }
    } else {
      if (map.value) {
        map.value.getCanvas().style.cursor = ''
        map.value.off('click', queryQgisLayer)
      }
    }
  }
)

function queryQgisLayer(e: any) {
  console.log(e)
  //   mapStore.isQgisLayerQueryActive = false
}
</script>

<style>
.QgisQueryButton {
  flex-flow: row nowrap !important;
  margin-right: 0.3rem !important;
}
</style>
