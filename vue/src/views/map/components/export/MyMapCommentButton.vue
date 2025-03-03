<template>
  <div class="maplibregl-ctrl maplibregl-ctrl-group MapExport">
    <v-btn
      icon="mdi-comment-text"
      @click.stop="activeMapComment"
      :class="{
        'text-white': myMapStore.isMapCommentActive,
        'text-main-red': !myMapStore.isMapCommentActive
      }"
      :color="myMapStore.isMapCommentActive ? 'main-red' : 'white'"
    ></v-btn>
    <CommentsForm
      :map-comment="true"
      v-if="isFormCommentVisible"
      :is-shown="isFormCommentVisible"
      :lng-lat="lngLat as LngLat"
      @close="desactiveMapComment"
    />
  </div>
</template>
<script setup lang="ts">
import CommentsForm from '@/components/comments/CommentsForm.vue'
import { NotificationType } from '@/models/enums/app/NotificationType'
import { i18n } from '@/plugins/i18n'
import { addNotification } from '@/services/notifications/NotificationService'
import { useMyMapStore } from '@/stores/myMapStore'
import { useUserStore } from '@/stores/userStore'
import type { LngLat } from 'maplibre-gl'
import { computed, ref, watch, type Ref } from 'vue'
const myMapStore = useMyMapStore()
const userStore = useUserStore()
const map = computed(() => myMapStore.myMap?.map)
const isFormCommentVisible = ref(false)
const lngLat: Ref<LngLat | null> = ref(null)

function activeMapComment() {
  if (userStore.userIsLogged) {
    myMapStore.isMapCommentActive = !myMapStore.isMapCommentActive
  } else {
    addNotification(i18n.t('myMap.comment.login'), NotificationType.ERROR)
  }
}

watch(
  () => myMapStore.isMapCommentActive,
  (value: boolean) => {
    if (map.value) {
      if (value) {
        map.value.getCanvas().style.cursor = 'crosshair'
        map.value.on('click', handleMapComment)
      } else {
        map.value.getCanvas().style.cursor = ''
      }
    }
  }
)

function desactiveMapComment() {
  myMapStore.isMapCommentActive = false
  isFormCommentVisible.value = false
  map.value?.off('click', handleMapComment)
}

function handleMapComment(e: any) {
  lngLat.value = e.lngLat
  console.log(lngLat.value)
  if (myMapStore.isMapCommentActive) {
    isFormCommentVisible.value = true
  }
}
</script>

<style>
.MapExport {
  flex-flow: row nowrap !important;
  margin-right: 0.3rem !important;
}
</style>
