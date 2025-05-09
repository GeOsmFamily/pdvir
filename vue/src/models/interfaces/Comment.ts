import type { Blameable } from './common/Blameable'
import type { Timestampable } from './common/Timestampable'

export interface AppComment extends Timestampable, Blameable {
  id: string
  '@id': string
  message: string
  origin: CommentOrigin
  originURL: string | null
  location: string | null
  readByAdmin: boolean
}

export enum CommentOrigin {
  ACTOR = 'Actor',
  PROJECT = 'Project',
  RESOURCE = 'Data',
  MAP = 'Map'
}

export type AdminCommentsSortingValues = 'readByAdmin' | 'nameAZ' | 'nameZA'
