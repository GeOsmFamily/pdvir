<template>
  <Header />
  <KeepAlive>
    <DialogController />
  </KeepAlive>
  <EditContentDialog />
  <div :class="'App__content container ' + (appStore.mobile ? 'App__content--mobile' : 'App__content--desktop')">
    <v-breadcrumbs v-if="!appStore.mobile" :items="appStore.breadcrumbs"></v-breadcrumbs>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onBeforeMount, KeepAlive } from 'vue';
import Header from '@/components/views-components/header/Header.vue';
import DialogController from '@/components/generic-components/global/DialogController.vue';
import { useApplicationStore } from '@/stores/applicationStore';
import { useActorsStore } from '@/stores/actorsStore';
import { useUserStore } from './stores/userStore';
import EditContentDialog from './components/views-components/dialog/EditContentDialog.vue';

const appStore = useApplicationStore();
const actorsStore = useActorsStore();
const userStore = useUserStore();
onBeforeMount(async () => {
  await actorsStore.getActors()
  await actorsStore.getActorsSelectListContent()
  userStore.checkAuthenticated()
})
</script>

<style lang="scss">
@import '@/assets/styles/global/app.scss';
</style>
