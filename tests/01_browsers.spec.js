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
    await page.goto("https://charter97.org/en/news/")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Title Page <===== ", async () => {
    const titlePage = await page.title()
    expect(await titlePage).toBe("Belarusian News - Charter'97")
    console.log(" =====> " + titlePage + " <===== ")
})