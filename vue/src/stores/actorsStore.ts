import { StoresList } from '@/models/enums/app/StoresList'
import type { Actor } from '@/models/interfaces/Actor'
import { ActorsService } from '@/services/actors/ActorsService'
import { defineStore } from 'pinia'
import { reactive, ref, type Reactive, type Ref } from 'vue'
import { useApplicationStore } from './applicationStore'
import { useRouter } from 'vue-router'
import type { SymfonyRelation } from '@/models/interfaces/SymfonyRelation'


export const useActorsStore = defineStore(StoresList.ACTORS, () => {
  const dataLoaded = ref(false)
  const router = useRouter();
  const actors: Actor[] = reactive([])
  const selectedActor: Ref<Actor | null> = ref(null)
  const actorsExpertises: SymfonyRelation[] = reactive([])
  const actorsThematics: SymfonyRelation[] = reactive([])
  const actorsAdministrativesScopes: SymfonyRelation[] = reactive([])

  async function getActors(): Promise<void> {
      actors.push(...await ActorsService.getActors())
      dataLoaded.value = true
  }

  async function getActorsSelectListContent(): Promise<void> {
    actorsExpertises.push(...await ActorsService.getActorsExpertisesList())
    actorsThematics.push(...await ActorsService.getActorsThematicsList())
    actorsAdministrativesScopes.push(...await ActorsService.getActorsAdministrativesScopesList())
}

  async function setSelectedActor(id: string) {
    selectedActor.value = await ActorsService.getActor(id)
    router.push('/actors/' + selectedActor.value.name)
  }

  const actorEdition: Reactive<{active: boolean, actor: Actor | null}> = reactive({
    active: false,
    actor: null
  })
  function activateActorEdition(actor: Actor | null) {
    actorEdition.actor = actor
    actorEdition.active = true
    useApplicationStore().showEditContentDialog = true
  }

  async function createOrEditActor(actor: Actor, edit: boolean) {
    const id = selectedActor.value?.id
    const post = await ActorsService.createOrEditActor(actor, edit, id)
    console.log(post)
  }

  return { 
    dataLoaded,
    actors,
    actorsExpertises,
    actorsThematics,
    actorsAdministrativesScopes,
    selectedActor,
    getActors,
    getActorsSelectListContent,
    setSelectedActor,
    actorEdition,
    activateActorEdition,
    createOrEditActor
  }
})
