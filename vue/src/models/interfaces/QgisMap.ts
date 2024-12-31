import type { QgisProject } from './QgisProject'
import type { SymfonyRelation } from './SymfonyRelation'

export interface QgisMap extends SymfonyRelation {
  id: string
  name: string
  qgisProject: QgisProject
}
