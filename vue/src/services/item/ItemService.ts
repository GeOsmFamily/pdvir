import { ItemType } from '@/models/enums/app/ItemType'
import type { Actor } from '@/models/interfaces/Actor'
import type { Item } from '@/models/interfaces/Item'
import type { Project } from '@/models/interfaces/Project'
import type { Resource } from '@/models/interfaces/Resource'
import { useActorsStore } from '@/stores/actorsStore'
import { useProjectStore } from '@/stores/projectStore'
import { useResourceStore } from '@/stores/resourceStore'

export class ItemService {
  static updateItem(item: Item, type: ItemType | string) {
    const projectStore = useProjectStore()
    const actorStore = useActorsStore()
    const resourceStore = useResourceStore()
    console.log('item', item)

    switch (type) {
      case ItemType.PROJECT:
        projectStore.updateProject(item as Project)
        break
      case ItemType.ACTOR:
        actorStore.updateActor(item as Actor)
        break
      case ItemType.RESOURCE:
        resourceStore.updateResource(item as Resource)
        break
    }
  }
}
