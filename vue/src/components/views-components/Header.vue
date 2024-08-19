<template>
    <div v-if="appStore.mobile">  
    <v-layout>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon color="main-blue" @click.stop="showMobileMenu = !showMobileMenu"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
          <div class="d-flex align-center">
            <img src="@/assets/images/logo_puc_temp.png" class="AppLogo__Mobile">
            <span class="ml-4 text-main-blue">{{ $t('header.title') }}</span>
            <span class="ml-2 text-main-blue font-weight-bold">{{ $t('header.title2') }}</span>
          </div>
        </v-app-bar-title>
      </v-app-bar>
      <v-navigation-drawer
        v-model="showMobileMenu"
        temporary
      >
        <v-list lines="one">
          <v-list-item
            v-for="tab in NavigationTabsContent.getContent()"
            :key="tab.name"
          >
            <RouterLink :to="tab.route" class="Header__TabsText">
              <span :class="{'Header__TabsText__Active': appStore.activeTab === tab.value}" @click="appStore.activeTab = tab.value">{{ tab.name }}</span>
            </RouterLink>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>  
    </div>
    <div v-else>
      <div class="Header__Desktop__Banner">
        <img src="@/assets/images/logo_puc_temp.png" alt="Accueil" class="AppLogo__Desktop">
        <div>
          <v-icon icon="mdi-help-circle-outline" class="mr-2" />
          <span class="mr-6">Aide</span>
          <v-icon icon="mdi-email-outline" class="mr-2"/>
          <span>{{ $t('header.contact') }}</span>
        </div>
      </div>
      <div class="Header__Desktop__Tabs">
        <v-tabs
          v-model="appStore.activeTab"
          align-tabs="end"
          color="main-red"
        >
          <v-tab 
            v-for="tab in NavigationTabsContent.getContent()"
            :value="tab.value"
            >
            <RouterLink :to="tab.route" class="Header__TabsText">
              {{tab.name}}
            </RouterLink>
          </v-tab>
        </v-tabs>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useApplicationStore } from '@/stores/applicationStore';
  import { NavigationTabsContent } from '@/models/static-classes/NavigationTabsContent';
  import { ref, watch } from 'vue';
  const appStore = useApplicationStore();
  const showMobileMenu = ref(false);
  </script>
  <style lang="scss">
  </style>
  