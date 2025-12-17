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
    await page.goto("https://letcode.in/elements")
})
test.afterEach(async () => {
    await page.close()
    await context.close()
    await page.close()
})

//**
// **//
test(" =====> Find Multiple Elements <===== ", async () => {

    // const githubUsername = await page.$("//input[@name='username']")
    const githubUsername = await page.locator("//input[@name='username']")
    await expect(githubUsername).toBeVisible({timeout: 3000})

    await githubUsername.fill("Gans")
    await githubUsername.press("Enter")

    // Waiting For Git Repos:
    await page.waitForSelector("//div[@class=\"container mt-5\"]/div/article/div/div/p[1]", {timeout: 2000})
    const repos = await page.$$("//div[@class=\"container mt-5\"]/div/article/div/div/p[1]");
    console.log("The Amount of GitHub Links is: " + repos.length)

    // Iterate Repos Thru For Loop:
    for await (const repo of repos) {
        console.log(await repo.innerText())
    }

    console.log(" =====> -_-_-_- <===== ")

    // Thru Map:
    const reposSubtitle = await page.$$("//div[@class=\"container mt-5\"]/div/article/div/div/p[2]");
    const subtitles = await Promise.all(reposSubtitle.map(async (subs) => {
        return subs.innerText()
    }))

    console.log(subtitles)

    // Context:

    const programmingLanguage = await page.locator("//div[@class=\"container mt-5\"]/div/article/div/div/div").allTextContents();
    console.log("The Amount of Languages Is: " + programmingLanguage.length)

    // Remove the ""
    const programmingLanguageCleared = programmingLanguage
        .filter((s) => s.trim() !== "")
        .map((s) => s.trim())

    console.log(programmingLanguageCleared)

    // Remove duplicated:
    const removedDuplicated = [...new Set(programmingLanguageCleared)]
    console.log(removedDuplicated)
})