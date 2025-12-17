const {test, expect} = require('@playwright/test')
const {webkit} = require('playwright')
import {fa, faker, ne} from "@faker-js/faker";

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
test(" =====> Single Page Handling <==== ", async () => {

    const [newWindow] = await Promise.all([
        context.waitForEvent('page'),
        await page.click("#home")
    ])

    await newWindow.waitForLoadState()
    await expect(newWindow.url()).toContain("test")

    // await newWindow.waitForURL(/youtube\.com/);
    // expect(url).toContain("youtube")

    await page.bringToFront()
    await page.click("#home")
})
test(" =====> Multiple Page Handling <==== ", async () => {

    const [multipage] = await Promise.all([
        context.waitForEvent('page'),
        await page.click("#multi")
    ])

    await multipage.waitForLoadState()
    const pages = await multipage.context().pages()
    console.log(pages.length)

    pages.forEach(page => {
        console.log(page.url())
    })
})