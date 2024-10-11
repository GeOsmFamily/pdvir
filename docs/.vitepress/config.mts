import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Urban Platform Cameroun",
  description: "Technical documentation",
  vite: {
    server: {
      host: "0.0.0.0",
      port: 5000, 
      watch: {
        usePolling: true
      }
    }
  },
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/home' }
    ],
    
    search: {
      provider: 'local'
    },

    sidebar: [
      {
        collapsed: false,
        text: 'Environments',
        items: [
          { text: 'Local environment', link: '/environments/local' },
          { text: 'Remote environments', link: '/environments/remote' },
          { text: 'Deployement', link: '/environments/deployement' },
          { text: 'Continuous Integration', link: '/environments/ci' },
        ]
      },
      {
        collapsed: false,
        text: 'Infrastructure',
        items: [
          { text: 'Architecture schema', link: '/infrastructure' },
        ]
      },
      {
        collapsed: false,
        text: 'Development',
        items: [
          { text: 'Request the API', link: '/development/request-the-api' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CartONG/plateforme-urbaine-cameroun' }
    ]
  }
})
