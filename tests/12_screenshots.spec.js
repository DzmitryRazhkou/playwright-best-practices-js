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
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Screenshots <===== ", async ({page}) => {
    await page.goto("https://letcode.in/selectable")
    const listOfElements = await page.locator("#container>div>h3")

    // await page.locator("#container>div>h3").waitFor()
    let count = await listOfElements.count()
    for (let i = 0; i < count; i++) {
        if (await listOfElements.nth(i).textContent() === "Cypress") {
            await listOfElements.nth(i).click()
            break
        }
    }
    await page.waitForTimeout(2000)
    await page.screenshot({path: Date.now() + "screenshots/fs.png"})

    const isFlag = await page.locator("h3:has-text('Cypress')").isVisible()
    expect(isFlag).toBeTruthy()
})