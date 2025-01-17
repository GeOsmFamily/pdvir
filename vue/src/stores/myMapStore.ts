import { StoresList } from '@/models/enums/app/StoresList'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { OsmData } from '@/models/interfaces/geo/OsmData'
import type { Layer } from '@/models/interfaces/map/Layer'
import type Map from '@/components/map/Map.vue'
import type { AtlasMap } from '@/models/interfaces/map/AtlasMap'
import { MapAtlasService } from '@/services/map/MapAtlasService'
import type { AppLayerLegendItem, AtlasLayerLegendItem } from '@/models/interfaces/map/Legend'
import { LayerType } from '@/models/enums/geo/LayerType'

export const useMyMapStore = defineStore(StoresList.MY_MAP, () => {
  const myMap: Ref<InstanceType<typeof Map> | undefined> = ref()
  const isRightSidebarShown = ref(true)
  const isLeftSidebarShown = ref(true)
  const mapSearch: Ref<OsmData | null> = ref(null)

  const actorLayer: Ref<Layer | null> = ref(null)
  const actorSubLayers: Ref<Layer[]> = ref([])
  const resourceLayer: Ref<Layer | null> = ref(null)
  const resourceSubLayers: Ref<Layer[]> = ref([])
  const projectLayer: Ref<Layer | null> = ref(null)
  const projectSubLayers: Ref<Layer[]> = ref([])

  const atlasThematicMaps: Ref<AtlasMap[]> = ref([]) // Updated from atlasStore
  let alreadyAddedImageSources: string[] = [] //Used to avoid triggering maplibre event as much time as the layer has been added to the map
  function updateAtlasLayersVisibility(qgismapId: string) {
    MapAtlasService.handleAtlasLayersVisibility(
      atlasThematicMaps.value,
      myMap.value?.map,
      qgismapId,
      alreadyAddedImageSources
    )
    alreadyAddedImageSources = [...new Set([...alreadyAddedImageSources, qgismapId])]
    updateLegendList()
  }

  function updateLegendList() {
    const legendList: (AppLayerLegendItem | AtlasLayerLegendItem)[] = []

    if (actorLayer.value?.isShown || projectLayer.value?.isShown || resourceLayer.value?.isShown) {
      if (actorLayer.value?.isShown) {
        legendList.push({
          id: 'test',
          type: LayerType.APP_LAYER,
          icon: 'toset',
          name: 'Acteurs'
        })
      }
      if (projectLayer.value?.isShown) {
        legendList.push({
          id: 'test',
          type: LayerType.APP_LAYER,
          icon: 'toset',
          name: 'Projets'
        })
      }
      if (resourceLayer.value?.isShown) {
        legendList.push({
          id: 'test',
          type: LayerType.APP_LAYER,
          icon: 'toset',
          name: 'Ressources'
        })
      }
    }
    atlasThematicMaps.value.forEach((atlasMap) => {
      if (atlasMap.mainLayer?.isShown) {
        legendList.push({
          id: atlasMap.qgisProjectName,
          layerType: LayerType.ATLAS_LAYER,
          icon: atlasMap.mainLayer.icon as string,
          name: atlasMap.mainLayer.name,
          subLayers: atlasMap.subLayers
            .filter((subLayer) => subLayer.isShown)
            .map((subLayer) => ({
              name: subLayer.name,
              icon: subLayer.icon as string,
              order: subLayer.mapOrder as number
            }))
        })
      }
    })
    console.log(atlasThematicMaps.value)
    console.log(legendList)
  }

  // const THElegendList = ref<(AppLayerLegendItem | AtlasLayerLegendItem)[]>([])

  return {
    isRightSidebarShown,
    isLeftSidebarShown,
    myMap,
    mapSearch,
    actorLayer,
    actorSubLayers,
    projectLayer,
    projectSubLayers,
    resourceLayer,
    resourceSubLayers,
    atlasThematicMaps,
    updateAtlasLayersVisibility
  }
})
