// const puppeteer = require('puppeteer');
const Moeda = require('./Moeda');
const PerifericoModel = require('../models/index');



function Crawler(Browser,page){

    this.url = "https://www.kabum.com.br";

    this.buscaInfo = {
        class : ".sprocura"
    }



    this.buscaProduto = async function(elemento){
        await page.click(this.buscaInfo.class);
        await page.type(this.buscaInfo.class,elemento);
        await page.keyboard.press('Enter');
        
        await page.waitForNavigation();

        const nome = await page.evaluate(
            ()=> document.querySelector('.sc-fzoLsD').innerHTML
        )
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

    this.cadastraProduto = async function(produto){
        try{
            await PerifericoModel.create(produto);
            const {nome} = produto;
            return nome;
        }catch(err){
            throw new Error(err);
        }
    }

}



module.exports = Crawler;