import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // 未使用の変数を禁止(_は許可)
      "eqeqeq": "error", // 厳密等価演算を強制
      "no-else-return": ["error", { "allowElseIf": false }] // 不要なelseを禁止
    }
  },
])
