<template>
  <div class="MyMapAtlasPicker">
    <v-checkbox v-model="checked" />
    <div class="MyMapAtlasPicker__descCtn">
      <img :src="atlas.logo.contentUrl" :alt="atlas.name" />
      <div class="MyMapAtlasPicker__desc">
        <span>{{ atlas.name }}</span>
        <span>{{ atlas.maps.length }} cartes</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Atlas } from '@/models/interfaces/Atlas'
import { ref, watch } from 'vue'
defineProps<{
  atlas: Atlas
}>()

const checked = ref(false)
const emits = defineEmits(['update'])
watch(checked, (value) => {
  emits('update', value)
})
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
