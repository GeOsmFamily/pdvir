<template>
  <AtlasesList :atlasesPanel="AtlasGroup.PREDEFINED_MAP" />
</template>
<script setup lang="ts">
import { AtlasGroup } from '@/models/enums/geo/AtlasGroup'
import AtlasesList from '@/views/admin/components/admin-maps/AtlasesList.vue'
</script>

<style lang="scss">
.AdminAtlas__ctn {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
}
.AdminAtlas__header {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
