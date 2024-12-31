import type { AtlasGroup } from '../enums/geo/AtlasGroup'
import type { QgisMap } from './QgisMap'

export interface Atlas {
  id: string
  name: string
  atlasGroup: AtlasGroup
  position: number
  maps: QgisMap[]
}
