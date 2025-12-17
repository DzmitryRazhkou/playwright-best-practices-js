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
test.skip("Find Multiple Elements", async () => {

    await page.goto("https://letcode.in/dropable")
    const src = await page.$("#draggable")
    const dst = await page.$("#droppable");
    if (src && dst) {
        const srcBound = await src.boundingBox()
        const dstBound = await dst.boundingBox()
        if (srcBound && dstBound) {
            await page.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height / 2)
            await page.mouse.down();
            await page.mouse.move(dstBound.x + dstBound.width / 2, dstBound.y + dstBound.height / 2)
            await page.mouse.down();
        } else {
            throw new Error("No Element")
        }
    }
})
test(" =====> Droppable <===== ", async () => {

    await page.goto("https://jqueryui.com/droppable/")

    const pageIFrame = await page.frameLocator("//*[@id='content']/iframe")
    const draggable = await pageIFrame.locator("#draggable")
    const droppable = await pageIFrame.locator("#droppable")

    await draggable.dragTo(await  droppable)
    await page.waitForTimeout(3000)
})
test(" =====> Draggable <===== ", async () => {
    await page.goto("https://jqueryui.com/draggable/");

    // Access the iframe that contains the demo
    const frame = page.frameLocator("//*[@class='demo-frame']");

    // The draggable element inside the iframe
    const src = frame.locator("#draggable");

    // Wait until it appears
    await src.waitFor();

    // Get its bounding box
    const box = await src.boundingBox();
    if (!box) {
        throw new Error("Could not get draggable element bounding box");
    }

    // Starting point: center of the box
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    // How far to drag:
    const offsetX = 200;
    const offsetY = 150;

    // Perform drag:
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + offsetX, startY + offsetY, { steps: 20 });
    await page.mouse.up();
})