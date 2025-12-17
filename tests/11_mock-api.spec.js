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
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Mock UP API Request <===== ", async () => {

    const json = [{name: 'javascript fundamentals', id: 101}, {
        name: 'web automation with selenium', id: 102
    }, {name: 'python for testers', id: 103}, {
        name: 'mobile testing with appium', id: 104
    }, {name: 'performance testing with jmeter', id: 105},];

    await page.route("*/**/api/v1/fruits", async route => {
        await route.fulfill({json})
    })

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('javascript fundamentals')).toBeVisible();
    await expect(page.getByText('web automation with selenium')).toBeVisible();
    await expect(page.getByText('python for testers')).toBeVisible();
    await expect(page.getByText('mobile testing with appium')).toBeVisible();
    await expect(page.getByText('performance testing with jmeter')).toBeVisible();
})
test(" =====> Mock UP API Response <===== ", async () => {

    await page.route("*/**/api/v1/fruits", async route => {
        const response = await route.fetch()

        const newJson = [
            { name: 'javascript fundamentals', id: 100 },
            { name: 'web automation with selenium', id: 101 },
            { name: 'python for testers', id: 102 },
            { name: 'mobile testing with appium', id: 103 },
            { name: 'performance testing with jmeter', id: 104 },
        ];

        await route.fulfill({
            status: response.status(),
            contentType: "application/json",
            body: JSON.stringify(newJson)
        })
    })

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('javascript fundamentals')).toBeVisible();
    await expect(page.getByText('web automation with selenium')).toBeVisible();
    await expect(page.getByText('python for testers')).toBeVisible();
    await expect(page.getByText('mobile testing with appium')).toBeVisible();
    await expect(page.getByText('performance testing with jmeter')).toBeVisible();
})
test(' =====> Mock 403 Error <===== ', async ({ page }) => {

    await page.route('**/api/v1/fruits', async route => {
        await route.fulfill({
            status: 403,
            contentType: 'application/json',
            body: JSON.stringify({
                error: "Shit Broken"
            })
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');
});