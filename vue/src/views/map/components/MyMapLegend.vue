<template>
  <div class="maplibregl-ctrl maplibregl-ctrl-group MapLegend" :isOpen="legendIsShown">
    <v-btn icon="$vuetify" v-if="!legendIsShown" @click.stop="legendIsShown = true"> Button </v-btn>
    <div v-else class="MapLegend__layersCtn">
      <v-btn icon="$vuetify" @click.stop="legendIsShown = false"> Button </v-btn>
      {{ mapStore.legendList }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyMapStore } from '@/stores/myMapStore'
import { ref } from 'vue'
const legendIsShown = ref(false)
const mapStore = useMyMapStore()
</script>

<style lang="scss">
.MapLegend {
  flex-flow: row nowrap !important;

  &[isOpen='false'] {
    margin-right: 0.3rem !important;
  }
}

.MapLegend__layersCtn {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
}
</style>
