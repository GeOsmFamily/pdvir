<template>
    <router-link
        v-if="!userStore.userIsLogged"
        append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_SIGN_IN } }">
        <v-btn
            color="main-red"
            prepend-icon="mdi-account-circle"
        >
            {{ $t('header.login') }}
        </v-btn>
    </router-link>
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
import { DialogKey } from '@/models/enums/DialogKey';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()
</script>