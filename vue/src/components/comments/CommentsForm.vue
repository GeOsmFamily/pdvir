<template>
  <Modal :title="$t('comments.title')" :show="isShown" @close="$emit('close')">
    <template #content>
      {{ mapComment }}
      {{ lngLat }}
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { LngLat } from 'maplibre-gl'
import Modal from '../global/Modal.vue'
import { onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    isShown: boolean
    mapComment?: boolean
    lngLat?: LngLat
  }>(),
  {
    mapComment: false
  }
)

onMounted(() => {
  console.log(props.lngLat)
})
</script>
