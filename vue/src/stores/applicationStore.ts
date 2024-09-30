import { StoresList } from '@/models/enums/app/StoresList'
import { NavigationTabsService } from '@/services/application/NavigationTabsService'
import { BreadcrumbsService } from '@/services/application/BreadcrumbsService'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { DialogKey } from '@/models/enums/app/DialogKey'
import type { Ref } from 'vue'

export const useApplicationStore = defineStore(StoresList.APPLICATION, () => {
  const { mobile } = useDisplay()
  const activeTab = ref(0)
  const activeDialog: Ref<DialogKey|null> = ref(null)
  const showEditContentDialog = ref(false)
  const route = useRoute();
  const breadcrumbs = computed(() => {
    activeTab.value = NavigationTabsService.getTabsNumberFromRoute(route, activeTab.value)
    return BreadcrumbsService.getBreadcrumbsItems(route)
  })
  return { mobile, activeTab, activeDialog, breadcrumbs, showEditContentDialog }
})
