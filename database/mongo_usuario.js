//Carregando Módulos

const { MongoClient } = require('mongodb')
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

//Conexão com o Banco de Dados

const main = async () => {
    const url = 'mongodb+srv://devteste:' + process.env.NODE_PASS + '@otaku.q9riq.mongodb.net/' + process.env.NODE_DB + 'retryWrites=true&w=majority'
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.connect();
}

//Funções

const cadastroDeUsuario = async (data) => {
    const client = await main();
    let response = { alert: 'green', message: "Usuário cadastrado com sucesso" };
    try {
        const resultado = await client.db("otaku-shop").collection("usuarios").insertOne(data)
    } catch (error) {
        response = { alert: 'red', message: "Falha ao realizar o cadastro" };
    } finally {
        client.close();
    }
    return response;
}
const buscaDeCampo = async (field) => {
    const client = await main();
    let response = false;
    try {
        const resultado = await client.db("otaku-shop").collection("usuarios").findOne(field)
        if (typeof resultado == 'object') {
            response = true;
        }
    } catch (error) {
        console.error("Aqui está o error" + error)
    } finally {
        client.close();
    }
    return response;
}
const adicionarToken = async (usuario, token) => {
    const client = await main();
    let response;
    try {
        await client.db("otaku-shop").collection("usuarios").updateOne(
            { usuario: usuario },
            [
                { $set: { token: token } },
            ]
        )
        response = true;
    } catch (error) {
        response = false;
    } finally {
        client.close();
    }
}
const loginDeUsuario = async (usuario, senha) => {
    const client = await main();
    let response = { alert: 'red', message: "Dados Incorretos" }
    try {
        const resultado = await client.db("otaku-shop").collection("usuarios").findOne({ usuario: usuario })
        if (typeof resultado == 'object') {
            if (bcrypt.compareSync(senha, resultado.senha)) {
                response = {
                    alert: 'green',
                    message: "Login realizado com sucesso",
                }
                let token = jwt.sign(
                    {
                        usuario: resultado.usuario,
                        email: resultado.email
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )
                let re = await adicionarToken(resultado.usuario, token)
            }
        }
    } catch (error) {
        console.log(error)
        response = { alert: 'red', message: "Falha ao realizar o login" };
    } finally {
        client.close();
    }
    return response;
}

const buscarToken = async (field) => {
    const client = await main();
    let response = {}
    try {
        const resultado = await client.db("otaku-shop").collection("usuarios").findOne(field)
        if (typeof resultado == 'object') {
            response = resultado
        }
    } catch (error) {
    } finally {
        client.close();
    }
    return response
}
//Exportação de Funções

module.exports = { cadastroDeUsuario, buscaDeCampo, loginDeUsuario, buscarToken}