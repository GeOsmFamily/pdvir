<template>
  <div class="MyMapAtlas">
    <template v-if="!showDetails">
      <div class="MyMapAtlas__desc">
        <div class="MyMapAtlas__title">{{ atlas.name }}</div>
        <div class="MyMapAtlas__details">
          {{ atlas.maps.length }} {{ $t('myMap.atlases.data', { count: atlas.maps.length }) }}
        </div>
      </div>
      <v-btn
        size="small"
        icon="mdi-arrow-right"
        class="text-dark-grey"
        @click="showDetails = true"
      ></v-btn>
    </template>
    <template v-else>
      <div class="MyMapAtlas__maps">
        <div class="d-flex flex-row flex-wrap">
          <v-btn
            size="small"
            icon="mdi-arrow-left"
            class="text-dark-grey"
            @click="showDetails = false"
          ></v-btn>
          <div class="MyMapAtlas__desc ml-2">
            <div class="MyMapAtlas__title">{{ atlas.name }}</div>
            <div class="MyMapAtlas__details">
              {{ atlas.maps.length }} {{ $t('myMap.atlases.data', { count: atlas.maps.length }) }}
            </div>
          </div>
        </div>
        <MyMapLayerPicker
          v-for="(map, index) in localMaps"
          :key="map.id"
          v-model:main-layer="localMaps[index]"
          v-model:sub-layers="localMaps[index].subLayers"
          @update="test()"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Atlas } from '@/models/interfaces/Atlas'
import MyMapLayerPicker from '@/views/map/components/MyMapLayerPicker.vue'
import { ref } from 'vue'

const props = defineProps<{
  atlas: Atlas
}>()

const localMaps = ref(JSON.parse(JSON.stringify(props.atlas.maps)))

const showDetails = ref(false)

const test = () => {
  console.log(localMaps.value)
}
</script>

<style lang="scss">
.MyMapAtlas {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(var(--v-theme-dark-grey));
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
}

.MyMapAtlas__desc {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
}

.MyMapAtlas__title {
  font-weight: 600;
}

.MyMapAtlas__maps {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
}
</style>
