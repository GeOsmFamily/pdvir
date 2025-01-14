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
        <template v-if="type === AtlasGroup.THEMATIC_DATA">
          <MyMapLayerPicker
            v-for="(map, index) in atlasMaps"
            :class="index === 0 ? 'mt-6' : 'mt-2'"
            :key="map.id"
            v-model:main-layer="atlasMaps[index].mainLayer"
            v-model:sub-layers="atlasMaps[index].subLayers"
            @update="updateThematicData()"
          />
        </template>
        <template v-else> ICI ON AFFICHE LES MAPS PRE DEFINIES </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import type { Atlas } from '@/models/interfaces/Atlas'
import type { AtlasMap } from '@/models/interfaces/map/AtlasMap'
import { AtlasService } from '@/services/map/AtlasService'
import MyMapLayerPicker from '@/views/map/components/MyMapLayerPicker.vue'
import { onMounted, reactive, ref } from 'vue'

const props = defineProps<{
  atlas: Atlas
  type: AtlasGroup
}>()
const showDetails = ref(false)
const atlasMaps: AtlasMap[] = reactive([])

onMounted(() => {
  atlasMaps.push(...AtlasService.setAtlasLayers(props.atlas))
})

const updateThematicData = () => {
  console.log(atlasMaps)
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

.MyMapAtlas[type='Données thématiques'] {
  border: 1px solid rgb(var(--v-theme-dark-grey));
}

.MyMapAtlas[type='Cartes prédéfinies'] {
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
