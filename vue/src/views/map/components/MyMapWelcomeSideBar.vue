<template>
  <div class="MyMapWelcomeSideBar">
    <MyMapWelcomeBlock />
  </div>
</template>

<script setup lang="ts">
import MyMapWelcomeBlock from '@/views/map/components/MyMapWelcomeBlock.vue'
</script>

<style lang="scss">
.MyMapWelcomeSideBar {
  display: flex;
  flex-flow: column nowrap;
  width: 28rem;
  background: #fff;
  padding: 1rem;
  // box-shadow: .25rem 0 .25rem -.125rem rgba(0, 0, 0, .125);
}
</style>
