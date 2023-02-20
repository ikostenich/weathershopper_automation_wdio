const allureReporter = require('@wdio/allure-reporter').default;
const BasePage = require('./BasePage');
const { pageUrls, pageTitles } = require('../config/constants');

class TemperaturePage extends BasePage {
    locators = {
        temperatureField: '#temperature',
        temperatureMeasurement: '#temperature sup',
        buyMoisturizersButton: 'a[href="/moisturizer"]',
        buySunscreensButton: 'a[href="/sunscreen"]',
    };

    get temperatureField() {
        return $(this.locators.temperatureField);
    }

    get temperatureMeasurement() {
        return $(this.locators.temperatureMeasurement);
    }

    get buyMoisturizersButton() {
        return $(this.locators.buyMoisturizersButton);
    }

    get buySunscreensButton() {
        return $(this.locators.buySunscreensButton);
    }

    async open() {
        await super.open(pageUrls.TEMPERATURE_PAGE_URL);
        await this.pageLabel.waitForDisplayed({ timeout: WAIT_TIMEOUT });
    }

    async waitTillLoaded() {
        await super.waitTillLoaded(pageTitles.TEMPERATURE_PAGE);
    }

    async getTemperature() {
        allureReporter.addStep('Getting temperature number');
        const parentSpanText = await this.temperatureField.getText();
        const childSubText = await this.temperatureMeasurement.getText();
        return parentSpanText.replace(childSubText, '');
    }

    async openCatalogByTemperature(temperature = null) {
        let temp = temperature;
        if (!temp) {
            temp = this.getTemperature();
        }
        allureReporter.addStep('Checking temperature condition');
        if (temp < 19) {
            allureReporter.addStep('Opening Moisturizers page');
            await this.buyMoisturizersButton.click();
            await super.waitTillLoaded(pageTitles.MOISTURIZER_PAGE);
        } else if (temp > 34) {
            allureReporter.addStep('Opening Sunscreeners page');
            await this.buySunscreensButton.click();
            await super.waitTillLoaded(pageTitles.SUNSCREENS_PAGE);
        }
    }
}

module.exports = new TemperaturePage();
