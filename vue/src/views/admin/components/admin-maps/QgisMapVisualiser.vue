<template>
  <Modal
    :title="qgisMap.name"
    :show="qgisMapStore.isQgisMapVisualiserShown"
    @close="qgisMapStore.isQgisMapVisualiserShown = false"
  >
    <template #content>
      <div id="qgisMapViewer"></div>
    </template>
    <template #footer-left>
      <span class="text-action" @click="qgisMapStore.isQgisMapFormShown = false">{{
        $t('forms.cancel')
      }}</span>
    </template>
    <template #footer-right></template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/global/Modal.vue'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import type { QgisMap } from '@/models/interfaces/QgisMap'
import maplibregl from 'maplibre-gl'
import { onMounted } from 'vue'

const props = defineProps<{
  qgisMap: QgisMap
}>()

const qgisMapStore = useQgisMapStore()
let mapViewer: maplibregl.Map | null = null

onMounted(() => {
  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY
  mapViewer = new maplibregl.Map({
    container: 'qgisMapViewer',
    style: `https://api.maptiler.com/maps/openstreetmap/style.json?key=${apiKey}`,
    center: [0, 0],
    zoom: 1,
    attributionControl: false
  })
  mapViewer.dragRotate.disable()
  mapViewer.touchZoomRotate.disableRotation()
})
</script>

<style lang="scss">
#qgisMapViewer {
  height: 100%;
  width: 100%;
}
</style>
