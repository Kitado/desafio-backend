const axios = require('axios')
const cheerio = require('cheerio')

const fecthData = async(url) =>{
    try{
        const result = await axios.get(url)
        return result.data
    }catch(err){
        console.log(err)
    }
}


const graphicsCard = async() =>{
    const content = await fecthData('https://www.pichau.com.br/hardware/placa-de-video')
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
        let product = {title:title.slice(1), preco:finalPrice[2], dolarPrice: '$' + dolarPrice, link, linkImg}
        products.push(product)
        })
        console.log(products)
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
        let product = {title:title.slice(1), preco:finalPrice[2], dolarPrice: '$' + dolarPrice, link, linkImg}
        products.push(product)
        })
        console.log(products)
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
        let product = {title:title.slice(1), preco:finalPrice[2], dolarPrice: '$' + dolarPrice, link, linkImg}
        products.push(product)
        })
        console.log(products)
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
        let product = {title:title.slice(1), preco:finalPrice[2], dolarPrice: '$' + dolarPrice, link, linkImg}
        products.push(product)
        })
        console.log(products)
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
        let product = {title:title.slice(1), preco:finalPrice[2], dolarPrice: '$' + dolarPrice, link, linkImg}
        products.push(product)
        })
        console.log(products)
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
        let product = {title:title.slice(1), preco:finalPrice[2], dolarPrice: '$' + dolarPrice, link, linkImg}
        products.push(product)
        })
        console.log(products)
    })
    
}

computerCase()






