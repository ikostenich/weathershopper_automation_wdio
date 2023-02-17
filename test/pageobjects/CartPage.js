const BasePage = require('./BasePage');

class CartPage extends BasePage {
    open() {
        super.open('/cart');
    }
}

module.exports = new CartPage();
