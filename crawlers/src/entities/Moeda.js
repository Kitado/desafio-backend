const axios = require('axios');


function Moeda(){

    this.valorDolar = async ()=>{
        return await axios.default.get('https://economia.awesomeapi.com.br/json/all')
        .then((value)=>{
            return parseFloat(value.data.USD.high);
        })
    }
    this.mudaFormatoMoeda = (moedaBRL)=>{
        let moedaNum = moedaBRL.substring(3);
        moedaNum = moedaNum.split('.');
        let ParteInteira = moedaNum.reduce((a,b)=>{
            return a+b
        })

        return parseFloat(ParteInteira.replace(",","."));

    }
}




module.exports = Moeda;