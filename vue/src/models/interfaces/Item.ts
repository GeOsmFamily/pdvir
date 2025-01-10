import type { ItemType } from '../enums/app/ItemType'
import type { Actor } from './Actor'
import type { Project } from './Project'
import type { Resource } from './Resource'

export type Item = Resource | Project | Actor
export type HighlightedItem = {
  id: number
  itemId: Item['id']
  isHighlighted: boolean
  position?: number
  itemType?: ItemType
  name?: string
  highlightedAt?: Date
}
