import type { Actor } from "@/models/interfaces/Actor";
import type { Thematic } from "@/models/interfaces/Thematic";
import type { Status } from "@/models/enums/Status";
import type { AdminLevel } from "@/models/enums/AdminLevel";
import type { Timestampable } from "@/models/interfaces/common/Timestampable";

export interface Project extends Timestampable {
  id: number;
  name: string;
  location: string;
  coords: string;
  status: Status;
  description: string;
  images: string[];
  partners: string[];
  interventionZone: AdminLevel;
  thematics: Thematic[];
  projectManagerName: string;
  projectManagerPosition: string;
  projectManagerEmail: string;
  projectManagerTel: string;
  projectManagerPhoto: string;
  website: string;
  logo: string;
  financialActors: Actor[];
  contractingActors: Actor[];
  actor: Actor;
}