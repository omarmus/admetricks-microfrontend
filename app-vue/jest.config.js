/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const {defaults} = require('jest-config');

module.exports = {
  bail: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'vue', 'js', 'json'],
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/?(*.)spec.{ts,tsx}'],
  transform: {
    '.*\\.(vue)$': '@vue/vue3-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  verbose: true,
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
  }
};
