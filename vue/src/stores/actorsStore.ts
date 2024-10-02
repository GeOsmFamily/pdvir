import { StoresList } from '@/models/enums/app/StoresList'
import type { Actor } from '@/models/interfaces/Actor'
import { ActorsService } from '@/services/actors/ActorsService'
import { defineStore } from 'pinia'
import { reactive, ref, type Reactive, type Ref } from 'vue'
import { useApplicationStore } from './applicationStore'


export const useActorsStore = defineStore(StoresList.ACTORS, () => {
  const actors: Actor[] = reactive([])
  const selectedActor: Ref<Actor | null> = ref(null)
  async function getActors(): Promise<void> {
      actors.push(...await ActorsService.getActors())
  }

  async function setSelectedActor(id: string) {
    selectedActor.value = await ActorsService.getActor(id)
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

  return { actors, selectedActor, getActors, setSelectedActor, actorEdition, activateActorEdition }
})
