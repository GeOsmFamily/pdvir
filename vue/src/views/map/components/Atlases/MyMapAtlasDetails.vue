<template>
  <div class="MyMapAtlas__maps">
    <div class="d-flex flex-row flex-wrap">
      <v-btn
        size="small"
        icon="mdi-arrow-left"
        class="text-dark-grey"
        @click="hideDetails = true"
      ></v-btn>
      <div class="MyMapAtlas__desc ml-2">
        <div class="MyMapAtlas__title">{{ atlas.name }}</div>
        <div class="MyMapAtlas__details">
          {{ atlas.maps.length }} {{ $t('myMap.atlases.data', { count: atlas.maps.length }) }}
        </div>
      </div>
    </div>
    <template v-if="type === AtlasGroup.THEMATIC_DATA">
      <MyMapLayerPicker
        v-for="(qgisMap, index) in myMapStore.atlasThematicMaps.filter(
          (map) => map.atlasId === atlas['@id']
        )"
        :class="index === 0 ? 'mt-3' : 'mt-1'"
        :key="qgisMap.id"
        v-model:main-layer="
          myMapStore.atlasThematicMaps.filter((x) => x.atlasId === atlas['@id'])[index].mainLayer
        "
        v-model:sub-layers="
          myMapStore.atlasThematicMaps.filter((x) => x.atlasId === atlas['@id'])[index].subLayers
        "
        @update="updateThematicData(qgisMap.id)"
        :sublayer-icon="true"
      />
    </template>
    <template v-else>
      <MyMapAtlasPicker :atlas="atlas" @update="updatePreDefinedMap($event)" />
    </template>
  </div>
</template>
<script setup lang="ts">
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import type { Atlas } from '@/models/interfaces/Atlas'
import { inject } from 'vue'
import { useMyMapStore } from '@/stores/myMapStore'
import MyMapLayerPicker from '@/views/map/components/MyMapLayerPicker.vue'
import MyMapAtlasPicker from '@/views/map/components/Atlases/MyMapAtlasPicker.vue'
const hideDetails = inject('hideDetails')
const myMapStore = useMyMapStore()

const props = defineProps<{
  atlas: Atlas
  type: AtlasGroup
}>()

const updateThematicData = (qgismapId: string) => {
  myMapStore.updateAtlasLayersVisibility(qgismapId)
}

const updatePreDefinedMap = (value: boolean) => {
  for (const map of props.atlas.maps) {
    for (const storeMap of myMapStore.atlasThematicMaps) {
      if (storeMap.id === map['@id']) {
        storeMap.mainLayer.isShown = value
        storeMap.subLayers.forEach((subLayer) => {
          subLayer.isShown = value
        })
      }
    }
    myMapStore.updateAtlasLayersVisibility(map['@id'])
  }
}
</script>
