import type { Admin1Boundary } from '@/models/interfaces/AdminBoundaries'
import { apiClient } from '@/plugins/axios/api'

export class AdminBoundariesService {
  static async getAdmin1List(): Promise<Admin1Boundary[]> {
    return await apiClient
      .get('/api/admin1_boundaries')
      .then((response) => response.data['hydra:member'])
  }
}
