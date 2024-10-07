import { StoresList } from '@/models/enums/StoresList'
import { NavigationTabsService } from '@/services/application/NavigationTabsService'
import { BreadcrumbsService } from '@/services/application/BreadcrumbsService'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { DialogKey } from '@/models/enums/DialogKey'
import type { Ref } from 'vue'

export const useApplicationStore = defineStore(StoresList.APPLICATION, () => {
  const { mobile } = useDisplay()
  const activeTab = ref(0)
  const activeDialog: Ref<DialogKey|null> = ref(null)
  const showEditContentDialog = ref(false)
  const route = useRoute();
  const isProjectMapFullWidth = ref(false)
  const triggerZoomReset = ref(false)
  const breadcrumbs = computed(() => {
    activeTab.value = NavigationTabsService.getTabsNumberFromRoute(route, activeTab.value)
    return BreadcrumbsService.getBreadcrumbsItems(route)
  })

  const is100vh = computed(() => {
    return isProjectMapFullWidth.value
  })

  const isLight = computed(() => {
    const lightUiRoutes: string[] = ['projects']
    return route.name && typeof route.name === 'string' && lightUiRoutes.includes(route.name)
  })

  return { mobile, activeTab, activeDialog, breadcrumbs, is100vh, isLight, isProjectMapFullWidth, triggerZoomReset, showEditContentDialog }
})
