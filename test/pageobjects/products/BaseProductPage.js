const { WAIT_TIMEOUT } = require('../../config/constants');
const Product = require('../../objects/Product');
const BasePage = require('../BasePage');
const CartPage = require('../cart/CartPage');

class BaseProductPage extends BasePage {
    locators = {
        pagelabelLocator: 'div.container h2',
        productContainerLocator: 'div.col-4',
        cartButtonLocator: 'ul.navbar-nav button',
        itemTitleLocator: 'p.top-space-10',
        priceFieldLocator: 'p*=Price',
        addButtonLocator: 'button=Add',
        cartItemsNumberLocator: '#cart',
    };

    get productContainers() {
        return $$(this.locators.productContainerLocator);
    }

    get cartButton() {
        return $(this.locators.cartButtonLocator);
    }

    async getProductObject(productElement) {
        const { itemTitleLocator, priceFieldLocator } = this.locators;

        const title = await productElement.$(itemTitleLocator).getText();
        const priceText = await productElement.$(priceFieldLocator).getText();
        const price = parseInt(priceText.trim().split(' ').pop(), 10);

        return Product.builder.withTitle(title).withPrice(price).build();
    }

    async addProductToCart(productObject) {
        const productContainers = await this.productContainers;
        for (const productContainer of productContainers) {
            const productTitle = await productContainer.$(this.locators.itemTitleLocator).getText();
            if (productTitle === productObject.title) {
                await productContainer.$(this.locators.addButtonLocator).click();
                return;
            }
        }
    }

    async addRandomProductToCart() {
        await this.open();
        const productObjects = await this.getProducts();
        await this.addProductToCart(productObjects[0]);
        await this.cartButton.click();
        await CartPage.totalField.waitForDisplayed({ timeout: WAIT_TIMEOUT });
        return productObjects[0];
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

    async filterProductsByName(name) {
        const products = await this.getProducts();
        return products.filter((product) => product.title.toLowerCase().includes(name.toLowerCase()));
    }

    async sortProductsByPrice(products = null) {
        const productObjects = products || await this.getProducts();
        productObjects.sort((a, b) => a.price - b.price);
        return productObjects;
    }

    async filterByNameSortAndAddToCart(name) {
        const productsFilteredOne = await this.filterProductsByName(name);
        const sortedProductsOne = await this.sortProductsByPrice(productsFilteredOne);
        await this.addProductToCart(sortedProductsOne[0]);
    }

    async getCartItemsAmount() {
        const itemsText = await this.cartButton.$(this.locators.cartItemsNumberLocator).getText();
        if (itemsText === 'Empty') {
            return 0;
        }
        return parseInt(itemsText.trim().split(' ')[0], 10);
    }

    async goToCart() {
        await this.cartButton.click();
        await CartPage.waitTillLoaded();
    }
}

module.exports = BaseProductPage;
