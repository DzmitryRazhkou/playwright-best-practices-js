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
    context = await browser.newContext({
        viewport: {width: 120, height: 720},
        locale: 'en-US'
    })
    page = await browser.newPage()
    await page.goto("https://letcode.in/forms")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Order Form <==== ", async () => {
    const {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        addressFirstLine,
        addressSecondLine,
        state,
        country,
        zipCode,
        dob,
        gender
    } = customerInfo()

    async function selectGender(gender) {
        if (gender === 'Male') {
            await page.locator("#male").click()
        } else if (gender === 'Female') {
            await page.locator("#female").click()
        } else if (gender === 'Transgender') {
            await page.locator("#trans").click()
        } else {
            console.log("The Provided Gender Is Not Exist!!!")
        }
    }

    async function termsAndConditionsChecked() {
        await expect(termsAndConditionsCheckBox).toBeChecked()
    }

    async function typeDOB(dob) {
        const input = page.locator('#Date');

        // Click to focus date field (required in WebKit)
        await input.click();

        // Clear existing value (WebKit needs manual sequence)
        await input.press('Control+A');
        await input.press('Backspace');

        // Type using keyboard – WebKit updates shadow UI only this way
        await input.type(dob);
    }

    // Locators:
    const firstNameInput = await page.locator("#firstname")
    const lastNameInput = await page.locator("#lasttname")
    const emailInput = await page.locator("#email")
    const phoneInput = await page.locator("#Phno")
    const addressFirstLineInput = await page.locator("#Addl1")
    const addressSecondLineInput = await page.locator("#Addl2")
    const stateInput = await page.locator("#state")
    const zipCodeInput = await page.locator("#postalcode")
    const countrySelect = page.locator(':nth-child(5) > :nth-child(2) > .field > .control > .select > select');
    const termsAndConditionsCheckBox = await page.locator("input[type='checkbox']")
    const submitButton = await page.locator("input[type='submit']")

    await firstNameInput.fill(firstName)
    await lastNameInput.fill(lastName)
    await emailInput.clear()
    await emailInput.fill(emailAddress)
    await phoneInput.fill(phoneNumber)
    await addressFirstLineInput.fill(addressFirstLine)
    await addressSecondLineInput.fill(addressSecondLine)
    await stateInput.fill(state)
    await zipCodeInput.fill(zipCode)
    await countrySelect.selectOption(country)
    await typeDOB(dob)
    await selectGender(gender)
    await termsAndConditionsCheckBox.check()
    await termsAndConditionsChecked()
    await submitButton.click({force: true})
})