const {test, expect} = require('@playwright/test')
const {webkit} = require('playwright')
import {faker} from "@faker-js/faker";

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
test(" =====> Input (Fill | Text Inside Box | Clear Text | Disabled) <==== ", async () => {
    const fullName = faker.person.fullName()
    const joinValue = faker.company.name()
    const getMeValue = faker.company.name()

    // Enter your full Name:
    const fullNameInput = await page.getByPlaceholder("Enter first & last name")
    await fullNameInput.fill(fullName)

    // Validate Input Text:
    const joinInput =  await page.locator("#join")
    await expect(joinInput).toHaveValue("I am good");

    // Clear:
    await joinInput.clear()
    await joinInput.fill(joinValue)

    // Keyboard Action:
    await page.keyboard.press("Tab")

    // Validate:
    const getMeInput = await page.locator("#getMe")
    await expect(getMeInput).toHaveValue("ortonikc")
    await getMeInput.clear()
    await getMeInput.fill(getMeValue)

    // Clear:
    const clearMeInput = await page.locator("#clearMe")
    clearMeInput.clear()

    // noEdit:
    const isDisabledInput = await page.isDisabled("#noEdit")
    await expect(isDisabledInput).toBeTruthy()
})