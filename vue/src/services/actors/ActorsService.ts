import type { Actor, ActorSubmission } from "@/models/interfaces/Actor";
import { apiClient } from '@/assets/plugins/axios/api';
import type { SymfonyRelation } from "@/models/interfaces/SymfonyRelation";
import type { ActorExpertise } from "@/models/interfaces/ActorExpertise";
import type { Thematic } from "@/models/interfaces/Thematic";
import type { AdministrativeScope } from "@/models/interfaces/AdministrativeScope";
import FileUploader from "@/services/files/FileUploader";

export class ActorsService {
  static async getActors(): Promise<Actor[]> {
    const data = (
      await apiClient.get('/api/actors', { headers: { accept: 'application/ld+json' } })
    ).data
    return data['hydra:member'] as Actor[]
  }

  static async getAll(): Promise<Actor[]> {
    return (await apiClient.get('/api/actors/all')).data['hydra:member']
  }

  static async getActor(id: string): Promise<Actor> {
    const data = (
      await apiClient.get(`/api/actors/${id}`, { headers: { accept: 'application/ld+json' } })
    ).data
    return data as Actor
  }

  static async createOrEditActor(
    actor: ActorSubmission,
    edit: boolean,
    id?: string | undefined
  ): Promise<Actor> {
    if (actor.logoToUpload) {
      const newLogo = await ImageLoader.loadImage(actor.logoToUpload.file)
      actor.logo = newLogo['@id']
    }
    const newImagesLoaded = await Promise.all(
      actor.imagesToUpload.map(async (img) => await ImageLoader.loadImage(img.file))
    )
    if (actor.images && actor.images.length > 0) {
      actor.images.push(...newImagesLoaded)
    } else {
      actor.images = newImagesLoaded
    }
    actor = this.transformSymfonyRelationToIRIs(actor)
    let data
    if (!edit) {
      data = (
        await apiClient.post('/api/actors', actor, {
          headers: {
            'Content-Type': 'application/ld+json',
            Accept: 'application/ld+json'
          }
        })
      ).data
    } else {
      data = (
        await apiClient.patch(`/api/actors/${id}`, actor, {
          headers: {
            'Content-Type': 'application/merge-patch+json',
            Accept: 'application/ld+json'
          }
        })
      ).data
    }

    return data as Actor
  }

  static async deleteActor(id: string): Promise<void> {
    await apiClient.delete(`/api/actors/${id}`)
  }

    static async createOrEditActor(actor: ActorSubmission, edit: boolean, id?: string | undefined): Promise<Actor> {
      if (actor.logoToUpload) {
        const newLogo = await FileUploader.uploadFile(actor.logoToUpload.file)
        actor.logo = newLogo['@id']
      }
      const newImagesLoaded = await Promise.all(
        actor.imagesToUpload.map(async img => await FileUploader.uploadFile(img.file)
      ))
      if (actor.images && actor.images.length > 0) {
        actor.images.push(...newImagesLoaded)
      } else {
        actor.images = newImagesLoaded
      }      
      actor = this.transformSymfonyRelationToIRIs(actor)
      let data;
      if (!edit) {
        data = (await apiClient.post('/api/actors', actor, { headers: { 
          'Content-Type': 'application/ld+json',
          'Accept': 'application/ld+json'
        }
        })).data
      } else {
        data = (await apiClient.patch(`/api/actors/${id}`, actor, { headers: { 
          'Content-Type': 'application/merge-patch+json',
          'Accept': 'application/ld+json'
        }
        })).data
      }
      
      return data as Actor
    }
    return actor
  }
}
