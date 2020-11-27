const puppeteer = require('puppeteer');
const Moeda = require('./Moeda');

function Crawler(Browser,page){

    this.url = "https://www.kabum.com.br";

    this.buscaInfo = {
        class : ".sprocura"
    }



    this.buscaProduto = async function(elemento){
        await page.click(this.buscaInfo.class);
        await page.type(this.buscaInfo.class,elemento);
        await page.keyboard.press('Enter');
    }

    this.infoProduto = async function(){

        const nome = await page.evaluate(
            ()=> document.querySelector('.sc-fzoLsD').innerHTML
        )
        // const [imgUrl] = await page.$$eval('.sc-fzqNqU img[src]',
        //     imgs => imgs.map(img => img.getAttribute('src')));
        const imgUrl = await page.evaluate(
            ()=> document.querySelector('.sc-fzoyTs')
            .getAttribute('src')
            .toString()
        )

        const produtoUrl = `${this.url}`+await page.evaluate(
            ()=> document.querySelector('.sc-fzoLsD')
            .getAttribute('href')
            .toString())

        let preco = await page.evaluate(
            ()=> {
                let precoBRL = document
                .querySelector('.sc-fznWqX')
                .innerHTML;
                return precoBRL;
            }
        )
        preco = new Moeda().mudaFormatoMoeda(preco);



        let precoEmDolar =  preco/ await new Moeda().valorDolar();
        precoEmDolar = parseFloat(precoEmDolar.toFixed(2));


        return{
            nome,imgUrl,produtoUrl,preco,precoEmDolar
        }
    }




}



module.exports = Crawler;