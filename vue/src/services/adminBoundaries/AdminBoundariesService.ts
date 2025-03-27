import type {
  Admin1Boundary,
  Admin2Boundary,
  Admin3Boundary
} from '@/models/interfaces/AdminBoundaries'
import { apiClient } from '@/plugins/axios/api'

export class AdminBoundariesService {
  static async getAdmin1List(): Promise<Admin1Boundary[]> {
    return await apiClient
      .get('/api/admin1_boundaries')
      .then((response) => response.data['hydra:member'])
  }

  static async getAdmin2List(): Promise<Admin2Boundary[]> {
    return await apiClient
      .get('/api/admin2_boundaries')
      .then((response) => response.data['hydra:member'])
  }
  static async getAdmin3List(): Promise<Admin3Boundary[]> {
    return await apiClient
      .get('/api/admin3_boundaries')
      .then((response) => response.data['hydra:member'])
  }
}
