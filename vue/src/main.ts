import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vuetify } from './assets/plugins/vuetify'
import { i18nInstance } from './assets/plugins/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18nInstance)

app.mount('#app')
