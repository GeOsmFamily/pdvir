import type { Actor } from "@/models/interfaces/Actor";
import { apiClient } from '@/assets/plugins/axios';
import type { SymfonyRelation } from "@/models/interfaces/SymfonyRelation";

export class ActorsService {

    static async getActors(): Promise<Actor[]> {
      const data = (await apiClient.get('/api/actors', { headers:  {'accept': 'application/ld+json'}})).data
      data["hydra:member"].forEach((actor: any) => {
        actor["expertises"] =  actor["expertises"].map((category: SymfonyRelation) => category["name"])
      })
      return data["hydra:member"] as Actor[]
    }

    static async getActor(id: string): Promise<Actor> {
      const data = (await apiClient.get(`/api/actors/${id}`, { headers:  {'accept': 'application/ld+json'}})).data
      return data as Actor
    }

    static async createOrEditActor(actor: any, edit: boolean, id?: string | undefined): Promise<Actor> {
      actor.logo = "https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg"
      let data;
      if (!edit) {
        actor = this.transformSymfonyRelationToIRIs(actor)
        data = (await apiClient.post('/api/actors', actor, { headers: { 
          'Content-Type': 'application/ld+json',
          'Accept': 'application/ld+json'
        }
        })).data
      } else {
        actor = this.transformSymfonyRelationToIRIs(actor)
        data = (await apiClient.patch(`/api/actors/${id}`, actor, { headers: { 
          'Content-Type': 'application/merge-patch+json',
          'Accept': 'application/ld+json'
        }
        })).data
      }
      
      return data as Actor
    }

    static async getActorsExpertisesList(): Promise<SymfonyRelation[]> {
      const data = (await apiClient.get('/api/actor_expertises', { headers:  {'accept': 'application/ld+json'}})).data
      return data["hydra:member"]
    }
    static async getActorsThematicsList(): Promise<SymfonyRelation[]> {
      const data = (await apiClient.get('/api/thematics', { headers:  {'accept': 'application/ld+json'}})).data
      return data["hydra:member"]
    }
    static async getActorsAdministrativesScopesList(): Promise<SymfonyRelation[]> {
      const data = (await apiClient.get('/api/administrative_scopes', { headers:  {'accept': 'application/ld+json'}})).data
      return data["hydra:member"]
    }

    static transformSymfonyRelationToIRIs(actor: Actor): Actor {
      for (const key in actor) {
        if (actor[key][0] && actor[key][0]["@id"]) {
          actor[key] = actor[key].map((x: SymfonyRelation) => x["@id"])
        }
      }
      return actor
    }
}