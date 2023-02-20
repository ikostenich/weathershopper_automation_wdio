const { BASE_URL } = require('./test/config/constants');

exports.config = {

    hostname: 'localhost',
    port: 4444,
    path: '/',

    jasmineOpts: {
        defaultTimeoutInterval: (24 * 60 * 60 * 1000),
    },

    specs: [
        './test/specs/**/*.js',
    ],

    maxInstances: 4,

    capabilities: [{

        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735',
            ],
        },
    }],
    logLevel: 'error',
    bail: 0,

    baseUrl: BASE_URL,

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: [],

    framework: 'mocha',

    specFileRetries: 1,

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
    }]],

};
