<template>
  <HeaderMobile v-if="appStore.mobile" />
  <HeaderDesktop v-else />
</template>

<script setup lang="ts">
import HeaderMobile from './HeaderMobile.vue';
import HeaderDesktop from './HeaderDesktop.vue';
import { useApplicationStore } from '@/stores/applicationStore';
const appStore = useApplicationStore();
</script>
<style lang="scss">
</style>
