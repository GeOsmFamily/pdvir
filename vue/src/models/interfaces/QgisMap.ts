import type { QgisProject } from './QgisProject'

export interface QgisMap {
  id: string
  name: string
  qgisProject: QgisProject
}
