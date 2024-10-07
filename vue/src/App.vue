<template>
  <div class="App" :is-100-vh="appStore.is100vh" :is-light="appStore.isLight">
    <Header />
    <KeepAlive>
      <DialogController />
    </KeepAlive>
    <div :class="'App__content container ' + (appStore.mobile ? 'App__content--mobile' : 'App__content--desktop')">
      <v-breadcrumbs v-if="!appStore.mobile" :items="appStore.breadcrumbs"></v-breadcrumbs>
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue';
import Header from '@/components/views-components/header/Header.vue';
import DialogController from '@/components/views-components/global/DialogController.vue';
import { useApplicationStore } from '@/stores/applicationStore';
import { useActorsStore } from '@/stores/actorsStore';
import { useUserStore } from '@/stores/userStore';

const appStore = useApplicationStore();
const actorsStore = useActorsStore();
const userStore = useUserStore();
onBeforeMount(async () => {
  await actorsStore.getActors()
  userStore.checkAuthenticated()
})
</script>

<style lang="scss">
@import '@/assets/styles/global/app.scss';

.App {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;

  &[is-100-vh="true"] {
    max-height: 100vh;
    min-height: 100vh;
    .App__content {
      padding: 0;
    }
  }

  &__content {
    flex: 1 1 auto;
  }

  &[is-light="true"] {
    
    --dim-container-w: 80rem;

    .App__content--desktop {
      padding-top: 0;
      padding-bottom: 0;
    }
    .Header--desktop .Header__nav {
        height: 5rem;
        border-bottom: solid 1px #d9d9d9;
    }
    .Header--mobile {
      margin-top: 0;
    }
    .Header::after {
        content: "";
        transition: opacity 0.25s ease-in-out;
        opacity: 0;
    }
    .v-breadcrumbs {
        display: none;
    }
  }
  
}
</style>
