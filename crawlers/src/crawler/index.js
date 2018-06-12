import Nightmare from 'nightmare'

import { getCotacaoDolar } from '../web-service'
import { createProduct } from '../services/products-service'
import search from '../../api-data.json'

function startCrawler () {
  const initialLink = search.link || ''
  const productList = search.products || []

  productList.forEach(async (searchName) => {
    try {
      const crawledProduct = await crawler(initialLink, searchName)
      const cotacaoDolar = await getCotacaoDolar()

      crawledProduct.convertedPrice = (crawledProduct.price / cotacaoDolar).toFixed(2)
      
      await createProduct({ 
        name: crawledProduct.name,
        price: crawledProduct.price,
        url: crawledProduct.url,
        imgUrl: crawledProduct.imgUrl, 
        convertedPrice: crawledProduct.convertedPrice,
      })
    } catch (err) {
      console.error(err)
    }
  })
}

function crawler(initialLink, product) {
  return new Promise(async (resolve, reject) => {
    const headlessNav = new Nightmare({ show: false })
    try {
      console.log(`Starting crawler for product: ${product}`)
      const path = 'body > header > div > form'
      
      headlessNav
        .goto(initialLink)
        .wait(path)
        .click(`${path} > input`)
        .type(`${path} > input`, product)
        .click(`${path} > button.nav-search-btn`)
        .wait('#searchResults')
        .evaluate(() => {
          const productDIV = document.querySelector('#searchResults > li:nth-child(1) > div')
          return {
            imgUrl: productDIV.querySelector('div > div > div > ul > li > a > img').getAttribute('src'),
            name: productDIV.querySelector('a > div h2 span.main-title').textContent,
            url: productDIV.querySelector('a').getAttribute('href'),
            price: productDIV.querySelector('a > div span.price__fraction').textContent
          }
        })
        .end()
        .then((result) => {
          console.log(`Ending crawler for product: ${product}`)
          return resolve(result)
        })
        .catch((err) => { throw new Error(err.message) })
  
    } catch (err) {
      await headlessNav.end()
      return reject(err)
    }
  })
}

export { startCrawler }
