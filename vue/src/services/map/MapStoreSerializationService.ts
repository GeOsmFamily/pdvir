import type { AtlasMap } from '@/models/interfaces/map/AtlasMap'
import type { Layer } from '@/models/interfaces/map/Layer'
import type { MapState } from '@/models/interfaces/map/MapState'
import type { StoreGeneric } from 'pinia'

export class MapStoreSerializationService {
  static serializeStore(store: StoreGeneric): string {
    const stateToSave: MapState = {
      layers: {},
      bbox: store.bbox
    }
    if (store.actorLayer.isShown)
      stateToSave.layers.actors = store.actorSubLayers
        .filter((l: Layer) => l.isShown)
        .map((l: Layer) => l.id)
    if (store.resourceLayer.isShown)
      stateToSave.layers.resources = store.resourceSubLayers
        .filter((l: Layer) => l.isShown)
        .map((l: Layer) => l.id)
    if (store.projectLayer.isShown)
      stateToSave.layers.projects = store.projectSubLayers
        .filter((l: Layer) => l.isShown)
        .map((l: Layer) => l.id)
    if (store.atlasThematicMaps.some((x: AtlasMap) => x.mainLayer.isShown)) {
      stateToSave.layers.atlasMaps = store.atlasThematicMaps
        .filter((x: AtlasMap) => x.mainLayer.isShown)
        .map((x: AtlasMap) => ({
          id: x.id,
          subLayers: x.subLayers.filter((l: Layer) => l.isShown).map((l: Layer) => l.id)
        }))
    }

    return btoa(encodeURIComponent(JSON.stringify(stateToSave)))
  }

  static deserializeStore(encodedState: string): MapState {
    try {
      const decodedString = decodeURIComponent(atob(encodedState))
      const decodedState = JSON.parse(decodedString)
      return decodedState || {}
    } catch (error) {
      console.error('Error parsing store state:', error)
      return {} as MapState
    }
  }
}
