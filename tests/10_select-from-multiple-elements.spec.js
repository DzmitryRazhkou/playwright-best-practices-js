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
    await page.goto("https://letcode.in/selectable")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Iterate and Select Elements <===== ", async () => {

    const arrayOfElements = ["Cypress", "Selenium", "TestNG", "Appium", "Postman"]
    function selectRandomElement(array) {
        let randomIndex= Math.floor(Math.random()*array.length)
        console.log("The Chosen Element Is ====> " + array[randomIndex]+ " <===== ")
        return array[randomIndex]
    }

    const language = selectRandomElement(arrayOfElements)


    const listOfElements = await page.locator("//div[@class='list-container']/div[contains(@class, 'ng')]")
    const count = await listOfElements.count()
    expect(count).toBeGreaterThan(0)

    console.log("The Amount Of The Multiple Elements Is: ===> " + count)

    for (let i = 0; i < count; i++) {
        if (await listOfElements.nth(i).textContent() === language) {
            await listOfElements.nth(i).click()
            break;
        }
    }

    await listOfElements.filter({ hasText: language}).first().click()
    await page.waitForTimeout(1000)

    // const isFlag = await page.locator(`h3:has-text('selected')`).isVisible()
    // expect(await isFlag).toBeTruthy()
})