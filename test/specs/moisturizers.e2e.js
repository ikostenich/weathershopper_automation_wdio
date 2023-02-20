const MoisturizerPage = require('../pageobjects/products/MoisturizerPage');
const CartPage = require('../pageobjects/cart/CartPage');
const { filterData } = require('../data/moisturizersData');
const { pageTitles } = require('../config/constants');

describe('Moisturizer Page test', () => {
    beforeEach(async () => {
        await MoisturizerPage.open();
    });
    it('Should open moisturizer page', async () => {
        expect(await MoisturizerPage.getPageTitle()).toHaveValue(pageTitles.MOISTURIZER_PAGE);
    });

    it('Should add filtered and sorted moisturizers to cart', async () => {
        await MoisturizerPage.filterByNameSortAndAddToCart(filterData.filterProductOne);
        expect(await MoisturizerPage.getCartItemsAmount()).toBe(1);

        await MoisturizerPage.filterByNameSortAndAddToCart(filterData.filterProductTwo);
        expect(await MoisturizerPage.getCartItemsAmount()).toBe(2);

        await MoisturizerPage.goToCart();
        expect(await CartPage.getPageTitle()).toHaveValue(pageTitles.CART_PAGE.toLowerCase());
    });
});
