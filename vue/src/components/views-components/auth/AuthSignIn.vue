<template>
  <AuthDialog class="AuthSignIn">
    <template #title>{{ $t('auth.signIn.title') }}</template>
    <template #content>
      <Form @submit="onSubmit">
        <v-text-field v-model="email" :label="$t('auth.signIn.form.email')" />
        <v-text-field v-model="password" type="password" :label="$t('auth.signIn.form.password')" />
        <router-link class="AuthSignIn__forgotPassword" append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_FORGOT_PASSWORD } }">
          {{ $t('auth.signIn.form.forgotPassword') }}
        </router-link>
        <v-checkbox :label="$t('auth.signIn.form.rememberMe')"></v-checkbox>
        <v-btn color="main-red" type="submit" block>{{ $t('auth.signIn.form.submit') }}</v-btn>
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
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import Form from '@/components/generic-components/Form.vue';

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    password: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<style lang="scss">
.AuthSignIn {
  &__forgotPassword {
    font-size: $font-size-sm;
    margin-bottom: 1rem;
  }
}
</style>