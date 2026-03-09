import { test , expect} from "@playwright/test"

test("flipkart" ,async({page})=>{
    await page.goto("https://www.flipkart.com")
    await page.locator('(//span[@class="b3wTlE"])[1]').click()
    await page.locator('(//input[@class="nw1UBF v1zwn25"])[1]').fill("shoes")
    
    console.log(`Price is: ${price} `);
    let date_and_time = new Date().getTime();
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})