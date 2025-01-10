<template>
  <v-btn
    v-if="userStore.userIsAdmin()"
    @click.prevent="highlight"
    variant="text"
    density="comfortable"
    :icon="'mdi mdi-star' + (!highlightedItem?.isHighlighted ? '-outline' : '')"
    color="main-blue"
  ></v-btn>
</template>

<script setup lang="ts">
import type { HighlightedItem } from '@/models/interfaces/Item'
import { HighlightedItemService } from '@/services/highlight/HighlightedItemService'
import { useHighlightStore } from '@/stores/highlightStore'
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted } from 'vue'

const highlightStore = useHighlightStore()
const userStore = useUserStore()

const props = defineProps<{
  itemId: string
}>()

onMounted(async () => {
  await highlightStore.getAll(true)
})

const highlightedItem = computed(() =>
  highlightStore.highlights.find((item) => item.itemId === props.itemId)
)

const highlight = async () => {
  const highlightedItemSubmission: Partial<HighlightedItem> = {
    itemId: props.itemId,
    isHighlighted: !highlightedItem.value?.isHighlighted
  }
  if (highlightStore.highlights.some((item) => item.itemId === props.itemId)) {
    await HighlightedItemService.patch(highlightedItemSubmission).then((item) =>
      highlightStore.updateHighlightedItem(item)
    )
  } else {
    await HighlightedItemService.post(highlightedItemSubmission).then((item) =>
      highlightStore.updateHighlightedItem(item)
    )
  }
}
</script>
