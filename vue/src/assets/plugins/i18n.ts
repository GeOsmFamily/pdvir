import { createI18n } from 'vue-i18n'
import commonFR from '@/assets/translations/fr/common.json'
import actorsFR from '@/assets/translations/fr/actors.json'
import adminFR from '@/assets/translations/fr/admin.json'
import authFR from '@/assets/translations/fr/auth.json'
import projectsFR from '@/assets/translations/fr/projects.json'

export const i18nInstance = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: {
    fr: {...commonFR, ...actorsFR, ...adminFR, ...authFR, ...projectsFR }
  }
})

export const i18n = i18nInstance.global //Workaround for translate text outside components