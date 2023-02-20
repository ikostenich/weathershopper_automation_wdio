const BasePage = require('../BasePage');
const { pageTitles } = require('../../config/constants');
const { WAIT_TIMEOUT_LONG } = require('../../config/constants');

class ConfirmationPage extends BasePage {
    async waitTillLoaded() {
        await super.waitTillLoaded(pageTitles.CONFIRMATION_PAGE, WAIT_TIMEOUT_LONG);
    }
}

module.exports = new ConfirmationPage();
