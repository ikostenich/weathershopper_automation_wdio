const BaseProductPage = require('./BaseProductPage');
const { pageUrls, pageTitles } = require('../../config/constants');

class MoisturizerPage extends BaseProductPage {
    async open() {
        await super.open(pageUrls.MOISTURIZER_PAGE_URL);
        await this.pageLabel.waitForDisplayed({ timeout: WAIT_TIMEOUT });
    }

    async waitTillLoaded() {
        await super.waitTillLoaded(pageTitles.MOISTURIZER_PAGE);
    }
}

module.exports = new MoisturizerPage();
