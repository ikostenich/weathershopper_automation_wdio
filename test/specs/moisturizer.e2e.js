const MoisturizerPage = require('../pageobjects/products/MoisturizerPage');
const CartPage = require('../pageobjects/CartPage');
const { filterData } = require('../data/moisturizersData');

describe('Temperature Page test', () => {
    it('Should open Temperature page', async () => {
        MoisturizerPage.open();
        await MoisturizerPage.assertPageLoaded();
    });
    it.only('Should add filtered and sorted moisturizers to cart', async () => {
        MoisturizerPage.open();
        await MoisturizerPage.assertPageLoaded();

        const productsFilteredOne = await MoisturizerPage.filterProductsByName(filterData.filterProductOne);
        expect(productsFilteredOne).not.toHaveLength(0);
        const sortedProductsOne = await MoisturizerPage.sortProductsByPrice(productsFilteredOne);
        await MoisturizerPage.addProductToCart(sortedProductsOne[0]);

        const productsFilteredTwo = await MoisturizerPage.filterProductsByName(filterData.filterProductTwo);
        expect(productsFilteredTwo).not.toHaveLength(0);
        const sortedProductsTwo = await MoisturizerPage.sortProductsByPrice(productsFilteredTwo);
        await MoisturizerPage.addProductToCart(sortedProductsTwo[0]);
        const itemsInCart = await MoisturizerPage.getCartItemsAmount();
        expect(itemsInCart).toBe(2);

        await MoisturizerPage.cartButton.click();
        await CartPage.assertPageLoaded();
    });
});
