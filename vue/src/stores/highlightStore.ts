import { StoresList } from '@/models/enums/app/StoresList'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { HighlightedItemService } from '@/services/highlight/HighlightedItemService'
import type { HighlightedItem } from '@/models/interfaces/Item'
import { debounce } from '@/services/utils/UtilsService'

export const useHighlightStore = defineStore(StoresList.HIGHLIGHTS, () => {
  const highlights: Ref<Partial<HighlightedItem>[]> = ref([])

  const orderedHighlights = computed(() => {
    return highlights.value
      .filter((highlightedItem) => highlightedItem?.isHighlighted)
      .sort((a, b) => {
        return b.position - a.position
      })
  })

  async function getAll(isPartial = true): Promise<void> {
    debouncedGetAll(isPartial)
  }

  const debouncedGetAll = debounce(async (isPartial: boolean) => {
    if (highlights.value.length === 0) {
      highlights.value = isPartial
        ? await HighlightedItemService.getAllPartial()
        : await HighlightedItemService.getAll()
    }
  }, 100)

  const updateHighlightedItem = (updatedHighlightedItem: HighlightedItem) => {
    let found = false
    highlights.value.forEach((project, key) => {
      if (project.id === updatedHighlightedItem.id) {
        highlights.value[key] = updatedHighlightedItem
        found = true
      }
    })
    if (!found) {
      highlights.value.push(updatedHighlightedItem)
    }
  }

  return {
    highlights,
    orderedHighlights,
    getAll,
    updateHighlightedItem
  }
})
