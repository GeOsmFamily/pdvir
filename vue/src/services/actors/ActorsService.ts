import type { Actor } from "@/models/interfaces/Actor";
import { apiClient } from '@/assets/plugins/axios';
import type { ActorExpertise } from "@/models/interfaces/ActorExpertise";
import type { Thematic } from "@/models/interfaces/Thematic";
import type { AdministrativeScope } from "@/models/interfaces/AdministrativeScope";

export class ActorsService {
    static actorsExpertisesEntities: ActorExpertise[] = []
    static actorsThematicsEntities: Thematic[] = []
    static administrativeScopesEntities: AdministrativeScope[] = []

    static async getActors(): Promise<Actor[]> {
      const data = (await apiClient.get('/api/actors', { headers:  {'accept': 'application/ld+json'}})).data
      data["hydra:member"].forEach((actor: any) => {
        actor["expertises"] =  actor["expertises"].map((category: ActorExpertise) => category["name"])
      })
      return data["hydra:member"] as Actor[]
    }

    static async getActor(id: string): Promise<Actor> {
      const data = (await apiClient.get(`/api/actors/${id}`, { headers:  {'accept': 'application/ld+json'}})).data
      console.log(data)
      // data["administrativeScopes"] = data["administrativeScopes"].map((category: AdministrativeScope) => category["name"])
      data["expertises"] = data["expertises"].map((category: ActorExpertise) => category["name"])
      data["thematics"] = data["thematics"].map((category: Thematic) => category["name"])
      return data as Actor
    }

    static async createActor(actor: Actor): Promise<Actor> {
      Object.keys(actor).forEach((key) => {
        if (key === 'expertises') {
          actor[key] = actor[key].map(x => this.actorsExpertisesEntities.find(y => y.name === x)!['@id'])
        }
        if (key === 'thematics') {
          console.log(this.actorsThematicsEntities)
          actor[key] = actor[key].map(x => this.actorsThematicsEntities.find(y => y.name === x)!['@id'])
        }
        if (key === 'administrativeScopes') {
          actor[key] = actor[key].map(x => this.administrativeScopesEntities.find(y => y.name === x)!['@id'])
        }
        actor.logo = "https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg"
      })
      const data = (await apiClient.post('/api/actors', actor, { headers: { 
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json'
      }
      })).data
      return data as Actor
    }

    static async getActorsExpertisesList(): Promise<string[]> {
      const data = (await apiClient.get('/api/actor_expertises', { headers:  {'accept': 'application/ld+json'}})).data
      this.actorsExpertisesEntities = data["hydra:member"]
      return data["hydra:member"].map((x: ActorExpertise) => x.name)
    }
    static async getActorsThematicsList(): Promise<string[]> {
      const data = (await apiClient.get('/api/thematics', { headers:  {'accept': 'application/ld+json'}})).data
      this.actorsThematicsEntities = data["hydra:member"]
      return data["hydra:member"].map((x: Thematic) => x.name)
    }
    static async getActorsAdministrativesScopesList(): Promise<string[]> {
      const data = (await apiClient.get('/api/administrative_scopes', { headers:  {'accept': 'application/ld+json'}})).data
      this.administrativeScopesEntities = data["hydra:member"]
      return data["hydra:member"].map((x: AdministrativeScope) => x.name)
    }
}