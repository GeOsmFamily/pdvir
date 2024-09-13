import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    }
  },
  plugins: [
    vue(),
    
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      org: "cartong",
      project: "puc-vue",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: { 
        additionalData: `@import "./src/assets/styles/global/_variables";` 
      },
    },
  }
})
