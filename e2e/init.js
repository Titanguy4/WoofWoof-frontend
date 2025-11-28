const detox = require('detox');
const config = require('../package.json').detox;
const adapter = require('detox/runners/jest/adapter');

jest.setTimeout(120000);

// ajoute le reporter Detox pour Jest
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config); // initialise Detox et définit device
});

afterAll(async () => {
  await detox.cleanup(); // nettoie Detox
});
