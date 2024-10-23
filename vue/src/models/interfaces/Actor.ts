import type { ActorsCategories } from "../enums/contents/actors/ActorsCategories";
import type { ActorExpertise } from "./ActorExpertise";
import type { AdministrativeScope } from "./AdministrativeScope";
import type { User } from "./auth/User";
import type { ContentImageFromUserFile } from "./ContentImage";
import type { MediaObject } from "./MediaObject";
import type { Thematic } from "./Thematic";

export interface Actor {
    id: string;
    createdBy: {
        id: User["id"]
    };
    isValidated: boolean;
    name: string;
    acronym: string;
    category: ActorsCategories;
    expertises: ActorExpertise[];
    thematics: Thematic[];
    creationDate: Date;
    lastUpdate: Date;
    description: string;
    administrativeScopes: AdministrativeScope[];
    officeName: string;
    officeAddress: string;
    officeLocation: [number, number];//To add in form and SF Entity
    contactName: string;
    contactPosition: string;
    projects: string[];
    logo: MediaObject;
    images: MediaObject[];
    externalImages: string[];
    website: string;
    phone: string;
    email: string;
    slug: string;
  }

  export interface ActorSubmission extends Omit<Actor, "logo"> {
    logo: string,
    logoToUpload: ContentImageFromUserFile
    imagesToUpload: ContentImageFromUserFile[]
  }
  