const TemperaturePage = require('../pageobjects/TemperaturePage');
const MoisturizerPage = require('../pageobjects/products/MoisturizerPage');
const SunscreensPage = require('../pageobjects/products/SunscreensPage');

describe('Temperature Page test', () => {
    it('Should open Temperature page', async () => {
        TemperaturePage.open();
        await TemperaturePage.assertPageLoaded();
    });
    it('Should open catalog page according to temperature', async () => {
        TemperaturePage.open();
        const temperatue = await TemperaturePage.getTemperature();
        await TemperaturePage.openCatalogByTemperature(temperatue);

        if (temperatue < 19) {
            await MoisturizerPage.assertPageLoaded();
        } else if (temperatue > 34) {
            await SunscreensPage.assertPageLoaded();
        }
    });
});
