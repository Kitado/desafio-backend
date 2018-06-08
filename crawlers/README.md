# Desafio Javascript Back-end (Crawler) - Blu365

## Sobre o desafio
O objetivo do desafio é ajudar o seu robô a comprar um computador para ele morar! 

Use seus conhecimentos de crawlers web para ajudar seu robô a montar uma máquina =P

## O que iremos avaliar 
  A ideia principal dessa avaliação é verificar pontos de entedimento da demanda, a sua lógica e forma de desenvolver o seu código. Não vamos avaliar se o teste foi todo finalizado, ou se todas as tecnologias que recomendamos foram usadas. 

### Objetivos
  - Criar uma branch para você `feature/seu-nome`  
  - Codar um crawler web
  - Interagir com um WS usando SOAP
  - Persistir dados
  - Configuração de containers docker (extra)

## Orientações
1) Visitar em um site de venda de periféricos de sua escolha e cotar os seguintes periféricos
 - Uma placa de vídeo
 - Um teclado e mouse
 - Um HD SSD
 - Um monitor
 - Um gabinete
2) Persistir em um banco de dados de preferência não-relacional (MongoDB)
 - Nome do item
 - Preço
 - Preço convertido em dólar
 - URL do produto
 - Uma URL de imagem do produto
3) Precisaremos também cotar os valores do produtos em dólar, então você precisa interagir com o Webservice do Banco central para cotar os valores dos produtos
 - https://www3.bcb.gov.br/wssgs/services/FachadaWSSGS?wsdl
 - Pegar os preços dos produtos e converter em dólar
 - Gravar essa informação

 ```    
    CÓDIGO	    NOME
    1	        Dólar (venda)
    10813        Dólar (compra) 

    Esse webservice possui os seguintes métodos:

    - getUltimoValorVO - Recupera o último valor de uma determinada série e retorna um objeto do tipo WSSerieVO.
      - Parâmetros: long codigoSerie – Código da série. Retorno: WSSerieVO – Objeto série.

    - getUltimoValorXML - Recupera o último valor de uma determinada série e retorna o resultado em formato XML.
      - Parâmetros: long codigoSerie – Código da série. Retorno: String – String contendo o resultado da consulta 7em formato XML.

    - getValor - Recupera o valor de uma série em uma determinada data (dd/MM/aaaa).
      - Parâmetros: long codigoSerie – Código da série. String data – String contendo a data (dd/MM/aaaa) do valor a ser pesquisado. Retorno: BigDecimal – Objeto contendo o valor.

    - getValorEspecial - Recupera o valor de uma série especial em um período.
      - Parâmetros: long codigoSerie – Código da série. String data – String contendo a data (dd/MM/aaaa) inicial. String dataFim – String contendo a data (dd/MM/aaaa) final. Retorno: BigDecimal – Objeto contendo o valor.

    - getValoresSeriesXML - Recupera os valores de uma ou mais séries dentro de um determinado período.O resultado da consulta é devolvido ao cliente em formato XML.
      - Parâmetros: long[] codigosSeries – Lista(array) dos códigos das séries. String dataInicio – String contendo a data (dd/MM/aaaa) inicial. String dataFim – String contendo a data (dd/MM/aaaa) final. Retorno: String – String contendo o resultado da consulta em formato XML.

    - getValoresSeriesVO - Recupera os valores de uma ou mais séries dentro de um determinado período e retorna o resultado em forma de Array de objetos do tipo WSSerieVO.
      - Parâmetros: long[] codigosSeries – Lista(array) dos códigos das séries. String dataInicio – String contendo a data (dd/MM/aaaa) inicial. String dataFim – String contendo a data (dd/MM/aaaa) final. Retorno: WSSerieVO – Lista(array) de objeto série.
```

## Desenvolvimento
Para desenvolvimento do projeto recomendamos usar as seguintes libs do NodeJS, mas não precisa se prender a elas. Use o que você tinver mais familiaridade. Ess código irá rodar em um server Linux, então é importante se atentar para essa questão.
- Nightmare
- soapaspromise
- Node 8 (async, await)
- Linux
- Quer marcar um golaço? Coloque seu robô para rodar em um container docker!
