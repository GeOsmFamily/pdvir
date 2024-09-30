import { StoresList } from '@/models/enums/app/StoresList'
import type { Actor } from '@/models/interfaces/Actor'
import { ActorsService } from '@/services/actors/ActorsService'
import { defineStore } from 'pinia'
import { reactive, type Reactive } from 'vue'
import { useApplicationStore } from './applicationStore'


export const useActorsStore = defineStore(StoresList.ACTORS, () => {
  const actors: Actor[] = reactive([])
  async function getActors(): Promise<void> {
      actors.push(...await ActorsService.getActors())
  }

  const actorEdition: Reactive<{active: boolean, id: string | null}> = reactive({
    active: false,
    id: null
  })
  function activateActorEdition(id: string | null) {
    actorEdition.id = id
    actorEdition.active = true
    useApplicationStore().showEditContentDialog = true
  }

  return { actors, getActors, actorEdition, activateActorEdition }
})
