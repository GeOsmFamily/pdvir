import type Layer from './Layer'

export interface AtlasMap {
  id: string
  mainLayer: Layer
  subLayers: Layer[]
  qgisProjectName: string
  atlasId: string
  needsToBeVisualiseAsPlainImageInsteadOfWMS: boolean
}
