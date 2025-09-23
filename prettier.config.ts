import type { Config } from 'prettier'

export default {
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-tailwindcss',
  ],
  tailwindStylesheet: './app/app.css',
  arrowParens: 'avoid',
  bracketSameLine: false,
  jsxSingleQuote: true,
  printWidth: 100,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
} satisfies Config
