const { BASE_URL } = require('./test/config/constants');

exports.config = {

    runner: 'local',
    jasmineOpts: {
        defaultTimeoutInterval: (24 * 60 * 60 * 1000),
    },

    specs: [
        './test/specs/**/*.js',
    ],

    maxInstances: 1,

    capabilities: [{
        maxInstances: 1,

        browserName: 'chrome',
        acceptInsecureCerts: true,

    }],

    logLevel: 'error',

    bail: 0,

    baseUrl: BASE_URL,

    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

};
