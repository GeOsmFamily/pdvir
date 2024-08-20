<template>
  <Header />
  <LoginDialog />
  <div :class="appStore.mobile ? 'App__Mobile__Content' : 'App__Desktop__Content'">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/views-components/header/Header.vue';
import LoginDialog from './components/views-components/login/LoginDialog.vue';
import { useApplicationStore } from './stores/applicationStore';
const appStore = useApplicationStore();
</script>
<style lang="scss">
@import './assets/styles/app.scss';
</style>
