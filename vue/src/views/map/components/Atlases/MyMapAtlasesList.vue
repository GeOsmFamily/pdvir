<template>
  <div class="MyMapAtlases">
    <div class="MyMapAtlases__title">{{ title }}</div>
    <MyMapAtlas v-for="atlas in atlases" :key="atlas.id" :atlas="atlas" :type="type" />
  </div>
</template>

<script setup lang="ts">
import type { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import type { Atlas } from '@/models/interfaces/Atlas'
import MyMapAtlas from '@/views/map/components/Atlases/MyMapAtlas.vue'

defineProps<{
  title: string
  atlases: Atlas[]
  type: AtlasGroup
}>()
</script>

<style lang="scss">
.MyMapAtlases {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
}

.MyMapAtlases__title {
  color: rgb(var(--v-theme-main-blue));
  font-weight: 600;
}
</style>
