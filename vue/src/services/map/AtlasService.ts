import type { Atlas } from '@/models/interfaces/Atlas'
import type { AtlasMap } from '@/models/interfaces/map/AtlasMap'
import type Layer from '@/models/interfaces/map/Layer'
import { QgisMapMaplibreService } from '../qgisMap/QgisMapMaplibreService'

export class AtlasService {
  static qgisServerURL = import.meta.env.VITE_QGIS_SERVER_URL

  static setAtlasLayers(atlas: Atlas): AtlasMap[] {
    const atlasMaps: AtlasMap[] = []
    for (const map of atlas.maps) {
      const mainLayer: Layer = {
        id: map['@id'],
        name: map.name,
        isShown: false,
        icon: map.logo.contentUrl,
        opacity: 1
      }
      const subLayers: Layer[] =
        map.qgisProject.layers?.map((item) => {
          return {
            id: item,
            name: item,
            isShown: false,
            icon: item,
            opacity: 1
          }
        }) ?? []
      atlasMaps.push({
        id: map['@id'],
        mainLayer: mainLayer,
        subLayers: subLayers,
        qgisProjectName: map.qgisProject.name,
        atlasId: atlas['@id'],
        needsToBeVisualiseAsPlainImageInsteadOfWMS: map.needsToBeVisualiseAsPlainImageInsteadOfWMS
      })
    }
    return atlasMaps
  }

  static handleAtlasLayersVisibility(
    atlasMaps: AtlasMap[],
    map: maplibregl.Map | null | undefined,
    qgismapId: string,
    alreadyAddedImageSources: string[]
  ) {
    if (map) {
      for (const atlasMap of atlasMaps) {
        if (atlasMap.id !== qgismapId) continue

        const source = atlasMap.id
        let keepSource = true
        const refreshSource = atlasMap.needsToBeVisualiseAsPlainImageInsteadOfWMS
        const sourceExists = map.getSource(source)
        const layersToAdd = []

        if (atlasMap.mainLayer.isShown) {
          layersToAdd.push(
            ...atlasMap.subLayers.filter((layer) => layer.isShown).map((layer) => layer.name)
          )
        } else {
          if (atlasMap.needsToBeVisualiseAsPlainImageInsteadOfWMS) {
            keepSource = false
          }
        }

        if (!keepSource) {
          QgisMapMaplibreService.removeSourceAndLayers(map, source)
          return
        }
        if (refreshSource && keepSource && sourceExists) {
          QgisMapMaplibreService.updateMapImageSourceCoordinates(
            map,
            source,
            atlasMap.qgisProjectName,
            layersToAdd
          )
        } else {
          if (atlasMap.needsToBeVisualiseAsPlainImageInsteadOfWMS) {
            QgisMapMaplibreService.addImageSourceAndLayers(
              map,
              source,
              atlasMap.qgisProjectName,
              layersToAdd,
              !alreadyAddedImageSources.includes(source)
            )
          } else {
            QgisMapMaplibreService.addWMSSourceAndLayer(
              map,
              source,
              atlasMap.qgisProjectName,
              layersToAdd
            )
          }
        }
      }
    }
  }
}
