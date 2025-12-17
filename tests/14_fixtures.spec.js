import {test} from "@playwright/test";
import {webkit} from "playwright";
import * as data from '../fixture/fs.json'

const dataSet = require("../fixture/fs.json")

test("Fixtures", async () => {
    const browser = await webkit.launch({
        headless: false
    })
    const context = await browser.newContext({
        recordVideo: {
            dir: "./videos", size: {
                width: 800, height: 600,
            }
        }
    })
    const page = await context.newPage()
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login")
    await page.fill("#input-email", data.email)
    await page.fill("#input-password", data.psw)
    await page.click("input[type='submit']")

    await browser.close()
})

test.only("JSON.Parse()", async () => {
    const browser = await webkit.launch({
        headless: false
    })
    const context = await browser.newContext({
        recordVideo: {
            dir: "./videos", size: {
                width: 800, height: 600,
            }
        }
    })
    const page = await context.newPage()
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login")
    await page.fill("#input-email", dataSet.email)
    await page.fill("#input-password", dataSet.psw)
    await page.click("input[type='submit']")

    await browser.close()
})
