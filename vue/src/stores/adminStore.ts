import { AdministrationPanels } from '@/models/enums/app/AdministrationPanels'
import { StoresList } from '@/models/enums/app/StoresList'
import type { User } from '@/models/interfaces/auth/User'
import { UsersService } from '@/services/application/UsersService'
import { defineStore } from 'pinia'
import { reactive, ref, watch, type Reactive, type Ref } from 'vue'
import { useApplicationStore } from './applicationStore'
import { AuthenticationService } from '@/services/auth/AuthenticationService'


export const useAdminStore = defineStore(StoresList.ADMIN, () => {
    // AdminPanel is used for navigation in extension panels component
    // AdminItem is indicating which item to display in the edition component as a panel can contain multiple items
  const selectedAdminPanel:Ref<AdministrationPanels> = ref(AdministrationPanels.MEMBERS)
  const selectedAdminItem:Ref<AdministrationPanels | null> = ref(AdministrationPanels.CONTENT_ACTORS)

  const appMembers = ref([])
  const getMembers = async () => {
    appMembers.value = await UsersService.getMembers()
  }

  const userEdition: Reactive<{active: boolean, user: User | null}> = reactive({
    active: false,
    user: null
  })
  watch(() => userEdition.active, () => {
    if (!userEdition.active) {
      useApplicationStore().showEditContentDialog = false
    }
  })
  function setUserEditionMode(user: User | null) {
    userEdition.user = user
    userEdition.active = true
    useApplicationStore().showEditContentDialog = true
  }

  async function editUser(values: Partial<User>) {
    await AuthenticationService.patchUser(values, userEdition.user!.id)
    await getMembers()
    userEdition.active = false
  }

  return { selectedAdminPanel, selectedAdminItem, appMembers, getMembers, userEdition, setUserEditionMode, editUser }
})
