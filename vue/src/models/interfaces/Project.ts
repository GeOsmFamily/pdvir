import type { AdministrativeScope } from '@/models/enums/AdministrativeScope'
import type { BeneficiaryType } from '@/models/enums/contents/BeneficiaryType'
import type { Status } from '@/models/enums/contents/Status'
import type { Actor } from '@/models/interfaces/Actor'
import type { ContentImageFromUserFile } from '@/models/interfaces/ContentImage'
import type { Organisation } from '@/models/interfaces/Organisation'
import type { iri, SymfonyRelation } from '@/models/interfaces/SymfonyRelation'
import type { Blameable } from '@/models/interfaces/common/Blameable'
import type { Localizable } from '@/models/interfaces/common/Localizable'
import type { ThematicItem } from '@/models/interfaces/common/ThematicItem'
import type { Timestampable } from '@/models/interfaces/common/Timestampable'
import type { Validateable } from '@/models/interfaces/common/Validateable'
import type { BaseMediaObject } from '@/models/interfaces/object/MediaObject'
import type { ProjectFinancingType } from '../enums/contents/ProjectFinancingType'

export interface Project
  extends Timestampable,
    Validateable,
    Blameable,
    Localizable,
    ThematicItem,
    SymfonyRelation {
  id: string
  name: string
  slug: string
  calendar: string
  deliverables: string
  status: Status
  description: string
  images: BaseMediaObject[]
  externalImages: string[]
  partners: BaseMediaObject[]
  interventionZone: AdministrativeScope
  beneficiaryTypes: BeneficiaryType[]
  focalPointName: string
  focalPointPosition: string
  focalPointEmail: string
  focalPointTel: string
  focalPointPhoto: string
  website: string
  logo?: BaseMediaObject
  financingTypes: ProjectFinancingType[]
  contractingOrganisation: Organisation
  actor: Partial<Actor>
  otherActor?: string
  creatorMessage?: string
}

export interface ProjectSubmission extends Omit<Project, 'actor' | 'thematics' | 'logo'> {
  actor: iri
  thematics: iri[]
  logo: string
  logoToUpload: ContentImageFromUserFile
  imagesToUpload: ContentImageFromUserFile[]
  imagesPartnerToUpload: ContentImageFromUserFile[]
}
