import { Locator, Page, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataFile = fs.readFileSync(path.join(__dirname, '../tests/testData/Day26-E2E_Banking_Flow.json'))
//@ts-ignore
const data = JSON.parse(dataFile)
class BankingFlowLogin{
    page:Page
    customerLoginBtn:Locator
    userSelectBtn:Locator
    loginBtn:Locator
    constructor(page:Page){
        this.page = page
        this.customerLoginBtn = this.page.locator('//button[@class= "btn btn-primary btn-lg" and .="Customer Login"]')
        this.userSelectBtn = this.page.locator('#userSelect')
        this.loginBtn = this.page.getByRole('button' , {name:"Login"})
        if (!data.userName || data.userName.trim() === "") {
            data.userName = `${data.firstName} ${data.lastName}`
        }
    }
    async loginUser(){
        await this.customerLoginBtn.click()
        await this.userSelectBtn.selectOption(data.userName)
        await this.loginBtn.click()
    }

}
export default BankingFlowLogin