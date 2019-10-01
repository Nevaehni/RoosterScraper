const puppeteer = require('puppeteer');

(async() =>
{
    try
    {
        let url = "https://www.zalando.nl/nike-sportswear-trainingsbroek-black-ni122e01j-q11.html";
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');

        await page.goto(url, { waitUntil: "networkidle2" });
        let data = await page.evaluate(() => {

            let price = document.querySelector('div[class="h-text h-color-black title-typo h-p-top-m"]').innerText.replace('inclusief btw','');

            return price;
        })
        
        console.log(data);

        debugger;        

        browser.close();
    }
    catch(e)
    {
        console.log('my error: '+e);
    }
    
})();
