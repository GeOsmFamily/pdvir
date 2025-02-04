<template>
  <div class="maplibregl-ctrl maplibregl-ctrl-group MapExport">
    <v-btn
      icon="mdi-tray-arrow-down"
      @click.stop="mapStore.isMapExportActive = !mapStore.isMapExportActive"
      :class="{ 'text-white': mapStore.isMapExportActive }"
      :color="mapStore.isMapExportActive ? 'main-blue' : 'white'"
    ></v-btn>
  </div>
</template>
<script setup lang="ts">
import { useMyMapStore } from '@/stores/myMapStore'

const mapStore = useMyMapStore()
</script>

<style>
.MapExport {
  flex-flow: row nowrap !important;
  margin-right: 0.3rem !important;
}
</style>
