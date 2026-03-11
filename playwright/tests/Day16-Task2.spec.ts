import { test, expect } from "@playwright/test";

test("price lthi", async ({ page }) => {
    await page.goto("https://www.saucedemo.com")
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.locator("#login-button").click()
    await page.locator('//select[@class="product_sort_container"]').click()
    await page.locator("//select[@class='product_sort_container']").selectOption({value:"lohi"})
    await page.locator('//div[@class="inventory_item"]/descendant::div[@class="pricebar"]/button').first().click()
    let remove = await page.locator('//div[@class="inventory_item"]/descendant::div[@class="pricebar"]/button').first().textContent()
    expect(remove).toBe("Remove")
    console.log(remove);
    const cart=await page.locator("//a[@data-test='shopping-cart-link']/child::span").textContent()
    expect(cart).toContain("1")
    console.log(cart);
    let date_and_time=new Date().getTime()
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})