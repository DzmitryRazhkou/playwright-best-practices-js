const {test, expect} = require('@playwright/test')
const {webkit} = require('playwright')

let browser
let context
let page

test.beforeEach(async () => {
    browser = await webkit.launch({
        headless: false
    })
    context = await browser.newContext()
    page = await browser.newPage()
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login")
})
test.afterEach(async () => {
    page.close()
    context.close()
    page.close()
})

//**
// **//
test(" =====> Title Page <===== ", async () => {
    await page.type("#input-email", "dimagadjilla@gmail.com")

    const psw = await page.locator("#input-password")
    await psw?.focus()
    await page.keyboard.press("End")
    await psw?.type(" 3036057Dr")
})