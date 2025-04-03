import type { SymfonyRelation } from './SymfonyRelation'

export interface Admin1Boundary extends SymfonyRelation {
  id: number
  adm1_name: string
  adm1_pcode: string
  geometryGeoJson?: string
}

export interface Admin2Boundary extends SymfonyRelation {
  id: number
  adm2_name: string
  adm2_pcode: string
  geometryGeoJson?: string
}

export interface Admin3Boundary extends SymfonyRelation {
  id: number
  adm3_name: string
  adm3_pcode: string
  geometryGeoJson?: string
}
