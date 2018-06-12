import soap from 'soap'

import apiJson from '../api-data.json'

const wsUrl = apiJson.ws
const codigoSerie = apiJson.codDolarVenda

function getCotacaoDolar() {
  return new Promise((resolve, reject) => {
    soap.createClient(wsUrl, (err, wsClient) => {
      wsClient
        .FachadaWSSGSService
        .FachadaWSSGS
        .getUltimoValorVO({ codigoSerie: codigoSerie }, (err, result) => {
          if (err) {
            return reject(err)
          }

          return resolve(result.getUltimoValorVOReturn.ultimoValor.svalor.$value)
        })
    })
  })
}

export { getCotacaoDolar }
