<template>
  <Header />
  <KeepAlive>
    <DialogController />
  </KeepAlive>
  <div :class="appStore.mobile ? 'App__content--mobile' : 'App__content--desktop'">
    <v-breadcrumbs v-if="!appStore.mobile" :items="appStore.breadcrumbs"></v-breadcrumbs>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onBeforeMount, KeepAlive } from 'vue';
import Header from '@/components/views-components/header/Header.vue';
import DialogController from '@/components/views-components/global/DialogController.vue';
import { useApplicationStore } from '@/stores/applicationStore';
import { useActorsStore } from '@/stores/actorsStore';

const appStore = useApplicationStore();
const actorsStore = useActorsStore();
onBeforeMount(async () => await actorsStore.getActors())
</script>

<style lang="scss">
@import '@/assets/styles/global/app.scss';
</style>
