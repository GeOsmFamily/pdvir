<template>
    <header>
      <div v-if="appStore.mobile">
        WIP
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
              <RouterLink :to="tab.route">
                <span class="Header__Desktop__TabsText">{{tab.name}}</span>
              </RouterLink>
            </v-tab>
          </v-tabs>
        </div>
      </div>
    </header>
    <RouterView />
  </template>
  
  <script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useApplicationStore } from '@/stores/applicationStore';
import { NavigationTabsContent } from '@/models/static-classes/NavigationTabsContent';
  const appStore = useApplicationStore();
  </script>
  <style lang="scss">
  </style>
  