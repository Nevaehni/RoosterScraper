const puppeteer = require('puppeteer');
const credentail = require('./credentails.json');

async function run(){
    try
    {
        let loginUrl = "https://rooster.talnet.nl/vpn/index.html";
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');

        await page.goto(loginUrl, { waitUntil: "networkidle2" });

        let name = credentail.username
        let ww = credentail.password

        await page.evaluate((name, ww) => {     
           
            document.querySelector('input[id="Enter user name"]').value=name;
            document.querySelector('input[id="passwd"]').value=ww;
            document.querySelector('input[class="custombutton login_page"]').click();

        }, name, ww)

        page.close();
    }
    catch(e) 
    {
        console.log(e);
    }
}

run();