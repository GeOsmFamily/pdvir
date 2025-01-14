import type { Atlas } from '@/models/interfaces/Atlas'
import type { AtlasMap } from '@/models/interfaces/map/AtlasMap'
import type Layer from '@/models/interfaces/map/Layer'

export class AtlasService {
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
        subLayers: subLayers
      })
    }
    return atlasMaps
  }
}
