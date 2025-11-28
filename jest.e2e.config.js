module.exports = {
  preset: 'jest-expo/detox',
  testEnvironment: 'node',
  setupFilesAfterEnv: [],  // plus besoin d'init.js
  testMatch: ['**/e2e/**/*.e2e.js'],
  reporters: ['detox/runners/jest/reporters/detox-expo-reporter'],
  testTimeout: 120000,
};
