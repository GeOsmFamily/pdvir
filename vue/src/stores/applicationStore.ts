import { StoresList } from '@/models/enums/StoresList'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'


export const useApplicationStore = defineStore(StoresList.APPLICATION, () => {
  const { mobile } = useDisplay()
  const activeTab = ref(0)
  return { mobile, activeTab }
})
