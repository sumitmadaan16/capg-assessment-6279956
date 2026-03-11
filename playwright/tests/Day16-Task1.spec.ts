import { test, expect } from "@playwright/test";

test("Car dropdown options", async ({ page }) => {
    await page.goto("https://www.automationtesting.co.uk/dropdown.html")
    await page.locator('//select[@id="cars"]').click()
    let date_and_time=new Date().getTime()
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
    const cars = await page.locator('//select[@id="cars"]/option').all()
    const actual= []
    for (const car of cars) {
        actual.push(await car.textContent())
    }
    const expected :(string) []= [
        "Audi",
        "BMW",
        "Ford",
        "Honda",
        "Jeep",
        "Mercedes",
        "Suzuki",
        "Volkswagen"
    ]
    expect(actual).toEqual(expected)
    console.log("cars:", actual)
})