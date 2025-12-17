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
    await page.goto("https://letcode.in/edit")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Enter Type <===== ", async () => {

    await page.getByPlaceholder("Enter first & last name")
        .fill("Cypress Playwright")

    await page.locator("#join").clear()
    await page.fill("#join", "Fuck That Shit!!!")
})