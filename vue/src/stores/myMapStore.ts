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
import { LegendService } from '@/services/map/LegendService'

export const useMyMapStore = defineStore(StoresList.MY_MAP, () => {
  const myMap: Ref<InstanceType<typeof Map> | undefined> = ref()
  const isRightSidebarShown = ref(true)
  const isLeftSidebarShown = ref(true)
  const mapSearch: Ref<OsmData | null> = ref(null)
  const isMapAlreadyBeenMounted = ref(false)

  const actorLayer: Ref<Layer | null> = ref(null)
  const actorSubLayers: Ref<Layer[]> = ref([])
  const resourceLayer: Ref<Layer | null> = ref(null)
  const resourceSubLayers: Ref<Layer[]> = ref([])
  const projectLayer: Ref<Layer | null> = ref(null)
  const projectSubLayers: Ref<Layer[]> = ref([])

  const atlasThematicMaps: Ref<AtlasMap[]> = ref([]) // Updated from atlasStore
  let alreadyAddedImageSources: string[] = [] //Used to avoid triggering maplibre event as much time as the layer has been added to the map
  function updateAtlasLayersVisibility(qgismapId: string, updateLegend = true) {
    MapAtlasService.handleAtlasLayersVisibility(
      atlasThematicMaps.value,
      myMap.value?.map,
      qgismapId,
      alreadyAddedImageSources
    )
    alreadyAddedImageSources = [...new Set([...alreadyAddedImageSources, qgismapId])]
    if (updateLegend) {
      LegendService.updateLegendList(
        qgismapId,
        LayerType.ATLAS_LAYER,
        legendList,
        atlasThematicMaps
      )
    }
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
        LegendService.updateLegendList(
          ItemType.ACTOR,
          LayerType.APP_LAYER,
          legendList,
          atlasThematicMaps
        )
      }
      if (projectIsShown !== prevProjectIsShown) {
        LegendService.updateLegendList(
          ItemType.PROJECT,
          LayerType.APP_LAYER,
          legendList,
          atlasThematicMaps
        )
      }
      if (resourceIsShown !== prevResourceIsShown) {
        LegendService.updateLegendList(
          ItemType.RESOURCE,
          LayerType.APP_LAYER,
          legendList,
          atlasThematicMaps
        )
      }
    },
    { deep: true }
  )

  function updateLegendOrder() {
    LegendService.updateLegendOrder(myMap.value?.map as maplibregl.Map, legendList)
  }

  function updateAtlasSubLayersOrder(atlasMapLayer: AtlasLayerLegendItem) {
    LegendService.updateAtlasSubLayersOrder(atlasMapLayer, atlasThematicMaps)
    updateAtlasLayersVisibility(atlasMapLayer.id, false)
    updateLegendOrder()
  }

  return {
    isRightSidebarShown,
    isLeftSidebarShown,
    isMapAlreadyBeenMounted,
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
    legendList,
    updateLegendOrder,
    updateAtlasSubLayersOrder
  }
})
