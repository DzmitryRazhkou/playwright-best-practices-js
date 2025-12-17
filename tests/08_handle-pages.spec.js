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
    await page.goto("https://letcode.in/window")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Single Page Handling <===== ", async () => {
    const [newPage] = await Promise.all([context.waitForEvent("page"), await page.getByText("Open Home Page").click(),])

    await newPage.waitForLoadState()
    expect(await newPage.url()).toContain("https://letcode.in/test")
})
test.only(" =====> Multiple Handling <===== ", async () => {
    const [multiPage] = await Promise.all([
        context.waitForEvent("page"),
        await page.click("#multi"),
    ]);

    await multiPage.waitForLoadState();
    const allWindows = page.context().pages();

    console.log("No.Of Windows: " + allWindows.length);
    allWindows.forEach((page) => {
        console.log(page.url());
    });

    await allWindows[1].bringToFront();
    allWindows[1].on("dialog", (dialog) => {
        console.log("Message: " + dialog.message());
        dialog.accept();
    });

    await allWindows[1].click("id=accept");
});