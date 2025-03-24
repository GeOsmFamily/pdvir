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
import { NotificationType } from '@/models/enums/app/NotificationType'
import { LayerType } from '@/models/enums/geo/LayerType'
import { addNotification } from '@/services/notifications/NotificationService'
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
  if (mapStore.legendList.some((x) => x.layerType === LayerType.ATLAS_LAYER)) {
    const lngLat = e.lngLat
    console.log(lngLat)
    console.log(mapStore.legendList)
    //   mapStore.isQgisLayerQueryActive = false
  } else {
    addNotification('No QGIS layers are available for query', NotificationType.ERROR)
  }
  //   mapStore.isQgisLayerQueryActive = false
}
</script>

<style>
.QgisQueryButton {
  flex-flow: row nowrap !important;
  margin-right: 0.3rem !important;
}
</style>
