<template>
  <div class="MyMapAtlas" :type="type">
    <template v-if="hideDetails">
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
        @click="hideDetails = false"
      ></v-btn>
    </template>

    <template v-else>
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
            :class="index === 0 ? 'mt-6' : 'mt-2'"
            :key="qgisMap.id"
            v-model:main-layer="
              myMapStore.atlasThematicMaps.filter((x) => x.atlasId === atlas['@id'])[index]
                .mainLayer
            "
            v-model:sub-layers="
              myMapStore.atlasThematicMaps.filter((x) => x.atlasId === atlas['@id'])[index]
                .subLayers
            "
            @update="updateThematicData(qgisMap.id)"
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
import { AtlasService } from '@/services/map/AtlasService'
import { useMyMapStore } from '@/stores/myMapStore'
import MyMapLayerPicker from '@/views/map/components/MyMapLayerPicker.vue'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  atlas: Atlas
  type: AtlasGroup
}>()
const hideDetails = ref(true)
const myMapStore = useMyMapStore()

onMounted(() => {
  myMapStore.atlasThematicMaps.push(...AtlasService.setAtlasLayers(props.atlas))
})

const updateThematicData = (qgismapId: string) => {
  myMapStore.updateAtlasLayersVisibility(qgismapId)
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
