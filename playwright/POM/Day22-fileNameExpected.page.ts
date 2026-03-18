import { Page, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(__dirname, '../tests/testData/Day22-fileNameExpected.json'));
//@ts-ignore
const data = JSON.parse(file);

class FileNameExpected {
  page: Page;
  inputFileBtn:any
  uploadFileBtn:any
  actualFileName:any

  constructor(page: Page) {
    this.page = page
    this.inputFileBtn = page.locator('input#file-upload')
    this.uploadFileBtn = page.locator('input#file-submit')
    this.actualFileName = page.locator('#uploaded-files')
  }

  async executeFunction() {
    await this.page.goto(data.url)
    await this.inputFileBtn.setInputFiles(data.filePath)
    await this.uploadFileBtn.click()
    const uploadedFileName = await this.actualFileName.textContent()
    expect(uploadedFileName?.trim()).toBe(data.fileName)
    let date_and_time=new Date().getTime()
    await this.page.screenshot({path:`Screenshots/${date_and_time}.png`})
    console.log('Uploaded file name:', uploadedFileName)
  }
}

export default FileNameExpected
