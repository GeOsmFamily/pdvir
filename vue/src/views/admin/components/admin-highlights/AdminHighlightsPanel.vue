<template>
  <div class="AdminPanel AdminPanel--highlight">
    <AdminTopBar page="Highlights" :items="highlights" searchKey="name" />
    <AdminTable
      :items="orderedHighlights"
      :tableKeys="['name', 'itemType', 'position']"
      :column-widths="['5%', 'auto', '10%', '10%']"
      :is-draggable="true"
      :is-overlay-shown-function="(item) => item.position <= 3"
      @update:order="(orderedEvent) => updateOrder(orderedEvent)"
    >
      <template #adminTableItemFirst="{ item }">
        <HighlightButton :item-id="(item as HighlightedItem).itemId" />
      </template>
    </AdminTable>
  </div>
</template>
<script setup lang="ts">
import { useHighlightStore } from '@/stores/highlightStore'
import { computed, onBeforeMount } from 'vue'
import AdminTopBar from '@/components/admin/AdminTopBar.vue'
import AdminTable from '@/components/admin/AdminTable.vue'
import type { HighlightedItem } from '@/models/interfaces/Item'
import HighlightButton from '@/components/global/HighlightButton.vue'
import { HighlightedItemService } from '@/services/highlight/HighlightedItemService'

const highlightsStore = useHighlightStore()
const highlights = computed(() => highlightsStore.highlights)
const orderedHighlights = computed(() => highlightsStore.orderedHighlights)

onBeforeMount(async () => await highlightsStore.getAll(false))

const updateOrder = async (orderedEvent: { id: number; oldIndex: number; newIndex: number }) => {
  await HighlightedItemService.patch({
    itemId: highlights.value.find((item) => item.id === orderedEvent.id)?.itemId,
    position: orderedEvent.newIndex + 1
  })
}
</script>

<style lang="scss">
.AdminPanel--highlight {
  .AdminTable {
    $dim-right-pad: 2rem;
    padding-left: $dim-right-pad;
    .AdminTable__row {
      position: relative;
      &::before {
        position: absolute;
        left: -$dim-right-pad;
        font-weight: bold;
        align-self: center;
      }
      &:nth-child(1)::before {
        content: '1';
      }
      &:nth-child(2)::before {
        content: '2';
      }
      &:nth-child(3)::before {
        content: '3';
      }
    }
  }
}
</style>
