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
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=common/home")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Attributes!!! <==== ", async () => {
    const listOfAttributesName = []
    const naveenLogo = await page.$("#logo>a>img")
    const attributes = await page.locator("//*[@id='carousel0']/div[@class='swiper-wrapper']/div/img")
    const attributesCount = await attributes.count()

    await expect(naveenLogo.getAttribute("title", "naveenopencart")).toBeTruthy()

    for (let i = 0; i < attributesCount; i++) {
        let size = await attributes.nth(i).getAttribute("alt")
        listOfAttributesName.push(size)
    }

    // Clear The Attributes Array:
    const clearedListOfAttributesName = listOfAttributesName
        .filter((s) => s.trim() !== "")
        .map((f) => f.trim())

    // Remove Duplicated:
    const removedDuplicatedListOfAttributesName = [...new Set(clearedListOfAttributesName)]

    // Iterate:
    for (let attribute of removedDuplicatedListOfAttributesName) {
        console.log(attribute)
    }

    console.log(" >>>> Page Title <<<< " + await page.title() + " <<<<< ")
    expect(await page).toHaveTitle("Your Store")
    expect(await page).toHaveURL(/.*home/)
})