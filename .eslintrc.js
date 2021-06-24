module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2, { offsetTernaryExpressions: true }],
    'multiline-ternary': ['error', 'always-multiline'],
  },
}
