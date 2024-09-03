<template>
  <Header />
  <LoginDialog />
  <div :class="appStore.mobile ? 'App__content--mobile' : 'App__content--desktop'">
    <v-breadcrumbs v-if="!appStore.mobile" :items="appStore.breadcrumbs"></v-breadcrumbs>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/views-components/header/Header.vue';
import LoginDialog from './components/views-components/login/LoginDialog.vue';
import { useApplicationStore } from './stores/applicationStore';
import { useActorsStore } from './stores/actorsStore';
import { onBeforeMount } from 'vue';

const appStore = useApplicationStore();
const actorsStore = useActorsStore();
onBeforeMount(async () => await actorsStore.getActors())
</script>
<style lang="scss">
@import '@/assets/styles/global/app.scss';
</style>
