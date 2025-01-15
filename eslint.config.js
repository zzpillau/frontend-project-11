import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['public/*']
  },
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin
    },
    rules: {
      // 'prettier/prettier': 'error',
      'import/prefer-default-export': 'error',
      'no-else-return': 'error',
      'implicit-arrow-linebreak': 'error',
      'function-paren-newline': 'error',
      'no-shadow': 'error',
      'consistent-return': 'error',
      'operator-linebreak': 'error',
      'import/no-cycle': 'error',
      'prefer-destructuring': 'error',
      'arrow-body-style': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-template': 'error',
      'import/order': 'error',
      'no-param-reassign': 'error',
      'default-case': 'error',
      'class-methods-use-this': 'error',
      'no-trailing-spaces': 'error',
      'comma-dangle': 'error',
      'semi': 'error',
      'max-len': 'error',
      'padded-blocks': ['error', 'never'],
      'object-curly-spacing': 'error',
      'array-bracket-spacing': 'error',
      'indent': ['error', 2],
      'eol-last': 'error',
      'no-useless-return': 'error',
      'no-multiple-empty-lines': 'error'
    }
  }
];
