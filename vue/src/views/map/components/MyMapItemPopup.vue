<template>
  <div class="MyMapItemPopup" ref="active-item-card">
    <ProjectCard
      v-if="myMapStore.activeItemType === ItemType.PROJECT"
      class="ProjectCard ProjectCard--light"
      :project="myMapStore.activeItem as Project"
      :map="true"
    />
    <ResourceCard
      v-else-if="myMapStore.activeItemType === ItemType.RESOURCE"
      :resource="myMapStore.activeItem as Resource"
      class="ResourceCard ResourceCard--light"
    />
    <ActorCard
      v-else-if="myMapStore.activeItemType === ItemType.ACTOR"
      :actor="myMapStore.activeItem as Actor"
      class="ActorCard ActorCard--light"
    />
  </div>
</template>

<script setup lang="ts">
import { useMyMapStore } from '@/stores/myMapStore'
import ProjectCard from '@/views/projects/components/ProjectCard.vue'
import { computed, onMounted, useTemplateRef, watch } from 'vue'
import ActorCard from '@/views/actors/components/ActorCard.vue'
import { ItemType } from '@/models/enums/app/ItemType'
import type { Project } from '@/models/interfaces/Project'
import type { Resource } from '@/models/interfaces/Resource'
import ResourceCard from '@/views/resources/components/ResourceCard.vue'
import type { Actor } from '@/models/interfaces/Actor'

const myMapStore = useMyMapStore()
const activeItemCard = useTemplateRef('active-item-card')

const myMap = computed(() => myMapStore.myMap)
const map = computed(() => myMap.value?.map)

onMounted(() => {
  if (map.value) {
    if (map.value?.loaded()) {
      showPopupOnInit()
    } else {
      map.value.on('load', () => {
        showPopupOnInit()
      })
    }
  }
})

watch(
  () => myMap.value?.activeFeatureId,
  (to, from) => {
    console.log('myMap.value?.activeFeatureId', myMap.value?.activeFeatureId);
    const initializing = from === undefined
    if (myMap.value == null || initializing) return
    myMapStore.activeItemId = myMap.value?.activeFeatureId
  }
)

const showPopup = () => {
  console.log('showPopup', myMap.value)
  if (myMap.value == null) return
  Object.values(ItemType).forEach((itemType) => {
    myMap.value?.addPopupOnClick(itemType, activeItemCard.value, false)
  })
}

const showPopupOnInit = () => {
  if (map.value) {
    showPopup()
    if (myMapStore.activeItem != null && myMap.value) {
      if (myMapStore.activeItem.geoData.coords) {
        myMap.value.addPopup(myMapStore.activeItem.geoData.coords, activeItemCard.value, false)
      }
    }
  }
}

watch(
  () => myMapStore.activeItem,
  () => {
    if (myMap.value == null) return
    showPopup()
  }
)
</script>

<style lang="scss">
.MyMap {
  width: 100%;
  height: 100%;
  position: relative;

  .maplibregl-popup,
  .MyMapItemPopup .v-card {
    max-width: 22rem !important;
  }

  .MyMap__map {
    width: 100%;
    height: 100%;

    .maplibregl-ctrl-top-right {
      align-items: flex-end;
    }
  }
}
</style>
