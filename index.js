const axios = require('axios')
const cheerio = require('cheerio')
const database = require('./database/database')

const fecthData = async(url) =>{
    try{
        const result = await axios.get(url)
        return result.data
    }catch(err){
        console.log(err)
    }
}


const insertDatabase = async(table, title, price, dolarPrice, link, linkImg) =>{
    try{
        let data = await database.insert({title:title, price:price,dolarPrice:dolarPrice, link:link, linkImg:linkImg}).table(table)
        console.log(data)
    }catch(err){
        console.log(err)
    }
}

const graphicsCard = async() =>{
    const content = await fecthData('https://www.pichau.com.br/hardware/placa-de-video')
    const $ = cheerio.load(content)

    axios.get('https://economia.awesomeapi.com.br/json/all').then(dados =>{
        let dolar = dados.data.USD.high
    

    $('li.product-item').each((i, e) =>{
        const title = $(e).find('a.product-item-link').text()
        const link =  $(e).find('a.product-item-link').attr('href')
        const linkImg = $(e).find('img.product-image-photo').attr('src')
        const preco = $(e).find('span.price-boleto').text().slice(1)
        let finalPrice = preco.split(' ')
        let formatedPrice = parseFloat(finalPrice[2].slice(2).replace(',', '.'))
        let dolarPrice = (formatedPrice * dolar).toFixed(2)
        insertDatabase('graphicsCard',title.slice(1),formatedPrice, parseFloat(dolarPrice), link, linkImg)
        })
    })
    
}


const keyboard = async() =>{
    const content = await fecthData('https://www.pichau.com.br/perifericos/teclado')
    const products = []
    const $ = cheerio.load(content)

    axios.get('https://economia.awesomeapi.com.br/json/all').then(dados =>{
        let dolar = dados.data.USD.high
    

    $('li.product-item').each((i, e) =>{
        const title = $(e).find('a.product-item-link').text()
        const link =  $(e).find('a.product-item-link').attr('href')
        const linkImg = $(e).find('img.product-image-photo').attr('src')
        const preco = $(e).find('span.price-boleto').text().slice(1)
        let finalPrice = preco.split(' ')
        let formatedPrice = parseFloat(finalPrice[2].slice(2).replace(',', '.'))
        let dolarPrice = (formatedPrice * dolar).toFixed(2)
        insertDatabase('keyboard',title.slice(1),formatedPrice, parseFloat(dolarPrice), link, linkImg)
        })
    })
    
}

const mouse = async() =>{
    const content = await fecthData('https://www.pichau.com.br/perifericos/mouse')
    const products = []
    const $ = cheerio.load(content)

    axios.get('https://economia.awesomeapi.com.br/json/all').then(dados =>{
        let dolar = dados.data.USD.high
    

    $('li.product-item').each((i, e) =>{
        const title = $(e).find('a.product-item-link').text()
        const link =  $(e).find('a.product-item-link').attr('href')
        const linkImg = $(e).find('img.product-image-photo').attr('src')
        const preco = $(e).find('span.price-boleto').text().slice(1)
        let finalPrice = preco.split(' ')
        let formatedPrice = parseFloat(finalPrice[2].slice(2).replace(',', '.'))
        let dolarPrice = (formatedPrice * dolar).toFixed(2)
        insertDatabase('mouse',title.slice(1),formatedPrice, parseFloat(dolarPrice), link, linkImg)

        })

    })
    
}


const ssd = async() =>{
    const content = await fecthData('https://www.pichau.com.br/hardware/ssd')
    const products = []
    const $ = cheerio.load(content)

    axios.get('https://economia.awesomeapi.com.br/json/all').then(dados =>{
        let dolar = dados.data.USD.high
    

    $('li.product-item').each((i, e) =>{
        const title = $(e).find('a.product-item-link').text()
        const link =  $(e).find('a.product-item-link').attr('href')
        const linkImg = $(e).find('img.product-image-photo').attr('src')
        const preco = $(e).find('span.price-boleto').text().slice(1)
        let finalPrice = preco.split(' ')
        let formatedPrice = parseFloat(finalPrice[2].slice(2).replace(',', '.'))
        let dolarPrice = (formatedPrice * dolar).toFixed(2)
        insertDatabase('ssd',title.slice(1),formatedPrice, parseFloat(dolarPrice), link, linkImg)
        })
    })
    
}

const monitor = async() =>{
    const content = await fecthData('https://www.pichau.com.br/monitores')
    const products = []
    const $ = cheerio.load(content)

    axios.get('https://economia.awesomeapi.com.br/json/all').then(dados =>{
        let dolar = dados.data.USD.high
    

    $('li.product-item').each((i, e) =>{
        const title = $(e).find('a.product-item-link').text()
        const link =  $(e).find('a.product-item-link').attr('href')
        const linkImg = $(e).find('img.product-image-photo').attr('src')
        const preco = $(e).find('span.price-boleto').text().slice(1)
        let finalPrice = preco.split(' ')
        let formatedPrice = parseFloat(finalPrice[2].slice(2).replace(',', '.'))
        let dolarPrice = (formatedPrice * dolar).toFixed(2)
        insertDatabase('monitor',title.slice(1),formatedPrice, parseFloat(dolarPrice), link, linkImg)
        })
        
    })
    
}

const computerCase = async() =>{
    const content = await fecthData('https://www.pichau.com.br/hardware/gabinete')
    const products = []
    const $ = cheerio.load(content)

    axios.get('https://economia.awesomeapi.com.br/json/all').then(dados =>{
        let dolar = dados.data.USD.high
    

    $('li.product-item').each((i, e) =>{
        const title = $(e).find('a.product-item-link').text()
        const link =  $(e).find('a.product-item-link').attr('href')
        const linkImg = $(e).find('img.product-image-photo').attr('src')
        const preco = $(e).find('span.price-boleto').text().slice(1)
        let finalPrice = preco.split(' ')
        let formatedPrice = parseFloat(finalPrice[2].slice(2).replace(',', '.'))
        let dolarPrice = (formatedPrice * dolar).toFixed(2)
        insertDatabase('computerCase',title.slice(1),formatedPrice, parseFloat(dolarPrice), link, linkImg)
        })
    })
    
}


function main(){
    graphicsCard()
    keyboard()
    mouse()
    ssd()
    monitor()
    computerCase()
}

main()



