import { StoresList } from '@/models/enums/app/StoresList'
import type { Actor } from '@/models/interfaces/Actor'
import { ActorsService } from '@/services/actors/ActorsService'
import { defineStore } from 'pinia'
import { reactive, ref, type Reactive, type Ref } from 'vue'
import { useApplicationStore } from './applicationStore'
import { useRouter } from 'vue-router'


export const useActorsStore = defineStore(StoresList.ACTORS, () => {
  const dataLoaded = ref(false)
  const router = useRouter();
  const actors: Actor[] = reactive([])
  const selectedActor: Ref<Actor | null> = ref(null)
  async function getActors(): Promise<void> {
      actors.push(...await ActorsService.getActors())
      dataLoaded.value = true
  }

  async function setSelectedActor(id: string) {
    selectedActor.value = await ActorsService.getActor(id)
    router.push('/actors/' + selectedActor.value.name)
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

  return { dataLoaded, actors, selectedActor, getActors, setSelectedActor, actorEdition, activateActorEdition }
})
