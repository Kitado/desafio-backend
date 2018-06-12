import productsModel from '../models/products'

function createProduct({ name, price, convertedPrice, url, imgUrl }) {
  new Promise(async (resolve, reject) => {
    try {
      const product = await productsModel.create({ name, price, convertedPrice, url, imgUrl })
      return resolve()
    } catch (err) {
      return reject(err)
    }
  })
}

export { createProduct }
