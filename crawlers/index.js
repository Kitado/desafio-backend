// Libs adicionadas da internet
const puppeteer = require('puppeteer');
const fs = require('fs');
const got = require('got');

// Libs locais (MySQL)
const db = require('./db');

// Variáveis de controle de erro
var errorCount = 0;
var errorLimit = 1;

// Lista de produtos a serem procurados.
const productsList = ['Placa de vídeo', 'Teclado e Mouse', 'HD SSD', 'Monitor', 'Gabinete'];

// Biblioteca que será inserida ao decorrer do código.
var objQuotation = [];

//Função principal
(async () => {
    let browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-infobars',
            '--disable-notifications', '--disable-extensions'
        ],
    });

    // Tratamento para abrir o browser somente com uma aba.
    let pg = await browser.pages();
    let page = pg[0];

    // Altera Timeout, ViewPort e o UserAgent
    page.setViewport({
        width: 1366,
        height: 768
    });
    page.setDefaultTimeout(120000);
    page.setDefaultNavigationTimeout(120000);
    page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');

    // Controle de sucesso e tratamento de falha do bot.
    try {
        await botCrawler(page);
    } catch (e) {
        console.log('           Erro na função inicial');
        console.error(e);
    } finally {
        console.log(`
    --------------------------------------------------    
                    BOT CRAWLER ENCERRANDO
            


            Muito obrigado pela preferência, espero que
            tenham gostado do bot. Feedbacks e duvidas é
            só entrar em contato com a minha pessoa, mais
            uma vez obrigado, e sucesso a todos!

                                            v1.0
    --------------------------------------------------
    
    `);
        await process.exit();
    }
})();

async function botCrawler(page) {
    console.log(`
    --------------------------------------------------    
                    BOT CRAWLER INICIADO
            Let's bora montar essa maquina!


        OBS: O bot irá extrair 3 itens de cada peça, 
        para ajudar no momento de escolher o melhor ou
        o mais acessível.

                                            v1.0
    --------------------------------------------------
    
    `);
    try {
        await openHome(page);
        await getProducts(page, productsList);
        await dolarQuotation(objQuotation);
        await insertQuotationDB(objQuotation);
    } catch (e) {
        errorCount++;
        if (errorCount <= errorLimit) {
            console.log(`
    --------------------------------------------------    
                    ERRO ENCONTRADO
        ${e}.
        O bot será reiniciado...
        Por favor aguarde...
                                            v1.0
    --------------------------------------------------
            `);
            await page.waitFor(1500);
            await botCrawler(page);
        }
    }
};

/* Redirecionar para a pagina inicial seria mais util, se fosse fazer a buscar pelos elementos, entretanto, o Mercado Livre, 
   contem uma URL personalizada para busca de produtos. Assim sendo, só deixarei essa Home a titulo de boas práticas. */ 
async function openHome(page) {
    console.log('\tAbrindo Mercado Livre para buscar de peças...');
    await page.goto('https://www.mercadolivre.com.br/');
}
async function getProducts(page, productsList) {
    console.log('\tIniciando Cotação...');
    // Verificando a quantidade restante de produtos a serem buscados.
    while (productsList.length > 0) {
        let item = productsList.pop();
        console.log('\n');
        console.log('\x1b[32m', `\t\tProcurando por: ${item}.\n`, '\x1b[0m');

        try {
            await page.goto('https://lista.mercadolivre.com.br/' + item.replace(/\ /g, '-'));

            // Mensagem de inserção de CEP que atrapalha o andamento do bot.
            var elementCEP = await findElementByClass(page, 'div', 'onboarding-cp-tooltip andes-tooltip andes-tooltip--light andes-tooltip-placement-bottomLeft onboarding-cp-tooltip-new-buyer');
            if (elementCEP.found){
                console.log('\x1b[33m',`\t"Span Informe o CEP" encontrado...`, '\x1b[0m');

                let button = await findElementByClass(page, 'span', 'andes-tooltip-button-close')
                await page.evaluate((button)=>{ button.click();}, button.element[0]);
            }

            // Bot pegando 3 opções de cada peça para ajudar na hora de escolher kkk
            for (let i = 0; i < 3; i++) {
                console.log(`\n\tItem #${i+1}\n`);
                let searchList = await findElementByClass(page, 'a', 'ui-search-result__content ui-search-link');
                page.evaluate((item) => { item.click(); }, searchList.element[i]);
                await page.waitForNavigation({ waitUntil: 'load' });

                var itemFounded;
                try {
                    console.log('\tExtraindo nome do produto...');
                    itemFounded = await findElementByClass(page, 'h1', 'ui-pdp-title');
                    var name = await page.evaluate((item) => {
                        return item.innerText;
                    }, itemFounded.element[0]);
                    
                    console.log('\tExtraindo valor do produto...');
                    itemFounded = await findElementByItemProp(page, 'meta', 'price');
                    var value = await page.evaluate((item) => {
                        let valor = item.content
                        if (!valor.match(/(\.\d\d)/gm)){
                            valor = valor + "00";
                        }
                        return valor;
                    }, itemFounded.element[0]);
                    
                    console.log('\tExtraindo url do produto...');
                    var url = await page.url();
                    
                    console.log('\tExtraindo url referente a foto do produto...');
                    itemFounded = await findElementByClass(page, 'img', 'ui-pdp-image ui-pdp-gallery__figure__image');
                    var image = await page.evaluate((item) => {
                        return item.src;
                    }, itemFounded.element[0]);

                    // Log para acompanhar as informações a cada loop.
                    // console.log(`
                    //     Name:   ${name}
                    //     Value:  ${value}
                    //     URL:    ${url}
                    //     Image:  ${image}
                    //     `);
                    

                    console.log('\tInserindo dados na nossa biblioteca de Orçamentos...');
                    objQuotation.push({
                        nome: name,
                        valor: parseFloat(value),
                        valorUSD: 0,
                        url: url,
                        urlImagem: image,
                    })
                    console.log(`\n\tLet's bora para o proximo!`);
                } catch (e) {
                    console.log(`\tErro ao procurar os item na página...\n`, e);
                    throw e;
                }

                await page.goBack();
            }
        } catch (e) {
            console.log(`\tErro ao procurar a lista...\n`, e);
            throw e;
        }

    } 
    console.log("\tCotação efetuada com sucesso!!!");

    // Cotação sem o valor de Dolar.
    // fs.writeFileSync('./Cotação.json', JSON.stringify(objQuotation));
}
async function dolarQuotation(list){
    console.log('\tUtilizando a API para fazer a cotação em Dolar...\n');
    try{
        const res = await got('https://economia.awesomeapi.com.br/USD-BRL');
        console.log('\n\tValor do Dolar neste momento, segundo a API: ');
        let dolarJSON = JSON.parse(res.body)
        console.log(dolarJSON, "\n");
        var valueUSD = dolarJSON[0].high;
        console.log('\x1b[32m', `\t\tValor utilizado para o calculo da cotação: ${valueUSD}`, '\x1b[0m');

        list.forEach(item => {
            item.valorUSD = parseFloat((item.valor * valueUSD).toFixed(2));
        });

        // Cotação 100% Xuxu-Beleza
        await fs.writeFileSync('Cotação.json', JSON.stringify(list));
        console.log('\n\t\t\tCotação (Dolar) efetuada com sucesso!!!');

        return list;
    } catch (error) {
        console.error(error.response);
      }
}
async function insertQuotationDB(QuotationList){
    console.log('\tConectando ao Banco de Dados...');

    try {
        console.log('\tCriando a tabela "Produtos"...');
        await db.createTableProducts();
    } catch (e) {
        console.log('\tErro ao criar a tabela...\n', e);
    }
    try {
        console.log('\tInserindo dados dentro do BD...');
        QuotationList.forEach(async (product) => {
            await db.insertProducts(product);
        })
    } catch (e) {
        console.log('\tErro ao inserir os dados ao BD.\n', e);
        throw e;
    }
    try {
        console.log('\tRetornando a tabela para verificar os resultados...');
        let table = await db.selectAllProducts();
        console.log(table);
    } catch (e) {
        console.log('\tErro ao retornar a tabela de Produtos', e);
        throw e;
    }

    console.log('\t\t\tQueries do Banco de Dados efetuadas com sucesso!!!');
}
                                        /* FUNÇÕES AUXILIARES */

// Função para pegar elementos pelo nome da Class
async function findElementByClass(page, typeElement, txt) {
    const element = await page.$x(`//${typeElement}[contains(@class, '${txt}')]`, {
        timeout: 5000
    });
    if (element.length > 0) {
        return {
            element,
            found: true
        };
    } else {
        return {
            found: false
        };
    }
};
// Função para pegar elementos pelo nome da ItemProp
async function findElementByItemProp(page, typeElement, txt) {
    const element = await page.$x(`//${typeElement}[contains(@itemprop, '${txt}')]`, {
        timeout: 5000
    });
    if (element.length > 0) {
        return {
            element,
            found: true
        };
    } else {
        return {
            found: false
        };
    }
};