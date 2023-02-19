async function fillField(locator, text) {
    await browser.execute((locator, text) => {
        document.querySelector(locator).value = text;
    }, locator, text);
}

module.exports = { fillField };
