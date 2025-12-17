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
    await page.goto("https://the-internet.herokuapp.com/download")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Download!!! <==== ", async () => {

    const uploadMeTxt = await page.locator("//a[@href='download/upload-me.txt']")


    const [download] = await Promise.all([page.waitForEvent('download'), uploadMeTxt.click()])

    const path = await download.path();
    expect(path).not.toBeNull();

})