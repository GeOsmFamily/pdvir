import { StoresList } from '@/models/enums/StoresList'
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
    return BreadcrumbsService.getBreadcrumbsItems(route.path)
  })
  return { mobile, activeTab, breadcrumbs }
})
