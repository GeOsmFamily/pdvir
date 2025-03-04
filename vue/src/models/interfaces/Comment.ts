import type { Blameable } from './common/Blameable'
import type { Timestampable } from './common/Timestampable'

export interface AppComment extends Timestampable, Blameable {
  id: string
  '@id': string
  message: string
  origin: CommentOrigin
  originURL: string | null
  location: string | null
}

export type CommentOrigin = 'Actor' | 'Project' | 'Resource' | 'Map'
