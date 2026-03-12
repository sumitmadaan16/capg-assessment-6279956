import { test } from "@playwright/test"

test("dialogs", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    page.once("dialog", async dialog => {
        console.log(dialog.message())
        await dialog.accept()
    })
    await page.locator("//button[text()='Click for JS Alert']").click()
    page.once("dialog", async dialog => {
        console.log(dialog.message())
        await dialog.dismiss()
    })
    await page.locator("//button[text()='Click for JS Confirm']").click()
    page.once("dialog", async dialog => {
        console.log(dialog.message())
        await dialog.accept("Playwright Testing")
    })
    await page.locator("//button[text()='Click for JS Prompt']").click()
})