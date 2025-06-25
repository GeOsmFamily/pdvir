<template>
  <div class="MyMapRightSideBar">
    <div>
      <h3 class="zone-title">{{ $t('myMap.header.select.mainCity') }}</h3>
      <MyMapSelectCommuneTown
        :placeholder="$t('myMap.header.select.mainCity')"
        :geometry-details="true"
        class="MyMapHeader__search"
        :icon="'mdi-map-marker'"
        density="comfortable"
        v-model="selectedTown"
      />
    </div>
    <MyMapAtlasesList
      :title="$t('breadcrumbs.projects')"
      :type="AtlasGroup.THEMATIC_DATA"
      :atlases="[atlasStore.mindhuProjects]"
      v-if="atlasStore.mindhuProjects !== null"
    />
    <div v-show="!mapStore.isMapExportActive" class="MyMapRightSideBar__subCtn">
      <MyMapPlatformLayers />
      <MyMapAtlasesList
        :title="$t('atlas.thematicData')"
        :type="AtlasGroup.THEMATIC_DATA"
        :atlases="
          atlasStore.atlasListSplitted
            .filter((atlas) => atlas.atlasGroup === AtlasGroup.THEMATIC_DATA)
            .sort((a, b) => a.name.localeCompare(b.name))
        "
        v-if="atlasStore.atlasListSplitted.length > 0"
      />
    </div>
    <div v-if="mapStore.isMapExportActive" class="MyMapRightSideBar__subCtn">
      <MyMapExportMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyMapPlatformLayers from '@/views/map/components/MyMapPlatformLayers.vue'
import MyMapAtlasesList from '@/views/map/components/Atlases/MyMapAtlasesList.vue'
import { useAtlasStore } from '@/stores/atlasStore'
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import { useMyMapStore } from '@/stores/myMapStore'
import MyMapExportMenu from './export/MyMapExportMenu.vue'
import MyMapSelectCommuneTown from './MyMapSelectCommuneTown.vue'
import { watch } from 'vue'
const selectedTown = defineModel<string | null>('selectedTown', { default: null })
const atlasStore = useAtlasStore()
const mapStore = useMyMapStore()

watch(
  selectedTown,
  () => {
    // Mettre à jour le store selon la logique de priorité
    mapStore.selectedBoundary = selectedTown.value
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.MyMapRightSideBar {
  display: flex;
  flex-flow: column nowrap;
  width: 30rem;
  background: #fff;
  padding: 1rem;
  gap: 1rem;
  overflow: auto;
  max-height: calc(100vh - $mymap-header-h);
}
.MyMapRightSideBar__subCtn {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - $mymap-header-h);
}
.zone-title {
  margin-bottom: 16px;
}
</style>
