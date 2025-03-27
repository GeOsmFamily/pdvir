import { StoresList } from '@/models/enums/app/StoresList'
import type { Admin1Boundary } from '@/models/interfaces/AdminBoundaries'
import { AdminBoundariesService } from '@/services/adminBoundaries/AdminBoundariesService'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAdminBoundariesStore = defineStore(StoresList.ADMINISTRATIVE_BOUNDARIES, () => {
  const admin1Boundaries: Ref<Admin1Boundary[]> = ref([])

  async function getAdmin1(): Promise<void> {
    if (admin1Boundaries.value.length === 0) {
      admin1Boundaries.value = await AdminBoundariesService.getAdmin1List()
    }
  }
  return {
    admin1Boundaries,
    getAdmin1
  }
})
