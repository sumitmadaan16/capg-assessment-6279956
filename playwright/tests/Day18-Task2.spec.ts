import {test} from "@playwright/test";

test("task-2", async ({page})=>{
    await page.goto("https://demoqa.com/upload-download")
    await page.locator('//input[@id="uploadFile"]').setInputFiles(
        "/Users/sumitmadaan/Downloads/Safari_download/bg.jpg"
    )
    await page.locator('//a[@id="downloadButton"]').click()
})