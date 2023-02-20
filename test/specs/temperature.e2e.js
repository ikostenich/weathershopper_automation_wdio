const TemperaturePage = require('../pageobjects/TemperaturePage');
const MoisturizerPage = require('../pageobjects/products/MoisturizerPage');
const SunscreensPage = require('../pageobjects/products/SunscreensPage');

describe('Temperature Page test', () => {
    beforeEach(async () => {
        await TemperaturePage.open();
    });
    it('Should open Temperature page', async () => {
        expect(await TemperaturePage.getPageTitle()).toHaveValue(pageTitles.TEMPERATURE_PAGE);
    });
    it('Should open catalog page according to temperature', async () => {
        const temperatue = await TemperaturePage.getTemperature();
        await TemperaturePage.openCatalogByTemperature(temperatue);

        if (temperatue < 19) {
            expect(await MoisturizerPage.getPageTitle()).toHaveValue(pageTitles.MOISTURIZER_PAGE);
        } else if (temperatue > 34) {
            expect(await SunscreensPage.getPageTitle()).toHaveValue(pageTitles.SUNSCREENS_PAGE);
        }
    });
});
