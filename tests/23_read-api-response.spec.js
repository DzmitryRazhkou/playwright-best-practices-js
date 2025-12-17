const {test} = require('@playwright/test')
const {webkit} = require('playwright')
let browser
let context
let page

test.beforeEach(async () => {
    browser = await webkit.launch({
        headless: false
    })
    context = await browser.newContext()
    page = await browser.newPage()
    await page.goto("https://letcode.in/elements")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Read API Response <==== ", async () => {

    const [response] = await Promise.all([
        page.waitForResponse(
            res =>
                res.status() === 200 &&
                res.url() === "https://api.github.com/users/ortonikc"
        ),

        page.fill("input[name='username']", "ortonikc"),
        page.click("#search")
    ])

    console.log(await response.json())
})