<template>
  <div class="MyMapAtlasPicker ml-3" v-for="map in props.atlas.maps" :key="map['@id']">
    <v-checkbox
      hide-details
      @update:modelValue="(newValue) => handleCheckboxChange(map['@id'], newValue as boolean)"
    />
    <div class="MyMapAtlasPicker__descCtn">
      <img :src="map.logo.contentUrl" :alt="atlas.name" />
      <div class="MyMapAtlasPicker__desc ml-2">
        <span>{{ map.name }}</span>
        <span>
          {{ map.qgisProject.layers?.length }}
          {{ $t('myMap.atlases.data', { count: atlas.maps.length }) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Atlas } from '@/models/interfaces/Atlas'
const props = defineProps<{
  atlas: Atlas
}>()

const emits = defineEmits(['update'])
function handleCheckboxChange(id: string, value: boolean) {
  emits('update', id, value)
}
</script>

<style lang="scss">
.MyMapAtlasPicker {
  display: flex;
  align-items: center;
  width: 100%;
}
.MyMapAtlasPicker__descCtn {
  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}

.MyMapAtlasPicker__desc {
  display: flex;
  flex-direction: column;
}
</style>
