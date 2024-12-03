/**
 * .eslint.js
 *
 * ESLint configuration file.
 */
import pluginVue from 'eslint-plugin-vue'
import js from '@eslint/js'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import vuePrettierConfig from '@vue/eslint-config-prettier'

export default [
  ...pluginVue.configs['flat/essential'],
  js.configs.recommended,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },
  ...vueTsEslintConfig(),
  vuePrettierConfig
]
