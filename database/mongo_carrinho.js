//Carregando Módulos

const { MongoClient } = require('mongodb')
require('dotenv').config()

//Conexão com o Banco de Dados

const main = async () => {
    const url ='mongodb+srv://devtestet:'+ process.env.NODE_PASS +'@otaku.q9riq.mongodb.net/'+process.env.NODE_DB+'retryWrites=true&w=majority'
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.connect();
}
//Funções

const filtro = (data) => {
    let fields = []
    data.forEach(element => {
        fields.push({
            path: element.path,
            name: element.name,
            price: element.price,
            id: element.id
        })
    });
    return fields
}

const buscarCarrinho = async (field) => {
    const client = await main();
    const { ids, qtdes } = await buscarIdCarrinho(field);
    let response;
    try {
        const resultado = filtro(await client.db("otaku-shop").collection("produtos").find(
            {
                $or: ids
            },
            {
                "path": 1,
                "name": 1,
                "price": 1
            }
        ).toArray())
        resultado.forEach((produto, index) => {
            produto.qtde = qtdes[index]
        })
        response = resultado
    } catch (error) {
        response = "Error 404"
    } finally {
        client.close();
    }
    return response
}

const buscarIdCarrinho = async (field) => {
    const client = await main();
    let response = [];
    try {
        const resultado = await client.db("otaku-shop").collection("usuarios").findOne(field)
        let id = []
        let qtde = []
        resultado.carrinho.forEach((element) => {
            id.push({
                id: element.id
            })
            qtde.push(element.qtde)
        })
        response = {
            ids: id,
            qtdes: qtde
        }
    } catch (error) {
        response = "Error 404"
    } finally {
        client.close();
    }
    return response;
}

//Exportação de Funções

module.exports = { buscarCarrinho }