<template>
  <Modal :title="$t('adminBoundaries.mapViewer')" show fit-to-content @close="$emit('close')">
    <template #content>
      <div id="adminBoundariesViewer"></div>
      <div class="legend">
        <div class="legend-item">
          <div class="legend-color" style="border: 2px solid #a98467"></div>
          <span>{{ $t('adminBoundaries.admin1') }}</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="border: 2px solid #adc178"></div>
          <span>{{ $t('adminBoundaries.admin2') }}</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="border: 2px solid #fca311"></div>
          <span>{{ $t('adminBoundaries.admin3') }}</span>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/global/Modal.vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { onMounted } from 'vue'
import type { Actor } from '@/models/interfaces/Actor'
import { AdminBoundariesService } from '@/services/adminBoundaries/AdminBoundariesService'

const props = defineProps<{
  actor: Actor
}>()

let mapViewer: maplibregl.Map | null = null

onMounted(() => {
  initMap()
})

function initMap() {
  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY
  mapViewer = new maplibregl.Map({
    container: 'adminBoundariesViewer',
    style: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${apiKey}`,
    center: [12.3547, 7.3697],
    zoom: 5,
    attributionControl: false
  })
  mapViewer.dragRotate.disable()
  mapViewer.touchZoomRotate.disableRotation()
  mapViewer.on('load', () => {
    addSourceAndLayer()
  })
}

function addSourceAndLayer() {
  if (props.actor.admin1List) {
    const admin1 = AdminBoundariesService.getGeoJsonfromAdminBoundaries(props.actor.admin1List)
    mapViewer?.addSource('admin1', {
      type: 'geojson',
      data: admin1 as any
    })
    mapViewer?.addLayer({
      id: 'admin1',
      type: 'line',
      source: 'admin1',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#a98467',
        'line-width': 2
      }
    })
    mapViewer?.addLayer({
      id: 'admin1-label',
      type: 'symbol',
      source: 'admin1',
      layout: {
        'text-field': ['get', 'adm1_name'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 16,
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
      },
      paint: {
        'text-color': '#a98467'
      }
    })
  }
  if (props.actor.admin2List) {
    const admin2 = AdminBoundariesService.getGeoJsonfromAdminBoundaries(props.actor.admin2List)
    mapViewer?.addSource('admin2', {
      type: 'geojson',
      data: admin2 as any
    })
    mapViewer?.addLayer({
      id: 'admin2',
      type: 'line',
      source: 'admin2',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#adc178',
        'line-width': 2
      }
    })
    mapViewer?.addLayer({
      id: 'admin2-label',
      type: 'symbol',
      source: 'admin2',
      layout: {
        'text-field': ['get', 'adm2_name'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 16,
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
      },
      paint: {
        'text-color': '#adc178'
      }
    })
  }
  if (props.actor.admin3List) {
    const admin3 = AdminBoundariesService.getGeoJsonfromAdminBoundaries(props.actor.admin3List)
    mapViewer?.addSource('admin3', {
      type: 'geojson',
      data: admin3 as any
    })
    mapViewer?.addLayer({
      id: 'admin3',
      type: 'line',
      source: 'admin3',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#fca311',
        'line-width': 2
      }
    })
    mapViewer?.addLayer({
      id: 'admin3-label',
      type: 'symbol',
      source: 'admin3',
      layout: {
        'text-field': ['get', 'adm3_name'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 16,
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
      },
      paint: {
        'text-color': '#fca311'
      }
    })
  }
}
</script>

<style lang="scss">
#adminBoundariesViewer {
  height: 70vh;
  width: 80vw;
}
.legend {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.legend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.legend-color {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  margin-bottom: 5px;
}

.legend span {
  font-size: 14px;
}
</style>
