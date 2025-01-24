import { ItemType } from '@/models/enums/app/ItemType'
import { i18n } from '@/plugins/i18n'
import { useActorsStore } from '@/stores/actorsStore'
import { useProjectStore } from '@/stores/projectStore'
import { useResourceStore } from '@/stores/resourceStore'
import type { StoreGeneric } from 'pinia'
import { computed, type ComputedRef } from 'vue'
import LayerService from './LayerService'
import projectLayerIcon from '@/assets/images/icons/map/project_icon.png'
import resourceLayerIcon from '@/assets/images/icons/map/resource_icon.png'
import actorLayerIcon from '@/assets/images/icons/map/actor_icon.png'
import { useThematicStore } from '@/stores/thematicStore'
import MapService from './MapService'
import type { ThematicItem } from '@/models/interfaces/common/ThematicItem'
import type { Layer } from '@/models/interfaces/map/Layer'
import type { Thematic } from '@/models/interfaces/Thematic'

export class AppLayersService {
  static mapStore: StoreGeneric | null = null
  static actorStore = useActorsStore()
  static projectStore = useProjectStore()
  static resourceStore = useResourceStore()
  static thematicStore = useThematicStore()
  static myMapComponent: ComputedRef<any> | null = null
  static map: ComputedRef<maplibregl.Map> | null = null
  static filteredProjects = computed(() => {
    return this.filterByThematic(this.projectStore.projects, this.mapStore?.projectSubLayers)
  })
  static filteredActors = computed(() => {
    return this.filterByThematic(this.actorStore.actors, this.mapStore?.actorSubLayers)
  })
  static filteredResources = computed(() => {
    return this.filterByThematic(this.resourceStore.resources, this.mapStore?.resourceSubLayers)
  })

  static async initApplicationLayers(mapStore: StoreGeneric): Promise<void> {
    try {
      this.mapStore = mapStore
      await this.thematicStore.getAll()
      this.myMapComponent = computed(() => this.mapStore?.myMap)
      this.map = computed(() => this.mapStore?.myMap?.map as maplibregl.Map)

      if (!this.mapStore.isMapAlreadyBeenMounted) {
        this.initMainLayers()
        this.initSubLayers()
      }

      await Promise.all([
        this.resourceStore.getAll(),
        this.actorStore.getAll(),
        this.projectStore.getAll()
      ])

      if (this.map?.value == null) return
      if (this.map.value.loaded()) {
        await this.setPlatformDataLayers()
      } else {
        await new Promise<void>((resolve, reject) => {
          this.map?.value.on('load', async () => {
            try {
              await this.setPlatformDataLayers()
              resolve()
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    } catch (error) {
      console.error('Erreur lors de l’initialisation des couches :', error)
      return Promise.reject(error)
    }
  }

  static initMainLayers() {
    this.mapStore!.projectLayer = LayerService.initLayer({
      id: ItemType.PROJECT,
      name: i18n.t('myMap.rightSidebar.layers.itemType.' + ItemType.PROJECT),
      icon: projectLayerIcon
    })
    this.mapStore!.actorLayer = LayerService.initLayer({
      id: ItemType.ACTOR,
      name: i18n.t('myMap.rightSidebar.layers.itemType.' + ItemType.ACTOR),
      icon: actorLayerIcon
    })
    this.mapStore!.resourceLayer = LayerService.initLayer({
      id: ItemType.RESOURCE,
      name: i18n.t('myMap.rightSidebar.layers.itemType.' + ItemType.RESOURCE),
      icon: resourceLayerIcon
    })
  }

  static initSubLayers() {
    this.mapStore!.projectSubLayers = LayerService.initSubLayer(this.thematicStore.thematics)
    this.mapStore!.actorSubLayers = LayerService.initSubLayer(this.thematicStore.thematics)
    this.mapStore!.resourceSubLayers = LayerService.initSubLayer(this.thematicStore.thematics)
  }

  static async setPlatformDataLayers() {
    Object.values(ItemType).forEach((itemType) => {
      this.setPlatformDataLayer(itemType)
    })
    if (this.mapStore!.isMapAlreadyBeenMounted) {
      this.mapStore!.setMapLayersOrderOnMapReMount()
    }
    this.mapStore!.isMapAlreadyBeenMounted = true
  }

  static async setPlatformDataLayer(itemType: ItemType) {
    if (this.myMapComponent?.value) {
      const geojson = this.getGeojsonPerItemType(itemType)
      const icon = new URL(`/src/assets/images/icons/map/${itemType}_icon.png`, import.meta.url)
        .href
      this.myMapComponent.value.addSource(itemType, geojson)
      await this.myMapComponent.value.addImage(icon, itemType)
      const layout: maplibregl.LayerSpecification['layout'] = {
        'icon-image': itemType,
        'icon-size': 0.4
      }
      this.myMapComponent.value.addLayer(itemType, { layout })
      this.myMapComponent.value.listenToHoveredFeature(itemType)
    }
    return
  }

  static getGeojsonPerItemType(itemType: ItemType) {
    switch (itemType) {
      case ItemType.ACTOR:
        return MapService.getGeojson(this.filteredActors.value)
      case ItemType.PROJECT:
        return MapService.getGeojson(this.filteredProjects.value)
      case ItemType.RESOURCE:
        return MapService.getGeojson(this.filteredResources.value)
    }
  }

  static filterByThematic(items: ThematicItem[], subLayers: Layer[]) {
    const activeThematics: Layer['id'][] = subLayers
      .filter((layer: Layer) => layer.isShown)
      .map((layer: Layer) => layer.id)
    return items.filter((item) => {
      const itemThematicIds = item.thematics.map((itemThematic: Thematic) => itemThematic.id)
      return activeThematics.some(
        (thematic) => typeof thematic !== 'string' && itemThematicIds.includes(thematic)
      )
    })
  }
}
