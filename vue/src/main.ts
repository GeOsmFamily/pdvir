import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vuetify } from './assets/plugins/vuetify'
import { createI18n } from 'vue-i18n'
import commonFR from './assets/translations/fr/common.json'
import mainPagesFR from './assets/translations/fr/main_pages.json'
import adminFR from './assets/translations/fr/admin.json'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
const i18nInstance = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: {
      fr: {...commonFR, ...mainPagesFR, ...adminFR}
    }
  })
export const i18n = i18nInstance.global//Workaround for translate text outside components
app.use(i18nInstance)

app.mount('#app')
