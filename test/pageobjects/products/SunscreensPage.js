const BaseProductPage = require('./BaseProductPage');
const { SUNSCREENS_PAGE_URL } = require('../../config/constants');

class SunscreensPage extends BaseProductPage {
    open() {
        super.open(SUNSCREENS_PAGE_URL);
    }
}

module.exports = new SunscreensPage();
