import type { ActorsAdministrativeScopes } from "../enums/actors/ActorsAdministrativeScopes";
import type { ActorsCategories } from "../enums/actors/ActorsCategories";
import type { ActorsExpertises } from "../enums/actors/ActorsExpertises";
import type { ActorsThematics } from "../enums/actors/ActorsThematics";
import type { User } from "./auth/User";
import type { ContentImageFromUserFile, ContentImageFromUrl } from "./ContentImage";

export interface Actor {
    id: string;
    createdBy: User["id"];
    isValidated: boolean;
    name: string;
    acronym: string;
    category: ActorsCategories;
    expertise: ActorsExpertises;
    thematics: ActorsThematics[];
    creationDate: Date;
    lastUpdate: Date;
    description: string;
    administrativeScopes: ActorsAdministrativeScopes[];
    officeName: string;
    officeAddress: string;
    officeLocation: [number, number];
    contactName: string;
    contactPosition: string;
    projects: string[];
    logo: string;
    images: string[];
    website: string;
    phone: string;
    email: string;
  }

  export interface ActorSubmission extends Actor {
    imagesToUpload: (ContentImageFromUserFile | ContentImageFromUrl)[]
  }
  