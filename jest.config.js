// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testMatch: [
    "/**/test/?(*.)+(spec|test).[t]s?(x)"
  ],
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: "node",
};
  