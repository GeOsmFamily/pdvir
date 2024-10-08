import type { Actor } from "@/models/interfaces/Actor";
import { apiClient } from '@/assets/plugins/axios';
import type { ActorExpertise } from "@/models/interfaces/ActorExpertise";

export class ActorsService {

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
      return data as Actor
    }

    static async createActor(actor: Actor): Promise<Actor> {
      actor.logo = "https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg"
      const data = (await apiClient.post('/api/actors', actor, { headers: { 
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json'
      }
      })).data
      return data as Actor
    }

    static async getActorsExpertisesList(): Promise<string[]> {
      const data = (await apiClient.get('/api/actor_expertises', { headers:  {'accept': 'application/ld+json'}})).data
      return data["hydra:member"]
    }
    static async getActorsThematicsList(): Promise<string[]> {
      const data = (await apiClient.get('/api/thematics', { headers:  {'accept': 'application/ld+json'}})).data
      return data["hydra:member"]
    }
    static async getActorsAdministrativesScopesList(): Promise<string[]> {
      const data = (await apiClient.get('/api/administrative_scopes', { headers:  {'accept': 'application/ld+json'}})).data
      return data["hydra:member"]
    }
}