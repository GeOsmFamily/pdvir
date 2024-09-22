<template>
  <AuthDialog class="AuthBecomeMemberThanks">
    <template #title>{{ $t('auth.becomeMemberThanks.title') }}</template>
    <template #content>
      <CheckPoint class="mb-4" :label="$t('auth.becomeMemberThanks.subtitle')" :highlighted="true" />
      <span class="mb-4 text-center">{{ $t('auth.becomeMemberThanks.form.info') }}</span>
      <Form @submit="null">
        <v-text-field 
          v-model="form.organisation.value.value" 
          :label="$t('auth.becomeMemberThanks.form.organization')"
          :error-messages="form.organisation.errorMessage.value"
          @blur="form.organisation.handleChange"
        />
        <v-text-field 
          v-model="form.position.value.value" 
          :label="$t('auth.becomeMemberThanks.form.functions')"
          :error-messages="form.position.errorMessage.value"
          @blur="form.position.handleChange"
        />
        <v-text-field 
          v-model="form.phoneNumber.value.value" 
          :label="$t('auth.becomeMemberThanks.form.telephone')"
          :error-messages="form.phoneNumber.errorMessage.value"
          @blur="form.phoneNumber.handleChange"
        />
        <v-text-field 
          v-model="form.signUpMessage.value.value" 
          :label="$t('auth.becomeMemberThanks.form.message')"
          :error-messages="form.signUpMessage.errorMessage.value"
          @blur="form.signUpMessage.handleChange"
        />
        <span>{{ $t('auth.becomeMemberThanks.form.actionsRequest.label') }}</span>
        <v-list>
          <v-list-item v-for="(action, index) in actionList" :key="index">
            <v-checkbox v-model="action.selected" :label="action.label" hide-details="auto" />
          </v-list-item>
        </v-list>
        <v-btn color="main-red" type="submit">{{ $t('auth.becomeMemberThanks.form.submit') }}</v-btn>
      </Form>
    </template>
  </AuthDialog>
</template>

<script setup lang="ts">
import AuthDialog from '@/components/views-components/auth/AuthDialog.vue';
import Form from '@/components/generic-components/Form.vue';
import { i18n } from '@/assets/plugins/i18n';
import CheckPoint from '@/components/generic-components/CheckPoint.vue';
import { UserProfileForm } from '@/services/auth/forms/UserProfileForm';
import { UserRoles } from '@/models/enums/auth/UserRoles';

const actionList = [
  { label: i18n.t('auth.becomeMemberThanks.form.actionsRequest.addActors'), value: UserRoles.EDITOR_ACTORS, selected: false},
  { label: i18n.t('auth.becomeMemberThanks.form.actionsRequest.addProjects'), value: UserRoles.EDITOR_PROJECTS, selected: false},
  { label: i18n.t('auth.becomeMemberThanks.form.actionsRequest.addResources'), value: UserRoles.EDITOR_RESOURCES, selected: false}
]

const {form, errors, handleSubmit, isSubmitting} = UserProfileForm.getUserForm();

const onSubmit = handleSubmit(values => {
  console.log(values)
  console.log(actionList)
});
</script>

<style lang="scss">
.AuthBecomeMemberThanks {
  .v-checkbox .v-selection-control {
    min-height: 0 !important;
  }
}
</style>