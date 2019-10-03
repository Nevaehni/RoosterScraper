const puppeteer = require('puppeteer');

(async() =>
{
    try
    {
        let url = "https://rooster.talnet.nl/zuidoost/frames/navbar.htm";
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');

        await page.goto(url, { waitUntil: "networkidle2" });

       
        let data = await page.evaluate(() => {        

            let dataLength = document.querySelectorAll('select[name="element"] > option').length;

            let table = [];
            var i;
            for(i=1; i <= dataLength; i++)
            {                      
                let className = document.querySelector("select[name='element'] > option[value='"+i+"']").innerText
                // await page.screenshot({path: 'images/'+className});
                table.push([i, className])                
            } 

            return table
        })

        console.log(data)

        browser.close();
    }
    catch(e)
    {
        console.log('my error: '+e);
    }
    
})();