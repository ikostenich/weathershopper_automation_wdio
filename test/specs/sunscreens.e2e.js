const SunscreensPage = require('../pageobjects/products/SunscreensPage');
const CartPage = require('../pageobjects/cart/CartPage');
const { filterData } = require('../data/sunscreenersData');

describe('Sunscreens Page test', () => {
    beforeEach(async () => {
        await SunscreensPage.open();
    });
    it('Should open sunscreens page', async () => {
        expect(await SunscreensPage.getPageTitle()).toHaveValue(pageTitles.SUNSCREENS_PAGE);
    });

    it('Should add filtered and sorted sunscreens to cart', async () => {
        await SunscreensPage.open();
        await SunscreensPage.filterByNameSortAndAddToCart(filterData.filterProductOne);
        expect(await SunscreensPage.getCartItemsAmount()).toBe(1);

        await SunscreensPage.filterByNameSortAndAddToCart(filterData.filterProductTwo);
        expect(await SunscreensPage.getCartItemsAmount()).toBe(2);

        await SunscreensPage.goToCart();
        expect(await CartPage.getPageTitle()).toHaveValue(pageTitles.CART_PAGE.toLowerCase());
    });
});
