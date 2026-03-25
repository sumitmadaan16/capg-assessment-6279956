import { test } from '@playwright/test'
import BankingFlowCreate from '../POM/Day26-E2E_Banking_Flow-CreateUser.page'
import BankingFlowLogin from '../POM/Day26-E2E_Banking_Flow-Login.page'
import BankingFlowDeposit from '../POM/Day26-E2E_Banking_Flow-Deposit.page'
import BankingFlowWithDraw from '../POM/Day26-E2E_Banking_Flow-withdrawal.page'
import BankingFlowLogout from '../POM/Day26-E2E_Banking_Flow-Logout.page'

test.use({
    launchOptions:{
        slowMo:500
    }
})

test('BankFlow', async ({ page }) => {
    const createUser = new BankingFlowCreate(page)
    const Login = new BankingFlowLogin(page)
    const deposit = new BankingFlowDeposit(page)
    const withdraw = new BankingFlowWithDraw(page)
    const logout = new BankingFlowLogout(page)

    await createUser.addCustomer()
    await createUser.openAccount()
    await Login.loginUser()
    await deposit.deposit(2000)
    await withdraw.withdraw(1500)
    await logout.logoutUser()
})