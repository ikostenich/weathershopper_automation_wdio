const { WAIT_TIMEOUT } = require('../config/constants');

class BasePage {
    get pageLabel() {
        return $('div.container h2');
    }

    async open(path) {
        await browser.url(path);
    }

    async waitTillLoaded(pageTitle, timeout = WAIT_TIMEOUT) {
        await this.pageLabel.waitForDisplayed({ timeout });
        await browser.waitUntil(async () => {
            const titleOnPage = await this.pageLabel.getText();
            return titleOnPage.toLowerCase() === pageTitle.toLowerCase();
        }, { timeout });
    }

    async getPageTitle() {
        const pageTitle = this.pageLabel.getText();
        return (await pageTitle).toLowerCase();
    }
}

module.exports = BasePage;
