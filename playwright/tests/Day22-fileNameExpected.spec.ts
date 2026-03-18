import { test } from '@playwright/test'
import FileNameExpected from '../POM/Day22-fileNameExpected.page'

test('fileNameExpected', async ({ page }) => {
  const executionPage = new FileNameExpected(page)
  await executionPage.executeFunction()
})
