<template>
  <Header />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/views-components/header/Header.vue';
</script>
<style lang="scss">
@import './assets/styles/app.scss';
</style>
