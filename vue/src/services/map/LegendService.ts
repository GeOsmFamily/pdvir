import { LayerType } from '@/models/enums/geo/LayerType'
import type { AtlasMap } from '@/models/interfaces/map/AtlasMap'
import type { AppLayerLegendItem, AtlasLayerLegendItem } from '@/models/interfaces/map/Legend'
import type { Ref } from 'vue'

export class LegendService {
  static updateLegendList(
    layerId: string,
    layerType: LayerType,
    legendList: Ref<(AppLayerLegendItem | AtlasLayerLegendItem)[]>,
    atlasThematicMaps: Ref<AtlasMap[]>
  ) {
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
          name: layerId,
          order: legendList.value.length
        })
      }
      if (layerType === LayerType.ATLAS_LAYER) {
        const atlasMap = atlasThematicMaps.value.find((x) => x.id === layerId)
        if (atlasMap) {
          legendList.value.push({
            id: atlasMap.id,
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
              .sort((a, b) => a.order - b.order)
          })
        }
      }
    }
  }

  static updateLegendOrder(
    map: maplibregl.Map,
    legendList: Ref<(AppLayerLegendItem | AtlasLayerLegendItem)[]>
  ) {
    legendList.value.forEach((legendItem, i) => {
      const beforeLayer = legendList.value[i + 1]?.id || null
      map.moveLayer(legendItem.id, beforeLayer as string)
    })
    const layers = map.getStyle().layers // Récupère la liste des couches
    console.log('Liste des couches:', layers)
  }
}
