const {test, expect} = require('@playwright/test')
const {webkit} = require('playwright')
import {fa, faker} from "@faker-js/faker";

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
test(" =====> Click And Hold!!! <==== ", async () => {

    // Is Disabled:
    await page.goto("https://letcode.in/button")
    const isDisabledButton = await page.getByTitle("Disabled button")
    await expect(isDisabledButton).toBeDisabled();
    await expect(isDisabledButton).toBeVisible();

    // Click And Hold:
    const clickAndHoldButton = await page.getByRole("button", {name: "Button Hold!"})
    const hasBeenLongPressedButton = await page.getByRole("button", {name: "Button has been long pressed"})

    await clickAndHoldButton.click({delay: 2000})
    await expect(hasBeenLongPressedButton).toHaveText("Button has been long pressed")
})
test(" =====> Radio Checked | Unchecked !!! <==== ", async () => {

    // Is Disabled:
    await page.goto("https://letcode.in/radio")

    const selectAnyOneYesRadio = await page.locator("#yes")
    await selectAnyOneYesRadio.check()
    await expect(selectAnyOneYesRadio).toBeChecked({checked: true})

    const findWhichSelectedRadio = await page.locator("#notfoo")
    await expect(findWhichSelectedRadio).toBeChecked({checked: true, timeout: 2000})

    const maybeRadio = await page.locator("#maybe")
    const goingRadio = await page.locator("#going")
    await expect(maybeRadio).toBeDisabled({timeout: 1000})
    await expect(goingRadio).toBeChecked({checked: false})

})