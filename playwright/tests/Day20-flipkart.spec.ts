import { test } from '@playwright/test'
import ex from '../POM/Day20-flipkart.page'
import fs from 'fs' //? fs ==> file system
import path from 'path'

let file = fs.readFileSync(path.join(__dirname, "/testData/Day20-flipkart.json"))
//@ts-ignore
let data = JSON.parse(file)

test("flipkart", async ({page})=>{
    // @ts-ignore
    let exPage = new ex(page)
    await exPage.performLogic(data.url)
})