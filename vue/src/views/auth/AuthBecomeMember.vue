<template>
  <AuthDialog>
    <template #title>{{ $t('auth.becomeMember.title') }}</template>
    <template #subtitle>
      <i18n-t keypath="auth.becomeMember.subtitle.label">
        <template v-slot:url>
          <router-link
            append
            :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER_WHY } }"
          >
            {{ $t('auth.becomeMember.subtitle.link') }}
          </router-link>
        </template>
      </i18n-t>
    </template>
    <template #content>
      <Form @submit.prevent="onSubmit">
        <div class="form-field">
          <label class="form-label">{{ $t('auth.becomeMember.form.firstName') }}</label>
          <input
            v-model="form.firstName.value.value"
            type="text"
            class="form-input"
            :class="{ 'form-input--error': form.firstName.errorMessage.value }"
            :placeholder="$t('auth.becomeMember.form.firstName')"
            @blur="form.firstName.handleChange"
          />
          <div 
            v-if="form.firstName.errorMessage.value" 
            class="form-error"
          >
            {{ form.firstName.errorMessage.value }}
          </div>
        </div>

        <div class="form-field">
          <label class="form-label">{{ $t('auth.becomeMember.form.lastName') }}</label>
          <input
            v-model="form.lastName.value.value"
            type="text"
            class="form-input"
            :class="{ 'form-input--error': form.lastName.errorMessage.value }"
            :placeholder="$t('auth.becomeMember.form.lastName')"
            @blur="form.lastName.handleChange"
          />
          <div 
            v-if="form.lastName.errorMessage.value" 
            class="form-error"
          >
            {{ form.lastName.errorMessage.value }}
          </div>
        </div>

        <div class="form-field">
          <label class="form-label">{{ $t('auth.becomeMember.form.email') }}</label>
          <input
            v-model="form.email.value.value"
            type="email"
            class="form-input"
            :class="{ 'form-input--error': form.email.errorMessage.value }"
            :placeholder="$t('auth.becomeMember.form.email')"
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
          <label class="form-label">{{ $t('auth.becomeMember.form.password') }}</label>
          <input
            v-model="form.plainPassword.value.value"
            type="password"
            class="form-input"
            :class="{ 'form-input--error': form.plainPassword.errorMessage.value }"
            :placeholder="$t('auth.becomeMember.form.password')"
            @blur="form.plainPassword.handleChange"
          />
          <div 
            v-if="form.plainPassword.errorMessage.value" 
            class="form-error"
          >
            {{ form.plainPassword.errorMessage.value }}
          </div>
        </div>

        <div class="form-field">
          <label class="form-label">{{ $t('auth.becomeMember.form.confirmPassword') }}</label>
          <input
            v-model="form.confirmPassword.value.value"
            type="password"
            class="form-input"
            :class="{ 'form-input--error': form.confirmPassword.errorMessage.value }"
            :placeholder="$t('auth.becomeMember.form.confirmPassword')"
            @blur="form.confirmPassword.handleChange"
          />
          <div 
            v-if="form.confirmPassword.errorMessage.value" 
            class="form-error"
          >
            {{ form.confirmPassword.errorMessage.value }}
          </div>
        </div>

        <div class="form-field">
          <label class="form-checkbox form-checkbox--complex">
            <input
              v-model="form.acceptTerms.value.value"
              type="checkbox"
              class="form-checkbox-input"
            />
            <span class="form-checkbox-label">
              <i18n-t keypath="auth.becomeMember.form.privacyPolicy.label" tag="span">
                <template v-slot:url1>
                  <router-link
                    append
                    :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER } }"
                  >
                    {{ $t('auth.becomeMember.form.privacyPolicy.confidentialPolicy') }}
                  </router-link>
                </template>
                <template v-slot:url2>
                  <router-link
                    append
                    :to="{ query: { ...$route.query, dialog: DialogKey.AUTH_BECOME_MEMBER } }"
                  >
                    {{ $t('auth.becomeMember.form.privacyPolicy.usePolicy') }}
                  </router-link>
                </template>
              </i18n-t>
            </span>
          </label>
          <div 
            v-if="form.acceptTerms.errorMessage.value" 
            class="form-error"
          >
            {{ form.acceptTerms.errorMessage.value }}
          </div>
        </div>

        <div class="AuthDialog__error" v-if="userStore.errorWhileSignInOrSignUp">
          {{ $t('auth.becomeMember.error') }}
        </div>

        <v-btn color="main-blue" type="submit" block>{{
          $t('auth.becomeMember.form.submit')
        }}</v-btn>
      </Form>
    </template>
  </AuthDialog>
</template>

<script setup lang="ts">
import AuthDialog from '@/views/auth/AuthDialog.vue'
import Form from '@/components/forms/Form.vue'
import { DialogKey } from '@/models/enums/app/DialogKey'
import { I18nT } from 'vue-i18n'
import { UserProfileForm } from '@/services/userAndAuth/forms/UserProfileForm'
import { useUserStore } from '@/stores/userStore'

const { form, handleSubmit } = UserProfileForm.getSignUpForm()
const userStore = useUserStore()

const onSubmit = handleSubmit(
  (values) => {
    userStore.signUp(values)
  },
  (errors) => {
    console.error('Form validation failed:', errors)
  }
)
</script>

<style lang="scss">
.AuthDialog {
  &__error {
    flex-direction: column;
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
  align-items: flex-start;
  cursor: pointer;
  user-select: none;
  
  &--complex {
    align-items: flex-start;
    
    .form-checkbox-input {
      margin-top: 0.125rem;
      flex-shrink: 0;
    }
  }
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
  line-height: 1.4;
  
  a {
    color: #1976d2;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.form-submit-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: #1565c0;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  }
  
  &:active {
    background-color: #0d47a1;
  }
}
</style>