<template>
  <div class="homeTemp">
    <Wip :height="350"/>
  </div>
</template>
<script setup lang="ts">
import Wip from '@/components/generic-components/global/Wip.vue';
</script>
<style lang="scss">
.homeTemp{
  height: 100%;
  width: 100%;
}
</style>
