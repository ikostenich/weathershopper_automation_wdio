pageTitles = {
    TEMPERATURE_PAGE: 'Current temperature',
    MOISTURIZER_PAGE: 'Moisturizers',
    SUNSCREENS_PAGE: 'Sunscreens',
    CONFIRMATION_PAGE: 'Payment Success',
    CART_PAGE: 'Checkout',
};

pageUrls = {
    TEMPERATURE_PAGE_URL: '/',
    MOISTURIZER_PAGE_URL: '/moisturizer',
    SUNSCREENS_PAGE_URL: '/sunscreen',
    CART_PAGE_URL: '/cart',
};
BASE_URL = 'https://weathershopper.pythonanywhere.com';
WAIT_TIMEOUT = 3000;
WAIT_TIMEOUT_LONG = 10000;

module.exports = {
    pageUrls,
    pageTitles,
    WAIT_TIMEOUT,
    WAIT_TIMEOUT_LONG,
    BASE_URL,
};
