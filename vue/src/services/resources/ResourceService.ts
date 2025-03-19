import { apiClient } from '@/plugins/axios/api'
import type { Resource, ResourceEvent } from '@/models/interfaces/Resource'
import { handleFileUpload } from '@/services/forms/FormService'

export class ResourceService {
  static async getAll(): Promise<Resource[]> {
    return await apiClient.get('/api/resources').then((response) => response.data['hydra:member'])
  }

  static async get(search: Partial<Resource>): Promise<Resource> {
    const { id } = search
    return await apiClient.get('/api/resources/' + id).then((response) => response.data)
  }

  static async post(resource: Resource): Promise<Resource> {
    resource = await handleFileUpload(resource)
    return await apiClient.post('/api/resources', resource).then((response) => response.data)
  }

  static async patch(resource: Resource): Promise<Resource> {
    resource = await handleFileUpload(resource)
    console.log('resource', resource)
    return await apiClient
      .patch('/api/resources/' + resource.id, resource)
      .then((response) => response.data)
  }

  static async delete(resource: Resource): Promise<Resource> {
    return await apiClient.delete('/api/resources/' + resource.id).then((response) => response.data)
  }

  static async getNearestEvents(): Promise<ResourceEvent[]> {
    return await apiClient
      .get('/api/resources/events/nearest')
      .then((response) => response.data['hydra:member'])
  }

  static getLink(resource: Resource): string {
    return resource.file?.contentUrl || resource.link || ''
  }
}
