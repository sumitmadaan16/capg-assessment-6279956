import { test } from '@playwright/test'
import ex from '../POM/Day21-amazon-carrer.page'
import fs from 'fs'
import path from 'path'


let file = fs.readFileSync(path.join(__dirname, "/testData/Day21-amazon-carrer.json"))
//@ts-ignore
let data = JSON.parse(file)

test("amazon-carrer" ,async({page})=>{
    // @ts-ignore
    let executionPage = new ex(page)
    await executionPage.executeFunction(data.url, data.CountryOrOrigin, data.stateOrProvience, data.city)
})