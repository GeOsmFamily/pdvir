<template>
  <div class="MyMapLayersSideBar">
    <MyMapPlatformLayers class="MyMapLayersSideBar" />
    <MyMapAtlasesList
      class="MyMapLayersSideBar"
      title="Données thématiques"
      :atlases="
        atlasStore.atlasList.filter((atlas) => atlas.atlasGroup === AtlasGroup.THEMATIC_DATA)
      "
      v-if="atlasStore.atlasList.length > 0"
    />
  </div>
</template>

<script setup lang="ts">
import MyMapPlatformLayers from '@/views/map/components/MyMapPlatformLayers.vue'
import MyMapAtlasesList from '@/views/map/components/Atlases/MyMapAtlasesList.vue'
import { useAtlasStore } from '@/stores/atlasStore'
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import { onMounted } from 'vue'

const atlasStore = useAtlasStore()
onMounted(() => {
  atlasStore.getAll()
})
</script>

<style lang="scss">
.MyMapLayersSideBar {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 0 auto;
  width: 19rem;
  background: #fff;
  padding: 1rem;
  gap: 1rem;
}
</style>
