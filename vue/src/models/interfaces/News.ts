export enum NewsType {
  ACTOR = 'actor',
  PROJECT = 'project',
  RESOURCE = 'resource'
}

export type News = {
  id: number | string,
  type: NewsType,
  name: string,
  description: string,
  updatedAt: Date
  image?: string,
}