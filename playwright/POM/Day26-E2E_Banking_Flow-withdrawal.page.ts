import { Locator, Page, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataFile = fs.readFileSync(path.join(__dirname, '../tests/testData/Day26-E2E_Banking_Flow.json'))
//@ts-ignore
const data = JSON.parse(dataFile)

class BankingFlowWithDraw{
    page:Page
    accNumber:Locator
    withdrawlSelectBtn:Locator
    submitbtn:Locator
    amtTF:Locator
    getBalance:Locator
    txnMsg:Locator
    constructor(page:Page){
        this.page = page
        this.accNumber = this.page.locator('#accountSelect')
        this.amtTF = this.page.getByPlaceholder('amount')
        this.getBalance = this.page.locator('//div[@class="center"]/strong[2]')
        this.withdrawlSelectBtn= this.page.getByRole('button' , {name: "Withdrawl "})
        this.submitbtn = this.page.locator('//button[@type="submit"]')
        this.txnMsg = this.page.locator('//span[@class="error ng-binding"]')
    }
    async withdraw(withdrawalAmt:number){
        await this.withdrawlSelectBtn.click()
        const currBal = await this.checkBalance()
        await this.amtTF.fill(String(withdrawalAmt))
        await this.submitbtn.click()
        const msg = await this.txnMsg.textContent()
        if(currBal >= withdrawalAmt){
            expect(msg).toBe("Transaction successful")
            const newBal = await this.checkBalance()
            console.log("balance After withdraw : " , newBal);
            expect(newBal).toBe(currBal - withdrawalAmt)
        }
        else{
            expect(msg).toBe("Transaction Failed. You can not withdraw amount more than the balance.")
        }
    }
    async checkBalance(): Promise<number> {
        const balText = await this.getBalance.textContent()
        if (!balText) {
            throw new Error("Balance text not found")
        }
        return parseInt(balText.trim(), 10)
    }
}
export default BankingFlowWithDraw