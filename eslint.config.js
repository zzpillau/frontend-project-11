import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    ignores: ['dist/', 'public/'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
      parserOptions: {
        // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
        // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
    },
  },
  ...compat.extends('airbnb-base'),
  {
    rules: {
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],
      'import/extensions': [
        'error',
        {
          js: 'always',
        },
      ],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
];

// import globals from 'globals';
// import pluginJs from '@eslint/js';
// import prettier from 'eslint-config-prettier';
// import prettierPlugin from 'eslint-plugin-prettier';
// import importPlugin from 'eslint-plugin-import';
// import airbnbBase from 'eslint-config-airbnb-base';

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {
//     ignores: ['public/*'],
//   },
//   { languageOptions: {
//     globals: globals.browser,
//     ecmaVersion: 2021,
//   } },
//   pluginJs.configs.recommended,
//   prettier,
//   {
//     plugins: {
//       prettier: prettierPlugin,
//       import: importPlugin,
//     },
//     rules: {
//       // 'prettier/prettier': 'error',
//       quotes: ['error', 'single'],
//       'quote-props': ['error', 'as-needed'],
//       'import/prefer-default-export': 'error',
//       'no-else-return': 'error',
//       'implicit-arrow-linebreak': 'error',
//       'function-paren-newline': ['error', 'multiline'],
//       'no-shadow': 'error',
//       'consistent-return': 'error',
//       'operator-linebreak': ['error', 'before'],
//       'import/no-cycle': 'error',
//       'prefer-destructuring': ['error', { object: true, array: true }],
//       'arrow-body-style': ['error', 'as-needed'],
//       'prefer-promise-reject-errors': 'error',
//       'prefer-template': 'error',
//       'import/order': 'error',
//       'no-param-reassign': 'error',
//       'default-case': 'error',
//       'class-methods-use-this': 'error',
//       'no-trailing-spaces': 'error',
//       'comma-dangle': ['error', 'always-multiline'],
//       semi: ['error', 'always'],
//       'max-len': ['error', { code: 80 }],
//       'padded-blocks': ['error', 'never'],
//       'object-curly-spacing': ['error', 'always'],
//       'array-bracket-spacing': ['error', 'never'],
//       indent: ['error', 2],
//       'eol-last': ['error', 'always'],
//       'no-useless-return': 'error',
//       'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
//       ...airbnbBase.rules,
//     },
//   },
// ];
