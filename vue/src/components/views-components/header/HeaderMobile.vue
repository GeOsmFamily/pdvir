<template>
    <div class="Header__Mobile__Container">
        <v-layout>
            <v-app-bar :elevation="2">
                <template v-slot:prepend>
                <v-app-bar-nav-icon color="main-blue" @click.stop="showMobileMenu = !showMobileMenu"></v-app-bar-nav-icon>
                </template>
                <v-app-bar-title>
                <div class="d-flex align-center">
                    <img src="@/assets/images/Logo.svg" class="AppLogo__Mobile">
                    <span class="ml-4 text-main-blue">{{ $t('header.title') }}</span>
                    <span class="ml-2 text-main-blue font-weight-bold">{{ $t('header.title2') }}</span>
                </div>
                </v-app-bar-title>
            </v-app-bar>
        </v-layout>
        <div v-if="showMobileMenu" class="Header__Mobile__Menu">
            <div class="Header__Mobile__Menu__Top">
                <img src="@/assets/images/Logo.svg">
                <div class="Header__Mobile__Menu__Closer" @click="showMobileMenu = !showMobileMenu">
                    <v-icon icon="mdi mdi-close" />
                </div>
            </div>
            <img src="@/assets/images/Frise.svg" alt="">
            <div class="Header__Mobile__Menu__Content">
                <v-list lines="one" bg-color="light-yellow">
                    <v-list-item
                        v-for="tab in NavigationTabsContent.getContent()"
                        @click="showMobileMenu = !showMobileMenu"
                    >
                        <RouterLink :to="tab.route" class="Header__TabsText">
                            <span :class="{'Header__TabsText__Active': appStore.activeTab === tab.value}" @click="appStore.activeTab = tab.value">{{ tab.name }}</span>
                        </RouterLink>
                    </v-list-item>
                    <v-list-item>
                        <span class="Header__TabsText">{{ $t('header.help') }}</span>
                    </v-list-item>
                    <v-list-item>
                        <span class="Header__TabsText">{{ $t('header.contact') }}</span>
                    </v-list-item>
                    <v-list-item>
                        <LoginButton />
                    </v-list-item>
                </v-list>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { NavigationTabsContent } from '@/models/static-classes/NavigationTabsContent';
import LoginButton from './LoginButton.vue';
import { useApplicationStore } from '@/stores/applicationStore';
import { ref } from 'vue';

const appStore = useApplicationStore();
const showMobileMenu = ref(false);
</script>