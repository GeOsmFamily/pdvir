import type { Status } from "@/models/enums/contents/Status";
import type { SymfonyRelation } from "./SymfonyRelation";

export interface Project {
  id: number;
  title: string;
  location: string;
  coords: string;
  status: Status;
  description: string;
  images: string[];
  partners: string[];
  interventionZone: SymfonyRelation[];
  thematics: SymfonyRelation[];
  projectManagerName: string;
  projectManagerPosition: string;
  projectManagerEmail: string;
  projectManagerTel: string;
  projectManagerPhoto: string;
  website: string;
  logo: string;
  financialActors: SymfonyRelation[];
  contractingActors: SymfonyRelation[];
  actor: SymfonyRelation;
}