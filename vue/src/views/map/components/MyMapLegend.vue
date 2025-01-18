<template>
  <div class="maplibregl-ctrl maplibregl-ctrl-group MapLegend" :isOpen="legendIsShown">
    <v-btn icon="$vuetify" v-if="!legendIsShown" @click.stop="legendIsShown = true"> Button </v-btn>
    <div v-else class="MapLegend__ctn">
      <div class="MapLegend__title">
        <FormSectionTitle :text="$t('myMap.legend.title')" />
        <v-icon icon="mdi-close" @click.stop="legendIsShown = false" color="light-blue"></v-icon>
      </div>
      <VueDraggable v-model="mapStore.legendList" @end="updateMainLayerOrder" group="parent">
        <div class="MapLegend__item" v-for="item in mapStore.legendList" :key="item.id">
          {{ item.name }} / {{ item.order }}
        </div>
      </VueDraggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormSectionTitle from '@/components/text-elements/FormSectionTitle.vue'
import { useMyMapStore } from '@/stores/myMapStore'
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const legendIsShown = ref(false)
const mapStore = useMyMapStore()

function updateMainLayerOrder() {
  mapStore.legendList.forEach((item, index) => {
    item.order = index
  })
  mapStore.updateLegendOrder()
}
</script>

<style lang="scss">
.MapLegend {
  flex-flow: row nowrap !important;

  &[isOpen='false'] {
    margin-right: 0.3rem !important;
  }
}

.MapLegend__ctn {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
  width: 15rem;
  background-color: white;
  max-height: 20rem;
  padding: 0.5rem;
}
.MapLegend__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
