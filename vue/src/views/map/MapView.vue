<template>
  <div id="map"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

onMounted(() => {
    const map = new maplibregl.Map({
        container: 'map', // container id
        style: {
            'version': 8,
            'sources': {
                'raster-tiles': {
                    'type': 'raster',
                    'tiles': [
                        // NOTE: Layers from Stadia Maps do not require an API key for localhost development or most production
                        // web deployments. See https://docs.stadiamaps.com/authentication/ for details.
                        'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
                    ],
                    'tileSize': 256,
                    'attribution':
                        'Map tiles by <a target="_blank" href="https://stamen.com">Stamen Design</a>; Hosting by <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>. Data &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'
                }
            },
            'layers': [
                {
                    'id': 'simple-tiles',
                    'type': 'raster',
                    'source': 'raster-tiles',
                    'minzoom': 0,
                    'maxzoom': 22
                }
            ]
        }, // style URL
        center: [0, 0], // starting position [lng, lat]
        zoom: 3 // starting zoom
    });

    map.on('load', () => {
        map.addSource('wms-test-source', {
            'type': 'raster',
            'tiles': [
                'https://qgis.puc.local/ogc/test_imposm?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=osm_amenities'
            ],
            'tileSize': 256
        });
        map.addLayer(
            {
                'id': 'wms-test-layer',
                'type': 'raster',
                'source': 'wms-test-source',
                'paint': {}
            }
        );



        

    });

  
})
</script>
<style>
#map{
    width: 100%;
    height: 100%;
}</style>
