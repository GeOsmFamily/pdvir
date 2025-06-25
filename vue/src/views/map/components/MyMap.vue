<template>
  <div class="MyMap">
    <Map class="MyMap__map" ref="my-map" />
    <BasemapPicker ref="basemap-picker" v-model="basemap" />
    <ScaleControl ref="scale-control" />
    <MyMapLegend ref="map-legend" />
    <MyMapExportButton ref="map-export-button" />
    <QgisLayersQueryButton ref="qgis-query-button" />
    <ToggleSidebarControl
      v-model="myMapStore.isLeftSidebarShown"
      :inversed-direction="true"
      :is-higlighted-when-off="true"
      ref="toggle-left-sidebar-control"
    />
    <ToggleSidebarControl
      style="order: -1"
      v-model="myMapStore.isRightSidebarShown"
      :is-higlighted-when-off="true"
      ref="toggle-right-sidebar-control"
    />
    <MyMapItemPopup />
  </div>
</template>

<script setup lang="ts">
import BasemapPicker from '@/components/map/controls/BasemapPicker.vue'
import MyMapLegend from '@/views/map/components/MyMapLegend.vue'
import ToggleSidebarControl from '@/components/map/controls/ToggleSidebarControl.vue'
import Map from '@/components/map/Map.vue'
import type Basemap from '@/models/interfaces/map/Basemap'
import MapService, { IControl } from '@/services/map/MapService'
import { useMyMapStore } from '@/stores/myMapStore'
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import MyMapItemPopup from '@/views/map/components/MyMapItemPopup.vue'
import MyMapExportButton from '@/views/map/components/export/MyMapExportButton.vue'
import ScaleControl from '@/components/map/controls/ScaleControl.vue'
import QgisLayersQueryButton from './QgisLayersQuery/QgisLayersQueryButton.vue'
import maplibregl, { LngLatBounds } from 'maplibre-gl';
//import doualaMask from '@/assets/geojsons/mask_douala.json'
//import batouriMask from '@/assets/geojsons/mask_batouri.json'
//import camerounMask from '@/assets/geojsons/mask_cameroun.json';
import regionsSource from '@/assets/geojsons/bounderies/region.json'
import departementSource from '@/assets/geojsons/bounderies/departement.json'
import communesSource from '@/assets/geojsons/bounderies/arrondissement.json'

type MapType = InstanceType<typeof Map>
const basemap = ref<Basemap>()
const myMapStore = useMyMapStore()
const myMap = useTemplateRef<MapType>('my-map')
const toggleRightSidebarControl = useTemplateRef('toggle-right-sidebar-control')
const toggleLeftSidebarControl = useTemplateRef('toggle-left-sidebar-control')
const basemapPicker = useTemplateRef('basemap-picker')
const mapLegend = useTemplateRef('map-legend')
const mapExportButton = useTemplateRef('map-export-button')
const scaleControl = useTemplateRef('scale-control')
const qgisQueryButton = useTemplateRef('qgis-query-button')
const map = computed(() => myMap.value?.map)    
const camerounBbox: any=[8.382218,1.651795,16.191101,13.083333]


onMounted(() => {
  if (myMap.value) {
    myMapStore.myMap = myMap.value
  }
  if (map.value != null) {
    map.value.addControl(new IControl(basemapPicker), 'bottom-right')
    map.value.addControl(new IControl(toggleRightSidebarControl), 'top-right')
    map.value.addControl(new IControl(toggleLeftSidebarControl), 'top-left')
    map.value.addControl(new IControl(mapLegend), 'bottom-right')
    map.value.addControl(new IControl(mapExportButton), 'bottom-right')
    map.value.addControl(new IControl(qgisQueryButton), 'bottom-right')
    map.value.addControl(new IControl(scaleControl), 'bottom-left')
    // If map has already been visited, we set the previous bbox
    if (myMapStore.bbox) {
      map.value.fitBounds(myMapStore.bbox)
    }
    map.value.on('moveend', () => {
      if (map.value?.getBounds()) {
        myMapStore.bbox = map.value?.getBounds()
      }
    })
    map.value.on('idle', () => {
      myMapStore.mapCanvasToDataUrl = map.value?.getCanvas().toDataURL() as string
    })
  }
})

watch(basemap, () => {
  if (map.value != null && basemap.value != null) {
    MapService.updateStyle(map.value, basemap.value).then(() => {
      // Check for the source tile size as the scale control is based on it
      const sources = map.value?.getStyle().sources
      for (const source in sources) {
        const tileSource = map.value?.getSource(source)
        if (tileSource && tileSource.tileSize) {
          myMapStore.tileSize = tileSource.tileSize
        }
      }
    })
  }
})

interface GeometryFeature {
  type: string;
  properties: {
    'ref:COG': string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
}

// Options pour personnaliser l'apparence de la couche
interface BoundaryLayerOptions {
  lineColor?: string;
  lineWidth?: number;
  lineOpacity?: number;
}

// Constantes pour les IDs de couche et source
const BOUNDARY_LAYER_ID = 'polygon-boundary-layer';
const BOUNDARY_SOURCE_ID = 'polygon-boundary-source';

//this is the watcher that will change the mask when the user selects a town
/* watch(
  () => myMapStore.selectedTown,
  (newValue) => {
    const doualaBbox: any=[9.336134, 3.740717, 9.864412, 4.225236];
    const batouriBbox: any=[13.940685,4.212827,14.882435,4.767127];
    const newBbox = newValue === 'batouri' 
      ? new LngLatBounds(batouriBbox) 
      : newValue === 'douala'
      ? new LngLatBounds(doualaBbox)
      : new LngLatBounds(camerounBbox);
      
    
      
    if (map.value != null && newValue != null && newValue != null) {
      map.value.fitBounds(newBbox, { padding: 75 });
      (map.value.getSource('camerounMask') as maplibregl.GeoJSONSource).setData(newMaskSource)
    }
  }
) */

watch(
  () => myMapStore.selectedBoundary,
  (newValue)=>{
     if (newValue===null) {
      map.value?.fitBounds(camerounBbox, { padding: 75 });
      return 
    }
    let polygonSource
    if(newValue && newValue.length===2){//it's a region
      type RegionFeature = {
      type: string;
      properties: {
        'ref:COG': string;
        [key: string]: any;
      };
      geometry: {
        type: string;
        coordinates: any;
      };
      };
      polygonSource = (regionsSource.features as RegionFeature[]).find(item => item.properties['ref:COG'] === newValue);
    }else if(newValue && newValue.length===4){//it's a department
      polygonSource=(departementSource as any).features.find((item: any) =>item.properties['ref:COG']===newValue);
    }else if(newValue && newValue.length===6){//it's a commune
      polygonSource=(communesSource as any).features.find((item: any)=>item.properties['ref:COG']===newValue);
    }
    addPolygonBoundaryLayer(polygonSource)
  }
)


interface BoundaryLayerOptions {
  lineColor?: string;
  lineWidth?: number;
  lineOpacity?: number;
}

/**
 * Ajoute ou met à jour une couche de limites de polygone sur la carte MapLibre
 * Assume que la variable 'map' (MapLibreMap) est disponible dans le scope
 * @param feature - Objet contenant la géométrie du polygone
 * @param options - Options pour personnaliser l'apparence de la couche
 */
const addPolygonBoundaryLayer = (
  feature: GeometryFeature, 
  options: BoundaryLayerOptions = {}
): void => {
  // Options par défaut
  const {
    lineColor = '#005E84',
    lineWidth = 4,
    lineOpacity = 1
  } = options;

  try {
    // Créer un objet GeoJSON valide
    const geoJsonData = {
      type: 'FeatureCollection',
      features: [
        {
          type: feature.type || 'Feature',
          properties: feature.properties,
          geometry: feature.geometry
        }
      ]
    };

    // Vérifier si la source existe déjà
    if (map.value?.getSource(BOUNDARY_SOURCE_ID)) {
      // Mettre à jour la source existante
      const source = map.value?.getSource(BOUNDARY_SOURCE_ID) as any;
      source.setData(geoJsonData);
    } else {
      // Ajouter une nouvelle source
      map.value?.addSource(BOUNDARY_SOURCE_ID, {
        type: 'geojson',
        data: geoJsonData as any
      });
    }

    // Vérifier si la couche existe déjà
    if (!map.value?.getLayer(BOUNDARY_LAYER_ID)) {
      // Ajouter la couche seulement si elle n'existe pas
      map.value?.addLayer({
        id: BOUNDARY_LAYER_ID,
        type: 'line',
        source: BOUNDARY_SOURCE_ID,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': lineColor,
          'line-width': lineWidth,
          'line-opacity': lineOpacity
        }
      });
    } else {
      // Mettre à jour les propriétés de style de la couche existante
      map.value?.setPaintProperty(BOUNDARY_LAYER_ID, 'line-color', lineColor);
      map.value?.setPaintProperty(BOUNDARY_LAYER_ID, 'line-width', lineWidth);
      map.value?.setPaintProperty(BOUNDARY_LAYER_ID, 'line-opacity', lineOpacity);
    }
    zoomToPolygon(feature.geometry.coordinates);

  } catch (error) {
    console.error(error);
    removePolygonBoundaryLayer()
  }
};

/**
 * Supprime la couche de limites de la carte
 */
const removePolygonBoundaryLayer = (): void => {
  try {
    // Supprimer la couche si elle existe
    if (map.value?.getLayer(BOUNDARY_LAYER_ID)) {
      map.value?.removeLayer(BOUNDARY_LAYER_ID);
    }

    // Supprimer la source si elle existe
    if (map.value?.getSource(BOUNDARY_SOURCE_ID)) {
      map.value?.removeSource(BOUNDARY_SOURCE_ID);
    }

  } catch (error) {
    console.error('Erreur lors de la suppression de la couche:', error);
  }
};

const zoomToPolygon = (coordinates: any) => {
  try {
    if (!coordinates || coordinates.length === 0) {
      console.warn('Coordonnées vides ou invalides');
      return;
    }

    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    // Fonction pour traiter un seul anneau de coordonnées
    const processRing = (ring: any[]) => {
      ring.forEach((coord: any) => {
        if (Array.isArray(coord) && coord.length >= 2) {
          const lng = coord[0];
          const lat = coord[1];
          
          if (typeof lng === 'number' && typeof lat === 'number' && 
              !isNaN(lng) && !isNaN(lat)) {
            minLng = Math.min(minLng, lng);
            maxLng = Math.max(maxLng, lng);
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
          }
        }
      });
    };

    // Déterminer le type de géométrie et traiter en conséquence
    if (coordinates[0] && Array.isArray(coordinates[0])) {
      if (Array.isArray(coordinates[0][0])) {
        // Cas Polygon: coordinates = [ring1, ring2, ...] où ring = [[lng,lat], [lng,lat], ...]
        // ou MultiPolygon: coordinates = [polygon1, polygon2, ...] où polygon = [ring1, ring2, ...]
        
        if (Array.isArray(coordinates[0][0][0])) {
          // MultiPolygon: coordinates[i][j][k] = [lng, lat]
          coordinates.forEach((polygon: any) => {
            polygon.forEach((ring: any) => {
              processRing(ring);
            });
          });
        } else {
          // Polygon: coordinates[i][j] = [lng, lat]
          coordinates.forEach((ring: any) => {
            processRing(ring);
          });
        }
      } else {
        // Cas LineString ou autres: coordinates = [[lng,lat], [lng,lat], ...]
        processRing(coordinates);
      }
    }

    // Vérifier que nous avons des coordonnées valides
    if (!isFinite(minLng) || !isFinite(maxLng) || !isFinite(minLat) || !isFinite(maxLat)) {
      console.warn('Aucune coordonnée valide trouvée');
      return;
    }

    // Créer les bounds et ajuster la vue
    const newBbox = new maplibregl.LngLatBounds([minLng, minLat], [maxLng, maxLat]);
    map.value?.fitBounds(newBbox, { 
      padding: 50,
      duration: 1000 // Animation de 1 seconde
    });


  } catch (error) {
    console.error('Erreur lors du zoom vers le polygone:', error);
  }
};

watch(
  () => myMapStore.mapSearch?.bbox,
  (newValue) => {
    if (map.value != null && newValue != null && newValue != null) {
      map.value.fitBounds(newValue, { padding: 75 })
    }
  }
)
</script>

<style lang="scss">
.MyMap {
  width: 100%;
  height: 100%;
  position: relative;

  .MyMap__map {
    width: 100%;
    height: 100%;

    .maplibregl-ctrl-top-right {
      align-items: flex-end;
    }
    .maplibregl-ctrl-bottom-right {
      align-items: flex-end;
    }
  }
}
</style>
