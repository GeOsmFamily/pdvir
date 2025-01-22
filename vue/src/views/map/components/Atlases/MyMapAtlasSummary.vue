<template>
  <div class="MyMapAtlasSummary">
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
  </div>
</template>
<script setup lang="ts">
import type { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import type { Atlas } from '@/models/interfaces/Atlas'
import { inject } from 'vue'
const hideDetails = inject('hideDetails')

defineProps<{
  atlas: Atlas
  type: AtlasGroup
}>()
</script>

<style>
.MyMapAtlasSummary {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.MyMapAtlasSummary[style*='display: none'] {
  display: none !important;
}
</style>
