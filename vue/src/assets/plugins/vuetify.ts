
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition }  from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const pucCustomTheme: ThemeDefinition = {
    colors: {
      'main-blue': '#1c3b87',
      'bright-blue': '#111EF7',
      'main-red': '#E83323',
      'main-yellow': '#F6CC47',
      'light-yellow': '#fdf5da',
      'main-grey': "#E0E0E0",
      'main-green': "#2D6438"
    },
  }

export const vuetify = createVuetify({
    theme: {
        defaultTheme: 'pucCustomTheme',
        themes: {
            pucCustomTheme,
        },
      },
    defaults: {
      VBtn: {
        elevation: 0,
        style: [{ 
          textTransform: 'none',
          fontWeight: 'bold'
        }],
      },
    },
    components,
    directives,
  })