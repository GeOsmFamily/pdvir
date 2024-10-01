import type { AdministrativesScopes } from "../enums/contents/AdministrativesScopes";
import type { ActorsCategories } from "../enums/contents/actors/ActorsCategories";
import type { ActorsExpertises } from "../enums/contents/actors/ActorsExpertises";
import type { ActorsThematics } from "../enums/contents/actors/ActorsThematics";
import type { User } from "./auth/User";
import type { ContentImageFromUserFile, ContentImageFromUrl } from "./ContentImage";

export interface Actor {
    id: string;
    createdBy: User["id"];
    isValidated: boolean;
    name: string;
    acronym: string;
    categories: ActorsCategories[];
    expertises: ActorsExpertises[];
    thematics: ActorsThematics[];
    creationDate: Date;
    lastUpdate: Date;
    description: string;
    administrativeScopes: AdministrativesScopes[];
    officeName: string;
    officeAddress: string;
    officeLocation: [number, number]; //To add later in SF Entity
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
  