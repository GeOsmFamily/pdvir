import type Layer from '@/models/interfaces/map/Layer'

export default class LayerService {
  static initSubLayer(data: any[]): Layer[] {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      isShown: true
    }))
  }
}
