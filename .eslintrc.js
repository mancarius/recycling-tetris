module.exports = {
  root: true,
  env: {},
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "quotes": "off",
    "import/prefer-default-export": "off",
    "no-unused-expressions": "off",
    "comma-dangle": "off",
    "consistent-return": "off"
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)',
    ],
    env: {
      jest: true,
    },
  }, ],
};
