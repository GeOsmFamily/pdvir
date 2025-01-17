import type { AtlasLayer } from './Layer'

export interface AtlasMap {
  id: string
  mainLayer: AtlasLayer
  subLayers: AtlasLayer[]
  qgisProjectName: string
  atlasId: string
  needsToBeVisualiseAsPlainImageInsteadOfWMS: boolean
}
