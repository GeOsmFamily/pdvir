<template>
  <v-btn
    size="small"
    icon="mdi-arrow-left"
    class="text-dark-grey"
    elevation="4"
    @click="mapStore.isMapExportActive = false"
  ></v-btn>
</template>
<script setup lang="ts">
import { useMyMapStore } from '@/stores/myMapStore'
const mapStore = useMyMapStore()
</script>
