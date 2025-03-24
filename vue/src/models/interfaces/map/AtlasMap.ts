import type { AtlasLayer } from './Layer'

export interface AtlasMap {
  id: string
  mainLayer: AtlasLayer
  subLayers: AtlasLayer[]
  qgisProjectName: string
  atlasId: string
  needsToBeVisualiseAsPlainImageInsteadOfWMS: boolean
}

export interface AtlasActive {
  leftPanel: {
    active: boolean
    atlasID: string | null
  }
  rightPanel: {
    active: boolean
    atlasID: string | null
  }
}

// Used to parse response of QGIS server GetFeatureInfo request
export interface FeatureAttributes {
  [key: string]: string | null
}
export interface LayerFeatures {
  [layerName: string]: FeatureAttributes[]
}
