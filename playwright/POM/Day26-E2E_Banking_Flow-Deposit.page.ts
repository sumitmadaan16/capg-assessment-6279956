import { Locator, Page, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataFile = fs.readFileSync(path.join(__dirname, '../tests/testData/Day26-E2E_Banking_Flow.json'))
//@ts-ignore
const data = JSON.parse(dataFile)
class BankingFlowDeposit{
    page:Page
    depositSelectBtn:Locator
    submitbtn:Locator
    amtTF:Locator
    getBalance:Locator
    txnMsg:Locator
    constructor(page:Page){
        this.page = page
        this.depositSelectBtn = this.page.getByRole('button', {name:"Deposit "})
        this.amtTF = this.page.getByPlaceholder('amount')
        this.getBalance = this.page.locator('//div[@class="center"]/strong[2]')
        this.submitbtn = this.page.locator('//button[@type="submit"]')
        this.txnMsg = this.page.locator('//span[@class="error ng-binding"]')
    }
    async deposit(depositAmt:number){
        await this.depositSelectBtn.click()
        const Oldbal = await this.checkBalance()
        await this.amtTF.fill(String(depositAmt))
        await this.submitbtn.click()
        const Newbal = await this.checkBalance()
        expect(Newbal).toBe(Oldbal + depositAmt)
        const msg = await this.txnMsg.textContent()
        expect(msg).toBe("Deposit Successful")
    }
    async checkBalance(): Promise<number> {
        const balText = await this.getBalance.textContent()
        if (!balText) {
            throw new Error("Balance text not found")
        }
        return parseInt(balText.trim(), 10)
    }
}
export default BankingFlowDeposit