// vite.config.mts
import Vue from "file:///app/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Vuetify from "file:///app/node_modules/vite-plugin-vuetify/dist/index.mjs";
import { sentryVitePlugin } from "file:///app/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import VueDevTools from "file:///app/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///app/vite.config.mts";
var vite_config_default = defineConfig({
  // base: "/",
  plugins: [
    Vue(),
    VueDevTools(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true
    }),
    sentryVitePlugin({
      org: "cartong",
      project: "pdvir-vue",
      authToken: process.env.SENTRY_AUTH_TOKEN
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  server: {
    port: 3e3,
    allowedHosts: ["pdvir.local"]
    // host: "0.0.0.0",
    // watch: {
    //   usePolling: true,
    // }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/global/_variables";`,
        silenceDeprecations: ["legacy-js-api", "import"]
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2FwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2FwcC92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2FwcC92aXRlLmNvbmZpZy5tdHNcIjsvLyBQbHVnaW5zXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBWdWV0aWZ5IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZXRpZnknXG5pbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSAnQHNlbnRyeS92aXRlLXBsdWdpbidcbmltcG9ydCBWdWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbi8vIFV0aWxpdGllc1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gYmFzZTogXCIvXCIsXG4gIHBsdWdpbnM6IFtcbiAgICBWdWUoKSxcbiAgICBWdWVEZXZUb29scygpLFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92dWV0aWZ5anMvdnVldGlmeS1sb2FkZXIvdHJlZS9tYXN0ZXIvcGFja2FnZXMvdml0ZS1wbHVnaW4jcmVhZG1lXG4gICAgVnVldGlmeSh7XG4gICAgICBhdXRvSW1wb3J0OiB0cnVlXG4gICAgfSksXG4gICAgc2VudHJ5Vml0ZVBsdWdpbih7XG4gICAgICBvcmc6ICdjYXJ0b25nJyxcbiAgICAgIHByb2plY3Q6ICdwZHZpci12dWUnLFxuICAgICAgYXV0aFRva2VuOiBwcm9jZXNzLmVudi5TRU5UUllfQVVUSF9UT0tFTlxuICAgIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy5qc29uJywgJy5qc3gnLCAnLm1qcycsICcudHMnLCAnLnRzeCcsICcudnVlJ11cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBhbGxvd2VkSG9zdHM6IFsncGR2aXIubG9jYWwnXVxuICAgIC8vIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIC8vIHdhdGNoOiB7XG4gICAgLy8gICB1c2VQb2xsaW5nOiB0cnVlLFxuICAgIC8vIH1cbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIuL3NyYy9hc3NldHMvc3R5bGVzL2dsb2JhbC9fdmFyaWFibGVzXCI7YCxcbiAgICAgICAgc2lsZW5jZURlcHJlY2F0aW9uczogWydsZWdhY3ktanMtYXBpJywgJ2ltcG9ydCddXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sU0FBUztBQUNoQixPQUFPLGFBQWE7QUFDcEIsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxpQkFBaUI7QUFHeEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlLFdBQVc7QUFSOEUsSUFBTSwyQ0FBMkM7QUFXbEssSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUE7QUFBQSxJQUVaLFFBQVE7QUFBQSxNQUNOLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxJQUNELGlCQUFpQjtBQUFBLE1BQ2YsS0FBSztBQUFBLE1BQ0wsU0FBUztBQUFBLE1BQ1QsV0FBVyxRQUFRLElBQUk7QUFBQSxJQUN6QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLElBQ0EsWUFBWSxDQUFDLE9BQU8sU0FBUyxRQUFRLFFBQVEsT0FBTyxRQUFRLE1BQU07QUFBQSxFQUNwRTtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sY0FBYyxDQUFDLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSzlCO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxRQUNoQixxQkFBcUIsQ0FBQyxpQkFBaUIsUUFBUTtBQUFBLE1BQ2pEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
