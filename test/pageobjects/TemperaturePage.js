const BasePage = require('./BasePage');
const { TEMPERATURE_PAGE_URL } = require('../config/constants');

class TemperaturePage extends BasePage {
    get temperatureField() {
        return $('#temperature');
    }

    get temperatureMeasurement() {
        return $('#temperature sup');
    }

    get buyMoisturizersButton() {
        return $('a[href="/moisturizer"]');
    }

    get buySunscreensButton() {
        return $('a[href="/sunscreen"]');
    }

    open() {
        super.open(TEMPERATURE_PAGE_URL);
    }

    async getTemperature() {
        const parentSpanText = await this.temperatureField.getText();
        const childSubText = await this.temperatureMeasurement.getText();
        return parentSpanText.replace(childSubText, '');
    }

    async openCatalogByTemperature(temperature = null) {
        let temp = temperature;
        if (!temp) {
            temp = this.getTemperature();
        }
        if (temp < 19) {
            await this.buyMoisturizersButton.click();
        } else if (temp > 34) {
            await this.buySunscreensButton.click();
        }
    }
}

module.exports = new TemperaturePage();
