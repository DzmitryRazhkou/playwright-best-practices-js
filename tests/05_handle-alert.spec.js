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
    await page.goto("https://letcode.in/alert")
    await page.waitForLoadState("networkidle")
})
test.afterEach(async () => {
    page.close()
    context.close()
    page.close()
})

//**
// **//
test(" =====> JS Simple Alert -> Accept() <===== ", async () => {
    const alert = await page.locator("#accept")
    page.on("dialog", (dialog) => {
        console.log("Message is: " + dialog.message());
        console.log("Default Value: " + dialog.defaultValue());
        console.log("Type: " + dialog.type());
        dialog.accept();
    })
    await alert.click()
})
test(" =====> JS Confirm Alert -> Accept() || Dismiss() <===== ", async () => {
    const alert = await page.$("#confirm");
    page.on("dialog", (dialog) => {
        console.log("Message is: " + dialog.message());
        console.log("Default Value: " + dialog.defaultValue());
        console.log("Type: " + dialog.type());
        dialog.dismiss();
    });
    await alert.click();
})
test(" =====> JS Prompt Alert <===== ", async () => {
    const alert = await page.$("#prompt");
    page.on("dialog", (dialog) => {
        console.log("Message is: " + dialog.message());
        console.log("Default Value: " + dialog.defaultValue());
        console.log("Type: " + dialog.type());
        dialog.accept("Gans Cypress");
    });
    await alert.click();
})
test(" =====> JS Modern Alert <===== ", async () => {
    const alert = await page.$("#modern");
    page.on("dialog", (dialog) => {
        console.log("Message is: " + dialog.message());
        dialog.accept();
    });
    await page.waitForTimeout(2000);
    await alert.click();
})