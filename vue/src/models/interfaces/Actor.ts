import type { ActorsCategories } from "../enums/contents/actors/ActorsCategories";
import type { User } from "./auth/User";
import type { ContentImageFromUserFile, ContentImageFromUrl } from "./ContentImage";
import type { SymfonyRelation } from "./SymfonyRelation";

export interface Actor {
    id: string;
    createdBy: {
        id: User["id"]
    };
    isValidated: boolean;
    name: string;
    acronym: string;
    category: ActorsCategories;
    expertises: SymfonyRelation[];
    thematics: SymfonyRelation[];
    creationDate: Date;
    lastUpdate: Date;
    description: string;
    administrativeScopes: SymfonyRelation[];
    officeName: string;
    officeAddress: string;
    officeLocation: [number, number];//To add in form and SF Entity
    contactName: string;
    contactPosition: string;
    projects: string[];
    logo: string;//To add in form
    images: string[];
    website: string;
    phone: string;
    email: string;
  }

  export interface ActorSubmission extends Actor {
    imagesToUpload: (ContentImageFromUserFile | ContentImageFromUrl)[]
  }
  