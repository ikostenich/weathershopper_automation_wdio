const BasePage = require('../BasePage');
const ConfigmationPage = require('./ConfirmationPage');
const { WAIT_TIMEOUT } = require('../../config/constants');
const { fillField } = require('../../utils/utilities');

class PaymentModal extends BasePage {
    locators = {
        stripeIframe: 'iframe[name="stripe_checkout_app"]',
        modalTitle: '.title h1',
        emailField: 'input#email',
        cardNumberField: 'input#card_number',
        cardExpirationField: 'input#cc-exp',
        cvcField: 'input#cc-csc',
        payButton: 'button#submitButton',
        zipCodeField: 'input#billing-zip',
    };

    get stripeIframe() { return $(this.locators.stripeIframe); }

    get modalTitle() { return $(this.locators.modalTitle); }

    get emailField() { return $(this.locators.emailField); }

    get cardNumberField() { return $(this.locators.cardNumberField); }

    get cardExpirationField() { return $(this.locators.cardExpirationField); }

    get cvcField() { return $(this.locators.cvcField); }

    get payButton() { return $(this.locators.payButton); }

    get zipCode() { return $(this.locators.zipCodeField); }

    async switchToIframe() {
        await browser.switchToFrame(await this.stripeIframe);
    }

    async waitTillOpen() {
        await this.switchToIframe();
        await this.modalTitle.waitForDisplayed({ timeout: WAIT_TIMEOUT });
    }

    async makePayment(payerData, cardData) {
        await fillField(this.locators.emailField, payerData.email);
        await fillField(this.locators.cardNumberField, cardData.number);
        await fillField(this.locators.cardExpirationField, cardData.expirationDate);
        await fillField(this.locators.cvcField, cardData.cvc);
        await fillField(this.locators.zipCodeField, payerData.zipCode);
        await this.payButton.click();
        await this.stripeIframe.waitForDisplayed({ reverse: true });
        await ConfigmationPage.waitTillLoaded();
    }
}

module.exports = new PaymentModal();
