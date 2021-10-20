//Carregando Módulos

const { MongoClient } = require('mongodb')
require('dotenv').config()

//Conexão com o Banco de Dados

const main = async () => {
    const url ='mongodb+srv://devteste:'+ process.env.NODE_PASS +'@otaku.q9riq.mongodb.net/'+process.env.NODE_DB+'retryWrites=true&w=majority'
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.connect();
}
//Funções

const buscarCodigos = async () => {
    const client = await main();
    let response = [];
    try {
        const resultado = await client.db("otaku-shop").collection("destaques").find().toArray()
        resultado.forEach((element) => {
            response.push({
                id: element.id
            })
        })
    } catch (error) {
        response = "Error 404"
    } finally {
        client.close();
    }
    return response;
}

const buscarDestaques = async () => {
    const client = await main();
    const data = await buscarCodigos();
    let response;
    try {
        const resultado = await client.db("otaku-shop").collection("produtos").find(
            {
                $or: data
            },
            {
                "path": 1,
                "name": 1,
                "price": 1
            }
        ).toArray()
        response = resultado;
    } catch (error) {
        response = "Error 404"
    } finally {
        client.close();
    }
    return response;
}

const buscarProdutos = async () => {
    const client = await main();
    let response
    try {
        const resultado = await client.db("otaku-shop").collection("produtos").find().toArray()
        response = resultado
    } catch (error) {
        response = { message: "Falha ao buscar os produtos" };
    } finally {
        client.close();
    }
    return response;
}

const buscarDetalhes = async (id) => {
    const client = await main();
    let response;
    try {
        const resultado = await client.db("otaku-shop").collection("produtos").findOne({ id: id })
        response = resultado;
    } catch (error) {
        console.error("Aqui está o error" + error)
    } finally {
        client.close();
    }
    return response;
}
//Exportação de Funções

module.exports = { buscarDestaques, buscarProdutos, buscarDetalhes }