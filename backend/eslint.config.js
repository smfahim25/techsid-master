import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node, // Includes Node.js globals like `process`
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
];
