import type { LngLatBounds } from 'maplibre-gl'

export interface MapState {
  layers: {
    actors?: string[]
    projects?: string[]
    resources?: string[]
    atlasMaps?: {
      id: string
      subLayers: string[]
    }[]
  }
  bbox: LngLatBounds
}
