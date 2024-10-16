import { apiClient } from "@/assets/plugins/axios";
import type { Project } from "@/models/interfaces/Project";

export class ProjectService {
  static async getAll(): Promise<Project[]> {
    return await apiClient.get('/api/projects/all')
      .then((response) => response.data['hydra:member'])
  }

  static async get(search: Partial<Project>): Promise<Project> {
    return await apiClient.get('/api/projects', { params: search })
      .then((response) => response.data['hydra:member'][0])
  }

  static async getSimilarProjects(project: Project): Promise<Project[]> {
    return await apiClient.get('/api/projects/' + project.id + '/similar')
      .then((response) => response.data['hydra:member'])
  }
}