import { AdministrationPanels } from '@/models/enums/app/AdministrationPanels'
import { StoresList } from '@/models/enums/app/StoresList'
import { UsersService } from '@/services/application/UsersService'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'


export const useAdminStore = defineStore(StoresList.ADMIN, () => {
    // AdminPanel is used for navigation in extension panels component
    // AdminItem is indicating which item to display in the edition component as a panel can contain multiple items
  const selectedAdminPanel:Ref<AdministrationPanels> = ref(AdministrationPanels.MEMBERS)
  const selectedAdminItem:Ref<AdministrationPanels | null> = ref(AdministrationPanels.CONTENT_ACTORS)

  const appMembers = ref([])
  const getMembers = async () => {
    await UsersService.getMembers()
  }
  return { selectedAdminPanel, selectedAdminItem, appMembers, getMembers }
})
