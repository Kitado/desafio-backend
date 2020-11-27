const puppeteer = require('puppeteer');


const Crawler = require('./entities/Crawler');


(async()=>{

    const Browser = await puppeteer.launch({headless:false});
    const page = await Browser.newPage();
    await page.goto("https://www.kabum.com.br/");
    const app = new Crawler(Browser,page);
    app.buscaProduto('placa de video');
    await page.waitForNavigation();
    console.log(await app.infoProduto());
    app.buscaProduto('HD SSD');
    await page.waitForNavigation();
    console.log(await app.infoProduto());

})();