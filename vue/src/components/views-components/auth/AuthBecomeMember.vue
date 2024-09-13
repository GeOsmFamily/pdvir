<template>
  <AuthDialog>
    <template #title>{{ $t('auth.becomeMember.title') }}</template>
    <template #subtitle>
      <i18n-t keypath="auth.becomeMember.subtitle.label" >
        <template v-slot:url>
          <router-link
            append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER_WHY } }">
            {{ $t('auth.becomeMember.subtitle.link') }}
          </router-link>
        </template>
      </i18n-t>
    </template>
    <template #content>
      <Form @submit="null">
        <v-text-field v-model="firstName" :label="$t('auth.becomeMember.form.firstName')" />
        <v-text-field v-model="lastName" :label="$t('auth.becomeMember.form.lastName')" />
        <v-text-field v-model="email" :label="$t('auth.becomeMember.form.email')" />
        <v-checkbox class="align-baseline">
          <template v-slot:label>
            <i18n-t keypath="auth.becomeMember.form.privacyPolicy.label" tag="span" >
              <template v-slot:url1>
                <router-link
                  append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER } }">
                  {{ $t('auth.becomeMember.form.privacyPolicy.confidentialPolicy') }}
                </router-link>
              </template>
              <template v-slot:url2>
                <router-link
                  append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER } }">
                  {{ $t('auth.becomeMember.form.privacyPolicy.usePolicy') }}
                </router-link>
              </template>
            </i18n-t>
          </template>
        </v-checkbox>
        <router-link append :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER_THANKS } }" class="Link--withoutUnderline">
          <v-btn color="main-red" type="submit" block>{{ $t('auth.becomeMember.form.submit') }}</v-btn>
        </router-link>
      </Form>
    </template>
  </AuthDialog>
</template>

<script setup lang="ts">
import AuthDialog from '@/components/views-components/auth/AuthDialog.vue';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import Form from '@/components/generic-components/Form.vue';
import { DialogKey } from '@/models/enums/DialogKey';
import { I18nT } from 'vue-i18n';

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, { message: 'This is required' }).email({ message: 'Must be a valid email' }),
    firstName: zod.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(50, { message: 'Too loog' }),
    lastName: zod.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(50, { message: 'Too loog' }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField('email');
const { value: firstName } = useField('firstName');
const { value: lastName } = useField('lastName');

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>