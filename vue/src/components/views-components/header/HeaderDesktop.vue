<template>
    <div>
        <div class="Header__Desktop__Banner">
            <img src="@/assets/images/logo_puc_temp.png" alt="Accueil" class="AppLogo__Desktop">
            <div>
                <v-icon icon="mdi-help-circle-outline" class="mr-2" />
                <span class="mr-6">{{ $t('header.help') }}</span>
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
            <LoginButton />
        </div>
  </div>
</template>
<script setup lang="ts">
import { NavigationTabsContent } from '@/models/static-classes/NavigationTabsContent';
import { useApplicationStore } from '@/stores/applicationStore';
import LoginButton from './LoginButton.vue';

const appStore = useApplicationStore();
</script>