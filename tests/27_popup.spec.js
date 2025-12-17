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
    await page.goto("https://the-internet.herokuapp.com/entry_ad")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Evaluate!!! <==== ", async () => {

    const restartAdBnt = await page.locator("#restart-ad")
    await restartAdBnt.click()

    await page.on('popup', async popup => {
        await popup.click()
    })
})