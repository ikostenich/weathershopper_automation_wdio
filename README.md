# Weather Shopper

This project contains automated tests for the [Weather Shopper](https://weathershopper.pythonanywhere.com/) web application using WebDriverIO and Allure for reporting. The tests can be run locally or via Docker Compose.

## Requirements
Node.js 18 or higher (for local execution)
Docker

## Installation
Clone the repository:

```bash
git clone https://github.com/ikostenich/weathershopper_automation_wdio.git
```

## Running Tests
Tests can be executed in docker or locally. 

### Running Tests locally 
Local test runner is executed in chrome browser in 1 thread (no parallel execution).

```bash
npm run test
```

### Running Tests in docker 
Docker tests are running in headless chrome browser.

```bash
docker-compose up
```

This will build and start the following containers:

1. selenium-hub: Selenium hub to manage browser nodes
2. chrome: Chrome browser node
3. wdio-test: WebdriverIO tests
The tests are executed and Allure report is generated inside the wdio-test container.

### Accessing the Allure Report
Tests are using Allure for reporting. After docker test run is finished you'll see the link to Allure report.


## Author
Created by Igor Kostenich
