<template>
  <div class="MyMapAtlas" :type="type">
    <template v-if="!showDetails">
      <div class="d-flex flex-row flex-wrap">
        <div class="MyMapAtlas__logo" :type="type">
          <img :src="atlas.logo.contentUrl" v-if="atlas.logo" />
        </div>
        <div class="MyMapAtlas__desc">
          <div class="MyMapAtlas__title">{{ atlas.name }}</div>
          <div class="MyMapAtlas__details">
            {{ atlas.maps.length }} {{ $t('myMap.atlases.data', { count: atlas.maps.length }) }}
          </div>
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
  type: 'ThematicData' | 'PreDefinedMap'
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
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
}

.MyMapAtlas[type='ThematicData'] {
  border: 1px solid rgb(var(--v-theme-dark-grey));
}

.MyMapAtlas[type='PreDefinedMap'] {
  border: 1px solid rgb(var(--v-theme-main-blue));
  box-shadow: 0px 2px 0px 0px rgb(var(--v-theme-main-blue));
  padding: 0.5rem 1rem;
}

.MyMapAtlas__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 50%;
  }
  &[type='PreDefinedMap'] {
    img {
      width: 3rem;
      height: 3rem;
    }
  }
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
