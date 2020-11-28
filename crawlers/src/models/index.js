const mongoose = require('../connection/index');

const Schema = mongoose.Schema;


const PerifericoSchema = new Schema({

    nome : String,
    preco : Number,
    precoEmDolar : Number,
    urlProduto : String,
    urlImagem : String

});

const PerifericoModel = mongoose.model('Periferico',PerifericoSchema);


module.exports = PerifericoModel;