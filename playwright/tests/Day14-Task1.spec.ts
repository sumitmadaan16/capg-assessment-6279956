import {test ,expect} from "@playwright/test"

test("qspider", async({page})=>{
    page.setDefaultTimeout(20000)
    await page.goto("https://demoapps.qspiders.com/ui/login")
    expect(page).toHaveTitle("DemoApps | Qspiders | Text Box")

    await page.getByLabel("Email Id").fill("student@gmail.com")
    let uname = await page.getByLabel("Email Id").inputValue()
    expect(uname).toBe("student@gmail.com")

    await page.getByLabel("Password").fill("student123")
    await page.getByRole("button", {name:"Login"}).click()

    await expect(page).toHaveScreenshot();
})