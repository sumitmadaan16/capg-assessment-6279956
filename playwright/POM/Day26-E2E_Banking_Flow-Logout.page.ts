import { Locator, Page } from '@playwright/test';

class BankingFlowLogout{
    page:Page
    logoutBtn:Locator
    constructor(page:Page){
        this.page = page
        this.logoutBtn = this.page.locator('//button[@class="btn logout"]')
    }
    async logoutUser(){
        await this.logoutBtn.click()
    }

}
export default BankingFlowLogout