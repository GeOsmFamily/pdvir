import { apiClient } from "@/assets/plugins/axios";
import type { Project } from "@/models/interfaces/Project";

export class ProjectService {
  static async getAll(): Promise<Project[]> {
    return await apiClient.get('/api/projects')
      .then((response) => response.data['hydra:member'])
  }
}