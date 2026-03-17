class AmazonCarrer{
    page:any
    carrerPageBtn:any
    findYourRoleBtn:any
    findOpenUniversityRole:any
    countryorOriginTF:string
    listBtn:any
    stateOrProvinceTF:string
    cityTF:string
    empTypeBtn:any
    categoryBtn:any
    carrerArea:any
    teamBtn:any
    roleType:any
    jobLinkBtn:any
    // @ts-ignore
    constructor(page){
        this.page = page
        this.carrerPageBtn = page.locator('//a[@href="https://amazon.jobs"]')
        this.findYourRoleBtn = page.locator('//a[@href="/content/en/career-programs/university"]')
        this.findOpenUniversityRole = page.locator('//a[@href="#search"]')
        this.countryorOriginTF = page.getByPlaceholder('Search for a country or region')
        this.listBtn = page.locator('//ul[@class = "css-z4oebs"]/descendant::button').first()
        this.stateOrProvinceTF = page.getByPlaceholder('Search for a state or province')
        this.listBtn = page.locator('//ul[@class = "css-z4oebs"]/descendant::button').first()
        this.cityTF = page.getByPlaceholder('Search for a city')
        this.empTypeBtn = page.locator('//div[@class="filter-value-module_label__Pet6N css-gb1y2i" and text()= "Full time"]')
        this.categoryBtn = page.locator('//div[@class="filter-value-module_label__Pet6N css-gb1y2i" and text()= "Operations, IT, & Support Engineering"]')        
        this.carrerArea = page.locator('//div[@class="filter-value-module_label__Pet6N css-gb1y2i" and text()="Corporate"]')
        this.teamBtn= page.locator('//div[@class="filter-value-module_label__Pet6N css-gb1y2i" and text()="Jobs for Grads"]')
        this.roleType = page.locator('//div[@class="filter-value-module_label__Pet6N css-gb1y2i" and text()="Individual contributor"]')
        this.jobLinkBtn=page.locator('//ul[@class="jobs-module_root__gY8Hp"]/descendant::a[@href="/jobs/3132079"]')
    }

    async executeFunction(url:string, country:string, state:string,city:string){
        await this.page.goto(url)
        await this.carrerPageBtn.click()
        await this.findYourRoleBtn.click()
        await this.findOpenUniversityRole.click()
        //@ts-ignore
        await this.countryorOriginTF.fill(country)
        await this.listBtn.click()
        //@ts-ignore
        await this.stateOrProvinceTF.fill(state)
        await this.listBtn.click()
        //@ts-ignore
        await this.cityTF.fill(city)
        await this.listBtn.click()
        await this.empTypeBtn.click()
        await this.categoryBtn.click()
        await this.carrerArea.click()
        await this.teamBtn.click()
        await this.roleType.click()
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.jobLinkBtn.click()
        ])
        await newPage.locator('a#apply-button').click()
        let date_and_time=new Date().getTime()
        await newPage.screenshot({path:`Screenshots/${date_and_time}.png`})
        let title = await newPage.title()
        console.log(title)
    }
}
export default AmazonCarrer