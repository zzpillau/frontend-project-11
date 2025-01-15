import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['public/*'],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      // 'prettier/prettier': 'error',
      'import/prefer-default-export': 'error',
      'no-else-return': 'error',
      'implicit-arrow-linebreak': 'error',
      'function-paren-newline': ["error", "multiline"],
      'no-shadow': 'error',
      'consistent-return': 'error',
      'operator-linebreak': ["error", "before"],
      'import/no-cycle': 'error',
      'prefer-destructuring': ["error", { "object": true, "array": true }],
      'arrow-body-style': ["error", "as-needed"],
      'prefer-promise-reject-errors': 'error',
      'prefer-template': 'error',
      'import/order': 'error',
      'no-param-reassign': 'error',
      'default-case': 'error',
      'class-methods-use-this': 'error',
      'no-trailing-spaces': 'error',
      'comma-dangle': ["error", "always-multiline"],
      'semi': ["error", "always"],
      'max-len': ["error", { "code": 80 }],
      'padded-blocks': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ["error", "never"],
      'indent': ['error', 2],
      'eol-last': ["error", "always"],
      'no-useless-return': 'error',
      'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
    },
  },
];
