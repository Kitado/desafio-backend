async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection('mysql://root:root@127.0.0.1:3304/desafio_crawler');
    global.connection = connection;
    return connection;
};
async function createTableProducts(){
    const connection = await connect();
    return await connection.query(`CREATE TABLE produtos (
        id int(11) unsigned NOT NULL AUTO_INCREMENT,
        Nome varchar(100) NOT NULL DEFAULT '',
        Preco decimal(10,2) NOT NULL,
        Preco_Dolar decimal(10,2) NOT NULL,
        Url text NOT NULL,
        Url_Imagem text NOT NULL,
        PRIMARY KEY (id)
        );`)
}
async function selectAllProducts(){
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM produtos;');
    return rows;
};
async function insertProducts(product){
    const connection = await connect();
    const sql = 'INSERT INTO produtos(Nome, Preco, Preco_Dolar, Url, Url_Imagem) VALUES (?, ?, ?, ?, ?);';
    const values = [product.nome, product.valor, product.valorUSD, product.url, product.urlImagem];
    return await connection.query(sql, values);
};
async function updateProducts(id, product){
    const connection = await connect();
    const sql = 'UPDATE produtos SET Nome=?, Preco=?, Preco_Dolar=?, Url=?, Url_Imagem=? WHERE id=?;';
    const values = [product.nome, product.valor, product.valorUSD, product.url, product.urlImagem, id];
    return await connection.query(sql,values);
};
async function deleteProducts(id){
    const connection = await connect();
    const sql = 'DELETE FROM produtos WHERE id=?;';
    return await connection.query(sql,id);
};

module.exports = {createTableProducts, selectAllProducts, insertProducts, updateProducts, deleteProducts}