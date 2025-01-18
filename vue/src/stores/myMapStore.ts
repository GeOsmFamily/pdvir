import { StoresList } from '@/models/enums/app/StoresList'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import type { OsmData } from '@/models/interfaces/geo/OsmData'
import type { Layer } from '@/models/interfaces/map/Layer'
import type Map from '@/components/map/Map.vue'
import type { AtlasMap } from '@/models/interfaces/map/AtlasMap'
import { MapAtlasService } from '@/services/map/MapAtlasService'
import type { AppLayerLegendItem, AtlasLayerLegendItem } from '@/models/interfaces/map/Legend'
import { LayerType } from '@/models/enums/geo/LayerType'
import { ItemType } from '@/models/enums/app/ItemType'

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
    updateLegendList(qgismapId, LayerType.ATLAS_LAYER)
  }

  const legendList: Ref<(AppLayerLegendItem | AtlasLayerLegendItem)[]> = ref([])
  watch(
    [
      () => actorLayer.value?.isShown,
      () => projectLayer.value?.isShown,
      () => resourceLayer.value?.isShown
    ],
    (
      [actorIsShown, projectIsShown, resourceIsShown],
      [prevActorIsShown, prevProjectIsShown, prevResourceIsShown]
    ) => {
      if (actorIsShown !== prevActorIsShown) {
        updateLegendList(ItemType.ACTOR, LayerType.APP_LAYER)
      }
      if (projectIsShown !== prevProjectIsShown) {
        updateLegendList(ItemType.PROJECT, LayerType.APP_LAYER)
      }
      if (resourceIsShown !== prevResourceIsShown) {
        updateLegendList(ItemType.RESOURCE, LayerType.APP_LAYER)
      }
    },
    { deep: true }
  )

  function updateLegendList(layerId: string, layerType: LayerType) {
    if (legendList.value.find((x) => x.id === layerId)) {
      legendList.value = legendList.value.filter((x) => x.id !== layerId)
      legendList.value.forEach((legendItem, i) => {
        legendItem.order = i
      })
    } else {
      if (layerType === LayerType.APP_LAYER) {
        legendList.value.push({
          id: layerId,
          type: LayerType.APP_LAYER,
          icon: `/src/assets/images/icons/map/${layerId}_icon.png`,
          name: 'Acteurs',
          order: legendList.value.length
        })
      }
      if (layerType === LayerType.ATLAS_LAYER) {
        const atlasMap = atlasThematicMaps.value.find((x) => x.id === layerId)
        if (atlasMap) {
          legendList.value.push({
            id: atlasMap.qgisProjectName,
            layerType: LayerType.ATLAS_LAYER,
            icon: atlasMap.mainLayer.icon as string,
            name: atlasMap.mainLayer.name,
            order: legendList.value.length,
            subLayers: atlasMap.subLayers
              .filter((subLayer) => subLayer.isShown)
              .map((subLayer) => ({
                name: subLayer.name,
                icon: subLayer.icon as string,
                order: subLayer.mapOrder as number
              }))
          })
        }
      }
    }
    console.log(legendList.value)
  }

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
    updateAtlasLayersVisibility,
    legendList
  }
})
