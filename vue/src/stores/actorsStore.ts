import { StoresList } from '@/models/enums/StoresList'
import type { Actor } from '@/models/interfaces/Actor'
import { ActorsService } from '@/services/actors/ActorsService'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useApplicationStore } from './applicationStore'


export const useActorsStore = defineStore(StoresList.ACTORS, () => {
  const actors: Actor[] = reactive([])
  async function getActors(): Promise<void> {
      actors.push(...await ActorsService.getActors())
  }

  const actorEdition = reactive({
    active: false,
    id: null
  })
  function activateActorEdition(id: string) {
    actorEdition.id = id
    actorEdition.active = true
    useApplicationStore().showEditContentDialog = true
  }
  function getActorById(id: string): Actor {
    return actors.find(actor => actor.id === id)
  }

  return { actors, getActors, actorEdition, activateActorEdition, getActorById }
})
