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
    context = await browser.newContext({
        viewport: {width: 120, height: 720}, locale: 'en-US'
    })
    page = await browser.newPage()
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Page Assertions <==== ", async () => {

    await page.goto("https://charter97.org/")

    // Will Retry The Certain Amount Times:
    await expect(page.locator(".logo")).toBeVisible()

    // Page Assertions:
    await expect(await page).toHaveURL("https://charter97.org/")
    await expect(await page).toHaveURL(/charter97/)
    await expect(await page).toHaveTitle('Новости Беларуси - Хартия\'97')
    await expect(await page).toHaveTitle(/Хартия'/)
})
test(" =====> Element Visibility <==== ", async () => {

    await page.goto("https://letcode.in/button")

    await expect(page.getByRole('button', {name: 'Goto Home'})).toBeEnabled()
    await expect(page.getByRole('button', {name: 'Disabled'})).toBeDisabled()

})
test(" =====> Text Content <==== ", async () => {

    await page.goto("https://letcode.in/button")

    await expect(page.getByRole('button', {name: 'Goto Home'})).toHaveText('Goto Home')
    await expect(page.getByRole('button', {name: 'Disabled'})).toContainText("Disabled")

    const buttonsLocator = await page.locator(".card-content>div>div>button").count()
    console.log(" >===== " + buttonsLocator + " =====<")

    await expect(await page.locator(".card-content>div>div>button")).toHaveText(["Goto Home", "Find Location", "What is my color?", "How tall & fat I am?", "Disabled", " Button Hold!"])
})