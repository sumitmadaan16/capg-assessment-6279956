import { Locator, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataFile = fs.readFileSync(path.join(__dirname, '../tests/testData/Day26-E2E_Banking_Flow.json'))
//@ts-ignore
const data = JSON.parse(dataFile)

class BankingFlowCreate{
    page:Page
    bankMngrBtn : Locator
    addCustomerBtn :Locator
    firstNameTF :Locator
    lastNameTF :Locator
    postalCodeTF :Locator
    submitBtn:Locator

    openAccountbtn:Locator
    userSelect:Locator
    currencySelector:Locator

    homeBtn:Locator
    constructor(page:Page){
        this.page = page
        this.bankMngrBtn = page.getByRole('button' , {name:"Bank Manager Login"})
        this.addCustomerBtn = page.getByRole('button', {name:"Add Customer "})
        this.firstNameTF = page.getByPlaceholder('First Name')
        this.lastNameTF = page.getByPlaceholder('Last Name')
        this.postalCodeTF = page.getByPlaceholder('Post Code')
        this.submitBtn = page.locator('//button[@type="submit"]')

        this.openAccountbtn=page.getByRole('button', {name:"Open Account "})
        this.userSelect= page.locator('#userSelect')
        this.currencySelector= page.locator('#currency')

        this.homeBtn = page.locator('//button[@class="btn home"]')
    }
    async addCustomer(){
        await this.page.goto(data.url)
        await this.bankMngrBtn.click()
        await this.addCustomerBtn.click()
        await this.firstNameTF.fill(data.firstName)
        await this.lastNameTF.fill(data.lastName)
        await this.postalCodeTF.fill(data.postalCode)
        if (!data.userName || data.userName.trim() === "") {
            data.userName = `${data.firstName} ${data.lastName}`
        }
        this.page.once("dialog", async dialog => {
            console.log(dialog.message())
            await dialog.accept()
        })
        await this.submitBtn.click()
    }   
    async openAccount(){
        await this.openAccountbtn.click()
        await this.userSelect.selectOption(data.userName)
        await this.currencySelector.selectOption('Rupee')
        this.page.once("dialog", async dialog => {
            console.log(dialog.message())
            await dialog.accept()
        })
        await this.submitBtn.click()
        await this.homeBtn.click()
    }
}
export default BankingFlowCreate