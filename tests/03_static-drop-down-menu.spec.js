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
    page.close()
    context.close()
    page.close()
})

//**
// **//
test(" =====> Static Drop-Down <===== ", async () => {

    const dropDownValue = fixture.dropDown.static.value

    await page.goto("https://the-internet.herokuapp.com/dropdown")
    await page.waitForLoadState("networkidle")

    const dropDown = await page.locator("//*[@id='dropdown']")
    await dropDown.selectOption(dropDownValue)

    await expect(await page).toHaveTitle("The Internet")
    await expect(await page).toHaveURL(/.*dropdown/)
})
test(" =====> Select A Drop-Down Based on Value <===== ", async () => {

    const dropDownFruitsValue = fixture.dropDown.fruitsValue

    await page.goto("https://letcode.in/dropdowns")
    await page.waitForLoadState("networkidle")

    const dropDownFruits = await page.locator("//*[@id='fruits']")
    await dropDownFruits.selectOption(dropDownFruitsValue)

    const successMessage = await page.locator("p:has-text('You have selected Apple')")
    await successMessage.waitFor()

    if (successMessage) {
        await expect(await successMessage.textContent()).toContain("Apple")
    }
})
test(" =====> Select Multiple <===== ", async () => {

    await page.goto("https://letcode.in/dropdowns")
    await page.waitForLoadState("networkidle")

    const dropDownSuperHeroes = await page.$("#superheros")
    await dropDownSuperHeroes.selectOption([{label: "Guardians of the Galaxy"}, {value: "im"}, {index: 1}, {label: "Doctor Strange"}])

    const successMessage = await page.locator("p:has-text('You have selected Aquaman')")
    await successMessage.waitFor()

    if (successMessage) {
        await expect(await successMessage.textContent()).toContain("Aquaman")
    }
})
test(" =====> Count Of The Select <===== ", async () => {

    await page.goto("https://letcode.in/dropdowns")
    await page.waitForLoadState("networkidle")


    const listOfLanguages = await page.locator("#lang")
    await listOfLanguages.selectOption("Swift")

    const countLangCount = await page.locator("#lang>option").count()
    console.log(` =====> ${countLangCount} <===== `)

    await page.pause()

})
test(" =====> Get Selected Text <===== ", async () => {

    await page.goto("https://letcode.in/dropdowns")
    await page.selectOption("#country", "Uruguay")
    const txtValue = await page.locator("#country option:checked").textContent();
    console.log(txtValue)
})