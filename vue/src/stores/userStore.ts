import { StoresList } from '@/models/enums/StoresList'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserStore = defineStore(StoresList.USER, () => {
  const userIsLogged = ref(false)
  return { userIsLogged }
})
