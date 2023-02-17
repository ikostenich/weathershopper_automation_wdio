const BasePage = require('./BasePage');

class SunscreensPage extends BasePage {
    open() {
        super.open('/sunscreens');
    }
}

module.exports = new SunscreensPage();
