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
    await page.goto("https://letcode.in/")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Try/Catch (Common Approach) <==== ", async () => {
    try {
        await page.getByText(" 🍕 Buy me a Pizza ").click({timeout: 2000})
    } catch (error) {
        console.error("❌ Element #submitButton not found or not clickable");
        console.error(error)
    }
})
test(" =====> Optional Chaining Style!!! <==== ", async () => {

    try {
        await expect(page.getByText(" 🍕 Buy me a Pizza ")).toBeVisible({timeout: 2000})
        await page.getByText(" 🍕 Buy me a Pizza ").click({timeout: 2000})
    } catch (err) {
        console.log("⚠️ Submit button was not visible in time");
    }

})
test(" =====> Safe Wrapper (Do Click Method) <==== ", async () => {
    async function doClick(page, selector, force = false, timeout = 2000) {
        try {
            await page.locator(selector).click({force: force}, {timeout: timeout})
            await expect(page.locator(selector)).toBeVisible({timeout: timeout})
        } catch {
            console.log(`❌ Could not click element: ${selector}`);
        }
    }

    const locator = page.getByRole("button", {hasText: " 🍕 Buy me a Pizza "})
    await doClick(page, locator, true)

})