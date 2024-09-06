import { StoresList } from '@/models/enums/StoresList'
import { NavigationTabsService } from '@/services/application/NavigationTabsService'
import { BreadcrumbsService } from '@/services/application/BreadcrumbsService'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'


export const useApplicationStore = defineStore(StoresList.APPLICATION, () => {
  const { mobile } = useDisplay()
  const activeTab = ref(0)

  const route = useRoute();
  const breadcrumbs = computed(() => {
    activeTab.value = NavigationTabsService.getTabsNumberFromRoute(route, activeTab.value)
    return BreadcrumbsService.getBreadcrumbsItems(route)
  })

  
  const showLogingDialog = ref(false)
  const showEditContentDialog = ref(false)
  return { mobile, activeTab, breadcrumbs, showLogingDialog, showEditContentDialog }
})
