const BaseProductPage = require('./BaseProductPage');
const { MOISTURIZER_PAGE_URL } = require('../../config/constants');

class MoisturizerPage extends BaseProductPage {
    open() {
        super.open(MOISTURIZER_PAGE_URL);
    }
}

module.exports = new MoisturizerPage();
