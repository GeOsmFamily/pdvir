<template>
  <AuthDialog class="AuthSignIn">
    <template #title>{{ $t('auth.signIn.title') }}</template>
    <template #content>
      <div class="AuthSignIn__error" v-if="userStore.errorInLogin">{{ $t('auth.signIn.error') }}</div>
      <Form @submit="onSubmit">
        <v-text-field v-model="form.email.value.value" :label="$t('auth.signIn.form.email')"
          :error-messages="form.email.errorMessage.value"
          @blur="form.email.handleChange"
        />
        <v-text-field v-model="form.password.value.value" type="password" :label="$t('auth.signIn.form.password')"
          :error-messages="form.password.errorMessage.value"
          @blur="form.password.handleChange"
        />
        <router-link class="AuthSignIn__forgotPassword" append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_FORGOT_PASSWORD } }">
          {{ $t('auth.signIn.form.forgotPassword') }}
        </router-link>
        <v-checkbox :label="$t('auth.signIn.form.rememberMe')"></v-checkbox>
        <v-btn color="main-red" type="submit" @click="onSubmit">{{ $t('auth.signIn.form.submit') }}</v-btn>
      </Form>
    </template>
    <template #bottom-content>
      <span>{{ $t('auth.signIn.question') }}</span>
      <router-link append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER } }">
        {{ $t('auth.becomeMember.title') }}
      </router-link>
    </template>
  </AuthDialog>
</template>

<script setup lang="ts">
import AuthDialog from '@/components/views-components/auth/AuthDialog.vue';
import { DialogKey } from '@/models/enums/DialogKey';
import Form from '@/components/generic-components/Form.vue';
import { AuthenticationService } from '@/services/auth/AuthenticationService';
import { useUserStore } from '@/stores/userStore';
import { SignInForm } from '@/services/auth/forms/SignInForm';

const userStore = useUserStore();
const {form, errors, handleSubmit, isSubmitting} = SignInForm.getSignInForm();
const onSubmit = handleSubmit(async (values) => {
  AuthenticationService.signIn(values);
});
</script>

<style lang="scss">
.AuthSignIn {
  &__forgotPassword {
    font-size: $font-size-sm;
    margin-bottom: 1rem;
  }
  &__error {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 100%;
    color: rgb(var(--v-theme-main-red));
    font-weight: 700;
    background-color: rgb(var(--v-theme-light-yellow));
    margin-bottom: 1rem;
  }
}
</style>