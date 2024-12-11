import type { ItemType } from "@/models/enums/app/ItemType"
import type { Actor } from "./Actor"
import type { Project } from "./Project"
import type { Resource } from "./Resource"
// export type News = Actor | Project | Resource
export type News = {
  id: string,
  type: ItemType,
  name: string,
  description: string,
  updatedAt: Date
  slug: string
  image?: string,
}