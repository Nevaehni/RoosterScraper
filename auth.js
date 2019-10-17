const puppeteer = require('puppeteer');

(async() =>
{

    let loginUrl = "https://rooster.talnet.nl/vpn/index.html";
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');
    
})