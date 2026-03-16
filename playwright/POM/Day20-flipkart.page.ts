class Flipkart{
    page:any
    HomeBtn : any
    storeBtn:any
    productPage:any
    product1:any
    product2:any
    addToCartBtn:any
    cartBtn:any
    dropdown1:any
    dropdown2:any
    prod1_quantity_inc:any
    prod2_quantity_inc:any
    prod1_quantity_dec:any
    prod2_quantity_dec:any
    placeOrderBtn:any
    // @ts-ignore
    constructor(page){
        this.page = page
        this.HomeBtn = page.locator('//div[@class="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1b1g84l r-tuq35u r-u8s1d r-q4m81j r-1r0gou5" and .="Home"]')
        this.storeBtn = page.locator('(//div[@class="grid-formation grid-column-2"])[2]')
        this.productPage= page.locator('//img[@src="https://rukminim2.flixcart.com/fk-p-flap/380/510/image/f63af45677b331e7.jpg?q=90"]')

        this.product1= page.locator('(//div[@class="QSCKDh dLgFEE"]/descendant::div[@class="RGLWAk"])[6]')
        this.product2= page.locator('(//div[@class="QSCKDh dLgFEE"]/descendant::div[@class="RGLWAk"])[9]')

        this.addToCartBtn = page.locator('//div[@class="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a" and .= "Add to cart" ]')
        this.cartBtn= page.locator('//div[@class="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a" and .= "Go to cart"]')

        this.dropdown1=page.locator('(//div[@class="css-g5y9jx r-1awozwy r-1stjixc r-1xbve24 r-1jkjb r-1udh08x r-16eto9q"])[2]')
        this.dropdown2=page.locator('(//div[@class="css-g5y9jx r-1awozwy r-1stjixc r-1xbve24 r-1jkjb r-1udh08x r-16eto9q"])[1]')
        this.prod1_quantity_inc= page.locator('//div[@class="css-146c3p1 r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm"]')
        this.prod1_quantity_dec= page.locator('//div[@class="css-146c3p1 r-op4f77 r-1et8rh5 r-1b43r93" and .= "2 "')
        this.prod2_quantity_inc= page.locator('//div[@class="css-146c3p1 r-op4f77 r-1et8rh5 r-1b43r93" and .= "5 "')
        this.prod2_quantity_dec= page.locator('//div[@class="css-146c3p1 r-op4f77 r-1et8rh5 r-1b43r93" and .= "3 "')
        this.placeOrderBtn =page.locator('//div[@class="css-146c3p1 r-1vgyyaa r-ubezar r-1rsjblm"]')
    }

    async performLogic(url:string){

        await this.page.goto(url)
        await this.HomeBtn.click()
        await this.storeBtn.click()
        await this.productPage.click()
        
        let [prod1] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.product1.click()
        ])
        const newPageProd1 = new Flipkart(prod1)
        await newPageProd1.addToCartBtn.click()
        await this.page.bringToFront()
        let [prod2] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.product2.click()
        ])
        const newPageProd2 = new Flipkart(prod2)
        await newPageProd2.addToCartBtn.click()
        await newPageProd2.cartBtn.click()
        await newPageProd2.dropdown1.click()
        await newPageProd2.prod1_quantity_inc.click()
        await newPageProd2.dropdown1.click()
        await newPageProd2.prod1_quantity_dec.click()
        await newPageProd2.dropdown2.click()
        await newPageProd2.prod2_quantity_inc.click()
        await newPageProd2.dropdown2.click()
        await newPageProd2.prod2_quantity_dec.click()
        await newPageProd2.placeOrderBtn.click()
        let date_and_time=new Date().getTime()
        await this.page.screenshot({path:`Screenshots/${date_and_time}.png`})   
    }

}
export default Flipkart