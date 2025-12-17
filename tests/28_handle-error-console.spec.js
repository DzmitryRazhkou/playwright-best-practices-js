const {test, expect} = require('@playwright/test')
const {webkit} = require('playwright')
const {customerInfo} = require('../utils/generated-data')

let browser
let context
let page

test.beforeEach(async () => {
    browser = await webkit.launch({
        headless: false
    })
    context = await browser.newContext()
    page = await browser.newPage()
    await page.goto("https://the-internet.herokuapp.com/javascript_error")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Evaluate!!! <==== ", async () => {

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('CONSOLE ERROR:', msg.text());
        }
    });

    // Show uncaught JS errors
    page.on('pageerror', error => {
        console.log('PAGE ERROR:', error.message);
    });

    await page.waitForTimeout(3000);
})