<template>
  <AuthDialog class="AuthSignIn">
    <template #title>{{ $t('auth.signIn.title') }}</template>
    <template #content>
      <Form @submit="onSubmit">
        <div class="form-field">
          <label class="form-label">{{ $t('auth.signIn.form.email') }}</label>
          <input
            v-model="form.email.value.value"
            type="email"
            class="form-input"
            :class="{ 'form-input--error': form.email.errorMessage.value }"
            :placeholder="$t('auth.signIn.form.email')"
            @blur="form.email.handleChange"
          />
          <div 
            v-if="form.email.errorMessage.value" 
            class="form-error"
          >
            {{ form.email.errorMessage.value }}
          </div>
        </div>

        <div class="form-field">
          <label class="form-label">{{ $t('auth.signIn.form.password') }}</label>
          <input
            v-model="form.password.value.value"
            type="password"
            class="form-input"
            :class="{ 'form-input--error': form.password.errorMessage.value }"
            :placeholder="$t('auth.signIn.form.password')"
            @blur="form.password.handleChange"
          />
          <div 
            v-if="form.password.errorMessage.value" 
            class="form-error"
          >
            {{ form.password.errorMessage.value }}
          </div>
        </div>

        <router-link
          class="AuthDialog__forgotPassword"
          append
          :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_FORGOT_PASSWORD } }"
        >
          {{ $t('auth.signIn.form.forgotPassword') }}
        </router-link>

        <div class="form-field">
          <label class="form-checkbox">
            <input
              v-model="form.stayLoggedIn.value.value"
              type="checkbox"
              class="form-checkbox-input"
            />
            <span class="form-checkbox-label">{{ $t('auth.signIn.form.rememberMe') }}</span>
          </label>
        </div>

        <div class="AuthDialog__error" v-if="userStore.errorWhileSignInOrSignUp">
          {{ $t('auth.signIn.error') }}
        </div>
        <div class="AuthDialog__error text-center" v-if="userStore.invalidAccount">
          {{ $t('auth.signIn.invalidAccount.message') }}
          <v-btn class="mt-4" color="main-green" @click="goToResendActivationEmail()">
            {{ $t('auth.signIn.invalidAccount.resendActivationEmail') }}
          </v-btn>
        </div>
        <v-btn color="main-blue" type="submit">{{ $t('auth.signIn.form.submit') }}</v-btn>
      </Form>
    </template>
    <template #bottom-content>
      <span>{{ $t('auth.signIn.question') }}</span>
      <router-link
        append
        class="Dialog__clickableText"
        :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER } }"
      >
        {{ $t('auth.becomeMember.title') }}
      </router-link>
    </template>
  </AuthDialog>
</template>

<script setup lang="ts">
import AuthDialog from '@/views/auth/AuthDialog.vue'
import { DialogKey } from '@/models/enums/app/DialogKey'
import Form from '@/components/forms/Form.vue'
import { useUserStore } from '@/stores/userStore'
import { SignInForm } from '@/services/userAndAuth/forms/SignInForm'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const { form, handleSubmit } = SignInForm.getSignInForm()
const onSubmit = handleSubmit(async (values) => {
  await userStore.signIn(values)
})

const goToResendActivationEmail = () => {
  router.replace({ query: { ...route.query, dialog: DialogKey.AUTH_EMAIL_VERIFIER_ASK } })
}
</script>

<style lang="scss">
.AuthDialog {
  &__error {
    flex-direction: column;
  }

  &__forgotPassword {
    color: #1976d2;
    text-decoration: none;
    font-size: 0.875rem;
    margin: 0.5rem 0 1rem 0;
    display: inline-block;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

// Styles pour les champs de formulaire
.form-field {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #fff;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &--error {
    border-color: #ef4444;
    
    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }
}

.form-error {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ef4444;
}

.form-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.form-checkbox-input {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  accent-color: #3b82f6;
}

.form-checkbox-label {
  font-size: 0.875rem;
  color: #333;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}
</style>