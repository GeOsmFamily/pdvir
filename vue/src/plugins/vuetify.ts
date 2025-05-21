/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VDateInput } from 'vuetify/labs/VDateInput'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'

const pdvirCustomTheme: ThemeDefinition = {
  colors: {
    'dark-grey': '#999999',
    'light-grey': '#F6F7FA',
    'main-blue': '#005E84',
    'bright-blue': '#111EF7',
    'light-blue': '#A2CDDD',
    'main-yellow': '#F6CC47',
    'light-yellow': '#fdf5da',
    'main-grey': "#E0E0E0",
    'main-green': "#2D6438",
    'main-white': '#FFFFFF',
    'main-black': '#00000'
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDateInput
  },
  display: {
    mobileBreakpoint: 'lg',
    thresholds: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1100
    }
  },
  theme: {
    defaultTheme: 'pdvirCustomTheme',
    themes: {
      pdvirCustomTheme
    }
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      style: [
        {
          textTransform: 'none',
          fontWeight: 'bold',
          letterSpacing: '.045rem'
        }
      ]
    },
    VTextField: {
      hideDetails: 'auto'
    },
    VTextarea: {
      hideDetails: 'auto'
    },
    VSelect: {
      hideDetails: 'auto'
    },
    VAutocomplete: {
      hideDetails: 'auto'
    },
    VPagination: {
      rounded: 'circle',
      color: 'main-blue',
      activeColor: 'main-yellow'
    },
    VTabs: {
      height: '38px'
    },
    VBreadcrumbs: {
      style: [
        {
          padding: '.75rem 0',
          fontSize: '.875rem'
        }
      ]
    },
    VFieldLabel: {
      style: [
        {
          opacity: '1'
        }
      ]
    }
  }
})
