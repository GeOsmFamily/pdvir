<template>
  <div class="MyMapLayerPicker" v-if="mainLayer">
    <div class="MyMapLayerPicker__parentBlock">
      <v-checkbox
        color="main-blue"
        :indeterminate="isIndeterminate"
        hide-details="auto"
        density="compact"
        v-model="mainLayer.isShown"
        class="text-body-2"
      >
        <template v-slot:label>
          <div class="MyMapLayerPicker__descCtn">
            <img :src="mainLayer.icon" :alt="mainLayer.name" />
            <span>{{ mainLayer.name }}</span>
          </div>
        </template>
      </v-checkbox>
      <div class="MyMapLayerPicker__actions">
        <v-btn
          v-if="subLayers"
          variant="text"
          density="comfortable"
          icon="mdi-layers"
          :color="isExpanded ? 'main-blue' : 'main-dark-grey'"
          @click="isExpanded = !isExpanded"
        />
        <v-btn
          variant="text"
          density="comfortable"
          icon="mdi-dots-horizontal"
          :color="isActionsShown ? 'main-blue' : 'main-dark-grey'"
          @click="isActionsShown = !isActionsShown"
        />
      </div>
    </div>
    <div class="MyMapLayerPicker__listBlock" :is-shown="isExpanded" v-if="subLayers">
      <div class="MyMapLayerPicker__listBlockWrapper">
        <v-checkbox
          v-for="(subLayer, key) in subLayers"
          :label="subLayer.name"
          v-model="subLayer.isShown"
          color="main-blue"
          hide-details="auto"
          density="compact"
          class="text-body-2"
          :key="key"
        ></v-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Layer from '@/models/interfaces/map/Layer'
import { computed, ref, watch, type ModelRef } from 'vue'
const isExpanded = ref(false)
const isActionsShown = ref(false)
const mainLayer: ModelRef<Layer | undefined> = defineModel('mainLayer')
const subLayers: ModelRef<Layer[] | undefined> = defineModel('subLayers')

const isIndeterminate = computed(() => {
  if (subLayers.value == undefined) return false
  const disabledLayers = subLayers.value.filter((subLayer: Layer) => subLayer.isShown === false)
  return disabledLayers.length !== 0 && disabledLayers.length !== subLayers.value.length
})

watch(
  () => mainLayer.value?.isShown,
  (newValue) => {
    editAllSubLayers(newValue)
  }
)

const editAllSubLayers = (show = true) => {
  if (subLayers.value === undefined) return
  subLayers.value.forEach((subLayer) => {
    subLayer.isShown = show
  })
}
</script>

<style lang="scss">
.MyMapLayerPicker {
  display: flex;
  flex-flow: column nowrap;
  .MyMapLayerPicker__parentBlock {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.25rem 0.5rem;
    border: solid 1px rgb(var(--v-theme-main-dark-grey));
    border-radius: $dim-radius;
    .v-label {
      opacity: 1;
    }
    .MyMapLayerPicker__descCtn {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0.25rem;
      flex: 1 0 auto;
      img {
        max-width: 2.25rem;
      }
      span {
        color: rgb(var(--v-theme-main-blue));
        font-weight: bold;
        font-size: $font-size-sm;
      }
    }
  }

  .MyMapLayerPicker__listBlock {
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.15s ease-in;
    border-radius: $dim-radius;
    border: solid 1px transparent;
    max-height: 11.5rem;

    &[is-shown='true'] {
      grid-template-rows: 1fr;
      border: solid 1px rgb(var(--v-theme-main-grey));
      .MyMapLayerPicker__listBlockWrapper {
        padding: 0.5rem 0.75rem;
      }
    }

    .MyMapLayerPicker__listBlockWrapper {
      padding: 0 0.75rem;
      display: flex;
      border-color: transparent;
      flex-flow: column nowrap;
      transition: all 0.15s ease-in;
      gap: 0.25rem;
      overflow-y: auto;
      .v-checkbox .v-selection-control {
        --v-input-control-height: 18px;
        gap: 0.25rem;
      }

      label {
        font-size: $font-size-sm;
        opacity: 1;
      }
    }
  }
}
</style>
