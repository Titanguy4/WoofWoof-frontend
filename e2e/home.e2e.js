const { device, element, by, expect } = require('detox');

describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  afterAll(async () => {
    await device.sendToHome();
  });

  it('should display home screen and open first mission', async () => {
    await expect(element(by.id('missionRequestPage'))).toBeVisible();
    await element(by.id('HomeMissionCard')).atIndex(0).tap();
    await expect(element(by.id('DETAIL_SCREEN'))).toBeVisible();
  });
});
