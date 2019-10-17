const puppeteer = require('puppeteer');

(async() =>
{
    try
    {
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        let url = "https://rooster.talnet.nl/zuidoost/frames/navbar.htm";
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');
        
        await page.goto(url, { waitUntil: "networkidle2" });
        
        
        let data = await page.evaluate(async () => {        
            let dataLength = document.querySelectorAll('select[name="element"] > option').length;

            let table = [];
            var i;
            for(i=1; i <= dataLength; i++)
            {                      
                let className = document.querySelector("select[name='element'] > option[value='"+i+"']").innerText
                // let ajax = await browser.newPage();
                // await page.goto('');
                // await page.screenshot({path: 'images/'+className});
                // console.log(pad(i, 3));
                table.push([i, className])                
            } 

            return table;
        })

        page.close();
        
        await data.forEach(async (value, index) => {
            try {
                if(value[1] == "OITAOO7B") {
                    let urlsuffix = pad(value[0], 3);
                    let earl = "https://rooster.talnet.nl/zuidoost/40/c/c00" + urlsuffix + ".htm";
                    const schedule = await browser.newPage();
                    await schedule.setViewport({ width: 860, height: 1060 })
                    await schedule.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');
                    
                    await schedule.goto(earl);
                    // await page.waitForResponse(response => response.ok())
                    await schedule.screenshot({path: 'images/' + value[1] + ".png"});
                    await schedule.close();
                    await browser.close();
                }
                // if(value[0] == data.length) {
                //     browser.close();
                // }
                // await schedule.evaluate(() => {
                //     schedule
                // });
            } catch(e) {
                console.log(e);
            }
        });
    }
    catch(e)
    {
        console.log('my error: '+e);
    }
    
})();