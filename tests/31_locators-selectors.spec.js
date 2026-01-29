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
        viewport: {width: 120, height: 720},
        locale: 'en-US'
    })
    page = await browser.newPage()
    await page.goto("https://letcode.in/button")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> getByRole | getByLabel | getByText | getByTestId <==== ", async () => {

    // 1. Role-Based (Best)
    await page.getByRole('button', {name: 'What is my color?'})

    // 2. Label-Based (Great For Forms)
    await page.getByLabel('Get the X & Y co-ordinates')

    // 3. Text-Based
    await page.getByText('Goto Home')

    // 4. ID-Based
    await page.getByTestId('property')
})
test(" =====> Chaining Locators | Filtering <==== ", async () => {

    // 1. Chaining:
    await page.locator('button[id="color"]')
        .getByRole('button', {name: 'What is my color?'})
        // .click()

    // 1. Filtering:
    await page.getByRole('button')
        .filter({ hasText: 'What is my color?'})
    // .click()
})