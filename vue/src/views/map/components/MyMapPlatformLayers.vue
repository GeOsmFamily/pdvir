<template>
  <div class="MyMapPlatformLayers">
    <MyMapLayerPicker
      v-model:main-layer="myMapStore.projectLayer"
      v-model:sub-layers="myMapStore.projectSubLayers"
    />
    <MyMapLayerPicker
      v-model:main-layer="myMapStore.actorLayer"
      v-model:sub-layers="myMapStore.actorSubLayers"
    />
    <MyMapLayerPicker
      v-model:main-layer="myMapStore.resourceLayer"
      v-model:sub-layers="myMapStore.resourceSubLayers"
    />
  </div>
</template>

<script setup lang="ts">
import { useThematicStore } from '@/stores/thematicStore'
import { ItemType } from '@/models/enums/app/ItemType'
import MyMapLayerPicker from '@/views/map/components/MyMapLayerPicker.vue'
import projectLayerIcon from '@/assets/images/icons/map/project_icon.png'
import resourceLayerIcon from '@/assets/images/icons/map/resource_icon.png'
import actorLayerIcon from '@/assets/images/icons/map/actor_icon.png'
import { computed, onMounted } from 'vue'
import { i18n } from '@/plugins/i18n'
import LayerService from '@/services/map/LayerService'
import { useMyMapStore } from '@/stores/myMapStore'
import MapService from '@/services/map/MapService'
import { useResourceStore } from '@/stores/resourceStore'
import { useProjectStore } from '@/stores/projectStore'
import { useActorsStore } from '@/stores/actorsStore'
import useAssets from '@/composables/useAssets'

const myMapStore = useMyMapStore()
const actorStore = useActorsStore()
const projectStore = useProjectStore()
const resourceStore = useResourceStore()
const thematicStore = useThematicStore()

onMounted(async () => {
  await thematicStore.getAll()
  initMainLayers()
  initSubLayers()
  Promise.all([
    await resourceStore.getAll(),
    await actorStore.getAll(),
    await projectStore.getAll()
  ]).then(() => {
    console.log('promise all', myMap.value, map.value)
    // if (map.value != null) {
      map.value.on('load', async () => {
        console.log('onloaddddddddddddd')
        setPlatformDataLayers()
      })
    // }
  })
})
// onMounted(async () => {
//   if (myMap.value != null) {
//     myMap.value.on('load', async () => {
//       setPlatformDataLayers()
//     })
//   }
// })

const initMainLayers = () => {
  myMapStore.projectLayer = {
    name: i18n.t('myMap.rightSidebar.layers.itemType.' + ItemType.PROJECT),
    icon: projectLayerIcon,
    isShown: true
  }
  myMapStore.actorLayer = {
    name: i18n.t('myMap.rightSidebar.layers.itemType.' + ItemType.ACTOR),
    icon: actorLayerIcon,
    isShown: true
  }
  myMapStore.resourceLayer = {
    name: i18n.t('myMap.rightSidebar.layers.itemType.' + ItemType.RESOURCE),
    icon: resourceLayerIcon,
    isShown: true
  }
}

const initSubLayers = () => {
  myMapStore.projectSubLayers = LayerService.initSubLayer(thematicStore.thematics)
  myMapStore.actorSubLayers = LayerService.initSubLayer(thematicStore.thematics)
  myMapStore.resourceSubLayers = LayerService.initSubLayer(thematicStore.thematics)
}

const myMap = computed(() => myMapStore.myMap)
const map = computed(() => myMapStore.myMap?.map)

const setPlatformDataLayers = async () => {
  Object.values(ItemType).forEach((itemType) => {
    console.log('itemType', itemType);
    setPlatformDataLayer(itemType)
  })
}

const getGeojsonPerItemType = (itemType: ItemType) => {
  switch (itemType) {
    case ItemType.ACTOR:
      return MapService.getGeojson(actorStore.actors)
    case ItemType.PROJECT:
      return MapService.getGeojson(projectStore.projects)
    case ItemType.RESOURCE:
      return MapService.getGeojson(resourceStore.resources)
  }
}

const setPlatformDataLayer = async (itemType: ItemType) => {
  if (myMap.value) {
    const geojson = getGeojsonPerItemType(itemType)
    console.log('geojson', geojson)
    const icon = useAssets(`@/assets/images/icons/map/${itemType}_icon.png`)
    const hoverIcon = useAssets(`@/assets/images/icons/map/${itemType}_icon_hover.png`)
    myMap.value.addSource(itemType, geojson)
    await myMap.value.addImage(itemType, icon)
    await myMap.value.addImage(itemType + '_hover', hoverIcon)
    const layout: maplibregl.LayerSpecification['layout'] = {
      'icon-image': itemType,
      'icon-size': 0.45
    }
    myMap.value.addLayer(itemType, { layout })
    // myMap.value.listenToHoveredFeature(projectsLayerName)
    // myMap.value.addPopupOnClick(projectsLayerName, activeProjectCard.value)
  }
  return
}
</script>

<style lang="scss">
.MyMapPlatformLayers {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.75rem;
}
</style>
