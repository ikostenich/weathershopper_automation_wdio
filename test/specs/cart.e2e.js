const CartPage = require('../pageobjects/cart/CartPage');
const MoisturizerPage = require('../pageobjects/products/MoisturizerPage');
const PaymentModal = require('../pageobjects/cart/PaymentModal');
const ConfirmationPage = require('../pageobjects/cart/ConfirmationPage');
const { pageTitles } = require('../config/constants');
const { stripeTestCard, payerData } = require('../data/paymentData');

describe('Cart test', () => {
    beforeEach(async function () {
        this.productObject = await MoisturizerPage.addRandomProductToCart();
    });
    it('Should show valid products in cart', async function () {
        expect(await CartPage.isProductDisplayed(this.productObject)).toBe(true);
        expect(await CartPage.getTotalPrice()).toBe(this.productObject.price);
    });
    it('Should successfully purchase product', async () => {
        await CartPage.startPayment();
        await PaymentModal.makePayment(payerData, stripeTestCard);
        expect(await ConfirmationPage.getPageTitle()).toHaveValue(pageTitles.CONFIRMATION_PAGE.toLowerCase());
    });
});
