import { test , expect} from "@playwright/test"
import { log } from "node:console"

test("flipkart" ,async({page})=>{
    await page.goto("https://www.flipkart.com")
    expect(page).toHaveTitle("Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!")


    await page.locator('(//span[@class="b3wTlE"])[1]').click()
    await page.locator('(//input[@class="nw1UBF v1zwn25"])[1]').fill("shoes")
    let fill = await page.locator('(//input[@class="nw1UBF v1zwn25"])[1]').inputValue()
    expect(fill).toBe("shoes")

    await page.keyboard.type("Enter")
    let womenShoes = await page.locator('//div[@class="QSCKDh dLgFEE"]/descendant::a[contains(text(),"Women")]').all()
    console.log(womenShoes);
    
    await expect(page).toHaveScreenshot();
})