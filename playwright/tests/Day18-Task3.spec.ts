import { test, expect} from '@playwright/test'

test("Verify that the user can upload a file successfully" , async({browser}) => {
    let context = await browser.newContext()
    let page = await context.newPage()
    await page.goto('https://the-internet.herokuapp.com/upload')
    await page.locator('#file-upload').setInputFiles('/Users/sumitmadaan/Downloads/Safari_download/bg.jpg')
    await page.locator('#file-submit').click()
    await page.waitForTimeout(3000)
    let date_and_time=new Date().getTime()
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
    await page.waitForTimeout(2000)
})