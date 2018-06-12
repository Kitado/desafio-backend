import connection from '../db/connection'

const productsSchema = new connection.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  convertedPrice: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const productsModel = connection.model('products', productsSchema)

export default productsModel
