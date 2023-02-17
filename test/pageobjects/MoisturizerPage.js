const Product = require('../objects/Product');
const BasePage = require('./BasePage');

class MoisturizerPage extends BasePage {
    locators = {
        itemTitleLocator: 'p.top-space-10',
        priceFieldLocator: 'p*=Price',
        addButtonLocator: 'button=Add',
        cartItemsNumberLocator: '#cart',
    };

    get productContainers() {
        return $$('div.col-4');
    }

    get cartButton() {
        return $('ul.navbar-nav button');
    }

    open() {
        super.open('/moisturizer');
    }

    async getProductTitle(productContainer) {
        const productTitle = await productContainer.$(this.locators.itemTitleLocator).getText();
        return productTitle;
    }

    async getProductPrice(productContainer) {
        const productPrice = await productContainer.$(this.locators.priceFieldLocator).getText();
        return productPrice;
    }

    async getProductButton(productContainer) {
        const productButton = await productContainer.$(this.locators.addButtonLocator);
        return productButton;
    }

    async addProductToCart(productObject) {
        const productContainers = await this.productContainers;
        for (const productContainer of productContainers) {
            const productTitle = await this.getProductTitle(productContainer);
            if (productTitle === productObject.title) {
                await (await this.getProductButton(productContainer)).click();
                return;
            }
        }
    }

    async getProducts() {
        const productObjects = [];
        const productElements = await this.productContainers;
        for (const product of productElements) {
            const productTitle = await this.getProductTitle(product);
            const productPriceText = await this.getProductPrice(product);
            const productPrice = parseInt(productPriceText.trim().split(' ').pop(), 10);
            const productObject = Product.builder.withTitle(productTitle).withPrice(productPrice).build();
            productObjects.push(productObject);
        }
        return productObjects;
    }

    async filterProductsByName(name) {
        const productObjects = await this.getProducts();
        const productsFiltered = productObjects.filter((productObject) => {
            const productTitle = productObject.title.toLowerCase();
            return productTitle.includes(name.toLowerCase());
        });
        return productsFiltered;
    }

    async sortProductsByPrice(products = null) {
        const productObjects = products || await this.getProducts();
        productObjects.sort(this.#compareProductsByPrice);
        return productObjects;
    }

    #compareProductsByPrice(productA, productB) {
        if (productA.lessThan(productB)) {
            return -1;
        }
        if (productA.greaterThan(productB)) {
            return 1;
        }
        return 0;
    }

    async clickCart() {
        await this.cartButton.click();
    }

    async getCartItemsAmount() {
        const itemsText = await this.cartButton.$(this.locators.cartItemsNumberLocator).getText();
        if (itemsText === 'Empty') {
            return 0;
        }
        return parseInt(itemsText.trim().split(' ')[0], 10);
    }
}

module.exports = new MoisturizerPage();
