<template lang="">
  <div class="ServiceTitle">
    <p class="mr-5">{{ title }}</p>
    <v-btn color="main-blue" class="px-2" append-icon="mdi-arrow-right" @click="openService()">{{
      $t('services.discover')
    }}</v-btn>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  link: string
}>()

function openService() {
  window.open(props.link, '_blank')
}
</script>

<style lang="scss">
.ServiceTitle {
  display: flex;
  align-items: center;
  font-weight: 500;
}
</style>
