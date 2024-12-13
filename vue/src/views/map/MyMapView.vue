<template>
  <div class="MyMapView">
    <MyMapHeader class="MyMapView__header" />
    <div class="MyMapView__mapCtn">
      <MyMapWelcomeSideBar class="MyMapView__welcomeSideBar" />
      <MyMap class="MyMapView__myMap" />
      <MyMapLayersSideBar class="MyMapView__layersSideBar" />
    </div>
  </div>
</template>
<script setup lang="ts">
import MyMap from '@/views/map/components/MyMap.vue'
import MyMapHeader from '@/views/map/components/MyMapHeader.vue'
import MyMapWelcomeSideBar from '@/views/map/components/MyMapWelcomeSideBar.vue'
import MyMapLayersSideBar from '@/views/map/components/MyMapLayersSideBar.vue'
</script>

<style lang="scss">
.MyMapView {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow: hidden;
  .MyMapView__header {
    // height: 4rem;
  }
  .MyMapView__mapCtn {
    display: flex;
    flex-flow: row nowrap;
    flex: 1 0 auto;

    .MyMapView__welcomeSideBar,
    .MyMapView__layersSideBar {
      z-index: 1;
    }
  }
}
</style>
