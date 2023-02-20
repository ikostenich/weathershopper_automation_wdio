const BaseProductPage = require('./BaseProductPage');
const { pageUrls, pageTitles } = require('../../config/constants');

class SunscreensPage extends BaseProductPage {
    async open() {
        await super.open(pageUrls.SUNSCREENS_PAGE_URL);
        await this.pageLabel.waitForDisplayed({ timeout: WAIT_TIMEOUT });
    }

    async waitTillLoaded() {
        await super.waitTillLoaded(pageTitles.SUNSCREENS_PAGE);
    }
}

module.exports = new SunscreensPage();
