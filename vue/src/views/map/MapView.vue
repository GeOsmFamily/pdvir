<template>
  <div id="map"></div>
  <div class="flex my-4">
    <v-btn @click="isFormShown = true" prepend-icon="mdi-plus" color="main-red" class="fit"
      >Ajouter un projet QGIS</v-btn
    >
  </div>
  <code v-if="wmsUrl && qgisMap?.qgisProject.name">{{ wmsUrl }}</code>
  <QgisMapForm
    :type="FormType.CREATE"
    :qgis-map="qgisMap"
    :isShown="isFormShown"
    @close="isFormShown = false"
    @submitted="(qgisMap) => updateQgisMap(qgisMap)"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import QgisMapForm from './components/QgisMapForm.vue'
import type { QgisMap } from '@/models/interfaces/QgisMap'
import { useQgisMapStore } from '@/stores/qgisMapStore'
import { FormType } from '@/models/enums/app/FormType'
const wmsUrl = ref('')
const qgisMap = ref<QgisMap | null>(null)
const isFormShown = ref(false)
const qgisMapStore = useQgisMapStore()
const map = ref<maplibregl.Map | null>(null)
const updateQgisMap = (qgisMap: QgisMap) => {
  qgisMapStore.qgisMap = qgisMap
  isFormShown.value = false
  updateImage()
}

const updateImage = () => {
  if (!map.value) return
  const source = map.value.getSource('wms-layer')
  ;(source as any).updateImage({
    url: getWmsLayerUrl(),
    coordinates: [
      [map.value.getBounds().getWest(), map.value.getBounds().getNorth()], // Coin supérieur gauche
      [map.value.getBounds().getEast(), map.value.getBounds().getNorth()], // Coin supérieur droit
      [map.value.getBounds().getEast(), map.value.getBounds().getSouth()], // Coin inférieur droit
      [map.value.getBounds().getWest(), map.value.getBounds().getSouth()]
    ]
  })
}

const getWmsLayerUrl = () => {
  if (!map.value) return ''
  // Récupération des dimensions et de la bbox de la carte
  const bounds = map.value.getBounds()
  const width = map.value.getCanvas().width
  const height = map.value.getCanvas().height

  // Extraire les coordonnées en EPSG:4326
  const southWest = bounds.getSouthWest() // Coin inférieur gauche
  const northEast = bounds.getNorthEast() // Coin supérieur droit

  // Construire la bbox en EPSG:3857
  const bbox3857 = [
    southWest.lat,
    southWest.lng, // Coin inférieur gauche, // Coin inférieur gauche
    northEast.lat,
    northEast.lng // Coin supérieur droit
  ]

  console.log('BBOX en EPSG:3857:', bbox3857)

  // Construction de l'URL GetMap
  // return `https://puc.local/api/qgis/ogc/Cercles_proportionnels?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=limites_regionales&STYLES=&CRS=EPSG:4326&TILED=false&DPI=96&WIDTH=${width}&HEIGHT=${height}&BBOX=${bbox3857}`
  // return `https://puc.local/api/qgis/ogc/Carte_de_chaleur?SERVICE=WMS&VERSION=1.3.0&LAYERS=yeaop,Limites_yaounde,centroids_bati&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&STYLES=&CRS=EPSG:4326&TILED=false&DPI=96&WIDTH=${width}&HEIGHT=${height}&BBOX=${bbox3857}`
  wmsUrl.value = `https://puc.local/api/qgis/ogc/${qgisMapStore.qgisMap?.qgisProject.name}?SERVICE=WMS&VERSION=1.3.0&LAYERS=${qgisMapStore.qgisMap?.qgisProject.layers?.join(',')}&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&STYLES=&CRS=EPSG:4326&TILED=false&DPI=96&WIDTH=${width}&HEIGHT=${height}&BBOX=${bbox3857}`
  return wmsUrl.value
}

onMounted(() => {
  map.value = new maplibregl.Map({
    container: 'map', // container id
    style: {
      version: 8,
      sources: {
        'raster-tiles': {
          type: 'raster',
          tiles: [
            // NOTE: Layers from Stadia Maps do not require an API key for localhost development or most production
            // web deployments. See https://docs.stadiamaps.com/authentication/ for details.
            'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
          ],
          tileSize: 256,
          attribution:
            'Map tiles by <a target="_blank" href="https://stamen.com">Stamen Design</a>; Hosting by <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>. Data &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'
        }
      },
      layers: [
        {
          id: 'simple-tiles',
          type: 'raster',
          source: 'raster-tiles',
          minzoom: 0,
          maxzoom: 22
        }
      ]
    }, // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 3 // starting zoom
  })

  if (map.value == null) return
  map.value.on('load', () => {
    // map.addSource('wms-test-source', {
    //     'type': 'raster',
    //     'tiles': [
    //         'https://qgis.puc.local/ogc/test?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=countries'
    //     ],
    //     'tileSize': 256
    // });
    // map.addLayer(
    //     {
    //         'id': 'wms-test-layer',
    //         'type': 'raster',
    //         'source': 'wms-test-source',
    //         'paint': {}
    //     }
    // );

    // map.addSource('wms-test-source2', {
    //     'type': 'raster',
    //     'tiles': [
    //         'https://qgis.puc.local/ogc/Cercles_proportionnels?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&srs=EPSG:3857&transparent=true&width=512&height=512&layers=limites_regionales'
    //     ],
    //     'tileSize': 512
    // });

    // map.addLayer(
    //     {
    //         'id': 'wms-test-layer2',
    //         'type': 'raster',
    //         'source': 'wms-test-source2',
    //         'paint': {}
    //     }
    // );
    if (!map.value) return
    // Ajout de la source de l'image dans MapLibre
    console.log([
      [map.value.getBounds().getWest(), map.value.getBounds().getNorth()], // Coin supérieur gauche
      [map.value.getBounds().getEast(), map.value.getBounds().getNorth()], // Coin supérieur droit
      [map.value.getBounds().getEast(), map.value.getBounds().getSouth()], // Coin inférieur droit
      [map.value.getBounds().getWest(), map.value.getBounds().getSouth()] // Coin inférieur gauche
    ])
    map.value.addSource('wms-layer', {
      type: 'image',
      url: getWmsLayerUrl(),
      coordinates: [
        [map.value.getBounds().getWest(), map.value.getBounds().getNorth()], // Coin supérieur gauche
        [map.value.getBounds().getEast(), map.value.getBounds().getNorth()], // Coin supérieur droit
        [map.value.getBounds().getEast(), map.value.getBounds().getSouth()], // Coin inférieur droit
        [map.value.getBounds().getWest(), map.value.getBounds().getSouth()] // Coin inférieur gauche
      ]
    })

    // Ajout de la couche à partir de la source
    map.value.addLayer({
      id: 'wms-layer',
      type: 'raster',
      source: 'wms-layer',
      paint: {
        'raster-fade-duration': 0
      }
    })
  })
  map.value.on('moveend', () => {
    updateImage()
  })
})
</script>
<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
