<template>
    <component :is="dialogComponent" v-if="dialogComponent != null" />
</template>

<script setup lang="ts">
import { DialogKey } from '@/models/enums/DialogKey';
import { useApplicationStore } from '@/stores/applicationStore';
import { computed, defineAsyncComponent } from 'vue';

const AuthSignIn = defineAsyncComponent(() => import('@/components/views-components/auth/AuthSignIn.vue'));
const AuthBecomeMember = defineAsyncComponent(() => import('@/components/views-components/auth/AuthBecomeMember.vue'));
const AuthBecomeMemberWhy = defineAsyncComponent(() => import('@/components/views-components/auth/AuthBecomeMemberWhy.vue'));
const AuthBecomeMemberThanks = defineAsyncComponent(() => import('@/components/views-components/auth/AuthBecomeMemberThanks.vue'));
const AuthForgotPassword = defineAsyncComponent(() => import('@/components/views-components/auth/AuthForgotPassword.vue'));
const AuthForgotPasswordOk = defineAsyncComponent(() => import('@/components/views-components/auth/AuthForgotPasswordOk.vue'));

const appStore = useApplicationStore();
const activeDialog = computed(() => appStore.activeDialog);

const dialogComponent = computed(() => {
  switch (activeDialog.value) {
    case DialogKey.AUTH_SIGN_IN: return AuthSignIn
    case DialogKey.AUTH_BECOME_MEMBER: return AuthBecomeMember
    case DialogKey.AUTH_BECOME_MEMBER_WHY: return AuthBecomeMemberWhy
    case DialogKey.AUTH_BECOME_MEMBER_THANKS: return AuthBecomeMemberThanks
    case DialogKey.AUTH_FORGOT_PASSWORD: return AuthForgotPassword
    case DialogKey.AUTH_FORGOT_PASSWORD_OK: return AuthForgotPasswordOk
    default: return null;
  }
})
</script>