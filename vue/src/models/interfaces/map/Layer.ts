export interface Layer {
  id: string | number
  name: string
  isShown?: boolean
  icon?: string
  opacity?: number
}

export interface AtlasLayer extends Layer {
  mapOrder?: number //Used for change layer order in Qgis Server requests
}
