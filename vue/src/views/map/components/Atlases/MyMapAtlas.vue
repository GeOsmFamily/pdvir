<template>
  <div class="MyMapAtlas" :type="type">
    <MyMapAtlasSummary :atlas="atlas" :type="type" v-if="hideDetails" />
    <MyMapAtlasDetails :atlas="atlas" :type="type" v-else />
  </div>
</template>

<script setup lang="ts">
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import type { Atlas } from '@/models/interfaces/Atlas'
import MyMapAtlasSummary from '@/views/map/components/Atlases/MyMapAtlasSummary.vue'
import MyMapAtlasDetails from '@/views/map/components/Atlases/MyMapAtlasDetails.vue'
import { provide, ref } from 'vue'

defineProps<{
  atlas: Atlas
  type: AtlasGroup
}>()
const hideDetails = ref(true)
provide('hideDetails', hideDetails)
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
  width: 100%;
}
</style>
