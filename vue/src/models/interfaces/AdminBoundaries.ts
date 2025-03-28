import type { SymfonyRelation } from './SymfonyRelation'

export interface Admin1Boundary extends SymfonyRelation {
  id: string
  adm1_name: string
  adm1_pcode: string
  geometryGeoJson: string
}

export interface Admin2Boundary extends SymfonyRelation {
  id: string
  adm2_name: string
  adm2_pcode: string
  geometryGeoJson: string
}

export interface Admin3Boundary extends SymfonyRelation {
  id: string
  adm3_name: string
  adm3_pcode: string
  geometryGeoJson: string
}
