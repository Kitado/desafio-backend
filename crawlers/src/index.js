const puppeteer = require('puppeteer');
const express = require('express');
// const appExpress = express();
// appExpress(express.json());


// appExpress.get('/',(req,res)=>{
//     return res.send({ola:"mundo"})
// })

// appExpress.listen(3001)

const Crawler = require('./entities/Crawler');


(async()=>{

    const Browser = await puppeteer.launch({headless:false});
    const page = await Browser.newPage();
    await page.goto("https://www.kabum.com.br/");
    const app = new Crawler(Browser,page);
    // 

    let produto = await app.buscaProduto('placa de video');
    await app.cadastraProduto(produto);

    produto = await app.buscaProduto('teclado');
    await app.cadastraProduto(produto);

    produto = await app.buscaProduto('mouse');
    await app.cadastraProduto(produto);

    produto = await app.buscaProduto('HD SSD');
    await app.cadastraProduto(produto);

    produto = await app.buscaProduto('monitor');
    await app.cadastraProduto(produto);

    produto = await app.buscaProduto('gabinete');
    await app.cadastraProduto(produto);

})();