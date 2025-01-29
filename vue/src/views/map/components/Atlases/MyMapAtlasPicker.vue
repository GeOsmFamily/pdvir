<template>
  <div class="MyMapAtlasPicker ml-3" v-for="atlasMap in atlasMaps" :key="atlasMap.id">
    <v-checkbox
      hide-details
      v-model="atlasMap.mainLayer.isShown"
      @update:modelValue="(newValue) => handleCheckboxChange(atlasMap.id, newValue as boolean)"
    />
    <div class="MyMapAtlasPicker__descCtn">
      <img :src="atlasMap.mainLayer.icon" :alt="atlas.name" />
      <div class="MyMapAtlasPicker__desc ml-2">
        <span>{{ atlasMap.mainLayer.name }}</span>
        <span>
          {{ atlasMap.subLayers.length }}
          {{ $t('myMap.atlases.data', { count: atlasMap.subLayers.length }) }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Atlas } from '@/models/interfaces/Atlas'
import type { AtlasMap } from '@/models/interfaces/map/AtlasMap'
import { useMyMapStore } from '@/stores/myMapStore'
import { computed, type Ref } from 'vue'
const props = defineProps<{
  atlas: Atlas
}>()

const myMapStore = useMyMapStore()
const atlasMaps: Ref<AtlasMap[]> = computed(() =>
  myMapStore.atlasThematicMaps.filter((x) => x.atlasId === props.atlas['@id'])
)
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
