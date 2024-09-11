<template>
  <AuthDialog class="AuthBecomeMemberThanks">
    <template #title>{{ $t('auth.becomeMemberThanks.title') }}</template>
    <template #content>
      <CheckPoint class="mb-4" :label="$t('auth.becomeMemberThanks.subtitle')" :highlighted="true" />
      <span class="mb-4 text-center">{{ $t('auth.becomeMemberThanks.form.info') }}</span>
      <Form @submit="null">
        <v-text-field v-model="organization" :label="$t('auth.becomeMemberThanks.form.organization')" />
        <v-text-field v-model="functions" :label="$t('auth.becomeMemberThanks.form.functions')" />
        <v-text-field v-model="telephone" :label="$t('auth.becomeMemberThanks.form.telephone')" />
        <v-text-field v-model="message" :label="$t('auth.becomeMemberThanks.form.message')" />
        <span>{{ $t('auth.becomeMemberThanks.form.actionsRequest.label') }}</span>
        <v-list>
          <v-list-item v-for="(action, index) in actionList" :key="index">
            <v-checkbox v-model="action.selected" :label="action.value" hide-details="auto" />
          </v-list-item>
        </v-list>
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
import { i18n } from '@/assets/plugins/i18n';
import CheckPoint from '@/components/generic-components/CheckPoint.vue';

const actionList = [
  { value: i18n.t('auth.becomeMemberThanks.form.actionsRequest.addActors'), selected: false},
  { value: i18n.t('auth.becomeMemberThanks.form.actionsRequest.addProjects'), selected: false},
  { value: i18n.t('auth.becomeMemberThanks.form.actionsRequest.addData'), selected: false},
  { value: i18n.t('auth.becomeMemberThanks.form.actionsRequest.addResources'), selected: false}
]

const validationSchema = toTypedSchema(
  zod.object({
    organization: zod.string().min(1, { message: 'This is required' }),
    functions: zod.string().min(1, { message: 'This is required' }).min(1, { message: 'Too short' }).max(70, { message: 'Too loog' }),
    telephone: zod.string().max(50, { message: 'Too loog' }),
    message: zod.string().max(300, { message: 'Too loog' }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: organization } = useField('organization');
const { value: functions } = useField('function');
const { value: telephone } = useField('telephone');
const { value: message } = useField('message');

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<style lang="scss">
.AuthBecomeMemberThanks {
  .v-checkbox .v-selection-control {
    min-height: 0 !important;
  }
}
</style>