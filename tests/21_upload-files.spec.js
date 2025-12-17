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
    await page.goto("http://the-internet.herokuapp.com/upload")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Upload PDF <==== ", async () => {
    const filePath = "/Users/dzmitryrazhkou/Downloads/olly_pic.jpg"
    await page.setInputFiles("#file-upload", filePath)
    // await page.locator("input[type='file']").setInputFiles(['tests/G.png','tests/image.jpg'])
    await page.locator("#file-submit").click()
})
test.only(" =====> File Chooser <==== ", async () => {

    const filePath = "/Users/dzmitryrazhkou/Downloads/olly_pic.jpg"
    page.on("filechooser", async (file) => {
        await file.setFiles([filePath, filePath])
    })
})