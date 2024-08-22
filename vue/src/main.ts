import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vuetify } from './assets/plugins/vuetify'
import { createI18n } from 'vue-i18n'
import fr from './assets/translations/fr.json'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
const i18nInstance = createI18n({
    legacy: false,
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: {
      fr: fr
    }
  })
export const i18n = i18nInstance.global//Workaround for translate text outside components
app.use(i18nInstance)

app.mount('#app')
