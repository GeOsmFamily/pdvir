import type { HighlightedItem } from '@/models/interfaces/Item'
import { apiClient } from '@/plugins/axios/api'

export class HighlightedItemService {
  static async post(item: Partial<HighlightedItem>): Promise<HighlightedItem> {
    return apiClient.post('/api/highlighted_items', item).then((response) => response.data)
  }
  static async patch(item: Partial<HighlightedItem>): Promise<HighlightedItem> {
    return apiClient
      .patch('/api/highlighted_items/' + item.itemId, item)
      .then((response) => response.data)
  }

  static async getAllPartial(): Promise<Partial<HighlightedItem>[]> {
    return await apiClient
      .get('/api/highlighted_items/partial')
      .then((response) => response.data['hydra:member'])
  }

  static async getAll(): Promise<HighlightedItem[]> {
    return await apiClient
      .get('/api/highlighted_items')
      .then((response) => response.data['hydra:member'])
  }
}
