const BasePage = require('../BasePage');
const PaymentModal = require('./PaymentModal');
const Product = require('../../objects/Product');
const { pageTitles, pageUrls } = require('../../config/constants');

class CartPage extends BasePage {
    locators = {
        payWithCardButton: 'button.stripe-button-el',
        productTitle: 'td:first-child',
        productPrice: 'td:last-child',
        productRow: 'tbody tr',
        totalField: '#total',
    };

    async open() {
        await super.open(pageUrls.CART_PAGE_URL);
    }

    async waitTillLoaded() {
        await super.waitTillLoaded(pageTitles.CART_PAGE);
    }

    get payWithCardButton() {
        return $(this.locators.payWithCardButton);
    }

    get productContainers() {
        return $$(this.locators.productRow);
    }

    get totalField() {
        return $(this.locators.totalField);
    }

    async getProductObject(productElement) {
        const title = await productElement.$(this.locators.productTitle).getText();
        const price = await productElement.$(this.locators.productPrice).getText();
        return Product.builder.withTitle(title).withPrice(parseInt(price, 10)).build();
    }

    async getProducts() {
        const productObjects = [];
        const productElements = await this.productContainers;
        for (const product of productElements) {
            const productObject = await this.getProductObject(product);
            productObjects.push(productObject);
        }
        return productObjects;
    }

    async startPayment() {
        await this.payWithCardButton.click();
        await PaymentModal.waitTillOpen();
    }

    async isProductDisplayed(productObject) {
        const existingProducts = await this.getProducts();
        return existingProducts.some((existingProduct) => existingProduct.equals(productObject));
    }

    async getTotalPrice() {
        const totalText = await this.totalField.getText();
        const totalPrice = totalText.trim().split(' ').pop();
        return parseInt(totalPrice, 10);
    }
}

module.exports = new CartPage();
