import {test} from "playwright/test";
import {webkit} from "playwright";

test("launch", async () => {
    const browser = await webkit.launch({
        headless: false
    });
    const context = await browser.newContext()
    const page = await browser.newPage();

    //*
    // *//
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.waitForLoadState("load")

    await page.fill("#input-email", "joedoe@yahoo.com")
    await page.fill("//input[@id='input-password']", "3036057Dr$")
    await page.click("//*[@type='submit']")

    await page.locator("h2:has-text('My Account')").waitFor()
    // https://naveenautomationlabs.com/opencart/index.php?route=account/account
})