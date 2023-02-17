class BasePage {
    async open(path) {
        browser.url(path);
    }

    get pageLabel() {
        return $('div.container h2');
    }

    async assertPageLoaded() {
        await expect(this.pageLabel).toBeDisplayed();
    }
}

module.exports = BasePage;
