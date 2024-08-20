<template>
    <v-btn
        v-if="!userStore.userIsLogged"
        color="main-red"
        prepend-icon="mdi-account-circle"
        @click="userStore.showLogingDialog = true"
    >
        {{ $t('header.login') }}
    </v-btn>
    <v-btn 
        v-else
        base-color="white"
        class="text-main-blue"
        prepend-icon="mdi-account-circle"
    >
        {{ $t('header.account') }}
    </v-btn>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()
</script>