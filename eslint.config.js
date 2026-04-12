const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const cypress = require('eslint-plugin-cypress');

module.exports = [
  {
    files: ['cypress/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      cypress,
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
