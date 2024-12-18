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

        // Ajout de la source de l'image dans MapLibre
        map.addSource('wms-layer', {
            'type': 'image',
            'url': getURL(map),
            'coordinates': [
                [map.getBounds().getWest(), map.getBounds().getNorth()], // Coin supérieur gauche
                [map.getBounds().getEast(), map.getBounds().getNorth()], // Coin supérieur droit
                [map.getBounds().getEast(), map.getBounds().getSouth()], // Coin inférieur droit
                [map.getBounds().getWest(), map.getBounds().getSouth()]  // Coin inférieur gauche
            ]
        });

        // Ajout de la couche à partir de la source
        map.addLayer({
            id: 'wms-layer',
            type: 'raster',
            source: 'wms-layer',
            paint: {
                'raster-fade-duration': 0
            }
        });

        map.on("moveend", () => {
            const wmsLayerUrl = getURL(map);
            const source = map.getSource('wms-layer')
            console.log(source);
            (source as any).setCoordinates([
                [map.getBounds().getWest(), map.getBounds().getNorth()], // Coin supérieur gauche
                [map.getBounds().getEast(), map.getBounds().getNorth()], // Coin supérieur droit
                [map.getBounds().getEast(), map.getBounds().getSouth()], // Coin inférieur droit
                [map.getBounds().getWest(), map.getBounds().getSouth()]
        ]);
            (map.getSource('wms-layer') as any)!.updateImage({ url: wmsLayerUrl });
        });

    });

    function getURL(map: any) {
        // Récupération des dimensions et de la bbox de la carte
        const bounds = map.getBounds();
        const width = map.getCanvas().width;
        const height = map.getCanvas().height;

        // Extraire les coordonnées en EPSG:4326
        const southWest = bounds.getSouthWest(); // Coin inférieur gauche
        const northEast = bounds.getNorthEast(); // Coin supérieur droit


        // Construire la bbox en EPSG:3857
        const bbox3857 = [
        southWest.lat, southWest.lng, // Coin inférieur gauche, // Coin inférieur gauche
        northEast.lat, northEast.lng  // Coin supérieur droit
        ];

        console.log('BBOX en EPSG:3857:', bbox3857);

        
        // Construction de l'URL GetMap
        return `https://qgis.puc.local/ogc/Cercles_proportionnels?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=limites_regionales&STYLES=&CRS=EPSG:4326&TILED=false&DPI=96&WIDTH=${width}&HEIGHT=${height}&BBOX=${bbox3857}`;
    }
})
</script>
<style>
#map{
    width: 100%;
    height: 100%;
}</style>
