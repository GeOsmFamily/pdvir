import type { Actor } from "@/models/interfaces/Actor";
import { apiClient } from '@/assets/plugins/axios';

export class ActorsService {
    static async getActors(): Promise<Actor[]> {
      const data = (await apiClient.get('/api/actors', { headers:  {'accept': 'application/ld+json'}})).data
      data["hydra:member"].forEach((actor: any) => {
        actor["expertises"] =  actor["expertises"].map((category: any) => category["name"])
      })
      return data["hydra:member"] as Actor[]
    }

    static async getActor(id: string): Promise<Actor> {
      const data = (await apiClient.get(`/api/actors/${id}`, { headers:  {'accept': 'application/ld+json'}})).data
      console.log(data)
      data["administrativeScopes"] = data["administrativeScopes"].map((category: any) => category["name"])
      data["expertises"] = data["expertises"].map((category: any) => category["name"])
      data["thematics"] = data["thematics"].map((category: any) => category["name"])
      return data as Actor
    }
}