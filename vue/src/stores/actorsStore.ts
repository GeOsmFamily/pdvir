import { StoresList } from '@/models/enums/StoresList'
import type { Actor } from '@/models/interfaces/Actor'
import { ActorsService } from '@/services/actors/ActorsService'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useDisplay } from 'vuetify'


export const useActorsStore = defineStore(StoresList.ACTORS, () => {
  const actors: Actor[] = reactive([])
  async function getActors(): Promise<void> {
      actors.push(...await ActorsService.getActors())
  }
  return { actors, getActors }
})
