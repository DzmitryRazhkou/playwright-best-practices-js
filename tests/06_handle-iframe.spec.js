const {test, expect} = require('@playwright/test')
const {webkit} = require('playwright')
const fixture = require('../fixture/common.json')

let browser
let context
let page

test.beforeEach(async () => {
    browser = await webkit.launch({
        headless: false
    })
    context = await browser.newContext()
    page = await browser.newPage()
    await page.goto("http://the-internet.herokuapp.com/iframe")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> JS Confirm Alert -> Accept() || Dismiss() <===== ", async () => {

    const frame = await page.frameLocator("#mce_0_ifr")
    await frame.locator("#tinymce").clear()
    await frame.locator("#tinymce").fill("Gans Cypress")

    console.log(await frame.locator("#tinymce").textContent())
    await expect(frame.locator("#tinymce")).toHaveText("Gans Cypress")
})