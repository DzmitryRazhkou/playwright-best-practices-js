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
test(" =====> Evaluate!!! <==== ", async () => {

    const title = await page.evaluate(() => {
        return document.title
    })

    console.log(title)
    expect(title).toContain("LetCode")
})